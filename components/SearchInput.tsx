import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

const SearchInput = () => {
	const [focused, setFocused] = useState(false)
	return (
		<View
			className={`bg-black-100 w-full h-16 flex flex-row items-center space-x-4 px-4 rounded-2xl border-2 ${focused ? "border-secondary" : "border-black-200"} `}
		>
			<TextInput
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				className='text-base mt-0.5 text-white flex-1 font-pregular'
				placeholder='Search for videos'
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