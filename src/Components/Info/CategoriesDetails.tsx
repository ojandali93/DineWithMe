import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

interface RecipeDetailsProps {
  dish: string,
  food: string,
  meal: string,
  cuisine: string,
}

const CategoriesDetails: React.FC<RecipeDetailsProps> = ({dish, food, meal, cuisine}) => {
  return (
    <View style={tailwind``}>
      {
        dish
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Dish:</Text>
              <Text style={tailwind`text-base font-semibold`}>{dish}</Text>
            </View>
          : null
      }
      {
        food
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Food:</Text>
              <Text style={tailwind`text-base font-semibold`}>{food}</Text>
            </View>
          : null
      }
      {
        meal
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Meal:</Text>
              <Text style={tailwind`text-base font-semibold`}>{meal}</Text>
            </View>
          : null
      }
      {
        cuisine
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Cuisine:</Text>
              <Text style={tailwind`text-base font-semibold`}>{cuisine}</Text>
            </View>
          : null
      }
    </View>
  )
}

export default CategoriesDetails
