import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { router, useGlobalSearchParams } from 'expo-router';
import { verifyOtp } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';

const OtpVerifyPage = () => {
  const { refetch } = useGlobalContext();
  const [number, setNumber] = React.useState('');
  const params = useGlobalSearchParams();
  console.log('params', params);
  const handleVerifyOtp = async () => {
    const result = await verifyOtp({ userId: params.userId, otp: number });
    console.log('result', result);
    if (result) {
      refetch({});
      router.push('/');
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-lg font-semibold text-gray-700 mb-4">
        Enter OTP
      </Text>
      <TextInput
        className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 text-gray-900"
        value={number}
        onChangeText={setNumber}
        placeholder="Type something..."
        placeholderTextColor="#9CA3AF" // Tailwind gray-400
      />
      <TouchableOpacity
        onPress={handleVerifyOtp}
        className=" bg-primary-300 shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
      >
        <View className="flex flex-row items-center justify-center ">
          <Text className="text-lg font-rubik-medium text-white ml-2">
            Verify OTP
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default OtpVerifyPage;
