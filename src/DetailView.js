import React from 'react';
import {Form} from 'semantic-ui-react';
import axios from 'axios';
class DetailView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visitorId : '',
            caseId : '',
            previousBlockId: '',
            visitorConsent : 'No',
            agentConsent : 'No',
            transcriptJson :'',
            currentBlockId :''
        }
    }

    handleVisitorIdChange = (event) =>{
        this.setState({
            visitorId : event.target.value
        })
    }
    handleCaseIdChange = (event) =>{
        this.setState({
            caseId : event.target.value
        })
    }
    handlePreviousBlockIdChange = (event) =>{
        this.setState({
            previousBlockId : event.target.value
        })
    }
    handleBlockIdChange = (event) =>{
        this.setState({
            currentBlockId : event.target.value
        })
    }
    handleVisitorConsentChange = (event) =>{
        this.setState({
            visitorConsent : event.target.value
        })
    }
    handleAgentConsentChange = (event) =>{
        this.setState({
            agentConsent : event.target.value
        })
    }
    handleTranscriptChange = (event) =>{
        this.setState({
            transcriptJson : event.target.value
        })
    }
    handleSubmit = (event) =>{
        console.log(this.state)
       if(this.props.job === "Post"){
           let body = "caseId=" + this.state.caseId +",previousBlockId="+ this.state.previousBlockId + ",agentConsent=" + this.state.agentConsent + ",visitorConsent=" + this.state.visitorConsent + ",transcriptJson=" + this.state.transcriptJson 
           let postUrl = 'https://localhost:8080/'+this.state.visitorId+'/chainscript'
           axios.post(postUrl, body)
           .then(response =>{
               console.log(response)
               this.setState({
                currentBlockId : response
               })
           })
           .catch(error =>{
               console.log(error)
           })
       }
       else{
           let getUrl = 'https://localhost:8080/'+this.state.visitorId+'/'+this.state.previousBlockId+'/chainscripts'
           axios.get(getUrl)
           .then(response=>{
               console.log(response)
               this.setState({
                transcriptJson : response
            })
           })
           .catch(error=>{
               console.log(error)
           })
       }
    }

    

    render(){
        let formItems = [];
        let getItems;
        let job = this.props.job;
        if(job === "Post"){
            formItems.push(
                <Form.Input label='Case Number' placeholder='Case Number' value={this.state.caseId} onChange = {this.handleCaseIdChange}/>
            );
            formItems.push(
                <Form.Input label='Previous Block Id' placeholder='Previous if present else send null' value={this.state.previousBlockId} onChange = {this.handlePreviousBlockIdChange}/>
            );
            formItems.push(
                <Form.Input label='Consent to share transcript by visitor' placeholder='Visitor Consent' value={this.state.visitorConsent} onChange = {this.handleVisitorConsentChange}/>
            );
            formItems.push(
                <Form.Input label='Consent to share transcript by agent' placeholder='Agent Consent' value={this.state.agentConsent} onChange = {this.handleAgentConsentChange}/>
            );
            formItems.push(
                <Form.TextArea label='Transcript Json' placeholder='Add the transcript JSON...' value={this.state.transcriptJson} onChange = {this.handleTranscriptChange} />
            );
            getItems = <p>{this.state.currentBlockId}</p>
        }
        else if(job === "Get"){
            getItems = <p>{this.state.transcriptJson}</p>
            formItems.push(
                <Form.Input label='Block Id' placeholder='Block Id' value={this.state.currentBlockId} onChange = {this.handleBlockIdChange}/>
            );
        }
    
        return(
           <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input fluid label='Visitor Id' placeholder='Visitor Id' value={this.state.visitorId} onChange = {this.handleVisitorIdChange}/>
                    {formItems}
                    <Form.Button>Submit</Form.Button>
                </Form>
                {getItems}
            </div>
        );
    }
}

export default DetailView;