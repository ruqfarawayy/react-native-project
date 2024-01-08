import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';

const Homepage = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const handleCategoryChange = (category: string) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      // console.log('response :', response)
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log('error :', (error as Error).message);
    }
  };

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      // console.log('response :', response)
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log('error :', (error as Error).message);
    }
  };
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require('../../assets/images/avatar.png')}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings & punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text className=" text-neutral-600" style={{ fontSize: hp(1.7) }}>
            Selamat Datang, <Text className="font-semibold">Rizky</Text>
          </Text>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.7) }}
            >
              Make your own foods,
            </Text>
          </View>
          <Text
            className="font-semibold text-neutral-600"
            style={{ fontSize: hp(3.7) }}
          >
            Stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>
        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3 mr-1">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>
        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleCategoryChange={handleCategoryChange}
            />
          )}
        </View>
        {/* recipes */}
        <View>
          <Recipes
            categories={categories}
            meals={meals}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Homepage;
