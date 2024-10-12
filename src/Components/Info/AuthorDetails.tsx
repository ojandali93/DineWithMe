import React from 'react'
import { Text, View } from 'react-native'
import NameAndImageProfile from '../Profile/NameAndImageProfile'
import Bio from '../Profile/Bio'
import tailwind from 'twrnc'

interface UserProfileProps {
  profile: any
}

const AuthorDetails: React.FC<UserProfileProps> = ({profile}) => {
  return (
    <View style={tailwind`mt-4`}>
      <Text style={tailwind`text-2xl font-bold mb-3`}>Author</Text>
      <NameAndImageProfile username={profile.username} accountName={profile.account_name} profilePicture={profile.profile_picture}/>
      <Bio bio={profile.bio} />
    </View>
  )
}

export default AuthorDetails