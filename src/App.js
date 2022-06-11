import { useState } from 'react';
import Inputs from './components/Inputs';
import Fields from './components/Fields';
import Element from './components/Element';

function App() {
  const [rawData, setRawData] = useState('');
  const [format, setFormat] = useState();
  const [message, setMessage] = useState('');
  const [elements, setElements] = useState([]);

  // converts inputted data
  const convert = (e) => {
    e.preventDefault();
    const inputs = e.target.value;

    if (format === 'json') {
      if (typeof(rawData) === 'string') {
        console.log('stringi');
        setRawData(JSON.parse(JSON.stringify(inputs)));
      } else {
        console.log('not string');
      }
    //  setRawData(JSON.parse(JSON.stringify(inputs)));
    }

    else if (format === 'csv') {

        /*
        csv to json
        https://stackoverflow.com/questions/27979002/convert-csv-data-into-json-format-using-javascript
        */
    }

    else {
      setRawData('no format selected...');
    }

  };

  // changes value of property
  const switchValue = (id) => {
    setElements(elements.map( (ele) => {
      if (id === ele.id) {
        ele.show = !ele.show;
        return ele;
      } else {
        return ele;
      }
    }))
  }

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

          { /* text area to input json or csv */
            format ?
              <Inputs
                convert= {convert}
                mode= "texts"
                format= {format}
              /> :
              <></>
          }

          <p>
            valitse kentät klikkaamalla, vihreät näkyy, punaiset ei
          </p>

          { /* shows elements, that are in inputted data */
            elements.map( (ele, i) => {
              return(
                <div key= {i}>
                  <Element
                    ele= {ele}
                    switchValue= {switchValue} />
                </div>
              )
            })
          }
        </div>


        {/* right side */}
        <div style= {{flex: 1}}>

          <div>
            {/* generate found object here */}
            <Fields
              format= {format}
              rawData= {rawData}
              setMessage= {setMessage}
              setElements= {setElements}
              />
          </div>

          <p id= "rawData">
            raaka data:
            <br/>
            {rawData}
          </p>

        </div>

      </div>
    </div>
  );
}

export default App;
