import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('student');
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  // Function to validate form data
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    try {
      // Store the userType to prepend email if needed
      const loginEmail = userType === 'demo' 
        ? `${userType}@example.com` 
        : email;
      
      const user = await login({ email: loginEmail, password });
      
      // Navigate to appropriate dashboard based on user role
      switch (user.role) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'parent':
          navigate('/parent/dashboard');
          break;
        case 'admin':
        case 'superadmin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      // Error is handled by the auth context
      console.error(err);
    }
  };

  // Function to handle demo login
  const handleDemoLogin = (role) => {
    setUserType('demo');
    setEmail(`${role}@example.com`);
    setPassword('password');
  };

  const handleTabChange = (index) => {
    const types = ['student', 'parent', 'admin'];
    setUserType(types[index]);
  };

  return (
    <Box
      minH="80vh" // Set min height for centering
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        spacing={8}
        mx={'auto'}
        maxW={'md'}
        w={'full'}
        py={12}
        px={6}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        
        <Tabs isFitted variant="enclosed" onChange={handleTabChange}>
          <TabList mb="1em">
            <Tab>Student</Tab>
            <Tab>Parent</Tab>
            <Tab>Admin</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text mb={4}>Access your student account to practice exams and track your progress.</Text>
            </TabPanel>
            <TabPanel>
              <Text mb={4}>Monitor your child's performance and receive updates on their progress.</Text>
            </TabPanel>
            <TabPanel>
              <Text mb={4}>Manage the school's access, users, and view institutional analytics.</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          {error && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              
              <Stack spacing={5}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Text
                    as={RouterLink}
                    to="/forgot-password"
                    color={'blue.500'}
                  >
                    Forgot password?
                  </Text>
                </Stack>
                
                <Button
                  type="submit"
                  bg={'brand.600'}
                  color={'white'}
                  _hover={{
                    bg: 'brand.700',
                  }}
                  isLoading={loading}
                >
                  Sign in
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin(userType)}
                  isDisabled={loading}
                >
                  Demo {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
                </Button>
              </Stack>
            </Stack>
          </form>
          
          <Stack pt={6}>
            <Text align={'center'}>
              Don't have an account?{' '}
              <Text as={RouterLink} to="/register" color={'blue.500'}>
                Register
              </Text>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login; 