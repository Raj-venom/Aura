import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useAppwrite from '@/lib/useAppwrite';
import { searchPosts } from '@/lib/appwrite.config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { postProps } from '@/types/post.type';
import VideoCard from '@/components/VideoCard';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';


const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: Posts, refetch } = useAppwrite(() => searchPosts(Array.isArray(query) ? query[0] : query));

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full' >
      <FlatList
        data={Posts as postProps[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            key={item.$id}
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}

        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={Array.isArray(query) ? query[0] : query}  />
                {/* <SearchInput initialQuery={query} refetch={refetch} /> */}
              </View>
            </View>
          </>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />

    </SafeAreaView>
  )
}

export default Search