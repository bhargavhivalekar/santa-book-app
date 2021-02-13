import * as React from "react"
import {View,Text,KeyboardAvoidingView,TextInput,TouchableOpacity,StyleSheet} from "react-native"
import firebase from "firebase"
import db from "../Config"



export default class BookRequestScreen extends React.Component{
    
    constructor(){
        super();
        this.state={
          userId:firebase.auth().currentUser.email,
          bookName:"",
          reasonToRequest:""  
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    addRequest=(bookName,reasonToRequest)=>{
        db.collection("requested_books").add({
            user_Id:this.state.userId,
            book_name:bookName,
            reason_to_request:reasonToRequest,
            request_id:this.createUniqueId()
        })

        this.setState({
            bookName:"",
            reasonToRequest:""
        })

        return alert ("book Request Successfully")
    }
render(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Book Request Screen</Text>
            <KeyboardAvoidingView>
                <TextInput  style={styles.textInput}
                    placeholder={"enter Book Name"}
                    onChangeText={(text)=>{this.setState({bookName:text})}}
                    value={this.state.bookName}
                />
                <TextInput style={styles.textInput}
                    placeholder={"why do you need the book?"}
                    multiline
                    numberOfLines={8}
                    onChangeText={(text)=>{this.setState({reasonToRequest:text})}}
                    value={this.state.reasonToRequest}
                />
                <TouchableOpacity style={styles.textInput}
                    onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                >
                    <Text>REQUEST</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
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
        textInput:{
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"center",
            backgroundColor:"orange",
            marginTop:44,

        },
        title:{
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"center",
            backgroundColor:"orange",
        }

    }  
  )