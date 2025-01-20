import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardVisible = () => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });

        // Cleanup listeners on unmount
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return isKeyboardVisible;
};

export default useKeyboardVisible;
