import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function Inquiries() {
  const [series, setSeries] = useState([
    {
      name: "Last 6 months",
      data: [0, 0, 0, 0, 0, 0],
    },
    {
      name: "Same period last year",
      data: [0, 0, 0, 0, 0, 0],
    },
  ]);

  // Generate random data between 0 and 30k
  const generateRandomData = () => {
    const newSeries = [
      {
        name: "Last 6 months",
        data: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 30000)
        ),
      },
      {
        name: "Same period last year",
        data: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 30000)
        ),
      },
    ];

    setSeries(newSeries);
  };

  // Generate initial data on component mount
  useEffect(() => {
    generateRandomData();
  }, []);

  const options: ApexOptions = {
    colors: ["#006AFF", "#656575"],
    chart: {
      height: 300,
      type: "line",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 overflow-hidden pb-1 lg:pb-3 pt-5 lg:pt-8 px-5 lg:px-7">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold">Inquiries</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-grey-02">Monthly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-grey-02" />
            <span className="text-xs text-grey-02">Annually</span>
          </div>
        </div>
      </div>
      <ReactApexChart
        height={300}
        options={options}
        series={series}
        type="line"
      />
    </div>
  );
}
