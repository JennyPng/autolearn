import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
import { Heading } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { CourseFormState, ScheduleResponse } from "../components/CourseForm";

// TODO look into pydantic for automated type syncing
interface Assignment {
    title: string;
    estimated_time: number;
    youtube_queries: string[];
    learning_goals: string[];
  }
  
  interface Week {
    week_index: number;
    topic: string;
    assignments: Assignment[];
    youtube_queries: string[];
  }
  
  interface Schedule {
    weeks: Week[];
  }

const renderWeek = (week: Week) => {
    return(
        <Accordion key={`schedule-week-${week.week_index}`} defaultIndex={[0]} allowMultiple>
        <AccordionItem>
            <h2>
            <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                    Week {week.week_index}: {week.topic}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                {week.assignments.map((hw) => {
                    return hw.title + ": " + hw.learning_goals
                })}
            </AccordionPanel>
        </AccordionItem>
        </Accordion>
    )
}

export default function Schedule() {
    const location = useLocation();
    const scheduleResponse : CourseFormState = location.state?.formData;
    
    // Ensure scheduleResponse and its schedule property exist
    if (!scheduleResponse || !scheduleResponse.scheduleResponse) {
        return <div>No schedule data available</div>;
    }

    const scheduleData = JSON.stringify(scheduleResponse.scheduleResponse)
    const parsedSchedule : ScheduleResponse = JSON.parse(scheduleData) as ScheduleResponse;

    console.log(scheduleData)

    const schedule : Schedule = parsedSchedule.schedule
    console.log(JSON.stringify(schedule.weeks))

    return(
        <>
        {
            schedule.weeks.length > 0 ? (
                schedule.weeks.map((week : Week) => {
                    return renderWeek(week)           
                })
            ) : (
                <div>Failed to generate schedule</div>
            )
        }
        </>
    )
}
