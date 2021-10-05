import React ,{useState}from 'react';
import { View, Text, Button, StyleSheet, Dimensions,SafeAreaView,ScrollView,Image } from 'react-native';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import WebService from '../service/WebService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

  const images= [
      {
        key: '1',
        text: 'Oil',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        text: 'Masala',
        uri: 'https://picsum.photos/id/1012/200',
      },
    
      {
        key: '3',
        text: 'Rice',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        text: 'Noodel',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        text: 'Daal',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ];

    const WIDTH=  Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
    console.log(HEIGHT);
    console.log(WIDTH);
    const SettingsScreen = () => {
      const [imgActive,SetimgActive]=useState(0);
      
      const  onchange=(nativeEvent)=>{
        console.log(nativeEvent);
        if(nativeEvent)
        {
          console.log("contentOffset X===="+nativeEvent.contentOffset.x);
          console.log("contentOffset Y===="+nativeEvent.layoutMeasurement.width)
          const ratio =nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width;
          const slide=  Math.ceil(ratio);
          if(slide!=imgActive)
          {
            SetimgActive(slide);
          }
          }
        }
 
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrap}>
           <ScrollView
           onScroll={({nativeEvent})=>onchange(nativeEvent)}
           showsHorizontalScrollIndicator={false}
           pagingEnabled
           horizontal
           style={styles.wrap}
           >
           {images.map((value, index) => (
             <Image 
              key={index}
              resizeMode='stretch'
              style={styles.wrap}
              source={{uri:value.uri}}
             
             />
              ))}
           </ScrollView>
           <View style={styles.wrapdot}>
           {images.map((value, index) => (
             <Text
              key={index}
              style={imgActive==index?styles.dotActive:styles.dot}
             >
               ●
             </Text>
              ))}
           </View>
        </View>
        {/* <View style={styles.container}>
          <View style={{flexDirection:'row'}}>
              <View>
                  <Text>All New Fasion</Text>
               </View>
            <View>
              <Button>Shop Now</Button>
            </View>

          </View>



        </View> */}



      </SafeAreaView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop:28
    
  },
  wrap:{
    width:WIDTH,
    height:HEIGHT*0.25
  },
  wrapdot:{
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    alignSelf:'center'
  },
  dotActive:{
    margin:3,
    color:'black',

  },
  dot:{
    margin:3,
    color:'white'
  }
});
