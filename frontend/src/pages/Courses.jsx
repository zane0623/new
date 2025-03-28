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
  useColorModeValue
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import CourseCard from '../components/CourseCard';
// import { getCourses } from '../services/api';

const Courses = () => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  
  // Mock data - would normally be fetched from an API
  const allCourses = [
    {
      id: 1,
      title: 'Mathematics (0580)',
      description: 'Complete IGCSE Mathematics course covering all topics for the 0580 syllabus.',
      level: 'IGCSE',
      progress: 75,
      nextLesson: 'Algebra II',
      badge: 'Popular',
      isEnrolled: true
    },
    {
      id: 2,
      title: 'Physics (0625)',
      description: 'Comprehensive IGCSE Physics course with interactive experiments and practice questions.',
      level: 'IGCSE',
      progress: 62,
      nextLesson: 'Electric Circuits',
      isEnrolled: true
    },
    {
      id: 3,
      title: 'Biology (0610)',
      description: 'Learn all biology concepts covered in the IGCSE syllabus with virtual labs and diagrams.',
      level: 'IGCSE',
      progress: 88,
      nextLesson: 'Respiration',
      badge: 'New',
      isEnrolled: true
    },
    {
      id: 4,
      title: 'Chemistry (0620)',
      description: 'Master IGCSE Chemistry with interactive periodic table, molecular visualizations, and more.',
      level: 'IGCSE',
      progress: 45,
      nextLesson: 'Chemical Bonding',
      isEnrolled: true
    },
    {
      id: 5,
      title: 'English - First Language (0500)',
      description: 'Improve your reading comprehension, writing, and language analysis skills for IGCSE English.',
      level: 'IGCSE',
      badge: 'Popular'
    },
    {
      id: 6,
      title: 'Computer Science (0478)',
      description: 'Learn programming, algorithms, and computer systems for the IGCSE Computer Science exam.',
      level: 'IGCSE',
      badge: 'New'
    },
    {
      id: 7,
      title: 'Geography (0460)',
      description: 'Explore physical and human geography topics with case studies and map skills practice.',
      level: 'IGCSE'
    },
    {
      id: 8,
      title: 'History (0470)',
      description: 'Study international relations and key events of the 20th century for IGCSE History.',
      level: 'IGCSE'
    }
  ];
  
  const enrolledCourses = allCourses.filter(course => course.isEnrolled);
  const discoverCourses = allCourses.filter(course => !course.isEnrolled);
  
  const filterCourses = (courses) => {
    return courses.filter(course => 
      course.title.toLowerCase().includes(filter.toLowerCase()) ||
      course.description.toLowerCase().includes(filter.toLowerCase())
    );
  };
  
  const sortCourses = (courses) => {
    if (sortBy === 'title') {
      return [...courses].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'popular') {
      return [...courses].sort((a, b) => (b.badge === 'Popular' ? 1 : 0) - (a.badge === 'Popular' ? 1 : 0));
    } else if (sortBy === 'new') {
      return [...courses].sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
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
            Courses
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Browse all available IGCSE preparation courses or continue with your enrolled courses.
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
              placeholder="Search courses..." 
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
            <option value="popular">Popular First</option>
            <option value="new">Newest First</option>
            <option value="title">Alphabetical</option>
          </Select>
        </Flex>
        
        {/* Tabs */}
        <Tabs colorScheme="blue" mb={6}>
          <TabList>
            <Tab>My Courses ({filteredEnrolledCourses.length})</Tab>
            <Tab>Discover ({filteredDiscoverCourses.length})</Tab>
          </TabList>
          
          <TabPanels>
            {/* My Courses Tab */}
            <TabPanel p={0} pt={6}>
              {filteredEnrolledCourses.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {filteredEnrolledCourses.map(course => (
                    <CourseCard key={course.id} {...course} isEnrolled={true} />
                  ))}
                </SimpleGrid>
              ) : (
                <Box 
                  p={8} 
                  textAlign="center" 
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="lg"
                >
                  <Text>No enrolled courses match your search.</Text>
                </Box>
              )}
            </TabPanel>
            
            {/* Discover Tab */}
            <TabPanel p={0} pt={6}>
              {filteredDiscoverCourses.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {filteredDiscoverCourses.map(course => (
                    <CourseCard key={course.id} {...course} isEnrolled={false} />
                  ))}
                </SimpleGrid>
              ) : (
                <Box 
                  p={8} 
                  textAlign="center" 
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="lg"
                >
                  <Text>No courses match your search.</Text>
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