import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Item, Input, Icon } from "native-base";
import firebase from "react-native-firebase";
import Demo from './Demo'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

const arrList = [
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "a"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "b"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "c"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "d"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "e"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "f"
  }
];

export default class SearchFriend extends Component {

  state = {
    users: []
  };
  // addUser = ()=>{
  //   Alert.alert(
  //     'Alert Title',
  //     'My Alert Msg',
  //     [
  //       {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ],
  //     {cancelable: false},
  //   );
  // }

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#0033a0"
      },
      headerTitle: (
        <Item
          rounded
          style={{
            backgroundColor: "#fff",
            width: width / 2,
            height: height / 18
          }}
        >
          <Input placeholder="Search" />
          <Icon active name="search" style={{ color: "#0033a0" }} />
        </Item>
      ),

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
      headerRight: (
        <View style={{ flexDirection: "row" }}>
        
            <Demo/>
            

            {/* <Image
              source={require("../../../assets/addContact.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            
            /> */}
         

          {/* </TouchableOpacity> */}
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



  async componentWillMount() {
    let userPhone = await AsyncStorage.getItem('user')
    let dbRef = firebase.database().ref(`users/${userPhone}/FriendList`);

    dbRef.on("child_added", async val => {

      let person = val.val();
      console.log(person, "all users")
      person.phone = val.key;
      console.log(person.phone, "user phone")

      if (person.phone === userPhone) {

      } else {
        console.log(person, "own user");
        this.setState(prevState => {
          return {
            users: [...prevState.users, person]
          };
        });
      }

    });
  }

  render() {
    return (
      <FlatList
        data={this.state.users}
        renderItem={({ item }) => (
          item ?
            <View
              style={{
                flex: 1,
                backgroundColor: "#0071ce",
                flexDirection: "row",
                height: height / 6,
                marginRight: -width / 8
              }}
            >
              <View style={{ flex: 0.3 }}>
                <Image
                  source={{ uri: "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg" }}
                  // resizeMode="contain"
                  style={{ width: width / 3, height: height / 6 }}
                />
              </View>
              <View style={{ flex: 0.6, paddingLeft: width / 0 }}>
                <View style={{
                  justifyContent: "center",
                  paddingTop: height / 24,
                }}>
                  <Text style={{ color: "#fff", fontSize: width / 20 }}>
                    {" "}
                    {item.name.toUpperCase()}
                  </Text>
                  <Text style={{ color: "#fff" }}> {item.occupation} / {item.company}</Text>
                  <Text style={{ color: "#fff" }}> {item.email} -  {item.phone}</Text>
                </View>
                <View
                  style={{
                    alignSelf: "flex-end",
                    flexDirection: "row",
                    paddingRight: width / 20,
                    //   backgroundColor:'yellow',
                    height: height / 20,
                    marginTop: width / 24
                  }}
                >
                  <TouchableOpacity
                  // onPress={() => navigation.toggleDrawer()}
                  //   marginTop:width/24,
                  // style={{ paddingTop:width/36 , }}
                  >
                    <Image
                      source={require("../../../assets/share1.png")}
                      style={{
                        width: width / 15,
                        height: height / 28,
                        marginLeft: 8, paddingBottom: 10
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                  // onPress={() => navigation.toggleDrawer()}
                  // style={{ marginTop:width/36, }}
                  >
                    <Image
                      source={require("../../../assets/chat1.png")}
                      style={{
                        width: width / 15,
                        height: height / 30,
                        marginLeft: 8,
                        paddingBottom: 5

                      }}
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                  // onPress={() => navigation.toggleDrawer()}
                  // style={{ paddingTop:width/36 }}
                  >
                    <Image
                      source={require("../../../assets/heart.png")}
                      style={{
                        width: width / 15,
                        height: height / 30,
                        marginLeft: 8,
                        paddingBottom: 12
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

            </View>
            : null
        )}
        keyExtractor={item => item.phone}
      />

    );
  }
}
