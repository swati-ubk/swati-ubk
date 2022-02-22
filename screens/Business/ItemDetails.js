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
  } from 'react-native';
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';

  const ItemDetails=()=>{ 

    return(

        <SafeAreaView style={styles.container} >
            <ScrollView>
                <View>
                    <Text style={{marginTop:80, textAlign:'center'}}>Hello Details Page!!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
    },
})

    export default ItemDetails