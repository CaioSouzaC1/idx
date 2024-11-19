"use client";

import { Urls } from "@/interfaces/enum/urls";
import Layout from "../../_layouts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useGetCategories } from "@/hooks/categories/use-get-categories";
import { CategoryCard } from "@/components/ui/focus-cards";
import { useState } from "react";
import { ICategory } from "@/interfaces/Category";
import CreateCategoryDialog from "@/components/categories/create-category-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationFull } from "@/components/ui/pagination";

export default function CategoriesPage() {
  const { categories } = useGetCategories({});

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Layout breadcrumbItems={<BreadcrumbItems />}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <CreateCategoryDialog />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto w-full">
          {categories ? (
            categories.data.total > 0 ? (
              categories.data.data.map((category: ICategory, index: number) => (
                <CategoryCard
                  key={category.id}
                  card={{
                    title: category.name,
                    src: category.full_path,
                  }}
                  index={index}
                  hovered={hovered}
                  setHovered={setHovered}
                  category={category}
                />
              ))
            ) : (
              <div></div>
            )
          ) : (
            Array.from({ length: 9 }).map((_, i) => {
              return <Skeleton key={i} className="col-span-1 w-full h-full" />;
            })
          )}
        </div>
      </div>
      {categories && (
        <div className="p-4">
          <PaginationFull
            pageIndex={categories.data.current_page}
            totalCount={categories.data.total}
            perPage={categories.data.per_page}
          />
        </div>
      )}
    </Layout>
  );
}
function BreadcrumbItems() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={Urls.CATEGORIES}>Categorias</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
