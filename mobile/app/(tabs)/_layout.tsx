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
      <Tabs.Screen
        name="books"
        options={{
          title: "Livros",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "book" : "book-outline"}
              color={color}
            />
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "library" : "library-outline"}
              color={color}
            />
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tabs.Screen
        name="my-readings"
        options={{
          title: "Minhas leituras",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bookmarks" : "bookmarks-outline"}
              color={color}
            />
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
    </Tabs>
  );
}
