import { useState } from "react";
import Papa from "papaparse";
import { useLocalStorage } from "./useLocalStorage";

export function useCsvData() {
  const [csvData, setCSVData] = useLocalStorage("CsvData", []);
  const [fileName, setFileName] = useLocalStorage("CsvFileName", "");
  const [columns, setColumns] = useLocalStorage("CsvColumns", []);
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
    setCSVData,
    setFileName,
    setColumns,
    fileName,
    csvData,
    columns,
    parseLoading,
    handleSelectFile,
  };
}
