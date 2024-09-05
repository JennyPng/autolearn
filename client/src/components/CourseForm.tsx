import React, { useState } from "react";
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
  Progress,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CourseSchedule } from "../types/ScheduleTypes";

export interface CourseFormState {
  desc: string;
  level: string;
  weeks: number;
  scheduleResponse: ScheduleResponse | undefined;
}

// TODO enforce api response type
export interface ScheduleResponse {
  desc: string;
  schedule: CourseSchedule;
}

export default function CourseForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CourseFormState>({
    desc: "",
    level: "",
    weeks: 4,
    scheduleResponse: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    console.log(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get<ScheduleResponse>(
        "http://127.0.0.1:8000/generate",
        {
          params: {
            desc: formData.desc,
            level: formData.level,
            weeks: formData.weeks,
          },
        },
      );

      setFormData({
        ...formData,
        scheduleResponse: res.data,
      });

      navigate("/schedule", {
        state: {
          formData: {
            ...formData,
            scheduleResponse: res.data,
          },
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="xl" mx="auto" mt={8} p={6} borderWidth={2} borderRadius="md">
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
          <FormLabel>
            over
            <NumberInput
              width={"50%"}
              defaultValue={formData.weeks}
              min={1}
              max={20}
              onChange={(val) => handleWeeksChange(val)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>{" "}
            weeks.{" "}
          </FormLabel>
        </FormControl>
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Button type="submit" colorScheme="teal" width="full">
            generate
          </Button>
        )}
      </form>
    </Box>
  );
}
