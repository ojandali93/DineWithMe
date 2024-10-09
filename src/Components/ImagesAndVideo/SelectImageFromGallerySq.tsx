import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { Camera, Plus, RefreshCw, X } from 'react-native-feather'
import { launchImageLibrary } from 'react-native-image-picker'
import tailwind from 'twrnc'

interface SelectImageProps {
  picture: any,
  updatePicture: (data: any) => void
}

const SelectImageFromGallerySq: React.FC<SelectImageProps> = ({picture, updatePicture}) => {

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', }, (response) => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
      } else if (response.errorCode) {
        console.log('Error picking image: ', response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];

        // Check the video duration
        if (asset.duration && asset.duration > 60) {
          Alert.alert("Video exceeds limit.", "Please select a video that is 60 seconds or less.");
        } else {
          const selectedFile = {
            uri: asset.uri,
            fileType: asset.type
          };
          console.log('Selected media content: ', selectedFile);
          updatePicture(selectedFile)
        }
      }
    });
  }

  return (
    <>
      {
        picture && picture.uri
          ? <View style={tailwind`w-full h-80 bg-stone-300 rounded-2`}>
              <Image style={tailwind`flex-1 rounded-2`} source={{uri: picture.uri}}/>
              <View style={tailwind`absolute z-10 flex-1 top-0 bottom-0 left-0 right-0 p-4 flex flex-row justify-between`}>
                <TouchableOpacity onPress={() => {updatePicture(null)}} style={tailwind`h-10 w-10 bg-stone-400 rounded-full flex justify-center items-center opacity-80`}>
                  <X height={20} width={20} color={'white'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={selectImage} style={tailwind`h-10 w-10 bg-stone-400 rounded-full flex justify-center items-center opacity-80`}>
                  <RefreshCw height={20} width={20} color={'white'}/>
                </TouchableOpacity>
              </View>
            </View>
          : <TouchableOpacity onPress={selectImage} style={tailwind`w-full h-80 bg-stone-300 rounded-2 flex justify-center items-center`}>
              <Camera height={28} width={28} color={'black'}/>
              <Text style={tailwind`mt-3`}>Select Main Image</Text>
            </TouchableOpacity>
      }
    </>
  )
}

export default SelectImageFromGallerySq
