import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface CourseFormState {
  desc: string;
  level: string;
  weeks: number;
  schedule: any;
}

// TODO enforce api response type
interface Schedule {
    param: string,
    weeks: string
}

export default function CourseForm() {
  const [formData, setFormData] = useState<CourseFormState>({
    desc: '',
    level: '',
    weeks: 1,
    schedule: undefined
  });

  const navigate = useNavigate();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWeeksChange = (value: string) => {
    setFormData({
      ...formData,
      weeks: parseInt(value, 10),
    });
    console.log(value)

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const res = await axios.get<Schedule>('http://127.0.0.1:8000/generate', {
            params: { param: formData.desc },
          });

        console.log('Form submitted successfully:', res.data);

        setFormData({
            ...formData,
            schedule: res.data
        });

        navigate('/schedule', {
            state: {
              formData: {
                ...formData,
                schedule: res.data
              }
            }
          });
          
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit}>
        <FormControl id="desc" mb={4}>
          <FormLabel>i want to learn</FormLabel>
          <Input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Ex. make a visual novel in unity"
            required
          />
        </FormControl>

        <FormControl id="level" mb={4}>
          <FormLabel>at level</FormLabel>
          <Select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
        </FormControl>

        <FormControl id="weeks" mb={4}>
          <FormLabel>over
          <NumberInput width={"50%"} defaultValue={formData.weeks} min={1} max={20} onChange={(val) => handleWeeksChange(val)} >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput> weeks. </FormLabel>
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">
          Submit
        </Button>
      </form>
    </Box>
  );
};
