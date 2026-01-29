import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const palette = {
  background: "#fbf7f2",
  surface: "#fffaf5",
  deep: "#1a120b",
  accent: "#d6b28c",
  border: "#ead7c0",
};

const seasonalCollections = [
  {
    id: "velvet-truffle",
    title: "Velvet Truffle Studio",
    description: "Espresso-infused ganache rolled in vanilla bean cocoa dust.",
    tastingNotes:
      "Notes of espresso crema, smoked sea salt, and cacao nib crunch",
    price: 1500,
    size: "6-piece atelier box",
    status: "Limited",
    image:
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "amber-caramel",
    title: "Amber Caramel Atelier",
    description: "Four-layer praline with pecan gianduja and amber caramel.",
    tastingNotes: "Brown butter brittle, toasted pecan, Madagascar vanilla",
    price: 1200,
    size: "5-piece slab set",
    status: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1565071559227-20ab25b7685e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "midnight-noir",
    title: "Berry-cassis-flight",
    description: "72% cacao bars paired with blackberry balsamic reduction.",
    tastingNotes: "Blackberry jam, cassis, balsamic caramel",
    price: 2600,
    size: "3-bar tasting",
    status: "Chef's pick",
    image:
      "https://images.unsplash.com/photo-1655207454924-be5f412853f2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "rose-latte",
    title: "Blondies",
    description: "White chocolate fudge rippled with rosewater cremeux.",
    tastingNotes: "Turkish delight, cardamom milk, wildflower honey",
    price: 1000,
    size: "9-piece tasting tile",
    status: "New",
    image:
      "https://images.unsplash.com/photo-1682622110395-145cc13d5346?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "cocoa-nectar",
    title: "Cocoa Nectar Orbit",
    description: "Domed bonbons with orange blossom caramel core.",
    tastingNotes: "Citrus oil, buckwheat honey, cacao fruit",
    price: 1400,
    size: "8-piece galaxy set",
    status: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "hazelnut-crown",
    title: "Hazelnut Crown Gateau",
    description:
      "Mini cake topped with praline shards and bronze cocoa butter.",
    tastingNotes: "Gianduja, caramelized hazelnut, cacao husk",
    price: 3200,
    size: "2 mini tortes",
    status: "Small batch",
    image:
      "https://images.unsplash.com/photo-1624000961428-eeece184988b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Collections = () => {
  const router = useRouter();

  const handleAddToCart = (
    collection: (typeof seasonalCollections)[number],
  ) => {
    router.push({
      pathname: "/(dashboard)/cart",
      params: {
        name: collection.title,
        description: collection.description,
        price: String(collection.price),
        image: collection.image,
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
          Collections
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">
          Seasonal chocolate gallery
        </Text>
        <Text className="mt-2 text-base text-[#4a2d1b]">
          Every pour is tempered in micro batches, finished with edible metals,
          florals, and single-estate inclusions.
        </Text>
      </View>

      <View className="mt-10 gap-6 px-6">
        {seasonalCollections.map((collection) => (
          <View
            key={collection.id}
            className="overflow-hidden rounded-3xl border border-[#eedfcf] bg-white shadow-lg"
          >
            <Image
              source={{ uri: collection.image }}
              className="h-56 w-full"
              resizeMode="cover"
            />
            <View className="p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs uppercase tracking-[0.4em] text-[#a6683f]">
                  {collection.status}
                </Text>
                <Text className="text-lg font-semibold text-[#1a120b]">
                  Rs-{collection.price.toFixed(2)}
                </Text>
              </View>
              <Text className="mt-3 text-2xl font-semibold text-[#1f130c]">
                {collection.title}
              </Text>
              <Text className="mt-2 text-base text-[#4a2d1b]">
                {collection.description}
              </Text>
              <Text className="mt-3 text-sm text-[#7b3c1d]">
                {collection.tastingNotes}
              </Text>
              <Text className="mt-2 text-xs uppercase tracking-wide text-[#a06c3c]">
                {collection.size}
              </Text>
              <Pressable
                className="mt-5 rounded-2xl bg-[#1f130c] py-3"
                onPress={() => handleAddToCart(collection)}
              >
                <Text className="text-center text-base font-semibold text-white">
                  Add to cart
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Collections;
