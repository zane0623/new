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
  AvatarBadge,
  Select,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import { 
  FaBook, 
  FaCalendarAlt, 
  FaChartLine, 
  FaClock, 
  FaGraduationCap, 
  FaRegBell, 
  FaTasks, 
  FaTrophy,
  FaUserGraduate,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaChalkboardTeacher
} from 'react-icons/fa';

const ParentDashboard = () => {
  // Mock data - would come from API in a real application
  const [selectedChild, setSelectedChild] = useState('alex');
  
  const children = {
    alex: {
      name: 'Alex Johnson',
      grade: '10th Grade',
      avatar: '',
      courses: 4,
      overallGrade: 'B+',
      progress: 68,
      streak: 7,
      attendance: 92,
      nextExam: 'Mathematics - May 15, 2024',
      alerts: 2
    },
    emma: {
      name: 'Emma Johnson',
      grade: '8th Grade',
      avatar: '',
      courses: 3,
      overallGrade: 'A-',
      progress: 81,
      streak: 12,
      attendance: 96,
      nextExam: 'Biology - May 22, 2024',
      alerts: 0
    }
  };
  
  const childData = children[selectedChild];

  // Mock enrolled courses for the selected child
  const enrolledCourses = {
    alex: [
      { id: 1, title: 'Mathematics (0580)', progress: 75, grade: 'B', lastActivity: '2 days ago' },
      { id: 2, title: 'Physics (0625)', progress: 62, grade: 'C+', lastActivity: '5 days ago' },
      { id: 3, title: 'Biology (0610)', progress: 88, grade: 'A', lastActivity: 'Yesterday' },
      { id: 4, title: 'Chemistry (0620)', progress: 45, grade: 'B-', lastActivity: '1 week ago' }
    ],
    emma: [
      { id: 1, title: 'Mathematics (0580)', progress: 82, grade: 'A-', lastActivity: '1 day ago' },
      { id: 2, title: 'English (0500)', progress: 75, grade: 'B+', lastActivity: '3 days ago' },
      { id: 3, title: 'Geography (0460)', progress: 92, grade: 'A', lastActivity: 'Yesterday' }
    ]
  }[selectedChild];

  const upcomingExams = {
    alex: [
      { id: 1, title: 'Mathematics Mock Exam', date: 'May 15, 2024', time: '10:00 AM', readiness: 'Medium' },
      { id: 2, title: 'Physics Unit Test', date: 'May 22, 2024', time: '2:00 PM', readiness: 'Low' }
    ],
    emma: [
      { id: 1, title: 'Biology Mid-Term', date: 'May 22, 2024', time: '9:00 AM', readiness: 'High' },
      { id: 2, title: 'Geography Project Due', date: 'June 5, 2024', time: '3:00 PM', readiness: 'Medium' }
    ]
  }[selectedChild];

  const recentActivities = {
    alex: [
      { id: 1, title: 'Completed Mathematics Quiz', time: '2 days ago', score: '75%' },
      { id: 2, title: 'Watched Physics Lecture', time: '5 days ago', score: '' },
      { id: 3, title: 'Submitted Biology Assignment', time: '1 week ago', score: 'B+' },
      { id: 4, title: 'Missed Chemistry Homework', time: '2 weeks ago', score: '', type: 'alert' }
    ],
    emma: [
      { id: 1, title: 'Completed English Essay', time: '1 day ago', score: 'A-' },
      { id: 2, title: 'Geography Map Quiz', time: '3 days ago', score: '92%' },
      { id: 3, title: 'Mathematics Practice Test', time: '4 days ago', score: '85%' }
    ]
  }[selectedChild];

  const teacherContacts = {
    alex: [
      { id: 1, name: 'Dr. Sarah Williams', subject: 'Mathematics', email: 'swilliams@school.edu', phone: '+1-555-123-4567' },
      { id: 2, name: 'Mr. Robert Chen', subject: 'Physics', email: 'rchen@school.edu', phone: '+1-555-234-5678' },
      { id: 3, name: 'Ms. Ava Rodriguez', subject: 'Biology', email: 'arodriguez@school.edu', phone: '+1-555-345-6789' },
      { id: 4, name: 'Dr. James Parker', subject: 'Chemistry', email: 'jparker@school.edu', phone: '+1-555-456-7890' }
    ],
    emma: [
      { id: 1, name: 'Ms. Lisa Thompson', subject: 'Mathematics', email: 'lthompson@school.edu', phone: '+1-555-567-8901' },
      { id: 2, name: 'Mr. Daniel Brooks', subject: 'English', email: 'dbrooks@school.edu', phone: '+1-555-678-9012' },
      { id: 3, name: 'Dr. Olivia Martin', subject: 'Geography', email: 'omartin@school.edu', phone: '+1-555-789-0123' }
    ]
  }[selectedChild];

  const getReadinessColor = (readiness) => {
    switch(readiness) {
      case 'High': return 'green';
      case 'Medium': return 'orange';
      case 'Low': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
      <Container maxW="container.xl">
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="xl" mb={2} color={useColorModeValue('gray.800', 'white')}>
              Parent Dashboard
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Monitor your children's academic progress and activities
            </Text>
          </Box>
          <Flex align="center">
            <Box mr={4} position="relative">
              <Icon as={FaRegBell} boxSize={6} color="gray.400" cursor="pointer" />
              {childData.alerts > 0 && (
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
                  <Text fontSize="xs" fontWeight="bold" color="white">{childData.alerts}</Text>
                </Box>
              )}
            </Box>
            <Avatar name="Parent User" size="md">
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
          </Flex>
        </Flex>

        {/* Child Selector */}
        <Card mb={8} bg={useColorModeValue('white', 'gray.800')} boxShadow="md" borderRadius="lg">
          <CardBody>
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              justify="space-between" 
              align={{ base: 'flex-start', md: 'center' }}
              gap={4}
            >
              <HStack>
                <Icon as={FaUserGraduate} boxSize={6} color="blue.500" />
                <Text fontWeight="bold">Select Child:</Text>
              </HStack>
              <Select 
                value={selectedChild} 
                onChange={(e) => setSelectedChild(e.target.value)}
                maxW={{ base: 'full', md: '300px' }}
              >
                <option value="alex">Alex Johnson (10th Grade)</option>
                <option value="emma">Emma Johnson (8th Grade)</option>
              </Select>
              <HStack spacing={4}>
                <Badge colorScheme="blue">{childData.grade}</Badge>
                <Badge colorScheme="purple">{childData.courses} Courses</Badge>
                <Badge colorScheme="green">Grade: {childData.overallGrade}</Badge>
              </HStack>
            </Flex>
          </CardBody>
        </Card>

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
                    <StatLabel color="gray.500">Overall Grade</StatLabel>
                    <StatNumber>{childData.overallGrade}</StatNumber>
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
                    <StatLabel color="gray.500">Attendance</StatLabel>
                    <StatNumber>{childData.attendance}%</StatNumber>
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
                    <StatNumber>{childData.progress}%</StatNumber>
                    <Progress value={childData.progress} size="sm" colorScheme="green" mt={2} borderRadius="full" />
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
                    <StatNumber>{childData.streak} days</StatNumber>
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
          {/* Left Column - Courses & Teachers */}
          <GridItem>
            <Tabs colorScheme="blue" variant="enclosed" mb={8}>
              <TabList>
                <Tab>Enrolled Courses</Tab>
                <Tab>Teacher Contacts</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel px={0}>
                  <Card
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="md"
                    borderRadius="lg"
                  >
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Icon as={FaBook} color="blue.500" boxSize={5} />
                          <Heading size="md">{childData.name}'s Courses</Heading>
                        </HStack>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Course</Th>
                            <Th>Progress</Th>
                            <Th>Current Grade</Th>
                            <Th>Last Activity</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {enrolledCourses.map(course => (
                            <Tr key={course.id}>
                              <Td fontWeight="medium">{course.title}</Td>
                              <Td>
                                <Flex align="center">
                                  <Progress 
                                    value={course.progress} 
                                    size="sm" 
                                    colorScheme="blue" 
                                    borderRadius="full"
                                    width="100px"
                                    mr={2}
                                  />
                                  <Text fontSize="xs">{course.progress}%</Text>
                                </Flex>
                              </Td>
                              <Td>
                                <Badge 
                                  colorScheme={
                                    course.grade.startsWith('A') ? 'green' : 
                                    course.grade.startsWith('B') ? 'blue' : 
                                    course.grade.startsWith('C') ? 'yellow' : 'red'
                                  }
                                >
                                  {course.grade}
                                </Badge>
                              </Td>
                              <Td fontSize="sm">{course.lastActivity}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                      <Flex justify="flex-end" mt={4}>
                        <Button size="sm" colorScheme="blue" variant="outline">View Detailed Reports</Button>
                      </Flex>
                    </CardBody>
                  </Card>
                </TabPanel>
                
                <TabPanel px={0}>
                  <Card
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="md"
                    borderRadius="lg"
                  >
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Icon as={FaChalkboardTeacher} color="blue.500" boxSize={5} />
                          <Heading size="md">Teacher Contacts</Heading>
                        </HStack>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Teacher</Th>
                            <Th>Subject</Th>
                            <Th>Contact Information</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {teacherContacts.map(teacher => (
                            <Tr key={teacher.id}>
                              <Td fontWeight="medium">{teacher.name}</Td>
                              <Td>{teacher.subject}</Td>
                              <Td>
                                <HStack spacing={4}>
                                  <Flex align="center">
                                    <Icon as={FaEnvelope} color="blue.500" mr={1} />
                                    <Text fontSize="sm">{teacher.email}</Text>
                                  </Flex>
                                  <Text fontSize="sm" color="gray.500">|</Text>
                                  <Flex align="center">
                                    <Icon as={FaPhone} color="green.500" mr={1} />
                                    <Text fontSize="sm">{teacher.phone}</Text>
                                  </Flex>
                                </HStack>
                              </Td>
                              <Td>
                                <Button size="xs" colorScheme="blue">Message</Button>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </TabPanel>
              </TabPanels>
            </Tabs>
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
                        <Flex justify="space-between" align="center" mb={1}>
                          <Heading size="sm">{exam.title}</Heading>
                          <Badge colorScheme={getReadinessColor(exam.readiness)}>
                            {exam.readiness} Readiness
                          </Badge>
                        </Flex>
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
                      <Box 
                        key={activity.id} 
                        p={3} 
                        borderBottom="1px" 
                        borderColor="gray.100"
                        bg={activity.type === 'alert' ? 'red.50' : 'transparent'}
                        borderRadius="md"
                      >
                        <Flex justify="space-between" align="center">
                          <VStack align="start" spacing={0}>
                            <Flex align="center">
                              {activity.type === 'alert' && (
                                <Icon as={FaExclamationTriangle} color="red.500" mr={2} />
                              )}
                              <Text fontWeight="medium">{activity.title}</Text>
                            </Flex>
                            <Text fontSize="sm" color="gray.500">{activity.time}</Text>
                          </VStack>
                          {activity.score && (
                            <Badge 
                              colorScheme={
                                activity.score.includes('A') ? 'green' : 
                                activity.score.includes('B') ? 'blue' : 
                                activity.score.includes('C') ? 'yellow' : 
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

              {/* Parent Actions */}
              <Card
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="md"
                borderRadius="lg"
              >
                <CardHeader>
                  <HStack>
                    <Icon as={FaUserGraduate} color="blue.500" boxSize={5} />
                    <Heading size="md">Parent Actions</Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Stack spacing={3}>
                    <Button colorScheme="blue" leftIcon={<Icon as={FaCalendarAlt} />}>
                      Schedule Parent-Teacher Meeting
                    </Button>
                    <Button colorScheme="purple" leftIcon={<Icon as={FaBook} />}>
                      View Curriculum Plan
                    </Button>
                    <Button colorScheme="green" leftIcon={<Icon as={FaEnvelope} />}>
                      Message All Teachers
                    </Button>
                    <Button colorScheme="orange" leftIcon={<Icon as={FaChartLine} />}>
                      View Progress Report
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

export default ParentDashboard; 