import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';

import icons from '@/constants/icons';
import { settings } from '@/constants/data';
import { router } from 'expo-router';
import images from '@/constants/images';

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert('Success', 'Logged out successfully');
      refetch({});
    } else {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <SafeAreaView className="h-full bg-white flex flex-col">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7 pt-10"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Settings</Text>
          <Image source={icons.bell} className="w-5 h-5" />
        </View>

        {/* <View className="flex flex-row justify-center mt-5">
      <View className="flex flex-col items-center relative mt-5">
        <Image
          source={images.avatar}
          className="w-44 h-44 rounded-full"
        />
        <TouchableOpacity className="absolute bottom-11 right-2">
          <Image source={icons.edit} className="w-9 h-9" />
        </TouchableOpacity>

        <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
      </View>
    </View> */}

        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem
              key={index}
              {...item}
            />
          ))}
        </View>
      </ScrollView>

      {/* Adjusted Logout button to avoid tab bar */}
      {/* <TouchableOpacity
        onPress={handleLogout}
        className="py-3 bg-white absolute bottom-16 left-0 w-full"
      >
        <View className="flex flex-row items-center gap-3 px-7">
          <Image source={icons.logout} className="w-6 h-6" />
          <Text className="text-lg font-rubik-medium text-black-300">
            Logout
          </Text>
        </View>
      </TouchableOpacity> */}
      {/* Adjusted Logout button to avoid tab bar */}
      <TouchableOpacity onPress={handleLogout} className="py-3 bg-white absolute bottom-16 left-0 w-full">
        <View className="flex flex-row items-center gap-3 px-7">
          <Image source={icons.logout} className="w-6 h-6" />
          <Text className="text-lg font-rubik-medium text-black-300">Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>


  );
};

export default Profile;
