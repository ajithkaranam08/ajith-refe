import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Link, Redirect, router } from 'expo-router';
import { useGlobalContext } from '@/lib/global-provider';
import images from '@/constants/images';
import { StatusBar } from 'expo-status-bar';

const OnBoardingPage = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/" />;
  const handleOnboarding = async () => {
    router.push('/sign-in');
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-10">
            Find Your Nearest{'\n'}
            <Text className="text-primary-300">Talent with Refe</Text>
          </Text>
          <View>
            <TouchableOpacity
              onPress={handleOnboarding}
              className=" bg-primary-300 shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 justify-center items-center"
            >
              <View className="flex flex-row items-center justify-center ">
                <Text className="text-lg font-rubik-medium text-white ml-2">
                  Continue with Mobile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text className=" font-rubik text-center mt-2 text-gray-400">
            Your Talent Need To Hire
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default OnBoardingPage;
