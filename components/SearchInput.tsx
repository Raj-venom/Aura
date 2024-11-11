import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

const SearchInput = () => {
  return (
    <View className="bg-black-100 border-black-200 w-full h-16 flex flex-row items-center space-x-4 px-4 focus:border-secondary rounded-2xl ">

      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        placeholder='Search a video topic'
        placeholderTextColor="#CDCDE0"
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          className='w-5 h-5'
          resizeMode='contain'
        />
      </TouchableOpacity>

    </View>
  )
}

export default SearchInput