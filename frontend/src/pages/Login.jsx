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
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);
      
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
        title: 'Error',
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
              Welcome Back
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Sign in to continue your exam preparation
            </Text>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  <Link color="blue.500" href="#">
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>

          <Stack pt={6}>
            <Text align="center">
              Don't have an account?{' '}
              <Link as={RouterLink} to="/register" color="blue.500">
                Create one
              </Link>
            </Text>
            
            {process.env.NODE_ENV === 'development' && (
              <Box mt={4} p={3} bg="gray.50" borderRadius="md">
                <Text fontSize="sm" fontWeight="bold" mb={1}>Development Testing Guide:</Text>
                <Text fontSize="xs">
                  • For student dashboard: Use any email without "teacher" or "parent" (e.g., student@example.com)
                </Text>
                <Text fontSize="xs">
                  • For teacher dashboard: Use an email containing "teacher" (e.g., teacher@example.com)
                </Text>
                <Text fontSize="xs">
                  • For parent dashboard: Use an email containing "parent" (e.g., parent@example.com)
                </Text>
                <Text fontSize="xs" mt={1} fontStyle="italic">
                  Note: Any password will work in development mode
                </Text>
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login; 