import { View, Text, StatusBar, Image } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WelcomeScreen = () => {
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar barStyle="light-content" />
      {/* logo image with rings */}
      <View className="bg-white/20 rounded-full" style={{ padding: hp(5.5) }}>
        <View className="bg-white/50 rounded-full p-8" style={{ padding: hp(5) }}>
          <Image
            source={require('../../assets/images/welcome.png')}
            style={{ width: hp(20), height: hp(20) }}
          />
        </View>
      </View>
      {/* title and puncline */}
      <View className="flex items-center space-y-2">
        <Text className="font-bold text-white tracking-widest" style={{fontSize:hp(7)}}>
          Foodies
        </Text>
        <Text className="text-lg font-medium text-white tracking-widest" style={{fontSize:hp(2)}}>
          Tamu harap lapar!
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
