import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import { Link, router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { getCurrentUser, signIn } from '@/lib/appwrite.config'
import { useUserContext } from '@/context/UserContextProvider'

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { setIsLogged, setUser } = useUserContext()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    try {
      const session = await signIn(form.email, form.password)
      if (!session) {
        Alert.alert('Error', 'Invalid credentials')
        return
      }
      const user = await getCurrentUser();
      if (!user) {
        Alert.alert('Error', 'User not found')
        return
      }
      setIsLogged(true)
      setUser(user)
      console.log("i am sign in user", user)

      router.replace('/home')

    } catch (error: any) {
      Alert.alert('Error', error.message)

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full' >
      <ScrollView>
        <View
          className='w-full h-full flex justify-center px-4 my-6'
        >
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />

          <Text
            className='text-2xl font-semibold text-white mt-10 font-psemibold'
          >
            Log in to Aora
          </Text>

          <FormField
            title='Email'
            value={form.email}
            placeholder='Enter your email'
            otherStyles='mt-7'
            handleChangeText={(text) => setForm({ ...form, email: text })}
          />

          <FormField
            title='Password'
            value={form.password}
            placeholder='Enter your password'
            otherStyles='mt-7'
            handleChangeText={(text) => setForm({ ...form, password: text })}
          />

          <View className='flex items-end '>
            <Link href="/" className='text-lg text-gray-100 pt-5' >
              Forgot password?
            </Link>
          </View>

          <CustomButton
            title='Sign In'
            handlePress={handleSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex flex-row justify-center pt-5 gap-2 items-center ' >
            <Text className='text-gray-100 text-lg font-pregular' >
              Don't have an account?
            </Text>

            <Link
              href="/sign-up"
              className='text-lg text-secondary font-psemibold'
            >
              Signup
            </Link>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn