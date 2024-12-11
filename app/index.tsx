import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/index"
import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { useUserContext } from "@/context/UserContextProvider";

const Welcome = () => {
  const { loading, isLogged } = useUserContext();

  if (loading) {
    return (
      <View className="flex bg-primary justify-center items-center h-full">
        <Text
          className="text-white text-lg font-psemibold"
        >Loading...</Text>
      </View>
    )
  }

  if (!loading && isLogged) return <Redirect href="/home" />


  return (
    <SafeAreaView className="bg-primary h-full" >
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full min-h-[85vh] flex justify-center items-center h-full px-4 " >
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[300px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5" >
            <Text className="text-white text-3xl font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200" >Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-gray-100 text-sm font-pregular mt-7 text-center" >
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
}

export default Welcome;