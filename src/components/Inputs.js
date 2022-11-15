import { React } from 'react';
import Texts from './Texts';
import Radios from './Radios';
import Streets from './Streets';
import DecodedStreets from './DecodedStreets';

function Inputs( {receiveInput, mode, format, setFormat, receiveStreets} ) {

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
  /* this is for the street name sanitation */
  else if (mode === 'streets') {
    return(
      <div>

        <Streets
          receiveInput= {receiveStreets}
          format= {format}
        />

       </div>
    );
  }

  /* this is for olas case where streets will get "decoded" end */
  else if (mode === 'decodedStreets') {
    return(
      <div>

        <DecodedStreets
          receiveInput= {receiveStreets}
          format= {format}
        />

       </div>
    );
  }


  else {

    return null;

  }


};

export default Inputs;
