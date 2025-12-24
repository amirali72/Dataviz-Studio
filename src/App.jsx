import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import BuilderPage from "./pages/BuilderPage";

function App() {
  const [savedCharts, setSavedCharts] = useLocalStorage("dashboardCharts", []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Navbar />
        <div className="space-y-6">
          <Routes>
            <Route
              path="/"
              element={
                <BuilderPage
                  savedCharts={savedCharts}
                  setSavedCharts={setSavedCharts}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  savedCharts={savedCharts}
                  setSavedCharts={setSavedCharts}
                />
              }
            />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
