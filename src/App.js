import { useState, useEffect } from 'react';
import Inputs from './components/Inputs';
import Fields from './components/Fields';
import Element from './components/Element';

function App() {
  const [rawData, setRawData] = useState('');
  const [format, setFormat] = useState();
  const [message, setMessage] = useState('');
  const [elements, setElements] = useState([]);

  // if elements changes, change the rawData
  useEffect( () => {
    if (elements.length > 0) {
      const parsed = JSON.parse(rawData);
      const fixed = parsed.map( (entry) => {
        // check all keys of entry
        Object.keys(entry).forEach((item, i) => {
          // find same key from elements (there should be all)
          elements.forEach((item2, j) => {
            if (item === item2.name) {
              // found the key
              // if this is marked as red, delete the it
              if (!item2.show) {
                delete entry[item];
              }
            }
          });
        });
        // return the entry
        return entry;
      });
      // tästä jatketaan, sitten pitäisi varmaan tallettaa tämä rawDataan
      // voi olla, että menee suoraan, mutta ehkä pitää muuttaa stringiksi
      console.log('fixed: ', fixed);

    }

  }, [elements]);

  // receiveInputs inputted data
  const receiveInput = (e) => {
    e.preventDefault();
    const inputs = e.target.value;

    if (format === 'json') {
      if (typeof(rawData) === 'string') {
        setRawData(JSON.parse(JSON.stringify(inputs)));
      } else {
        setMessage('not JSON.');
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
      setMessage('no format selected...');
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
        receiveInput= {receiveInput}
        mode= "radios"
        setFormat = {setFormat}
        />

      <div style= {{display: "flex"}}>

        {/* left side */}
        <div style= {{flex: 1}}>

          { /* text area to input json or csv */
            format ?
              <Inputs
                receiveInput= {receiveInput}
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
              setRawData= {setRawData}
              setMessage= {setMessage}
              setElements= {setElements}
              />
          </div>

          <p id= "rawData">
            Data:
            <br/>
            {rawData}
          </p>

        </div>

      </div>
    </div>
  );
}

export default App;
