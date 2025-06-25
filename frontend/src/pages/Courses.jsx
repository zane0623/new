import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Input, 
  InputGroup, 
  InputLeftElement,
  Select,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  useColorModeValue,
  Badge,
  Progress,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon
} from '@chakra-ui/react';
import { 
  FaSearch, 
  FaCalculator, 
  FaBook, 
  FaLanguage, 
  FaScience,
  FaGraduationCap,
  FaPlay,
  FaCheckCircle,
  FaStar
} from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const getSubjectIcon = (subject) => {
    switch (subject) {
      case '数学': return FaCalculator;
      case '阅读': return FaBook;
      case '写作': return FaLanguage;
      case '科学': return FaScience;
      default: return FaGraduationCap;
    }
  };

  return (
    <Card
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={2}>
            <HStack>
              <Icon as={getSubjectIcon(course.subject)} color="blue.500" />
              <Badge colorScheme={course.badgeColor} variant="subtle">
                {course.subject}
              </Badge>
            </HStack>
            <Heading size="md">{course.title}</Heading>
          </VStack>
          {course.badge && (
            <Badge colorScheme={course.badge === 'Popular' ? 'green' : 'purple'} variant="solid">
              {course.badge}
            </Badge>
          )}
        </Flex>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack spacing={4} align="stretch">
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            {course.description}
          </Text>
          
          {course.isEnrolled && (
            <Box>
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                  学习进度
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {course.progress}%
                </Text>
              </Flex>
              <Progress 
                value={course.progress} 
                colorScheme="blue" 
                borderRadius="full"
                size="sm"
              />
            </Box>
          )}
          
          <SimpleGrid columns={2} spacing={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                课程时长
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {course.duration}
              </Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                难度等级
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {course.level}
              </Text>
            </VStack>
          </SimpleGrid>
          
          <Flex justify="space-between" align="center">
            <HStack spacing={2}>
              <Icon as={FaStar} color="yellow.400" />
              <Text fontSize="sm">{course.rating}</Text>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                ({course.reviewCount} 评价)
              </Text>
            </HStack>
            
            <Button 
              size="sm" 
              colorScheme="blue" 
              variant={course.isEnrolled ? 'ghost' : 'solid'}
              leftIcon={<Icon as={course.isEnrolled ? FaPlay : FaCheckCircle} />}
            >
              {course.isEnrolled ? '继续学习' : '开始学习'}
            </Button>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

const Courses = () => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  
  // SAT备考课程数据
  const allCourses = [
    {
      id: 1,
      title: 'SAT数学基础',
      description: '涵盖代数、几何、三角学等核心数学概念，适合数学基础薄弱的学生',
      subject: '数学',
      level: '基础',
      duration: '20小时',
      progress: 75,
      rating: 4.8,
      reviewCount: 156,
      badge: 'Popular',
      badgeColor: 'blue',
      isEnrolled: true
    },
    {
      id: 2,
      title: 'SAT数学进阶',
      description: '高级数学概念，包括复杂代数、高级几何和数据分析',
      subject: '数学',
      level: '进阶',
      duration: '25小时',
      progress: 45,
      rating: 4.6,
      reviewCount: 89,
      badgeColor: 'blue',
      isEnrolled: true
    },
    {
      id: 3,
      title: 'SAT阅读技巧',
      description: '提高阅读速度和理解能力，掌握各种文章类型的分析方法',
      subject: '阅读',
      level: '中级',
      duration: '18小时',
      progress: 60,
      rating: 4.7,
      reviewCount: 203,
      badge: 'Popular',
      badgeColor: 'green',
      isEnrolled: true
    },
    {
      id: 4,
      title: 'SAT写作指导',
      description: '写作技巧、语法规则和文章结构分析',
      subject: '写作',
      level: '中级',
      duration: '15小时',
      progress: 30,
      rating: 4.5,
      reviewCount: 127,
      badgeColor: 'purple',
      isEnrolled: true
    },
    {
      id: 5,
      title: 'SAT科学推理',
      description: '科学类文章的阅读和分析，实验设计和数据解释',
      subject: '科学',
      level: '中级',
      duration: '12小时',
      rating: 4.4,
      reviewCount: 78,
      badgeColor: 'orange',
      isEnrolled: false
    },
    {
      id: 6,
      title: 'SAT词汇强化',
      description: '核心词汇学习，词根词缀分析和语境应用',
      subject: '阅读',
      level: '基础',
      duration: '10小时',
      rating: 4.9,
      reviewCount: 234,
      badge: 'New',
      badgeColor: 'green',
      isEnrolled: false
    },
    {
      id: 7,
      title: 'SAT语法精讲',
      description: '英语语法规则详解，常见错误分析和纠正',
      subject: '写作',
      level: '基础',
      duration: '8小时',
      rating: 4.6,
      reviewCount: 95,
      badgeColor: 'purple',
      isEnrolled: false
    },
    {
      id: 8,
      title: 'SAT综合模拟',
      description: '完整的SAT模拟考试，包含所有科目的综合练习',
      subject: '综合',
      level: '高级',
      duration: '30小时',
      rating: 4.8,
      reviewCount: 167,
      badge: 'Popular',
      badgeColor: 'teal',
      isEnrolled: false
    }
  ];
  
  const enrolledCourses = allCourses.filter(course => course.isEnrolled);
  const discoverCourses = allCourses.filter(course => !course.isEnrolled);
  
  const filterCourses = (courses) => {
    return courses.filter(course => 
      course.title.toLowerCase().includes(filter.toLowerCase()) ||
      course.description.toLowerCase().includes(filter.toLowerCase()) ||
      course.subject.toLowerCase().includes(filter.toLowerCase())
    );
  };
  
  const sortCourses = (courses) => {
    if (sortBy === 'title') {
      return [...courses].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'popular') {
      return [...courses].sort((a, b) => (b.badge === 'Popular' ? 1 : 0) - (a.badge === 'Popular' ? 1 : 0));
    } else if (sortBy === 'new') {
      return [...courses].sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    } else if (sortBy === 'rating') {
      return [...courses].sort((a, b) => b.rating - a.rating);
    }
    return courses;
  };
  
  const filteredEnrolledCourses = sortCourses(filterCourses(enrolledCourses));
  const filteredDiscoverCourses = sortCourses(filterCourses(discoverCourses));
  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
      <Container maxW="container.xl">
        <Box mb={8}>
          <Heading size="xl" mb={2} color={useColorModeValue('gray.800', 'white')}>
            SAT课程
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            浏览所有可用的SAT备考课程或继续你已注册的课程学习。
          </Text>
        </Box>
        
        {/* Search and Filter */}
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          mb={6} 
          gap={4}
          align={{ base: 'stretch', md: 'center' }}
        >
          <InputGroup maxW={{ base: '100%', md: '60%' }}>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder="搜索课程..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              bg={useColorModeValue('white', 'gray.700')}
            />
          </InputGroup>
          
          <Select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            maxW={{ base: '100%', md: '200px' }}
            bg={useColorModeValue('white', 'gray.700')}
          >
            <option value="popular">热门优先</option>
            <option value="new">最新优先</option>
            <option value="rating">评分优先</option>
            <option value="title">字母顺序</option>
          </Select>
        </Flex>
        
        {/* Tabs */}
        <Tabs colorScheme="blue" mb={6}>
          <TabList>
            <Tab>我的课程 ({filteredEnrolledCourses.length})</Tab>
            <Tab>发现课程 ({filteredDiscoverCourses.length})</Tab>
          </TabList>
          
          <TabPanels>
            {/* My Courses Tab */}
            <TabPanel p={0} pt={6}>
              {filteredEnrolledCourses.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {filteredEnrolledCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </SimpleGrid>
              ) : (
                <Box 
                  p={8} 
                  textAlign="center" 
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="lg"
                >
                  <Text>没有找到匹配的已注册课程。</Text>
                </Box>
              )}
            </TabPanel>
            
            {/* Discover Tab */}
            <TabPanel p={0} pt={6}>
              {filteredDiscoverCourses.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {filteredDiscoverCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </SimpleGrid>
              ) : (
                <Box 
                  p={8} 
                  textAlign="center" 
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="lg"
                >
                  <Text>没有找到匹配的课程。</Text>
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default Courses; 