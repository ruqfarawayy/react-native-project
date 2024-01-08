import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubePlayer from 'react-native-youtube-iframe';

interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

interface MealsResponse {
  meals: Meal[];
}

const RecipeDetailScreen = (props: any) => {
  const { idMeal, strMeal, strMealThumb } = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [meals, setMeals] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetails(idMeal);
  }, []);

  const getDetails = async (id: string) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      // console.log('response :', response.data.meals[0]);
      if (response && response.data) {
        setMeals(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log('error :', (error as Error).message);
    }
  };

  const ingredientsIndexes = (meal: Meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}` as keyof Meal]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYoutubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <StatusBar barStyle="light-content" />
      {/* recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: strMealThumb }}
          style={{ width: wp(98), height: hp(50), borderRadius: 30 }}
        />
      </View>
      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-5">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="p-2 rounded-full bg-white ml-3"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          className="p-2 rounded-full bg-white mr-3"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>
      {/* meal description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meals?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {meals?.strArea}
            </Text>
          </View>
          {/* misc */}
          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.4), width: hp(6.4) }}
                className="bg-white flex items-center justify-center rounded-full"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.75) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.4), width: hp(6.4) }}
                className="bg-white flex items-center justify-center rounded-full"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  3
                </Text>
                <Text
                  style={{ fontSize: hp(1.75) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.4), width: hp(6.4) }}
                className="bg-white flex items-center justify-center rounded-full"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.75) }}
                  className="font-bold text-neutral-700"
                >
                  Calories
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.4), width: hp(6.4) }}
                className="bg-white flex items-center justify-center rounded-full"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.75) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>
          {/* ingredients */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold text-neutral-700 flex-1"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meals as Meal).map(index => (
                <View className="flex-row space-x-4">
                  <View
                    style={{ height: hp(1.5), width: hp(1.5) }}
                    className="bg-amber-300 rounded-full mr-2"
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-extrabold text-neutral-700"
                    >
                      {meals && meals[`strIngredient${index}` as keyof Meal]}{' '}
                    </Text>
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-medium text-neutral-400"
                    >
                      {meals && meals[`strMeasure${index}` as keyof Meal]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {/* instructions */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold text-neutral-700 flex-1"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {meals?.strInstructions}
            </Text>
          </View>
          {/* recipe video */}
          {meals?.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700 flex-1"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubePlayer
                  height={hp(30)}
                  videoId={getYoutubeVideoId(meals.strYoutube) || ''}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailScreen;
