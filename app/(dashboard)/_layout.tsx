import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const tabs = [
  { name: "home", title: "Home", icon: "home" },
  { name: "cart", title: "Cart", icon: "shopping-cart" },
  { name: "category", title: "Categories", icon: "article" },
  { name: "profile", title: "Profile", icon: "person" },
] as const;
// DRY - Don't Repeat Yourself
const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      //   tabBar={(prop) => <></>}
    >
      {tabs.map(({ name, title, icon }: any) => (
        <Tabs.Screen
          name={name}
          options={{
            title: title,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default DashboardLayout;


