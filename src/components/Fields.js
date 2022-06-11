import { React, useEffect, useState } from 'react';

function Fields( {rawData, setRawData, format, setMessage, setElements} ) {
  const [foundJson, setFoundJson] = useState('');

/*
var x = {
  'key': 1
};

if ('key' in x) {
  console.log('has');
}
*/

  useEffect( () => {

    if (format === 'json') {

      // got json, lets see if it really is what is says it is
      try {
        const foundObject = JSON.parse(rawData);
        setMessage('json detected');
        setFoundJson(foundObject);

        // lets save names of properties with boolean
        const elementObjects = [];
        Object.keys(foundObject[0]).forEach((item, i) => {
          const newOne = {id: i, name: item, show: true};
          elementObjects.push(newOne);
        });
        setElements(elementObjects);
        console.log('f-O 2 ', foundObject[1]);
      //  setRawData(foundObject);
      }
      catch (e) {
        setMessage('data not json');
        // The JSON was invalid, `e` has some further information
      }

    }
  }, [rawData]);

  return(
    (foundJson !== '') ?
    <div>
      ok
    </div> :
    <></>
  );


};

export default Fields;
