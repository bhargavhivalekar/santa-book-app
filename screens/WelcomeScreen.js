import * as React from "react"
import {View,Text,TouchableOpacity,TextInput,StyleSheet,Modal, ScrollView, KeyboardAvoidingView } from "react-native"
import db from "../Config"
import firebase from "firebase"

export default class WelcomeScreen extends React.Component{
  constructor(){
    super();
    this.state={
      emailId:"",
      password:"",
      confirmPassword:"",
      isModalVisible:false,
      firstName:"",
      lastName:"",
      address:"",
      contact:"",


    }
  }

  showModal=()=>{
    return(
      <Modal 
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
                <Text>REGISTRATION</Text>

                <TextInput style={styles.textBox}
                  placeholder="First Name"
                  maxLength={8}
                  onChangeText={(text)=>{
                    this.setState({firstName:text})
                  }}
                />

                <TextInput style={styles.textBox}
                  placeholder="Last Name"
                  maxLength={8}
                  onChangeText={(text)=>{
                    this.setState({lastName:text})
                  }}
                />
                <TextInput style={styles.textBox}
                  placeholder="Address"
                  multiline={true}
                  onChangeText={(text)=>{
                    this.setState({address:text})
                  }}
                />
                <TextInput style={styles.textBox}
                  placeholder="Contact"
                  maxLength={10}
                  keyboardType={"numeric"}
                  onChangeText={(text)=>{
                    this.setState({contact:text})
                  }}
                />
                <TextInput style={styles.textBox}
                  keyboardType="email-address"
                  placeholder="example@booksanta.com"
                    onChangeText={(text)=>{
                      this.setState({emailId:text})
                    }}
                />
                <TextInput style={styles.textBox}
                  secureTextEntry={true}
                  placeholder="password"
                  onChangeText={(text)=>{
                    this.setState({password:text})
                  }}
                />

                <TextInput style={styles.textBox}
                  secureTextEntry={true}
                  placeholder="confirm password"
                  onChangeText={(text)=>{
                    this.setState({confirmPassword:text})
                  }}
                />
                <View>
                  <TouchableOpacity
                    onPress={()=>{
                      this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                    }}
                  >
                    <Text>REGISTER</Text>
                  </TouchableOpacity>
                </View>


                <View>
                  <TouchableOpacity
                    onPress={()=>{
                      this.setState({isModalVisible:false})
                    }}
                  >
                    <Text>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
        </View>
      </Modal>
    );
  }

  userSignUp=(email,password,confirmPassword)=>{
    if(password!==confirmPassword){
      return alert("Password mismatch")
    }
    else{
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((response)=>{

        db.collection("users").add({
          email_id:this.state.emailId,
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.contact,
          address:this.state.address  
        });
        return alert("user Added Succsesfully","",
        [{text:"ok",onPress:()=>{this.setState({isModalVisible:false})}}]
        
        )


      })
      .catch(function(error){
        return alert(error.message)
      })
    }

  }

  userLogin=(email,password)=>{
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
       this.props.navigation.navigate("DonateBooks")
    })
  }


render(){
return(
  <View style={styles.container} >
    
    <View style={styles.profileheader}>

      <View>
        {this.showModal()}
      </View>
      <Text>BOOK SANTA</Text>

      </View>
      <View>
          <TextInput style={styles.textBox}
            keyboardType="email-address"
            placeholder="example@booksanta.com"
              onChangeText={(text)=>{
                this.setState({emailId:text})
              }}
          />
          <TextInput style={styles.textBox}
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(text)=>{
              this.setState({password:text})
            }}
          />
          <TouchableOpacity
          onPress={()=>{
            this.userLogin(this.state.emailId,this.state.password)
          }}
          style={styles.button}> 
            <Text>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=>{
            this.setState({isModalVisible:true})
          }}
          style={styles.button}>
            <Text>SIGN UP</Text>
          </TouchableOpacity>

      </View>
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
      textBox:{
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        marginTop:44,
        backgroundColor:"orange",
        borderWidth:3,


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
       profileheader:{
         flex:1,
         justifyContent:"center",
         alignItems:"center",
         alignItems:"center",
         backgroundColor:"orange",
          marginTop:44

       } 
  }  
)
