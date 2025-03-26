import React from 'react';
import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      minH="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={8}
    >
      <VStack spacing={8} textAlign="center">
        <Heading as="h1" size="4xl" color="brand.600">
          404
        </Heading>
        
        <Image
          src="https://illustrations.popsy.co/amber/student-taking-test.svg"
          alt="Page not found illustration"
          maxW="300px"
        />

        <Heading as="h2" size="xl">
          Page Not Found
        </Heading>
        
        <Text fontSize="lg" maxW="md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </Text>
        
        <Button
          as={RouterLink}
          to="/"
          colorScheme="blue"
          bg="brand.600"
          _hover={{ bg: 'brand.700' }}
          size="lg"
          mt={4}
        >
          Return to Homepage
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound; 