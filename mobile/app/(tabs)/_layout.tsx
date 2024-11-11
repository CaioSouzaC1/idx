import { Tabs } from "expo-router";
import React from "react";
import HeaderRight from "~/components/navigation/header-right";
import { TabBarIcon } from "~/components/navigation/TabBarIcon";

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
          headerRight: () => <HeaderRight />,
        }}
      />
    </Tabs>
  );
}
