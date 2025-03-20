import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { isAuthenticated, user } = useAuth();
  const showSidebar = isAuthenticated && user?.role;

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      
      <Flex flex="1">
        {showSidebar && (
          <Box 
            as="aside"
            w={{ base: 'full', md: '250px' }}
            position={{ base: 'static', md: 'fixed' }}
            h={{ base: 'auto', md: 'calc(100vh - 60px)' }}
            display={{ base: 'none', md: 'block' }}
            bg="white"
            borderRight="1px"
            borderColor="gray.200"
            pt="4"
          >
            <Sidebar userRole={user?.role} />
          </Box>
        )}
        
        <Box 
          as="main"
          flex="1"
          ml={{ base: 0, md: showSidebar ? '250px' : 0 }}
          transition="margin-left 0.2s"
          px={{ base: 4, md: 8 }}
          py={6}
        >
          <Outlet />
        </Box>
      </Flex>
      
      <Footer />
    </Flex>
  );
};

export default Layout; 