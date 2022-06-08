import { React } from 'react';

function Texts( {convert, format} ) {

  return(
    <div>

      <p>
        Syötä {format}
      </p>

      <textarea id= "jsonInput"
                onChange={convert}
                rows= "10"
                columns= "50">
      </textarea>


     </div>
  );

};

export default Texts;
