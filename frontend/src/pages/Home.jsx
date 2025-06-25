import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  Grid, 
  GridItem, 
  Heading, 
  Icon, 
  Input,
  InputGroup,
  InputLeftElement,
  Stack, 
  Text, 
  VStack, 
  useColorModeValue,
  SimpleGrid,
  Badge,
  Progress,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  FaSearch, 
  FaBook, 
  FaChartLine, 
  FaClock, 
  FaGraduationCap, 
  FaUserFriends,
  FaCompass,
  FaTasks,
  FaCalculator,
  FaLanguage,
  FaHistory,
  FaScience,
  FaMath,
  FaGlobe,
  FaLightbulb,
  FaCheckCircle,
  FaPlay,
  FaStar
} from 'react-icons/fa';
import { useState } from 'react';

const Feature = ({ icon, title, text }) => {
  return (
    <VStack
      align="start"
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Icon as={icon} boxSize={10} color="blue.500" mb={4} />
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </VStack>
  );
};

const CourseCard = ({ title, level, image }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Box h="160px" bg="gray.300" position="relative">
        {image ? (
          <Image src={image} alt={title} objectFit="cover" w="100%" h="100%" />
        ) : (
          <Flex align="center" justify="center" h="100%" bg="blue.100">
            <Icon as={FaBook} boxSize={10} color="blue.500" />
          </Flex>
        )}
        <Box position="absolute" top={2} right={2} bg="blue.500" color="white" fontSize="sm" px={2} py={1} borderRadius="md">
          {level}
        </Box>
      </Box>
      <Box p={4}>
        <Heading size="md" mb={2}>{title}</Heading>
        <Flex justify="space-between" align="center" mt={2}>
          <Text fontSize="sm" color="gray.500">Popular Course</Text>
          <Button size="sm" colorScheme="blue" variant="outline">
            View Details
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

// 搜索组件
const SearchSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      p={8}
      boxShadow="lg"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <VStack spacing={6}>
        <VStack spacing={3}>
          <Heading size="lg" textAlign="center">
            搜索SAT课程和工具
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
            输入关键词搜索相关的课程、练习题或学习工具
          </Text>
        </VStack>
        
        <InputGroup size="lg" maxW="600px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索数学、阅读、写作、科学..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            borderRadius="full"
            bg={useColorModeValue('gray.50', 'gray.700')}
            _focus={{
              bg: useColorModeValue('white', 'gray.600'),
              boxShadow: 'outline',
              borderColor: 'blue.500'
            }}
          />
        </InputGroup>
        
        <Button
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          px={8}
          onClick={handleSearch}
          leftIcon={<Icon as={FaSearch} />}
        >
          搜索
        </Button>
      </VStack>
    </Box>
  );
};

// 工具卡片组件
const ToolCard = ({ tool }) => {
  return (
    <Card
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-4px)', 
        boxShadow: 'xl',
        borderColor: 'blue.500'
      }}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      cursor="pointer"
    >
      <CardHeader pb={2}>
        <Flex align="center" justify="space-between">
          <Icon as={tool.icon} boxSize={6} color="blue.500" />
          <Badge colorScheme={tool.badgeColor} variant="subtle">
            {tool.subject}
          </Badge>
        </Flex>
        <Heading size="md" mt={2}>{tool.title}</Heading>
      </CardHeader>
      
      <CardBody pt={0}>
        <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
          {tool.description}
        </Text>
        
        <VStack spacing={3} align="stretch">
          <Box>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                进度
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {tool.progress}%
              </Text>
            </Flex>
            <Progress 
              value={tool.progress} 
              colorScheme="blue" 
              borderRadius="full"
              size="sm"
            />
          </Box>
          
          <Flex wrap="wrap" gap={2}>
            {tool.tags.map((tag, index) => (
              <Badge key={index} colorScheme="gray" variant="outline" fontSize="xs">
                {tag}
              </Badge>
            ))}
          </Flex>
          
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
              {tool.type}
            </Text>
            <Button size="sm" colorScheme="blue" variant="ghost" rightIcon={<Icon as={FaPlay} />}>
              开始
            </Button>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

// 侧边栏分类组件
const CategorySidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md" mb={4}>分类</Heading>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "solid" : "ghost"}
          colorScheme="blue"
          justifyContent="flex-start"
          leftIcon={<Icon as={category.icon} />}
          onClick={() => onCategorySelect(category.id)}
          borderRadius="lg"
          h="auto"
          py={3}
          px={4}
        >
          <VStack align="start" spacing={1}>
            <Text fontWeight="medium">{category.name}</Text>
            <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
              {category.count} 个工具
            </Text>
          </VStack>
        </Button>
      ))}
    </VStack>
  );
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 分类数据
  const categories = [
    { id: 'all', name: '全部', icon: FaCompass, count: 12 },
    { id: 'math', name: '数学', icon: FaCalculator, count: 4 },
    { id: 'reading', name: '阅读', icon: FaBook, count: 3 },
    { id: 'writing', name: '写作', icon: FaLanguage, count: 2 },
    { id: 'science', name: '科学', icon: FaScience, count: 2 },
    { id: 'history', name: '历史', icon: FaHistory, count: 1 }
  ];

  // 工具数据
  const tools = [
    {
      id: 1,
      title: '数学基础练习',
      description: '涵盖代数、几何、三角学等核心数学概念',
      subject: '数学',
      icon: FaCalculator,
      badgeColor: 'blue',
      progress: 75,
      tags: ['代数', '几何', '基础'],
      type: '练习题'
    },
    {
      id: 2,
      title: '阅读理解训练',
      description: '提高阅读速度和理解能力的专项训练',
      subject: '阅读',
      icon: FaBook,
      badgeColor: 'green',
      progress: 60,
      tags: ['阅读理解', '速度', '分析'],
      type: '训练'
    },
    {
      id: 3,
      title: '写作技巧指导',
      description: 'SAT写作部分的技巧和模板练习',
      subject: '写作',
      icon: FaLanguage,
      badgeColor: 'purple',
      progress: 45,
      tags: ['写作', '技巧', '模板'],
      type: '指导'
    },
    {
      id: 4,
      title: '科学推理练习',
      description: '科学类文章的阅读和分析练习',
      subject: '科学',
      icon: FaScience,
      badgeColor: 'orange',
      progress: 30,
      tags: ['科学', '推理', '分析'],
      type: '练习'
    },
    {
      id: 5,
      title: '历史文献阅读',
      description: '历史类文献的阅读理解专项训练',
      subject: '历史',
      icon: FaHistory,
      badgeColor: 'red',
      progress: 20,
      tags: ['历史', '文献', '阅读'],
      type: '训练'
    },
    {
      id: 6,
      title: '综合模拟测试',
      description: '完整的SAT模拟考试，包含所有科目',
      subject: '综合',
      icon: FaGraduationCap,
      badgeColor: 'teal',
      progress: 90,
      tags: ['模拟', '综合', '考试'],
      type: '模拟'
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    // 这里可以添加搜索逻辑
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.subject.toLowerCase() === selectedCategory);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* 搜索区域 */}
      <Box py={12} px={4}>
        <Container maxW="container.xl">
          <SearchSection onSearch={handleSearch} />
        </Container>
      </Box>

      {/* 主要内容区域 */}
      <Container maxW="container.xl" px={4} pb={12}>
        <Grid templateColumns={{ base: '1fr', lg: '250px 1fr' }} gap={8}>
          {/* 侧边栏 - 桌面端 */}
          <Box display={{ base: 'none', lg: 'block' }}>
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              p={6}
              borderRadius="xl"
              boxShadow="md"
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              position="sticky"
              top={4}
            >
              <CategorySidebar 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </Box>
          </Box>

          {/* 移动端分类按钮 */}
          <Box display={{ base: 'block', lg: 'none' }} mb={6}>
            <Button
              onClick={onOpen}
              leftIcon={<Icon as={FaCompass} />}
              variant="outline"
              colorScheme="blue"
              w="full"
            >
              选择分类
            </Button>
          </Box>

          {/* 工具卡片网格 */}
          <Box>
            <VStack spacing={6} align="stretch">
              <Flex justify="space-between" align="center">
                <Heading size="lg">
                  {selectedCategory === 'all' ? '所有工具' : categories.find(c => c.id === selectedCategory)?.name}
                </Heading>
                <Text color={useColorModeValue('gray.500', 'gray.400')}>
                  {filteredTools.length} 个工具
                </Text>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </SimpleGrid>
            </VStack>
          </Box>
        </Grid>
      </Container>

      {/* 移动端抽屉 */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>选择分类</DrawerHeader>
          <DrawerBody>
            <CategorySidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={(categoryId) => {
                handleCategorySelect(categoryId);
                onClose();
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Home;