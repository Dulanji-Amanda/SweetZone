import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const palette = {
  background: "#fbf7f2",
  section: "#fffaf5",
  accent: "#d6b28c",
  deep: "#1a120b",
  border: "#ead7c0",
};

const chocolateCatalog = [
  {
    title: "Chocolate Cookies",
    story:
      "Soft interiors, cocoa nib crunch, and fleur de sel crystals baked daily.",
    hue: "#2b140a",
    items: [
      {
        name: "Cacao Chip Snap",
        description: "72% cacao dough, smoked salt, and burnt sugar chips.",
        price: 900,
        image:
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "White Velvet Bite",
        description: "White chocolate base studded with caramelized hazelnuts.",
        price: 1600,
        image:
          "https://images.unsplash.com/photo-1619149651177-b09092806f1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    title: "Chocolate Cakes",
    story:
      "Mini tortes soaked in cacao cordial and finished with velvet ganache.",
    hue: "#4a2414",
    items: [
      {
        name: "Mocha Mousse Cake",
        description: "Espresso jaconde, amber caramel, and cocoa mirror glaze.",
        price: 4200,
        image:
          "https://plus.unsplash.com/premium_photo-1723618822165-0b13c0471fc4?q=80&w=708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Rosewood Gateau",
        description: "Light brown sugar sponge layered with rose ganache.",
        price: 1500,
        image:
          "https://plus.unsplash.com/premium_photo-1713920190025-79fb720f3ee1?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    title: "Chocolate Bars",
    story: "Hand-tempered tablets highlighting origin-specific terroir.",
    hue: "#3b1d0f",
    items: [
      {
        name: "Hazelnut Praline",
        description: " 72% dark chocolate with crushed caramelized hazelnuts.",
        price: 1400,
        image:
          "https://images.unsplash.com/photo-1618320362989-d8a9eb2a1e52?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Ivory Pistachio",
        description: "White chocolate with roasted pistachios and rose petal.",
        price: 1600,
        image:
          "https://plus.unsplash.com/premium_photo-1673138930008-64cdecb37a95?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    title: "Chocolate Drinks",
    story: "Sipping chocolates and chilled tonics extracted in small batches.",
    hue: "#1f130c",
    items: [
      {
        name: "Spiced Sipping Chocolate",
        description: "Spiced dark sipping chocolate with smoked chili oil.",
        price: 1200,
        image:
          "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Cacao Cold Brew",
        description:
          "Nitro-infused cacao tea with Ethiopian coffee concentrate.",
        price: 1000,
        image:
          "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    title: "Chocolate Truffles",
    story: "Hand-rolled pralines dusted with edible bronze and botanicals.",
    hue: "#4e2a1b",
    items: [
      {
        name: "Lavender Honey",
        description: "Milk chocolate ganache infused with lavender nectar.",
        price: 2400,
        image:
          "https://images.unsplash.com/photo-1706147601212-9c6ac9bfff5e?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0",
      },
      {
        name: "Yuzu Cacao",
        description: "Dark ganache with candied yuzu and cacao fruit jelly.",
        price: 2000,
        image:
          "https://plus.unsplash.com/premium_photo-1667031519185-3dad7d8931cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
];

const Categories = () => {
  const router = useRouter();

  const handleAddToCart = (
    item: (typeof chocolateCatalog)[number]["items"][number],
  ) => {
    router.push({
      pathname: "/(dashboard)/cart",
      params: {
        name: item.name,
        description: item.description,
        price: String(item.price),
        image: item.image,
      },
    });
  };

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
        <Pressable
          className="self-start rounded-full border border-[#d6b28c]/60 px-4 py-2"
          onPress={() => router.back()}
        >
          <Text className="text-sm font-semibold text-[#7b3c1d]">Back</Text>
        </Pressable>
        <Text className="mt-4 text-sm uppercase tracking-[0.4em] text-[#a6683f]">
          Varieties
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">
          Chocolate categories in bloom
        </Text>
        <Text className="mt-2 text-base text-[#4a2d1b]">
          Explore every format—from soft cookies to sip-ready cacao tonics—each
          plated with SweetZone's couture finishes.
        </Text>
      </View>

      <View className="mt-10 gap-8 px-6">
        {chocolateCatalog.map((category) => (
          <View
            key={category.title}
            className="rounded-3xl border border-[#eedfcf] bg-white"
          >
            <View
              className="rounded-t-3xl p-5"
              style={{ backgroundColor: category.hue }}
            >
              <Text className="text-sm uppercase tracking-[0.4em] text-[#f2dec7]">
                {category.title}
              </Text>
              <Text className="mt-2 text-lg text-[#fbeee0]">
                {category.story}
              </Text>
            </View>
            <View className="gap-4 p-5">
              {category.items.map((item) => (
                <View
                  key={item.name}
                  className="flex-row items-center gap-4 rounded-2xl border border-[#ead7c0] bg-[#fffaf5] p-3"
                >
                  <Image
                    source={{ uri: item.image }}
                    className="h-20 w-20 rounded-2xl"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-[#1f130c]">
                      {item.name}
                    </Text>
                    <Text className="text-sm text-[#4a2d1b]">
                      {item.description}
                    </Text>
                    <View className="mt-2 flex-row items-center justify-between">
                      <Text className="text-base font-semibold text-[#7b3c1d]">
                        Rs-{item.price.toFixed(2)}
                      </Text>
                      <Pressable
                        className="rounded-2xl bg-[#1f130c] px-4 py-2"
                        onPress={() => handleAddToCart(item)}
                      >
                        <Text className="text-sm font-semibold text-white">
                          Add to cart
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Categories;
