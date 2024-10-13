import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import { BlurView } from '@react-native-community/blur';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import NameAndImageProfile from '../../Components/Profile/NameAndImageProfile';
import Bio from '../../Components/Profile/Bio';
import Summary from '../../Components/Profile/Summary';
import { useRecipe } from '../../Context/RecipeContext';
import supabase from '../../Utils/supabase';
import { FeedStackParamList } from '../../Navigation/FeedStackNavigation';

type SingleRecipeRouteProp = RouteProp<FeedStackParamList, 'SelectedProfileScreenFeed'>;

const SelectedProfileScreen = () => {
  const route = useRoute<SingleRecipeRouteProp>();
  const { user_id } = route.params; 

  const { grabSelectedUserRecipes, selectedUserRecipes } = useRecipe();
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(true)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)

  useEffect(() => {
    getSelectedUserProfile(user_id)
  }, [])

  const getSelectedUserProfile = async (user_id: string) => {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .ilike('user_id', user_id);
      if (error) {
        console.error('Error fetching data:', error);
      }
      setSelectedProfile(data[0])
      grabSelectedUserRecipes(user_id)
      setLoading(false)
    } catch (err) {
      console.error('An error occurred while checking the username:', err);
    }
  }

  return (
    <View style={tailwind`flex-1`}>
      {
        loading
          ? <View style={tailwind`h-full w-full flex justify-center items-center`}>
              <ActivityIndicator size={'large'} color={'black'}/>
            </View>
          : <>
              <StandardHeader header={'omar'} back={true} more={true} moreClick={() => {}}/>
              <ScrollView style={tailwind`flex-1 bg-white p-4`}>
                <NameAndImageProfile 
                  username={selectedProfile.username} 
                  accountName={selectedProfile.account_name} 
                  profilePicture={selectedProfile.profile_picture}
                />
                <Bio bio={selectedProfile.bio} />
                <Summary 
                  followers={selectedProfile.following} 
                  following={selectedProfile.followers} 
                  recipes={selectedUserRecipes.length} 
                  lists={selectedProfile.lists}
                />
                <View style={tailwind`h-1 w-full bg-stone-200 my-4`}></View>
        
                {/* Recipe Grid */}
                <View style={tailwind`flex flex-wrap flex-row`}>
                  {
                    selectedUserRecipes.map((recipe, index) => (
                      <TouchableOpacity
                        key={index}
                        style={tailwind`w-1/3 p-1`} // 3-column grid
                        onPress={() => navigation.navigate('SingleRecipeScreen', { recipe })}
                      >
                        <Image
                          source={{ uri: recipe.main_image }}
                          style={tailwind`w-full h-32 rounded-lg`}
                        />
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </ScrollView>
            </>
      }
    </View>
  );
};

export default SelectedProfileScreen;
