import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { CourseFormState } from "../components/CourseForm";


export default function Schedule() {
    const location = useLocation();
    const scheduleResponse : CourseFormState = location.state?.formData;
    console.log(JSON.stringify(scheduleResponse.schedule))
    console.log("-_-")
    return(
        <Card>
        <CardHeader>
            <Heading size='md'>Client Report</Heading>
        </CardHeader>

        <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
            <Box>
                <Heading size='xs' textTransform='uppercase'>
                Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                View a summary of all your clients over the last month.
                </Text>
            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase'>
                Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                Check out the overview of your clients.
                </Text>
            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase'>
                Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                See a detailed analysis of all your business clients.
                </Text>
            </Box>
            </Stack>
        </CardBody>
        </Card>
    )
}
