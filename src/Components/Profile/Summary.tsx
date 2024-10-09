import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

interface SummaryProps {
  following: number,
  followers: number,
  recipes: number,
  lists: number
}

const Summary: React.FC<SummaryProps> = ({followers, following, recipes, lists}) => {
  return (
    <View style={tailwind`flex flex-row mt-4 justify-between px-4`}>
      <View style={tailwind`flex items-center`}>
        <Text style={tailwind`text-base font-semibold`}>{following}</Text>
        <Text style={tailwind`text-base mt-1`}>Following</Text>
      </View>
      <View style={tailwind`flex items-center`}>
        <Text style={tailwind`text-base font-semibold`}>{followers}</Text>
        <Text style={tailwind`text-base mt-1`}>Followers</Text>
      </View>
      <View style={tailwind`flex items-center`}>
        <Text style={tailwind`text-base font-semibold`}>{recipes}</Text>
        <Text style={tailwind`text-base mt-1`}>Recipes</Text>
      </View>
      <View style={tailwind`flex items-center`}>
        <Text style={tailwind`text-base font-semibold`}>{lists}</Text>
        <Text style={tailwind`text-base mt-1`}>Lists</Text>
      </View>
    </View>
  )
}

export default Summary
