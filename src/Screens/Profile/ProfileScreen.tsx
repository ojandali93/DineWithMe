import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import { BlurView } from '@react-native-community/blur';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import NameAndImageProfile from '../../Components/Profile/NameAndImageProfile';
import Bio from '../../Components/Profile/Bio';
import Summary from '../../Components/Profile/Summary';

const ProfileScreen = () => {
  const { currentProfile } = useUser();
  const navigation = useNavigation();

  if (!currentProfile) {
    // Show the alert screen when the user is not logged in
    return (
      <View style={tailwind`flex-1 w-full`}>
        {/* Background Image */}
        <StandardHeader header={'omar'}/>
        <View style={tailwind`flex-1 bg-white p-4`}>
          <NameAndImageProfile username={'omar'} accountName={'Omar Jandali | Aspiring Chef'} profilePicture='https://firebasestorage.googleapis.com/v0/b/dwm-reactnative.appspot.com/o/ProfilePictures%2F62A803C5-41E4-4290-B2FC-2AD0927B86C4.jpg?alt=media&token=44cc3c46-b573-4d71-9c9c-81f5ba57c419'/>
          <Bio bio='I am a new and energized chef that wants to show the world what good food looks like and how easy it is create delicious food that is healthy.' />
          <Summary followers={382} following={124} recipes={12} lists={5}/>
          <BlurView
            style={tailwind`absolute w-full top-0 left-0 right-0 bottom-0`}
            blurType="light"
            blurAmount={5}
          />

          {/* Permanent Alert */}
          <View style={tailwind`w-full flex flex-row justify-center mt-12`}>
            <View style={tailwind`w-4/5 bg-white p-5 rounded-lg shadow-lg`}>
              <Text style={tailwind`text-lg font-bold text-center mb-3`}>
                Login Required
              </Text>
              <Text style={tailwind`text-center mb-5`}>
                You need to be logged in to access your profile. Login below.
              </Text>

              {/* Login Button */}
              <TouchableOpacity
                style={tailwind`bg-red-500 p-3 rounded-lg`}
                onPress={() => navigation.navigate('LoginScreen')}
              >
                <Text style={tailwind`text-white text-center text-lg`}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          {/* BlurView */}
      </View>
    );
  }

  // Show profile details if the user is logged in
  return (
    <View style={tailwind`flex-1`}>
      <StandardHeader header={'omar'}/>
      <ScrollView style={tailwind`flex-1 bg-white p-4`}>
        <NameAndImageProfile username={currentProfile.username} accountName={currentProfile.account_name} profilePicture={currentProfile.profile_picture}/>
        <Bio bio={currentProfile.bio} />
        <Summary followers={currentProfile.following} following={currentProfile.followers} recipes={currentProfile.recipes} lists={currentProfile.lists}/>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
