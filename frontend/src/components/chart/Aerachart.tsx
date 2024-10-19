import React, { useRef, useEffect, useCallback } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { useSelector } from "react-redux";

type AreaChartProps = {
  data1: Array<{ time: string | number; value: number }>;
  data2: Array<{ time: string | number; value: number }>;
};

const AreaChart1: React.FC<AreaChartProps> = ({ data1, data2 }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeries1Ref = useRef<ISeriesApi<"Line"> | null>(null);
  const lineSeries2Ref = useRef<ISeriesApi<"Line"> | null>(null);
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

  const initializeChart = useCallback(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: darkMode ? "#171717" : "#ffffff" },
        textColor: darkMode ? "#ffffff" : "#000000",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
    });

    // Create first line series
    const lineSeries1 = chart.addLineSeries({
      color: "rgba(255, 0, 0, 1)", // Red line
      lineWidth: 2,
    });
    lineSeries1.setData(
      data1.map(({ time, value }) => ({
        time: new Date(time).toISOString().split("T")[0],
        value,
      })),
    );
    lineSeries1Ref.current = lineSeries1;

    // Create second line series
    const lineSeries2 = chart.addLineSeries({
      color: "rgba(0, 0, 255, 1)", // Blue line
      lineWidth: 2,
    });
    lineSeries2.setData(
      data2.map(({ time, value }) => ({
        time: new Date(time).toISOString().split("T")[0],
        value,
      })),
    );
    lineSeries2Ref.current = lineSeries2;

    // Tooltip setup
    const toolTip = document.createElement("div");
    toolTip.style.width = "120px";
    toolTip.style.height = "auto";
    toolTip.style.position = "absolute";
    toolTip.style.display = "none";
    toolTip.style.padding = "10px";
    toolTip.style.boxSizing = "border-box";
    toolTip.style.fontSize = "14px";
    toolTip.style.textAlign = "left";
    toolTip.style.zIndex = "1000";
    toolTip.style.pointerEvents = "none";
    toolTip.style.border = "1px solid";
    toolTip.style.borderRadius = "8px";
    toolTip.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    toolTip.style.transition = "opacity 0.3s ease";
    toolTip.style.opacity = "0";
    toolTip.style.fontFamily =
      '-apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif';
    toolTip.style.background = darkMode ? "#333" : "white";
    toolTip.style.color = darkMode ? "#fff" : "black";
    toolTip.style.borderColor = "#2962FF";
    chartContainerRef.current.appendChild(toolTip);

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current!.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current!.clientHeight
      ) {
        toolTip.style.opacity = "0";
        toolTip.style.display = "none"; // Hide the tooltip
      } else {
        const dateStr = param.time;
        toolTip.style.opacity = "1";
        toolTip.style.display = "block"; // Show the tooltip
        const data1 = param.seriesData.get(lineSeries1);
        const data2 = param.seriesData.get(lineSeries2);
        let price1 = 0;
        let price2 = 0;
        if (data1 && "value" in data1) {
          price1 = data1.value;
        }
        if (data2 && "value" in data2) {
          price2 = data2.value;
        }
        toolTip.innerHTML = `<div style="color: #2962FF; font-weight: bold;">Data 1: ${Math.round(100 * price1) / 100}</div>
                             <div style="color: #2962FF; font-weight: bold;">Data 2: ${Math.round(100 * price2) / 100}</div>
                             <div style="color: ${darkMode ? "#aaa" : "black"}">${dateStr}</div>`;

        const coordinate1 = lineSeries1.priceToCoordinate(price1);
        const coordinate2 = lineSeries2.priceToCoordinate(price2);
        let shiftedCoordinate = param.point.x - 60;
        if (coordinate1 === null || coordinate2 === null) {
          return;
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(
            chartContainerRef.current!.clientWidth - 120,
            shiftedCoordinate,
          ),
        );
        const coordinateY =
          Math.min(coordinate1, coordinate2) - 80 - 15 > 0
            ? Math.min(coordinate1, coordinate2) - 80 - 15
            : Math.max(
                0,
                Math.min(
                  chartContainerRef.current!.clientHeight - 80 - 15,
                  Math.max(coordinate1, coordinate2) + 15,
                ),
              );
        toolTip.style.left = shiftedCoordinate + "px";
        toolTip.style.top = coordinateY + "px";
      }
    });

    chart.timeScale().fitContent();
    chartRef.current = chart;
  }, [data1, data2, darkMode]);

  useEffect(() => {
    initializeChart();

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0 || !chartRef.current) return;
      const { width, height } =
        chartContainerRef.current!.getBoundingClientRect();
      chartRef.current.applyOptions({ width, height });
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [initializeChart]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: "400px",
        minHeight: "300px",
      }}
    />
  );
};

export default AreaChart1;
