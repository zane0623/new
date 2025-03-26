import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  List,
  ListItem,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tag,
  Text,
  VStack,
  Divider,
  HStack,
  Badge,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { 
  FiBookOpen, 
  FiClock, 
  FiBarChart2, 
  FiUser, 
  FiCalendar, 
  FiTrendingUp, 
  FiAlertCircle, 
  FiRepeat, 
  FiClock as FiClockOutline, 
  FiPlayCircle, 
  FiCheckCircle,
  FiMoreVertical,
  FiInfo
} from 'react-icons/fi';

// Mock data for dashboard
const mockStats = [
  { 
    id: 1, 
    label: 'Completed Exams', 
    value: '12', 
    icon: FiBookOpen, 
    color: 'green.500',
    helpText: '3 in the last week',
  },
  { 
    id: 2, 
    label: 'Study Hours', 
    value: '28', 
    icon: FiClock, 
    color: 'blue.500',
    helpText: 'This month',
  },
  { 
    id: 3, 
    label: 'Average Score', 
    value: '82%', 
    icon: FiBarChart2, 
    color: 'purple.500',
    helpText: 'Across all subjects',
  },
  { 
    id: 4, 
    label: 'Days to Exam', 
    value: '48', 
    icon: FiCalendar, 
    color: 'red.500',
    helpText: 'First scheduled exam',
  },
];

// Mock error tracking data
const mockErrorTracking = [
  {
    id: 1,
    subject: 'Mathematics',
    concept: 'Integration by Parts',
    frequency: 5,
    lastEncountered: '2 days ago',
    status: 'needs review',
    reviewDate: 'Tomorrow',
  },
  {
    id: 2,
    subject: 'Physics',
    concept: 'Conservation of Angular Momentum',
    frequency: 3,
    lastEncountered: '1 week ago',
    status: 'in progress',
    reviewDate: 'Today',
  },
  {
    id: 3,
    subject: 'Chemistry',
    concept: 'Organic Compound Naming',
    frequency: 7,
    lastEncountered: 'Yesterday',
    status: 'needs review',
    reviewDate: 'In 3 days',
  },
  {
    id: 4,
    subject: 'Mathematics',
    concept: 'Trigonometric Substitution',
    frequency: 4,
    lastEncountered: '3 days ago',
    status: 'mastered',
    reviewDate: 'Completed',
  },
];

// Mock time management data
const mockTimeBlocks = [
  {
    id: 1,
    title: 'Review Mathematics Errors',
    duration: 15,
    priority: 'high',
    status: 'pending',
    scheduledFor: 'Today, 4:00 PM',
  },
  {
    id: 2,
    title: 'Physics Practice Problems',
    duration: 25,
    priority: 'medium',
    status: 'pending',
    scheduledFor: 'Today, 4:30 PM',
  },
  {
    id: 3,
    title: 'Break',
    duration: 5,
    priority: 'low',
    status: 'pending',
    scheduledFor: 'Today, 5:00 PM',
  },
  {
    id: 4,
    title: 'Chemistry Formula Review',
    duration: 15,
    priority: 'high',
    status: 'pending',
    scheduledFor: 'Today, 5:10 PM',
  },
];

// AI Insights
const mockAIInsights = [
  {
    id: 1,
    type: 'improvement',
    message: 'Your performance in Geometry has improved by 15% this week. Keep it up!',
    actionable: false,
  },
  {
    id: 2,
    type: 'suggestion',
    message: 'You\'re still struggling with Organic Chemistry naming. Consider dedicating 20 minutes to review this tomorrow.',
    actionable: true,
    action: 'Schedule 20 min',
  },
  {
    id: 3,
    type: 'time',
    message: 'You tend to perform better in morning study sessions. Consider scheduling difficult topics before noon.',
    actionable: false,
  },
  {
    id: 4,
    type: 'error',
    message: 'Common error pattern detected in Conservation of Energy problems. View specialized practice set.',
    actionable: true,
    action: 'View practice',
  },
];

const mockSubjects = [
  { 
    id: 1, 
    name: 'Mathematics', 
    progress: 78, 
    lastActivity: 'Completed Chapter 4 Quiz', 
    lastActivityDate: '2 days ago',
    nextExam: 'Advanced Calculus',
    examDate: 'May 15, 2023',
  },
  { 
    id: 2, 
    name: 'Physics', 
    progress: 65, 
    lastActivity: 'Reviewed Force and Motion', 
    lastActivityDate: '5 days ago',
    nextExam: 'Electricity & Magnetism',
    examDate: 'May 20, 2023',
  },
  { 
    id: 3, 
    name: 'English Literature', 
    progress: 92, 
    lastActivity: 'Essay on Shakespeare', 
    lastActivityDate: 'Yesterday',
    nextExam: 'Poetry Analysis',
    examDate: 'May 12, 2023',
  },
  { 
    id: 4, 
    name: 'Chemistry', 
    progress: 45, 
    lastActivity: 'Practice on Periodic Table', 
    lastActivityDate: '1 week ago',
    nextExam: 'Organic Chemistry',
    examDate: 'May 25, 2023',
  },
];

const mockRecentActivity = [
  { 
    id: 1, 
    type: 'exam', 
    subject: 'Mathematics', 
    title: 'Algebra Practice Test', 
    score: 85, 
    date: 'Today',
  },
  { 
    id: 2, 
    type: 'quiz', 
    subject: 'Physics', 
    title: 'Newton\'s Laws Quiz', 
    score: 70, 
    date: 'Yesterday',
  },
  { 
    id: 3, 
    type: 'study', 
    subject: 'English Literature', 
    title: 'Poetry Terms Study Session', 
    duration: '45 min', 
    date: 'Yesterday',
  },
  { 
    id: 4, 
    type: 'exam', 
    subject: 'Chemistry', 
    title: 'Chemical Bonding Test', 
    score: 92, 
    date: '3 days ago',
  },
  { 
    id: 5, 
    type: 'study', 
    subject: 'Mathematics', 
    title: 'Trigonometry Review', 
    duration: '60 min', 
    date: '4 days ago',
  },
];

const mockUpcomingExams = [
  { 
    id: 1, 
    subject: 'Mathematics', 
    title: 'Advanced Calculus', 
    date: 'May 15, 2023', 
    timeLeft: '14 days',
    difficulty: 'Hard',
  },
  { 
    id: 2, 
    subject: 'English Literature', 
    title: 'Poetry Analysis', 
    date: 'May 12, 2023', 
    timeLeft: '11 days',
    difficulty: 'Medium',
  },
  { 
    id: 3, 
    subject: 'Physics', 
    title: 'Electricity & Magnetism', 
    date: 'May 20, 2023', 
    timeLeft: '19 days',
    difficulty: 'Hard',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [activeTab, setActiveTab] = useState(0);

  const handleStartExam = (subject) => {
    navigate('/student/exams', { state: { selectedSubject: subject } });
  };

  const startPomodoroSession = (timeBlock) => {
    // This would start a Pomodoro timer and track the study session
    console.log(`Starting Pomodoro session for: ${timeBlock.title}`);
  };

  const scheduleErrorReview = (error) => {
    // This would schedule a review session for the specific error
    console.log(`Scheduling review for: ${error.concept}`);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2}>
          Welcome back, {user?.name || 'Student'}
        </Heading>
        <Text color="gray.500">
          Track your progress and prepare for your upcoming exams
        </Text>
      </Box>

      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {mockStats.map((stat) => (
          <Card key={stat.id} bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm">
            <CardBody>
              <Flex align="center">
                <Box
                  p={3}
                  borderRadius="full"
                  bg={stat.color}
                  color="white"
                  mr={4}
                >
                  <Icon as={stat.icon} boxSize={6} />
                </Box>
                <Stat>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatNumber>{stat.value}</StatNumber>
                  <StatHelpText>{stat.helpText}</StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* AI Insights Banner */}
      <Card 
        bg="blue.50" 
        color="blue.800" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="blue.200" 
        shadow="sm" 
        mb={8}
        display={{ base: activeTab === 0 ? 'block' : 'none', lg: 'block' }}
      >
        <CardBody>
          <Flex align="center" mb={2}>
            <Icon as={FiInfo} mr={2} boxSize={5} />
            <Heading size="sm">AI Insight</Heading>
          </Flex>
          <Text fontWeight="medium">{mockAIInsights[0].message}</Text>
        </CardBody>
      </Card>

      {/* Main Dashboard Tabs */}
      <Tabs 
        isFitted 
        variant="enclosed" 
        colorScheme="blue" 
        onChange={(index) => setActiveTab(index)}
        mb={8}
      >
        <TabList mb="1em">
          <Tab>Overview</Tab>
          <Tab>Error Management</Tab>
          <Tab>Time Management</Tab>
          <Tab>AI Insights</Tab>
        </TabList>
        
        <TabPanels>
          {/* Overview Tab */}
          <TabPanel p={0}>
            {/* Main Dashboard Content */}
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
              {/* Left Column - Subjects */}
              <GridItem>
                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm" mb={8}>
                  <CardHeader pb={0}>
                    <Heading as="h2" size="md">
                      Your Subjects
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {mockSubjects.map((subject) => (
                        <Box 
                          key={subject.id} 
                          p={4} 
                          borderWidth="1px" 
                          borderColor={borderColor}
                          borderRadius="md"
                          _hover={{ shadow: 'md' }}
                          transition="all 0.2s"
                        >
                          <Flex justify="space-between" align="center" mb={3}>
                            <Heading as="h3" size="sm">{subject.name}</Heading>
                            <HStack>
                              <Text fontSize="sm" color="gray.500">Progress:</Text>
                              <Badge colorScheme={
                                subject.progress >= 80 ? 'green' : 
                                subject.progress >= 60 ? 'blue' : 
                                subject.progress >= 40 ? 'yellow' : 'red'
                              }>
                                {subject.progress}%
                              </Badge>
                            </HStack>
                          </Flex>
                          
                          <Progress 
                            value={subject.progress} 
                            size="sm" 
                            colorScheme={
                              subject.progress >= 80 ? 'green' : 
                              subject.progress >= 60 ? 'blue' : 
                              subject.progress >= 40 ? 'yellow' : 'red'
                            } 
                            mb={3} 
                            borderRadius="full"
                          />
                          
                          <Flex justify="space-between" fontSize="sm" mb={3}>
                            <Text color="gray.600">
                              Last activity: {subject.lastActivity}
                              <Text as="span" color="gray.500" ml={1}>
                                ({subject.lastActivityDate})
                              </Text>
                            </Text>
                          </Flex>
                          
                          <Flex justify="space-between" fontSize="sm" mb={4}>
                            <Text color="gray.600">
                              Next exam: {subject.nextExam}
                              <Text as="span" color="gray.500" ml={1}>
                                ({subject.examDate})
                              </Text>
                            </Text>
                          </Flex>
                          
                          <Button 
                            colorScheme="blue" 
                            size="sm" 
                            width="full"
                            onClick={() => handleStartExam(subject.name)}
                          >
                            Practice Now
                          </Button>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>

              {/* Right Column - Activity & Upcoming */}
              <GridItem>
                {/* Recent Activity */}
                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm" mb={8}>
                  <CardHeader pb={0}>
                    <Heading as="h2" size="md">
                      Recent Activity
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <List spacing={3}>
                      {mockRecentActivity.map((activity) => (
                        <ListItem key={activity.id}>
                          <Flex align="center">
                            <Tag 
                              size="md" 
                              colorScheme={
                                activity.type === 'exam' ? 'red' : 
                                activity.type === 'quiz' ? 'orange' : 'green'
                              }
                              mr={3}
                            >
                              {activity.type.toUpperCase()}
                            </Tag>
                            <Box flex="1">
                              <Text fontWeight="medium">
                                {activity.title}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {activity.subject} • {activity.date}
                              </Text>
                            </Box>
                            {activity.score && (
                              <Badge colorScheme={
                                activity.score >= 80 ? 'green' : 
                                activity.score >= 70 ? 'blue' : 
                                activity.score >= 60 ? 'yellow' : 'red'
                              }>
                                {activity.score}%
                              </Badge>
                            )}
                            {activity.duration && (
                              <Badge colorScheme="green">
                                {activity.duration}
                              </Badge>
                            )}
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  </CardBody>
                </Card>

                {/* Upcoming Exams */}
                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm">
                  <CardHeader pb={0}>
                    <Heading as="h2" size="md">
                      Upcoming Exams
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <List spacing={3}>
                      {mockUpcomingExams.map((exam) => (
                        <ListItem key={exam.id}>
                          <Box 
                            p={3} 
                            borderWidth="1px" 
                            borderColor={borderColor}
                            borderRadius="md"
                          >
                            <Flex justify="space-between" align="center" mb={1}>
                              <Heading as="h3" size="sm">{exam.title}</Heading>
                              <Badge colorScheme={
                                exam.difficulty === 'Easy' ? 'green' : 
                                exam.difficulty === 'Medium' ? 'yellow' : 'red'
                              }>
                                {exam.difficulty}
                              </Badge>
                            </Flex>
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              {exam.subject} • {exam.date}
                            </Text>
                            <HStack>
                              <Icon as={FiClock} color="red.500" />
                              <Text fontSize="sm" color="red.500" fontWeight="medium">
                                {exam.timeLeft} remaining
                              </Text>
                            </HStack>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </TabPanel>

          {/* Error Management Tab */}
          <TabPanel p={0}>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm" mb={6}>
              <CardHeader>
                <Heading as="h2" size="md">Error Management System</Heading>
                <Text color="gray.500" mt={1}>Track and review your mistakes to turn them into learning opportunities</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {mockErrorTracking.map((error) => (
                    <Box 
                      key={error.id} 
                      p={4} 
                      borderWidth="1px" 
                      borderColor={borderColor}
                      borderRadius="md"
                      _hover={{ shadow: 'md' }}
                      transition="all 0.2s"
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <HStack>
                          <Icon 
                            as={FiAlertCircle} 
                            color={
                              error.status === 'needs review' ? 'red.500' : 
                              error.status === 'in progress' ? 'yellow.500' : 'green.500'
                            }
                            boxSize={5}
                          />
                          <Heading as="h3" size="sm">{error.concept}</Heading>
                        </HStack>
                        <Badge colorScheme={
                          error.status === 'needs review' ? 'red' : 
                          error.status === 'in progress' ? 'yellow' : 'green'
                        }>
                          {error.status === 'needs review' ? 'Needs Review' : 
                           error.status === 'in progress' ? 'In Progress' : 'Mastered'}
                        </Badge>
                      </Flex>
                      
                      <Text fontSize="sm" color="gray.600" mb={3}>
                        <strong>Subject:</strong> {error.subject} • <strong>Frequency:</strong> {error.frequency} times • <strong>Last seen:</strong> {error.lastEncountered}
                      </Text>
                      
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Icon as={FiCalendar} color="blue.500" />
                          <Text fontSize="sm" color="blue.500">
                            Next review: {error.reviewDate}
                          </Text>
                        </HStack>
                        
                        <HStack>
                          <Tooltip label="Schedule Review Session">
                            <IconButton
                              icon={<FiClock />}
                              size="sm"
                              variant="ghost"
                              colorScheme="blue"
                              aria-label="Schedule review"
                              onClick={() => scheduleErrorReview(error)}
                            />
                          </Tooltip>
                          
                          <Tooltip label="Mark as Reviewed">
                            <IconButton
                              icon={<FiCheckCircle />}
                              size="sm"
                              variant="ghost"
                              colorScheme="green"
                              aria-label="Mark as reviewed"
                              isDisabled={error.status === 'mastered'}
                            />
                          </Tooltip>
                          
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<FiMoreVertical />}
                              variant="ghost"
                              size="sm"
                            />
                            <MenuList>
                              <MenuItem>View details</MenuItem>
                              <MenuItem>Practice similar questions</MenuItem>
                              <MenuItem>View explanation</MenuItem>
                              <MenuItem>Adjust priority</MenuItem>
                            </MenuList>
                          </Menu>
                        </HStack>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Time Management Tab */}
          <TabPanel p={0}>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm" mb={6}>
              <CardHeader>
                <Heading as="h2" size="md">Time Management</Heading>
                <Text color="gray.500" mt={1}>Optimize your study time with focused micro-sessions</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {mockTimeBlocks.map((timeBlock) => (
                    <Box 
                      key={timeBlock.id} 
                      p={4} 
                      borderWidth="1px" 
                      borderColor={borderColor}
                      borderRadius="md"
                      _hover={{ shadow: 'md' }}
                      transition="all 0.2s"
                      bg={timeBlock.id === 3 ? 'gray.50' : cardBg}
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <HStack>
                          <Icon 
                            as={timeBlock.id === 3 ? FiClock : FiClockOutline} 
                            color={
                              timeBlock.priority === 'high' ? 'red.500' : 
                              timeBlock.priority === 'medium' ? 'orange.500' : 'blue.500'
                            }
                            boxSize={5}
                          />
                          <Heading as="h3" size="sm">{timeBlock.title}</Heading>
                        </HStack>
                        <Badge colorScheme={
                          timeBlock.priority === 'high' ? 'red' : 
                          timeBlock.priority === 'medium' ? 'orange' : 'blue'
                        }>
                          {timeBlock.duration} min
                        </Badge>
                      </Flex>
                      
                      <Flex justify="space-between" align="center" mt={4}>
                        <Text fontSize="sm" color="gray.600">
                          {timeBlock.scheduledFor}
                        </Text>
                        
                        <HStack>
                          <Tooltip label="Start Pomodoro Timer">
                            <IconButton
                              icon={<FiPlayCircle />}
                              size="sm"
                              colorScheme="green"
                              aria-label="Start timer"
                              onClick={() => startPomodoroSession(timeBlock)}
                            />
                          </Tooltip>
                          
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<FiMoreVertical />}
                              variant="ghost"
                              size="sm"
                            />
                            <MenuList>
                              <MenuItem>Reschedule</MenuItem>
                              <MenuItem>Change duration</MenuItem>
                              <MenuItem>Edit details</MenuItem>
                              <MenuItem>Remove</MenuItem>
                            </MenuList>
                          </Menu>
                        </HStack>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
                
                <Button colorScheme="blue" mt={4} leftIcon={<FiClock />} w="full">
                  Create New Time Block
                </Button>
              </CardBody>
            </Card>
          </TabPanel>

          {/* AI Insights Tab */}
          <TabPanel p={0}>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm" mb={6}>
              <CardHeader>
                <Heading as="h2" size="md">AI-Powered Insights</Heading>
                <Text color="gray.500" mt={1}>Personalized recommendations to improve your performance</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {mockAIInsights.map((insight) => (
                    <Box 
                      key={insight.id} 
                      p={4} 
                      borderWidth="1px" 
                      borderColor="blue.200"
                      borderRadius="md"
                      bg="blue.50"
                      _hover={{ shadow: 'md' }}
                      transition="all 0.2s"
                    >
                      <Flex justify="space-between" align="flex-start" mb={2}>
                        <HStack align="flex-start">
                          <Icon 
                            as={
                              insight.type === 'improvement' ? FiTrendingUp :
                              insight.type === 'suggestion' ? FiInfo :
                              insight.type === 'time' ? FiClock : FiAlertCircle
                            } 
                            color="blue.500"
                            boxSize={5}
                            mt={0.5}
                          />
                          <Text color="blue.800" fontWeight="medium">
                            {insight.message}
                          </Text>
                        </HStack>
                      </Flex>
                      
                      {insight.actionable && (
                        <Flex justify="flex-end" mt={3}>
                          <Button 
                            size="sm" 
                            colorScheme="blue" 
                            variant="solid"
                          >
                            {insight.action}
                          </Button>
                        </Flex>
                      )}
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Dashboard; 