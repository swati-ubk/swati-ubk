import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    FlatList,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    useWindowDimensions,
    Switch
  } from 'react-native';
  import  { useState } from 'react';
  import RadioGroup from 'react-native-radio-buttons-group';

  const radioButtonsData = [
    {
      id: '1',
      label: 'Yes',
      value: 'option1',
      color: '#FF9626',
      selected: true,
    },
    {
      id: '2',
      label: 'No',
      value: 'option2',
      color: '#FF9626',
      selected: false,
    },
  ];

  const Radiobutton=()=>{

    const [radioButtons, setRadioButtons] = useState(radioButtonsData);

    const onPressRadioButton = radioButtonsArray => {
        console.log(radioButtonsArray);
        setRadioButtons(radioButtonsArray);
      };
      return(
            <View>
                 <View style={styles.container}>
                      <RadioGroup
                        radioButtons={radioButtons}
                        onPress={onPressRadioButton}
                        layout="row"
                      />
                    </View> 
            </View>
      )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 300,
      height: 150,
    },
  });
  export default Radiobutton