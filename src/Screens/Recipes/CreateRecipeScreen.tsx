import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import SelectImageFromGallerySq from '../../Components/ImagesAndVideo/SelectImageFromGallerySq'
import RecipeInput from '../../Components/Inputs/Content/RecipeInput'
import SelectVideoFromGallerySq from '../../Components/ImagesAndVideo/SelectVideoFromGallerySq'
import IngredientsInput from '../../Components/Inputs/Content/IngredientsInput'

const CreateRecipeScreen = () => {

  const [recipeMainImage, setRecipeMainImage] = useState<any>(null)
  const [recipeMainVideo, setRecipeMainVidoe] = useState<any>(null)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [yieldAmount, setYieldAmount] = useState<string>('')
  const [prepTime, setPrepTime] = useState<string>('')
  const [cookTime, setCookTime] = useState<string>('')

  const [ingredients, setIngredients] = useState<any[]>([])

  function generateRandomCode() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  const addIngredientInput = () => {
    const newIngredient = { id: generateRandomCode(), string: '' };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleIngredientChange = (id: string, updatedData: any) => {
    console.log('ingredient id: ', id)
    console.log('updated data: ', updatedData)
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? {id: id, string: updatedData} : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const removeIngredientInput = (id: string) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
    setIngredients(updatedIngredients);
  };
 
  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader 
        header='Add Recipe' 
      />
      <ScrollView style={tailwind`flex-1 bg-white p-4`}>
        <SelectImageFromGallerySq picture={recipeMainImage} updatePicture={setRecipeMainImage}/>
        <RecipeInput header='Title:' value={title} updateInput={setTitle} capitalize='none' multi={false} placeholder='recipe title...'/>
        <RecipeInput header='Description:' value={description} updateInput={setDescription} capitalize='none' multi={true} placeholder='recipe description...'/>
        <RecipeInput header='Yield:' value={yieldAmount} updateInput={setYieldAmount} capitalize='none' multi={false} placeholder='recipe yield...'/>
        <View style={tailwind`w-full flex flex-row`}>
          <View style={tailwind`w-1/2`}>
            <RecipeInput header='Prep Time:' value={prepTime} updateInput={setPrepTime} capitalize='none' multi={false} placeholder='recipe prep time...'/>
          </View>
          <View style={tailwind`w-1/2`}>
            <RecipeInput header='Cook Time:' value={cookTime} updateInput={setCookTime} capitalize='none' multi={false} placeholder='recipe cook time...'/>
          </View>
        </View>
        <SelectVideoFromGallerySq video={recipeMainVideo} updateVideo={setRecipeMainVidoe}/>
        <IngredientsInput ingredients={ingredients} updateIngredients={handleIngredientChange} removeIngredients={removeIngredientInput} addIngredients={addIngredientInput}/>
        <View style={tailwind`h-8 w-full`}></View>
      </ScrollView>
    </View>
  )
}

export default CreateRecipeScreen
