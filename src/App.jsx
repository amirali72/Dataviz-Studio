import { useEffect, useState } from "react";
import Papa from "papaparse";

function App() {
  const [fileName, setFileName] = useState("");
  const [csvData, setCSVData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [parseLoading, setParseLoading] = useState(false);

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".csv") || file.name.endsWith(".xlsx")) {
      setParseLoading(true);
      setFileName(e.target.files[0].name);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setCSVData(results.data);
          if (results.data.length > 0) {
            const cols = Object.keys(results.data[0]);
            setColumns(cols);
          }
          setParseLoading(false);
        },
      });
    } else {
      alert("Please select CSV File");
      setFileName("");
    }
  };

  useEffect(() => {
    console.log(columns);
  }, [columns]);

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
            <p className="text-gray-500">Select columns after uploading data</p>
          </div>

          {/* Box 4: Chart Display */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              📊 Your Chart
            </h2>
            <p className="text-gray-500">Chart will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
