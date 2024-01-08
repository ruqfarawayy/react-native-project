import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

import Animated from 'react-native-reanimated';

// using asycn storage (does not work with android properly: disk space is low)
export const CachedImage = (props: any) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props.source;

  // console.log('uri :', uri); 

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData } as any);
        } else {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
          await AsyncStorage.setItem(uri as string, base64Data as string);
          setCachedSource({ uri: base64Data } as any);
        }
      } catch (error) {
        console.error('Error caching image:', error);
        setCachedSource({ uri } as any);
      }
    };

    getCachedImage();
  }, []);

  return <Animated.Image source={cachedSource} {...props} />;
};

// export const CachedImage = (props: any) => {
//   const { uri } = props;

//   return <Image source={{ uri }} {...props} />;
// };
