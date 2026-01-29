import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/authService";
import { useRouter } from "expo-router";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const palette = {
  background: "#fbf7f2",
  surface: "#fffaf5",
  outline: "#ead7c0",
  textDark: "#1f130c",
  accent: "#d6b28c",
  accentDark: "#7b3c1d",
};

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const initials = useMemo(() => {
    if (displayName) {
      return displayName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }
    if (email) {
      return email[0]?.toUpperCase() ?? "SZ";
    }
    return "SZ";
  }, [displayName, email]);

  const handleSaveProfile = async () => {
    if (!user) return;
    if (!displayName.trim() || !email.trim()) {
      Alert.alert("Missing info", "Name and email cannot be empty.");
      return;
    }
    try {
      setIsSaving(true);
      if (displayName.trim() !== user.displayName) {
        await updateProfile(user, { displayName: displayName.trim() });
      }
      if (email.trim() !== user.email) {
        await updateEmail(user, email.trim());
      }
      Alert.alert("Profile updated", "Your SweetZone identity looks perfect.");
    } catch (error: any) {
      Alert.alert("Update failed", error.message ?? "Unable to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user) return;
    if (newPassword.length < 6) {
      Alert.alert("Password too short", "Please use at least 6 characters.");
      return;
    }
    try {
      setIsUpdatingPassword(true);
      await updatePassword(user, newPassword);
      setNewPassword("");
      Alert.alert("Password updated", "Your SweetZone vault is refreshed.");
    } catch (error: any) {
      Alert.alert(
        "Password update failed",
        error.message ?? "Reauthenticate and try again.",
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Logout failed", error.message ?? "Please try again.");
    }
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
        <Text className="text-sm uppercase tracking-[0.4em] text-[#a6683f]">
          Profile
        </Text>
        <Text className="mt-2 text-3xl font-bold text-[#2b140a]">
          Your SweetZone identity
        </Text>
      </View>

      <View className="mt-8 items-center px-6">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-[#1a120b]">
          <Text className="text-3xl font-bold text-[#d6b28c]">{initials}</Text>
        </View>
        <Text className="mt-4 text-xl font-semibold text-[#1f130c]">
          {displayName || "Unnamed chocolatier"}
        </Text>
        <Text className="text-base text-[#5c3a23]">
          {email || "Email pending"}
        </Text>
      </View>

      <View className="mt-10 px-6">
        <Text className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a6683f]">
          Account details
        </Text>
        <View className="mt-4 gap-4">
          <ProfileField
            label="Full name"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your name"
          />
          <ProfileField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email"
          />
          <Pressable
            className="mt-2 rounded-2xl bg-[#1f130c] py-3"
            onPress={handleSaveProfile}
            disabled={isSaving}
          >
            <Text className="text-center text-base font-semibold text-white">
              {isSaving ? "Saving..." : "Save profile"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-10 px-6">
        <Text className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a6683f]">
          Password
        </Text>
        <View className="mt-4 gap-3">
          <ProfileField
            label="New password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="••••••"
            secureTextEntry
          />
          <Pressable
            className="rounded-2xl bg-[#d6b28c] py-3"
            onPress={handleUpdatePassword}
            disabled={isUpdatingPassword}
          >
            <Text className="text-center text-base font-semibold text-[#1f130c]">
              {isUpdatingPassword ? "Updating..." : "Update password"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-12 px-6">
        <View className="rounded-3xl border border-[#d6b28c]/50 bg-white p-6">
          <Text className="text-lg font-semibold text-[#1f130c]">
            Sign out of SweetZone
          </Text>
          <Text className="mt-2 text-base text-[#4a2d1b]">
            Securely log out to keep your cacao rituals protected.
          </Text>
          <Pressable
            className="mt-4 rounded-2xl border border-[#1a120b] py-3"
            onPress={handleLogout}
          >
            <Text className="text-center text-base font-semibold text-[#1a120b]">
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

type ProfileFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

const ProfileField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}: ProfileFieldProps) => {
  return (
    <View>
      <Text className="text-xs uppercase tracking-[0.3em] text-[#7b3c1d]">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#b79378"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className="mt-2 rounded-2xl border border-[#ead7c0] bg-[#fffaf5] px-4 py-3 text-base text-[#1f130c]"
      />
    </View>
  );
};

export default Profile;
