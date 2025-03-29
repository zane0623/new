import { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Container, 
  SimpleGrid, 
  Card, 
  CardHeader, 
  CardBody, 
  Stack,
  Flex,
  Icon,
  Progress,
  HStack,
  VStack,
  Button,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  useColorModeValue,
  Avatar,
  AvatarBadge
} from '@chakra-ui/react';
import { 
  FaBook, 
  FaCalendarAlt, 
  FaChartLine, 
  FaClock, 
  FaGraduationCap, 
  FaRegBell, 
  FaTasks, 
  FaTrophy 
} from 'react-icons/fa';

const StudentDashboard = () => {
  // Mock data - would come from API in a real application
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    courses: 4,
    nextExam: 'Mathematics - 15 May 2024',
    progress: 68,
    streak: 7
  });

  // You would fetch this data from an API
  const enrolledCourses = [
    { id: 1, title: 'Mathematics (0580)', progress: 75, nextLesson: 'Algebra II', badge: 'Popular' },
    { id: 2, title: 'Physics (0625)', progress: 62, nextLesson: 'Electric Circuits', badge: '' },
    { id: 3, title: 'Biology (0610)', progress: 88, nextLesson: 'Respiration', badge: 'New' },
    { id: 4, title: 'Chemistry (0620)', progress: 45, nextLesson: 'Chemical Bonding', badge: '' }
  ];

  const upcomingExams = [
    { id: 1, title: 'Mathematics Mock Exam', date: '15 May 2024', time: '10:00' },
    { id: 2, title: 'Physics Unit Test', date: '22 May 2024', time: '14:00' }
  ];

  const recentActivities = [
    { id: 1, title: 'Completed Mathematics Quiz', time: '2 hours ago', score: '85%' },
    { id: 2, title: 'Watched Physics Lecture', time: 'Yesterday', score: '' },
    { id: 3, title: 'Submitted Biology Assignment', time: '2 days ago', score: 'Pending' }
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
      <Container maxW="container.xl">
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="xl" mb={2} color={useColorModeValue('gray.800', 'white')}>
              Student Dashboard
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Welcome back, {userData.name}! Continue your learning journey.
            </Text>
          </Box>
          <Flex align="center">
            <Box mr={4} position="relative">
              <Icon as={FaRegBell} boxSize={6} color="gray.400" cursor="pointer" />
              <Box 
                position="absolute" 
                top="-5px" 
                right="-5px" 
                bg="red.500" 
                borderRadius="full" 
                w="18px" 
                h="18px" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Text fontSize="xs" fontWeight="bold" color="white">3</Text>
              </Box>
            </Box>
            <Avatar name={userData.name} size="md">
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
          </Flex>
        </Flex>

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Card 
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="md"
            borderRadius="lg"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
          >
            <CardBody>
              <Stat>
                <Flex align="center">
                  <Box 
                    bg="blue.50" 
                    p={2} 
                    borderRadius="lg" 
                    mr={4}
                  >
                    <Icon as={FaGraduationCap} boxSize={6} color="blue.500" />
                  </Box>
                  <Box>
                    <StatLabel color="gray.500">Enrolled Courses</StatLabel>
                    <StatNumber>{userData.courses}</StatNumber>
                  </Box>
                </Flex>
              </Stat>
            </CardBody>
          </Card>

          <Card 
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="md"
            borderRadius="lg"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
          >
            <CardBody>
              <Stat>
                <Flex align="center">
                  <Box 
                    bg="purple.50" 
                    p={2} 
                    borderRadius="lg" 
                    mr={4}
                  >
                    <Icon as={FaCalendarAlt} boxSize={6} color="purple.500" />
                  </Box>
                  <Box>
                    <StatLabel color="gray.500">Next Exam</StatLabel>
                    <StatNumber fontSize="md">{userData.nextExam}</StatNumber>
                  </Box>
                </Flex>
              </Stat>
            </CardBody>
          </Card>

          <Card 
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="md"
            borderRadius="lg"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
          >
            <CardBody>
              <Stat>
                <Flex align="center">
                  <Box 
                    bg="green.50" 
                    p={2} 
                    borderRadius="lg" 
                    mr={4}
                  >
                    <Icon as={FaChartLine} boxSize={6} color="green.500" />
                  </Box>
                  <Box>
                    <StatLabel color="gray.500">Overall Progress</StatLabel>
                    <StatNumber>{userData.progress}%</StatNumber>
                    <Progress value={userData.progress} size="sm" colorScheme="green" mt={2} borderRadius="full" />
                  </Box>
                </Flex>
              </Stat>
            </CardBody>
          </Card>

          <Card 
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="md"
            borderRadius="lg"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
          >
            <CardBody>
              <Stat>
                <Flex align="center">
                  <Box 
                    bg="orange.50" 
                    p={2} 
                    borderRadius="lg" 
                    mr={4}
                  >
                    <Icon as={FaTrophy} boxSize={6} color="orange.500" />
                  </Box>
                  <Box>
                    <StatLabel color="gray.500">Study Streak</StatLabel>
                    <StatNumber>{userData.streak} days</StatNumber>
                    <StatHelpText>Keep it up!</StatHelpText>
                  </Box>
                </Flex>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Main Content Grid */}
        <Grid
          templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
          gap={8}
        >
          {/* Left Column - My Courses */}
          <GridItem>
            <Card
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow="md"
              borderRadius="lg"
              mb={8}
            >
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <HStack>
                    <Icon as={FaBook} color="blue.500" boxSize={5} />
                    <Heading size="md">My Courses</Heading>
                  </HStack>
                  <Button size="sm" colorScheme="blue" variant="outline">View All</Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <Stack spacing={5}>
                  {enrolledCourses.map(course => (
                    <Box key={course.id} p={4} bg="gray.50" borderRadius="md">
                      <Flex justify="space-between" align="center" mb={2}>
                        <HStack>
                          <Heading size="sm">{course.title}</Heading>
                          {course.badge && (
                            <Badge colorScheme={course.badge === 'New' ? 'green' : 'blue'}>
                              {course.badge}
                            </Badge>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="gray.500">Progress: {course.progress}%</Text>
                      </Flex>
                      <Progress value={course.progress} size="sm" colorScheme="blue" mb={2} borderRadius="full" />
                      <Flex justify="space-between" align="center" mt={2}>
                        <Text fontSize="sm">Next: {course.nextLesson}</Text>
                        <Button size="xs" colorScheme="blue">Continue</Button>
                      </Flex>
                    </Box>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </GridItem>

          {/* Right Column - Exams & Activities */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              {/* Upcoming Exams */}
              <Card
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="md"
                borderRadius="lg"
              >
                <CardHeader>
                  <HStack>
                    <Icon as={FaClock} color="purple.500" boxSize={5} />
                    <Heading size="md">Upcoming Exams</Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    {upcomingExams.map(exam => (
                      <Box key={exam.id} p={3} bg="purple.50" borderRadius="md">
                        <Heading size="sm" mb={1}>{exam.title}</Heading>
                        <Flex justify="space-between" color="gray.600">
                          <Text fontSize="sm">{exam.date}</Text>
                          <Text fontSize="sm">{exam.time}</Text>
                        </Flex>
                      </Box>
                    ))}
                    <Button size="sm" colorScheme="purple" variant="outline" w="full">
                      View All Exams
                    </Button>
                  </Stack>
                </CardBody>
              </Card>

              {/* Recent Activities */}
              <Card
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="md"
                borderRadius="lg"
              >
                <CardHeader>
                  <HStack>
                    <Icon as={FaTasks} color="green.500" boxSize={5} />
                    <Heading size="md">Recent Activities</Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    {recentActivities.map(activity => (
                      <Box key={activity.id} p={3} borderBottom="1px" borderColor="gray.100">
                        <Flex justify="space-between" align="center">
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">{activity.title}</Text>
                            <Text fontSize="sm" color="gray.500">{activity.time}</Text>
                          </VStack>
                          {activity.score && (
                            <Badge 
                              colorScheme={
                                activity.score === 'Pending' ? 'yellow' : 
                                parseInt(activity.score) > 80 ? 'green' : 
                                parseInt(activity.score) > 60 ? 'blue' : 'orange'
                              }
                            >
                              {activity.score}
                            </Badge>
                          )}
                        </Flex>
                      </Box>
                    ))}
                    <Button size="sm" colorScheme="green" variant="outline" w="full">
                      View All Activities
                    </Button>
                  </Stack>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDashboard; 