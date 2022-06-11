import { React } from 'react';

function Texts( {receiveInput, format} ) {

  return(
    <div>

      <p>
        Syötä {format}
      </p>

      <textarea id= "jsonInput"
                onChange={receiveInput}
                rows= "10"
                columns= "50">
      </textarea>


     </div>
  );

};

export default Texts;
