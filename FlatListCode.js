
import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, NetInfo } from "react-native";
import { connect } from 'react-redux';
import NoInternet from './image-no-internet';

class HomeActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connection_Status: "",
            connection_Type: "",
            FlatListItems: [
                { physician: "Skptricks" },
                { physician: "Sumit" },
                { physician: "Amit" },
            ],
            Doctors: [{ physician: "Edward Soumi" }, { physician: "John Soumi" }, { physician: "Matthew Pham" }, { physician: "John Kildare" }]
        };
    }

    render_FlatList_header = () => {
        var header_View = (
            <View style={styles.header_footer_style}>
                <Text style={styles.textStyle}> Physicians</Text>
            </View>
        );
        return header_View;
    };

    showPatients = (item) => {
        const patients = this.props.patients;
        var i;
        var text = "";

        for (i = 0; i < patients.length; i++) {
            if (patients[i].physician === item) {
                text += "Physician: " + patients[i].physician + "\n" +
                    "Patient: " + patients[i].patient + "\n" +
                    "Facility: " + patients[i].facility + "\n" +
                    "Insurer: " + patients[i].insurer + "\n" +
                    "Date: " + patients[i].curdate + "\n" +
                    "Appt Time: " + patients[i].frtime + "\n" +
                    "----------------------\n"
                    ;
            }
        }
        if (text === "") {
            alert(text + item);
        } else
            alert(text);
    }

    render_ok_connection_message = () => {
        return <this.showListOfPatients />;
    };

    render_FlatList_footer = () => {
        var footer_View = (
            <View style={styles.header_footer_style}>
                <Text style={styles.textStyle}>  </Text>
            </View>
        );
        return footer_View;
    };

    FlatListItemSeparator = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
        );
    };

    GetItem(item) {
        this.showPatients(item);
    }

    showListOfPatients = () => {
        const listOfPatients = (
            <View style={styles.container}>
                <FlatList
                    data={this.props.doctors}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) => <Text style={styles.item} onPress={this.GetItem.bind(this, item.physician)} > {item.physician} </Text>}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.render_FlatList_header}
                    ListFooterComponent={this.render_FlatList_footer}
                />
            </View>
        );
        if (this.props.doctors === []) {
            return null;
        } else
            return listOfPatients;
    }

    render() {
        return (
            <this.render_ok_connection_message />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        margin: 10,
        backgroundColor: "#e5e5e5"
    },

    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    item: {
        paddingVertical: 5,
        margin: 0,
        padding: 100,
        fontSize: 20,
        height: 40,
        fontFamily: 'sans-serif-condensed'
    },
    FlatList_Item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },

    header_footer_style: {
        width: '100%',
        height: 44,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 21
    },
    textStyle2: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 21
    },

});

const mapStateToProps = (state) => {
    const message = state.messageValue.message;
    const doctors = state.messageValue.doctors;
    const patients = state.messageValue.patients;
    const customer = state.customerValue;
    console.log("in mapStateToProps message FlatList " + state.messageValue.message);
    console.log("in mapStateToProps doctors FlatList " + state.messageValue.doctors
    );
    return { message, doctors, patients }
};

export default connect(mapStateToProps)(HomeActivity);

    /*
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
    */

/*
  //data={this.props.patients}
//renderItem={({ item }) => <Text style={styles.item} onPress={this.GetItem.bind(this, item.physician)} > {item.physician} </Text>}
//import OfflineNotice from './OfflineNotice';
//import ModalExample from './ModalExample.js';

        render_message = () => {
            var message_View = (
                <View >
                    <Text style={styles.textStyle2}> Connection not ready</Text>
                </View>
            );
            return message_View;
        };

        render_patients = () => {
            var patient_View = (
                <View style={styles.header_footer_style}>
                    <Text style={styles.textStyle}> Connection not ready</Text>
                </View>
            );
            return patient_View;
        };

//alert("test FlatList dispatch " + this.props.doctors[0].physician + ' ' +
//    this.props.doctors[1].physician + ' ' +
//    this.props.doctors[2].physician
//);

//} else {
//    return null;
//return message_View_notok;
//}

//const message_View_notok = (
//    <View >
//        <NoInternet />
//    </View>
//);

//if (this.state.connection_Type === "wifi") {
//    console.log("Connection OK");
//export default DataLoaderAxios;
//console.log("in mapStateToProps FlatList " + state.customerValue.name + " " +
//    state.customerValue.address + " " +
//    state.customerValue.city);

//this.showProps;

data = { this.props.doctors }
data = { this.state.Doctors }
item: {
    paddingVertical: 5,
        margin: 3,
            flexDirection: "row",
                backgroundColor: "#192338",
                    justifyContent: "flex-start",
                        alignItems: "center",
                            zIndex: -1
},


item: {
    padding: 10,
        fontSize: 20,
            height: 45,
},
*/