"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { StatisticCard } from "@/components/dashboard/statistic-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  BarChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: 2400,
  },
  {
    name: "Feb",
    total: 1398,
  },
  {
    name: "Mar",
    total: 9800,
  },
  {
    name: "Apr",
    total: 3908,
  },
  {
    name: "May",
    total: 4800,
  },
  {
    name: "Jun",
    total: 3800,
  },
  {
    name: "Jul",
    total: 4300,
  },
];

export function DashboardContent() {
  const { data: session } = useSession();
  const [activeChart, setActiveChart] = useState("weekly");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 md:ml-64"
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name}! Here's what's happening with your projects today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <StatisticCard
          title="Subscriptions"
          value="+2350"
          description="+180.1% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatisticCard
          title="Sales"
          value="+12,234"
          description="+19% from last month"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
        <StatisticCard
          title="Active Now"
          value="+573"
          description="+201 since last hour"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Overview</CardTitle>
              <p className="text-sm text-muted-foreground">
                Sales performance for this period
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 rounded-md bg-muted p-1 text-xs font-medium">
                <button
                  onClick={() => setActiveChart("daily")}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-2.5 py-1 transition-colors",
                    activeChart === "daily"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Daily
                </button>
                <button
                  onClick={() => setActiveChart("weekly")}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-2.5 py-1 transition-colors",
                    activeChart === "weekly"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setActiveChart("monthly")}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-2.5 py-1 transition-colors",
                    activeChart === "monthly"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Monthly
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  name: "Olivia Martin",
                  email: "olivia.martin@email.com",
                  amount: "+$1,999.00",
                  positive: true,
                },
                {
                  name: "Jackson Lee",
                  email: "jackson.lee@email.com",
                  amount: "+$39.00",
                  positive: true,
                },
                {
                  name: "Isabella Nguyen",
                  email: "isabella.nguyen@email.com",
                  amount: "-$299.00",
                  positive: false,
                },
                {
                  name: "William Kim",
                  email: "will@email.com",
                  amount: "+$99.00",
                  positive: true,
                },
                {
                  name: "Sofia Davis",
                  email: "sofia.davis@email.com",
                  amount: "+$39.00",
                  positive: true,
                },
              ].map((sale, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 10}`} alt={sale.name} />
                    <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium flex items-center">
                    {sale.positive ? (
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={sale.positive ? "text-green-500" : "text-red-500"}
                    >
                      {sale.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}