import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Alert, NetInfo } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';
import { connect } from 'react-redux';
import NoInternet from './image-no-internet';
import HomeActivity from './FlatListCode.js';

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
            connection_Status: "",
            connection_Type: "",
            address: '',
            persons: []
        }
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });

        NetInfo.getConnectionInfo().then((connectionInfo) => {
            this.setState({ connection_Type: connectionInfo.type });
            console.log(
                'Initial, type: ' +
                //connectionInfo.type +
                this.state.connection_Type +
                ', effectiveType: ' +
                connectionInfo.effectiveType,
            );
        });
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange

        );
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected == true) {
                this.setState({ connection_Status: "Online" })
            }
            else {
                this.setState({ connection_Status: "Offline" })
            }
        });
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );
    }
    _handleConnectivityChange = (isConnected) => {
        if (isConnected == true) {
            this.setState({ connection_Status: "Online" })
        }
        else {
            this.setState({ connection_Status: "Offline" })
        }
    };

    render_ok_connection_message = () => {
        const message_View_ok = (
            <View >
                <Image source={{ uri: 'https://res.cloudinary.com/lcbklf5b3/image/upload/v1561664574/doctors_afcsuu.jpg' }}
                    //source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    //style={{ justifyContent: 'center', width: 200, height: 200, margin: 25 }}
                    style={{
                        //    justifyContent: 'center',
                        //    alignItems: 'center',
                        width: 200, height: 200, marginLeft: 65, marginBottom: 10, marginTop: 10
                    }}
                />

                <Loader
                    loading={this.state.loading} />
                <View>
                    <Button title="Load data"
                        onPress={() => this.getDoctorsPatients()} />
                </View>
                <HomeActivity />

            </View>
        );
        return message_View_ok;
    };

    actionStuff = (val) => {
        return ({ type: 'UPDATE_MESSAGE', value: val })
    }
    actionDoctors = (val) => {
        return ({ type: 'UPDATE_DOCTORS', value: val })
    }
    actionPatients = (val) => {
        return ({ type: 'UPDATE_PATIENTS', value: val })
    }
    getPatients = async () => {
        try {
            let response = await axios.get("http://desolate-shelf-9039.herokuapp.com/getpspatients/");
            //const patients = res2.data;
            //const response = await axios.get("http://desolate-shelf-9039.herokuapp.com/getphysicians/");
            const patients = response.data;
            console.log("Number of patient rows received " + patients.length + " " + response.status);

            //this.props.dispatch(this.actionDoctors(doctors));
            if (response.status > 400) {
                return {};
            } else {
                return patients;
            }
        } catch (error) {
            console.log("GET ERROR " + error);
            return {};
        }
    }
    async getDoctors(query) {
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

    async getDoctorsPatients(query) {
        this.setState({
            loading: true
        });
        let doctorArray = await this.getDoctors(query);
        let patientsArray = await this.getPatients();
        console.log('doctors', doctorArray);
        //console.log('patients', patientsArray);
        this.setState({ loading: false });

        await this.props.dispatch(this.actionDoctors(doctorArray));
        await this.props.dispatch(this.actionPatients(patientsArray));
    }
    render() {
        return (
            <View>
                <this.render_ok_connection_message />
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
    const patients = state.messageValue.patients;
    const customer = state.customerValue;

    console.log("in mapStateToProps message ActivityScreen " + state.messageValue.message);
    console.log("in mapStateToProps customer ActivityScreen " + state.customerValue.name + " " +
        state.customerValue.address + " " +
        state.customerValue.city);

    return { message, doctors, patients }
};

export default connect(mapStateToProps)(ActivityIndicatorScreen);

/*
 //if (this.state.connection_Status === "Online") {
        if (this.state.connection_Type === "wifi") {
            console.log("Connection to wifi is OK ActvityScreen");
            return message_View_ok;
        } else if (this.state.connection_Type === "") {
            //    return null;
            //} else {
            console.log(" Connection type " + this.state.connection_Type);
            console.log("Connection to wifi is not OK ActvityScreen");
            return <NoInternet />
        }
        */
/*
       render_no_connection_message = () => {
           const message_View_bad = (
               <View >
                   <Image source={require('./assets/no-internet2.jpg')}
                       style={{ width: 100, height: 200, margin: 25 }}
                   />
               </View>
           );
           return message_View_bad;
       };
   */
/*
//alert("Internet problem " + error);
//import OfflineNotice from './OfflineNotice';

        showList = () => {
            if (this.state.connection_Type === "wifi") {
                console.log("returning list");
                return this.render_ok_connection_message;
            } else
                return <NoInternet />
        }


        setTimeout(() => {
            this.setState({
                loading: false,
                persons: coords
            });
        }, 2500);


NetInfo.getConnectionInfo().then((connectionInfo) => {
  console.log(
    'Initial, type: ' +
      connectionInfo.type +
      ', effectiveType: ' +
      connectionInfo.effectiveType,
  );
});
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