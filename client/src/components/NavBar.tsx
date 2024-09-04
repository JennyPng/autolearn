import React from 'react';
import { Box, Flex, Text, Spacer, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); 
  };

  // TODO add footer
  return (
    <Box bg="teal.500" px={4} position="sticky" top="0" zIndex={10}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box onClick={handleLogoClick} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold" color="white">
            autolearn
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Link href="/about" color="white" fontSize="lg">
            about
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
