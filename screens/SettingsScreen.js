import * as React from "react"
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native"
import db from "../Config"
import firebase from "firebase"


export default class SettingScreen extends React.Component{
    constructor(){
        super();        
        this.state={
            emailId:"",
            firstName:"",
            lastName:"",
            contact:"",
            address:"",
            docId:""
        }
    }

    componentDidMount(){

        this.getUserDetails();
        console.log("user");
    }

    getUserDetails=()=>{
        var email=firebase.auth().currentUser.email;
        console.log(email);
        db.collection("users").where("email_id","==",email).get()
        .then((snapshot)=>{snapshot.forEach((doc)=>{
            var data=doc.data()
            console.log(data);
            this.setState({
                emailId:data.email_id,
                firstName:data.first_name,
                lastName:data.last_name,
                contact:data.contact,
                address:data.address,
                docId:doc.id
            })
        })})
    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            first_name:this.state.firstName ,
            last_name:this.state.lastName ,
            contact:this.state.contact ,
            address:this.state.address ,
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Setting Screen</Text>
                <View>
                    <TextInput style={styles.textBox}
                        placeholder="First Name"
                        maxLength={10}
                        onChangeText={(text)=>{this.setState({firstName:text})}}
                        value={this.state.firstName}
                    />
                    <TextInput style={styles.textBox}
                        placeholder="Last Name"
                        maxLength={10}
                        onChangeText={(text)=>{this.setState({lastName:text})}}
                        value={this.state.lastName}
                    />
                    <TextInput style={styles.textBox}
                        placeholder="Contact"
                        maxLength={10}
                        onChangeText={(text)=>{this.setState({contact:text})}}
                        value={this.state.contact}
                    />
                    <TextInput style={styles.textBox}
                        placeholder="Address"
                        multiLine={true}
                        onChangeText={(text)=>{this.setState({address:text})}}
                        value={this.state.address}
                    />

                    <TouchableOpacity style={styles.button}
                        onPress={()=>{this.updateUserDetails()}}
                    >
                        <Text>Update</Text>
                    </TouchableOpacity>
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
          backgroundColor:"orange",
          elevation:16,
          shadowColor:"gray",
          shadowRadius:10,
          shadowOpacity:0.5,
          shadowOffset:{width:0,height:8}
  
          
        },
        textBox:{
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"center",
            marginTop:44,
            backgroundColor:"orange",
            borderWidth:3,
    
    
          },

    }  
  )
