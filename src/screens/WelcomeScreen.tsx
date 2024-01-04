import { View, Text, StatusBar, Image } from 'react-native';
import React, { useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const WelcomeScreen = ({ navigation }: any) => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100,
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300,
    );
    setTimeout(() => navigation.navigate('Homepage'), 2500);
  }, []);
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar barStyle="light-content" />
      {/* logo image with rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/50 rounded-full"
          style={{ padding: ring1padding }}
        >
          <Image
            source={require('../../assets/images/welcome.png')}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>
      {/* title and puncline */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(7) }}
        >
          101 Resep
        </Text>
        <Text
          className="text-lg font-medium text-white tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Temukan jutaan resep andalan
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
