import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}
class OfflineNotice extends PureComponent {
    render() {
        return <MiniOfflineSign />;
    }
}

const styles = StyleSheet.create({

    offlineContainer: {

        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 55,
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 16,
        fontWeight: '500',
        textShadowColor: 'black'

        //flexDirection: 'row',

        //width,

        //position: 'absolute',

        //top: 30

    },

    offlineText: {
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 55,
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
        textShadowColor: 'black',
        color: 'black',
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    }

});

export default OfflineNotice;