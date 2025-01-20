import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { router, useGlobalSearchParams, useRouter } from 'expo-router';
import { verifyOtp } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OTPInput } from '@/components/Otp-input';
import images from '@/constants/images';
import icons from '@/constants/icons';
import useKeyboardVisible from '@/hook/use-keyboard-visible';
import { cn } from '@/lib/utils/tw-class';

const OtpVerifyPage = () => {
  const { refetch } = useGlobalContext();
  const params = useGlobalSearchParams();
  const isKeyboardOpen = useKeyboardVisible();

  const [codes, setCodes] = useState<string[] | undefined>(Array(6).fill(''));
  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const [errorMessages, setErrorMessages] = useState<string[]>();
  const router = useRouter();
  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      setErrorMessages(undefined);
      const newCodes = text.split('');
      setCodes(newCodes);
      refs[5]!.current?.focus();
      return;
    }
    setErrorMessages(undefined);
    const newCodes = [...codes!];
    newCodes[index] = text;
    setCodes(newCodes);
    if (text !== '' && index < 5) {
      refs[index + 1]!.current?.focus();
    }
  };
  const handleVerifyOtp = async () => {
    const result = await verifyOtp({
      userId: params.userId,
      otp: codes!.join(''),
    });
    console.log('result', result);
    if (result) {
      refetch({});
      router.push('/');
    }
  };

  return (
    <View className={cn(`h-full relative bg-primary-300`)}>
      <View className="flex-[0.5] justify-end">
        <Image source={images.refeBanner2} className="h-full w-full" />
      </View>
      <View
        className={cn(
          'h-full absolute items-center  rounded-s-3xl px-5 py-2 bg-white',
          isKeyboardOpen ? 'top-0 justify-center' : 'top-1/2 justify-start'
        )}
      >
        <View className={'flex flex-col items-center mb-4 '}>
          <Text className="mb-2 text-center text-xl font-rubik-medium">
            Verify Mobile Number
          </Text>
          <Text className="text-center font-rubik-medium text-lg text-black">
            Enter the 6-digit code we have sent to
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/sign-in');
            }}
          >
            <Text className="text-center mt-1 font-extralight text-xl text-black">
              9566185905 <Image source={icons.edit} className="size-4" />
            </Text>
          </TouchableOpacity>
        </View>
        <OTPInput
          codes={codes!}
          errorMessages={errorMessages}
          onChangeCode={onChangeCode}
          refs={refs}
          config={{
            backgroundColor: '#fffff',
            textColor: '#000000',
            borderColor: 'fffff',
            errorColor: 'fffff',
            focusColor: '#ff4500',
          }}
        />
        <View className="flex items-center">
          <Text className="mt-1">Didn't Received Code?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/sign-in');
            }}
          >
            <Text className="text-primary-300 text-lg">Resend Code</Text>
          </TouchableOpacity>
        </View>
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
    </View>
  );
};
export default OtpVerifyPage;
