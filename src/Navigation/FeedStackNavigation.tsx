import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import ProfileSetupScreen from '../Screens/Authentication/ProfileSetupScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import FeedScreen from '../Screens/Feed/FeedScreen';
import CreateRecipeScreen from '../Screens/Recipes/CreateRecipeScreen';

export type AuthStackParamList = {
  FeedScreen: undefined;
  CreateRecipeScreen: undefined;
};

const StackNav = createStackNavigator<AuthStackParamList>();

const FeedStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
        <StackNav.Screen name="FeedScreen" component={FeedScreen} />
        <StackNav.Screen name="CreateRecipeScreen" component={CreateRecipeScreen} />
    </StackNav.Navigator>
  );
};

export default FeedStackNavigation;
