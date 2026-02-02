import { useOrders } from "@/hooks/useOrders";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const palette = {
  background: "#fbf7f2",
  card: "#fffaf5",
  border: "#ead7c0",
  textDark: "#1f130c",
  accent: "#d6b28c",
  accentDark: "#7b3c1d",
};

const formatINR = (value: number) => `Rs-${value.toFixed(2)}`;

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const Orders = () => {
  const { orders } = useOrders();
  const router = useRouter();
  const hasOrders = orders.length > 0;

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
          onPress={() => router.back()}
          className="self-start rounded-full bg-white px-4 py-2"
          style={{ borderColor: palette.border, borderWidth: 1 }}
        >
          <Text className="text-sm font-semibold text-[#7b3c1d]">Back</Text>
        </Pressable>
        <Text className="mt-4 text-sm uppercase tracking-[0.4em] text-[#a6683f]">
          Orders
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">
          Past tasting flights
        </Text>
        <Text className="mt-3 text-base text-[#5c3a23]">
          Revisit every dessert journey, track deliveries, or reorder your
          favorites.
        </Text>
      </View>

      {hasOrders ? (
        <View className="mt-8 px-6 gap-5">
          {orders.map((order) => (
            <View
              key={order.id}
              className="rounded-3xl bg-white p-5 shadow-sm"
              style={{ borderColor: palette.border, borderWidth: 1 }}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-sm uppercase tracking-[0.3em] text-[#a6683f]">
                    {order.paymentMethod === "cod"
                      ? "Cash on delivery"
                      : "Card"}
                  </Text>
                  <Text className="mt-1 text-base font-semibold text-[#1f130c]">
                    {formatDate(order.placedAt)}
                  </Text>
                </View>
                <Text className="text-xl font-bold text-[#d6b28c]">
                  {formatINR(order.total)}
                </Text>
              </View>

              <View className="mt-4 rounded-2xl bg-[#fff7ef] p-4">
                <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
                  Deliver to
                </Text>
                <Text className="mt-1 text-base text-[#2b140a]">
                  {order.address}
                </Text>
              </View>

              <View className="mt-4">
                <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
                  Desserts
                </Text>
                <View className="mt-3 gap-2">
                  {order.items.map((item) => (
                    <View
                      key={`${order.id}-${item.id}`}
                      className="flex-row items-center justify-between"
                    >
                      <View className="flex-1 pr-4">
                        <Text className="text-base font-semibold text-[#1f130c]">
                          {item.name}
                        </Text>
                        <Text className="text-sm text-[#5c3a23]">
                          Qty {item.quantity}
                        </Text>
                      </View>
                      <Text className="text-base font-semibold text-[#1f130c]">
                        {formatINR(item.price * item.quantity)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="mt-4 rounded-2xl bg-[#120b07] p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-[#f4e4d4]">Subtotal</Text>
                  <Text className="text-base font-semibold text-white">
                    {formatINR(order.subtotal)}
                  </Text>
                </View>
                <View className="mt-2 flex-row items-center justify-between">
                  <Text className="text-sm text-[#f4e4d4]">
                    Cellar shipping
                  </Text>
                  <Text className="text-base font-semibold text-white">
                    {formatINR(order.deliveryFee)}
                  </Text>
                </View>
                <View className="mt-3 flex-row items-center justify-between">
                  <Text className="text-base font-semibold text-white">
                    Order total
                  </Text>
                  <Text className="text-xl font-bold text-[#d6b28c]">
                    {formatINR(order.total)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="mt-10 px-6">
          <View className="rounded-3xl border border-dashed border-[#ead7c0] bg-white p-6">
            <Text className="text-lg font-semibold text-[#2b140a]">
              No journeys yet.
            </Text>
            <Text className="mt-1 text-sm text-[#5c3a23]">
              Once you place an order, it will appear here for future cravings.
            </Text>
            <Pressable
              className="mt-4 self-start rounded-2xl bg-[#1f130c] px-4 py-2"
              onPress={() => router.push("/(dashboard)/home")}
            >
              <Text className="text-sm font-semibold text-white">
                Start tasting
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Orders;
