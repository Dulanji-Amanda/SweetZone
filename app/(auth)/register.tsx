import { useLoader } from "@/hooks/useLoader";
import { registerUser } from "@/services/authService";
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

const Register = () => {
  const router = useRouter();

  const { showLoader, hideLoader, isLoading } = useLoader();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const handleRegister = async () => {
    if (isLoading) {
      return;
    }
    if (!name || !email || !password) {
      Alert.alert("Please fill all fields...!");
      return;
    }
    if (password !== conPassword) {
      Alert.alert("Password do not match...!");
      return;
    }
    try {
      showLoader();
      await registerUser(name, email, password);
      Alert.alert("Account created...!");
      router.replace("/login");
    } catch (err) {
      Alert.alert("Registraion fail..!");
    } finally {
      hideLoader();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-[#0f0604]">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 pt-16">
            <Text className="text-sm uppercase tracking-[0.5em] text-[#cfa679]">
              SweetZone Atelier
            </Text>
            <Text className="mt-3 text-4xl font-extrabold text-white">
              Craft your cocoa identity
            </Text>
            <Text className="mt-3 text-base leading-6 text-[#f8e5d0]/80">
              Create your access to chef-led tastings, delivery subscriptions,
              and personalized rituals.
            </Text>
          </View>

          <View className="mt-10 px-6">
            <View className="rounded-3xl border border-[#d9bfa1]/40 bg-white/95 p-6 shadow-2xl">
              <Text className="text-2xl font-bold text-[#2a1409]">
                Sign up in seconds
              </Text>
              <Text className="mt-1 text-sm text-[#5c3a23]">
                Tell us how to greet you and where to send your chocolate
                updates.
              </Text>

              <View className="mt-6 gap-4">
                <LabeledInput
                  label="Full name"
                  value={name}
                  onChangeText={setName}
                  placeholder="Selene Park"
                />
                <LabeledInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@sweetzone.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                <LabeledInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a strong password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <LabeledInput
                  label="Confirm password"
                  value={conPassword}
                  onChangeText={setConPassword}
                  placeholder="Re-enter password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </View>

              <Pressable
                className="mt-6 rounded-2xl bg-black py-3"
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text className="text-center text-base font-semibold text-white">
                  {isLoading ? "Creating account..." : "Create my SweetZone"}
                </Text>
              </Pressable>

              <View className="mt-4 flex-row items-center justify-center">
                <Text className="text-sm text-[#5c3a23]">
                  Already part of us?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/login")}>
                  <Text className="text-sm font-semibold text-[#a6683f]">
                    Login
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

type LabeledInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?:
    | "additional-name"
    | "address-line1"
    | "address-line2"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-day"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "email"
    | "family-name"
    | "given-name"
    | "honorific-prefix"
    | "honorific-suffix"
    | "name"
    | "nickname"
    | "organization"
    | "password"
    | "postal-code"
    | "street-address"
    | "tel"
    | "username"
    | "off";
};

const LabeledInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
}: LabeledInputProps) => {
  return (
    <View>
      <Text className="text-xs uppercase tracking-[0.3em] text-[#a6683f]">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a07a63"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        className="mt-2 rounded-2xl border border-[#ead7c0] bg-[#fffaf5] px-4 py-3 text-base text-[#1f130c]"
      />
    </View>
  );
};

export default Register;
