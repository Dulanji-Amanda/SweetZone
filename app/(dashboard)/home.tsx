import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

const palette = {
  background: "#fbf7f2",
  deep: "#3b1d0f",
  medium: "#a06c3c",
  light: "#f2dec7",
  darkAccent: "#1a120b",
};

const heroStats = [
  { label: "Origins Curated", value: "18" },
  { label: "Orders / day", value: "1.2K" },
  { label: "Farmers Partnered", value: "42" },
];

const featureHighlights = [
  {
    title: "Bean-to-Bar Craft",
    description:
      "Single-origin cacao roasted in micro batches for a velvet finish.",
    accent: "#4e2a1b",
  },
  {
    title: "Chef Pairings",
    description: "Weekly tasting flights designed with resident chocolatiers.",
    accent: "#6d3b1f",
  },
  {
    title: "Cellar Delivery",
    description: "Insulated packaging keeps every praline at the perfect snap.",
    accent: "#2a1b14",
  },
];

const curatedCollections = [
  {
    title: "Velvet Truffle Studio",
    description:
      "Espresso-infused ganache, finished with smoked sea salt flakes.",
    tag: "Limited",
    price: "Rs-1500",
    image:
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Amber Caramel Atelier",
    description:
      "Four-layer praline with toasted pecan praline & vanilla bean caramel.",
    tag: "Bestseller",
    price: "Rs-1200",
    image:
      "https://images.unsplash.com/photo-1565071559227-20ab25b7685e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Berry-cassis-flight",
    description:
      "72% cacao collection paired with blackberry balsamic reduction.",
    tag: "Chef's pick",
    price: "Rs-2600",
    image:
      "https://images.unsplash.com/photo-1655207454924-be5f412853f2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

const tastingExperiences = [
  {
    title: "Sip & Savor Lounge",
    detail:
      "Guided pairings with Ethiopian natural-process coffee and cacao tea spritz.",
    time: "Daily · 5 PM",
    badge: "In-studio",
  },
  {
    title: "Cacao Passport",
    detail:
      "Monthly subscription unveiling new single-estate harvests and chef notes.",
    time: "Ships 1st of month",
    badge: "Membership",
  },
  {
    title: "Chocolate Architecture Lab",
    detail:
      "Create your tablet with layered inclusions, textures, and aromatic finishes.",
    time: "Weekends",
    badge: "Workshop",
  },
];

const guestStories = [
  {
    name: "Olivia Chen",
    title: "Food Stylist",
    quote:
      "SweetZone turns sourcing into storytelling. Their Midnight Noir flight is now my client welcome ritual.",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "David Lin",
    title: "Boutique Hotelier",
    quote:
      "The Cellar Delivery program keeps every petit four impeccable from atelier to suite turn-down.",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
  },
];

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { addToCart } = useCart();
  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Chocolate Lover";

  const handleCollectionAdd = (collection: Collection) => {
    const numericPrice = Number(collection.price.replace(/[^0-9.]/g, "")) || 0;
    addToCart({
      name: collection.title,
      description: collection.description,
      price: numericPrice,
      image: collection.image,
    });

    Alert.alert("Added to cart", `${collection.title} is ready in your cart.`, [
      { text: "Keep browsing", style: "cancel" },
      { text: "Go to cart", onPress: () => router.push("/(dashboard)/cart") },
    ]);
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
        <Text className="text-base uppercase tracking-[0.4em] text-[#a6683f]">
          Welcome
        </Text>
        <Text className="mt-1 text-4xl font-extrabold text-[#2b140a]">
          {firstName}, your cocoa atelier awaits.
        </Text>
      </View>

      <View className="px-6 pt-12">
        <View className="rounded-3xl bg-[#1a120b] p-6 shadow-2xl">
          <Text className="text-xs uppercase tracking-[0.3em] text-[#d6b28c]">
            SweetZone Atelier
          </Text>
          <Text className="mt-4 text-4xl font-bold text-white">
            Melted luxury curated for modern chocolate rituals.
          </Text>
          <Text className="mt-4 text-base leading-6 text-[#f4e4d4]">
            Discover white, dark, and amber chocolates crafted with intentional
            pairings, sustainable cacao, and slow enjoyment in mind.
          </Text>
          <View className="mt-6 flex-row gap-3">
            <Pressable className="flex-1 rounded-2xl bg-[#d6b28c] py-3">
              <Text className="text-center text-base font-semibold text-[#1a120b]">
                Explore Collections
              </Text>
            </Pressable>
            <Pressable className="flex-1 rounded-2xl border border-[#f4e4d4]/60 py-3">
              <Text className="text-center text-base font-semibold text-white">
                Reserve Tasting
              </Text>
            </Pressable>
          </View>
          <View className="mt-8 flex-row justify-between">
            {heroStats.map((stat) => (
              <View key={stat.label}>
                <Text className="text-2xl font-semibold text-white">
                  {stat.value}
                </Text>
                <Text className="mt-1 text-xs uppercase tracking-wide text-[#d6b28c]">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      
      <View className="mt-12 px-6">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm uppercase tracking-[0.4em] text-[#a6683f]">
              Curations
            </Text>
            <Text className="mt-2 text-3xl font-bold text-[#1e1009]">
              Seasonal collections
            </Text>
          </View>
          <Pressable onPress={() => router.push("/collections")}>
            <Text className="text-sm font-semibold text-[#7b3c1d]">
              View all
            </Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6"
          contentContainerStyle={{ gap: 16 }}
        >
          {curatedCollections.map((collection) => (
            <CollectionCard
              key={collection.title}
              item={collection}
              onAdd={handleCollectionAdd}
            />
          ))}
        </ScrollView>
      </View>
      <View className="mt-10 px-6">
        <Text className="text-sm font-semibold uppercase tracking-[0.4em] text-[#a6683f]">
          Signature Craft
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">
          Why SweetZone melts differently
        </Text>
        <View className="mt-6 gap-4">
          {featureHighlights.map((feature) => (
            <View
              key={feature.title}
              className="rounded-3xl border border-[#e4c9b1] bg-white/90 p-5 shadow-sm"
              style={{ shadowColor: feature.accent }}
            >
              <Text className="text-lg font-semibold text-[#1e1009]">
                {feature.title}
              </Text>
              <Text className="mt-2 text-base leading-6 text-[#4a2d1b]">
                {feature.description}
              </Text>
              <View
                className="mt-4 h-1 w-16 rounded-full"
                style={{ backgroundColor: feature.accent }}
              />
            </View>
          ))}
        </View>
      </View>
      
      <View className="mt-12 px-6">
        <Text className="text-sm uppercase tracking-[0.4em] text-[#a6683f]">
          Guest Stories
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#1e1009]">
          Textures people talk about
        </Text>
        <View className="mt-6 gap-4">
          {guestStories.map((story) => (
            <TestimonialCard key={story.name} story={story} />
          ))}
        </View>
      </View>

      <View className="mt-14 px-6">
        <View className="rounded-3xl border border-[#d6b28c]/50 bg-white p-6">
          <Text className="text-sm uppercase tracking-[0.4em] text-[#a6683f]">
            Keep dripping
          </Text>
          <Text className="mt-3 text-3xl font-bold text-[#2f1408]">
            Be first to taste new pours
          </Text>
          <Text className="mt-3 text-base text-[#4a2d1b]">
            Weekly notes from our chocolatiers, exclusive pre-orders, and
            pairing playlists straight to your inbox.
          </Text>
          <Pressable className="mt-5 rounded-2xl bg-[#1f130c] py-3">
            <Text className="text-center text-base font-semibold text-white">
              Subscribe to cocoa letters
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

type Collection = (typeof curatedCollections)[number];

const CollectionCard = ({ item, onAdd }: { item: Collection; onAdd: (item: Collection) => void }) => {
  return (
    <View className="w-64 rounded-3xl bg-white p-4 shadow-lg">
      <View className="overflow-hidden rounded-2xl">
        <Image
          source={{ uri: item.image }}
          className="h-40 w-full"
          resizeMode="cover"
        />
      </View>
      <View className="mt-4 flex-row items-center justify-between">
        <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
          {item.tag}
        </Text>
        <Text className="text-base font-semibold text-[#2b140a]">
          {item.price}
        </Text>
      </View>
      <Text className="mt-2 text-xl font-semibold text-[#1f130c]">
        {item.title}
      </Text>
      <Text className="mt-2 text-sm leading-5 text-[#4a2d1b]">
        {item.description}
      </Text>
      <Pressable
        className="mt-4 rounded-2xl border border-[#d6b28c] py-2"
        onPress={() => onAdd(item)}
      >
        <Text className="text-center text-sm font-semibold text-[#7b3c1d]">
          Add to cart
        </Text>
      </Pressable>
    </View>
  );
};

type Experience = (typeof tastingExperiences)[number];

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <View className="rounded-3xl border border-[#ead7c0] bg-white/90 p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-[#1f130c]">
          {experience.title}
        </Text>
        <Text className="rounded-full bg-[#f2e0cb] px-3 py-1 text-xs font-semibold text-[#7b3c1d]">
          {experience.badge}
        </Text>
      </View>
      <Text className="mt-2 text-base text-[#4a2d1b]">{experience.detail}</Text>
      <Text className="mt-3 text-sm font-semibold uppercase tracking-wide text-[#a06c3c]">
        {experience.time}
      </Text>
    </View>
  );
};

type Story = (typeof guestStories)[number];

const TestimonialCard = ({ story }: { story: Story }) => {
  return (
    <View className="rounded-3xl bg-[#120b07] p-5">
      <View className="flex-row items-center gap-4">
        <Image
          source={{ uri: story.avatar }}
          className="h-12 w-12 rounded-full border-2 border-[#d6b28c]"
          resizeMode="cover"
        />
        <View>
          <Text className="text-base font-semibold text-white">
            {story.name}
          </Text>
          <Text className="text-xs uppercase tracking-wide text-[#d6b28c]">
            {story.title}
          </Text>
        </View>
      </View>
      <Text className="mt-4 text-base leading-6 text-[#f3dfc8]">
        “{story.quote}”
      </Text>
    </View>
  );
};

export default Home;
