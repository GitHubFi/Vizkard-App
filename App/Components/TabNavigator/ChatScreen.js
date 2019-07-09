import React, { Component } from "react";

import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import User from "../SignIn/User";
import firebase from "react-native-firebase";
let { height, width } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
class ChatScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props, 'user data for chat')
    this.state = {
      person: {
        name: props.navigation.state.params.name,
        phone: props.navigation.state.params.phoneNumber,
      },
      textMessage: "",
      messageList: [],
      Meraj: props.navigation.state.params.name,
      userName: ""
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: params.name,
      headerStyle: {
        backgroundColor: "#518ef0"
      },
      headerTintColor: "#fff",
      headerLeft: (
        <Ionicons
          name="ios-person"
          size={width / 14}
          color="#fff"
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/groupChat.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/Back.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitleStyle: {
        // textAlign: "center",
        flex: 1,
        marginLeft: 5
      }
    };
  };

  componentDidMount() {

    let meraj = this.props.navigation.state.params.name
    this.setState({
      userName: meraj
    })

    console.log(meraj, "m")


  }
  convertDate = time => {
    var timestamp = time.toString().substring(0, 10)
    const date = new Date(timestamp * 1000)
    datevalues = [
      currentDate = date.getDate(),
      currentMonth = date.getMonth() + 1,
      currentyear = date.getFullYear(),
    ]


    console.log("CURRENT DATE", date)
    return datevalues[0] + "/" + datevalues[1] + "/" + datevalues[2];
  }



  convertTime = time => {
    let d = new Date(time);

    let c = new Date();
    let result = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":";
    result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();



    // if (c.getDay() !== d.getDay()) {
    //     result = d.getDay() + "" + d.getMonth() + "" + result;
    // }
    return result;
  };
  async componentWillMount() {
    let userPhone = await AsyncStorage.getItem('user')
    firebase
      .database()
      .ref("messages")
      .child(userPhone)
      .child(this.state.person.phone)
      .on("child_added", value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()]
          };
        });
      });
  }
  sendMessage = async () => {
    let userPhone = await AsyncStorage.getItem('user')
    if (this.state.textMessage.length > 0) {
      let msgId = firebase
        .database()
        .ref("messages")
        .child(userPhone)
        .child(this.state.person.phone)
        .push().key;
      console.log(msgId)
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: userPhone
      };
      updates[
        `messages/${userPhone}/${this.state.person.phone}/${msgId}`
      ] = message;
      updates[
        `messages/${this.state.person.phone}/${userPhone}/${msgId}`
      ] = message;

      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ textMessage: "" });
    }
  };
  renderRow = ({ item }) => {
    console.log(item, 'user list message')

    return (
      <View
        style={{
          // flexDirection: "row",
          width: "90%",
          alignSelf: item.from === this.props.phoneNumber ? "flex-end" : "flex-start",
          backgroundColor: item.from === this.props.phoneNumber ? "#2967cc" : "#e1e2e3",
          borderRadius: 8,
          marginBottom: 10,
          // borderTopRightRadius: -10,

        }}
      >
        <Text
          style={{
            //color: "#fff",
            color: item.from === this.props.phoneNumber ? "#fff" : "#000",
            padding: 10,
            fontSize: 16,
            // alignItems: "flex-start"
          }}
        >
          {item.message}

        </Text>
        <Text
          style={{
            color: item.from === this.props.phoneNumber ? "#fff" : "#000",
            padding: 5,
            fontSize: 12,
            alignItems: "center",
            justifyContent: 'center',
            alignSelf: 'flex-end',
            textAlign: "center"
          }}
        >
          {this.convertTime(item.time)} {"  "}

          <Text
            style={{
              color: item.from === this.props.phoneNumber ? "#fff" : "#000",
              padding: 5,
              fontSize: 12,
              alignItems: "center",
              justifyContent: 'center',
              alignSelf: 'flex-end',
              textAlign: "center"
            }}
          >
            {this.convertDate(
              item.time
            )}
          </Text>
        </Text>
      </View>
    );
  };
  render() {

    console.log(this.state.messageList, "message list create")


    return (

      // <SafeAreaView>
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
        <FlatList
          style={{ padding: 10, height: height * 0.6 }}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        // inverted
        />
        <View style={{

          padding: 5,
          margin: 0

        }}>


          <KeyboardAvoidingView behavior="padding">
            <View style={{
              flexDirection: 'row',
              backgroundColor: '#eee',
            }}>

              <TextInput
                value={this.state.textMessage}
                onChangeText={textMessage => this.setState({ textMessage })}
                style={{
                  color: "#000",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  fontSize: 18,
                  flex: 1,
                }}
                underlineColorAndroid="transparent"
                placeholder="Type Message..."
                multiline={true}
                numberOfLines={0}
                autoFocus={true}
              />
              <TouchableOpacity onPress={this.sendMessage}>
                <Text
                  style={{
                    alignSelf: 'center',
                    // alignItems: 'flex-end',
                    // justifyContent: 'flex-end',
                    color: 'lightseagreen',
                    fontSize: 16,
                    fontWeight: 'bold',
                    padding: 10,
                  }}
                > <Ionicons
                name="ios-send"
                size={width / 10}
                color="#2892de"
                style={{ marginLeft: 5, marginTop:5 }}
              />
              
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>

    );
  }
}
function mapStateToProps(state) {
  return {
    phoneNumber: state.authReducer.phoneNumber
  }
}
export default connect(mapStateToProps, null)(ChatScreen);