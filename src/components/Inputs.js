import { React } from 'react';
import Texts from './Texts';
import Radios from './Radios';

function Inputs( {receiveInput, mode, format, setFormat} ) {

  if (mode === "texts") {
    return(
      <div>

        <Texts
          receiveInput= {receiveInput}
          format= {format}
          />

       </div>
    );
  }

  else if (mode === 'radios') {
    return(
      <div>

        <Radios
          setFormat= {setFormat}
          />

       </div>
    );
  }

  else {

    return null;

  }


};

export default Inputs;
