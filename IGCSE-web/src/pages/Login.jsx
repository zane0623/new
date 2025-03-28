import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock authentication
    if (email === 'teacher@example.com' && password === 'password') {
      login({
        id: '1',
        name: 'Teacher User',
        email: 'teacher@example.com',
        role: 'teacher'
      });
      navigate('/teacher/dashboard');
    } else {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius={8}>
      <VStack spacing={4}>
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%">
              Login
            </Button>
          </VStack>
        </form>
        <Text fontSize="sm" color="gray.500">
          Use teacher@example.com / password to login as a teacher
        </Text>
      </VStack>
    </Box>
  );
};

export default Login; 