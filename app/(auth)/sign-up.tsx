import { View, Text, Alert, ScrollView, Image, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite.config'
import { useUserContext } from '@/context/UserContextProvider'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLogged } = useUserContext()

  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    try {
      const user = await createUser(form.email, form.password, form.username)

      if (user) {
        Alert.alert('Success', 'Account created successfully 🎉')
      }

      console.log("User", user)

      setUser(user)
      setIsLogged(true)

      router.replace("/home")


    } catch (error: any) {
      Alert.alert('Error', error.message)

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View
          className='w-full h-full px-4 my-6 flex justify-center'
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className='w-[115px] h-[34px]'
          />

          <Text
            className='text-2xl text-white font-semibold mt-10 font-psemibold'
          >
            Sign Up
          </Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            placeholder='Your unique username'
            otherStyles='mt-10'
          />

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            placeholder='name@example.com'
            otherStyles='mt-7'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sign Up'
            handlePress={handleSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex flex-row justify-center gap-2 pt-5' >
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>

            <Link
              href="/sign-in"
              className='text-lg text-secondary font-psemibold'
            >
              Login
            </Link>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp