/**
 * @author Pavneet Singh
 */

 import React from "react";
 import {
     StyleSheet,
     SafeAreaView,
     FlatList,
     View,
     Image,
     TouchableOpacity,
     Text
 } from "react-native";
 import {ConfigFile} from '../../service/ConfigFile';
 export default class StoreList extends React.Component {
     constructor(props) {
       console.log(props.data);
         super(props);
         this.state = {
             data: [],
             refreshing: true,
         }
     }
 
     componentDidMount() {
         this.fetchCats();
     }
 
     fetchCats() {
         this.setState({ refreshing: true });
         fetch('http://api.beta.diskounto.com/search/business?category=grocery&lat=25.5940947&lng=85.1375645&formattedAddress=Patna%2C%20Bihar%2C%20India&city=Patna&state=BR&limit=20&skip=')
             .then(res => res.json())
             .then(resJson => {
                 this.setState({ data: resJson });
                 this.setState({ refreshing: false });
             }).catch(e => console.log(e));
     }
 
     renderItemComponent = (data) =>
         <TouchableOpacity style={styles.container}>
             <Image style={styles.image} source={{ uri:ConfigFile.ImageBaseUrl+data.item.photos[0].path }} />
              <Text>{data.item.name}</Text>
         </TouchableOpacity>
         


 
     ItemSeparator = () => <View style={{
         height: 2,
         backgroundColor: "rgba(0,0,0,0.5)",
         marginLeft: 10,
         marginRight: 10,
     }}
     />
 
     handleRefresh = () => {
         this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
     }
 
     render() {
       return (
         <SafeAreaView>
           <FlatList
             data={this.state.data}
             renderItem={item => this.renderItemComponent(item)}
             keyExtractor={item => item.id.toString()}
             ItemSeparatorComponent={this.ItemSeparator}
             refreshing={this.state.refreshing}
             onRefresh={this.handleRefresh}
           />
         </SafeAreaView>)
     }
 }
 
 const styles = StyleSheet.create({
   container: {
     height: 300,
     margin: 10,
     backgroundColor: '#FFF',
     borderRadius: 6,
   },
   image: {
     height: '100%',
     borderRadius: 4,
   },
 });