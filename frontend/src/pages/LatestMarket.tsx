import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// Chart configuration
const chartSeries = [
  {
    name: "Sales",
    data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
  },
];

const chartOptions = {
  chart: {
    type: "line" as const, // Ensure this is a valid type
    height: 240,
    toolbar: {
      show: false,
    },
  },
  title: {
    text: "", // Add a text property to satisfy the ApexTitleSubtitle type
    align: "left" as const, // Explicitly cast to the correct literal type
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#263238"
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#020617"],
  stroke: {
    lineCap: "round" as const, // Explicitly cast to the correct literal type
  },
  markers: {
    size: 5,
    colors: ["#020617"],
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    categories: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: {
    labels: {
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
  },
};

const LatestMarket: React.FC = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Latest Market Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stocks Card 1 */}
          <div className="max-w-sm w-full rounded-lg p-4 md:p-6">
            <div>
              <Card placeholder="Your placeholder text">
                <CardHeader placeholder="Your placeholder text" floated={false} shadow={false} color="transparent" className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
                  <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography placeholder="Your placeholder text" variant="h6" color="blue-gray">
                      Sales Line Chart
                    </Typography>
                    <Typography placeholder="Your placeholder text" variant="small" color="gray" className="max-w-sm font-normal">
                      Visualize your sales data in a simple way using the
                      @material-tailwind/react chart plugin.
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody placeholder="Your placeholder text" className="px-2 pb-0">
                  <Chart series={chartSeries} options={chartOptions} />
                </CardBody>
              </Card>
            </div>
          </div>
          {/* End of Stocks Card 1 */}
          {/* Stocks Card 1 */}
          <div className="max-w-sm w-full rounded-lg p-4 md:p-6">
            <div>
              <Card placeholder="Your placeholder text">
                <CardHeader placeholder="Your placeholder text" floated={false} shadow={false} color="transparent" className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
                  <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography placeholder="Your placeholder text" variant="h6" color="blue-gray">
                      Sales Line Chart
                    </Typography>
                    <Typography placeholder="Your placeholder text" variant="small" color="gray" className="max-w-sm font-normal">
                      Visualize your sales data in a simple way using the
                      @material-tailwind/react chart plugin.
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody placeholder="Your placeholder text" className="px-2 pb-0">
                  <Chart series={chartSeries} options={chartOptions} />
                </CardBody>
              </Card>
            </div>
          </div>
          {/* End of Stocks Card 1 */}
          {/* Stocks Card 1 */}
          <div className="max-w-sm w-full rounded-lg p-4 md:p-6">
            <div>
              <Card placeholder="Your placeholder text">
                <CardHeader placeholder="Your placeholder text" floated={false} shadow={false} color="transparent" className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
                  <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography placeholder="Your placeholder text" variant="h6" color="blue-gray">
                      Sales Line Chart
                    </Typography>
                    <Typography placeholder="Your placeholder text" variant="small" color="gray" className="max-w-sm font-normal">
                      Visualize your sales data in a simple way using the
                      @material-tailwind/react chart plugin.
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody placeholder="Your placeholder text" className="px-2 pb-0">
                  <Chart series={chartSeries} options={chartOptions} />
                </CardBody>
              </Card>
            </div>
          </div>
          {/* End of Stocks Card 1 */}
          {/* Stocks Card 1 */}
          <div className="max-w-sm w-full rounded-lg p-4 md:p-6">
            <div>
              <Card placeholder="Your placeholder text">
                <CardHeader placeholder="Your placeholder text" floated={false} shadow={false} color="transparent" className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
                  <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography placeholder="Your placeholder text" variant="h6" color="blue-gray">
                      Sales Line Chart
                    </Typography>
                    <Typography placeholder="Your placeholder text" variant="small" color="gray" className="max-w-sm font-normal">
                      Visualize your sales data in a simple way using the
                      @material-tailwind/react chart plugin.
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody placeholder="Your placeholder text" className="px-2 pb-0">
                  <Chart series={chartSeries} options={chartOptions} />
                </CardBody>
              </Card>
            </div>
          </div>
          {/* End of Stocks Card 1 */}
        </div>
      </div>
    </section>
  );
};

export default LatestMarket;
