import * as React from "react"
import {View} from "react-native"
import db from "../Config"

export default class RecieverDetailscreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam("details")["user_Id"],
            requestId:this.props.navigation.getParam("details")["request_id"],
            bookName:this.props.navigation.getParam("details")["book_name"],
            reasonToRequest:this.props.navigation.getParam("details")["reason_to_request"],
            recieverName:"",
            recieverContact:"",
            recieveraddress:"",
            recieverRequestDocId:""

        }
    }

    getRecieverDetails(){
        db.collection("users").where("email_id","==",this.state.recieverId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    recieverName:doc.data().first_name,
                    recieverContact:doc.data().contact,
                    recieveraddress:doc.data().address,

                })
            })
        })

        db.collection("requested_books").where("request_id","==",this.state.requestId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    recieverRequestDocId:doc.id()
                })
            })
        })
        
    }

    componentDidMount(){
        this.getRecieverDetails();
    }

render(){
    return(
        <View>
            <Text>Reciever Screen</Text>
        </View>
    )
}
}