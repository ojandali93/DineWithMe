import React, { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';
import supabase from '../Utils/supabase';
import { storage } from '../Utils/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';
import { useRecipe } from './RecipeContext';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  currentUser: any; 
  currentProfile: any;
  createUserAccount: (
    username: string, 
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    profilePic: SingleImageProp, 
    bio: string, 
    location: string, 
    experience: string,
    navigation: any
  ) => void,
  creatingProfile: boolean,
  loggingIn: boolean,
  loginUser: (username: string, password: string, navigation: any, screen: string) => void
}

interface SingleImageProp {
  uri: string | undefined;
  fileType: string | undefined;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

  const {grabUserRecipes} = useRecipe()

  const [currentUser, setCurrentUser] = useState<any>(null)
  const [currentProfile, setCurrentProfile] = useState<any>(null)

  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [loadingSelectedProfile, setLoadingSelectedProfile] = useState<boolean>(false)

  const [creatingProfile, setCreatingProfile] = useState<boolean>(false)
  const [loggingIn, setLoggingIn] = useState<boolean>(false)

  // CREATING NEW USER FUNCTIONS
  // - takes in several fields

  const createUserAccount = async (
    username: string, 
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    profilePic: SingleImageProp, 
    bio: string, 
    location: string, 
    experience: string,
    navigation: any
  ) => {
    setCreatingProfile(true)
    try {
      // Sign up the user with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,        
        password: password, 
        options: {
          data: {
            username: username
          }
        }
      });
  
      // Handle any errors from the sign-up process
      if (signUpError) {
        console.error('Error signing up:', signUpError.message);
        return;
      }
      uploadImageToFirebase(username, email, firstName, lastName, profilePic, bio, location, experience, navigation, data.user)

      // Optionally insert the user profile in another table if neede
    } catch (error) {
      console.error('there was an error creating the users account: ', error)
    }
  }

  const uploadImageToFirebase = async (
    username: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    profilePic: SingleImageProp, 
    bio: string, 
    location: string, 
    experience: string,
    navigation: any,
    user: any
  ) => {
    if (!profilePic){
      createUsersProfile(username, email, firstName, lastName, '', bio, location, experience, navigation, user.id)
    }
    try {
      const folderName = 'ProfilePictures'; 
      const response = await fetch(profilePic.uri!);
      const blob = await response.blob(); 
      const fileKey = `${folderName}/${blob.data.name}`;

      const storageRef = ref(storage, fileKey);
      const snapshot = await uploadBytes(storageRef, blob);
  
      const downloadURL = await getDownloadURL(snapshot.ref);

      createUsersProfile(username, email, firstName, lastName, downloadURL, bio, location, experience, navigation, user.id)
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  };

  const createUsersProfile = async (
    username: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    profilePic: string, 
    bio: string, 
    location: string, 
    experience: string,
    navigation: any,
    user: any
  ) => {
    try{
      const { error: profileError } = await supabase
        .from('Profiles')
        .insert([
          {
            user_id: user,  // Make sure this maps to user_id in the DB
            username: username.toLowerCase(),
            email: email,
            bio: bio,
            location: location,
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            account_name: `${firstName} ${lastName}`,
            profile_picture: profilePic,
            public: true,
            notifications: false,
            verified: false,
            launch: false,
            followers: 0,
            following: 0,
            recipes: 0,
            lists: 0,
            experience: experience
          },
        ]);

      // Handle profile insertion errors
      if (profileError) {
        console.error('Error creating profile:', profileError.message);
        return;
      }

      getUserProfile(navigation, username, user)

    } catch (err) {
      console.error('An error occurred while creating an account:', err);
    }
  }

  const getUserProfile = async (navigation: any, username: string, user: any) => {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .ilike('username', username.toLowerCase());
      if (error) {
        console.error('Error fetching data:', error);
      }
      setCurrentProfile(data)
      setCurrentUser(user)
      setCreatingProfile(false)
      Alert.alert(
        'Account Setup',
        'A verification email has been sent. Please check your email to verify your account. Check your spam folder.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'), // Navigate to the next screen
          },
        ]
      );
    } catch (err) {
      console.error('An error occurred while checking the username:', err);
    }
  }

  // USER LOGIN FUNCTIONS
  // - takes in username, password, and navigation

  const loginUser = async (username: string, password: string, navigation: any, screen: string) => {
    setLoggingIn(true)
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq('username', username); // Filter where username matches loginUsername
      if (error) {
        // console.error('Error fetching profile:', error.message);
        Alert.alert('Invaid Username', 'Userame does not match any records')
      } else {
        if(data.length === 0){
          Alert.alert('Invaid Username', 'Userame does not match any records')
        } else {
          loginToAccount(data[0]['email'], username, password, navigation, screen)
        }
      }
    } catch (err) {
      console.error('An error occurred while fetching recipes:', err);
    }
  }

  const loginToAccount = async (email: string, username: string, password: string, navigation: any, screen: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        console.error('Login error:', error.message);
        setLoggingIn(false)
        if(error.message === 'Email not confirmed'){
          Alert.alert('Account Confirmation', 'Please check your email and confirm your account before logging in.');
        } else if (error.message != 'Email not confirmed') {
          Alert.alert('Login Failed', 'Username or password does not match our records.');
        }
      } else {
        getUserProfileLogin(username, navigation, data.user, screen)
      }
    } catch (err) {
      console.error('Error logging in:', err.message);
      setLoggingIn(false)
      Alert.alert('An error occurred', 'Please try again later.');
    }
  };

  const getUserProfileLogin = async (username: string, navigation: any, user: any, screen: string) => {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq('username', username);
      if (error) {
        console.error('Error fetching data:', error);
      }
      setCurrentUser(user)
      setCurrentProfile(data[0])
      console.log(data[0])
      grabUserRecipes(data[0].user_id)
      setLoggingIn(false)
      navigation.navigate(screen)
    } catch (err) {
      console.error('An error occurred while checking the username:', err);
    }
  }
  
  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentProfile,
        createUserAccount,
        creatingProfile,
        loggingIn,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
