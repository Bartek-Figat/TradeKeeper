import React, { useRef, useEffect, useCallback } from "react";
import { createChart, IChartApi } from "lightweight-charts";

type AreaChartProps = {
  data: Array<{ time: string | number; value: number }>;
};

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const initializeChart = useCallback(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: "#ffffff" },
        textColor: "rgba(33, 56, 77, 1)",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
    });

    chart.applyOptions({
      watermark: {
        color: "rgb(145 149 157 / 30%)",
        visible: true,
        text: "TradeKeeper: Riding the Market Tide!",
        fontSize: 40,
        horzAlign: "center",
        vertAlign: "bottom",
      },
      leftPriceScale: {
        visible: true,
        borderColor: "transparent",
      },
      timeScale: {
        visible: false,
      },
      rightPriceScale: {
        visible: false,
      },
    });

    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(38, 198, 218, 0.56)",
      bottomColor: "rgba(38, 198, 218, 0.04)",
      lineColor: "rgba(38, 198, 218, 1)",
      lineWidth: 2,
      priceLineVisible: true,
    });

    areaSeries.setData(data);
    chartRef.current = chart;
  }, [data]);

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
    <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default AreaChart;
