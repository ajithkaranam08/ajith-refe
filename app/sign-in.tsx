import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { sendOtp } from '@/lib/appwrite';
import { router } from 'expo-router';

const SignIn = () => {
  const [number, setNumber] = useState('');
  const handleSignIn = async () => {
    const result = await sendOtp(`+91${number}`);
    if (result) {
      router.push(`/otp-verify?userId=${result}`);
      console.log('OTP sent successfully');
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-lg font-semibold text-gray-700 mb-4">
        Enter Mobile Number
      </Text>
      <TextInput
        className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 text-gray-900"
        value={number}
        onChangeText={setNumber}
        placeholderTextColor="#9CA3AF" // Tailwind gray-400
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={handleSignIn}
        className=" bg-primary-300 shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
      >
        <View className="flex flex-row items-center justify-center ">
          <Text className="text-lg font-rubik-medium text-white ml-2">
            Send OTP
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
