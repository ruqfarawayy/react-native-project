import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { categoryData } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface CategoriesData {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface CategoriesProps {
  activeCategory: string;
  categories: CategoriesData[];
  // setActiveCategory: (category: string) => void;
  handleCategoryChange: (category: string) => void;
}
const Categories = ({
  activeCategory,
  categories,
  handleCategoryChange,
}: CategoriesProps) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((item, index) => {
          let isActive = item.strCategory === activeCategory;
          let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10';

          return (
            <TouchableOpacity
              key={item.idCategory}
              className="flex items-center space-y-1"
              onPress={() => handleCategoryChange(item.strCategory)}
            >
              <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
