export const decodeNumbers = (values) => {
    const fixed = values.map( (entry, i) => {
    const alphabet = [...'aklsdfjödsfjölajsdfkjfjajskldfjaslöjklasödfjöadsfjödsafkjkasdöjöadfksjöasfkjajksdföjakfdabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrabcdefghijklmnopqersty'];
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
/*
    // all numbers,
    // Kaanaankatu 1c D 166
    console.log('original: ', entry);
    let sanitated = entry.replace(/[0-9]/g, '');
    console.log('after first ', sanitated);
    // Kaanaankatu c D
    // any single digit left there
    //sanitated = sanitated.replace(/\s./g, '');
    // if not "tie", take out possible three left overs
    // spaces from end
    sanitated = sanitated.replace(/\s+$/g, '');
    console.log('tie check: ', '-1', sanitated[sanitated.length-1], '-2', sanitated[sanitated.length-2], '-3',sanitated[sanitated.length-3]);
    if (sanitated[sanitated.length-1] !== 'e' &&
        sanitated[sanitated.length-2] !== 'i' &&
        sanitated[sanitated.length-3] !== 't' ||
        sanitated[sanitated.length-1] !== 'e' &&
        sanitated[sanitated.length-2] !== 'i' &&
        sanitated[sanitated.length-3] !== 't') {
        sanitated = sanitated.replace(/\s...\s/g, '');
          console.log('after 2.1/3 ', sanitated);
    }

    if (sanitated[sanitated.length-2] == ' ') {
      sanitated = sanitated.replace(/.$/, '');
    }
    sanitated = sanitated.replace(/\s..\s/g, '');
    console.log('after 2.2/3 ', sanitated);
    //sanitated = sanitated.replace(/\s./g, '');
    if (sanitated[sanitated.length-2] == ' ') {
      sanitated = sanitated.replace(/.$/, '');
    }
    sanitated = sanitated.replace(/\s.\s/g, '');
    console.log('after second ', sanitated);
    // KaanaankatuD
    // if last digits is leftower digit from sanitated door
    // as might still be after last replace from xYx cases
    if (sanitated[sanitated.length-2] == ' ') {
      sanitated = sanitated.replace(/.$/, '');
    }
    //console.log('after third ', sanitated);
    // KaanaankatuD
    // empty spaces from end
    sanitated = sanitated.replace(/\s+$/g, '');
    console.log('after fourth ', sanitated);

    // if has double space, lets deal that
    if (sanitated.includes('  ')) {
      console.log('double space dealer');
      sanitated = sanitated.replace(/\s\s(.*)/g, '');
    }

*/
    //console.log('i: ', includes);
    // KaanaankatuD
    // add decoded piece
    if (decodedStreetNumber != 'placeholder') {
      sanitated = `${sanitated} (${decodedStreetNumber})`
      //console.log('after fifth ', sanitated);
    }
    // KaanaankatuD (ja)
    // add enter
    //sanitated += '\n'
    /*
Ongelmia:
Töölöntullinkatu -K
Ida Aalberginb
    */

    return sanitated;
  });

  return fixed.join('\n');
}

export const sanitateStreetsOfStreetData = (values) => {

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

  return fixed.join('\n');
}
