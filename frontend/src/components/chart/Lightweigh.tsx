import React, { useRef, useEffect, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CrosshairMode,
} from "lightweight-charts";
import { priceData } from "./priceData";
// import CardInformation from "./CardInformation";

const TradingViewChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [candlePrice, setCandelPrice] = useState(null);

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

      // const timeToTz = (originalTime, timeZone) => {
      //   const zonedDate = new Date(
      //     new Date(originalTime * 1000).toLocaleString("en-US", { timeZone })
      //   );
      //   return zonedDate.getTime() / 1000;
      // };

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
      candleSeries.createPriceLine({
        price: 170,
        color: "#be1238",
        lineWidth: 1,
        lineStyle: 0,
        axisLabelVisible: true,
        title: "Limit Price",
      });
      candleSeries.createPriceLine({
        price: 190,
        color: "white",
        lineWidth: 1,
        lineStyle: 0,
        axisLabelVisible: true,
        title: "Entry Position",
      });
      candleSeries.createPriceLine({
        price: 220,
        color: "green",
        lineWidth: 1,
        lineStyle: 0,
        axisLabelVisible: true,
        title: "Profit Target",
      });

      chart.timeScale().fitContent();

      // const formatters = {
      //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //   Dollar: function (price: any) {
      //     return "$" + price.toFixed(2);
      //   },
      //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //   Pound: function (price: any) {
      //     return "\u20A0" + price.toFixed(2);
      //   },
      // };

      // const formatterNames = Object.keys(formatters);

      // const currentLocale = window.navigator.languages[0];

      // const myPriceFormatter = Intl.NumberFormat(currentLocale, {
      //   style: "currency",
      //   currency: "USD", // Currency for data points
      // }).format;

      // Add watermark with the random stock symbol
      chart.applyOptions({
        watermark: {
          color: "rgb(145 149 157 / 30%)",
          visible: true,
          text: "AAPL",
          fontSize: 64,
          horzAlign: "center",
          vertAlign: "bottom",
        },
        timeScale: {
          visible: true,
          timeVisible: true,
        },
        localization: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          priceFormatter: function (price: any) {
            return "$" + price.toFixed(2);
          },
        },
        layout: {
          fontFamily: "'Roboto', sans-serif",
        },
        crosshair: {
          mode: CrosshairMode.Magnet,
          vertLine: {
            width: 4,
            color: "#C3BCDB44",
            style: 0,
            labelBackgroundColor: "#9B7DFF",
            labelVisible: false,
          },
          horzLine: {
            visible: false,
            color: "#9B7DFF",
            labelBackgroundColor: "#9B7DFF",
          },
        },
      });

      chart.priceScale("right").applyOptions({
        scaleMargins: {
          bottom: 0.2,
          top: 0.2,
        },
        ticksVisible: true,
        minimumWidth: 1,
      });

      chart.subscribeCrosshairMove((param) => {
        if (param.time) {
          const data = param.seriesData.get(candleSeries);
          if (data) return setCandelPrice(data);
        }
      });

      candleSeries.setMarkers([
        {
          time: "2019-05-17",
          position: "aboveBar",
          color: "green",
          shape: "arrowDown",
          id: "id4",
          text: "Enter Position",
          size: 2,
        },
      ]);

      return () => {
        chart.remove();
      };
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="flex">
        <div ref={chartContainerRef} className="flex">
          <div ref={tooltipRef} className="relative">
            <h3 className="absolute text-stone-50 top-2 left-6 z-10">
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
