import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''))
    }, 500)
    return () => clearInterval(interval)
  }, [])
  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex justify-center items-center h-full w-full'>
        <View  className='flex flex-row gap-1 items-center justify-center'>

          <Text className='text-2xl text-white font-psemibolds'>
            Feature coming
          </Text>
          <Text className='text-secondary-100 text-4xl'>
            {getSoonText(dots)}{dots}
          </Text>

        </View>

      </View>
    </SafeAreaView>
  )
}
const getSoonText = (dots: string) => {
  switch (dots.length) {
    case 1:
      return 'SOon';
    case 2:
      return 'SOOn';
    case 3:
      return 'SOON';
    default:
      return 'Soon';
  }
}
export default Bookmark