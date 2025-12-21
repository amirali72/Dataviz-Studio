import { useEffect, useState } from "react";
import { useCsvData } from "./hooks/useCsvData";
import { useChartBuilder } from "./hooks/useChartBuilder";
import { ToastContainer, toast } from "react-toastify";
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
  ResponsiveContainer,
} from "recharts";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ChartRenderer from "./common/ChartRenderer";

function App() {
  const [savedCharts, setSavedCharts] = useLocalStorage("dashboardCharts", []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const {
    fileName,
    csvData,
    columns,
    parseLoading,
    handleSelectFile,
  } = useCsvData();

  const {
    chartType,
    setChartType,
    xaxis,
    setXAxis,
    yaxis,
    setYAxis,
    showChart,
    chartConfig,
    chartLoading,
    aggregation,
    setAggregation,
    chartData,
    generateChart,
    yAxisError,
  } = useChartBuilder(csvData, columns);

  const addToDashboard = () => {
    if (savedCharts.length < 10) {
      const newChart = {
        id: Date.now(),
        type: chartType,
        x: xaxis,
        y: yaxis,
        aggregation: aggregation,
        data: chartData,
        config: chartConfig,
      };
      setSavedCharts([...savedCharts, newChart]);
      toast("Chart added to Dashboard", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      alert("Maximum 10 charts. Remove one first.");
      return;
    }
  };

  const removeChart = (chartID) => {
    if (confirm("Remove this chart from dashboard?")) {
      const newSavedCharts = savedCharts.filter(
        (chart) => chart.id !== chartID
      );
      setSavedCharts(newSavedCharts);
    }
  };

  useEffect(() => {
    console.log(savedCharts);
  }, [savedCharts]);

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
                    <option value="pie">Pie Chart</option>
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
                  {yAxisError !== "" && (
                    <h2 className="text-red-600">{yAxisError}</h2>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aggregation:
                  </label>
                  <select
                    value={aggregation}
                    onChange={(e) => setAggregation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">None</option>
                    <option value="sum">Sum</option>
                    <option value="average">Average</option>
                    <option value="count">Count</option>
                    <option value="min">Min</option>
                    <option value="max">Max</option>
                  </select>
                </div>

                <button
                  className={
                    csvData.length > 0 && xaxis && yaxis && yAxisError === ""
                      ? "bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 cursor-pointer mt-4"
                      : "bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed mt-4"
                  }
                  onClick={generateChart}
                  disabled={
                    !(csvData.length > 0 && xaxis && yaxis && yAxisError === "")
                  }
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
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                📊 Your Chart
              </h2>
              {showChart && !chartLoading && (
                <button
                  onClick={addToDashboard}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 cursor-pointer mt-4"
                >
                  Add to Dashboard
                </button>
              )}
            </div>

            {chartLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600"></div>
              </div>
            ) : csvData.length > 0 && showChart ? (
              <div className="flex justify-center">
                <ChartRenderer
                  chart={{
                    type: chartConfig.type,
                    x: chartConfig.x,
                    y: chartConfig.y,
                    data: chartData.length > 0 ? chartData : csvData,
                    aggregation,
                  }}
                  width={700}
                  height={400}
                />
              </div>
            ) : (
              <p className="text-gray-500">Chart will appear here</p>
            )}
          </div>

          {/* Box 5: Dashboard */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              📊 Dashboard ({savedCharts.length} charts)
            </h2>
            {savedCharts.length > 0 && (
              <button
                onClick={() => {
                  if (
                    confirm("Do you want to remove all charts from Dashboard")
                  ) {
                    setSavedCharts([]);
                  }
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 cursor-pointer mt-4"
              >
                ✕ Remove All
              </button>
            )}

            {savedCharts.length === 0 ? (
              <p className="text-gray-500">
                No charts in dashboard. Generate a chart and click "Add to
                Dashboard".
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedCharts.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-700">
                          {item.type.toUpperCase()} Chart -{" "}
                          {item.x.toUpperCase()} vs {item.y.toUpperCase()}
                          {item.aggregation &&
                            ` (${item.aggregation.toUpperCase()})`}
                        </h3>
                        <button
                          onClick={() => removeChart(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕ Remove
                        </button>
                      </div>

                      <div className="flex justify-center">
                        <ChartRenderer chart={item} width={350} height={250} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
