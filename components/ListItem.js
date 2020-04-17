/* ListItem */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';

const Listitem = (props) => {
    return (
        <TouchableOpacity>
            <View style={StyleSheet.listItem}>
                <Text> {props.placeName}</Text>
            </View>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#eee'
    }
});

export default ListItem;