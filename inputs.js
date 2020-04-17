import React, { Component } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Inputs extends Component {
    state = {
        email: '',
        password: ''
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    login = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass)
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    onChangeText={this.handleEmail} />

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    onChangeText={this.handlePassword} />

                <TouchableOpacity
                    style={styles.submitButton}

                    onPress={
                        () => this.login(this.state.email, this.state.password)
                    }>

                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Inputs

const styles = StyleSheet.create({
    container: {
        paddingTop: 0
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
    }
})

/*

 onPress={() => this.props.navigation.navigate('Details')
                    }>


onPress={
                        () => this.login(this.state.email, this.state.password)
                    }>

*/