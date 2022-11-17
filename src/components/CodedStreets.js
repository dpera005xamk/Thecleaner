import { React } from 'react';

function Streets( {receiveInput} ) {

  return(
    <div>

      <p>
        Tämä "decodaa" katujen numerot. ja palauttaa vain ne
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
