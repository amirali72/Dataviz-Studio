import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Cell,
  Pie,
  PieChart,
} from "recharts";

function App() {
  const [fileName, setFileName] = useState("");
  const [csvData, setCSVData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [parseLoading, setParseLoading] = useState(false);
  const [chartType, setChartType] = useState("bar");
  const [xaxis, setXAxis] = useState("");
  const [yaxis, setYAxis] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [chartConfig, setChartConfig] = useState({});
  const [chartLoading, setChartLoading] = useState(false);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".csv") || file.name.endsWith(".xlsx")) {
      setParseLoading(true);
      setFileName(e.target.files[0].name);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results) {
          setCSVData(results.data);
          if (results.data.length > 0) {
            const cols = Object.keys(results.data[0]);
            setColumns(cols);
            if (cols.length >= 2) {
              setXAxis(cols[0]);
              setYAxis(cols[1]);
              setChartConfig({ type: "bar", x: cols[0], y: cols[1] });
            }
          }
          setParseLoading(false);
        },
      });
    } else {
      alert("Please select CSV File");
      setFileName("");
    }
  };

  const generateChart = () => {
    setShowChart(true);
    setChartConfig({ type: chartType, x: xaxis, y: yaxis });
    setChartLoading(true);

    setTimeout(() => {
      setChartLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          DataViz Studio
        </h1>

        <div className="space-y-6">
          {/* Box 1: Upload */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              📁 Upload Your File
            </h2>
            <input
              type="file"
              accept=".csv "
              onChange={(e) => handleSelectFile(e)}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input">
              <div className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 cursor-pointer inline-block">
                Choose File
              </div>
            </label>
            {fileName && (
              <div className="mt-4 text-green-600 font-medium">
                File Uploaded ✅ : {fileName}
              </div>
            )}
          </div>

          {/* Box 2: Preview */}
          <div className="bg-white rounded-xl shadow p-6">
            {parseLoading && (
              <div className="text-center py-8">
                <div className="text-lg text-gray-600">
                  📊 Parsing your data...
                </div>
              </div>
            )}
            {csvData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      {columns.map((col, index) => (
                        <th
                          className="border border-gray-300 p-3 text-left font-semibold"
                          key={index}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.slice(0, 5).map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {columns.map((cols, colIndex) => (
                          <td
                            className="border border-gray-300 p-3"
                            key={colIndex}
                          >
                            {row[cols]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  📋 Data Preview (First 5 Rows)
                </h2>
                <p className="text-gray-500">Upload a file to see preview</p>
              </div>
            )}
          </div>

          {/* Box 3: Chart Builder */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              🎨 Build Your Chart
            </h2>
            {csvData.length > 0 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chart Type:
                  </label>
                  <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    X-Axis:
                  </label>
                  <select
                    value={xaxis}
                    onChange={(e) => setXAxis(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
                  >
                    {columns.map((cols, index) => (
                      <option key={index} value={cols}>
                        {cols}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Y-Axis:
                  </label>
                  <select
                    value={yaxis}
                    onChange={(e) => setYAxis(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
                  >
                    {columns.map((cols, index) => (
                      <option key={index} value={cols}>
                        {cols}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 cursor-pointer mt-4"
                  onClick={generateChart}
                >
                  Generate Chart
                </button>
              </div>
            ) : (
              <p className="text-gray-500">
                Select columns after uploading data
              </p>
            )}
          </div>

          {/* Box 4: Chart Display */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              📊 Your Chart
            </h2>

            {chartLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600"></div>
              </div>
            ) : csvData.length > 0 && showChart ? (
              <div className="flex justify-center">
                {chartConfig.type === "bar" ? (
                  <BarChart width={700} height={400} data={csvData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={chartConfig.x} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={chartConfig.y} fill="#f59e0b" />
                  </BarChart>
                ) : chartConfig.type === "line" ? (
                  <LineChart width={700} height={400} data={csvData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={chartConfig.x} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={chartConfig.y}
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </LineChart>
                ) : null}
              </div>
            ) : (
              <p className="text-gray-500">Chart will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
