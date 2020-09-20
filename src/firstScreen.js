import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GradientButton from "react-native-gradient-buttons";

export default class FirstScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 24 }}>
                <GradientButton
                    style={{ marginVertical: 8 }}
                    text="Wifi List"
                    textStyle={{ fontSize: 20 }}
                    gradientBegin="#874f00"
                    gradientEnd="#f5ba57"
                    gradientDirection="diagonal"
                    height={60}
                    width={300}
                    radius={15}
                    impact
                    impactStyle='Light'
                    onPressAction={() => this.props.navigation.navigate("WifiList")}
                />
                <GradientButton
                    style={{ marginVertical: 8 }}
                    text="Configure Wifi"
                    textStyle={{ fontSize: 20 }}
                    gradientBegin="#874f00"
                    gradientEnd="#f5ba57"
                    gradientDirection="diagonal"
                    height={60}
                    width={300}
                    radius={15}
                    impact
                    impactStyle='Light'
                    onPressAction={() => this.props.navigation.navigate("ConfigureScreen")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});