import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import { MoreHorizontal } from 'react-native-feather'
import tailwind from 'twrnc'
import Portrait from '../../Assets/portrait.jpg'
import { useNavigation } from '@react-navigation/native'

const imageWidth = Dimensions.get('screen').width
const imageHeight = imageWidth - 86

interface RecipeProps {
  recipe: any
}

const RecipeTile: React.FC<RecipeProps> = ({recipe}) => {
  const navigation = useNavigation()

  const limitStringLength = (text: string) => {
    if (text.length > 96) {
      return text.substring(0, 96) + '...';
    }
    return text;
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SingleRecipeScreen', {recipe: recipe})} style={tailwind`w-full rounded-3 bg-stone-200 mb-2`}>
      <TouchableOpacity style={tailwind`w-full h-14 flex flex-row justify-between items-center px-2`}> 
        <View style={tailwind`flex-1 h-full flex flex-row items-center`}>
          <Image style={tailwind`h-10 w-10 rounded-full border-2 border-stone-400`} source={{uri: recipe.user_profile.profile_picture}}/>
          <View style={tailwind`ml-2`}>
            <Text style={tailwind`font-bold text-base`}>{recipe.user_profile.username}</Text>
            {/* <Text style={tailwind`text-sm`}>Account name </Text> */}
          </View>
        </View>
        <MoreHorizontal height={24} width={24} color={'black'}/>
      </TouchableOpacity>
      <View style={[tailwind`w-full rounded-3`, {height: imageHeight}]}>
        <Image style={tailwind`w-full h-86 rounded-3`} source={{uri: recipe.main_image}}/>
      </View>
      <View style={[tailwind`absolute z-10 opacity-50 w-full h-86 bg-slate-900 rounded-3 mt-14`, {height: imageHeight}]}></View>
      <View style={[tailwind`absolute z-15 w-full h-86 mt-14 flex flex-col justify-between p-3`, {height: imageHeight}]}>
        <View style={tailwind`flex flex-row justify-between`}>
          <View />
          <Text style={tailwind`text-base font-bold text-white`}>Yield: {recipe.yield}</Text>
        </View>
        <View>
          <Text style={tailwind`text-2xl font-bold text-white`}>{recipe.title}</Text>
          <Text style={tailwind`text-base text-white font-semibold mb-3`}>{limitStringLength(recipe.description)}</Text>
          <View style={tailwind`flex flex-row justify-between items-center`}>
            <Text style={tailwind`text-base font-bold text-white`}>Prep Time: {recipe.prep_time}</Text>
            <Text style={tailwind`text-base font-bold text-white`}>Cook Time: {recipe.cook_time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RecipeTile
