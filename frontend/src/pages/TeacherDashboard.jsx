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
  Td,
  Input,
  InputGroup,
  InputLeftElement
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
  FaChalkboardTeacher,
  FaClipboardList,
  FaUserFriends,
  FaPencilAlt,
  FaSearch,
  FaFileAlt,
  FaPlus
} from 'react-icons/fa';

const TeacherDashboard = () => {
  // Mock data - would come from API in a real application
  const [selectedCourse, setSelectedCourse] = useState('math');
  
  const teacherData = {
    name: 'Dr. Sarah Williams',
    role: 'Mathematics Teacher',
    avatar: '',
    courses: 3,
    totalStudents: 87,
    upcomingClasses: 2,
    pendingGrading: 15,
    notifications: 4
  };
  
  // Mock courses taught by this teacher
  const courses = {
    math: {
      id: 'math',
      title: 'Mathematics (0580)',
      grade: '10th Grade',
      students: 32,
      avgPerformance: 76,
      lastClass: 'Monday, 10:00',
      nextClass: 'Wednesday, 10:00',
      pendingAssignments: 8,
      units: [
        { id: 1, title: 'Algebra II', completion: 85 },
        { id: 2, title: 'Geometry', completion: 60 },
        { id: 3, title: 'Calculus Basics', completion: 40 },
        { id: 4, title: 'Statistics', completion: 0 }
      ]
    },
    physics: {
      id: 'physics',
      title: 'Physics (0625)',
      grade: '11th Grade',
      students: 28,
      avgPerformance: 72,
      lastClass: 'Tuesday, 14:00',
      nextClass: 'Thursday, 14:00',
      pendingAssignments: 5,
      units: [
        { id: 1, title: 'Mechanics', completion: 90 },
        { id: 2, title: 'Electricity', completion: 75 },
        { id: 3, title: 'Waves', completion: 50 },
        { id: 4, title: 'Nuclear Physics', completion: 10 }
      ]
    },
    chemistry: {
      id: 'chemistry',
      title: 'Chemistry (0620)',
      grade: '9th Grade',
      students: 27,
      avgPerformance: 81,
      lastClass: 'Monday, 13:00',
      nextClass: 'Friday, 11:00',
      pendingAssignments: 2,
      units: [
        { id: 1, title: 'Periodic Table', completion: 100 },
        { id: 2, title: 'Chemical Bonding', completion: 80 },
        { id: 3, title: 'Organic Chemistry', completion: 30 },
        { id: 4, title: 'Analytical Chemistry', completion: 0 }
      ]
    }
  };

  const selectedCourseData = courses[selectedCourse];

  // Mock upcoming schedule
  const upcomingSchedule = [
    { id: 1, title: 'Mathematics (10th Grade)', type: 'Class', date: 'Wednesday, 15 May', time: '10:00 - 11:30', location: 'Room 203' },
    { id: 2, title: 'Physics (11th Grade)', type: 'Lab Session', date: 'Thursday, 16 May', time: '14:00 - 15:30', location: 'Physics Lab' },
    { id: 3, title: 'Chemistry (9th Grade)', type: 'Class', date: 'Friday, 17 May', time: '11:00 - 12:30', location: 'Room 105' },
    { id: 4, title: 'Faculty Meeting', type: 'Meeting', date: 'Friday, 17 May', time: '16:00 - 17:00', location: 'Conference Room' }
  ];

  // Mock student data for the selected course
  const studentPerformance = {
    math: [
      { id: 1, name: 'Alex Johnson', attendance: 95, overallGrade: 'A-', lastAssignment: 88, participation: 'High' },
      { id: 2, name: 'Emma Wilson', attendance: 92, overallGrade: 'B+', lastAssignment: 85, participation: 'Medium' },
      { id: 3, name: 'James Miller', attendance: 88, overallGrade: 'B', lastAssignment: 78, participation: 'High' },
      { id: 4, name: 'Sophia Brown', attendance: 98, overallGrade: 'A', lastAssignment: 95, participation: 'High' },
      { id: 5, name: 'Daniel Taylor', attendance: 85, overallGrade: 'C+', lastAssignment: 72, participation: 'Low' }
    ],
    physics: [
      { id: 1, name: 'Oliver Davis', attendance: 90, overallGrade: 'B+', lastAssignment: 84, participation: 'Medium' },
      { id: 2, name: 'Ava Moore', attendance: 95, overallGrade: 'A', lastAssignment: 92, participation: 'High' },
      { id: 3, name: 'Ethan Anderson', attendance: 82, overallGrade: 'B-', lastAssignment: 76, participation: 'Medium' },
      { id: 4, name: 'Isabella Thomas', attendance: 78, overallGrade: 'C+', lastAssignment: 69, participation: 'Low' },
      { id: 5, name: 'Lucas Jackson', attendance: 93, overallGrade: 'A-', lastAssignment: 88, participation: 'High' }
    ],
    chemistry: [
      { id: 1, name: 'Mia Martinez', attendance: 97, overallGrade: 'A', lastAssignment: 94, participation: 'High' },
      { id: 2, name: 'Noah Harris', attendance: 91, overallGrade: 'B+', lastAssignment: 86, participation: 'Medium' },
      { id: 3, name: 'Charlotte Clark', attendance: 89, overallGrade: 'B', lastAssignment: 82, participation: 'Medium' },
      { id: 4, name: 'Liam Lewis', attendance: 83, overallGrade: 'C+', lastAssignment: 75, participation: 'Low' },
      { id: 5, name: 'Amelia Young', attendance: 94, overallGrade: 'A-', lastAssignment: 89, participation: 'High' }
    ]
  }[selectedCourse];

  // Mock pending assignments
  const pendingAssignments = {
    math: [
      { id: 1, title: 'Quadratic Equations Quiz', type: 'Quiz', dueDate: '12 May 2024', submittedCount: 28, totalCount: 32 },
      { id: 2, title: 'Vectors and Matrices', type: 'Homework', dueDate: '14 May 2024', submittedCount: 25, totalCount: 32 },
      { id: 3, title: 'Mid-Term Test', type: 'Exam', dueDate: '20 May 2024', submittedCount: 0, totalCount: 32 }
    ],
    physics: [
      { id: 1, title: 'Newton\'s Laws Lab Report', type: 'Lab', dueDate: '15 May 2024', submittedCount: 22, totalCount: 28 },
      { id: 2, title: 'Circuit Diagrams', type: 'Homework', dueDate: '18 May 2024', submittedCount: 19, totalCount: 28 }
    ],
    chemistry: [
      { id: 1, title: 'Periodic Table Quiz', type: 'Quiz', dueDate: '14 May 2024', submittedCount: 25, totalCount: 27 },
      { id: 2, title: 'Chemical Reactions Lab', type: 'Lab', dueDate: '19 May 2024', submittedCount: 0, totalCount: 27 }
    ]
  }[selectedCourse];

  // Get participation color
  const getParticipationColor = (participation) => {
    switch(participation) {
      case 'High': return 'green';
      case 'Medium': return 'blue';
      case 'Low': return 'orange';
      default: return 'gray';
    }
  };

  // Get grade color
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'green';
    if (grade.startsWith('B')) return 'blue';
    if (grade.startsWith('C')) return 'yellow';
    return 'red';
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
      <Container maxW="container.xl">
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="xl" mb={2} color={useColorModeValue('gray.800', 'white')}>
              Teacher Dashboard
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Welcome, {teacherData.name}! Manage your courses and students.
            </Text>
          </Box>
          <Flex align="center">
            <Box mr={4} position="relative">
              <Icon as={FaRegBell} boxSize={6} color="gray.400" cursor="pointer" />
              {teacherData.notifications > 0 && (
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
                  <Text fontSize="xs" fontWeight="bold" color="white">{teacherData.notifications}</Text>
                </Box>
              )}
            </Box>
            <Avatar name={teacherData.name} size="md">
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
                    <Icon as={FaBook} boxSize={6} color="blue.500" />
                  </Box>
                  <Box>
                    <StatLabel color="gray.500">Courses</StatLabel>
                    <StatNumber>{teacherData.courses}</StatNumber>
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
                    <Icon as={FaUserGraduate} boxSize={6} color="purple.500" />
                  </Box>
                  <Box>
                    <StatLabel color="gray.500">Students</StatLabel>
                    <StatNumber>{teacherData.totalStudents}</StatNumber>
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
                    <Icon as={FaCalendarAlt} boxSize={6} color="green.500" />
                  </Box>
                  <Box>
                    <StatLabel color="gray.500">Upcoming Classes</StatLabel>
                    <StatNumber>{teacherData.upcomingClasses}</StatNumber>
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
                    <Icon as={FaClipboardList} boxSize={6} color="orange.500" />
                  </Box>
                  <Box>
                    <StatLabel color="gray.500">Pending Grading</StatLabel>
                    <StatNumber>{teacherData.pendingGrading}</StatNumber>
                  </Box>
                </Flex>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Course Selector */}
        <Card mb={8} bg={useColorModeValue('white', 'gray.800')} boxShadow="md" borderRadius="lg">
          <CardBody>
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              justify="space-between" 
              align={{ base: 'flex-start', md: 'center' }}
              gap={4}
            >
              <HStack>
                <Icon as={FaBook} boxSize={6} color="blue.500" />
                <Text fontWeight="bold">Select Course:</Text>
              </HStack>
              <Select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
                maxW={{ base: 'full', md: '300px' }}
              >
                {Object.values(courses).map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title} ({course.grade})
                  </option>
                ))}
              </Select>
              <HStack spacing={4}>
                <Badge colorScheme="blue">{selectedCourseData.students} Students</Badge>
                <Badge colorScheme="green">Avg: {selectedCourseData.avgPerformance}%</Badge>
                <Badge colorScheme="purple">{selectedCourseData.pendingAssignments} Pending</Badge>
              </HStack>
            </Flex>
          </CardBody>
        </Card>

        {/* Main Content Grid */}
        <Grid
          templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
          gap={8}
        >
          {/* Left Column - Students & Assignments */}
          <GridItem>
            <Tabs colorScheme="blue" variant="enclosed" mb={8}>
              <TabList>
                <Tab>Students</Tab>
                <Tab>Assignments</Tab>
                <Tab>Course Content</Tab>
              </TabList>
              
              <TabPanels>
                {/* Students Tab */}
                <TabPanel px={0}>
                  <Card
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="md"
                    borderRadius="lg"
                  >
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Icon as={FaUserGraduate} color="blue.500" boxSize={5} />
                          <Heading size="md">Students in {selectedCourseData.title}</Heading>
                        </HStack>
                        <InputGroup maxW="250px">
                          <InputLeftElement pointerEvents="none">
                            <Icon as={FaSearch} color="gray.300" />
                          </InputLeftElement>
                          <Input placeholder="Search students..." />
                        </InputGroup>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Student</Th>
                            <Th>Attendance</Th>
                            <Th>Overall Grade</Th>
                            <Th>Last Assignment</Th>
                            <Th>Participation</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {studentPerformance.map(student => (
                            <Tr key={student.id}>
                              <Td fontWeight="medium">{student.name}</Td>
                              <Td>
                                <Flex align="center">
                                  <Text mr={2}>{student.attendance}%</Text>
                                  <Badge colorScheme={student.attendance >= 90 ? 'green' : student.attendance >= 80 ? 'yellow' : 'red'}>
                                    {student.attendance >= 90 ? 'Excellent' : student.attendance >= 80 ? 'Good' : 'Poor'}
                                  </Badge>
                                </Flex>
                              </Td>
                              <Td>
                                <Badge colorScheme={getGradeColor(student.overallGrade)}>
                                  {student.overallGrade}
                                </Badge>
                              </Td>
                              <Td>{student.lastAssignment}/100</Td>
                              <Td>
                                <Badge colorScheme={getParticipationColor(student.participation)}>
                                  {student.participation}
                                </Badge>
                              </Td>
                              <Td>
                                <Button size="xs" colorScheme="blue">View Details</Button>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                      <Flex justify="space-between" mt={4}>
                        <Button size="sm" colorScheme="blue" leftIcon={<Icon as={FaFileAlt} />}>
                          Export Report
                        </Button>
                        <Button size="sm" colorScheme="green" leftIcon={<Icon as={FaEnvelope} />}>
                          Contact Parents
                        </Button>
                      </Flex>
                    </CardBody>
                  </Card>
                </TabPanel>
                
                {/* Assignments Tab */}
                <TabPanel px={0}>
                  <Card
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="md"
                    borderRadius="lg"
                  >
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Icon as={FaClipboardList} color="orange.500" boxSize={5} />
                          <Heading size="md">Assignments & Grading</Heading>
                        </HStack>
                        <Button colorScheme="blue" size="sm" leftIcon={<Icon as={FaPlus} />}>
                          New Assignment
                        </Button>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Assignment</Th>
                            <Th>Type</Th>
                            <Th>Due Date</Th>
                            <Th>Submissions</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {pendingAssignments.map(assignment => (
                            <Tr key={assignment.id}>
                              <Td fontWeight="medium">{assignment.title}</Td>
                              <Td>
                                <Badge 
                                  colorScheme={
                                    assignment.type === 'Exam' ? 'purple' : 
                                    assignment.type === 'Quiz' ? 'blue' : 
                                    assignment.type === 'Lab' ? 'green' : 'gray'
                                  }
                                >
                                  {assignment.type}
                                </Badge>
                              </Td>
                              <Td>{assignment.dueDate}</Td>
                              <Td>
                                <Flex align="center">
                                  <Progress 
                                    value={(assignment.submittedCount / assignment.totalCount) * 100} 
                                    size="sm" 
                                    colorScheme="blue" 
                                    borderRadius="full"
                                    width="100px"
                                    mr={2}
                                  />
                                  <Text fontSize="xs">
                                    {assignment.submittedCount}/{assignment.totalCount}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>
                                <HStack spacing={2}>
                                  <Button size="xs" colorScheme="orange" leftIcon={<Icon as={FaPencilAlt} boxSize={3} />}>
                                    Grade
                                  </Button>
                                  <Button size="xs" colorScheme="blue" variant="outline">
                                    Details
                                  </Button>
                                </HStack>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                      <Divider my={4} />
                      <Heading size="xs" mb={4}>Past Assignments</Heading>
                      <Button size="sm" colorScheme="blue" variant="outline" w="full">
                        View All Past Assignments
                      </Button>
                    </CardBody>
                  </Card>
                </TabPanel>
                
                {/* Course Content Tab */}
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
                          <Heading size="md">Course Material & Progress</Heading>
                        </HStack>
                        <Button colorScheme="blue" size="sm" leftIcon={<Icon as={FaPlus} />}>
                          Add Material
                        </Button>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        {selectedCourseData.units.map(unit => (
                          <Box key={unit.id} p={4} bg="gray.50" borderRadius="md">
                            <Flex justify="space-between" align="center" mb={2}>
                              <Heading size="sm">{unit.title}</Heading>
                              <Text fontSize="sm" color="gray.500">
                                {unit.completion}% Complete
                              </Text>
                            </Flex>
                            <Progress 
                              value={unit.completion} 
                              size="sm" 
                              colorScheme="blue" 
                              borderRadius="full" 
                              mb={3}
                            />
                            <Flex justify="flex-end">
                              <HStack spacing={2}>
                                <Button size="xs" colorScheme="blue" variant="outline">
                                  Materials
                                </Button>
                                <Button size="xs" colorScheme="green">
                                  Manage
                                </Button>
                              </HStack>
                            </Flex>
                          </Box>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>

          {/* Right Column - Schedule & Actions */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              {/* Schedule */}
              <Card
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="md"
                borderRadius="lg"
              >
                <CardHeader>
                  <HStack>
                    <Icon as={FaCalendarAlt} color="green.500" boxSize={5} />
                    <Heading size="md">Upcoming Schedule</Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    {upcomingSchedule.map(item => (
                      <Box 
                        key={item.id} 
                        p={3} 
                        bg={
                          item.type === 'Class' ? 'blue.50' : 
                          item.type === 'Lab Session' ? 'green.50' : 
                          item.type === 'Meeting' ? 'purple.50' : 'gray.50'
                        } 
                        borderRadius="md"
                      >
                        <Flex justify="space-between" align="center" mb={1}>
                          <Heading size="sm">{item.title}</Heading>
                          <Badge 
                            colorScheme={
                              item.type === 'Class' ? 'blue' : 
                              item.type === 'Lab Session' ? 'green' : 
                              item.type === 'Meeting' ? 'purple' : 'gray'
                            }
                          >
                            {item.type}
                          </Badge>
                        </Flex>
                        <Flex justify="space-between" align="center" color="gray.600">
                          <Text fontSize="sm">{item.date}</Text>
                          <Text fontSize="sm">{item.time}</Text>
                        </Flex>
                        <Text fontSize="xs" mt={1} color="gray.500">
                          Location: {item.location}
                        </Text>
                      </Box>
                    ))}
                    <Button size="sm" colorScheme="green" variant="outline" w="full">
                      View Full Schedule
                    </Button>
                  </Stack>
                </CardBody>
              </Card>

              {/* Course Analytics */}
              <Card
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="md"
                borderRadius="lg"
              >
                <CardHeader>
                  <HStack>
                    <Icon as={FaChartLine} color="purple.500" boxSize={5} />
                    <Heading size="md">Course Analytics</Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={2} spacing={4} mb={4}>
                    <Stat>
                      <StatLabel>Average Grade</StatLabel>
                      <StatNumber>{selectedCourseData.avgPerformance}%</StatNumber>
                      <StatHelpText>
                        <Badge colorScheme={selectedCourseData.avgPerformance >= 80 ? 'green' : selectedCourseData.avgPerformance >= 70 ? 'blue' : 'yellow'}>
                          {selectedCourseData.avgPerformance >= 80 ? 'Excellent' : selectedCourseData.avgPerformance >= 70 ? 'Good' : 'Fair'}
                        </Badge>
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Attendance Rate</StatLabel>
                      <StatNumber>91%</StatNumber>
                      <StatHelpText>
                        <Badge colorScheme="green">Above Target</Badge>
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Completion Rate</StatLabel>
                      <StatNumber>68%</StatNumber>
                      <StatHelpText>Course Material</StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Participation</StatLabel>
                      <StatNumber>76%</StatNumber>
                      <StatHelpText>Active Students</StatHelpText>
                    </Stat>
                  </SimpleGrid>
                  <Button size="sm" colorScheme="purple" variant="outline" w="full">
                    View Detailed Analytics
                  </Button>
                </CardBody>
              </Card>

              {/* Teacher Actions */}
              <Card
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="md"
                borderRadius="lg"
              >
                <CardHeader>
                  <HStack>
                    <Icon as={FaChalkboardTeacher} color="blue.500" boxSize={5} />
                    <Heading size="md">Quick Actions</Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Stack spacing={3}>
                    <Button colorScheme="blue" leftIcon={<Icon as={FaEnvelope} />}>
                      Message Students
                    </Button>
                    <Button colorScheme="green" leftIcon={<Icon as={FaFileAlt} />}>
                      Create Lesson Plan
                    </Button>
                    <Button colorScheme="purple" leftIcon={<Icon as={FaClipboardList} />}>
                      Create Assessment
                    </Button>
                    <Button colorScheme="orange" leftIcon={<Icon as={FaUserFriends} />}>
                      Schedule Parent Meeting
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

export default TeacherDashboard; 