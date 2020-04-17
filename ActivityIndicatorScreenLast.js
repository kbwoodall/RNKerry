import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Alert } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';
import { connect } from 'react-redux';

import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    Dimensions
} from 'react-native';

import Loader from './Loader.js';

class ActivityIndicatorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            address: '',
            persons: []
        }
    }
    actionStuff = (val) => {
        return ({ type: 'UPDATE_MESSAGE', value: val })
    }
    actionDoctors = (val) => {
        return ({ type: 'UPDATE_DOCTORS', value: val })
    }
    getDoctors = async () => {
        try {
            const response = await axios.get("http://desolate-shelf-9039.herokuapp.com/getphysicians/");
            const doctors = response.data;
            alert("Number of rows received " + doctors.length);
            this.props.dispatch(this.actionDoctors(doctors));
        } catch (error) {
            alert("Internet problem " + error);
            console.log("GET ERROR " + error);
        }
    }
    async search(query) {
        let encodedAddress = encodeURIComponent(query);
        let url = "http://desolate-shelf-9039.herokuapp.com/getphysicians/";
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
                persons: coords
            });
        }, 2500);
        this.props.dispatch(this.actionDoctors(coords));
    }

    render() {
        return (
            <View>
                <Image source={{ uri: 'https://res.cloudinary.com/lcbklf5b3/image/upload/v1561664574/doctors_afcsuu.jpg' }}
                    //source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 200, height: 200, marginLeft: 50, marginBottom: 10, marginTop: 10, marginRight: 50
                    }} />
                <Loader
                    loading={this.state.loading} />
                <View>
                    <Button title="Load data"
                        onPress={() => this.getCoordinates('infinity yoga brookhaven')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonContainer: {
        flex: 1,
    },

    input: {
        width: 350,
        height: 55,
        backgroundColor: 'gray',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
        textShadowColor: 'black'
    },
    inputx: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    placeInput: {
        width: '100%'
    },
    placeButton: {
        width: '50%'
    },
    listContainer: {
        width: '100%'
    }
})

const mapStateToProps = (state) => {
    const message = state.messageValue.message;
    const doctors = state.messageValue.doctors;
    const customer = state.customerValue;
    console.log("in mapStateToProps bananas_example " + state.messageValue.message);
    console.log("in mapStateToProps bananas_example " + state.customerValue.name + " " +
        state.customerValue.address + " " +
        state.customerValue.city);
    return { message, doctors }
};

export default connect(mapStateToProps)(ActivityIndicatorScreen);

/*
//let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

<View style={styles.container}>
<Text
                    style={{ fontSize: 18, paddingBottom: 10 }}>{`${this.state.persons[0]}`}</Text>

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CCCCCC',
        padding: 10,
        margin: 15,
        height: 40,
        //height: Dimensions.get('window').height,
        //padding: 15,
        //display: 'flex',
        //alignItems: 'flex-start',
        //width: '100%',
        //paddingTop: 50
    }
});

        <Button
                    containerViewStyle={{ width: '100%', marginBottom: 40 }}
                    onPress={() => this.getCoordinates('infinity yoga brookhaven')}
                    title="Get Address"
                    fontWeight="bold"
                    buttonStyle={{ borderRadius: 2 }}
                    backgroundColor='#333333'
                    underlayColor="#cccccc" />
<Text
                    style={{ fontSize: 24, paddingBottom: 20, fontWeight: 'bold' }}>Infinity Yoga Brookhaven</Text>
*/