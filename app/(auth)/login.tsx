import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleLogin = async () => {
    if (!email || !password || isLoading) {
      Alert.alert("Please enter email and password");
      return;
    }
    try {
      showLoader();
      await login(email, password);
      router.replace("/home");
    } catch (e) {
      console.error(e);
      Alert.alert("Login fail");
    } finally {
      hideLoader();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-[#120805]">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 pt-16">
            <Text className="text-sm uppercase tracking-[0.5em] text-[#d6b28c]">
              SweetZone
            </Text>
            <Text className="mt-3 text-4xl font-extrabold text-white">
              Welcome back,
            </Text>
            <Text className="text-4xl font-extrabold text-[#f4d7b1]">
              let's melt something beautiful.
            </Text>
            <Text className="mt-4 text-base leading-6 text-[#f6e7d4]/80">
              Sign in to manage your chocolate rituals, concierge deliveries,
              and tasting reservations.
            </Text>
          </View>

          <View className="mt-10 px-6">
            <View className="rounded-3xl border border-[#dcbf9f]/40 bg-white/95 p-6 shadow-2xl">
              <Text className="text-2xl font-bold text-[#2a1409]">
                Log in to SweetZone
              </Text>
              <Text className="mt-1 text-sm text-[#5c3a23]">
                Enter your credentials to continue your cocoa journey.
              </Text>

              <View className="mt-6 gap-4">
                <View>
                  <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
                    Email
                  </Text>
                  <TextInput
                    placeholder="you@rituals.com"
                    placeholderTextColor="#a07a63"
                    className="mt-2 rounded-2xl border border-[#ead7c0] bg-[#fffaf5] px-4 py-3 text-base text-[#1f130c]"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
                <View>
                  <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
                    Password
                  </Text>
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="#a07a63"
                    className="mt-2 rounded-2xl border border-[#ead7c0] bg-[#fffaf5] px-4 py-3 text-base text-[#1f130c]"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                  />
                </View>
              </View>

              <Pressable
                onPress={handleLogin}
                disabled={isLoading}
                className="mt-6 rounded-2xl bg-[#2a1409] py-3"
              >
                <Text className="text-center text-base font-semibold text-white">
                  {isLoading ? "Signing you in..." : "Sign In"}
                </Text>
              </Pressable>

              <View className="mt-4 flex-row items-center justify-center">
                <Text className="text-sm text-[#5c3a23]">
                  New to SweetZone?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/register")}>
                  <Text className="text-sm font-semibold text-[#a6683f]">
                    Create account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
