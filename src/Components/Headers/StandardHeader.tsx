import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Bell, Bookmark, MoreHorizontal, PlusSquare } from 'react-native-feather'
import tailwind from 'twrnc'

interface StandardHeaderProps {
  header: string,
  add?: boolean,
  addClick?: () => void,
  more?: boolean,
  moreClick?: () => void,
  notifications?: boolean,
  notificationsClick?: () => void,
  favorites?: boolean,
  favoritesClick?: () => void,
}

const StandardHeader: React.FC<StandardHeaderProps> = (
  {
    header, 
    add, 
    addClick, 
    more, 
    moreClick, 
    notifications, 
    notificationsClick, 
    favorites, 
    favoritesClick
  }
) => {
  return (
    <View style={tailwind`w-full h-18 bg-slate-950 rounded-bl-5 rounded-br-5`}>
      <View style={tailwind`h-full flex flex-row items-center justify-between px-5s`}>
        <Text style={tailwind`text-2xl text-white font-semibold`}>{header}</Text>
        <View style={tailwind`flex flex-row items-center`}>
          {
            add
              ? <TouchableOpacity onPress={addClick}>
                  <PlusSquare height={24} width={24} color={'white'}/>
                </TouchableOpacity>
              : null
          }
          {
            more
              ? <TouchableOpacity onPress={moreClick} style={tailwind`ml-4`}>
                  <MoreHorizontal height={24} width={24} color={'white'}/>
                </TouchableOpacity>
              : null
          }
          {
            notifications
              ? <TouchableOpacity onPress={notificationsClick} style={tailwind`ml-4`}>
                  <Bookmark height={24} width={24} color={'white'}/>
                </TouchableOpacity>
              : null
          }
          {
            favorites
              ? <TouchableOpacity onPress={favoritesClick} style={tailwind`ml-4`}>
                  <Bell height={24} width={24} color={'white'}/>
                </TouchableOpacity>
              : null
          }
        </View>
      </View>
    </View>
  )
}

export default StandardHeader
