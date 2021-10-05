import React from "react";
 import {
     StyleSheet,
     SafeAreaView,
     FlatList,
     View,
     Image,
     TouchableOpacity,
     Text,
     ActivityIndicator,
     TextInput
 } from "react-native";
 import {ConfigFile} from '../service/ConfigFile';
 import {globalcolor} from '../style/globalcolor';
 import {globalstyle} from '../style/globals.js';
 import WebService from '../service/WebService';
 export default class StoreList extends React.Component {
     constructor(props) {
    
         super(props);
         this.state = {
             data: [],
             refreshing: false,
             category:this.props.route.params.Catvalue,
             loading:false,
             offset:0,
             loadmore:false,
             nodata:false
         }
     }
     async componentDidMount() {
      this.setState({data:[]}) 
     // this.setState({ refreshing: true });
      setTimeout(() => {
        this.fetchCats('didcall');
        }, 1000);
     
  }

  componentDidUpdate(prevProps, prevState) {
  // console.log(prevState);
    let a =prevState.category;
    let b = this.props.route.params.Catvalue;
    
   if(a!=b)
   {
       this.setState({data:[]}) 
     this.setState({category:this.props.route.params.Catvalue,nodata:false})
    // this.setState({ refreshing: true });
     setTimeout(() => {
     this.fetchCats('update_call');
    }, 1000);
   }else{
    
   }
 }
 
  // and don't forget to remove the listener
 
  fetchCats = (callfrom) => {
    console.log(callfrom)
    // console.log(this.state.loadmore);
    // console.log(this.state.refreshing);
     
    


      if ((!this.state.nodata) && (!this.state.refreshing)) {
        
       // console.log('call me -------------')
        this.setState({ refreshing: true });
       //  this.setState({ loading: true });
         WebService.GetData('search/business?category='+this.state.category+'&lat=25.5940947&lng=85.1375645&formattedAddress=Patna%2C%20Bihar%2C%20India&city=Patna&state=BR&limit=20&skip='+this.state.offset)
        // fetch('http://api.beta.diskounto.com/search/business?category='+this.state.category+'&lat=25.5940947&lng=85.1375645&formattedAddress=Patna%2C%20Bihar%2C%20India&city=Patna&state=BR&limit=20&skip='+this.state.offset)
             .then(res => res.json())
             .then(resJson => {
              // console.log(resJson)
               if (resJson.length > 0) {
                this.setState({ data: resJson});
                this.setState({refreshing: false,nodata:true});
               }else{              
                this.setState({loadmore:false,refreshing: false});
               }
             }).catch(e => console.log(e));
           }
     }
 
     renderItemComponent = (data) =>
        <TouchableOpacity style={styles.ProductListrow}
        onPress={() => {this.props.navigation.navigate('StoreDetailsScreen',{StoreId:data.item.id}) }}
        >
        <View style={styles.ProductlistFirstItem}>
              <Image
              source={{uri:ConfigFile.ImageBaseUrl+data.item.photos[0].path}} //Change your icon image here
              style={[styles.ProductImage]}
              />
        </View>
        <View style={styles.ListBody}>
              <Text style={globalstyle.ListPrimaryText}>{data.item.name}</Text>
              <Text style={styles.SlugListText}>{data.item.slug}</Text>
              <Text style={styles.Productdesc}>{data.item.description.substring(0, 65)}</Text>
              
              
        </View>
        <View style={styles.ListSecondIcon}>
           <Text style={globalstyle.Ratingbutton}>{data.item.rating}</Text>
        </View>
    </TouchableOpacity>
         


 
     ItemSeparator = () => 
     
     <View
     style={{
       height: 0.5,
       width: '100%',
       backgroundColor: '#C8C8C8',
     }}
   />
     renderFooter = () => {
      return (
        <View style={styles.footer}>
          {this.state.loading ? (
            <ActivityIndicator 
              size="large"
              color={globalcolor.PrimaryColor}
              style={{margin: 15}} />
          ) : null}
        </View>
      );
    };
     handleRefresh = () => {
         this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
     }
 
     render() {
     // console.log(this.props.route.params.Catvalue);
     
       return (
        <SafeAreaView style={{flex: 1,marginLeft:10,marginRight:10}}>
          <View style={[globalstyle.serachBar,globalstyle.BorderSearchbar]}>
            <View>
                <Image
                      source={require('../assets/img/marker.png')} //Change your icon image here
                      style={globalstyle.SearchIcon}
                  />
            </View>
              <TextInput 
                placeholder='Search store'
                style={globalstyle.SearchBox}
              />
              
          </View>
           
           <FlatList
             data={this.state.data}
             keyExtractor={item => item.id.toString()}
           //  ItemSeparatorComponent={this.ItemSeparator}
             renderItem={item => this.renderItemComponent(item)}
             ListFooterComponent={this.renderFooter}
             refreshing={this.state.refreshing}
             onRefresh={this.handleRefresh}
            // onEndReached={this.fetchCats('endcall')}
             onEndReachedThreshold ={0.5}
           

           />
         </SafeAreaView>
         )
     }
 }
 
 const styles = StyleSheet.create({
  footer: {
  //  padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ProductlistFirstItem:{
  width:'30%'
},
ListBody:{
  marginLeft:10,
  margin:10,
  width:'55%',
  //padding:10
  

},
ListSecondIcon:{
  width:'15%',
  
},
ProductListrow:{
 //marginLeft:20,
 //marginRight:20,
  width:'100%',
  flexDirection:'row',
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 0.2,
  },
  shadowOpacity: 0.18,
  shadowRadius: 0.20,
  backgroundColor:'#ffffff',
  elevation: 5,
  borderRadius:10,
  marginTop:5,
  marginBottom:5,
  
},
ProductImage:{
  height: 100,
  width:  100,
  borderRadius:10
},
SlugListText:{
  fontFamily:globalcolor.Font,
  color:globalcolor.SeconderFontColor,
  marginTop:2,
  fontWeight:'bold'
},
Productdesc:{
  fontFamily:globalcolor.Font,
  color:globalcolor.SeconderFontColor
}

});