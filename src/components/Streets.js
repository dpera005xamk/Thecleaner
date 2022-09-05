import { React } from 'react';

function Streets( {receiveInput} ) {

  return(
    <div>

      <p>
        Syötä tähän kadun nimet. Kun ne on kopioitu excelistä, niin ei tarvitse tehdä mitään, niistä tulee valmiit versiot
        leikkauspöydälle, eli sitten vain liität esim, control+v niiden vanhojen päälle exceliin
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
