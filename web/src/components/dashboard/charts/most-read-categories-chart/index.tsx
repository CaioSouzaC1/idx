"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ICategoryMostRead } from "@/interfaces/Reading";
import { useGetMostReadcategories } from "@/hooks/categories/use-get-most-read-categories";

const chartConfig = {
  readers: {
    label: "Leitores",
  },
  books: {
    label: "Books",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MostReadCategoriesChart({
  day_quantity,
}: {
  day_quantity: number;
}) {
  const { categories } = useGetMostReadcategories({
    day_quantity: day_quantity,
  });

  const chartData = React.useMemo(() => {
    if (!categories) return [];
    return categories.data.data.map(
      (category: ICategoryMostRead, i: number) => ({
        name: category.category_name,
        readers: category.read_count,
        fill: i % 2 === 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))",
      })
    );
  }, [categories]);

  const totalReaders = React.useMemo(() => {
    return chartData.reduce((acc: any, curr: any) => acc + curr.readers, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Categorias mais lidas</CardTitle>
        <CardDescription>Últimos {day_quantity} dias</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="readers"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          {totalReaders.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Leitores
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground text-center">
          Mostrando as categorias mais lidos nos últimos {day_quantity} dias.
        </div>
      </CardFooter>
    </Card>
  );
}
