import { icons } from '@/constants/icons'
import { View, Text, Image } from 'react-native'
const saved = () => {
  return (
    <View className='flex-1 bg-primary px-10'>
          <View className='flex justify-center items-center flex-1 flex-col gap-5'><Image className='size-10' tintColor='#Fff' source={icons.save} /><Text className='text-gray-500 text-base'>Saved</Text></View>
        </View>
  )
}
export default saved