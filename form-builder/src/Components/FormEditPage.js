import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  margin: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const FormEditPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [inputs, setInputs] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/form/forms/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    if (id) {
      fetchFormData();
    }
  }, [id]);

  const saveForm = () => {
    
    history.push('/');
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Container>
      <h1>Edit Form</h1>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <InputContainer>
        {inputs.map((input, index) => (
          <div key={index} style={{ width: 'calc(50% - 10px)' }}>
            <label>{input.title}</label>
            <input type={input.type} placeholder={input.placeholder} readOnly />
            <Button onClick={() => setInputs(inputs.filter((_, i) => i !== index))}>Delete</Button>
          </div>
        ))}
      </InputContainer>
      <Button onClick={saveForm}>Save Form</Button>
    </Container>
  );
};

export default FormEditPage;
