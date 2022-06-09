import { useState } from 'react';
import Inputs from './components/Inputs';
import Fields from './components/Fields';

function App() {
  const [results, setResults] = useState('');
  const [format, setFormat] = useState();
  const [message, setMessage] = useState('');

  const convert = (e) => {
    e.preventDefault();
    const inputs = e.target.value;

    if (format === 'json') {
      if (typeof(results) === 'string') {
        console.log('stringi');
        setResults(JSON.parse(JSON.stringify(inputs)));
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

      {/* top */}

      <p>
        {message}
      </p>

      <Inputs
        convert= {convert}
        mode= "radios"
        setFormat = {setFormat}
        />

      <div style= {{display: "flex"}}>

        {/* left side */}
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


        {/* right side */}
        <div style= {{flex: 1}}>

          <div>
            {/* generate found object here */}
            <Fields
              format= {format}
              results= {results}
              setMessage= {setMessage}
              />
          </div>

          <p id= "results">
            {results}
          </p>

        </div>

      </div>
    </div>
  );
}

export default App;
