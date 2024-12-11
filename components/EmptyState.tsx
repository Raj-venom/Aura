import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({
    title,
    subtitle
}: {
    title: string,
    subtitle: string
}) => {
    return (
        <View className='flex justify-center items-center px-4'>
            <Image
                source={images.empty}
                className="w-[270px] h-[216px]"
                resizeMode='contain'
            />
            <Text className='text-gray-100 text-sm font-psemibold' >{title}</Text>
            <Text className="text-white text-xl font-psemibold mt-2">{subtitle}</Text>


            <CustomButton
                title='Create a video'
                handlePress={() => router.push("/create")}
                containerStyles='w-full mt-5'
            />

        </View>
    )
}

export default EmptyState