import React from 'react';
import { View, Text, Button, StyleSheet,ScrollView,StatusBar, Image, } from 'react-native';
import {useTheme} from '@react-navigation/native';
const DetailsScreen = ({navigation}) => {
  const theme = useTheme();


const names = ['James', 'Paul', 'John', 'George', 'Ringo'];
const data= [
  {
    key: '1',
    text: 'Item text 1',
    uri: 'https://picsum.photos/id/1011/200',
  },
  {
    key: '2',
    text: 'Item text 2',
    uri: 'https://picsum.photos/id/1012/200',
  },

  {
    key: '3',
    text: 'Item text 3',
    uri: 'https://picsum.photos/id/1013/200',
  },
  {
    key: '4',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1015/200',
  },
  {
    key: '5',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1016/200',
  },
];
    return (
      <View>
        <Text>Details page</Text>
      </View>
      
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    
  },
  imgcss:{
    height:200,
    width:400
  }
});
