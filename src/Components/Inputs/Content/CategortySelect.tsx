import React from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'

interface CategoryProps {
  cuisines: string[],
  categories: string,
  updateCuisine: (data: string) => void,
  header: string
}

const CategortySelect: React.FC<CategoryProps> = ({header, categories, cuisines, updateCuisine}) => {
  return (
    <View style={tailwind`px-2 mt-4`}>
      <Text style={tailwind`text-lg font-bold text-black mb-2`}>{header}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tailwind`flex flex-row`}>
        {cuisines.map((cuisine, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => updateCuisine(cuisine)}
            style={[
              tailwind`p-2 rounded-lg mx-1 border border-gray-300`,
              categories === cuisine ? tailwind`bg-red-500` : tailwind`bg-white`,
            ]}
          >
            <Text style={tailwind`${categories.includes(cuisine) ? 'text-white' : 'text-black'} text-base`}>
              {cuisine}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default CategortySelect
