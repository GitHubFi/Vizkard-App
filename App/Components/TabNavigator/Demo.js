import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
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
import React, { Component } from "react";
const { width, height } = Dimensions.get("window");

const options = [
  'Cancel',

  <Text style={{ color: '#000', fontSize: 18, }}>QR Code</Text>,
  // 'Watermelon',
  <Text style={{ color: '#000', fontSize: 18 }}>Scan Card</Text>
]

export default class Demo extends React.Component {
  showActionSheet = () => {
    this.ActionSheet.show()
  }

  functionQR = () => {
    Alert.alert(
      'QR Code',
      '',
      [
        // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );

  }
  functionScanCard = () => {
    Alert.alert(
      'Scan Business Card',
      '',
      [
        // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );

  }



  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.showActionSheet}
        >

          <Image
            source={require("../../../assets/addContact.png")}
            resizeMode="contain"
            style={{ width: width / 12, marginLeft: 8, marginRight: 10 }}
          />
        </TouchableOpacity>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={<Text style={{ color: '#000', fontSize: 22 }}>Which one do you like?</Text>}
          options={options}
          cancelButtonIndex={0}
          // destructiveButtonIndex={4}
          onPress={(index) => {
            if (index === 1) {
              this.functionQR()

            } else if (index === 2) {
              this.functionScanCard()
            }
            else {
              console.log("nothing to select")
            }
          }





            // index === 1 ? this.functionQR()
            // : null
            // ?
            // index === 2 ? this.functionScanCard() : null
          }
        />
      </View>
    )
  }
}