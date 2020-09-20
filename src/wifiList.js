import {
    Modal,
    PermissionsAndroid,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import React, { Component } from 'react';

import wifi from 'react-native-android-wifi';

// type Props = {};
export default class WifiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ssid: null,
            pass: null,
            ssidExist: null,
            currentSSID: null,
            wifiList: null,
            modalVisible: false,
            status: null,
            level: null,
        };

    }

    componentDidMount() {
        //   console.log(wifi);
        this.askForUserPermissions();
    }

    async askForUserPermissions() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Wifi networks',
                    'message': 'We need your permission in order to find wifi networks'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Thank you for your permission! :)");
            } else {
                console.log("You will not able to retrieve wifi available networks list");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    connectOnPress() {
        wifi.findAndConnect(this.state.ssid, this.state.pass, (found) => {
            console.log(this.state.ssid, this.state.pass);
            this.setState({ ssidExist: found });
        });
    }

    getSSIDOnPress() {
        wifi.getSSID((ssid) => {
            this.setState({ currentSSID: ssid });
        });
    }

    getWifiNetworksOnPress() {
        wifi.loadWifiList((wifiStringList) => {
            console.log(wifiStringList);
            var wifiArray = JSON.parse(wifiStringList);
            this.setState({
                wifiList: wifiArray,
                modalVisible: true
            });
        },
            (error) => {
                console.log(error);
            }
        );
    }

    connectionStatusOnPress() {
        wifi.connectionStatus((isConnected) => {
            this.setState({ status: isConnected });
        });
    }

    renderModal() {
        var wifiListComponents = [];
        for (w in this.state.wifiList) {
            wifiListComponents.push(
                <View key={w} style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>{this.state.wifiList[w].SSID}</Text>
                    <Text>BSSID: {this.state.wifiList[w].BSSID}</Text>
                    <Text>Capabilities: {this.state.wifiList[w].capabilities}</Text>
                    <Text>Frequency: {this.state.wifiList[w].frequency}</Text>
                    <Text>Level: {this.state.wifiList[w].level}</Text>
                    <Text>Timestamp: {this.state.wifiList[w].timestamp}</Text>
                </View>
            );
        }
        return wifiListComponents;
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>React Native Android Wifi Example App</Text>
                    
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsTitle}>Sign device into a specific network:</Text>
                        <Text style={styles.instructions}>SSID</Text>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            onChangeText={(event) => this.state.ssid = event}
                            value={this.state.ssid}
                            placeholder={'ssid'} />
                        <Text style={styles.instructions}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(event) => this.state.pass = event}
                            value={this.state.pass}
                            placeholder={'password'} />
                        <View style={styles.row}>
                            <TouchableHighlight style={styles.button} onPress={this.connectOnPress.bind(this)}>
                                <Text style={styles.buttonText}>Connect</Text>
                            </TouchableHighlight>
                            <Text style={styles.answer}>{this.state.ssidExist == null ? "" : this.state.ssidExist ? "Network in range :)" : "Network out of range :("}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsTitle}>Current SSID</Text>
                        <View style={styles.row}>
                            <TouchableHighlight style={styles.button} onPress={this.getSSIDOnPress.bind(this)}>
                                <Text style={styles.buttonText}>Get SSID</Text>
                            </TouchableHighlight>
                            <Text style={styles.answer}>{this.state.currentSSID + ""}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsTitle}>Get all wifi networks in range</Text>
                        <TouchableHighlight style={styles.bigButton} onPress={this.getWifiNetworksOnPress.bind(this)}>
                            <Text style={styles.buttonText}>Available WIFI Networks</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsTitle}>Connection status</Text>
                        <View style={styles.row}>
                            <TouchableHighlight style={styles.bigButton} onPress={this.connectionStatusOnPress.bind(this)}>
                                <Text style={styles.buttonText}>Get connection status</Text>
                            </TouchableHighlight>
                            <Text style={styles.answer}>{this.state.status == null ? "" : this.state.status ? "You're connected :)" : "You're not connected :("}</Text>
                        </View>
                    </View>
                </View>
                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}>
                    <TouchableHighlight style={styles.button} onPress={() => this.setState({ modalVisible: false })}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableHighlight>
                    <ScrollView>
                        {this.renderModal()}
                    </ScrollView>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F5FCFF',
        marginBottom: 100
    },
    row: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
    },
    instructionsContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    instructionsTitle: {
        marginBottom: 10,
        color: '#333333'
    },
    instructions: {
        color: '#333333'
    },
    button: {
        padding: 5,
        width: 120,
        alignItems: 'center',
        backgroundColor: 'blue',
        marginRight: 15,
    },
    bigButton: {
        padding: 5,
        width: 180,
        alignItems: 'center',
        backgroundColor: 'blue',
        marginRight: 15,
    },
    buttonText: {
        color: 'white'
    },
    answer: {
        marginTop: 5,
    }
});