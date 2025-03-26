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
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { FiBookOpen, FiClock, FiBarChart2, FiUser, FiCalendar, FiTrendingUp } from 'react-icons/fi';

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

  const handleStartExam = (subject) => {
    navigate('/student/exams', { state: { selectedSubject: subject } });
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
                      <Heading as="h3" size="md">
                        {subject.name}
                      </Heading>
                      <Button 
                        colorScheme="blue" 
                        size="sm"
                        onClick={() => handleStartExam(subject.name)}
                      >
                        Practice Now
                      </Button>
                    </Flex>
                    
                    <Text mb={2}>
                      <Text as="span" fontWeight="bold">Next Exam:</Text> {subject.nextExam} ({subject.examDate})
                    </Text>
                    
                    <Flex align="center" mb={1}>
                      <Text mr={4} minW="120px">Overall Progress:</Text>
                      <Progress 
                        value={subject.progress} 
                        colorScheme={subject.progress > 70 ? "green" : subject.progress > 40 ? "yellow" : "red"} 
                        size="sm" 
                        borderRadius="full" 
                        flex={1}
                      />
                      <Text ml={4} fontWeight="bold">
                        {subject.progress}%
                      </Text>
                    </Flex>
                    
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      Last activity: {subject.lastActivity} • {subject.lastActivityDate}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* Recent Activity */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm">
            <CardHeader pb={0}>
              <Heading as="h2" size="md">
                Recent Activity
              </Heading>
            </CardHeader>
            <CardBody>
              <List spacing={3}>
                {mockRecentActivity.map((activity) => (
                  <ListItem 
                    key={activity.id}
                    p={3}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    <Flex align="center" justify="space-between">
                      <Flex align="center">
                        <Badge 
                          colorScheme={
                            activity.type === 'exam' 
                              ? 'blue' 
                              : activity.type === 'quiz' 
                                ? 'purple' 
                                : 'green'
                          }
                          mr={3}
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {activity.type.toUpperCase()}
                        </Badge>
                        <Box>
                          <Text fontWeight="bold">{activity.subject}</Text>
                          <Text fontSize="sm">{activity.title}</Text>
                        </Box>
                      </Flex>
                      <Flex align="center" direction="column">
                        {activity.score && (
                          <Text fontWeight="bold" color={activity.score > 80 ? "green.500" : activity.score > 60 ? "yellow.500" : "red.500"}>
                            {activity.score}%
                          </Text>
                        )}
                        {activity.duration && (
                          <Text fontWeight="bold" color="blue.500">
                            {activity.duration}
                          </Text>
                        )}
                        <Text fontSize="xs" color="gray.500">
                          {activity.date}
                        </Text>
                      </Flex>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        </GridItem>

        {/* Right Column - Upcoming Exams and Performance */}
        <GridItem>
          {/* Upcoming Exams */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm" mb={8}>
            <CardHeader pb={0}>
              <Heading as="h2" size="md">
                Upcoming Exams
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {mockUpcomingExams.map((exam) => (
                  <Box 
                    key={exam.id} 
                    p={4} 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    borderRadius="md"
                    _hover={{ shadow: 'md' }}
                    transition="all 0.2s"
                  >
                    <HStack spacing={4} mb={2}>
                      <CircularProgress 
                        value={100 - parseInt(exam.timeLeft)} 
                        color="blue.400" 
                        size="50px"
                      >
                        <CircularProgressLabel fontSize="sm">{exam.timeLeft.split(' ')[0]}d</CircularProgressLabel>
                      </CircularProgress>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">{exam.title}</Text>
                        <Text fontSize="sm" color="gray.500">{exam.subject}</Text>
                      </VStack>
                    </HStack>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="sm">
                        {exam.date}
                      </Text>
                      <Tag 
                        size="sm" 
                        colorScheme={
                          exam.difficulty === 'Hard' 
                            ? 'red' 
                            : exam.difficulty === 'Medium' 
                              ? 'yellow' 
                              : 'green'
                        }
                      >
                        {exam.difficulty}
                      </Tag>
                    </Flex>
                  </Box>
                ))}
              </VStack>
              <Button colorScheme="blue" variant="outline" size="sm" width="full" mt={4}>
                View All Exams
              </Button>
            </CardBody>
          </Card>

          {/* Performance Summary */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="lg" shadow="sm">
            <CardHeader pb={0}>
              <Heading as="h2" size="md">
                Performance Summary
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="center">
                <CircularProgress 
                  value={82} 
                  color="green.400" 
                  size="180px"
                  thickness="8px"
                >
                  <CircularProgressLabel>
                    <VStack spacing={0}>
                      <Text fontSize="3xl" fontWeight="bold">82%</Text>
                      <Text fontSize="sm">Overall</Text>
                    </VStack>
                  </CircularProgressLabel>
                </CircularProgress>
                
                <Box width="full">
                  <Flex justify="space-between" mb={1}>
                    <Text>Mathematics</Text>
                    <Text fontWeight="bold">78%</Text>
                  </Flex>
                  <Progress value={78} colorScheme="blue" size="sm" borderRadius="full" mb={3} />
                  
                  <Flex justify="space-between" mb={1}>
                    <Text>Physics</Text>
                    <Text fontWeight="bold">65%</Text>
                  </Flex>
                  <Progress value={65} colorScheme="yellow" size="sm" borderRadius="full" mb={3} />
                  
                  <Flex justify="space-between" mb={1}>
                    <Text>English Literature</Text>
                    <Text fontWeight="bold">92%</Text>
                  </Flex>
                  <Progress value={92} colorScheme="green" size="sm" borderRadius="full" mb={3} />
                  
                  <Flex justify="space-between" mb={1}>
                    <Text>Chemistry</Text>
                    <Text fontWeight="bold">45%</Text>
                  </Flex>
                  <Progress value={45} colorScheme="red" size="sm" borderRadius="full" />
                </Box>
                
                <Divider />
                
                <HStack justify="space-between" width="full">
                  <Flex align="center">
                    <Icon as={FiTrendingUp} color="green.500" mr={2} />
                    <Text>Improving:</Text>
                  </Flex>
                  <Text fontWeight="bold">English (+8%)</Text>
                </HStack>
                
                <Button colorScheme="blue" variant="outline" size="sm" width="full">
                  View Detailed Analytics
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Dashboard; 