//Here is the code for the hook:

import { useState, useEffect } from "react";

const useKeyPress = (targetKey, element = window) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === targetKey) {
        setKeyPressed(true);
      } else {
        setKeyPressed(false);
      }
    };

    const handleKeyUp = () => {
      setKeyPressed(false);
    };

    element.addEventListener("keydown", handleKeyDown);
    element.addEventListener("keyup", handleKeyUp);

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey, element]);

  return keyPressed;
};

export default useKeyPress;


// Here's an example of how you can use the hook in a component:
//import React from "react";
// import useKeyPress from "./useKeyPress";

// const KeyPressExample = () => {
//   const enterPressed = useKeyPress("Enter");

//   return (
//     <div>
//       <p>Enter key is {enterPressed ? "being pressed" : "not being pressed"}</p>
//     </div>
//   );
// };

// export default KeyPressExample;
