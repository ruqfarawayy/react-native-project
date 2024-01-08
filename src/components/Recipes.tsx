import MasonryList from '@react-native-seoul/masonry-list';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from './Loading';
interface CategoriesData {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

interface RecipesProps {
  categories: CategoriesData[];
  meals: Meal[];
  navigation: any;
}
const Recipes = ({ categories, meals, navigation }: RecipesProps) => {
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" className="mt-10" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item): string => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
};

export default Recipes;

interface RecipeCardProps {
  item: any;
  index: number;
  navigation: any;
}

const RecipeCard = ({ item, index, navigation }: RecipeCardProps) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => navigation.navigate('RecipeDetail', { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: '100%',
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/10"
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
