import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Text,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
const { width, height, scale, fontScale } = Dimensions.get("window");
import firebase from "react-native-firebase";
import User from "../SignIn/User";
import { connect } from 'react-redux';
const arrList = [
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "a",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "b",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "c",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "d",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "e",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "f",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  }
];
class MessageList extends Component {
  state = {
    users: []
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
      headerStyle: {
        backgroundColor: "#0033a0"
      },
      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require("../../../assets/Setting.png")}
            resizeMode="contain"
            style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
          />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        // textAlign: "center",
        flex: 1,
        marginLeft: 12
      },
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
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/Back.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };
  // componentWillMount() {
  //   let dbRef = firebase.database().ref("users");
  //   // console.log(dbRef);
  //   dbRef.on("child_added", async val => {
  //     // console.log(val);
  //     let person = val.val();
  //     console.log(person, "all users")
  //     person.phone = val.key;
  //     console.log(person.phone, "user phone")
  //     let userPhone = await AsyncStorage.getItem('user')
  //     console.log(userPhone, 'async phone')
  //     if (person.phone === userPhone) {
  //       // User.name = person.name;
  //       // console.log(User.name);
  //     } else {
  //       console.log(person, "own user");
  //       this.setState(prevState => {
  //         return {
  //           users: [...prevState.users, person]
  //         };
  //       });
  //     }
  //     // console.log(person)
  //   });
  // }
  async componentWillMount() {
    let userPhone = await AsyncStorage.getItem('user')
    let dbRef = firebase.database().ref(`users/${userPhone}/FriendList`);
    dbRef.on("child_added", async val => {
        let person = val.val();
        console.log(person, "all users")
        person.phone = val.key;
        console.log(person.phone, "who user number--------------------------------")

        if (person.phone === userPhone) {

        } else {
            console.log(person, "own user");
            this.setState(prevState => {
                return {
                    users: [...prevState.users, person],
                    // phone: [...prevState.phone, person],

                };
            });
            //this.props.GETUSERRequest(this.state.users)
        }

    });
}
  render() {
    console.log(this.state.users);
    return (
      <View style={{
        backgroundColor: "#ffffff",
        flex: 1,
      }}>


        {/* {this.state.usersuserDetail? */}
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => (
            item ?
            <List >
                <ListItem avatar onPress={() =>
                  this.props.navigation.navigate("ChatScreen", item)
                }>
                  <Left>
                    <Thumbnail source={{ uri: 'https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg' }} />
                  </Left>
                  <Body>
                    <Text style={{fontSize: width / 20,}}> {item.name}</Text>
                    <Text note> {item.email}</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              </List>
              : null
          )}
          keyExtractor={item => item.phone}
        />

      </View>





    );
  }
}

function mapStateToProps(state) {
  return {
    userdDetail: state.appReducer.userdDetail
  }
}
function mapDispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)