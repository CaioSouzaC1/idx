import { useState } from "react";
import { ScrollView, View } from "react-native";
import CategoryCard from "~/components/category/category-card";
import InputSearch from "~/components/search/input-search";
import { Container } from "~/components/ui/container";
import Pagination from "~/components/ui/pagination";
import { Text } from "~/components/ui/text";
import { useGetCategories } from "~/hooks/categories/use-get-categories";
import { ICategory } from "~/interfaces/Category";

export default function CategoriesPage() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { categories } = useGetCategories({
    search,
    page,
  });

  return (
    <Container className="gap-4">
      <View className="h-8">
        <InputSearch
          placeholder="Romance"
          setSearch={setSearch}
          setPage={setPage}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="gap-4">
        <View>
          {categories &&
            categories.data.data.map((category: ICategory) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </View>
        {categories && (
          <Pagination
            pageIndex={page}
            setPage={setPage}
            totalCount={categories.data.total}
            perPage={categories.data.per_page}
          />
        )}
      </ScrollView>
    </Container>
  );
}
