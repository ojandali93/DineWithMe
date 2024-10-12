import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Pause, Play } from 'react-native-feather'
import Video from 'react-native-video'
import tailwind from 'twrnc'

interface DispayImageProps {
  video: string
}

const DisplayVideoRecipe: React.FC<DispayImageProps> = ({video}) => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false)

  return (
    <View style={tailwind`w-full h-80 rounded-3 my-4`}>
      <Video
        source={{ uri: video }}
        paused={!isPlaying}
        style={tailwind`w-full h-80 rounded-3 rounded-lg`}
        resizeMode="cover"
        onLoadStart={() => setLoadingVideo(true)}
        onLoad={() => setLoadingVideo(false)}
        onError={(e) => console.log('Video error:', e)}
      />
      <TouchableOpacity
        onPress={() => {setIsPlaying(!isPlaying)}}
        style={tailwind`absolute w-full h-full flex justify-center items-center`}
      >
        {isPlaying 
          ? (
            <View style={tailwind`h-16 w-16 bg-slate-600 rounded-full flex justify-center items-center`}>
              <Pause height={30} width={30} color={'white'} />
            </View>
        ) : (
          <View style={tailwind`h-16 w-16 bg-slate-600 rounded-full flex justify-center items-center`}>
            <Play height={30} width={30} color={'white'} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default DisplayVideoRecipe
