import React, { Component } from "react";
import { View, Dimensions, Image, Text, ScrollView, TouchableOpacity, Alert, AsyncStorage } from "react-native";
const { width, height } = Dimensions.get("window");
import { Item, Input, Content, Icon, Fab, Button } from "native-base";
import { connect } from "react-redux";
import { friendRequestAction, FriendRequestList } from '../../Store/Actions/AppAction'
import firebase from "react-native-firebase";
class PublicProfileDetail extends Component {
    constructor() {
        super();
        this.state = {
            active: false,
            isFriend: false,
            name: '',
            userId: null,
            status: "",
            AcceptID: "",
            users: [],
            phone: [],
            MobileNumber: ""




        }
    }

    async componentWillUnmount() {
        this.props.navigation.setParams({
            detailUser: null
        })
    }

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
                        phone: [...prevState.phone, person.phoneNumber],

                    };
                });
                this.props.GETUSERRequest(this.state.users)
            }

        });
    }


    // async componentDidMount() {
    //     let userPhone = await AsyncStorage.getItem('user')
    //     let dbRef = firebase.database().ref(`users/${userPhone}/FriendList`);
    //     dbRef.on("child_added", async val => {
    //         let person = val.val();
    //         console.log(person, "all users")
    //         person.phone = val.key;
    //         console.log(person.phone, "who user number--------------------------------")

    //         if (person.phone === userPhone) {

    //         } else {
    //             console.log(person, "own user");
    //             this.setState(prevState => {
    //                 return {
    //                     // users: [...prevState.users, person],
    //                     phone: [...prevState.phone, person],

    //                 };
    //             });
    //             this.props.GETUSERRequest(this.state.users)
    //         }

    //     });

    // }



    async sendFriendRequest(userDetail) {
        let userPhone = await AsyncStorage.getItem('user');

        Alert.alert("Sent Friend Request to", userDetail.name)
        this.setState({
            isFriend: true,
            AcceptID: userDetail.phoneNumber
        });
        if (userDetail.name !== "") {
            this.setState({
                name: userDetail.name,
                userId: userDetail.uid
            })
        }

        const CurrUser = this.props.userID
        const phone = this.props.phoneNumber
        
        this.props.sendFriendRequestAction(userDetail, CurrUser, phone);


       

    }

    // send = () => {

    //    const Name =this.state.name;
    //    const id = this.state.userId;
    //     // if (name !== "") {
    //     //     console.log(" name");

    //     // } else if (userId !== "") {
    //     //     console.log("id");
    //     // }
    //     this.props.sendFriendRequestAction(Name, id);
    // }
    render() {
        let userDetail = this.props.navigation.getParam('detailUser');
        return (
            <ScrollView
                contentContainerStyle={{
                    height: height - 80,

                    width
                }}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 0.4,
                            backgroundColor: "#0033a0",
                            flexDirection: "row"
                        }}
                    >
                        <View
                            style={{
                                flex: 0.5,
                                marginTop: width / 20,
                                marginLeft: width / 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: width / 18,
                                    fontWeight: "bold",
                                    color: "#fff"
                                }}
                            >
                                {/* Hamza Khan */}
                                {userDetail.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: width / 26,
                                    fontWeight: "bold",
                                    color: "#fff"
                                }}
                            >
                                {/* Graphic Designer */}
                                {userDetail.occupation}
                            </Text>
                            <Text
                                style={{
                                    fontSize: width / 26,
                                    fontWeight: "bold",
                                    color: "#fff"
                                }}
                            >
                                OO
                            </Text>
                            <Text
                                style={{
                                    fontSize: width / 20,
                                    fontWeight: "bold",
                                    color: "#fff",
                                    marginTop: width / 20
                                }}
                            >
                                Say hi,to {userDetail.company} {"\n"}
                                add your tag line
                            </Text>




                        </View>

                        <View
                            style={{
                                flex: 0.5,
                                marginRight: 5,
                                marginTop: 10,
                                justifyContent: "space-between"
                            }}
                        >

                            {/* {

                                this.state.users !== null ?

                                    this.state.users.map((data, index) =>

                                        // (data.uid === userDetail.uid && data.name === userDetail.name) ?
                                        (userDetail.phoneNumber === data.phone) ?


                                            <View
                                                style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: width / 20,
                                                        fontWeight: "bold",
                                                        color: "#fff",
                                                        marginTop: width / 20
                                                    }}
                                                >
                                                    {userDetail.name} is your friend
                                                 </Text>

                                            </View>
                                            : null


                                    )
                                    : null
                            } */}




                            {/* {

                                this.state.users.map((data, id) =>
                                    (data.phone === userDetail.phoneNumber) ?
                                        <View
                                            key={id}
                                            style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: width / 20,
                                                    fontWeight: "bold",
                                                    color: "#fff",
                                                    marginTop: width / 20
                                                }}
                                            >
                                                {userDetail.name} is your friend
                                         </Text>

                                        </View>


                                        : null

                                )
                            } */}





                            {/* {

                                this.state.users.map((data) =>
                                    (data.phoneNumber !== userDetail.phoneNumber || data.phoneNumber === userDetail.phoneNumber) ? */}
                            <View

                                style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                            >
                                <TouchableOpacity
                                    // onPress={this.sendFriendRequest.bind(this,userDetail.name,userDetail.uid)}
                                    onPress={this.sendFriendRequest.bind(this, userDetail)}
                                >

                                    <Image
                                        source={require("../../../assets/add-friend.png")}
                                        resizeMode="contain"
                                        style={{ width: width / 4, height: height / 6 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: width / 20,
                                            fontWeight: "bold",
                                            color: "#fff",
                                            // marginTop: width / 20
                                        }}
                                    >
                                        Add Friend
                                            </Text>
                                </TouchableOpacity>

                            </View>











                            {/* {

                                this.state.users !== null ?

                                    this.state.users.map((data, index) =>

                                        (data.uid !== userDetail.uid && data.name !== userDetail.name) ?


                                            <View
                                            key={index}
                                                style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                                            >
                                                <TouchableOpacity
                                                    // onPress={this.sendFriendRequest.bind(this,userDetail.name,userDetail.uid)}
                                                    onPress={this.sendFriendRequest.bind(this, userDetail)}
                                                >

                                                    <Image
                                                        source={require("../../../assets/add-friend.png")}
                                                        resizeMode="contain"
                                                        style={{ width: width / 4, height: height / 6 }}
                                                    />
                                                    <Text>
                                                        add friend {userDetail.name}
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                            :


                                            null





                                    )
                                    : null
                            } */}





                            {/* 
                            <View
                                style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                            >
                                <TouchableOpacity
                                    // onPress={this.sendFriendRequest.bind(this,userDetail.name,userDetail.uid)}
                                    onPress={this.sendFriendRequest.bind(this, userDetail)}
                                >

                                    <Image
                                        source={require("../../../assets/add-friend.png")}
                                        resizeMode="contain"
                                        style={{ width: width / 4, height: height / 6 }}
                                    />
                                </TouchableOpacity>

                            </View> */}














                            {/* <View
                                            style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                                        >

                                            <Image
                                                source={require("../../../assets/chatPic.png")}
                                                resizeMode="contain"
                                                style={{ width: width / 14, height: height / 20 }}
                                            />
                                        </View> */}
                            {/* <View
                                            style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                                        >

                                            <Image
                                                source={require("../../../assets/Call.png")}
                                                resizeMode="contain"
                                                style={{ width: width / 14, height: height / 20 }}
                                            />
                                        </View> */}
                            {/* <View
                                            style={{
                                                flex: 0.2,
                                                flexWrap: "wrap",
                                                alignSelf: "flex-end",
                                                marginBottom: 10
                                            }}
                                        >

                                            <Image
                                                source={require("../../../assets/Favorite.png")}
                                                resizeMode="contain"
                                                style={{ width: width / 14, height: height / 20 }}
                                            />
                                        </View> */}




                            {/* <View
                                            style={{
                                                flex: 0.2,
                                                flexWrap: "wrap",
                                                alignSelf: "flex-end",
                                                // marginBottom: 10 
                                            }}
                                        >
                                            <Fab
                                                active={this.state.active}
                                                direction="left"
                                                containerStyle={{ backgroundColor: '#fff', width: width / 2, height: height / 36 }}
                                                style={{ backgroundColor: '#0071ce', }}
                                                position="bottomRight"
                                                onPress={() => this.setState({ active: !this.state.active })}>
                                                <Icon name="share" />
                                                <Button style={{ backgroundColor: '#34A34F' }}>
                                                    <Icon name="logo-whatsapp" />
                                                </Button>
                                                <Button style={{ backgroundColor: '#3B5998' }}>
                                                    <Icon name="logo-facebook" />
                                                </Button>
                                                <Button disabled style={{ backgroundColor: '#DD5144' }}>
                                                    <Icon name="mail" />
                                                </Button>
                                            </Fab>

                                            <Image
                                                source={require("../../../assets/Favorite.png")}
                                                resizeMode="contain"
                                                style={{ width: width / 14, height: height / 20 }}
                                            />
                                        </View> */}




                        </View>

                    </View>

                    <View style={{ flex: 0.7, flexDirection: "row" }}>
                        <View
                            style={{
                                flex: 0.4,
                                backgroundColor: "#0071ce",
                                textAlign: "center",
                                alignItems: "center"
                            }}
                        >
                            <View style={{ flex: 0.1, marginTop: 10 }}>
                                <Text style={{ color: "#fff" }}>Focus / Skills</Text>
                            </View>
                            <View
                                style={{ flex: 0.3, flexWrap: "wrap", flexDirection: "row" }}
                            >
                                <Text style={{ color: "#fff", marginTop: 5, marginRight: 4 }}>
                                    Add your skills
                                </Text>
                                <Image
                                    source={require("../../../assets/addskill.png")}
                                    resizeMode="contain"
                                    style={{ width: width / 16, height: height / 20 }}
                                />
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ color: "#fff" }}>On the Web</Text>
                                <View
                                    style={{
                                        width: width / 5,
                                        marginTop: 10,
                                        height: height / 20,
                                        flexWrap: "wrap",
                                        backgroundColor: "#fff",
                                        borderRadius: 10
                                    }}
                                >
                                    <Image
                                        source={require("../../../assets/expirence.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: width / 16,
                                            height: height / 20,
                                            borderRadius: 10
                                        }}
                                    />
                                    <Input
                                        style={{
                                            backgroundColor: "#fff",
                                            borderRadius: 10,
                                            fontSize: width / 36
                                        }}
                                        placeholder="Link"
                                    />
                                </View>
                                <View
                                    style={{
                                        width: width / 5,
                                        marginTop: 10,
                                        height: height / 20,
                                        flexWrap: "wrap",
                                        backgroundColor: "#fff",
                                        borderRadius: 10
                                    }}
                                >
                                    <Image
                                        source={require("../../../assets/expirence.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: width / 16,
                                            height: height / 20,
                                            borderRadius: 10
                                        }}
                                    />
                                    <Input
                                        style={{
                                            backgroundColor: "#fff",
                                            borderRadius: 10,
                                            fontSize: width / 36
                                        }}
                                        placeholder="Link"
                                    />
                                </View>
                                <View
                                    style={{
                                        width: width / 5,
                                        marginTop: 10,
                                        height: height / 20,
                                        flexWrap: "wrap",
                                        backgroundColor: "#fff",
                                        borderRadius: 10
                                    }}
                                >
                                    <Image
                                        source={require("../../../assets/expirence.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: width / 16,
                                            height: height / 20,
                                            borderRadius: 10
                                        }}
                                    />
                                    <Input
                                        style={{
                                            backgroundColor: "#fff",
                                            borderRadius: 10,
                                            fontSize: width / 36
                                        }}
                                        placeholder="Link"
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.7, marginLeft: 15 }}>
                            <Text
                                style={{
                                    fontSize: width / 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    color: "#0033a0"
                                }}
                            >
                                Work Expirence
                            </Text>
                            <Text
                                style={{
                                    fontSize: width / 22,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    fontWeight: "bold"
                                }}
                            >
                                JWT - Pakistan
                                {"\n"}
                                Creative Executive
                            </Text>

                            <Text
                                style={{
                                    fontSize: width / 26,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}
                            >
                                Researched on projects - Made Posters, social {"\n"}
                                media posts - Assisted on shoots
                            </Text>
                            <Text>-----------------------------------------------------</Text>
                            <Text
                                style={{
                                    fontSize: width / 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    color: "#0033a0"
                                }}
                            >
                                Add Work Expirence


                            </Text>


                            {/* <View

                                            style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                                        >
                                            <TouchableOpacity
                                                // onPress={this.sendFriendRequest.bind(this,userDetail.name,userDetail.uid)}
                                                onPress={this.sendFriendRequest.bind(this, userDetail)}
                                            >

                                                <Image
                                                    source={require("../../../assets/add-friend.png")}
                                                    resizeMode="contain"
                                                    style={{ width: width / 4, height: height / 6 }}
                                                />
                                         
                                            </TouchableOpacity>

                                        </View> */}
                            {/* {

                                this.state.users.map((data) => 
                                    (data.phone !== userDetail.phoneNumber) ?

                                    <View

                                    style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                                >
                                    <TouchableOpacity
                                        // onPress={this.sendFriendRequest.bind(this,userDetail.name,userDetail.uid)}
                                        onPress={this.sendFriendRequest.bind(this, userDetail)}
                                    >

                                        <Image
                                            source={require("../../../assets/add-friend.png")}
                                            resizeMode="contain"
                                            style={{ width: width / 4, height: height / 6 }}
                                        />

                                    </TouchableOpacity>

                                </View>
                                        :
                                        null

                                       
                                )

                            } */}



                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}



function mapStateToProps(state) {
    console.log(state.authReducer.FriendReqUser, ";;")
    return {
        userID: state.authReducer.userID,
        phoneNumber: state.authReducer.phoneNumber,
        FriendReqUser: state.authReducer.FriendReqUser

    }
}
function mapDispatchToProps(dispatch) {
    return {


        sendFriendRequestAction: (payload, CurrUser, phone) => {
            dispatch(friendRequestAction(payload, CurrUser, phone));
        },
        GETUSERRequest: (payload) => {
            dispatch(FriendRequestList(payload));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileDetail);
