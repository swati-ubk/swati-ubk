import React, {useState, useEffect,Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
 
  //YellowBox
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from '../components/StarRating';
import { globalcolor } from '../style/globalcolor';
import StoreListScreen from './StoreListScreen'
import WebService from '../service/WebService';
import Categories from './components/Categories'
class Cat extends Component {
  
  constructor(props) {  
    
    //constructor to set default state  
    super(props);  
    this.state = {  
        username: '',  
    };  
} 

componentDidUpdate(prevProps, prevState) {
  console.log("==================return kljasjjd prevState======================");
  
   }
 data= [
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
  

  render() {
    const { navigate } = this.props.navigation; 
    //console.log(navigate);
    return (
       
      <View style={styles.container}>
      <TouchableOpacity  onPress={() => {this.props.navigation.navigate('DrahDropMap') }}>
      <View style={styles.serachBar}>
         <View>
             <Image
                   source={require('../assets/img/marker.png')} //Change your icon image here
                   style={styles.ImageStyle}
               />
         </View>
           <View style={{marginTop:10}}>
              <Text style={{color:globalcolor.SeconderColor,fontFamily: globalcolor.Font}}>68/8 kolkata west bengal 27008</Text>
           </View>
         
      </View>
      </TouchableOpacity>
     <ScrollView style={styles.container}>
       {/* <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}
       <View style={styles.container}>
        
        <ScrollView horizontal={true}> 
              {this.data.map((value, index) => (
               <View style={styles.container} key={index}>
                  
                    <View style={styles.item}>
                        <Image 
                        source={{uri:'https://picsum.photos/id/1011/200'}}
                        style={styles.itemPhoto} 
                        />
                  </View>
               
               </View>
                 ))}
            </ScrollView>
       
 
        
        <View style={styles.CategoryContainer}>
           <View style={styles.top}>
               <View style={styles.categoryTitleContainer}>
                 <View style={styles.categoryName}>
                   <Text style={styles.categorytitle}>Categories</Text>
                 </View>
                 <View style={styles.categoryName}>
                 <Text style={styles.showall} 
                    onPress={() => {this.props.navigation.navigate('AllCategories') }}
                 
                 >View all</Text>
                 </View>
               </View>
               <Categories data={this.props}/>
           </View>
           <View style={styles.middle} >
             <View style={styles.categoryTitleContainer}>
                  <View style={styles.categoryName}>
                      <Text style={styles.categorytitle}>Popular Deal</Text>
                  </View>
                  <View style={styles.categoryName}>
                     <Text style={styles.showall}>View all</Text>
                  </View>
              </View>
              <ScrollView horizontal={true}> 
              {this.data.map((value, index) => (
               <View style={styles.container} key={index}>
                  
                    <View style={styles.item}>
                        <Image 
                        source={{uri:value.uri}}
                        style={styles.itemPhoto} 
                        />
                  </View>
               
               </View>
                 ))}
            </ScrollView>
                  
            </View>
            <View style={styles.bottom}>
             <View style={styles.categoryTitleContainer}>
                  <View style={styles.categoryName}>
                      <Text style={styles.categorytitle}>Popular Store</Text>
                  </View>
                  <View style={styles.categoryName}>
                     <Text style={styles.showall}>View all</Text>
                  </View>
              </View>
              <ScrollView horizontal={true}> 
              {this.data.map((value, index) => (
               <View style={styles.container} key={index}>
                  
                    <View style={styles.item}>
                        <Image 
                        source={{uri:value.uri}}
                        style={styles.itemPhoto} 
                        />
                  </View>
               
               </View>
                 ))}
            </ScrollView>

          </View>
 
 
     </View>
 
        
  
       
 
       </View>
     </ScrollView>
     </View>
   );
  }
}

export default Cat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: "space-between",
  //  backgroundColor: "#FFF5EA",
   // padding: 20,
  //  margin: 10,
  },
  sliderContainer: {
    height: 200,
    width: '100%',
   
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryTitleContainer:{
    flexDirection: 'row',
  },

  categoryBtn: {
    flex: 1,
    width: '20%',
    marginHorizontal: 0,
    alignSelf: 'center',
    
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor:globalcolor.Textcolor /* '#FF6347' */,
    borderRadius: 10,
    borderWidth:1,
    borderColor:globalcolor.SeconderColor
   
    
    
  },
  categoryBtnTxt: {
    fontFamily:globalcolor.Font,
    alignSelf: 'center',
    marginTop: 5,
    color: globalcolor.SeconderColor,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: globalcolor.Textcolor,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
 
  serachBar: {
    flexDirection:'row',
    width:'90%',
    height:50,
    marginTop:80,
    marginLeft:20
   
},
ImageStyle: {
    padding: 8,
    margin: 5,
    height: 35,
    width: 35,
    resizeMode: 'stretch',
    alignItems: 'center',
    
},
BannerImg:{
  width:"92%",
  alignSelf: 'center',
  borderRadius:10,
  marginTop:10
},
CategoryContainer: {
  flex: 1,
  justifyContent: "space-between",
  //backgroundColor: "#FFF5EA",
  padding: 8,
  margin: 2,
},
top: {
  flex: 0.3,
  backgroundColor: globalcolor.Textcolor,
  borderWidth: 1,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 25,
  borderColor:globalcolor.Textcolor,
  


},
middle: {
  flex: 0.3,
  backgroundColor: globalcolor.Textcolor,
  borderWidth: 1,
  marginTop:5,
  borderColor:globalcolor.Textcolor,

},
bottom: {
  flex: 0.3,
  backgroundColor: globalcolor.Textcolor,
  borderWidth: 1,
  marginTop:5,
  borderColor:globalcolor.Textcolor,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
},
categoryName:{
  flex:1,
  marginBottom:20,
  borderBottomWidth:3,
  borderColor:globalcolor.BackgroundColor,
  paddingTop:10,
  paddingBottom:10,
  width:'50%'
  
},
categorytitle:{
  textAlign:'left',
  color:globalcolor.SeconderColor,
  fontFamily:globalcolor.Font,
  marginLeft:25,
  fontSize:15
},
showall:{
  textAlign:'right',
  marginRight:25,
  fontSize:15,
  fontFamily:globalcolor.Font,
  color:globalcolor.PrimaryColor

},
/*-----------Horizantail scroll------------------*/
sectionHeader: {
  fontWeight: '800',
  fontSize: 18,
  color: '#f4f4f4',
  //marginTop: 20,
  marginBottom: 0,
},
item: {
  margin: 8,
},
itemPhoto: {
  width: 250,
  height: 110,
  borderRadius:5
},
itemText: {
  color: 'rgba(255, 255, 255, 0.5)',
 // marginTop: 5,
},

});
