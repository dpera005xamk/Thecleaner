import { React } from 'react';
import Texts from './Texts';
import Radios from './Radios';

function Inputs( {convert, mode, format, setFormat} ) {

  if (mode === "texts") {
    return(
      <div>

        <Texts
          convert= {convert}
          format= {format}
          />

       </div>
    );
  }

  else if (mode === 'radios') {
    return(
      <div>

        <Radios
          convert= {convert}
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
