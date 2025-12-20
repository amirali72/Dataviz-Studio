import { useEffect, useState } from "react";

export const useChartBuilder = (csvData, columns) => {
    const [chartType, setChartType] = useState("bar");
    const [xaxis, setXAxis] = useState("");
    const [yaxis, setYAxis] = useState("");
    const [showChart, setShowChart] = useState(false);
    const [chartConfig, setChartConfig] = useState({});
    const [chartLoading, setChartLoading] = useState(false);
    const [aggregation, setAggregation] = useState("");
    const [chartData, setChartData] = useState([]);
    const [yAxisError, setYAxisError] = useState("");

    const aggregateData = () => {
        if (!aggregation || aggregation === "") {
            return csvData;
        }

        const groupedItems = csvData.reduce((accumulator, currentItem) => {
            const category = currentItem[xaxis];
            if (!accumulator[category]) {
                accumulator[category] = [];
            }
            accumulator[category].push(currentItem[yaxis]);
            return accumulator;
        }, {});

        const result = [];
        for (const property in groupedItems) {
            const values = groupedItems[property];
            let aggregatedValue;

            if (aggregation === "sum") {
                aggregatedValue = values.reduce((a, b) => a + b, 0);
            } else if (aggregation === "average") {
                aggregatedValue = values.reduce((a, b) => a + b, 0) / values.length;
            } else if (aggregation === "count") {
                aggregatedValue = values.length;
            } else if (aggregation === "min") {
                aggregatedValue = Math.min(...values);
            } else if (aggregation === "max") {
                aggregatedValue = Math.max(...values);
            }
            result.push({
                [xaxis]: property,
                [yaxis]: aggregatedValue,
            });
        }

        return result;
    };

    const generateChart = () => {
        setShowChart(true);
        setChartConfig({ type: chartType, x: xaxis, y: yaxis });
        setChartLoading(true);

        const dataToDisplay = aggregateData();
        setChartData(dataToDisplay);

        setTimeout(() => {
            setChartLoading(false);
        }, 400);
    };

    useEffect(() => {
        if (
            Array.isArray(columns) &&
            columns.length >= 2 &&
            xaxis === "" &&
            yaxis === ""
        ) {
            setXAxis(columns[0]);
            setYAxis(columns[1]);
        }
    }, [columns])

    useEffect(() => {
        setChartData([]);
        setShowChart(false);
    }, [csvData]);

    useEffect(() => {

        if (!yaxis || csvData.length === 0) {
            setYAxisError("");
            return;
        }


        const sample = csvData.length > 20 ? csvData.slice(0, 20) : csvData;

        let hasNonNumeric = false;

        for (const row of sample) {
            const value = row[yaxis];


            if (value === null || value === undefined || value === "") {
                continue;
            }

            const isNumeric =
                typeof value === "number" || !isNaN(Number(value));

            if (!isNumeric) {
                hasNonNumeric = true;
                break;
            }
        }

        if (hasNonNumeric) {
            setYAxisError(`Y-axis column '${yaxis}' must be numeric.`);
        } else {
            setYAxisError("");
        }
    }, [yaxis, csvData]);


    return {
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
        yAxisError
    }
}

