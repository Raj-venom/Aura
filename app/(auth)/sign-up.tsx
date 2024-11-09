import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite.config'

const SignUp = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async () => {

    setIsSubmitting(true)
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'All fields are required')
      setIsSubmitting(false)
      return
    }

    try {
      const result = await createUser(form.email, form.password, form.username);

      if (!result) {
        throw new Error('Account creation failed')
      }

      console.log('result', result) 

      router.replace('/home')


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
          className='w-full h-full  px-4 my-6 flex justify-center '
        >

          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />

          <Text
            className='text-2xl text-white font-semibold mt-10 font-psemibold '
          >
            Sign Up
          </Text>

          <FormField
            title='Username'
            value={form.username}
            otherStyles='mt-10'
            handleChangeText={(text) => setForm({ ...form, username: text })}
            placeholder='Your unique username'
          />

          <FormField
            title='Email'
            value={form.email}
            otherStyles='mt-7'
            keyboardType="email-address"
            handleChangeText={(text) => setForm({ ...form, email: text })}
            placeholder='name@example.com'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles='mt-7'
            placeholder='Password'
          />

          <CustomButton
            title='Sign Up'
            handlePress={handleSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}

          />


          <View className='flex flex-row justify-center gap-2 pt-5' >

            <Text className='text-lg text-gray-100 font-pregular' >
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