// this takes away the street numbers and replaces them with decoded entries
export const decodeNumbers = (values) => {
  const fixed = values.map( (entry, i) => {
    const alphabet = [...'a1b2c3d4e5f6g7h8i9jklmnopqrstuwxyzabcdefghijklmnopqrstuvw4z567y8z9'];
    let decodedStreetNumber = 'placeholder';
    const numberLocations = [];
    const actualNumbers = []
    let streetNameLength = 0;

    // check where are the numbers
    for (let i = 0; i < entry.length; i++) {
      if (/^\d+$/.test(entry[i])) {
        numberLocations.push(i)
        actualNumbers.push(entry[i]);
      }
    }

    // determine length of the street name
    streetNameLength = numberLocations[0];
    //console.log('s l: ', streetNameLength);
    // check maybe if next to that is number too
    if (numberLocations.length === 1) {
      decodedStreetNumber = alphabet[streetNameLength] + alphabet[actualNumbers[0]]
      //console.log('l 1. giving: ', decodedStreetNumber);
    } else {
      // remove numbers that are door numbers
      if (numberLocations.length === 2) {
        if ((numberLocations[1] - numberLocations[0]) > 1) {
          numberLocations.pop();
          actualNumbers.pop();
          decodedStreetNumber = alphabet[streetNameLength] + alphabet[actualNumbers[0]]
          //console.log('l2, giving: ', alphabet[streetNameLength], alphabet[actualNumbers[0]], 'act: ', actualNumbers);
        } else {
          decodedStreetNumber = alphabet[streetNameLength] + alphabet[actualNumbers[0]] + alphabet[actualNumbers[1]]
          //console.log('l2 else, giving: ', decodedStreetNumber);
        }
      }
      // in case of more than two numbers
      if (numberLocations.length > 2) {
        // check that there are no apartment numbers
        while ((numberLocations[numberLocations.length-1] - numberLocations[0]) > numberLocations.length-1) {
          // pop if there are
          numberLocations.pop();
          actualNumbers.pop();
        }
        // add decoded
        decodedStreetNumber = alphabet[streetNameLength];
        //console.log('g1 ', alphabet[streetNameLength], 'act: ', actualNumbers);
        actualNumbers.forEach((item, i) => {
          decodedStreetNumber += alphabet[item]
          //console.log('g2 ', alphabet[item]);
        });
        //console.log('l longer, giving: ', decodedStreetNumber);
      }
    }

    //console.log('decoded street number: ', decodedStreetNumber);
    //console.log('nL and aN ', numberLocations, actualNumbers);
    let sanitated = entry.slice(0, streetNameLength);
    //console.log('sliced: ', sanitated);
    //console.log('i: ', includes);
    // KaanaankatuD
    // add decoded piece
    if (decodedStreetNumber !== 'placeholder') {
      sanitated = `${sanitated} (${decodedStreetNumber})`
      //console.log('after fifth ', sanitated);
    }

    return sanitated;
  });

  return fixed.join('\n');
}

// this takes away the whole street number
export const sanitateStreetsOfStreetData = (values) => {

  const fixed = values.map( (entry, i) => {
    const numberLocations = [];
    let streetNameLength = 0;

    // check where are the numbers
    for (let i = 0; i < entry.length; i++) {
      if (/^\d+$/.test(entry[i])) {
        numberLocations.push(i)
      }
    }

    // determine length of the street name
    streetNameLength = numberLocations[0];

    // cut all after the street name
    let sanitated = entry.slice(0, streetNameLength);

/*
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
*/
    return sanitated;
  });

  return fixed.join('\n');
}

export const receiveJustDecoded = (values) => {
  const fixed = values.map( (entry, i) => {
    const alphabet = [...'a1b2c3d4e5f6g7h8i9jklmnopqrstuwxyzabcdefghijklmnopqrstuvw4z567y8z9'];
    let decodedStreetNumber = 'placeholder';
    const numberLocations = [];
    const actualNumbers = []
    let streetNameLength = 0;

    // check where are the numbers
    for (let i = 0; i < entry.length; i++) {
      if (/^\d+$/.test(entry[i])) {
        numberLocations.push(i)
        actualNumbers.push(entry[i]);
      }
    }

    // determine length of the street name
    streetNameLength = numberLocations[0];
    //console.log('s l: ', streetNameLength);
    // check maybe if next to that is number too
    if (numberLocations.length === 1) {
      decodedStreetNumber = alphabet[streetNameLength] + alphabet[actualNumbers[0]]
      //console.log('l 1. giving: ', decodedStreetNumber);
    } else {
      // remove numbers that are door numbers
      if (numberLocations.length === 2) {
        if ((numberLocations[1] - numberLocations[0]) > 1) {
          numberLocations.pop();
          actualNumbers.pop();
          decodedStreetNumber = alphabet[streetNameLength] + alphabet[actualNumbers[0]]
          //console.log('l2, giving: ', alphabet[streetNameLength], alphabet[actualNumbers[0]], 'act: ', actualNumbers);
        } else {
          decodedStreetNumber = alphabet[streetNameLength] + alphabet[actualNumbers[0]] + alphabet[actualNumbers[1]]
          //console.log('l2 else, giving: ', decodedStreetNumber);
        }
      }
      // in case of more than two numbers
      if (numberLocations.length > 2) {
        // check that there are no apartment numbers
        while ((numberLocations[numberLocations.length-1] - numberLocations[0]) > numberLocations.length-1) {
          // pop if there are
          numberLocations.pop();
          actualNumbers.pop();
        }
        // add decoded
        decodedStreetNumber = alphabet[streetNameLength];
        //console.log('g1 ', alphabet[streetNameLength], 'act: ', actualNumbers);
        actualNumbers.forEach((item, i) => {
          decodedStreetNumber += alphabet[item]
          //console.log('g2 ', alphabet[item]);
        });
        //console.log('l longer, giving: ', decodedStreetNumber);
      }
    }

    //console.log('decoded street number: ', decodedStreetNumber);
    //console.log('nL and aN ', numberLocations, actualNumbers);
    let sanitated = entry.slice(0, streetNameLength);
    //console.log('sliced: ', sanitated);
    //console.log('i: ', includes);
    // KaanaankatuD
    // add decoded piece
    if (decodedStreetNumber !== 'placeholder') {
      sanitated = decodedStreetNumber;
      //console.log('after fifth ', sanitated);
    }

    return sanitated;
  });

  return fixed.join('\n');
}

// this returns street and number, like kopparinkatu 2, can be used with flats
export const returnStreetAndNumber = (values) => {
  console.log('rns');
  const fixed = values.map( (entry, i) => {
    const numberLocations = [];
    let streetNameLength = 0;
    let breakPoint = null;
    let sanitated = undefined;

    // check where are the numbers
    for (let i = 0; i < entry.length; i++) {
      if (/^\d+$/.test(entry[i])) {
        numberLocations.push(i)
      }
    }

    //console.log('numberLocs ', numberLocations);

    // determine length of the street name
    streetNameLength = numberLocations[0];

    // remove alphabetic and all after that

  
    console.log('entry: ', entry);

    // check where is a alpabetic
    for (let i = streetNameLength; i < entry.length; i++) {
      const regex = /^[a-zA-Z]+$/;
      if (entry[i].match(regex)) {
        //console.log('aspha löyty', entry[i]);
        if (breakPoint === null) {
          breakPoint = i;
        }
      }
    }

    // cut everything after number/numbers
    if (breakPoint === null) {
      sanitated = entry.slice(0, numberLocations[numberLocations.length-1]+1);
    } else {
      sanitated = entry.slice(0, breakPoint);
    }

    return sanitated;
  });

  return fixed.join('\n');
}