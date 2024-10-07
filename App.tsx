import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import tailwind from 'twrnc'

function App(): React.JSX.Element {
  return (
    <View style={tailwind`flex-1`}>
      <SafeAreaView style={tailwind`flex-1 bg-slate-800`}>
        <BottomTabNavigation />
      </SafeAreaView>
      <View style={tailwind`h-9 bg-white`} />
    </View>
  );
}

export default App;
