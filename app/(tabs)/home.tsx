import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import LatestVideos from '@/components/LatestVideos'
import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import { useUserContext } from '@/context/UserContextProvider'

const Home = () => {

  const { user } = useUserContext()
  const [refreshing, setRefreshing] = useState(false)

  const handlRefresh = async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const videos = [
    {
      title: "Get inspired to code",
      $id: "1",
      thumbnail:
        "https://i.ibb.co/tJBcX20/Appwrite-video.png",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      prompt:
        "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language",
    },
    {
      $id: "2",
      title: "How AI Shapes Coding Future",
      thumbnail:
        "https://i.ibb.co/Xkgk7DY/Video.png",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      prompt: "Picture the future of coding with AI. Show AR VR",
    },
    {
      $id: "3",
      title: "Dalmatian's journey through Italy",
      thumbnail:
        "https://i.ibb.co/CBYzyKh/Video-1.png",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      prompt:
        "Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy",
    },
    {
      $id: "4",
      title: "Meet small AI friends",
      thumbnail:
        "https://i.ibb.co/7XqVPVT/Photo-1677756119517.png",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      prompt:
        "Make a video about a small blue AI robot blinking its eyes and looking at the screen",
    },
    {
      $id: "5",
      title: "Find inspiration in Every Line",
      thumbnail:
        "https://i.ibb.co/mGfCYJY/Video-2.png",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      prompt:
        "A buy working on his laptop that sparks excitement for coding, emphasizing the endless possibilities and personal growth it offers",
    },
    {
      $id: "6",
      title: "Japan's Blossoming temple",
      thumbnail:
        "https://i.ibb.co/3Y2Nk7q/Bucket-215.png",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      prompt: "Create a captivating video journey through Japan's Sakura Temple",
    },
    {
      $id: "7",
      title: "A Glimpse into Tomorrow's VR World",
      thumbnail:
        "https://i.ibb.co/C5wXXf9/Video-3.png",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      prompt: "An imaginative video envisioning the future of Virtual Reality",
    },
    {
      $id: "8",
      title: "A World where Ideas Grow Big",
      thumbnail:
        "https://i.ibb.co/DzXRfyr/Bucket-59038.png",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      prompt:
        "Make a fun video about hackers and all the cool stuff they do with computers",
    },
  ];

  const link = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <SafeAreaView className='bg-primary'>

      <FlatList
        data={[
          { $id: '1', title: "AI generated videos are cool", thumbnail: images.thumbnail, video: link, creator: { username: 'Creator1', avatar: images.profile } },
          { $id: '2', title: "React Native Tutorial", thumbnail: images.thumbnail, video: link, creator: { username: 'Creator2', avatar: images.profile } },
          { $id: '3', title: "JavaScript Basics", thumbnail: images.thumbnail, video: link, creator: { username: 'Creator3', avatar: images.profile } },
          { $id: '4', title: "CSS Grid Layout", thumbnail: images.thumbnail, video: link, creator: { username: 'Creator4', avatar: images.profile } },
          { $id: '5', title: "Node.js Crash Course", thumbnail: images.thumbnail, video: link, creator: { username: 'Creator5', avatar: images.profile } }
        ]}
        // data={[]}
        keyExtractor={item => item.$id}

        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}

        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-6' >

            <View className='flex flex-row items-center justify-between mb-6 border-2 ' >
              <View>
                <Text className='font-psemibold text-sm text-gray-100'>
                  Welcome
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  {user?.username || 'Guest'}
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-lg font-pregular text-gray-100 mb-3'>
                Latest Videos
              </Text>
              <LatestVideos posts={videos} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Please try again later"

          />
        )}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handlRefresh}
          />
        }

      />
    </SafeAreaView>
  )
}

export default Home