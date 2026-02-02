import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const palette = {
  background: "#fbf7f2",
  card: "#fffaf5",
  dark: "#1a120b",
  accent: "#d6b28c",
  border: "#f0dfca",
  muted: "#5c3a23",
};

const shippingFee = 100.0;

const paymentOptions = [
  {
    id: "cod",
    label: "Cash on delivery",
    detail: "Pay when the desserts arrive at your door.",
  },
  {
    id: "card",
    label: "Card",
    detail: "Secure checkout with saved cards.",
  },
] as const;

const Order = () => {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const params = useLocalSearchParams<{
    address?: string | string[];
    latitude?: string | string[];
    longitude?: string | string[];
  }>();
  const [selectedPayment, setSelectedPayment] =
    useState<(typeof paymentOptions)[number]["id"]>("cod");

  const hasItems = items.length > 0;
  const deliveryFee = hasItems ? shippingFee : 0;
  const total = subtotal + deliveryFee;

  const address = useMemo(() => {
    const incoming = params.address;
    if (!incoming) return undefined;
    return Array.isArray(incoming) ? incoming[0] : incoming;
  }, [params.address]);

  const coords = useMemo(() => {
    const latValue = Array.isArray(params.latitude)
      ? params.latitude[0]
      : params.latitude;
    const lonValue = Array.isArray(params.longitude)
      ? params.longitude[0]
      : params.longitude;

    const lat = latValue ? Number.parseFloat(latValue) : undefined;
    const lon = lonValue ? Number.parseFloat(lonValue) : undefined;

    if (
      typeof lat === "number" &&
      !Number.isNaN(lat) &&
      typeof lon === "number" &&
      !Number.isNaN(lon)
    ) {
      return {
        latitude: lat,
        longitude: lon,
      };
    }

    return undefined;
  }, [params.latitude, params.longitude]);

  const locationSummary =
    address ||
    (coords
      ? `Lat ${coords.latitude.toFixed(3)}, Lon ${coords.longitude.toFixed(3)}`
      : "Delivery location not set");

  const handlePlaceOrder = () => {
    if (!hasItems) {
      Alert.alert(
        "Cart is empty",
        "Add a dessert before confirming the order.",
      );
      return;
    }

    const orderItems = items.map((item) => ({ ...item }));
    addOrder({
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: selectedPayment,
      address: locationSummary,
      coords: coords ? { ...coords } : undefined,
    });

    clearCart();
    Alert.alert("Order placed", "Your SweetZone box is being prepared.", [
      {
        text: "View orders",
        onPress: () => router.replace("/orders"),
      },
      {
        text: "Keep browsing",
        onPress: () => router.replace("/(dashboard)/home"),
      },
    ]);
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingBottom: 56,
        backgroundColor: palette.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pt-12">
        <Text className="text-sm uppercase tracking-[0.4em] text-[#a6683f]">
          Order
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">
          Confirm your tasting flight
        </Text>
        <Text className="mt-3 text-base text-[#5c3a23]">
          Review the desserts, delivery drop, and payment preference before we
          start whisking.
        </Text>
      </View>

      <View className="mt-8 px-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
          Desserts
        </Text>
        {hasItems ? (
          <View className="mt-3 gap-4">
            {items.map((item) => (
              <View
                key={item.id}
                className="rounded-3xl bg-white p-4 shadow-sm"
                style={{ borderColor: palette.border, borderWidth: 1 }}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-4">
                    <Text className="text-lg font-semibold text-[#2b140a]">
                      {item.name}
                    </Text>
                    <Text className="mt-1 text-sm text-[#5c3a23]">
                      {item.description}
                    </Text>
                  </View>
                  <Text className="text-base font-semibold text-[#2b140a]">
                    Rs-{(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
                <Text className="mt-3 text-sm text-[#7b3c1d]">
                  Qty {item.quantity}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View className="mt-3 rounded-3xl border border-dashed border-[#ead7c0] bg-white p-5">
            <Text className="text-base font-semibold text-[#2b140a]">
              No desserts selected.
            </Text>
            <Text className="mt-1 text-sm text-[#5c3a23]">
              Head back to the cart to curate your order.
            </Text>
            <Pressable
              className="mt-4 self-start rounded-2xl bg-[#1f130c] px-4 py-2"
              onPress={() => router.replace("/(dashboard)/cart")}
            >
              <Text className="text-sm font-semibold text-white">
                Back to cart
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <View className="mt-10 px-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
          Delivery
        </Text>
        <View
          className="mt-3 rounded-3xl bg-white p-4 shadow-sm"
          style={{ borderColor: palette.border, borderWidth: 1 }}
        >
          <Text className="text-sm text-[#5c3a23]">Deliver to</Text>
          <Text className="mt-1 text-base font-semibold text-[#2b140a]">
            {locationSummary}
          </Text>
          {coords && (
            <View className="mt-3 overflow-hidden rounded-2xl border border-[#ead7c0]">
              <MapView
                pointerEvents="none"
                style={{ height: 180, width: "100%" }}
                region={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker coordinate={coords} title="Delivery" />
              </MapView>
            </View>
          )}
          <Pressable
            className="mt-4 self-start rounded-2xl border border-[#ead7c0] px-4 py-2"
            onPress={() => router.push("/(dashboard)/cart")}
          >
            <Text className="text-sm font-semibold text-[#1f130c]">
              Adjust in cart
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-10 px-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
          Payment
        </Text>
        <View className="mt-3 gap-3">
          {paymentOptions.map((option) => {
            const isActive = option.id === selectedPayment;
            return (
              <Pressable
                key={option.id}
                className={`rounded-3xl border px-4 py-4 ${isActive ? "border-[#d6b28c] bg-[#fff7ef]" : "border-[#ead7c0] bg-white"}`}
                onPress={() => setSelectedPayment(option.id)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-4">
                    <Text className="text-base font-semibold text-[#2b140a]">
                      {option.label}
                    </Text>
                    <Text className="mt-1 text-sm text-[#5c3a23]">
                      {option.detail}
                    </Text>
                  </View>
                  <View
                    className={`h-6 w-6 items-center justify-center rounded-full ${isActive ? "bg-[#d6b28c]" : "border border-[#ead7c0]"}`}
                  >
                    {isActive && (
                      <View className="h-2.5 w-2.5 rounded-full bg-white" />
                    )}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="mt-10 px-6">
        <View className="rounded-3xl bg-[#120b07] p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-base text-[#f4e4d4]">Subtotal</Text>
            <Text className="text-base font-semibold text-white">
              Rs-{subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-base text-[#f4e4d4]">Cellar shipping</Text>
            <Text className="text-base font-semibold text-white">
              Rs-{deliveryFee.toFixed(2)}
            </Text>
          </View>
          <View className="mt-4 h-[1px] bg-[#4a2d1b]/30" />
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-white">
              Total ({selectedPayment.toUpperCase()})
            </Text>
            <Text className="text-2xl font-bold text-[#d6b28c]">
              Rs-{total.toFixed(2)}
            </Text>
          </View>
          <Pressable
            className={`mt-5 rounded-2xl py-3 ${hasItems ? "bg-[#d6b28c]" : "bg-[#9b8c7c]"}`}
            onPress={handlePlaceOrder}
            disabled={!hasItems}
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

export default Order;
