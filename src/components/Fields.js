import { React, useEffect, useState } from 'react';

function Fields( {results, format, setMessage} ) {
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
        const foundObject = JSON.parse(results);
        setMessage('json detected');
        setFoundJson(foundObject);
        console.log('fO: ', foundObject);
      //  Object.keys(foundObject).forEach((prop)=> console.log(prop));
      // https://tutorial.tips/how-to-print-all-the-properties-of-the-object-in-javascript/
      }
      catch (e) {
        setMessage('data not json');
        // The JSON was invalid, `e` has some further information
      }

    }
  }, [results]);

  return(
    (foundJson !== '') ?
    <div>
      ok
    </div> :
    <></>
  );


};

export default Fields;
