import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import firebase from "react-native-firebase";


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        firebase.database().ref('users').child("employee").set({
            name: "meraj",
            Roll: "10"
        })
        console.log(firebase)
    }
    render() {
        return (
            <View>
                <Text>Dashboard Hello world </Text>
            </View>
        );
    }
}

const styles = StyleSheet.flatten({});