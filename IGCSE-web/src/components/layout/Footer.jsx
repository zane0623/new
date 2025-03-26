import React from 'react';
import { Box, Container, Stack, Text, Link, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© {new Date().getFullYear()} IGCSE Exam Prep Platform. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <IconButton
            aria-label={'Twitter'}
            icon={<FaTwitter />}
            size="sm"
            color={'white'}
            bg={'twitter.400'}
            _hover={{ bg: 'twitter.500' }}
            rounded={'full'}
          />
          <IconButton
            aria-label={'YouTube'}
            icon={<FaYoutube />}
            size="sm"
            color={'white'}
            bg={'red.500'}
            _hover={{ bg: 'red.600' }}
            rounded={'full'}
          />
          <IconButton
            aria-label={'Instagram'}
            icon={<FaInstagram />}
            size="sm"
            color={'white'}
            bg={'pink.400'}
            _hover={{ bg: 'pink.500' }}
            rounded={'full'}
          />
          <IconButton
            aria-label={'Facebook'}
            icon={<FaFacebook />}
            size="sm"
            color={'white'}
            bg={'facebook.400'}
            _hover={{ bg: 'facebook.500' }}
            rounded={'full'}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer; 