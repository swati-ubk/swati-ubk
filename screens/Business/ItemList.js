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
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  import { Button } from "react-native-paper";
  import  Moment  from "moment";
  import  {useState, useEffect} from 'react';
  import { TabBar, TabView,SceneMap } from 'react-native-tab-view';
  import Toggle from "./components/Toggle";
  
  const List = [
    {
      Product_name: 'Masala',
      id: '#1',
    },
    {
      Product_name: 'Chicken',
      id: '#2',
    },
    {
      Product_name: 'Pulses',
      id: '#3',
    },
    {
      Product_name: 'Special',
      id: '#4',
    },
    {
      Product_name: 'Desserts',
      id: '#5',
    },
    {
      Product_name: 'Cosmetics',
      id: '#6',
    },
    {
      Product_name: 'Masala Powder',
      id: '#7',
    },
    {
      Product_name: 'Flour',
      id: '#8',
    },
    {
      Product_name: 'Others',
      id: '#9',
    },
    {
      Product_name: 'Rice',
      id: '#10',
    },
    
  ]
  
  
    const ItemList=(probs)=>{

      const renderItem =({item}) => {

        return (

           <TouchableOpacity
            onPress={() => probs.navigation.navigate('ItemDetails')}>
                  <View style={styles.cart_detail}>
                      <FontAwesome name='plus'color={globalcolor.PrimaryColor} size={18} style={styles.flatlist_cart}/>
                        <Text style={styles.flatlist_text}>{item.Product_name}</Text>
                          <View>
                             <Toggle/>
                          </View>
                  </View>
          </TouchableOpacity>
       
        )
      }

      const FirstRoute = () => {

        return(
          <View style={styles.box_position}>
          
              <View style={{flexDirection:'row',marginVertical:5}}>
                <View style={styles.btn}>
                  <FontAwesome name='plus'color={globalcolor.PrimaryColor} size={12}  style={styles.icon}/>
                  <Text style={styles.box_font}>New Category</Text></View>
                  <View style={styles.btn}>
                  <FontAwesome name='plus'color={globalcolor.PrimaryColor} size={12} style={styles.icon}/>
                  <Text style={styles.box_font}>New Item</Text></View>
                </View>
               
              {/* Accordion */}
              <ScrollView >
                <View style={styles.flatlist_style}>
                <FlatList
                    data={List}
                    renderItem={renderItem}/>
                </View>
              </ScrollView> 
            
          </View>
        )
      }
      
      
      const SecondRoute = () => {

        return(
          <View>
            <Text style={styles.font}>Dynamic chart posted here!</Text>
          </View>
        )
      }
      
      const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });
      
      const layout = useWindowDimensions();

      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
        { key: 'first', title: 'Availability' },
        { key: 'second', title: 'Editior' },
      ]);
      const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'#FF9626'}
            inactiveColor={'#666'}
              style={{backgroundColor:'white',}}
        />
      );
    
      return (
        <SafeAreaView style={styles.container}>
          
           <View style={styles.search_bar}>
              <View style={styles.search_box}>
                 <TextInput style={styles.order_text}
                      placeholder='Type product name'/> 
                      <View style={styles.icon_position}>
                          <FontAwesome name="search" color={globalcolor.PlaceHolderColor} size={20}  />
                      </View>
              </View> 
          </View>
          <View style={{marginLeft:20,}}>
            <Text style={styles.font}>Item</Text>
          </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
        />
        </SafeAreaView>
      );   
 
  } 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
    },
    content:{
      flex:1
    },
    search_bar:{
        width:'100%',
        flexDirection:'row',
        minHeight:40,
      },
      order_text:{

        marginHorizontal:40,
        fontSize:14,
        color:'#646469',
        fontFamily: globalcolor.Font,

      },
      search_box:{
  
        width:'90%',
        height:'40%',
        elevation:2,
        borderRadius:10,
        marginLeft:10,
        marginTop:20, 
        minHeight:35,
      },
      btn:{
        borderRadius:8,
      
        flexDirection:'row',
        marginRight:8,
        padding:8,
        width:105,
        justifyContent:'center',
        borderColor: '#ff9626',
        borderWidth: 1,
      
        
      },
      cart_detail:{
        
        elevation:1,
        backgroundColor:'#C4C4C4',
        flexDirection:'row',
        width:'95%',
        borderRadius:10,
        padding:10,
        minHeight:20,
        marginVertical:5,
        justifyContent:'space-between'
        
      },
      icon_position:{
        position: 'absolute',
        zIndex: 1,
        marginTop: 5,
        left: 10,
      },
      flatlist_style:{
        flexDirection:'column',marginVertical:10,marginTop:10,width:'100%',height:'100%',minHeight:650,
      },
      font:{
        color:globalcolor.PlaceHolderColor,fontSize:16
      },
      box_font:{
        color:globalcolor.GradientSeconder,textAlign:'center',textTransform:'capitalize',fontWeight:"100",fontSize:12
      },
      icon:{
        marginTop:2,marginRight:2
      },
      box_position:{
        marginTop:10,marginLeft:10
      },
      flatlist_cart:{
        marginTop:2,marginRight:2,paddingHorizontal:10
      },
      flatlist_text:{
        textAlign:'center',color:globalcolor.PlaceHolderColor,fontSize:15
      }

})


 
 

  export default ItemList 