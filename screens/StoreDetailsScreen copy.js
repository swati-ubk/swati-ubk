import React ,{useState,useEffect}from 'react';
import { View, Text, Button, StyleSheet, Dimensions,SafeAreaView,ScrollView,Image,TouchableOpacity } from 'react-native';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import WebService from '../service/WebService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Rating, AirbnbRating } from 'react-native-ratings';

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
        uri: 'https://picsum.photos/rid/1015/200',
      },
      {
        key: '5',
        text: 'Daal',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ];

    const WIDTH=  Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
 //   console.log(HEIGHT);
 //   console.log(WIDTH);
    const StoreDetailsScreen = (props) => {
      console.log('Ok props===========');
      console.log(props.route.params.StoreId);
      const [imgActive,SetimgActive]=useState(0);
      const [dataSource, setDataSource] = useState([]);
      const [dataphotos, setDataphotos] = useState([]);
      const [loading, setLoading] = useState(false);
      useEffect(() => getData(), [props.route.params.StoreId]);
      const  getData = () => {
        setLoading(true);
      //  if (!loading){
        WebService.GetData('business-details/'+props.route.params.StoreId)
        .then((response) => response.json())
            .then((responseJson) => {
             // console.log(responseJson);
              console.log('length='+responseJson.length)
              if (responseJson.length > 0) {
               
                setDataSource(responseJson);
                console.log(responseJson[0].photos)
                setDataphotos(responseJson[0].photos);
                console.log("============Pototto===========");
                console.log(dataphotos);
                setLoading(false);
               
              }
            })
            .catch((error) => {
              console.error(error);
            });
          //}
      }

      const  onchange=(nativeEvent)=>{
        //console.log(nativeEvent);
        if(nativeEvent)
        {
         // console.log("contentOffset X===="+nativeEvent.contentOffset.x);
          //console.log("contentOffset Y===="+nativeEvent.layoutMeasurement.width)
          const ratio =nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width;
          const slide=  Math.ceil(ratio);
          if(slide!=imgActive)
          {
            SetimgActive(slide);
          }
          }
        }
       const ratingCompleted =()=>{
        //console.log("Rating is: " + rating)
        }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
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
              source={{uri:globalcolor.ImageBaseUrl+value.path}}
             
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
        <View style={styles.DocumnetContainer}>
          <View style={{flexDirection:'row'}}>
              <View style={{width:'70%'}}>
                  <Text style={styles.ShopTitle}>{dataSource[0].name}</Text>
                  <Text style={styles.Shopsulg}>{dataSource[0].slug}</Text>
                  <Text style={styles.ShopAddress}>
                  {dataSource[0].address}
                    
                    </Text>
               </View>
            <View style={styles.ShopNowButton}>
                <Text style={styles.ShopNowButtonText}>Shop Now</Text> 
            </View>

          </View>
          <View style={{flexDirection:'row',marginTop:20, width:'100%'}}>
              <View style={{marginLeft:20,width:'11%'}}>
                  <Text style={globalstyle.Ratingbutton}>4.5</Text>
              </View>
              <View style={{marginLeft:10,width:'20%'}}>
                  <Rating
                      type='custom'
                      ratingColor={globalcolor.PrimaryColor}
                      startingValue={4.5}
                      ratingBackgroundColor='#c8c7c8'
                      ratingCount={5}
                      imageSize={15}
                      defaultRating={5}
                      readonly={true}
                      //onFinishRating={this.ratingCompleted}
                      style={{marginLeft:5,marginTop:5 }}
                    />
              </View>
              {/* <View style={styles.ReviewContainer}>
                  <Text style={styles.ReviewText}>Write a Revice</Text>
              </View> */}
          </View>
          <View style={{marginTop:20,borderTopWidth:0.5,borderTopColor:globalcolor.SeconderFontColor}}>
           <Text style={[styles.ShopTitle,{marginTop:20}]}>Shop deatils</Text>
           <Text style={{padding:20,textAlign:'justify'}}>
               {dataSource[0].description}
           </Text>

          </View>
        </View>

        </ScrollView>

      </SafeAreaView>
    );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop:28
    
  },
  DocumnetContainer:{
    marginTop:10,
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
  },
  ShopNowButton:
  {
  width:'25%',
  height:42,
  backgroundColor:globalcolor.PrimaryColor,
  padding:10,
  borderRadius:20
},
ShopNowButtonText:{
  color:'#fff',
  fontFamily:globalcolor.Font,
  fontWeight:'700'

},
ReviewText:{
  color:'#fff',
  fontFamily:globalcolor.Font

},
ShopTitle:{
  marginLeft:20,
  fontFamily:globalcolor.Font,
  fontSize:20,
  fontWeight:'400',
  color:globalcolor.SeconderFontColor
},
Shopsulg:{
  fontSize:16,
  marginTop:5,
  marginLeft:20,
  fontFamily:globalcolor.Font,
  fontWeight:'300',
  color:globalcolor.SeconderFontColor
},
ShopAddress:{
  marginTop:5,
  marginLeft:20,
  fontFamily:globalcolor.Font,
 
  color:globalcolor.SeconderFontColor
},
ReviewContainer:{
  marginLeft:20,
  backgroundColor:globalcolor.PrimaryColor,
  padding:7,
  borderRadius:20
}
});
