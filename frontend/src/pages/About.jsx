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
  Avatar,
  Divider,
  List,
  ListItem,
  ListIcon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { 
  FaUser, 
  FaGraduationCap, 
  FaTrophy, 
  FaChartLine, 
  FaClock,
  FaBook,
  FaCalculator,
  FaLanguage,
  FaScience,
  FaCheckCircle,
  FaStar,
  FaCalendar,
  FaTarget,
  FaAward
} from 'react-icons/fa';

const ProfileCard = ({ user }) => {
  return (
    <Card
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <CardBody>
        <VStack spacing={6}>
          <Avatar 
            size="2xl" 
            name={user.name}
            src={user.avatar}
            bg="blue.500"
          />
          
          <VStack spacing={2}>
            <Heading size="lg">{user.name}</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              {user.grade} 年级学生
            </Text>
            <Badge colorScheme="blue" variant="subtle" fontSize="md">
              SAT 备考中
            </Badge>
          </VStack>
          
          <Divider />
          
          <SimpleGrid columns={2} spacing={4} w="full">
            <VStack>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                学习天数
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {user.studyDays}
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                总学习时长
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {user.totalHours}h
              </Text>
            </VStack>
          </SimpleGrid>
          
          <Button colorScheme="blue" variant="outline" w="full">
            编辑资料
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

const AchievementCard = ({ achievement }) => {
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
      <CardBody>
        <VStack spacing={3}>
          <Icon 
            as={achievement.icon} 
            boxSize={8} 
            color={achievement.color} 
          />
          <VStack spacing={1}>
            <Heading size="md">{achievement.title}</Heading>
            <Text 
              fontSize="sm" 
              color={useColorModeValue('gray.600', 'gray.400')}
              textAlign="center"
            >
              {achievement.description}
            </Text>
          </VStack>
          <Badge colorScheme={achievement.badgeColor} variant="subtle">
            {achievement.date}
          </Badge>
        </VStack>
      </CardBody>
    </Card>
  );
};

const SubjectProgressCard = ({ subject }) => {
  return (
    <Card
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      boxShadow="md"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <CardHeader pb={2}>
        <HStack>
          <Icon as={subject.icon} color="blue.500" />
          <Heading size="md">{subject.name}</Heading>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={4} align="stretch">
          <Box>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                掌握程度
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {subject.progress}%
              </Text>
            </Flex>
            <Progress 
              value={subject.progress} 
              colorScheme="blue" 
              borderRadius="full"
              size="sm"
            />
          </Box>
          
          <SimpleGrid columns={2} spacing={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                练习次数
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {subject.practiceCount}
              </Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                平均分数
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {subject.averageScore}
              </Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );
};

const About = () => {
  const user = {
    name: '张三',
    grade: '高三',
    avatar: null,
    studyDays: 45,
    totalHours: 120,
    targetScore: 1500,
    currentScore: 1350
  };

  const achievements = [
    {
      id: 1,
      title: '连续学习7天',
      description: '保持连续学习记录',
      icon: FaTrophy,
      color: 'yellow.500',
      badgeColor: 'yellow',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: '数学满分',
      description: '数学部分获得满分',
      icon: FaAward,
      color: 'green.500',
      badgeColor: 'green',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: '阅读进步',
      description: '阅读分数提升50分',
      icon: FaStar,
      color: 'blue.500',
      badgeColor: 'blue',
      date: '2024-01-08'
    },
    {
      id: 4,
      title: '完成100题',
      description: '累计完成100道练习题',
      icon: FaCheckCircle,
      color: 'purple.500',
      badgeColor: 'purple',
      date: '2024-01-05'
    }
  ];

  const subjects = [
    {
      name: '数学',
      icon: FaCalculator,
      progress: 85,
      practiceCount: 45,
      averageScore: 780
    },
    {
      name: '阅读',
      icon: FaBook,
      progress: 72,
      practiceCount: 38,
      averageScore: 720
    },
    {
      name: '写作',
      icon: FaLanguage,
      progress: 68,
      practiceCount: 32,
      averageScore: 680
    },
    {
      name: '科学',
      icon: FaScience,
      progress: 75,
      practiceCount: 28,
      averageScore: 750
    }
  ];

  const goals = [
    '提高数学分数到800分',
    '阅读速度提升20%',
    '写作部分达到700分',
    '完成10次模拟考试',
    '掌握所有核心词汇'
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* 页面标题 */}
          <VStack spacing={4} align="start">
            <Heading size="xl">关于我</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              查看你的学习进度、成就和目标
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8}>
            {/* 左侧个人信息 */}
            <GridItem>
              <ProfileCard user={user} />
            </GridItem>

            {/* 右侧内容 */}
            <GridItem>
              <VStack spacing={8} align="stretch">
                {/* 学习统计 */}
                <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
                  <CardHeader>
                    <Heading size="md">学习统计</Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                      <Stat>
                        <StatLabel>目标分数</StatLabel>
                        <StatNumber color="blue.500">{user.targetScore}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>当前分数</StatLabel>
                        <StatNumber color="green.500">{user.currentScore}</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          +{user.currentScore - 1200}
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>学习天数</StatLabel>
                        <StatNumber>{user.studyDays}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>总时长</StatLabel>
                        <StatNumber>{user.totalHours}h</StatNumber>
                      </Stat>
                    </SimpleGrid>
                  </CardBody>
                </Card>

                {/* 科目进度 */}
                <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
                  <CardHeader>
                    <Heading size="md">科目进度</Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {subjects.map((subject, index) => (
                        <SubjectProgressCard key={index} subject={subject} />
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>

                {/* 成就 */}
                <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
                  <CardHeader>
                    <Heading size="md">我的成就</Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {achievements.map((achievement) => (
                        <AchievementCard key={achievement.id} achievement={achievement} />
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>

                {/* 学习目标 */}
                <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
                  <CardHeader>
                    <HStack>
                      <Icon as={FaTarget} color="blue.500" />
                      <Heading size="md">学习目标</Heading>
                    </HStack>
                  </CardHeader>
                  <CardBody pt={0}>
                    <List spacing={3}>
                      {goals.map((goal, index) => (
                        <ListItem key={index}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          {goal}
                        </ListItem>
                      ))}
                    </List>
                  </CardBody>
                </Card>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default About; 