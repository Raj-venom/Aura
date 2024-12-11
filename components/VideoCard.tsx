import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

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

  const player = useVideoPlayer(video, (player) => {
    // player.loop = false;
    // player.play();
   
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  
  return (
    <View className='px-4 mb-14 flex flex-col items-center' >
      <View className='flex pl-2 flex-row items-center justify-around' >
        <View className='flex flex-row gap-2'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary'>
            <Image
              source={avatar}
              // source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='flex justify-center flex-1 gap-y-1'>
            <Text
              numberOfLines={1}
              className='text-white text-sm font-psemibold'
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className='text-gray-100 text-xs font-pregular'
            >
              {creator}
            </Text>
          </View>
        </View>

        <View>
          <Image
            source={icons.menu}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </View>
      </View>
      {isPlaying ? (
        <VideoView
          player={player}
          style={styles.video}
          allowsFullscreen
          

        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            console.log('i pressed', isPlaying)
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
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
  )
}

export default VideoCard


const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 12,
  },

});
