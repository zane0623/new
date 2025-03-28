import { Box, Heading, Text, Container, SimpleGrid, Card, CardHeader, CardBody, Stack } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Container maxW="container.xl">
        <Heading mb={6}>Dashboard</Heading>
        <Text mb={8}>Welcome to your IGCSE Prep Dashboard</Text>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <Card>
            <CardHeader>
              <Heading size="md">My Courses</Heading>
            </CardHeader>
            <CardBody>
              <Stack>
                <Text>View your enrolled courses here</Text>
              </Stack>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <Heading size="md">Upcoming Exams</Heading>
            </CardHeader>
            <CardBody>
              <Stack>
                <Text>See your upcoming exam schedule</Text>
              </Stack>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <Heading size="md">Recent Activities</Heading>
            </CardHeader>
            <CardBody>
              <Stack>
                <Text>Track your learning progress</Text>
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Dashboard; 