import { useState } from 'react';
import { 
  Box, 
  Flex, 
  HStack, 
  IconButton, 
  Button, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Container,
  Heading,
  Avatar,
  Text,
  Link,
  Icon,
  useDisclosure,
  Stack,
  Collapse
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt, 
  FaChalkboardTeacher, 
  FaBook, 
  FaGraduationCap, 
  FaUserGraduate 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const NavLink = ({ children, to, icon }) => (
  <Link
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    display="flex"
    alignItems="center"
  >
    {icon && <Icon as={icon} mr={2} />}
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Role would normally come from the user object
  const userRole = user?.role || 'student'; // Default to student if not specified
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    switch(userRole) {
      case 'parent':
        return '/parent-dashboard';
      case 'teacher':
        return '/teacher-dashboard';
      default:
        return '/dashboard';
    }
  };

  const getDashboardIcon = () => {
    switch(userRole) {
      case 'parent':
        return FaUserGraduate;
      case 'teacher':
        return FaChalkboardTeacher;
      default:
        return FaChalkboardTeacher;
    }
  };

  const getDashboardText = () => {
    switch(userRole) {
      case 'parent':
        return 'Parent Dashboard';
      case 'teacher':
        return 'Teacher Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} px={4} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <FaTimes /> : <FaBars />}
            aria-label={'Toggle Navigation'}
            display={{ md: 'none' }}
            onClick={onToggle}
          />
          
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Heading size="md" color={useColorModeValue('blue.600', 'blue.200')}>
                <Flex alignItems="center">
                  <Icon as={FaGraduationCap} mr={2} />
                  IGCSE Prep
                </Flex>
              </Heading>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink to="/" icon={FaBook}>Home</NavLink>
              {user && (
                <>
                  <NavLink to={getDashboardLink()} icon={getDashboardIcon()}>
                    {getDashboardText()}
                  </NavLink>
                  <NavLink to="/courses" icon={FaBook}>Courses</NavLink>
                </>
              )}
            </HStack>
          </HStack>
          
          <Flex alignItems={'center'}>
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    name={user.name || 'User'}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FaUser />}>Profile</MenuItem>
                  <MenuItem icon={<FaBook />}>My Courses</MenuItem>
                  {userRole === 'parent' && (
                    <MenuItem 
                      icon={<FaUserGraduate />} 
                      as={RouterLink} 
                      to="/parent-dashboard"
                    >
                      Parent Dashboard
                    </MenuItem>
                  )}
                  {userRole === 'student' && (
                    <MenuItem 
                      icon={<FaChalkboardTeacher />} 
                      as={RouterLink} 
                      to="/dashboard"
                    >
                      Student Dashboard
                    </MenuItem>
                  )}
                  <MenuDivider />
                  <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={4}>
                <Button as={RouterLink} to="/login" variant="ghost" colorScheme="blue">
                  Sign In
                </Button>
                <Button as={RouterLink} to="/register" colorScheme="blue">
                  Sign Up
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLink to="/">Home</NavLink>
              {user && (
                <>
                  <NavLink to={getDashboardLink()}>{getDashboardText()}</NavLink>
                  <NavLink to="/courses">Courses</NavLink>
                </>
              )}
              {!user && (
                <>
                  <NavLink to="/login">Sign In</NavLink>
                  <NavLink to="/register">Sign Up</NavLink>
                </>
              )}
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar; 