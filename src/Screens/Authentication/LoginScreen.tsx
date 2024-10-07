import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'
import TopLogin from '../../Components/Authentication/TopLogin'
import StandardInput from '../../Components/Inputs/Authentication/StandardInput'
import RedButton from '../../Components/Buttons/Authentication/RedButton'
import LoginAlternatives from '../../Components/Authentication/LoginAlternatives'

const LoginScreen = () => {
  return (
    <View style={tailwind`flex-1 bg-white`}>
      <TopLogin />
      <View style={tailwind`w-full py-6 px-4`}>
        <LoginAlternatives />
        <View style={tailwind`mt-4`}>
          <StandardInput />
        </View>
        <View style={tailwind`mt-4`}>
          <StandardInput />
        </View>
        <View style={tailwind`w-full flex flex-row justify-end mt-1`}>
          <Text>Forgot Password?</Text>
        </View>
        <View style={tailwind`mt-4`}>
          <RedButton />
        </View>
        <View style={tailwind`w-full flex flex-row justify-center items-center mt-3`}>
          <Text>Don't have an account?</Text>
          <Text style={tailwind`ml-1 font-semibold text-red-500`}>Create Account</Text>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen
