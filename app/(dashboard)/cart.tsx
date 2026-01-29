import { useCart } from "@/hooks/useCart";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import MapView, { LongPressEvent, Marker, Region } from "react-native-maps";

const palette = {
  background: "#fbf7f2",
  card: "#fffaf5",
  dark: "#1a120b",
  accent: "#d6b28c",
  border: "#f0dfca",
};

const shippingFee = 6.5;

const formatINR = (value: number) => `Rs-${value.toFixed(2)}`;

const defaultRegion: Region = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

type Coordinate = {
  latitude: number;
  longitude: number;
};

const Cart = () => {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  const [mapRegion, setMapRegion] = useState<Region>(defaultRegion);
  const [selectedCoords, setSelectedCoords] = useState<Coordinate | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isLocating, setIsLocating] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const hasItems = items.length > 0;
  const deliveryFee = hasItems ? shippingFee : 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    let isMounted = true;

    const bootstrapLocation = async () => {
      try {
        setIsLocating(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (isMounted) {
            setPermissionDenied(true);
          }
          return;
        }

        const current = await Location.getCurrentPositionAsync({});
        if (!isMounted) return;

        const region: Region = {
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };
        setMapRegion(region);
      } catch (error) {
        console.warn("Failed to fetch current location", error);
      } finally {
        if (isMounted) {
          setIsLocating(false);
        }
      }
    };

    bootstrapLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchAddress = async (coords: Coordinate) => {
    try {
      const geocoded = await Location.reverseGeocodeAsync(coords);
      if (geocoded.length) {
        const { name, street, city, region } = geocoded[0];
        const formatted = [name || street, city, region]
          .filter(Boolean)
          .join(", ");
        setSelectedAddress(formatted);
      } else {
        setSelectedAddress("");
      }
    } catch (error) {
      console.warn("Failed to reverse geocode", error);
      setSelectedAddress("");
    }
  };

  const handleMapPress = async (event: LongPressEvent) => {
    const coordinate = event.nativeEvent.coordinate;
    setSelectedCoords(coordinate);
    await fetchAddress(coordinate);
  };

  const handleUseCurrentLocation = async () => {
    try {
      setIsLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionDenied(true);
        Alert.alert(
          "Permission needed",
          "Enable location access in your settings to use your current spot.",
        );
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      const coords: Coordinate = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };
      const region: Region = {
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setMapRegion(region);
      setSelectedCoords(coords);
      await fetchAddress(coords);
    } catch (error) {
      console.warn("Unable to grab current position", error);
      Alert.alert(
        "Location error",
        "We couldn't detect your position. Drop a pin manually instead.",
      );
    } finally {
      setIsLocating(false);
    }
  };

  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) {
      Alert.alert(
        "Add an address",
        "Enter a neighborhood, city, or landmark to search.",
      );
      return;
    }

    try {
      setIsSearching(true);
      const results = await Location.geocodeAsync(searchQuery.trim());
      if (!results.length) {
        Alert.alert(
          "Location not found",
          "Try refining the address for better accuracy.",
        );
        return;
      }

      const { latitude, longitude } = results[0];
      const coords: Coordinate = { latitude, longitude };
      const region: Region = {
        ...coords,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setMapRegion(region);
      setSelectedCoords(coords);
      await fetchAddress(coords);
    } catch (error) {
      console.warn("Search geocode failed", error);
      Alert.alert(
        "Search failed",
        "We couldn't reach the geocoding service. Try again shortly.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleAdjustQuantity = (id: string, delta: number, current: number) => {
    const nextQuantity = current + delta;
    if (nextQuantity < 1) return;
    updateQuantity(id, nextQuantity);
  };

  const locationSummary = selectedCoords
    ? selectedAddress ||
      `Lat ${selectedCoords.latitude.toFixed(3)}, Lon ${selectedCoords.longitude.toFixed(3)}`
    : "No delivery location selected yet.";

  const handlePlaceOrder = () => {
    if (!hasItems) {
      Alert.alert(
        "Add a dessert",
        "Select an item to purchase before placing an order.",
      );
      return;
    }

    if (!selectedCoords) {
      Alert.alert(
        "Add delivery location",
        "Please drop a pin for your delivery on the map before placing the order.",
      );
      return;
    }

    Alert.alert("Order confirmed", "Your SweetZone creations are on the way.", [
      {
        text: "Done",
        onPress: () => clearCart(),
      },
    ]);
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

      <View className="mt-8 px-6">
        {hasItems ? (
          <View className="gap-4">
            {items.map((item) => (
              <View
                key={item.id}
                className="flex-row rounded-3xl bg-white p-4 shadow-md"
                style={{ borderColor: palette.border, borderWidth: 1 }}
              >
                <Pressable
                  className="absolute right-3 top-3 h-8 w-8 items-center justify-center rounded-full bg-black/5"
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text className="text-base font-semibold text-[#7b3c1d]">x</Text>
                </Pressable>
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    className="h-24 w-24 rounded-2xl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="h-24 w-24 items-center justify-center rounded-2xl bg-[#f4e4d4]">
                    <Text className="text-xs uppercase tracking-[0.3em] text-[#7b3c1d]">
                      Sweet
                    </Text>
                  </View>
                )}
                <View className="ml-4 flex-1 pr-6">
                  <Text className="text-lg font-semibold text-[#2b140a]">{item.name}</Text>
                  <Text className="mt-1 text-sm text-[#5c3a23]">{item.description}</Text>
                  <View className="mt-3 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <Pressable
                        className="h-9 w-9 items-center justify-center rounded-full border border-[#ead7c0]"
                        onPress={() => handleAdjustQuantity(item.id, -1, item.quantity)}
                        disabled={item.quantity === 1}
                      >
                        <Text
                          className={`text-lg font-semibold ${item.quantity === 1 ? "text-[#c9b6a5]" : "text-[#1f130c]"}`}
                        >
                          -
                        </Text>
                      </Pressable>
                      <Text className="text-base font-semibold text-[#1f130c]">{item.quantity}</Text>
                      <Pressable
                        className="h-9 w-9 items-center justify-center rounded-full border border-[#ead7c0]"
                        onPress={() => handleAdjustQuantity(item.id, 1, item.quantity)}
                      >
                        <Text className="text-lg font-semibold text-[#1f130c]">+</Text>
                      </Pressable>
                    </View>
                    <Text className="text-base font-semibold text-[#1f130c]">
                      {formatINR(item.price * item.quantity)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="rounded-3xl border border-dashed border-[#ead7c0] bg-white p-6">
            <Text className="text-lg font-semibold text-[#2b140a]">Your cart is calm.</Text>
            <Text className="mt-1 text-sm text-[#5c3a23]">
              Tap “Add to cart” on any dessert to curate your tasting flight.
            </Text>
            <Pressable
              className="mt-4 self-start rounded-2xl bg-[#1f130c] px-4 py-2"
              onPress={() => router.push("/collections")}
            >
              <Text className="text-sm font-semibold text-white">Browse collections</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View className="mt-10 px-6">
        <Text className="text-sm uppercase tracking-[0.4em] text-[#a6683f]">
          Delivery location
        </Text>
        <Text className="mt-2 text-base text-[#4a2d1b]">
          Long-press anywhere on the map to drop a pin, or use your current
          position for courier routing.
        </Text>
        <View className="mt-4 flex-row gap-3">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for an address or landmark"
            placeholderTextColor="#b78c6c"
            className="flex-1 rounded-2xl border border-[#ead7c0] bg-white px-4 py-3 text-base text-[#1f130c]"
          />
          <Pressable
            className="rounded-2xl bg-[#d6b28c] px-4 py-3"
            onPress={handleSearchLocation}
            disabled={isSearching}
          >
            {isSearching ? (
              <ActivityIndicator color="#2b140a" />
            ) : (
              <Text className="text-base font-semibold text-[#2b140a]">
                Search
              </Text>
            )}
          </Pressable>
        </View>
        <View className="mt-4 overflow-hidden rounded-3xl border border-[#ead7c0]/80 bg-white">
          <MapView
            style={{ height: 280, width: "100%" }}
            region={mapRegion}
            onRegionChangeComplete={setMapRegion}
            onLongPress={handleMapPress}
            showsUserLocation={!permissionDenied}
            loadingEnabled
          >
            {selectedCoords && (
              <Marker
                coordinate={selectedCoords}
                title="Delivery"
                description="Drop-off"
              />
            )}
          </MapView>
        </View>
        {permissionDenied && (
          <Text className="mt-3 text-sm text-[#a6683f]">
            Location permission denied. You can still pan/zoom the map and
            long-press to place a marker manually.
          </Text>
        )}
        <Pressable
          className="mt-4 rounded-2xl bg-[#1f130c] py-3"
          onPress={handleUseCurrentLocation}
          disabled={isLocating}
        >
          {isLocating ? (
            <View className="flex-row items-center justify-center gap-2">
              <ActivityIndicator color="#f4e4d4" />
              <Text className="text-base font-semibold text-white">
                Locating...
              </Text>
            </View>
          ) : (
            <Text className="text-center text-base font-semibold text-white">
              Use my current location
            </Text>
          )}
        </Pressable>
        <View className="mt-3 rounded-3xl bg-white p-4 shadow-sm">
          <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
            Deliver to
          </Text>
          <Text className="mt-2 text-base text-[#2b140a]">
            {locationSummary}
          </Text>
        </View>
      </View>

      {hasItems && (
        <View className="mt-10 px-6">
          <View className="rounded-3xl bg-[#120b07] p-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-base text-[#f4e4d4]">Subtotal</Text>
              <Text className="text-base font-semibold text-white">
                {formatINR(subtotal)}
              </Text>
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <Text className="text-base text-[#f4e4d4]">Cellar shipping</Text>
              <Text className="text-base font-semibold text-white">
                {formatINR(deliveryFee)}
              </Text>
            </View>
            <View className="mt-4 h-[1px] bg-[#4a2d1b]/30" />
            <View className="mt-4 flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-white">
                Order total
              </Text>
              <Text className="text-2xl font-bold text-[#d6b28c]">
                {formatINR(total)}
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
      )}
    </ScrollView>
  );
};

export default Cart;
