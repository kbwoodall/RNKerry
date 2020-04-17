import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions
} from 'react-native';

//import Button from 'MyButton';
import Loader from './Loader.js';

class ActivityIndicatorScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            address: ''
        }
    }

    async search(query) {
        let encodedAddress = encodeURIComponent(query);
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
        try {
            let response = await fetch(url);
            if (response.status > 400) {
                return {};
            } else {
                return await response.json();
            }
        } catch (e) {
            return {};
        }
    }

    async getCoordinates(query) {
        this.setState({
            loading: true
        });

        let coords = await this.search(query);
        console.log('coords', coords)
        setTimeout(() => {
            this.setState({
                loading: false,
                address: coords.results[0].formatted_address
            });
        }, 2500);
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader
                    loading={this.state.loading} />
                <Text
                    style={{ fontSize: 24, paddingBottom: 20, fontWeight: 'bold' }}>Infinity Yoga Brookhaven</Text>
                <Button
                    containerViewStyle={{ width: '100%', marginBottom: 20 }}
                    onPress={() => this.getCoordinates('infinity yoga brookhaven')}
                    title="Get Address"
                    fontWeight="bold"
                    buttonStyle={{ borderRadius: 2 }}
                    backgroundColor='#333333'
                    underlayColor="#cccccc" />
                <Text
                    style={{ fontSize: 18, paddingBottom: 10 }}>{`${this.state.address}`}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CCCCCC',
        height: Dimensions.get('window').height,
        padding: 15,
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        paddingTop: 50
    }
});

export default ActivityIndicatorScreen;