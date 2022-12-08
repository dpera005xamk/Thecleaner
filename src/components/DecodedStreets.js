import { React } from 'react';

function Streets( {receiveInput} ) {

  return(
    <div>

      <p>
      kopioi tähän, saat ne clipboardille valmiina
      </p>

      <textarea id= "jsonInput"
                onChange={receiveInput}
                rows= "10"
                columns= "50">
      </textarea>


     </div>
  );

};

export default Streets;
