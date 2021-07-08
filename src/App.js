import React, {useState} from 'react';
//import { Button, Checkbox, Form, Dropdown } from 'semantic-ui-react';
import Select from 'react-select';
import DetailView from "./DetailView.js";
function App(){
const choices = [
  {
    label: 'Get the Transcripts',
    value: 'Get'
  },
  {
    label: 'Upload the transcript',
    value: 'Post'
  } 
]

const [result,value] = useState(choices.label);
const handleChange = e => 
{
  value(e.value);
}

  
  return (
    <center>
    <div style={{ width : '200px' }}>
      <br></br>
      <Select options = {choices} onChange = {handleChange}/>
      <br></br>
      <DetailView job = {result}/>
    </div>
    </center>
  );
}

export default App;
