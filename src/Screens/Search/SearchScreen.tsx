import React from 'react'
import { ScrollView, View } from 'react-native'
import Template from '../../Components/Headers/Template'
import tailwind from 'twrnc'
import TemplateRecipe from '../../Components/Tiles/TemplateRecipe'

const SearchScreen = () => {
  return (
    <View style={tailwind`flex-1 bg-white`}>
      <Template />
      <ScrollView style={tailwind`flex-1 p-2`}>
        <TemplateRecipe/>
        <TemplateRecipe/>
      </ScrollView>
    </View>
  )
}

export default SearchScreen
