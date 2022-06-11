import { React } from 'react';


// this shows buttons, where user can toggle between what element shows and what not
function Element( {ele, switchValue} ) {

  if (ele) {
    let color = null;
    ele.show ? color = 'green' : color = 'red';

    return(
      <div>

        <button
          style = {{ backgroundColor: color }}
          onClick= { () => {
            switchValue(ele.id);
          }}>
          {ele.name}
        </button>

      </div>
    );
  } else {

    return null;
  }


};

export default Element;
