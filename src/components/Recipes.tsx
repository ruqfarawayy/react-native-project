import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Recipes = () => {
  return (
    <View className='mx-4 space-y-3'>
      <Text style={{fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
      <View>
        <Text className='text-neutral-600' style={{ fontSize: hp(1.7) }}>
          What do you want to cook today?
        </Text>
      </View>
    </View>
  )
}

export default Recipes