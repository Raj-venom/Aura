import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import SearchInput from '../../components/SearchInput';
import LatestVideos from '../../components/LatestVideos';
import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard';

import { useState } from 'react';

const Home = () => {


  const [refreshing, setRefreshing] = useState(false)

  const handlRefresh = async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  return (
    <SafeAreaView className="bg-primary" >

      <FlatList
        data={[
          { $id: '1', title: "AI generated videos are cool", thumbnail: images.thumbnail, video: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', creator: { username: 'Creator1', avatar: images.profile } },
          { $id: '2', title: "React Native Tutorial", thumbnail: images.thumbnail, video: 'https://www.youtube.com/watch?v=0-S5a0eXPoc', creator: { username: 'Creator2', avatar: images.profile } },
          { $id: '3', title: "JavaScript Basics", thumbnail: images.thumbnail, video: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', creator: { username: 'Creator3', avatar: images.profile } },
          { $id: '4', title: "CSS Grid Layout", thumbnail: images.thumbnail, video: 'https://www.youtube.com/watch?v=EFafSYg-PkI', creator: { username: 'Creator4', avatar: images.profile } },
          { $id: '5', title: "Node.js Crash Course", thumbnail: images.thumbnail, video: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', creator: { username: 'Creator5', avatar: images.profile } }
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
          <View className="flex my-6 px-4 space-y-6">

            <View className="flex justify-between items-center mb-6 flex-row" >
              <View>
                <Text className="font-pmedium text-sm text-gray-100" >
                  Welcome
                </Text>
                <Text className="text-2xl font-psemibold text-white" >
                  User
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8" >
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>
              {/* <LatestVideos /> */}
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
          <RefreshControl refreshing={refreshing} onRefresh={handlRefresh} />
        }

      />

    </SafeAreaView>
  )
}

export default Home