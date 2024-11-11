import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import { router } from "expo-router";
import CustomButton from "./CustomButton";

const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-gray-100 text-sm font-pmedium ">{title}</Text>
      <Text className="text-white text-xl font-psemibold mt-2">{subtitle}</Text>

      <CustomButton
        title="Browse Videos"
        handlePress={() => router.push("/home")}
        containerStyles="w-full mt-5"
      />
    </View>
  );
};

export default EmptyState;
