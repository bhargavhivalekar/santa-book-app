import * as React from "react"
import {View,Text,FlatList,TouchableOpacity,StyleSheet} from "react-native"
import {ListItem} from "react-native-elements"
import db from "../Config"

export default class BookDonateScreen extends React.Component{

    constructor(){
        super();
        this.state={
            requestBookList:[]
        }
        this.requestRef=null
    }

    componentDidMount(){
        this.getRequestedBookList()
    }

    getRequestedBookList=()=>{
        this.requestRef=db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedbooklist=snapshot.docs.map(document=>document.data());
            this.setState({requestBookList:requestedbooklist})
        })
    }

    renderItem=({item,i})=>(
       
      // return(
            <ListItem
                key={i}
                title={item.book_name}
                subtitle={item.reason_to_request}
                titleStyle={{color:"black",fontWeight:"bold"}}
                rightElement={
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate("RecieverDetails",{"details":item})
                        }}
                    >
                        <Text>Donate</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
       //)
    )

    keyExtractor=(item,index)=>index.toString();

    
    render(){
        return(
            <View style={styles.container}>
                <Text>Book Donate Screen</Text>

                <View>
                    {
                        this.state.requestBookList.length===0
                        ?(
                            <View style={styles.container}>
                                <Text style={styles.container}>List Of All Requested Books</Text>
                            </View>
                        )
                        :(
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.requestBookList}
                                renderItem={this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:"blue"
            
  
        },

        button:{
          justifyContent:"center",
          alignItems:"center",
          alignSelf:"center",
          marginTop:44,
          borderRadius:30,
          backgroundColor:"blue",
          elevation:16,
          shadowColor:"gray",
          shadowRadius:10,
          shadowOpacity:0.5,
          shadowOffset:{width:0,height:8}
  
          
        },
        books:{
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"center",
            backgroundColor:"orange"
        }

    }  
  )
