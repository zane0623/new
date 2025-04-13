import { Box, Button, Container, Flex, Grid, GridItem, Heading, Icon, Image, Link, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaBook, FaChartLine, FaClock, FaGraduationCap, FaUserFriends } from 'react-icons/fa';

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

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg={useColorModeValue('blue.50', 'gray.900')}
        pt={{ base: 20, md: 28 }}
        pb={{ base: 16, md: 24 }}
      >
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8} alignItems="center">
            <GridItem>
              <VStack align="start" spacing={6}>
                <Heading
                  as="h1"
                  size="2xl"
                  fontWeight="bold"
                  color={useColorModeValue('gray.800', 'white')}
                  lineHeight="shorter"
                >
                  Excel in Your IGCSE Exams with Personalised Preparation
                </Heading>
                <Text
                  fontSize="xl"
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Realistic test simulations, AI-driven personalised learning paths, and comprehensive progress tracking to maximise your academic success.
                </Text>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} w={{ base: '100%', sm: 'auto' }}>
                  <Button
                    as={RouterLink}
                    to="/exam-simulation"
                    size="lg"
                    colorScheme="green"
                    fontWeight="bold"
                    px={8}
                    leftIcon={<Icon as={FaClock} />}
                  >
                    开始模拟考试
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/register"
                    size="lg"
                    colorScheme="blue"
                    fontWeight="bold"
                    px={8}
                  >
                    Start Preparing Now
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/login"
                    size="lg"
                    variant="outline"
                    colorScheme="blue"
                  >
                    Sign In
                  </Button>
                </Stack>
              </VStack>
            </GridItem>
            <GridItem display={{ base: 'none', md: 'block' }}>
              <Flex justify="center">
                <Box 
                  w="full" 
                  h="400px" 
                  bg="blue.100" 
                  borderRadius="xl" 
                  overflow="hidden"
                  position="relative"
                >
                  {/* Placeholder for hero image */}
                  <Flex 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    h="100%"
                    bg="blue.100"
                  >
                    <Icon as={FaGraduationCap} boxSize={20} color="blue.500" mb={4} />
                    <Text fontWeight="bold" color="blue.700">Interactive Learning Environment</Text>
                  </Flex>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Key Features</Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} maxW="container.md">
                Our platform offers a comprehensive suite of tools designed to help IGCSE students prepare effectively for their exams.
              </Text>
            </VStack>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
              <Feature
                icon={FaBook}
                title="Realistic Exam Simulations"
                text="Practise with exam-style questions that mirror the format, difficulty, and time constraints of actual IGCSE exams."
              />
              <Feature
                icon={FaChartLine}
                title="Personalised Learning Paths"
                text="AI-driven learning paths that adapt to your performance, focusing on areas that need improvement."
              />
              <Feature
                icon={FaClock}
                title="Time Management Tools"
                text="Structured study sessions with time tracking to help you optimise your study habits and exam time allocation."
              />
              <Feature
                icon={FaUserFriends}
                title="Parent-Teacher Connection"
                text="Enable parents and teachers to monitor progress and provide timely support when needed."
              />
              <Feature
                icon={FaGraduationCap}
                title="Layered Teaching Approach"
                text="Tiered question sets for different academic goals, from foundation to top-tier university preparation."
              />
              <Feature
                icon={FaChartLine}
                title="Error Pattern Analysis"
                text="Identify recurring mistake patterns to focus your revision on areas that will most improve your scores."
              />
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Featured Courses */}
      <Box py={16} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Featured Courses</Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} maxW="container.md">
                Explore our most popular IGCSE preparation courses across different subjects
              </Text>
            </VStack>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
              <CourseCard
                title="Mathematics (0580)"
                level="IGCSE"
              />
              <CourseCard
                title="Physics (0625)"
                level="IGCSE"
              />
              <CourseCard
                title="Chemistry (0620)"
                level="IGCSE"
              />
              <CourseCard
                title="Biology (0610)"
                level="IGCSE"
              />
              <CourseCard
                title="English Language (0500)"
                level="IGCSE"
              />
              <CourseCard
                title="Computer Science (0478)"
                level="IGCSE"
              />
            </Grid>

            <Button
              size="lg"
              colorScheme="blue"
              mt={8}
              as={RouterLink}
              to="/register"
            >
              Explore All Courses
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={16}>
        <Container maxW="container.md" textAlign="center">
          <VStack spacing={8}>
            <Heading size="xl">Ready to Excel in Your IGCSE Exams?</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Join thousands of students who have improved their exam scores with our platform
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} justify="center">
              <Button
                as={RouterLink}
                to="/register"
                size="lg"
                colorScheme="blue"
                px={8}
              >
                Create Free Account
              </Button>
              <Button
                as={RouterLink}
                to="/login"
                size="lg"
                variant="outline"
                colorScheme="blue"
              >
                Sign In
              </Button>
            </Stack>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={10}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={8}>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading size="md">IGCSE Prep</Heading>
                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  Empowering students to excel in their IGCSE exams through personalised preparation.
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading size="sm">Resources</Heading>
                <Link>Practise Tests</Link>
                <Link>Study Guides</Link>
                <Link>Past Papers</Link>
                <Link>Revision Tips</Link>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading size="sm">Company</Heading>
                <Link>About Us</Link>
                <Link>Partners</Link>
                <Link>Careers</Link>
                <Link>Contact Us</Link>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading size="sm">Legal</Heading>
                <Link>Terms of Service</Link>
                <Link>Privacy Policy</Link>
                <Link>Cookie Policy</Link>
                <Link>GDPR Compliance</Link>
              </VStack>
            </GridItem>
          </Grid>
          <Text mt={12} textAlign="center" fontSize="sm" color={useColorModeValue('gray.500', 'gray.500')}>
            © 2025 IGCSE Prep. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;