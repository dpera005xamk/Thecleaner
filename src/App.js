import { useState } from 'react';
import Inputs from './components/Inputs';

function App() {
  const [inputted, setInputted] = useState('');
  const [results, setResults] = useState('');
  const [format, setFormat] = useState();

  const convert = (e) => {
    e.preventDefault();
    const inputs = e.target.value;

    if (format === 'json') {
      if (typeof(results) === 'string') {
        console.log('stringi');
      } else {
        console.log('not string');
      }
    //  setResults(JSON.parse(JSON.stringify(inputs)));
    }

    else if (format === 'csv') {

    }

    else {
      setResults('no format selected...');
    }

  };

  /*
  csv to json
  https://stackoverflow.com/questions/27979002/convert-csv-data-into-json-format-using-javascript
  */


  return (
    <div>

      {/* ylhäällä*/}
      <Inputs
        convert= {convert}
        mode= "radios"
        setFormat = {setFormat}
        />

      <div style= {{display: "flex"}}>

        {/* vasen laita*/}
        <div style= {{flex: 1}}>

          {
            format ?
              <Inputs
                convert= {convert}
                mode= "texts"
                format= {format}
              /> :
              <></>
          }
        </div>


        {/* oikea laita */}
        <div style= {{flex: 1}}>
          <p id= "results">
            {results}
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;
