import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import FormCreatePage from './Components/FormCreatePage';
import FormEditPage from './Components/FormEditPage';
import FormViewPage from './Components/FormViewPage';
import { Box } from '@chakra-ui/react';

const App = () => {
  return (
    <Router>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        marginBlock="60px"
        minHeight="100vh"
        overflow="hidden"  
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form/create" element={<FormCreatePage />} />
          <Route path="/form/edit/:id" element={<FormEditPage />} />
          <Route path="/form/view/:id" element={<FormViewPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
