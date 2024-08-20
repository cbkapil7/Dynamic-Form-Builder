import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardHeader, CardBody, SimpleGrid, Heading, Input, Text } from '@chakra-ui/react';

const FormViewPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  const fetchFormData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/form/view/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setForm(data);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, [id]);

  if (!form) return <div>Loading...</div>;

  return (
    <Box
      padding={4}
      maxWidth="800px"
      
      overflow="hidden"  
    >
      <Card>
        <CardHeader>
          <Heading
            size="md"
            textAlign="center"
            bgGradient="linear(to-r, teal.500, green.500, blue.500)"
            bgClip="text"
            fontWeight="extrabold"
          >
            {form.title}
          </Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={form.inputs.length > 1 ? 2 : 1} spacing={4}>
            {form.inputs.map((input, index) => (
              <Box key={index} overflow="hidden">
                <Text fontWeight="bold" mb={2}>{input.title}</Text>
                <Input type={input.type} placeholder={input.placeholder} />
              </Box>
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
};

export default FormViewPage;
