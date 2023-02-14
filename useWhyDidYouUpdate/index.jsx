// You can use React's useEffect hook to achieve this. 
// Within the useEffect hook, you can console log a message that will print 
// out when the component renders. To determine why the component re-rendered, 
// you can use React's useRef hook to store the previous props and state values, 
// and compare them to the current props and state values. Here's an example:

import React, { useRef, useEffect } from 'react';

function MyComponent(props) {
  const prevProps = useRef();
  const prevState = useRef();

  useEffect(() => {
    if (prevProps.current && prevState.current) {
      // Compare previous props and state to current props and state
      if (prevProps.current.someProp !== props.someProp ||
          prevState.current.someState !== state.someState) {
        console.log('MyComponent re-rendered due to prop or state change');
      } else {
        console.log('MyComponent re-rendered but no props or state changed');
      }
    }
    // Update previous props and state refs
    prevProps.current = props;
    prevState.current = state;
  });

  // Render component
  return (
    // ...
  );
}

