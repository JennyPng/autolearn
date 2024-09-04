import React, { useRef } from "react";
import {
    Card,
    CardBody,
    Heading,
    Box,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    UnorderedList,
    ListItem,
    VStack,
    HStack,
    Tag,
    Tabs,
    TabList,
    Tab,
    Flex,
    Divider
  } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import { CourseFormState, ScheduleResponse } from "../components/CourseForm";
import { Week, CourseSchedule } from "../types/ScheduleTypes";

  // TODO add keys to everything, refactor
const renderWeek = (week: Week, weekRef: React.RefObject<HTMLDivElement>) => {
    console.log(week.assignments[0].learning_goals)

    return(
        <Accordion key={`schedule-week-${week.week_index}`} borderWidth={'2px'} defaultIndex={[0]} w={'80%'} allowMultiple>
        <AccordionItem ref={weekRef}>
            <h2>
            <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                   <Heading as='h2' size='md'> Week {week.week_index}: {week.topic}</Heading>
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <VStack spacing={4} align="stretch">
                    <Heading as='h3' size='md'>Overview</Heading>
                    <Text>{week.topic_overview}</Text>
                    <Text>To learn more, search: </Text>
                    <HStack spacing={4}>{week.youtube_queries.map((q) => <Tag>{q}</Tag>)}</HStack>
                    <Divider></Divider>
                    <Heading as='h3' size='md'>Assignments</Heading>
                    {week.assignments.map((hw) => {
                        return (
                            <Card variant='elevated' padding={'1rem'}>   
                            <Heading as='h5' size='xs'>
                            {hw.title}</Heading>
                            <CardBody>
                            {
                                <VStack align='left' spacing={4}>                           
                                <Text>Learning Goals</Text>
                                <UnorderedList>
                                    {hw.learning_goals.map((goal) => <ListItem>{goal}</ListItem>)}
                                </UnorderedList>
                                <Text>To learn more, search: </Text>
                                <HStack spacing={4}>{hw.youtube_queries.map((q) => <Tag>{q}</Tag>)}</HStack>
                                </VStack>
                            }
                        </CardBody>
                        </Card>
                        )
                    })}
                </VStack>
     
            </AccordionPanel>
        </AccordionItem>
        </Accordion>
    )
}

export default function Schedule() {
    const location = useLocation();
    const scheduleResponse : CourseFormState = location.state?.formData;
    
    // Ensure scheduleResponse and its schedule property exist
    // if (!scheduleResponse || !scheduleResponse.scheduleResponse) {
    //     return <div>No schedule data available</div>;
    // }

    const scheduleData = JSON.stringify(scheduleResponse.scheduleResponse)
    const parsedSchedule : ScheduleResponse = JSON.parse(scheduleData) as ScheduleResponse;

    console.log(scheduleData)

    const schedule : CourseSchedule = parsedSchedule.schedule
    console.log(JSON.stringify(schedule.weeks))

  // Create refs for each week
  // useRef initializes once and doesn't change after renders
  const weekRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(schedule.weeks.map(() => React.createRef()));
  
  const handleTabClick = (index: number) => {
    const target = weekRefs.current[index].current;
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' }); // TODO how to get scroll right
       
        const button = target.querySelector('button');
      if (button && button.getAttribute('aria-expanded') === 'false') {
        button.click();
      }
    }
  };

    return(
        <Flex h={'100%'}>
        {/* Table of Contents */}
        <Box width="200px" bg="gray.50" p={4} borderRight="1px solid #ddd">
            <Tabs orientation="vertical" variant="soft-rounded" colorScheme="teal"  position="sticky" top={20}>
            <TabList >
                {schedule.weeks.map((week, index) => (
                <Tab key={index} onClick={() => handleTabClick(index)}>
                    week {week.week_index}
                </Tab>
                ))}
            </TabList>
            </Tabs>
        </Box>
        {
            schedule.weeks.length > 0 ? (
                <VStack>
                {schedule.weeks.map((week : Week, index) => {
                    return renderWeek(week, weekRefs.current[index])           
                })}
                </VStack>
               
            ) : (
                <Text>Failed to generate schedule</Text>
            )
        }
        </Flex>
    )
}
