import React, { useRef } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from 'react-native';

const images = [
  'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
  'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
  'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
  'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
  'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
  'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
];

const { width, height } = Dimensions.get('screen');

export default function App() {
  const xScroll = useRef(new Animated.Value(0)).current;

  return (
    <View style={style.container}>
      <Animated.FlatList
        style={style.flatList}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={'fast'}
        keyExtractor={(index) => index}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xScroll } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = ['-360deg', '0deg', '360deg'];

          const translateX = xScroll.interpolate({ inputRange, outputRange });

          return (
            <View style={style.imageContainer}>
              <Animated.Image
                style={[style.image, { transform: [{ rotateZ: translateX }] }]}
                source={{ uri: item }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: { flexGrow: 0 },
  imageContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: 'cover',
  },
});
