import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  Heading,
  useToast,
  Select,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { register, login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Register the user
      const userData = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Automatically log in the user
      const user = await login(formData.email, formData.password);
      
      // Navigate based on user role
      if (user.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (user.role === 'parent') {
        navigate('/parent-dashboard');
      } else {
        // Default to student dashboard
        navigate('/dashboard');
      }
      
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
      py={12}
      px={4}
    >
      <Container
        maxW="lg"
        bg="white"
        boxShadow="xl"
        rounded="lg"
        p={8}
      >
        <Stack spacing={8}>
          <Stack align="center">
            <Heading fontSize="2xl" color="gray.800">
              IGCSE Prep
            </Heading>
            <Heading fontSize="4xl" color="gray.900">
              Create an Account
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Start your exam preparation journey
            </Text>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autocomplete="new-password"
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autocomplete="new-password"
                />
              </FormControl>

              <FormControl id="role" isRequired>
                <FormLabel>I am a</FormLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                </Select>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              </Stack>
            </Stack>
          </form>

          <Stack pt={6}>
            <Text align="center">
              Already have an account?{' '}
              <Link as={RouterLink} to="/login" color="blue.500">
                Sign in
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register; 