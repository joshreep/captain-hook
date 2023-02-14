In this example, we've created a simple component called MyComponent that increments a count state variable on each click. We've also created an App component that renders MyComponent.

If we implement the code I provided earlier in MyComponent, we should see a message in the console indicating that the component re-rendered even though the count state variable didn't change:

<!-- import React, { useRef, useEffect } from 'react';

function MyComponent(props) {
  const [count, setCount] = useState(0);
  const prevProps = useRef();
  const prevState = useRef();

  useEffect(() => {
    if (prevProps.current && prevState.current) {
      if (prevProps.current.someProp !== props.someProp ||
          prevState.current.count !== count) {
        console.log('MyComponent re-rendered due to prop or state change');
      } else {
        console.log('MyComponent re-rendered but no props or state changed');
      }
    }
    prevProps.current = props;
    prevState.current = { count };
  });

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
} -->

When we click the button, we should see a message in the console indicating that MyComponent re-rendered but no props or state changed.