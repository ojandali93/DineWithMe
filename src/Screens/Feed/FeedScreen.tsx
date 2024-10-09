import React from 'react'
import { View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import { useNavigation } from '@react-navigation/native'

const FeedScreen = () => {

  const navigation = useNavigation()

  const goToAddRecipes = () => {
    navigation.navigate('CreateRecipeScreen')
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader 
        header='Dine With Me' 
        add={true} 
        addClick={goToAddRecipes} 
        notifications={true} 
        notificationsClick={() => {}}
        favorites={true}
        favoritesClick={() => {}}
      />
    </View>
  )
}

export default FeedScreen
