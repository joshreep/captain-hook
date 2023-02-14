// Sure, here's an example of how you can test the code I provided:

import React, { useState } from 'react';

function MyComponent(props) {
  const [count, setCount] = useState(0);
  // The component re-renders on each click, even if the count hasn't changed
  return (
    <button onClick={() => setCount(count)}>Click me</button>
  );
}

function App() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}

