import React, { useRef } from "react";
import { useCsvData } from "../hooks/useCsvData";
import { useChartBuilder } from "../hooks/useChartBuilder";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "../hooks/useDebounce";
import ChartRenderer from "../common/ChartRenderer";
import { FiUploadCloud } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosSave, IoMdDownload } from "react-icons/io";
import html2canvas from 'html2canvas-pro'
import { useDownloadImage } from "../hooks/useDownloadImage";

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

  const printRef = useRef(null); // Create a ref

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left Sidebar */}
      <div className="w-80 shrink-0 space-y-6">
        {/* Data Source */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 ">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Data Source
          </h2>

          <input
            type="file"
            accept=".csv "
            onChange={(e) => handleSelectFile(e)}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input">
            <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed bg-gray-50 border-gray-300 rounded-lg mb-4 cursor-pointer">
              <div className="text-4xl mb-3">
                <FiUploadCloud className="text-amber-600" />
              </div>
              <p className="text-sm text-gray-600 text-center mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400">CSV, XLSX or Excel</p>
              <div className="bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-amber-700 cursor-pointer text-center mt-4">
                Browse Files
              </div>
            </div>
          </label>
          {fileName && (
            <div className="mt-4 flex items-center justify-between p-3 border border-amber-200 rounded-lg text-amber-600 bg-white">
              <div className="flex items-center gap-3">
                <div className=" text-xl">
                  <FaRegFileAlt />
                </div>
                <div>
                  <h3 className="text-sm font-medium ">{fileName}</h3>
                  <p className="text-xs flex">
                    <CiCircleCheck className="self-center mr-1 " /> Uploaded{" "}
                  </p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-600 text-lg"
                onClick={handleRemoveFile}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Configuration
          </h2>
          {filteredCsvData.length > 0 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Chart Type
                </label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="bar">📊 Bar Chart</option>
                  <option value="line">📈 Line Chart</option>
                  <option value="pie">🥧 Pie Chart</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  X-Axis Dimension
                </label>
                <select
                  value={xaxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {columns.map((cols, index) => (
                    <option key={index} value={cols}>
                      {cols}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Y-Axis Metric
                </label>
                <select
                  value={yaxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {columns.map((cols, index) => (
                    <option key={index} value={cols}>
                      {cols}
                    </option>
                  ))}
                </select>
                {yAxisError !== "" && (
                  <p className="text-xs text-red-600 mt-1">{yAxisError}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Aggregation
                </label>
                <select
                  value={aggregation}
                  onChange={(e) => setAggregation(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    ? "w-full bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-orange-600 cursor-pointer mt-4"
                    : "w-full bg-gray-300 text-gray-500 text-sm font-medium px-4 py-2 rounded-md cursor-not-allowed mt-4"
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
            <p className="text-sm text-gray-500">Upload data to configure</p>
          )}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 space-y-6">
        {/* Filters & Source Data Preview */}

        {csvData.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              🔍 Filters & Preview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Column
                </label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Operator
                </label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Value"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                {isFiltered && (
                  <button
                    className="px-3 py-2 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50 whitespace-nowrap"
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

            <div className="mt-4 text-xs text-gray-600">
              {`${filteredCsvData.length} rows filtered`}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-gray-700">
                  Source Data Preview
                </h2>
                {csvData.length > 0 && (
                  <span className="text-xs text-gray-500">5 rows shown</span>
                )}
              </div>

              {parseLoading && (
                <div className="text-center py-8">
                  <div className="text-sm text-gray-600">
                    📊 Parsing your data...
                  </div>
                </div>
              )}

              {filteredCsvData.length === 0 && csvData.length > 0 ? (
                <div className="text-center py-8">
                  <div className="text-sm text-gray-500">
                    No rows match this filter
                  </div>
                </div>
              ) : csvData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {columns.map((col, index) => (
                          <th
                            className="text-left py-3 px-4 font-medium text-gray-700"
                            key={index}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCsvData.slice(0, 5).map((row, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          {columns.map((cols, colIndex) => (
                            <td
                              className="py-3 px-4 text-gray-600"
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
              ) : null}
            </div>
          </div>
        ) : (
          <div className=" bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              🔍 Filters & Preview
            </h3>
            <div className="flex justify-center items-center py-32">
              <p className="text-gray-400">Upload file to see preview</p>
            </div>
          </div>
        )}

        {/* Visualization Preview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-semibold text-gray-700">
              Visualization Preview
            </h2>
            {showChart && !chartLoading && (
              <div className="flex space-x-6">
                <button
                  onClick={()=>useDownloadImage(printRef)}
                  className="bg-orange-100 text-black text-sm px-4 py-2 rounded-md hover:bg-orange-300 cursor-pointer flex"
                >
                  <IoMdDownload className="self-center mr-1" /> Download
                </button>
                <button
                  onClick={addToDashboard}
                  className="bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-amber-700 cursor-pointer flex"
                >
                  <IoIosSave className="self-center mr-1" /> Add to Dashboard
                </button>
              </div>
            )}
          </div>

          {chartLoading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div>
            </div>
          ) : csvData.length > 0 && showChart ? (
            <div className="flex justify-center" ref={printRef}>
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
            <div className="flex justify-center items-center py-32">
              <p className="text-gray-400">Chart will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
