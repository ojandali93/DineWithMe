import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Activity, Bookmark, Globe, Grid, List, Menu, Plus, PlusSquare, Search, User } from 'react-native-feather';
import { View } from 'react-native';
import SearchScreen from '../Screens/Search/SearchScreen'

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        }}
      >

        <Tab.Screen
          name="Feed"
          component={SearchScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 30, height: 3, backgroundColor: focused ? 'red' : 'white', marginBottom: 5 }} />
                <Menu stroke={focused ? 'black' : 'gray'} height={22} width={22} />
              </View>
            ),
          }}
        />   

        <Tab.Screen
          name="Recipes"
          component={SearchScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 30, height: 3, backgroundColor: focused ? 'red' : 'white', marginBottom: 5 }} />
                <Search stroke={focused ? 'black' : 'gray'} height={22} width={22} />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={SearchScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 30, height: 3, backgroundColor: focused ? 'red' : 'white', marginBottom: 5 }} />
                <Plus stroke={focused ? 'black' : 'gray'} height={22} width={22} />
              </View>
            ),
          }}
        />     

        <Tab.Screen
          name="Explore"
          component={SearchScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 30, height: 3, backgroundColor: focused ? 'red' : 'white', marginBottom: 5 }} />
                <Globe stroke={focused ? 'black' : 'gray'} height={22} width={22} />
              </View>
            ),
          }}
        />     

        <Tab.Screen
          name="Profile"
          component={SearchScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 30, height: 3, backgroundColor: focused ? 'red' : 'white', marginBottom: 5 }} />
                <User stroke={focused ? 'black' : 'gray'} height={22} width={22} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
