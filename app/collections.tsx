import { useRouter } from "expo-router"
import React from "react"
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native"

const palette = {
  background: "#fbf7f2",
  surface: "#fffaf5",
  deep: "#1a120b",
  accent: "#d6b28c",
  border: "#ead7c0"
}

const seasonalCollections = [
  {
    id: "velvet-truffle",
    title: "Velvet Truffle Studio",
    description: "Espresso-infused ganache rolled in vanilla bean cocoa dust.",
    tastingNotes: "Notes of espresso crema, smoked sea salt, and cacao nib crunch",
    price: 32,
    size: "6-piece atelier box",
    status: "Limited",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "amber-caramel",
    title: "Amber Caramel Atelier",
    description: "Four-layer praline with pecan gianduja and amber caramel.",
    tastingNotes: "Brown butter brittle, toasted pecan, Madagascar vanilla",
    price: 28,
    size: "5-piece slab set",
    status: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "midnight-noir",
    title: "Midnight Noir Flight",
    description: "72% cacao bars paired with blackberry balsamic reduction.",
    tastingNotes: "Blackberry jam, cassis, balsamic caramel",
    price: 36,
    size: "3-bar tasting",
    status: "Chef's pick",
    image:
      "https://images.unsplash.com/photo-1495147334217-fcb3445babd5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "rose-latte",
    title: "Rose Latte Fudge",
    description: "White chocolate fudge rippled with rosewater cremeux.",
    tastingNotes: "Turkish delight, cardamom milk, wildflower honey",
    price: 30,
    size: "9-piece tasting tile",
    status: "New",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cocoa-nectar",
    title: "Cocoa Nectar Orbit",
    description: "Domed bonbons with orange blossom caramel core.",
    tastingNotes: "Citrus oil, buckwheat honey, cacao fruit",
    price: 34,
    size: "8-piece galaxy set",
    status: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "hazelnut-crown",
    title: "Hazelnut Crown Gateau",
    description: "Mini cake topped with praline shards and bronze cocoa butter.",
    tastingNotes: "Gianduja, caramelized hazelnut, cacao husk",
    price: 42,
    size: "2 mini tortes",
    status: "Small batch",
    image:
      "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=900&q=80"
  }
]

const Collections = () => {
  const router = useRouter()

  const handleAddToCart = (title: string) => {
    Alert.alert("Added to cart", `${title} is now waiting in your cart.`)
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 64, backgroundColor: palette.background }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pt-12">
        <Pressable className="self-start rounded-full border border-[#d6b28c]/60 px-4 py-2" onPress={() => router.back()}>
          <Text className="text-sm font-semibold text-[#7b3c1d]">Back</Text>
        </Pressable>
        <Text className="mt-4 text-sm uppercase tracking-[0.4em] text-[#a6683f]">Collections</Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">Seasonal chocolate gallery</Text>
        <Text className="mt-2 text-base text-[#4a2d1b]">
          Every pour is tempered in micro batches, finished with edible metals, florals, and single-estate inclusions.
        </Text>
      </View>

      <View className="mt-10 gap-6 px-6">
        {seasonalCollections.map((collection) => (
          <View key={collection.id} className="overflow-hidden rounded-3xl border border-[#eedfcf] bg-white shadow-lg">
            <Image source={{ uri: collection.image }} className="h-56 w-full" resizeMode="cover" />
            <View className="p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs uppercase tracking-[0.4em] text-[#a6683f]">{collection.status}</Text>
                <Text className="text-lg font-semibold text-[#1a120b]">${collection.price.toFixed(2)}</Text>
              </View>
              <Text className="mt-3 text-2xl font-semibold text-[#1f130c]">{collection.title}</Text>
              <Text className="mt-2 text-base text-[#4a2d1b]">{collection.description}</Text>
              <Text className="mt-3 text-sm text-[#7b3c1d]">{collection.tastingNotes}</Text>
              <Text className="mt-2 text-xs uppercase tracking-wide text-[#a06c3c]">{collection.size}</Text>
              <Pressable
                className="mt-5 rounded-2xl bg-[#1f130c] py-3"
                onPress={() => handleAddToCart(collection.title)}
              >
                <Text className="text-center text-base font-semibold text-white">Add to cart</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Collections
