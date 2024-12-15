import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useUserContext } from '@/context/UserContextProvider'
import useAppwrite from '@/lib/useAppwrite'
import { getUserPosts, signOut } from '@/lib/appwrite.config'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { postProps } from '@/types/post.type'
import VideoCard from '@/components/VideoCard'
import EmptyState from '@/components/EmptyState'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'

const Profile = () => {
  const { user, setUser, setIsLogged } = useUserContext()
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  }

  return (
    <SafeAreaView className='bg-primary h-full' >
      <FlatList
        data={posts as postProps[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}

        ListHeaderComponent={() => (
          <View className='w-full mt-6 mb-12 px-4 flex items-center justify-center'>
            <TouchableOpacity
              onPress={logout}
              className='flex w-full items-end mb-10'
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className='w-16 h-16 border-secondary border rounded-lg flex items-center justify-center'>
              <Image
                source={{ uri: user.avatar }}
                className='rounded-lg h-[90%] w-[90%]'
                resizeMode='cover'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='flex mt-5 gap-10 flex-row'  >
              <InfoBox
                title={posts.length || 12}
                subtitle='Posts'
                titleStyles='text-xl'
              />
              <InfoBox
                title="1.5k"
                subtitle='Followers'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile