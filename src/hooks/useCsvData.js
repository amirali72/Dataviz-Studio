import { useState } from "react";
import Papa from "papaparse";

export function useCsvData() {
  const [fileName, setFileName] = useState("");
  const [csvData, setCSVData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [parseLoading, setParseLoading] = useState(false);

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".csv") || file.name.endsWith(".xlsx")) {
      setParseLoading(true);
      setFileName(file.name);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
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

  return {
    fileName,
    csvData,
    columns,
    parseLoading,
    handleSelectFile,
  };
}
