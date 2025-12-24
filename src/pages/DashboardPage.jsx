import React from "react";
import ChartRenderer from "../common/ChartRenderer";

const DashboardPage = ({savedCharts, setSavedCharts}) => {
  const removeChart = (chartID) => {
    if (confirm("Remove this chart from dashboard?")) {
      const newSavedCharts = savedCharts.filter(
        (chart) => chart.id !== chartID
      );
      setSavedCharts(newSavedCharts);
    }
  };

  return (
    <div className="space-y-6">
      {/* Box 5: Dashboard */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          📊 Dashboard ({savedCharts.length} charts)
        </h2>
        {savedCharts.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Do you want to remove all charts from Dashboard")) {
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
                      {item.type.toUpperCase()} Chart - {item.x.toUpperCase()}{" "}
                      vs {item.y.toUpperCase()}
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
  );
};

export default DashboardPage;
