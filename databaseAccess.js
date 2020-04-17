import React, { Component } from 'react'
import axios from 'axios';
import { View, Text, FlatList, Image, ActivityIndicator, Alert, Button, StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { connect } from 'react-redux';

function DataLoaderAxios({ message }) {
    console.log("In DataLoaderAxios function")
    return null
}
/*
getDoctors = async () => {
    let res = await axios.get("http://desolate-shelf-9039.herokuapp.com/getphysicians/");
    const doctors = res.data;
    console.log("first doctor in databaseAccess " + doctors[0]);
}
*/

class DataLoaderAxiosExtract extends Component {
    constructor(props) {
        console.log("in DataLoaderAxios props");
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            persons: [],
            doctors: [{ "physician": "John Soumi" }, { "physician": "Matthew Pham" }, { "physician": "Ed Soumi" }]
        };
        console.log("in DataLoaderAxios props again " + this.props.message);
    }

    actionDoctors = (val) => {
        return ({ type: 'UPDATE_DOCTORS', value: val })
    }
    testAlert = () => {
        //this.props.dispatch({ type: 'UPDATE_MESSAGE', value: 'wassup' });
        //this.props.dispatch(this.actionDoctors(this.state.persons));
        this.props.dispatch(this.actionDoctors(this.props.doctors));
        alert("test databaseAccess dispatch " + this.props.doctors);

    }

    displayDoctors = () => {
        console.log("in displayDoctors ");
        for (var i in this.state.doctors) {
            console.log('physician ' + this.state.doctors[i].physician);
            //newresult.push([i, doctors[i]]);

        }
        //console.log(this.state.doctors);
        return ("array index is  " + i);
    }
    /*
    componentDidMount() {
        axios.get("http://desolate-shelf-9039.herokuapp.com/getphysicians/")

            .then(res => {
                const doctors = res.data;
                //this.setState({ persons });
                console.log("first one " + doctors[0]);

                var jd = { "2013-01-21": 1, "2013-01-22": 7 };
                var result = [];
                var newresult = [];

                for (var i in jd) {
                    result.push([i, jd[i]]);
                }
                for (var i in doctors) {
                    console.log('array ' + doctors[i]);
                    newresult.push([i, doctors[i]]);

                }
                this.setState({ result });
                console.log('second ' + result);
                console.log('third ' + this.state.persons);

            })
    }
    */
    render() {
        console.log(this.displayDoctors());
        return null
    }
}

const mapStateToProps = (state) => {
    const message = state.messageValue.message;
    const customer = state.customerValue;
    console.log("in mapStateToProps databaseAccess " + state.messageValue.message);
    console.log("in mapStateToProps databaseAccess " + state.messageValue.doctors[0].key);
    console.log("in mapStateToProps databaseAccess " + state.customerValue.name + " " +
        state.customerValue.address + " " +
        state.customerValue.city);
    return { message }
};
//export default DataLoaderAxios;
export default connect(mapStateToProps)(DataLoaderAxios);

/*


function MyComponent({ propOne }) {
  return <p>{propOne}</p>
}

function mapStateToProps(state) {
  return { propOne: state.propOne };
}

export default connect(mapStateToProps)(MyComponent);

return (
            <Text>
                Testing again
            </Text>
            //<ul>
            //    {this.state.persons.map(person => <li>{person.name}</li>)}
            //</ul>
        )

*/