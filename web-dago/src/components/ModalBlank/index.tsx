import { X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, TouchableOpacity, ViewProps } from 'react-native';

interface ModalProps extends ViewProps {
    onClose?: () => void;
    closeButton?: boolean;
    isOpen?: boolean;
    defaultBg?: string;
    closeClassName?: string;
}

const ModalBlank = ({
    onClose, className = '', children, closeButton,
    isOpen = true, defaultBg = "bg-[#1E1E1E]/70", closeClassName = '', ...props
}: ModalProps) => {
    const [isMounted, setIsMounted] = useState(isOpen);
    const anim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

    useEffect(() => {
        if (isOpen) setIsMounted(true);
        Animated.timing(anim, {
            toValue: isOpen ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start(() => !isOpen && setIsMounted(false)); // Tắt component khi anim chạy xong
    }, [isOpen]);

    if (!isMounted) return null;

    return (
        <Modal transparent visible={isMounted} onRequestClose={onClose} animationType="none">
            <Animated.View className={`flex-1 justify-center items-center ${defaultBg}`} style={{ opacity: anim }}>

                {/* Nền bấm ra ngoài để đóng */}
                <Pressable className="absolute inset-0" onPress={onClose} />

                {/* Nội dung Modal */}
                <Animated.View
                    className={`bg-white w-[90%] max-w-[384px] p-5 rounded-lg ${className}`}
                    style={{
                        elevation: 5, // Đổ bóng cho Android
                        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, // Đổ bóng iOS
                        transform: [{
                            scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) // Dùng nội suy để scale
                        }]
                    }}
                    {...props}
                >
                    {closeButton && (
                        <TouchableOpacity
                            onPress={onClose}
                            className={`absolute z-50 -right-2 -top-2 w-10 h-10 bg-white items-center justify-center rounded-full shadow-sm elevation-3 ${closeClassName}`}
                        >
                            <X size={20} color="#4F4F55" />
                        </TouchableOpacity>
                    )}
                    {children}
                </Animated.View>

            </Animated.View>
        </Modal>
    );
};

export default ModalBlank;