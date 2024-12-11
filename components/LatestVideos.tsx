// import { useState } from 'react'
// import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
// import * as Animatable from "react-native-animatable"
// import { Video, ResizeMode } from "expo-av"
// import { icons } from '@/constants'

// const zoomIn = {
//   0: {
//     scale: 0.9,
//     opacity: 1,
//   },
//   1: {
//     scale: 1,
//     opacity: 1,
//   },
// };

// const zoomOut = {
//   0: {
//     scale: 1,
//     opacity: 1,
//   },
//   1: {
//     scale: 0.9,
//     opacity: 1,
//   },
// };


// const LatestItem = ({ activeItem, item }: {
//   activeItem: any,
//   item: any
// }) => {
//   const [play, setPlay] = useState(false);

//   console.log(item.$id, activeItem)

//   return (
//     <Animatable.View
//       className='mr-5'
//       animation={activeItem === item.$id ? zoomIn : zoomOut}
//       duration={500}
//     >

//       {play ? (
//         <Video
//           source={{ uri: item.video }}
//           className='w-52 h-72 rounded-[33px] mt-3 bg-white/10'
//           resizeMode={ResizeMode.CONTAIN}
//           useNativeControls
//           shouldPlay
//           onPlaybackStatusUpdate={(status) => {
//             // console.log(status)
//             // @ts-ignore
//             if (status.didJustFinish) {
//               setPlay(false)
//             }
//           }}
//         />
//       ) : (
//         <TouchableOpacity
//           className='relative flex justify-center items-center'
//           activeOpacity={0.7}
//           onPress={() => setPlay(true)}
//         >

//           <ImageBackground
//             source={{ uri: item.thumbnail }}
//             className='w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40'
//             resizeMode='cover'
//           />

//           <Image
//             source={icons.play}
//             className='w-12 h-12 absolute'
//             resizeMode='contain'
//           />

//         </TouchableOpacity>
//       )}
//     </Animatable.View>
//   )
// }


// const LatestVideos = ({ posts }: {
//   posts: any[]
// }) => {
//   const [activeItem, setActiveItem] = useState(posts[0]);

//   const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
//     if (viewableItems.length > 0) {
//       setActiveItem(viewableItems[0].key)
//     }
//   }

//   return (
//     <FlatList
//       data={posts}
//       horizontal
//       keyExtractor={item => item.$id}
//       renderItem={({ item }) => (
//         <LatestItem activeItem={activeItem} item={item} />
//       )}
//       onViewableItemsChanged={viewableItemsChanged}
//       contentOffset={{ x: 170, y: 0 }}
//       viewabilityConfig={{
//         itemVisiblePercentThreshold: 70,
//       }}

//     />
//   )
// }

// export default LatestVideos


import { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native'
import * as Animatable from "react-native-animatable"
import { useVideoPlayer, VideoView } from 'expo-video';
import { icons } from '@/constants'
import { useEvent } from 'expo';

const zoomIn = {
  0: {
    scale: 0.9,
    opacity: 1,
  },
  1: {
    scale: 1,
    opacity: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
    opacity: 1,
  },
  1: {
    scale: 0.9,
    opacity: 1,
  },
};


const LatestItem = ({ activeItem, item }: {
  activeItem: any,
  item: any
}) => {

  const player = useVideoPlayer(item.video, (player) => {
    // player.loop = false;
    // player.play();
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  console.log(item.$id, activeItem)
  // console.log("isPlaying", isPlaying)


  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >

      {isPlaying ? (
        <VideoView
          player={player}
          style={styles.video}
          // className="h-72 w-52 rounded-[33px] mt-3 bg-white/10"
          allowsFullscreen

        />
      ) : (
        <TouchableOpacity
          className='relative flex justify-center items-center'
          activeOpacity={0.7}
          onPress={() => {
            console.log('i pressed', isPlaying)
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        >

          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />

        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}


const LatestVideos = ({ posts }: {
  posts: any[]
}) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={item => item.$id}
      renderItem={({ item }) => (
        <LatestItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      contentOffset={{ x: 170, y: 0 }}


    />
  )
}

export default LatestVideos

const styles = StyleSheet.create({

  video: {
    width: 208,
    height: 288,
    borderRadius: 33,
    marginTop: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    resizeMode: 'contain',
  },

});
