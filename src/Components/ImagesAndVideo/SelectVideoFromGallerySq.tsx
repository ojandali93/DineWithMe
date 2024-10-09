import React, { useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { Camera, Pause, Play, Plus, RefreshCw, X, Video as VideoIcon } from 'react-native-feather'
import { launchImageLibrary } from 'react-native-image-picker'
import Video from 'react-native-video'
import tailwind from 'twrnc'

interface SelectImageProps {
  video: any,
  updateVideo: (data: any) => void
}

const SelectVideoFromGallerySq: React.FC<SelectImageProps> = ({video, updateVideo}) => {

  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false)

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'video', }, (response) => {
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
          updateVideo(selectedFile)
        }
      }
    });
  }

  return (
    <View style={tailwind`mt-8`}>
      {
        video && video.uri
          ? <View style={tailwind`w-full h-80 bg-stone-300 rounded-2`}>
              <Video
                source={{ uri: video.uri }} // Ensure video_url exists and is valid
                style={tailwind`flex-1 rounded-2 overflow-hidden`}
                paused={!isVideoPlaying} // Control video play/pause
                resizeMode="cover"
                onError={(error: any) => console.log('Video error:', error)} // Handle error
                repeat={true}
                volume={1.0}
                ignoreSilentSwitch="ignore"
              />
              <View style={tailwind`absolute z-10 flex-1 top-0 bottom-0 left-0 right-0 p-4 flex justify-between`}>
                <View style={tailwind`flex flex-row justify-between`}>
                  <TouchableOpacity onPress={() => {updateVideo(null)}} style={tailwind`h-10 w-10 bg-stone-400 rounded-full flex justify-center items-center opacity-80`}>
                    <X height={20} width={20} color={'white'}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={selectImage} style={tailwind`h-10 w-10 bg-stone-400 rounded-full flex justify-center items-center opacity-80`}>
                    <RefreshCw height={20} width={20} color={'white'}/>
                  </TouchableOpacity>
                </View>
                <View style={tailwind`w-full flex flex-row justify-center`}>
                  {isVideoPlaying 
                    ? <TouchableOpacity onPress={() => {setIsVideoPlaying(!isVideoPlaying)}} style={tailwind`h-18 w-18 bg-stone-600 opacity-70 rounded-full flex justify-center items-center`}>
                        <Pause height={28} width={28} color={'white'}/>
                      </TouchableOpacity> 
                    : <TouchableOpacity onPress={() => {setIsVideoPlaying(!isVideoPlaying)}} style={tailwind`h-18 w-18 bg-stone-600 opacity-70 rounded-full flex justify-center items-center`}>
                        <Play height={28} width={28} color={'white'}/>
                      </TouchableOpacity>}
                </View>
                <View></View>
              </View>
            </View>
          : <TouchableOpacity onPress={selectImage} style={tailwind`w-full h-80 bg-stone-300 rounded-2 flex justify-center items-center`}>
              <VideoIcon height={28} width={28} color={'black'}/>
              <Text style={tailwind`mt-3`}>Select Main Video</Text>
            </TouchableOpacity>
      }
    </View>
  )
}

export default SelectVideoFromGallerySq
