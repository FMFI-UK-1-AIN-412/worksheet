import React, {Component} from "react";
import RepoList from "../repo/RepoList";
import {Container, Row, Col, Spinner,Form,Button, ListGroup} from "react-bootstrap";
import { Octokit } from "@octokit/rest"

import firebase from "firebase/app"
import { Base64 } from 'js-base64';
import RepoBranchList from "../repo/RepoBranchList"

class RepoBoard extends Component{
    octokit = null
    constructor(props){
        super(props)
        this.state = {
            token:"",
            userName:"",
            repoList:[],
            currentRepo:"",
            currentBranch:""
        }

        this.octokit = new Octokit({
            auth:this.state.token,
            userAgent: "NikolajKn",
            baseUrl: "https://api.github.com"
        })
    }

    githubSignin = () =>{
        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {        
            this.setState({
                token: result.credential.accessToken,
                userName:  result.user
            })
         })
         .catch(function(error) {
            console.log(error.code)
            console.log(error.message)
         }) 
    }
      
    githubSignout = () =>{
        firebase.auth().signOut()   
        .then(() => {
            this.setState({
                token:"",
                userName:"",
                response:[]
            })    
        }, function(error) {
           console.log('Signout failed')
        });
     }

    componentDidMount(){
        //this.setState({response:this.getData()})
    }

   
    getData = async (user, token) => {
        var {data} = await this.octokit.repos.getContents({
            owner:"NikolajKn",
            repo:"bachelor",
            path:"package.json",
            ref:"development",
            mediaType:{
                format:"html"
            }
          });
        //var textik = Base64.decode(data.content)
    }

    resetState = () => {
        this.setState({
            token:"",
            userName:"",
            response:[]
        })
    }

    findUserRepos = async (name) => {
        try{
            var allRepos = await this.octokit.repos.listForUser({
                username:name
            });
            this.setState({repoList:allRepos.data})
        }catch(e){
            this.setState({repoList:[]})
        }  
    }


    findText = ""
    handleFindButton = async (e) => {
        e.preventDefault()
        this.findUserRepos(this.findText)
    }

    handleFindText = (e) => {
        this.findText = e.target.value
    }

    setRepoDetails = (newBranch, newRepo) =>{
        console.log("fungujem")
        this.setState({currentBranch:newBranch, currentRepo:newRepo})
        
    }

    render(){
        console.log("RepoBoard ", this.state)
        return(   
            <Container>
            <Row>
                <Col sm = {1}>  
                </Col>     
                <Col sm = {10}>   
                    <Form className = "findUserForm" onSubmit={this.handleFindButton}>
                        <Form.Group controlId="formSearchUser">
                            <Form.Label>Find user repos</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={this.handleFindText}/>
                        </Form.Group>  
                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </Form> 

                        {
                            this.state.repoList.length ?
                                <RepoBranchList repos = {this.state.repoList} setRepoDetails = {this.setRepoDetails} octokit={this.octokit}></RepoBranchList>
                                :
                                <div>
                                    No data
                                </div>
                    }                                           
                </Col>   
            </Row>

            <Row>
                <Col sm = {1}>  
                    <button onClick = {this.githubSignin}>Github Signin</button>
                    <button onClick = {this.githubSignout}>Github Signout</button>
                    <button onClick = {this.resetState}>Reset State</button>
                </Col>     
                <Col sm = {10}>   
                    {
                        this.state.repoList.length ?
                        <RepoList repos = {this.state.repoList} octokit={this.octokit} currentRepo={this.state.currentRepo} currentBranch={this.state.currentBranch}></RepoList>
                        :
                        <div>
                            No data
                        </div>
                    } 
                </Col>
            </Row>
            </Container>
            
        )
        
    }
}



export default RepoBoard
