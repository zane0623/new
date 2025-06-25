import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Badge, 
  Button, 
  Card, 
  CardBody, 
  CardHeader,
  Progress,
  Flex,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react';
import { 
  FaTasks, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle, 
  FaPlay,
  FaBook,
  FaCalculator,
  FaLanguage,
  FaScience
} from 'react-icons/fa';

const AssignmentCard = ({ assignment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'overdue': return 'red';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return FaCheckCircle;
      case 'in_progress': return FaPlay;
      case 'overdue': return FaExclamationTriangle;
      case 'pending': return FaClock;
      default: return FaTasks;
    }
  };

  const getSubjectIcon = (subject) => {
    switch (subject) {
      case '数学': return FaCalculator;
      case '阅读': return FaBook;
      case '写作': return FaLanguage;
      case '科学': return FaScience;
      default: return FaBook;
    }
  };

  return (
    <Card
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={2}>
            <HStack>
              <Icon as={getSubjectIcon(assignment.subject)} color="blue.500" />
              <Badge colorScheme={getStatusColor(assignment.status)} variant="subtle">
                {assignment.status === 'completed' ? '已完成' : 
                 assignment.status === 'in_progress' ? '进行中' :
                 assignment.status === 'overdue' ? '已逾期' : '待开始'}
              </Badge>
            </HStack>
            <Heading size="md">{assignment.title}</Heading>
          </VStack>
          <Icon as={getStatusIcon(assignment.status)} 
                color={`${getStatusColor(assignment.status)}.500`} 
                boxSize={5} />
        </Flex>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack spacing={4} align="stretch">
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            {assignment.description}
          </Text>
          
          <Box>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                完成进度
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {assignment.progress}%
              </Text>
            </Flex>
            <Progress 
              value={assignment.progress} 
              colorScheme={getStatusColor(assignment.status)}
              borderRadius="full"
              size="sm"
            />
          </Box>
          
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                截止日期
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {assignment.dueDate}
              </Text>
            </VStack>
            
            <Button 
              size="sm" 
              colorScheme="blue" 
              variant={assignment.status === 'completed' ? 'ghost' : 'solid'}
              leftIcon={<Icon as={assignment.status === 'completed' ? FaCheckCircle : FaPlay} />}
            >
              {assignment.status === 'completed' ? '查看' : '开始'}
            </Button>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

const Assignments = () => {
  const assignments = [
    {
      id: 1,
      title: '数学基础练习 - 代数',
      description: '完成代数基础概念练习，包括线性方程、二次方程等',
      subject: '数学',
      status: 'completed',
      progress: 100,
      dueDate: '2024-01-15',
      type: '练习题'
    },
    {
      id: 2,
      title: '阅读理解训练 - 科学文章',
      description: '阅读并分析科学类文章，提高理解能力',
      subject: '阅读',
      status: 'in_progress',
      progress: 65,
      dueDate: '2024-01-20',
      type: '训练'
    },
    {
      id: 3,
      title: '写作练习 - 议论文',
      description: '完成一篇议论文写作，主题自选',
      subject: '写作',
      status: 'pending',
      progress: 0,
      dueDate: '2024-01-25',
      type: '练习'
    },
    {
      id: 4,
      title: '科学推理测试',
      description: '完成科学推理部分的模拟测试',
      subject: '科学',
      status: 'overdue',
      progress: 30,
      dueDate: '2024-01-10',
      type: '测试'
    },
    {
      id: 5,
      title: '数学进阶练习 - 几何',
      description: '几何证明和计算练习',
      subject: '数学',
      status: 'in_progress',
      progress: 45,
      dueDate: '2024-01-30',
      type: '练习题'
    },
    {
      id: 6,
      title: '综合模拟考试',
      description: '完整的SAT模拟考试',
      subject: '综合',
      status: 'pending',
      progress: 0,
      dueDate: '2024-02-05',
      type: '模拟'
    }
  ];

  const stats = {
    total: assignments.length,
    completed: assignments.filter(a => a.status === 'completed').length,
    inProgress: assignments.filter(a => a.status === 'in_progress').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
    pending: assignments.filter(a => a.status === 'pending').length
  };

  const getFilteredAssignments = (status) => {
    if (status === 'all') return assignments;
    return assignments.filter(assignment => assignment.status === status);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* 页面标题 */}
          <VStack spacing={4} align="start">
            <Heading size="xl">我的作业</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              跟踪你的学习进度和作业完成情况
            </Text>
          </VStack>

          {/* 统计卡片 */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
              <CardBody>
                <Stat>
                  <StatLabel>总作业数</StatLabel>
                  <StatNumber>{stats.total}</StatNumber>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
              <CardBody>
                <Stat>
                  <StatLabel>已完成</StatLabel>
                  <StatNumber color="green.500">{stats.completed}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
              <CardBody>
                <Stat>
                  <StatLabel>进行中</StatLabel>
                  <StatNumber color="blue.500">{stats.inProgress}</StatNumber>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
              <CardBody>
                <Stat>
                  <StatLabel>已逾期</StatLabel>
                  <StatNumber color="red.500">{stats.overdue}</StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* 作业列表 */}
          <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
            <CardHeader>
              <Heading size="md">作业列表</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Tabs variant="soft-rounded" colorScheme="blue">
                <TabList mb={6}>
                  <Tab>全部 ({stats.total})</Tab>
                  <Tab>已完成 ({stats.completed})</Tab>
                  <Tab>进行中 ({stats.inProgress})</Tab>
                  <Tab>待开始 ({stats.pending})</Tab>
                  <Tab>已逾期 ({stats.overdue})</Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel px={0}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                      {getFilteredAssignments('all').map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel px={0}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                      {getFilteredAssignments('completed').map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel px={0}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                      {getFilteredAssignments('in_progress').map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel px={0}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                      {getFilteredAssignments('pending').map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel px={0}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                      {getFilteredAssignments('overdue').map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default Assignments; 