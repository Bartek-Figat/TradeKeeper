import React, { useRef, useEffect, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  BarData,
} from "lightweight-charts";
import { priceData } from "./priceData";

const TradingViewChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [candlePrice, setCandlePrice] = useState<BarData | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart: IChartApi = createChart(chartContainerRef.current, {
        width: 900,
        height: 400,
        layout: {
          background: { color: "#253248" },
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "#334158",
          },
          horzLines: {
            color: "#334158",
          },
        },
        timeScale: {
          borderColor: "#485c7b",
        },
      });

      const candleSeries: ISeriesApi<"Candlestick"> =
        chart.addCandlestickSeries({
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: false,
          wickUpColor: "#26a69a",
          wickDownColor: "#ef5350",
        });

      const candleData = priceData.map((data) => ({
        time: data.time,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
      }));

      candleSeries.setData(candleData);

      chart.timeScale().fitContent();

      chart.subscribeCrosshairMove((param) => {
        if (param.time) {
          const data = param.seriesData.get(candleSeries) as
            | BarData
            | undefined;
          if (data) setCandlePrice(data);
        }
      });

      return () => {
        chart.remove();
      };
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
      <div className="flex">
        <div ref={chartContainerRef} className="flex">
          <div ref={tooltipRef} className="relative">
            <h3 className="absolute left-6 top-2 z-10 text-stone-50">
              <div className="flex">
                <p className="p-1">AAPL</p>
                <p className="p-1">{candlePrice?.open}</p>
              </div>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingViewChart;
