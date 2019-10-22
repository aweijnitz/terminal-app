import React, {useState, useEffect} from 'react';
import {render, Color, Box, Text} from 'ink';

const Counter = () => {
  
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box padding={2} flexDirection="column">
      <Box>
        <Box width={14}>
          <Text bold>Total tests:</Text>
        </Box>
        12
      </Box>
      <Box>
        <Box width={14}>
          <Text bold>Passed:</Text>
        </Box>
        <Color green>Count: {count}</Color>
      </Box>
    
    </Box>
  );
};

render(<Counter/>);