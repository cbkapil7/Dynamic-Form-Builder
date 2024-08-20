import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, SimpleGrid, Heading, Card, CardHeader, CardBody, CardFooter, Text, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FormCreatePage = () => {
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const [inputType, setInputType] = useState('text');
  const [inputTitle, setInputTitle] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const addInput = () => {
    if (editingIndex !== null) {
      const updatedInputs = [...inputs];
      updatedInputs[editingIndex] = { type: inputType, title: inputTitle, placeholder: inputPlaceholder };
      setInputs(updatedInputs);
      setEditingIndex(null);
    } else {
      if (inputs.length < 20) {
        setInputs([...inputs, { type: inputType, title: inputTitle, placeholder: inputPlaceholder }]);
      }
    }
    setInputTitle('');
    setInputPlaceholder('');
  };

  const editInput = (index) => {
    const input = inputs[index];
    setInputType(input.type);
    setInputTitle(input.title);
    setInputPlaceholder(input.placeholder);
    setEditingIndex(index);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedInputs = Array.from(inputs);
    const [movedInput] = reorderedInputs.splice(result.source.index, 1);
    reorderedInputs.splice(result.destination.index, 0, movedInput);

    setInputs(reorderedInputs);
  };

  const saveForm = async () => {
    try {
      const response = await fetch('http://localhost:5000/form/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          inputs,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save form');
      }

      const result = await response.json();
      console.log('Form saved successfully:', result);
      setTitle(''); 
      setInputs([]); 
      navigate('/');
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      width="100%"
      maxWidth="1000px"
      overflow="hidden"  
      backgroundColor={useColorModeValue('gray.50', 'gray.800')}
    >
      <Heading mb={4} color={useColorModeValue('teal.500', 'teal.300')}>
        Create Form
      </Heading>
      <Box mb={4} width="100%" maxWidth="500px" textAlign="center">
        <Input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          width="100%"
          margin="auto"
        />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
        <Card
          align="center"
          justify="center"
          textAlign="center"
          width="100%"
          minHeight="200px"
          overflow="hidden"  
        >
          <CardHeader>
            <Heading size="md" color={useColorModeValue('teal.600', 'teal.400')}>
              Create Inputs
            </Heading>
          </CardHeader>
          <CardBody>
            <Box mb={4} display="flex" flexDirection="column" gap={2}>
              <ButtonGroup spacing={2} mb={4} flexWrap="wrap">
                <Button onClick={() => setInputType('text')} colorScheme={inputType === 'text' ? 'blue' : 'gray'}>
                  Text
                </Button>
                <Button onClick={() => setInputType('email')} colorScheme={inputType === 'email' ? 'blue' : 'gray'}>
                  Email
                </Button>
                <Button onClick={() => setInputType('password')} colorScheme={inputType === 'password' ? 'blue' : 'gray'}>
                  Password
                </Button>
                <Button onClick={() => setInputType('number')} colorScheme={inputType === 'number' ? 'blue' : 'gray'}>
                  Phone
                </Button>
              </ButtonGroup>
              <Input
                type="text"
                placeholder="Input Title"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Placeholder"
                value={inputPlaceholder}
                onChange={(e) => setInputPlaceholder(e.target.value)}
              />
              <Button colorScheme="teal" onClick={addInput}>
                {editingIndex !== null ? 'Save Changes' : 'Add Input'}
              </Button>
            </Box>
          </CardBody>
        </Card>

        <Card
          align="center"
          justify="center"
          textAlign="center"
          width="100%"
          minHeight="200px"
          overflow="hidden"  
        >
          <CardHeader>
            <Heading size="md" color={useColorModeValue('teal.600', 'teal.400')}>
              Inputs Preview
            </Heading>
          </CardHeader>
          <CardBody>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="inputs">
                {(provided) => (
                  <SimpleGrid
                    columns={{ base: 1, sm: 2 }}
                    spacing={4}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {inputs.map((input, index) => (
                      <Draggable key={index} draggableId={`input-${index}`} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            width="100%"
                            display="flex"
                            alignItems="center"
                            padding={2}
                            bg="gray.100"
                            mb={2}
                          >
                            <Box flex="1" textAlign="left">
                              <Text fontWeight="bold" fontSize="lg">
                                {input.title}
                              </Text>
                              <Input type={input.type} placeholder={input.placeholder} readOnly />
                            </Box>
                            <Button size="xs" colorScheme="blue" ml={2} onClick={() => editInput(index)}>
                              Edit
                            </Button>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </SimpleGrid>
                )}
              </Droppable>
            </DragDropContext>
          </CardBody>
          <CardFooter>
            <Button colorScheme="teal" onClick={saveForm}>
              Save Form
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default FormCreatePage;
