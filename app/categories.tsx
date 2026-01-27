import { useRouter } from "expo-router"
import React from "react"
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native"

const palette = {
  background: "#fbf7f2",
  section: "#fffaf5",
  accent: "#d6b28c",
  deep: "#1a120b",
  border: "#ead7c0"
}

const chocolateCatalog = [
  {
    title: "Chocolate Cookies",
    story: "Soft interiors, cocoa nib crunch, and fleur de sel crystals baked daily.",
    hue: "#2b140a",
    items: [
      {
        name: "Midnight Sea Salt",
        description: "72% cacao dough, smoked salt, and burnt sugar chips.",
        price: 18,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Hazelnut Crumble",
        description: "Dark chocolate base studded with caramelized hazelnuts.",
        price: 16,
        image: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    title: "Chocolate Cakes",
    story: "Mini tortes soaked in cacao cordial and finished with velvet ganache.",
    hue: "#4a2414",
    items: [
      {
        name: "Amber Opera",
        description: "Espresso jaconde, amber caramel, and cocoa mirror glaze.",
        price: 42,
        image: "https://images.unsplash.com/photo-1461009209120-103742b534e2?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Rosewood Gateau",
        description: "Light brown sugar sponge layered with rose ganache.",
        price: 38,
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    title: "Chocolate Bars",
    story: "Hand-tempered tablets highlighting origin-specific terroir.",
    hue: "#3b1d0f",
    items: [
      {
        name: "Andes Dawn",
        description: "70% Peru cacao with candied orange and cacao nibs.",
        price: 14,
        image: "https://images.unsplash.com/photo-1495147334217-fcb3445babd5?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Ivory Pistachio",
        description: "White chocolate with roasted pistachios and rose petal.",
        price: 16,
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    title: "Chocolate Drinks",
    story: "Sipping chocolates and chilled tonics extracted in small batches.",
    hue: "#1f130c",
    items: [
      {
        name: "Aztec Ember",
        description: "Spiced dark sipping chocolate with smoked chili oil.",
        price: 12,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Cacao Cold Brew",
        description: "Nitro-infused cacao tea with Ethiopian coffee concentrate.",
        price: 10,
        image: "https://images.unsplash.com/photo-1521302080372-9a22dd087495?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    title: "Chocolate Truffles",
    story: "Hand-rolled pralines dusted with edible bronze and botanicals.",
    hue: "#4e2a1b",
    items: [
      {
        name: "Lavender Honey",
        description: "Milk chocolate ganache infused with lavender nectar.",
        price: 24,
        image: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Citrus Noir",
        description: "Dark ganache with candied yuzu and cacao fruit jelly.",
        price: 26,
        image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
]

const Categories = () => {
  const router = useRouter()

  const handleAddToCart = (name: string) => {
    Alert.alert("Added to cart", `${name} has been placed in your cart.`)
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
        <Text className="mt-4 text-sm uppercase tracking-[0.4em] text-[#a6683f]">Varieties</Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">Chocolate categories in bloom</Text>
        <Text className="mt-2 text-base text-[#4a2d1b]">
          Explore every format—from soft cookies to sip-ready cacao tonics—each plated with SweetZone's couture finishes.
        </Text>
      </View>

      <View className="mt-10 gap-8 px-6">
        {chocolateCatalog.map((category) => (
          <View key={category.title} className="rounded-3xl border border-[#eedfcf] bg-white">
            <View className="rounded-t-3xl p-5" style={{ backgroundColor: category.hue }}>
              <Text className="text-sm uppercase tracking-[0.4em] text-[#f2dec7]">{category.title}</Text>
              <Text className="mt-2 text-lg text-[#fbeee0]">{category.story}</Text>
            </View>
            <View className="gap-4 p-5">
              {category.items.map((item) => (
                <View key={item.name} className="flex-row items-center gap-4 rounded-2xl border border-[#ead7c0] bg-[#fffaf5] p-3">
                  <Image source={{ uri: item.image }} className="h-20 w-20 rounded-2xl" resizeMode="cover" />
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-[#1f130c]">{item.name}</Text>
                    <Text className="text-sm text-[#4a2d1b]">{item.description}</Text>
                    <View className="mt-2 flex-row items-center justify-between">
                      <Text className="text-base font-semibold text-[#7b3c1d]">${item.price.toFixed(2)}</Text>
                      <Pressable
                        className="rounded-2xl bg-[#1f130c] px-4 py-2"
                        onPress={() => handleAddToCart(item.name)}
                      >
                        <Text className="text-sm font-semibold text-white">Add to cart</Text>
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
  )
}

export default Categories
