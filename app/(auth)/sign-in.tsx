import FormField from '@/components/FormField'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/appwrite.config'

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    if (!form.email || !form.password) {
      Alert.alert('Error', 'All fields are required')
      return
    }

    try {
      await signIn(form.email, form.password)

      router.replace("/home");

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
          className="w-full h-full flex justify-center px-4 my-6"
        >
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />

          <Text className='text-2xl font-semibold text-white mt-10 font-psemibold' >
            Log in to Aora
          </Text>

          <FormField
            title='Email'
            value={form.email}
            otherStyles='mt-7'
            handleChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType="email-address"
            placeholder='Enter your email'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles='mt-7'
            placeholder='Password'
          />

          <View className='flex items-end '>
            <Link href="/" className='text-lg text-gray-100 pt-5' >
              Forgot Password
            </Link>
          </View>

          <CustomButton
            title='Sign In'
            handlePress={handleSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />


          <View className='flex justify-center pt-5 flex-row gap-2' >
            <Text className='text-lg text-gray-100 font-pregular' >
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