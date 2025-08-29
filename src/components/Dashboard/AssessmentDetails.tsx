"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getAssessmentsStatsAdmin, getAssessmentsstats } from "@/lib/api";

// --- Type Definitions ---
interface TimelineItem {
  label: string;
  count: number;
}

interface TimelineResponse {
  status: boolean;
  message: string;
  data: TimelineItem[];
}

interface StatusResponse {
  status: boolean;
  message: string;
  data: {
    completed: number;
    pending: number;
  };
}

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export default function Dashboard() {
  const [period, setPeriod] = useState<"12m" | "06m" | "30d" | "7d">("30d");

  // Timeline data for area chart
  const {
    data: timelineData,
    isLoading: isTimelineLoading,
    isError: isTimelineError,
  } = useQuery<TimelineResponse>({
    queryKey: ["assessmentsTimeline", period],
    queryFn: () => getAssessmentsStatsAdmin(period),
  });

  // Overall stats for pie chart
  const {
    data: statusData,
    isLoading: isStatusLoading,
    isError: isStatusError,
  } = useQuery<StatusResponse>({
    queryKey: ["assessmentsStatus"],
    queryFn: getAssessmentsstats,
  });

  if (isTimelineLoading || isStatusLoading) return <div>Loading...</div>;
  if (
    isTimelineError ||
    isStatusError ||
    !timelineData?.data ||
    !statusData?.data
  )
    return <div>Error loading data</div>;

  // Transform API data for area chart
  const areaChartData = timelineData.data.map((item) => ({
    month: item.label,
    value: item.count,
  }));

  const pieChartData: PieChartData[] = [
    { name: "Completed", value: statusData.data.completed, color: "#016102" },
    { name: "Pending", value: statusData.data.pending, color: "#D4A017" },
  ];

  return (
    <div className="p-6">
      <div className="mx-auto container space-y-6">
        {/* Top Row: Area Chart (Timeline) & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Area Chart Card using API data */}
          <Card className="bg-white border border-orange-200 shadow-sm">
            <CardHeader className="pb-4 flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Assessment Timeline
              </CardTitle>
              <div className="flex gap-2">
                {["12m", "06m", "30d", "7d"].map((p) => (
                  <Button
                    key={p}
                    variant="outline"
                    size="sm"
                    className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${
                      period === p ? "bg-gray-100" : "bg-transparent"
                    }`}
                    onClick={() => setPeriod(p as "12m" | "06m" | "30d" | "7d")}
                  >
                    {p === "12m"
                      ? "12 Months"
                      : p === "06m"
                      ? "06 Months"
                      : p === "30d"
                      ? "30 Days"
                      : "7 Days"}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaChartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine
                      axisLine
                      tickMargin={8}
                    />
                    <YAxis hide />
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke="#D4A017"
                      fill="#D4A017"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>

          </Card>

          {/* Pie Chart Card */}
          <Card className="bg-white border border-orange-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Assessment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="ml-8 space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Completed</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {statusData.data.completed}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Pending</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {statusData.data.pending}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#016102] rounded-full"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#D4A017] rounded-full"></div>
                  <span className="text-sm text-gray-600">Progress</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
