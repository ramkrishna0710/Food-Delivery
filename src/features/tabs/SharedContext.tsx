import React, { FC, ReactNode, useContext } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface SharedStateContextType {
    scrollY: Animated.SharedValue<number>;
    scrollGlobal: Animated.SharedValue<number>;
    scrollToTop: () => void;
}

export const SharedStateContext = React.createContext<SharedStateContextType | undefined>(undefined);

export const SharedStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const scrollY = useSharedValue(0);
    const scrollGlobal = useSharedValue(0);

    const scrollToTop = (): void => {
        scrollY.value = withTiming(0, { duration: 300 });
        scrollGlobal.value = withTiming(0, { duration: 300 });
    };

    return (
        <SharedStateContext.Provider value={{ scrollToTop, scrollY, scrollGlobal }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => {
    const context = useContext(SharedStateContext);
    if (context === undefined) {
        throw new Error("useSharedState must be used within a SharedStateProvider");
    }
    return context;
};
