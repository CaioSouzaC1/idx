import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "~/components/navigation/TabBarIcon";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#dc2626",
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
