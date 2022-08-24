import { useState, useEffect } from 'react';
import Inputs from './components/Inputs';
import Fields from './components/Fields';
import Element from './components/Element';

function App() {
  const [rawData, setRawData] = useState('');
  const [format, setFormat] = useState();
  const [message, setMessage] = useState('');
  const [elements, setElements] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  // street sanitator below
  const [streetData, setStreetdata] = useState('')
  const [sanitatedStreets, setSanitatedStreets] = useState('');

  // if elements changes, change the rawData
  useEffect( () => {
    if (elements.length > 0) {
      let parsed = null;

      try {
        // if not parsed yet
        parsed = JSON.parse(rawData);
      }

      catch(e) {
        // already parsed
        parsed = rawData;
        console.log('could not parse', rawData);
      }

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
      setButtonsDisabled(false);
      setRawData(fixed);
    }

  }, [elements]);

  // sanitate the street address
  // to only street name (removes numbers and door indicators)
  // third so that handles Kerrostalo, Rivitalo, Omakotitalo differently
  // other values: Erillistalo, Paritalo, Puutalo-osake, Muu
  const sanitateToName = () => {

    const fixed = rawData.map( (entry, i) => {

      // all numbers,
      let sanitated = entry.street.replace(/[0-9]/g, '');

      // any single digit left there
      sanitated = sanitated.replace(/\s.\s/g, '');

      // if last digits is leftower digit from sanitated door
      // as might still be after last replace from xYx cases
      if (sanitated[sanitated.length-2] == ' ') {
        sanitated = sanitated.replace(/.$/, '');
      }

      // empty spaces from end
      sanitated = sanitated.replace(/\s+$/g, '');

      entry.street = sanitated;
      return entry;
    });

    setRawData(fixed);
  };

  // sanitate the street address
  // to only streetname + first number
  // https://www.w3schools.com/jsref/jsref_obj_regexp.asp
  const sanitateToNameNumber = () => {


    // if buildingType === Kerrostalo
    // then should leave the street number
    // in other cases, remove all numbers
    const fixed = rawData.map( (entry, i) => {

      // all numbers,
      let sanitated = entry.street.replace(/[0-9]/g, '');

      // any single digit left there
      sanitated = sanitated.replace(/\s.\s/g, '');

      // if last digits is leftower digit from sanitated door
      // as might still be after last replace from xYx cases
      if (sanitated[sanitated.length-2] == ' ') {
        sanitated = sanitated.replace(/.$/, '');
      }

      // empty spaces from end
      sanitated = sanitated.replace(/\s+$/g, '');

      entry.street = sanitated;
      return entry;
    });

    setRawData(fixed);

  }

  // stringify the rawData and add to clipBoard
  const toClipBoardJson = () => {
  // navigator.clipboard.writeText(copyText.value);
    navigator.clipboard.writeText(JSON.stringify(rawData));
  }

  // converts to CSV and copies to clipBoard
  const toClipBoardCsv = () => {
    //const stringifiedRawData = JSON.stringify(rawData);
    let csvData = Object.keys(rawData[0]).join(',') + '\n';

    rawData.forEach( (jsonRecord) => {
     csvData += Object.values(jsonRecord).join(',') + '\n';
    });

    navigator.clipboard.writeText(csvData);
  }

  // receiveStreets
  const receiveStreets = (e) => {
    e.preventDefault();
    const inputs = e.target.value;
    setStreetdata(e.target.value)
    const splitted = inputs.split(/\r?\n/);
    console.log('splitted ', splitted);
    //console.log('streetData: ', streetData);
    const getSanitated = sanitateStreetsOfStreetData(splitted);
    navigator.clipboard.writeText(getSanitated);
    setSanitatedStreets(getSanitated)
  //  console.log('type: ', typeof(inputs));

  }

const sanitateStreetsOfStreetData = (values) => {
    console.log('streetdata found', values);
    //console.log('streetData ', streetData );
    /*
    var str = values;
    var i = 0;
    for (;i < str.length; i++) {
      if (str[i] === '\n' || str[i] === '\r') {
        console.log('found enter key')
      };
    };
    */
  console.log('values 0 ', values[0]);
  console.log('values 1 ', values[1]);
    /*
    const fixed = values.foreach((item, i) => {
      item.replace(
        // replace numbers
        /[0-9]/g, ''
      ).replace(
        // any single digit
        /\s.\s/g, ''
      ).replace(
        // if last digits is leftower digit from sanitated door
        // as might still be after last replace from xYx cases
        /.$/, ''
      )
    });
    */
    /*
    const fixed = values.replace(
      // replace numbers
      /[0-9]/g, ''
    ).replace(
      // any single digit
      /\s.\s/g, ''
    ).replace(
      // if last digits is leftower digit from sanitated door
      // as might still be after last replace from xYx cases
      /.$/, ''
    )
    ;
*/
  const fixed = values.map( (entry, i) => {

    // all numbers,
    let sanitated = entry.replace(/[0-9]/g, '');

    // any single digit left there
    sanitated = sanitated.replace(/\s.\s/g, '');

    // if last digits is leftower digit from sanitated door
    // as might still be after last replace from xYx cases
    if (sanitated[sanitated.length-2] == ' ') {
      sanitated = sanitated.replace(/.$/, '');
    }

    // empty spaces from end
    sanitated = sanitated.replace(/\s+$/g, '');

    // add enter
    //sanitated += '\n'

    return sanitated;
  });
  console.log('value 0', fixed[0]);
  console.log('value 1', fixed[1]);
  return fixed.join('\n');
}

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
            <button
              onClick= {sanitateToName}
              disabled= {buttonsDisabled}>
                osoitteet muotoon "kadunnimi"
              </button>
          </p>

          <p>
            <button
              onClick= {sanitateToNameNumber}
              disabled= {buttonsDisabled}>
                osoitteet muotoon "kadunnimi numero"
              </button>
          </p>

          <p>
            <button
              onClick= {toClipBoardJson}
              disabled= {buttonsDisabled}>
                kopioi materiaali JSON-muotoon clipboardille
            </button>
          </p>

          <p>
            <button
              onClick= {toClipBoardCsv}
              disabled= {buttonsDisabled}>
                kopioi materiaali CSV-muotoon clipboardille
            </button>
          </p>

          <p>
            klikkaa kenttien nimiä, mitkä poistetaan
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

          {/* here you can sanitate streetnames */}
          <Inputs
            mode= "streets"
            receiveStreets= {receiveStreets}
          />
          <button onClick= {sanitateStreetsOfStreetData}>
              tämän kentän osoitteet muotoon "kadunnimi"
            </button>

          {sanitatedStreets}
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
{/*
          <p id= "rawData">
            Data:
            <br/>
            {rawData}
          </p>
*/}
          <div id= "rawData">
            Data:
            <br/>

              {

                (typeof(rawData) === 'object') ?
                  rawData.map( (item, i) => {
                  return(
                    <p key= {i}>
                      {JSON.stringify(item)}
                    </p>
                    )
                  }):
                <></>

              }
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
