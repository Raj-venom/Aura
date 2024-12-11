import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { icons } from '@/constants'

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: {
  title: string
  value: string
  placeholder?: string
  handleChangeText: (text: string) => void
  otherStyles?: string
  [key: string]: any; // Accepts other props

}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`} >
      <Text className="text-base text-gray-100 font-medium" >
        {title}
      </Text>

      <View className={`${isFocused ? "border-secondary" : "border-black-200"} w-full h-16 px-4 bg-black-100 rounded-2xl border-2 flex flex-row items-center  `} >
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {
          title === "Password" && (
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
            >
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>
          )
        }

      </View>
    </View>
  )
}

export default FormField