import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  ButtonGroup, 
  Text,
  useColorModeValue,
  Flex,
  Icon
} from '@chakra-ui/react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();
  const [showSwitcher, setShowSwitcher] = useState(false);
  
  // Only show in development environment
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setShowSwitcher(true);
    }
  }, []);
  
  if (!showSwitcher) return null;
  
  return (
    <Box 
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex={999}
      bg={useColorModeValue('white', 'gray.800')}
      p={3}
      borderRadius="md"
      boxShadow="lg"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Text fontSize="xs" mb={2} fontWeight="bold" color="orange.500">
        DEV MODE: Role Switcher
      </Text>
      <Flex direction="column" gap={2}>
        <Button 
          size="sm" 
          colorScheme={user?.role === 'student' ? 'blue' : 'gray'} 
          leftIcon={<Icon as={FaUserGraduate} />}
          onClick={() => switchRole('student')}
          justifyContent="flex-start"
        >
          Student
        </Button>
        <Button 
          size="sm" 
          colorScheme={user?.role === 'parent' ? 'blue' : 'gray'} 
          leftIcon={<Icon as={FaUserTie} />}
          onClick={() => switchRole('parent')}
          justifyContent="flex-start"
        >
          Parent
        </Button>
        <Button 
          size="sm" 
          colorScheme={user?.role === 'teacher' ? 'blue' : 'gray'} 
          leftIcon={<Icon as={FaChalkboardTeacher} />}
          onClick={() => switchRole('teacher')}
          justifyContent="flex-start"
        >
          Teacher
        </Button>
      </Flex>
    </Box>
  );
};

export default RoleSwitcher; 