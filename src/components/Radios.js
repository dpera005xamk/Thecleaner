import { React } from 'react';

function Radios( {mode, setFormat} ) {

  return(
    <form onChange = { (e) => {
      setFormat(e.target.value)
    }}>

      <p>
        valitse formaatti
      </p>

      <input type= "radio" name= "formats" value= "json"/>
      <label>json</label> <br/>

      <input type= "radio" name= "formats" value= "csv" disabled= {true}/>
      <label>csv</label> <br/>


    </form>
  );

};

export default Radios;
