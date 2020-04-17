import React, { Component } from 'react'
import { View, Text, FlatList, Image, ActivityIndicator, Alert, Button, StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';
import { connect } from 'react-redux';
import DataLoaderAxios from './databaseAccess.js';
//import Spinner from './Spinner.js';
//import Spinner from 'react-native-loading-spinner-overlay';

class BananasExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            visible: false
        };
    }
    /*
    componentDidMount() {
        setInterval(() => {
            this.setState({
                visible: !this.state.visible
            });
        }, 3000);
    }
    */

    testData = [{ physician: "Ed Soumix" }, { physician: "John Soumi" }, { physician: "Matthew Pham" }, { physician: "John Kildare" }];
    testDoctors = (id) => {
        return (id)
    }
    actionStuff = (val) => {
        return ({ type: 'UPDATE_MESSAGE', value: val })
    }
    actionDoctors = (val) => {
        return ({ type: 'UPDATE_DOCTORS', value: val })
    }
    doctorAlert = () => {
        //this.props.dispatch({ type: 'UPDATE_MESSAGE', value: 'wassup' });
        //this.props.dispatch(this.actionDoctors(this.state.persons));
        //this.props.dispatch(this.actionDoctors(this.props.doctors));
        console.log(" in doctorAlert");
        //let doctorsArray = this.getData();
        const returnDoctors = this.getDoctors();
        this.setState({ persons });
        console.log("doctorArray " + this.state.persons);
        this.props.dispatch(this.actionDoctors(this.state.persons));
        /*
        alert("test bananas_example dispatch " + this.props.doctors[0].patient + ' ' +
            this.props.doctors[1].patient + ' ' +
            this.props.doctors[2].patient
        );
        */

    }
    testAlert = () => {
        //this.props.dispatch({ type: 'UPDATE_MESSAGE', value: 'wassup' });
        //this.props.dispatch(this.actionStuff("passing stuff"));
        //alert("test dispatch " + this.props.doctors[0].physician);
        alert("spinner visible " + this.state.loading);
        //if (this.loading.visible) {
        //    return (<Spinner />)
        //}
    }

    getDoctors = async () => {
        try {
            const response = await axios.get("http://desolate-shelf-9039.herokuapp.com/getphysicians/");
            const doctors = response.data;
            //this.props.dispatch(this.actionDoctors(this.doctors));
            //let res2 = await axios.get("http://desolate-shelf-9039.herokuapp.com/getpspatients/");
            //const patients = res2.data;
            //this.props.dispatch(this.actionDoctors(this.testDoctors(this.testData)));

            //this.props.dispatch(this.actionDoctors(this.testDoctors(this.doctors)));

            //alert("in getDoctors " + doctors[0].physician + "-" + "here" +
            //    "-" + doctors[1].physician);

            //alert("in getDoctors " + this.testData[0].physician + "-" + "Response" +
            //    "-" + '-' + doctors[0].physician);

            alert("Number of rows received " + doctors.length);

            this.props.dispatch(this.actionDoctors(doctors));

            //console.log("first patient in bananas_example " + patients);
            //console.log("getDoctors " + doctors);
            //return doctors;
            //alert("test bananas_example dispatch " + this.props.doctors[0].patient + ' ' +
            //    this.props.doctors[1].patient + ' ' +
            //    this.props.doctors[2].patient
            //);
            //return doctors;
        } catch (error) {
            alert("Internet problem " + error);
            console.log("GET ERROR " + error);
            //return null
        }
    }
    /*
    getData = () => {
        //this.getDoctors();
        console.log("In bananas_example getData function")
        return this.getDoctors();
    }
    */


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

                <View>
                    <Button title="Load data" onPress={this.testAlert} >
                    </Button>
                </View>


            </View>
        );
    }
}

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

export default connect(mapStateToProps)(BananasExample);

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

<View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} />
                </View>
<Button title="Load data" onPress={this.doctorAlert} >

                <View>
                    <DataLoaderAxios />
                </View>

 <View>
                    <Text>More Testing  {this.props.message}</Text>
                </View>

 <Button title="Testing dispatch"
                    onPress={this.testAlert}
                />

    const BananasExample = () => (
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
            style={{ width: 200, height: 200, margin: 25 }}
        />

    )

    function DataLoaderAxios() {
        const [users, setUsers] = useState([]);
        axios.get("http://localhost:4000/api/more/")
            .then((res) => {
                const persons = res.data;
                setUsers(persons);
            })
            .catch((err) => {
                alert(err);
            })
        return (
            <div id="IntableID">
                <body><BootstrapTable data={users}
                    striped bordered hover variant="dark"
                >
                    <TableHeaderColumn isKey dataField='id'>
                        ID
    </TableHeaderColumn >
                    <TableHeaderColumn dataField='name'>
                        Name
    </TableHeaderColumn >
                    <TableHeaderColumn dataField='tournament'>
                        Tournament
    </TableHeaderColumn >
                </BootstrapTable></body>

            </div >
        )
    }
    */
/*
    render() {
        return (
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                style={{ width: 200, height: 200, margin: 25 }}
            />
        );
    }
*/
/* ---
    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {

                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
 */




