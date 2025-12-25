import React, {useRef} from "react";
import ChartRenderer from "../common/ChartRenderer";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas-pro";
import { useDownloadImage } from "../hooks/useDownloadImage";

const DashboardPage = ({ savedCharts, setSavedCharts }) => {
  const removeChart = (chartID) => {
    if (confirm("Remove this chart from dashboard?")) {
      const newSavedCharts = savedCharts.filter(
        (chart) => chart.id !== chartID
      );
      setSavedCharts(newSavedCharts);
    }
  };

  const printRef = useRef(null);
  const downloadImage = useDownloadImage();  

  return (
    <div className="p-8 m-4 bg-white border rounded-xl border-gray-200 min-h-screen ">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold  text-gray-700">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Total charts: {savedCharts.length}
          </p>
        </div>
        {savedCharts.length > 0 && (
          <div className="flex space-x-6">
            <button
              onClick={()=>downloadImage(printRef)  }
              className="bg-orange-100 text-black text-sm px-4 py-2 rounded-md hover:bg-orange-300 cursor-pointer flex"
            >
              <IoMdDownload className="self-center mr-1" /> Download
            </button>
            <button
              onClick={() => {
                if (
                  confirm("Do you want to remove all charts from Dashboard")
                ) {
                  setSavedCharts([]);
                }
              }}
              className="bg-orange-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors flex"
            >
              <RiDeleteBin6Line className="self-center mr-1" /> Remove All
              Charts
            </button>
          </div>
        )}
      </div>

      {savedCharts.length === 0 ? (
        <div className="bg-white p-12">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No charts in dashboard
            </h3>
            <p className="text-sm text-gray-500">
              Generate a chart and click "Add to Dashboard"
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-gray-200 pt-9 " ref={printRef}>
          {savedCharts.map((item, index) => {
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold  text-gray-900 text-sm">
                    {item.type.toUpperCase()} Chart - {item.x.toUpperCase()} vs{" "}
                    {item.y.toUpperCase()}
                    {item.aggregation && ` (${item.aggregation.toUpperCase()})`}
                  </h3>
                  <button
                    onClick={() => removeChart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>

                <div className="flex justify-center bg-white rounded-lg p-4">
                  <ChartRenderer chart={item} width={350} height={250} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
