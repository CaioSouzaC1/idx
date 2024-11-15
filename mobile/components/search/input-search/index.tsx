import { Search } from "lucide-react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { TextInput } from "~/components/ui/text-input";
import { useColorScheme } from "~/lib/useColorScheme";

export default function InputSearch({
  placeholder,
  setSearch,
  setPage,
}: {
  placeholder: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const { isDarkColorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearch(searchQuery);
      if (searchQuery !== "") setPage(1);
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, setSearch]);

  return (
    <View className="flex-1 flex-row gap-1">
      <Button variant="outline" size="icon">
        <Search
          height={16}
          width={16}
          color={!isDarkColorScheme ? "black" : "white"}
        />
      </Button>
      <TextInput
        className="flex-1"
        placeholder={placeholder}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
}
