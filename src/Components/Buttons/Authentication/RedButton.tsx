import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { CheckCircle, User } from 'react-native-feather'
import tailwind from 'twrnc'

const RedButton = () => {
  return (
    <View style={tailwind`flex flex-row justify-center items-center w-full py-3 bg-red-500 rounded-3`}>
      <Text style={tailwind`text-lg font-bold text-white`}>Login</Text>
    </View>
  )
}

export default RedButton
