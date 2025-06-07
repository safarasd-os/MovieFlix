import { icons } from '@/constants/icons'
import { Image, View, Text } from 'react-native'
const profile = () => {
  return (
    <View className='flex-1 bg-primary px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'><Image className='size-10' tintColor='#Fff' source={icons.person} /><Text className='text-gray-500 text-base'>Profile</Text></View>
    </View>
  )
}
export default profile