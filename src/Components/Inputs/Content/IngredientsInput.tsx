import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Plus, X } from 'react-native-feather';
import tailwind from 'twrnc';

interface IngredientInputProps {
  ingredients: any[],
  updateIngredients: (ingredientId: any, data: string) => void;
  removeIngredients: (id: string) => void;
  addIngredients: () => void;
}

const IngredientsInput: React.FC<IngredientInputProps> = ({
  ingredients,
  updateIngredients,
  removeIngredients,
  addIngredients,
}) => {

  console.log('single ingredient: ', JSON.stringify(ingredients))

  return (
    <View style={tailwind`mt-4`}>
      {ingredients.map((ingredient, index) => (
        <View key={ingredient.id} style={tailwind`w-full flex flex-row justify-center mb-2`}>
          <View style={tailwind`w-full flex flex-row items-center mt-2`}>
            <Text style={tailwind`text-base font-bold mr-2`}>{index + 1}.</Text>
            <TextInput
              value={ingredient.string}
              onChangeText={(text) => updateIngredients(ingredient.id, text)}
              placeholder="Enter ingredient..."
              style={tailwind`flex-1 border-b-2 border-gray-400 p-1`}
            />
            <TouchableOpacity
              onPress={() => removeIngredients(ingredient.id)}
              style={tailwind`bg-red-500 h-8 w-8 flex justify-center items-center rounded-1 ml-2`}
            >
              <X height={20} width={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={tailwind`w-full self-center mb-4 mt-1`}>
        <TouchableOpacity
          onPress={addIngredients}
          style={tailwind`w-full bg-red-500 p-2 mt-1 rounded-2 flex flex-row justify-center items-center`}
        >
          <Plus height={20} width={20} color="white" />
          <Text style={tailwind`text-white text-center text-base font-bold ml-2 py-1`}>
            Add Ingredient
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientsInput;
