import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Text, Stack, Icon, Link, useColorModeValue } from '@chakra-ui/react';
import { FiHome, FiBook, FiFileText, FiUser, FiUsers, FiSettings, FiBarChart2, FiClipboard } from 'react-icons/fi';

// Navigation links grouped by user role
const navItems = {
  student: [
    { name: 'Dashboard', icon: FiHome, path: '/student/dashboard' },
    { name: 'Exams', icon: FiBook, path: '/student/exams' },
    { name: 'Results', icon: FiBarChart2, path: '/student/results' },
    { name: 'Profile', icon: FiUser, path: '/student/profile' },
  ],
  parent: [
    { name: 'Dashboard', icon: FiHome, path: '/parent/dashboard' },
    { name: 'Student Progress', icon: FiBarChart2, path: '/parent/student-progress' },
    { name: 'Profile', icon: FiUser, path: '/parent/profile' },
  ],
  admin: [
    { name: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
    { name: 'User Management', icon: FiUsers, path: '/admin/users' },
    { name: 'System Settings', icon: FiSettings, path: '/admin/settings' },
  ],
  superadmin: [
    { name: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
    { name: 'User Management', icon: FiUsers, path: '/admin/users' },
    { name: 'System Settings', icon: FiSettings, path: '/admin/settings' },
    { name: 'Audit Logs', icon: FiClipboard, path: '/admin/audit-logs' },
  ],
};

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const activeColor = useColorModeValue('brand.600', 'brand.400');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  // Use admin nav items as fallback if role doesn't match
  const items = navItems[userRole] || navItems.admin;

  return (
    <Box>
      <Stack spacing={2} px={4}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              as={RouterLink}
              to={item.path}
              textDecoration="none"
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align="center"
                p={3}
                mx={-4}
                borderRadius="md"
                role="group"
                cursor="pointer"
                fontWeight={isActive ? 'semibold' : 'normal'}
                color={isActive ? activeColor : 'inherit'}
                bg={isActive ? 'gray.50' : 'transparent'}
                _hover={{
                  bg: hoverBg,
                }}
              >
                <Icon
                  mr={4}
                  fontSize="16"
                  as={item.icon}
                  color={isActive ? activeColor : 'gray.500'}
                  _groupHover={{
                    color: activeColor,
                  }}
                />
                <Text>{item.name}</Text>
              </Flex>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Sidebar; 