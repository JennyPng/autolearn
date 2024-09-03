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
  
const renderAssignment = () => {

}

const renderWeek = (week: Week) => {
    console.log("weeksss")
    return(
        <Accordion key={`schedule-week-${week.week_index}`}>
        <AccordionItem>
            <h2>
            <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                    Week {week.week_index}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            {week.topic}
            </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <h2>
            <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                Section 2 title
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
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
                    renderWeek(week)
                })
            ) : (
                <div>Failed</div>
            )
        }
        </>
    )
}
