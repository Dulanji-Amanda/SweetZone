import React from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

const palette = {
  background: "#fbf7f2",
  card: "#fffaf5",
  dark: "#1a120b",
  accent: "#d6b28c",
  border: "#f0dfca",
};

const cartItems = [
  {
    id: "1",
    name: "Amber Caramel Bar",
    description: "Dark chocolate layered with burnt caramel ribbons.",
    price: 14,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    name: "Velvet Truffle Box",
    description: "Assorted ganache truffles dusted in cocoa and rose petal.",
    price: 28,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=600&q=80",
  },
];

const shippingFee = 6.5;

const Cart = () => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal + shippingFee;

  const handlePlaceOrder = () => {
    Alert.alert("Order confirmed", "Your SweetZone creations are on the way.");
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingBottom: 48,
        backgroundColor: palette.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pt-12">
        <Text className="text-sm uppercase tracking-[0.4em] text-[#a6683f]">
          Cart
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">
          Refine your cocoa ritual
        </Text>
      </View>

      <View className="mt-8 gap-4 px-6">
        {cartItems.map((item) => (
          <View
            key={item.id}
            className="flex-row rounded-3xl bg-white p-4 shadow-md"
            style={{ borderColor: palette.border, borderWidth: 1 }}
          >
            <Image
              source={{ uri: item.image }}
              className="h-24 w-24 rounded-2xl"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-[#2b140a]">
                {item.name}
              </Text>
              <Text className="mt-1 text-sm text-[#5c3a23]">
                {item.description}
              </Text>
              <View className="mt-3 flex-row items-center justify-between">
                <Text className="text-base font-semibold text-[#1f130c]">
                  ${item.price.toFixed(2)}
                </Text>
                <View className="rounded-full bg-[#f4e4d4] px-3 py-1">
                  <Text className="text-xs font-semibold text-[#7b3c1d]">
                    Qty {item.quantity}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-10 px-6">
        <View className="rounded-3xl bg-[#120b07] p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-base text-[#f4e4d4]">Subtotal</Text>
            <Text className="text-base font-semibold text-white">
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-base text-[#f4e4d4]">Cellar shipping</Text>
            <Text className="text-base font-semibold text-white">
              ${shippingFee.toFixed(2)}
            </Text>
          </View>
          <View className="mt-4 h-[1px] bg-[#4a2d1b]/30" />
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-white">
              Order total
            </Text>
            <Text className="text-2xl font-bold text-[#d6b28c]">
              ${total.toFixed(2)}
            </Text>
          </View>
          <Pressable
            className="mt-5 rounded-2xl bg-[#d6b28c] py-3"
            onPress={handlePlaceOrder}
          >
            <Text className="text-center text-base font-semibold text-[#2b140a]">
              Place order
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;
