import CustomText from "@components/global/CustomText"
import Delivery from "@assets/tabicons/delivery.png"
import DeliveryFocused from "@assets/tabicons/delivery_focused.png"
import Dining from "@assets/tabicons/dining.png"
import DiningFocused from "@assets/tabicons/dining_focused.png"
import LiveFocused from "@assets/tabicons/live_focused.png"
import Live from "@assets/tabicons/live.png"
import Reorder from "@assets/tabicons/reorder.png"
import ReorderFocused from "@assets/tabicons/reorder_focused.png"
import { Colors } from "@unistyles/Constants"
import { FC, memo } from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

interface TabProps {
    name: string
}

interface IconProp {
    focused: boolean
}

const styles = {
    width: RFValue(18),
    height: RFValue(18),
}

const tabStyle = {
    justifyContent: 'center',
    alignItems: 'center',
} as ViewStyle

const textStyleInActive: TextStyle = {
    textAlign: 'center',
    marginTop: 4,
    color: Colors.lightText,
    fontSize: RFValue(9.5)
}

const textStyleActive: TextStyle = {
    textAlign: 'center',
    marginTop: 4,
    color: Colors.active,
    fontSize: RFValue(9.5)
}

const TabIcon: FC<TabProps> = memo(({ name }) => {
    return (
        <View style={tabStyle}>
            <Image
                source={
                    name === 'Delivery' ? Delivery
                        :
                        name === 'Dining' ? Dining
                            :
                            name === 'Reorder' ? Reorder : Live
                }
                style={styles}
            />
            <CustomText style={textStyleInActive}>{name}</CustomText>
        </View>
    )
})

const TabIconFocused: FC<TabProps> = memo(({ name }) => {
    const isVegMode = true
    return (
        <View style={tabStyle}>
            <Image
                source={
                    name === 'Delivery' ? DeliveryFocused
                        :
                        name === 'Dining' ? DiningFocused
                            :
                            name === 'Reorder' ? ReorderFocused : LiveFocused
                }
                style={[styles, {
                    tintColor: 
                    name === 'Live' ?
                    undefined :
                    isVegMode 
                    ? Colors.active : Colors.primary
                }]}
            />
            <CustomText style={textStyleActive}>{name}</CustomText>
        </View>
    )
})

export const DeliveryTabIcon:FC <IconProp> = ({ focused }) => {
    return focused ? <TabIconFocused name='Delivery' /> : <TabIcon name="Delivery" />;
}

export const DiningTabIcon:FC <IconProp> = ({ focused }) => {
    return focused ? <TabIconFocused name='Dining' /> : <TabIcon name="Dining" />;
}
export const ReorderyTabIcon:FC <IconProp> = ({ focused }) => {
    return focused ? <TabIconFocused name='Reorder' /> : <TabIcon name="Reorder" />;
}
export const LiveTabIcon:FC <IconProp> = ({ focused }) => {
    return focused ? <TabIconFocused name='Live' /> : <TabIcon name="Live" />;
}