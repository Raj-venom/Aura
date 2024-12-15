import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
	const [focused, setFocused] = useState(false)
	const pathname = usePathname();
	const [query, setQuery] = useState(initialQuery || "")

	const handleSearch = () => {
		if (query.trim() === "") {
			return Alert.alert("Missing query", "Please enter a search query");
		}

		if (pathname.startsWith("/search")) {
			router.setParams({ query })
		}
		else {
			router.push(`/search/${query}` as any)
		}

	}
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
				value={query}
				onChangeText={setQuery}
			/>

			<TouchableOpacity
				onPress={handleSearch}
			>
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