import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';

const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: 'IGCSE Mathematics Formula Sheet',
      type: 'reference',
      subject: 'Mathematics',
      students: 45,
      lastUpdated: '2024-03-15',
      status: 'active'
    },
    {
      id: 2,
      title: 'Physics Practice Problems Set 1',
      type: 'practice',
      subject: 'Physics',
      students: 38,
      lastUpdated: '2024-03-14',
      status: 'active'
    },
    {
      id: 3,
      title: 'Chemistry Lab Report Template',
      type: 'template',
      subject: 'Chemistry',
      students: 42,
      lastUpdated: '2024-03-13',
      status: 'active'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTab === 'all' || resource.type === activeTab;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <Box>
        <Stack spacing={6}>
          <Box>
            <Heading size="lg">Resource Library</Heading>
            <Text mt={2} color="gray.600">
              Manage and organize your educational resources
            </Text>
          </Box>

          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              maxW={{ base: 'full', md: '200px' }}
            >
              <option value="all">All Resources</option>
              <option value="practice">Practice Materials</option>
              <option value="reference">Reference Materials</option>
              <option value="template">Templates</option>
            </Select>

            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              maxW={{ base: 'full', md: '300px' }}
            />

            <Button colorScheme="blue">Add New Resource</Button>
          </Stack>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {filteredResources.map((resource) => (
              <Box
                key={resource.id}
                p={4}
                borderWidth={1}
                borderRadius="lg"
                _hover={{ shadow: 'md' }}
              >
                <Stack spacing={2}>
                  <Heading size="md">{resource.title}</Heading>
                  <Text color="gray.600">{resource.subject}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Type: {resource.type}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Students: {resource.students}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Last Updated: {resource.lastUpdated}
                  </Text>
                  <Stack direction="row" spacing={2}>
                    <Button size="sm" colorScheme="blue">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Share
                    </Button>
                    <Button size="sm" colorScheme="red" variant="ghost">
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Grid>

          {filteredResources.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text color="gray.500">No resources found matching your criteria</Text>
            </Box>
          )}
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default ResourceLibrary; 