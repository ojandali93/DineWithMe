import React, { useState } from 'react'
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import SelectImageFromGallerySq from '../../Components/ImagesAndVideo/SelectImageFromGallerySq'
import RecipeInput from '../../Components/Inputs/Content/RecipeInput'
import SelectVideoFromGallerySq from '../../Components/ImagesAndVideo/SelectVideoFromGallerySq'
import IngredientsInput from '../../Components/Inputs/Content/MultipleInputs'
import CategortySelect from '../../Components/Inputs/Content/CategortySelect'
import RedButton from '../../Components/Buttons/Authentication/RedButton'
import MainButton from '../../Components/Buttons/Content/MainButton'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../Utils/firebaseConfig'
import supabase from '../../Utils/supabase'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useUser } from '../../Context/UserContext'
import { useNavigation } from '@react-navigation/native'
import InstructionsInput from '../../Components/Inputs/Content/InstructionsInput'
import NutritionalFacts from '../../Components/Inputs/Content/NutritionalFacts'
import { useRecipe } from '../../Context/RecipeContext'

const typesOfCuisine = [
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "Japanese",
  "French",
  "Thai",
  "Greek",
  "Spanish",
  "Lebanese",
  "Vietnamese",
  "Turkish",
  "Korean",
  "Brazilian",
  "Caribbean",
  "Moroccan",
  "Ethiopian",
  "American",
  "Mediterranean",
  "Peruvian",
];

const typesOfFood = [
  "Fast Food",
  "Street Food",
  "BBQ",
  "Seafood",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Organic",
  "Comfort Food",
  "Healthy",
  "Baked Goods",
  "Grilled Food",
  "Finger Food"
]

const typesOfMeals = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Brunch",
    "Snack",
    "Dessert",
]

const typesOfDishes = [
  "Appetizers",
  "Salads",
  "Soups",
  "Main Course",
  "Side Dish",
  "Beverages",
]


const CreateRecipeScreen = () => {

  const {currentProfile} = useUser()
  const {grabUserRecipes} = useRecipe()
  const navigation = useNavigation()

  const [recipeMainImage, setRecipeMainImage] = useState<any>(null)
  const [recipeMainVideo, setRecipeMainVidoe] = useState<any>(null)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [yieldAmount, setYieldAmount] = useState<string>('')
  const [prepTime, setPrepTime] = useState<string>('')
  const [cookTime, setCookTime] = useState<string>('')
  const [tip, setTip] = useState<string>('')

  const [ingredients, setIngredients] = useState<any[]>([])
  const [instructions, setInstructions] = useState<any[]>([])

  const [categories, setCategories] = useState<string>(''); 
  const [foods, setFoods] = useState<string>(''); 
  const [meals, setMeals] = useState<string>(''); 
  const [dishes, setDishes] = useState<string>(''); 

  const [creatingRecipe, setCreatingRecipe] = useState<boolean>(false)

  const [nutritionalFacts, setNutritionalFacts] = useState<any>({
    servingSize: '',
    calories: '',
    totalFats: '',
    saturatedFats: '',
    transFats: '',
    cholesterol: '',
    sodium: '',
    totalCarbohydrates: '',
    dietaryFiber: '',
    totalSugars: '',
    protein: '',
  });

  function generateRandomCode() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  const addIngredientInput = () => {
    const newIngredient = { id: generateRandomCode(), amount: '', item: ''};
    setIngredients([...ingredients, newIngredient]);
  };

  const handleIngredientChange = (id: string, amount: string, item: string) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? {id: id, amount: amount, item: item} : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const removeIngredientInput = (id: string) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
    setIngredients(updatedIngredients);
  };

  const addInstruction = () => {
    const newInstruction = { id: generateRandomCode(), item: '' };
    setInstructions([...instructions, newInstruction]);
  };

  const handleUpdateInstruction = (id: string, item: string) => {
    const updateInstructions = instructions.map((instruction) =>
      instruction.id === id ? {id: id, item: item} : instruction
    );
    setInstructions(updateInstructions);
  };

  const removeInstruction = (id: string) => {
    const uppdatedInstructions = instructions.filter((instruction) => instruction.id !== id);
    setInstructions(uppdatedInstructions);
  };

  const handleNutritionalFactsChange = (key: string, value: string) => {
    setNutritionalFacts((prevFacts) => ({
      ...prevFacts,
      [key]: value,
    }));
  };

  const createRecipe = () => {
    setCreatingRecipe(true)
    uploadMainImageToFirebase()
  }

  const uploadMainImageToFirebase = async () => {
    try {
      const folderName = 'Recipe_Pictures'; 
      const response = await fetch(recipeMainImage.uri!);
      const blob = await response.blob();
      const storageRef = ref(storage, `${folderName}/${blob.data.name}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Downloadable URL (Image):', downloadURL);
      if(recipeMainVideo === null){
          addRecipeDetailsToDatabase(downloadURL, null)
        } else {
          setTimeout(() => {
            uploadVideoTutorialToFirebase(downloadURL)
          }, 500)
        }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const uploadVideoTutorialToFirebase = async (imageUrl: string) => {
    try {
      const folderName = 'Recipe_Videos';
      const response = await fetch(recipeMainVideo.uri);
      const blob = await response.blob(); 
      const fileKey = `${folderName}/${blob.data.name}`;
      const storageRef = ref(storage, fileKey);
      const snapshot = await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Downloadable URL:', downloadURL);
      addRecipeDetailsToDatabase(imageUrl, downloadURL);
    } catch (error) {
      console.error('Error uploading video tutorial:', error);
      return null;
    }
  };

  const addRecipeDetailsToDatabase = async (imageUrl: string, videoUrl: string | null) => {
    try {
      const { data, error } = await supabase
        .from('Recipes')
        .insert([
          {
            title: title,
            description: description,
            yield: yieldAmount,  // Check for typos here
            prep_time: prepTime,
            cook_time: cookTime,
            featured: null,
            new: true,
            trending: false,
            main_video: videoUrl,
            main_image: imageUrl,
            user_id: currentProfile.user_id,
            tip: tip
          },
        ])
        .select();
      if (error) {
        console.error('Error inserting recipe:', error);
      } else {
        const recipeId = data[0].id; // Assuming 'id' is the primary key
         addIngredientsToDatabase(recipeId)
      }
    } catch (error) {
      console.error('Unexpected error while inserting recipe:', error);
    }
  };

  const addIngredientsToDatabase = async (recipe_id: number) => {
    for (let ingredient of ingredients) {
      try {
        const { data, error } = await supabase
          .from('Ingredients')
          .insert([
            {
              item: ingredient.item,
              amount: ingredient.amount,
              recipe_id: recipe_id,         
              optional: false,    
            }
          ]);
        if (error) {
          console.error('Error inserting ingredient:', error);
        } else {
          console.log('Ingredient inserted successfully:', data);
        }
      } catch (error) {
        console.error('Unexpected error while inserting ingredient:', error);
      }
    }
    addInstructionsToDatabase(recipe_id)
  };

  const addInstructionsToDatabase = async (recipe_id: number) => {
    for (let instruction of instructions) {
      try {
        const { data, error } = await supabase
          .from('Instructions')  // Your table name
          .insert([
            {     // Maps to 'quantity'
              item: instruction.item,
              recipe_id: recipe_id,
              optional: false
            }
          ]);
        if (error) {
          console.error('Error inserting instruction:', error);
        } else {
          console.log('Instruction inserted successfully:', data);
        }
      } catch (error) {
        console.error('Unexpected error while inserting ingredient:', error);
      }
    }
    addNutritionToDatabase(recipe_id)
  };

  const addNutritionToDatabase = async (recipe_id: number) => {
    try {
      const { data, error } = await supabase
        .from('Nutrition')  // Your table name
        .insert([
          {     
            serving_size: nutritionalFacts.servingSize,
            calories: nutritionalFacts.calories,
            total_fats: nutritionalFacts.totalFats,
            saturated_fats: nutritionalFacts.saturatedFats,
            trans_fats: nutritionalFacts.transFats,
            cholesterol: nutritionalFacts.cholesterol,
            sodium: nutritionalFacts.sodium,
            total_carbs: nutritionalFacts.totalCarbohydrates,
            dietary_fiber: nutritionalFacts.dietaryFiber,
            total_sugar: nutritionalFacts.totalSugars,
            protein: nutritionalFacts.protein,
            recipe_id: recipe_id,
          }
        ]);
      if (error) {
        console.error('Error inserting instruction:', error);
      } else {
        console.log('Instruction inserted successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error while inserting ingredient:', error);
    }
    addTagsToRecipe(recipe_id)
  };

  const addTagsToRecipe = async (recipe_id: number) => {
    try {
      const { data, error } = await supabase
        .from('Categories')  // Your table name
        .insert([
          {   
            recipe_id: recipe_id, 
            cuisine: categories,
            meal: meals,
            dish: dishes,
            food: foods
          }
        ]);
      if (error) {
        console.error('Error inserting instruction:', error);
      } else {
        console.log('Instruction inserted successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error while inserting ingredient:', error);
    }
    setTitle('')
    setDescription('')
    setYieldAmount('')
    setCookTime('')
    setPrepTime('')
    setRecipeMainImage(null)
    setRecipeMainVidoe(null)
    setIngredients([])
    setInstructions([])
    setTip('')
    setCategories('')
    setMeals('')
    setDishes('')
    setFoods('')
    grabUserRecipes(currentProfile.user_id)
    setCreatingRecipe(false)
    navigation.navigate('FeedScreen')
  };
 
  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader 
        header='Add Recipe' 
        back={true}
      />
      <ScrollView style={tailwind`flex-1 bg-white p-2`}>
        <SelectImageFromGallerySq picture={recipeMainImage} updatePicture={setRecipeMainImage}/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Details</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
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
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Ingredients</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <IngredientsInput items={ingredients} updateItem={handleIngredientChange} removeItem={removeIngredientInput} addItem={addIngredientInput} title='Ingredients'/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Instructions</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <InstructionsInput items={instructions} updateItem={handleUpdateInstruction} removeItem={removeInstruction} addItem={addInstruction} title='Instructions'/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Additional Info</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <RecipeInput header='Tips:' value={tip} updateInput={setTip} capitalize='none' multi={true} placeholder='recipe tip and advice...'/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Nutritional Facts (Optional)</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <NutritionalFacts nutritionalFacts={nutritionalFacts} updateNutritionalFact={handleNutritionalFactsChange}/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Categories</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <CategortySelect categories={categories} cuisines={typesOfCuisine} updateCuisine={setCategories} header='Cuisine'/>
        <CategortySelect categories={foods} cuisines={typesOfFood} updateCuisine={setFoods} header='Type'/>
        <CategortySelect categories={meals} cuisines={typesOfMeals} updateCuisine={setMeals} header='Meal'/>
        <CategortySelect categories={dishes} cuisines={typesOfDishes} updateCuisine={setDishes} header='Dishes'/>
        <View style={tailwind`mt-4`}>
          <MainButton header='Create Recipe' clickButton={createRecipe} loading={creatingRecipe}/>
        </View>
        <View style={tailwind`h-4 w-full`}></View>
      </ScrollView>
    </View>
  )
}

export default CreateRecipeScreen
