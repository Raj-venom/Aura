import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const VideoCard = ({
  title,
  creator,
  avatar,
  thumbnail,
  video,
}: {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}) => {

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View className="px-4 mb-14 fex flex-col items-center ">
      <View className="flex pl-2 flex-row items-center justify-around ">
        {/* // tex */}
        <View className="flex flex-row gap-2">
          <View className="w-[46px] h-[46px] rounded-lg border-secondary border ">
            <Image
              // source={{ uri: avatar }}
              source={avatar}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex justify-center flex-1 gap-y-1 ">
            <Text
              numberOfLines={1}
              className="text-white text-sm font-psemibold"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-gray-100 text-xs font-pregular "
            >
              {creator}
            </Text>
          </View>
        </View>

        <View>
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {
        isPlaying ? (
          <Text
            className="text-white text-lg font-psemibold mt-3"
          >Playing...</Text>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsPlaying(prev => !prev)}
            className="w-full h-60 rounded-xl mt-3 flex justify-center items-center relative"
          >
            <Image
              source={thumbnail}
              className="w-full h-full rounded-xl mt-3"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )
      }

    </View>
  );
};

export default VideoCard;
