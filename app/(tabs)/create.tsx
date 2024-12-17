import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '@/components/CustomButton'
import { createVideoPost } from '@/lib/appwrite.config'
import { useUserContext } from '@/context/UserContextProvider'

export type FormFieldType = {
  title: string;
  video: string | null;
  thumbnail: string | null;
  prompt: string;
  userId: string | null;
}

const Create = () => {

  const { user } = useUserContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormFieldType>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    userId: user?.$id || null
  })



  const player = useVideoPlayer(form.video, (player) => {
    // player.loop = false;
    // player.play();

  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const openPicker = async (type: "video" | "image") => {
    let result;

    if (type === "image") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (type === "video") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        aspect: [4, 3],
        quality: 1,
      });
    }


    if (!result?.canceled) {
      if (type === "video") {
        setForm({ ...form, video: result?.assets[0].uri || null })
      }

      if (type === "image") {
        setForm({ ...form, thumbnail: result?.assets[0].uri || null })
      }
    }

  }

  const uploadVideo = async () => {
    if (Object.values(form).some((value) => value === null || value === "")) {
      console.log(form, "form")
      alert("All fields are required ")
      return;
    }
    setUploading(true);
    try {
      await createVideoPost({
        ...form,
      })

    } catch (error: any) {
      alert(error.message)

    } finally {
      setUploading(false)
    }

  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6' >
        <Text className='text-white text-2xl font-psemibold' >Upload Video</Text>
        <FormField
          title='Video Title'
          value={form.title}
          placeholder="Give your video a title"
          handleChangeText={(text) => setForm({ ...form, title: text })}
          otherStyles='mt-10'
        />

        <View className='mt-7 space-y-2'>
          <Text className="text-base text-gray-100 font-pmedium" >
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")} >
            {form.video ? (

              <VideoView
                player={player}
                style={styles.video}
              />

            ) : (
              <View className='border border-black-100 w-full h-40 bg-black-100 rounded-2xl flex justify-center items-center' >
                <View className='w-14 h-14 border border-dashed border-secondary-100 flex items-center justify-center' >
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    alt='upload'
                    className='w-1/2 h-1/2'
                  />
                </View>

              </View >
            )}
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className="text-base text-gray-100 font-pmedium" >
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")} >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail }}
                className='w-full h-64 rounded-2xl'
                resizeMode='cover'
              />

            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title='Ai Prompt'
          value={form.prompt}
          placeholder='The AI prompt for the video'
          handleChangeText={(text) => setForm({ ...form, prompt: text })}
          otherStyles='mt-7'
        />

        <CustomButton
          title='Submit & Publish'
          handlePress={uploadVideo}
          isLoading={uploading}
          containerStyles='mt-7'
        />

      </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 256,
    borderRadius: 16,
    resizeMode: 'cover',
  },

})


export default Create
