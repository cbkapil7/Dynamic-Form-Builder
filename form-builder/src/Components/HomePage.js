import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Icon,
} from '@chakra-ui/react';
import { FaClipboardList } from 'react-icons/fa';

const HomePage = () => {
  const [forms, setForms] = useState([]);

  const fetchForms = async () => {
    try {
      const response = await fetch('http://localhost:5000/form/forms');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <Box padding={6} maxWidth="800px" >
      <Heading as="h1" size="xl" textAlign="center" marginBottom={6}>
        Form Builder
      </Heading>
      <Link to="/form/create">
        <Button colorScheme="teal" size="lg" marginBottom={6}>
          Create Form
        </Button>
      </Link>
      <List spacing={4}>
        {forms.map((form) => (
          <ListItem
            key={form._id}
            padding={4}
            borderWidth={1}
            borderRadius="md"
            _hover={{ bg: "teal.100" }}
          >
            <Link to={`/form/view/${form._id}`}>
              <Box display="flex" alignItems="center">
                <Icon as={FaClipboardList} color="teal.500" marginRight={3} />
                <Heading as="h3" size="md">
                  {form.title}
                </Heading>
              </Box>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HomePage;
