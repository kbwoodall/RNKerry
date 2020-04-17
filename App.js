import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import NoInternet from './image-no-internet';
import {
  NetInfo, StyleSheet, Text, View, Alert, Button, AppRegistry, Image, TextInput
} from 'react-native';
import ImagesExample from './image_example.js'
import HomeActivity from './FlatListCode.js'
import ActivityIndicatorScreen from './ActivityIndicatorScreen.js'
import ListItem from './components/ListItem'
import { TouchableOpacity, TouchableHighlight, TouchableMixin } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import reducer from './messageReducer';
const store = createStore(reducer);
import { connect } from 'react-redux';

class HomeScreen extends React.Component {

  constructor(props) {
    console.log("in HomeScreen");
    super(props);
  }
  state = {
    email: '',
    password: '',
    connection_Status: "",
    connection_Type: ""
  };

  loginStuff = () => {
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
        this.testWifi();
      }
      else {
        this.setState({ connection_Status: "Offline" })
        this.testWifi();
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

  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }
  login = (email, pass) => {
    alert('email: ' + email + ' password: ' + pass)
  }
  testWifi = () => {
    if (this.state.connection_Type === "wifi") {
      console.log("Connection to wifi is OK Apps.js");
      this.props.navigation.navigate('Details');
    } else {
      this.props.navigation.navigate('CheckConnection');
    }
  }

  testAlert = () => {
    if (this.state.password === "hey" & this.state.email === "me") {
      this.loginStuff();
    }
    else alert("try again")
  }
  onPressLogout = () => {

    this.setState({ email: "Email" })
    this.setState({ password: "Password" })
    this.emailRef.setNativeProps({ text: '' })
    this.passwordRef.setNativeProps({ text: '' })
    this.setState({ connection_Type: null });
  }

  render() {
    return (
      <View style={{ backgroundColor: 'tan', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>Home Screen</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            underlineColorAndroid="transparent"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={this.handleEmail}
            ref={element => {
              this.emailRef = element
            }}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="black"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={this.handlePassword}
            ref={element => {
              this.passwordRef = element
            }}
          />
        </View>
        <View style={styles.container}>
          <Button title="Login"
            onPress={this.testAlert}
          />
          <Button title="Logout"
            onPress={this.onPressLogout} />
        </View>
        <ImagesExample />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: 'tan', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', marginTop: 15 }}>Details Screen</Text>
        <ActivityIndicatorScreen />
      </View>
    );
  }
}

class WifiScreen extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: 'tan', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', marginTop: 15 }}>Details Screen</Text>
        <NoInternet />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    CheckConnection: {
      screen: WifiScreen,
    },
    initialRouteName: 'Home'
  }
);

const mapStateToProps = (state) => {
  const message = state.messageValue.message;
  const customer = state.customerValue;
  console.log("in mapStateToProps App.js" + state.messageValue.message);
  console.log("in mapStateToProps App.js" + state.customerValue.name + " " +
    state.customerValue.address + " " +
    state.customerValue.city);
  return { message }
}
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
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

/*
//export default connect(mapStateToProps)(App);
//import DataLoaderAxios from './databaseAccess.js';
//import BananasExample from './bananas_example.js'
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
//import Reducer from './FriendReducer';
import reducer from './FriendReducer';
import AppNavigator from './AppNavigator';

const store = createStore(reducer);
//const store = createStore(messageReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}



    <View>
          <TextInput
           placeholder = "Search Places"
           style = {styles.input}
           value = {this.state.placeName}
           onChangeText = { this.placeNameChangeHandler}
           />

      </View>

    placeSubmitHandler= () => {
    if(this.state.placeName.trim() === '') {
      return;
    }
    this.props.add(this.state.placeName)
  }
  placeNameChangeHandler = (value) => {
    this.setState({
      placeName: value
    })
  }
  placesOutput = () => {
    return (
      <FlatList style = { styles.listContainer}
        data = { this.props.places}
        keyExtractor={(item, index) => index.toString()}
        renderItem = { info => (
          <ListItem
            placeName={ info.item.value}
            />
        )}
      />
    )
  }

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}
const mapDispatchToProps = dispatch => {
  return {
    add: (name => {
      dispatch(addPlace(name))
    })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)


<View style={styles.inputContainer}>
                  <TextInput
                    placeholder = "Search Places"
                    style = {styles.placeInput}
                    value = {this.state.placeName}
                    onChangeText = { this.placeNameChangeHandler}
                  ></TextInput>
                  <Button title ='Add'
                     style = {styles.placeButton}
                     onPress={this.placeSubmitHandler} />
                  <View style={styles.inputContainer}>
                    {this.placesOutput}
                  </View>

                </View>



// in calling function of button
    handledisableenable()
        {
         // set the state for disabling or enabling the button
           if(ifSomeConditionReturnsTrue)
            {
                this.setState({ Isbuttonenable : true })
            }
          else
          {
             this.setState({ Isbuttonenable : false})
          }
        }

<TouchableOpacity onPress ={this.handledisableenable} disabled=
     {this.state.Isbuttonenable}>

    <Text> Button </Text>
</TouchableOpacity>


    <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}

          />


    onChangeText={(text) => this.setState({password: text})}
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
          secureTextEntry={true}
          onChangeText={this.handlePassword} />

    <Text>{'user input: ' + this.state.input}</Text>


    <TouchableOpacity
              style={styles.submitButton}
              onPress={this.testAlert}
          >
            <Text style={styles.submitButtonText}> Login </Text>

          </TouchableOpacity>

          <TouchableOpacity
              style={styles.submitButton}
              onPress={this.onPressLogout}
          >
            <Text style={styles.submitButtonText}> Logout </Text>

          </TouchableOpacity>

<TouchableOpacity
          style={styles.submitButton}
          onPress={this.testAlert}
        >
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.testAlert}
        >
        </TouchableOpacity>

        <Text style={styles.submitButtonText}> Login </Text>

        </TouchableOpacity>





    render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
onPress={() => this.props.navigation.navigate('Home')}

     const RootStack = createStackNavigator(
    {
        Home: {
          screen: HomeScreen,
        },
        Details: {
          screen: DetailsScreen,
        },
    },
      {
        initialRouteName: 'Home',
      }
  );

    () => this.login(this.state.email, this.state.password)

        return (
      <View style={{ backgroundColor: 'tan', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Details Screen</Text>

          <BananasExample />
          <HomeActivity />
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />

        </View>





        const styles = StyleSheet.create({
          bigBlue: {
          color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
      },
  red: {
          color: 'red',
      },
    });


class HomeScreen extends React.Component {
          render() {

        return (
      <View style={{ backgroundColor: 'skyblue', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Home Screen</Text>
          <Inputs />
          <ImagesExample />
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
        );
      }
    }



<BananasExample />

        <Button
          title="Go to Details... again and again"
          onPress={() => this.props.navigation.push('Details')}
        />

        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        */