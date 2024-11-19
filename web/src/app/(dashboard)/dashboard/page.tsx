"use client";
import { Urls } from "@/interfaces/enum/urls";
import Layout from "../../_layouts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { MostReadBooksChart } from "@/components/dashboard/charts/most-read-books-chart";
import { useState } from "react";
import DayQuantitySelect from "@/components/days/day-quantity-select";
import { MostReadCategoriesChart } from "@/components/dashboard/charts/most-read-categories-chart";
import { MostFinishedBooksChart } from "@/components/dashboard/charts/most-finished-books-chart";

export default function DashboardPage() {
  const [dayQuantity, setDayQuantity] = useState<number>(7);

  return (
    <Layout breadcrumbItems={<BreadcrumbItems />}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex gap-4 justify-end items-center">
          <p className="text-sm">Quantidade de dias</p>
          <DayQuantitySelect setValue={setDayQuantity} />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <MostReadBooksChart day_quantity={dayQuantity} />
          <MostReadCategoriesChart day_quantity={dayQuantity} />
          <MostFinishedBooksChart day_quantity={dayQuantity} />
        </div>
      </div>
    </Layout>
  );
}

function BreadcrumbItems() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={Urls.DASHBOARD}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
