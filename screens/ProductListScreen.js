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
     TextInput,
     ScrollView
 } from "react-native";
 import {ConfigFile} from '../service/ConfigFile';
 import {globalcolor} from '../style/globalcolor';
 import {globalstyle} from '../style/globals.js';
 import WebService from '../service/WebService';
 import FontAwesome from 'react-native-vector-icons/FontAwesome';
 export default class ProductListScreen extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
          data: [],
          refreshing: false,
          StoreID:this.props.route.params.StoreId,
          CatId:'',
          loading:false,
          offset:0,
          loadmore:false,
          nodata:false,
          cartegorydata:[]
      }
     }
   
     async componentDidMount() {
      this.setState({data:[]}) 
      this.setState({loading:true});
      setTimeout(() => {
        this.fetchCats('didcall');
        }, 1000);
     
  }

  componentDidUpdate(prevProps, prevState) {
  
    let a =prevState.StoreID;
    let b =  this.props.route.params.StoreId;
   if(a!=b)
   {
       this.setState({data:[]}); 
       this.setState({loading:true});
       this.setState({StoreID:this.props.route.params.StoreId})
        setTimeout(() => {
         this.fetchCats('didupdate');
        }, 1000);
   }else{
    
   }
 }
 
  // and don't forget to remove the listener
 
  fetchCats = (callType) => {
     // if ((!this.state.nodata) && (!this.state.refreshing)) {
       // console.log(callType);
       this.setState({loading:true});

       WebService.GetData(`business-details/${this.state.StoreID}/categories`)
       // fetch('http://api.beta.diskounto.com/search/business?category='+this.state.category+'&lat=25.5940947&lng=85.1375645&formattedAddress=Patna%2C%20Bihar%2C%20India&city=Patna&state=BR&limit=20&skip='+this.state.offset)
            .then(CatRes => CatRes.json())
            .then(CaTResJson => {
              if (CaTResJson.length > 0) {
                this.setState({loading:false});
                  if(callType=='pullRefresh')
                    {
                      this.setState({cartegorydata:CaTResJson});
                      this.getproductlist(this.state.StoreID,this.state.CatId);
                    }else{
                      this.setState({cartegorydata:CaTResJson,CatId:CaTResJson[0].id});
                      this.getproductlist(this.state.StoreID,this.state.CatId);
                    }
              }else{
                this.setState({cartegorydata:[]});
              }
            }).catch(e => console.log(e));

        
     
        
           
           //}
     }
     getproductlist =(StoreID,CatId)=>{
      this.setState({refreshing: true});
       this.setState({CatId:CatId});
      WebService.GetData(`business-details/${StoreID}/categories/${CatId}?listProducts=true`)
      .then(res => res.json())
      .then(resJson => {
       
        if (resJson.length > 0) {
         
         // console.log(  )
        this.setState({ data: resJson[0].products});
          
        this.setState({refreshing: false,nodata:true});
        }else{
        // this.setState({category:this.props.route.params.Catvalue})
        
          this.setState({loadmore:false,refreshing: false});
          
        }
      }).catch(e => console.log(e));
     }



     renderItemComponent = (data) => {
      // console.log(data.item.length)
       //if(data.item.length>0){
              let imageUrl='';
              if(data.item.photos.length>0)
              {
                  imageUrl=globalcolor.ImageBaseUrl+data.item.photos[0].path;
              }else{
                  imageUrl='data:image/png;base64,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';   
              }

      return (
        <View style={styles.ProductListrow}>
        <View style={styles.ProductlistFirstItem}>
              <Image
              source={{uri:imageUrl}} //Change your icon image here
              style={[styles.ProductImage]}
              />
        </View>
        <View style={styles.ListBody}>
              <Text style={globalstyle.ProductText}>{data.item.name}</Text>
               
              {data.item.variants.map((value, index) => (
               value.isDefault==true?
                 <Text style={globalstyle.ProductPrice} key={index}>
                   Price ₹
                       <Text style={{fontWeight:"bold",color:'#000000'}}> {value.sellingPrice}</Text>  
                    </Text>
                 :null
            ))}
              <Text style={styles.Productdesc}>{data.item.description.substring(0, 65)} </Text>
              <View style={styles.ProductListrow}>
                  <View style={styles.productQuntity}>
                      <View style={styles.productQuntityItem}>
                          <Text style={styles.QunityText}>1L</Text>
                      </View>
                      <View style={{textAlign:'center',alignSelf:'center',marginLeft:4}}>
                          <FontAwesome name="angle-down"color={globalcolor.borderColor} size={30} />
                      </View>
                  </View>
                  <View style={styles.productAddToCart}>
                      <View style={styles.ProductCartItem}>
                          <Text style={{textAlign:'center',color:globalcolor.PrimaryColor}}>Add</Text>
                      </View>
                      <View style={styles.AddIcon}>
                          <FontAwesome name="plus" color={globalcolor.PrimaryColor} size={20}  />
                      </View>
                  </View>

              </View>
              
        </View>
        
    </View>
        
      );
    };




 
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
    ActivityIndicatorShow()
      {
        return(
          <View >
           {this.state.loading ? (
          <ActivityIndicator 
            size="large"
            color={globalcolor.PrimaryColor}
            style={{marginTop:50,alignItems:'center',justifyContent:'center'}} 
            
            />
        ) : null}
      </View>
        )
      }
     handleRefresh = () => {
         this.setState({ refreshing: false }, () => { this.fetchCats('pullRefresh') }); // call fetchCats after setting the state
     }
     
     render() {
    
     console.log("length==="+this.state.cartegorydata.length);
     if(this.state.cartegorydata.length>1){

     
       return (
        

        <SafeAreaView style={{flex: 1,marginLeft:10,marginRight:10}}>
          <View >
          <View style={[globalstyle.serachBar,globalstyle.BorderSearchbar]}>
            <View>
                <Image
                      source={require('../assets/img/marker.png')} //Change your icon image here
                      style={globalstyle.SearchIcon}
                  />
            </View>
              <TextInput 
                placeholder='Search Product'
                style={globalstyle.SearchBox}
              />
              
          </View>
         <ScrollView horizontal={true} > 
              {this.state.cartegorydata.map((value, index) => (
              
               <View style={styles.container} 
               key={index}>
                  <TouchableOpacity style={styles.ProductListrow}
                onPress={() => {this.getproductlist(this.state.StoreID,value.id) }}
                >
                    <View style={[styles.item, value.id==this.state.CatId?{borderColor:globalcolor.PrimaryColor}:{borderColor:globalcolor.Separator}]}>
                      
                        <Image 
                        source={{uri:globalcolor.ImageBaseUrl+value.photos[0].path}}
                        style={styles.itemPhoto} 
                        />
                         <Text style={{textAlign:"center",fontFamily:globalstyle.Font}}>{value.name.substring(0,10)}</Text>
                       
               
                  </View>
                </TouchableOpacity>
               </View>
              
                 ))}
            </ScrollView>
            <View style={{flexDirection:'row',padding:10,borderTopWidth:1,borderTopColor:globalcolor.BorderColor}}>
                
              <View style={{width:'65%'}}>
                <Text>58555 Products</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row',marginRight:10}}>
                  <Image 
                     source={require('../assets/img/descendant.png')} //Change your icon image here
                     style={globalstyle.FliterIcon}
                    />
                    <Text style={{color:globalcolor.SeconderFontColor,fontFamily:globalcolor.Font}}>Sort</Text>
                </View>
                <View style={{flexDirection:'row',marginRight:10}}>
                  <Image 
                     source={require('../assets/img/filter.png')} //Change your icon image here
                     style={globalstyle.FliterIcon}
                    />
                    <Text style={{color:globalcolor.SeconderFontColor,fontFamily:globalcolor.Font}}>Filter</Text>
                </View>
              </View>
                
              
            </View>
             
            <FlatList
             data={this.state.data}
             keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
             renderItem={item => this.renderItemComponent(item)}
             ListFooterComponent={this.renderFooter}
             refreshing={this.state.refreshing}
             onRefresh={this.handleRefresh}
            // onEndReached={this.fetchCats('endcall')}
             onEndReachedThreshold ={0.5}
             
           

           />
            
           </View>
          
          
         </SafeAreaView>
         )
         }else{
           return(
            <View style={globalstyle.ActivityContainer}>
            {this.ActivityIndicatorShow()}
            <Text style={globalstyle.ActivityIndicator}>Loading please wait....</Text>
  
            </View>
           )
           
         }
     }
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: "space-between",
  //  backgroundColor: "#FFF5EA",
   // padding: 20,
  //  margin: 10,
  },
  item: {
    marginLeft:5,
    marginRight:5,
    borderWidth:1,
    width: 80,
    height: 80,
    borderRadius:10,
    marginBottom:60
  
  },
  itemPhoto: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
   marginVertical:9,
    
   
    
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
   // marginTop: 5,
  },
  ProductlistFirstItem:{
    width:'30%',
  },
  ListBody:{
    marginLeft:10,
    width:'80%'
  },
  ListSecondIcon:{
    width:'15%',
    
  },
  ProductListrow:{
   //marginLeft:20,
   //marginRight:20,
    width:'100%',
    flexDirection:'row',
    marginTop:10,
   // marginBottom:
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
  },
  productQuntity:{
    borderWidth:1,
    flexDirection:'row',
    width:'35%',
    height:30,
    borderColor:globalcolor.borderColor,
    marginLeft:7,
    marginRight:7
  },
  productQuntityItem:{
    marginLeft:2,
    width:'70%',
    height:30,
    justifyContent:'center',
    alignSelf:'center',
    borderEndWidth:1
  },
  
  productAddToCart:{
    borderWidth:1,
    flexDirection:'row',
    width:'35%',
    height:30,
    borderColor:globalcolor.PrimaryColor,
    marginLeft:15,
    

  },
  ProductCartItem:{
    marginLeft:2,
    width:'60%',
    height:30,
    justifyContent:'center',
    alignSelf:'center',
    borderEndWidth:1,
    borderEndColor:globalcolor.PrimaryColor
    },
    AddIcon:{
      textAlign:'center',
      alignSelf:'center',
      marginLeft:10,
      fontFamily:globalcolor.Font
    },
    QunityText:{
      fontFamily:globalcolor.Font
    }

});