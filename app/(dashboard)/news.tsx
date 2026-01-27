import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const palette = {
  background: "#fbf7f2",
  accent: "#a6683f",
  dark: "#2b140a",
};

const chocolateCategories = [
  {
    title: "Chocolate Cookies",
    description:
      "Soft bites loaded with 72% cacao chunks, cacao nib dust, and smoked salt.",
    color: "#2b140a",
  },
  {
    title: "Chocolate Cakes",
    description:
      "Layered tortes with light brown sugar sponge and dark ganache ribbons.",
    color: "#592c1a",
  },
  {
    title: "Chocolate Bars",
    description:
      "Limited-edition tablets with roasted pistachio, citrus peel, and edible petals.",
    color: "#3b1d0f",
  },
  {
    title: "Chocolate Drinks",
    description:
      "Single-origin sipping chocolate, cacao cold brew, and nitro cocoa tonics.",
    color: "#1f130c",
  },
  {
    title: "Chocolate Truffles",
    description:
      "Hand-rolled pralines with Tahitian vanilla cream and caramelized hazelnuts.",
    color: "#4e2a1b",
  },
];

const News = () => {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingBottom: 64,
        backgroundColor: palette.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pt-12">
        <Text className="text-sm uppercase tracking-[0.4em] text-[#a6683f]">
          Chocolate Varieties
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#1e1009]">
          Curated categories to explore
        </Text>
        <Text className="mt-3 text-base text-[#4a2d1b]">
          Browse every SweetZone format and tap into detailed catalogs when you
          are ready for more.
        </Text>
      </View>

      <View className="mt-8 px-6">
        <Pressable
          className="self-start rounded-full border border-[#d6b28c]/50 px-4 py-2"
          onPress={() => router.push("/categories")}
        >
          <Text className="text-sm font-semibold text-[#7b3c1d]">
            View master catalog
          </Text>
        </Pressable>
      </View>

      <View className="mt-6 gap-4 px-6">
        {chocolateCategories.map((category) => (
          <CategoryCard
            key={category.title}
            category={category}
            onPress={() => router.push("/categories")}
          />
        ))}
      </View>
    </ScrollView>
  );
};

type Category = (typeof chocolateCategories)[number];

const CategoryCard = ({
  category,
  onPress,
}: {
  category: Category;
  onPress?: () => void;
}) => {
  return (
    <View
      className="rounded-3xl p-5 shadow-md"
      style={{ backgroundColor: category.color }}
    >
      <Text className="text-sm uppercase tracking-[0.3em] text-[#f4e4d4]/80">
        Signature Style
      </Text>
      <Text className="mt-2 text-2xl font-semibold text-white">
        {category.title}
      </Text>
      <Text className="mt-3 text-base leading-6 text-[#f2dec7]">
        {category.description}
      </Text>
      <Pressable
        className="mt-4 self-start rounded-2xl bg-white/15 px-4 py-2"
        onPress={onPress}
      >
        <Text className="text-sm font-semibold text-white">View flavors</Text>
      </Pressable>
    </View>
  );
};

export default News;
