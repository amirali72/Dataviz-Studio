import React from "react";
import { useCsvData } from "../hooks/useCsvData";
import { useChartBuilder } from "../hooks/useChartBuilder";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "../hooks/useDebounce";
import ChartRenderer from "../common/ChartRenderer";

const BuilderPage = ({ savedCharts, setSavedCharts }) => {
  const [filterColumn, setFilterColumn] = useState("");
  const [filterOperator, setFilterOperator] = useState("=");
  const [filterValue, setFilterValue] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const {
    setCSVData,
    setFileName,
    setColumns,
    fileName,
    csvData,
    columns,
    parseLoading,
    handleSelectFile,
  } = useCsvData();

  const debouncedFilterValue = useDebounce(filterValue, 500);

  const filteredCsvData = useMemo(() => {
    if (filterColumn === "") return csvData;
    setIsFiltered(true);

    return csvData.filter((row) => {
      const cellValue = row[filterColumn];
      const filterNum = Number(debouncedFilterValue);
      const cellNum = Number(cellValue);

      switch (filterOperator) {
        case "=":
          return cellValue == filterValue;
        case ">":
          return cellNum > filterNum;
        case "<":
          return cellNum < filterNum;
        case ">=":
          return cellNum >= filterNum;
        case "<=":
          return cellNum <= filterNum;
        case "!=":
          return cellValue != filterValue;
        default:
          return true;
      }
    });
  }, [csvData, filterColumn, filterOperator, debouncedFilterValue, isFiltered]);

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
  } = useChartBuilder(filteredCsvData, columns);

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

  const handleRemoveFile = () => {
    if (confirm(`Do you want to delete the ${fileName}`)) {
        setCSVData([]);
        setFileName("");
        setColumns([]);
        setFilterColumn("");
        setFilterOperator("=");
        setFilterValue("");
    }
  };

  return (
    <div className="space-y-6">
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
        {csvData.length > 0 && (
          <button
            className="text-red-600 hover:text-red-900 cursor-pointer"
            onClick={handleRemoveFile}
          >
            Remove File
          </button>
        )}
      </div>

      {/* Box 2: Preview */}
      <div className="bg-white rounded-xl shadow p-6">
        {csvData.length > 0 && (
          <div className="mb-6 p-6  border border-blue-200 rounded-xl">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              🔍 Filters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              {/* Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Column
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={filterColumn}
                  onChange={(e) => setFilterColumn(e.target.value)}
                >
                  <option value="">Select column...</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              {/* Operator */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operator
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={filterOperator}
                  onChange={(e) => setFilterOperator(e.target.value)}
                >
                  <option value="=">=</option>
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                  <option value=">=">&ge;</option>
                  <option value="<=">&le;</option>
                  <option value="!=">&ne;</option>
                </select>
              </div>

              {/* Value */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Value"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                  {isFiltered && (
                    <button
                      className="px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 whitespace-nowrap"
                      onClick={() => {
                        setIsFiltered(false);
                        setFilterColumn("");
                        setFilterOperator("=");
                        setFilterValue("");
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600 font-medium">
              {`Showing ${filteredCsvData.length} of ${csvData.length} rows`}
            </div>
          </div>
        )}

        {parseLoading && (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">📊 Parsing your data...</div>
          </div>
        )}

        {filteredCsvData.length === 0 && csvData.length > 0 ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">
              📊 No rows match this filter
            </div>
          </div>
        ) : csvData.length > 0 ? (
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
                {filteredCsvData.slice(0, 5).map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {columns.map((cols, colIndex) => (
                      <td className="border border-gray-300 p-3" key={colIndex}>
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
              📋 Data Preview
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
        {filteredCsvData.length > 0 ? (
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
                filteredCsvData.length > 0 &&
                xaxis &&
                yaxis &&
                yAxisError === ""
                  ? "bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 cursor-pointer mt-4"
                  : "bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed mt-4"
              }
              onClick={generateChart}
              disabled={
                !(
                  filteredCsvData.length > 0 &&
                  xaxis &&
                  yaxis &&
                  yAxisError === ""
                )
              }
            >
              Generate Chart
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Select columns after uploading data</p>
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
    </div>
  );
};

export default BuilderPage;
