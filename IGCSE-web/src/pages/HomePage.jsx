import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiBookOpen, FiClock, FiBarChart2, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

// Hero Section Component
const Hero = () => {
  return (
    <Box
      w="full"
      h={{ base: 'auto', md: '80vh' }}
      backgroundImage="linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
      id="home"
    >
      <Container maxW="container.xl" h="full">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          h="full"
          spacing={10}
          align="center"
          justify="space-between"
          py={{ base: 20, md: 28 }}
        >
          <VStack
            w={{ base: 'full', md: '50%' }}
            textAlign={{ base: 'center', md: 'left' }}
            align={{ base: 'center', md: 'flex-start' }}
            spacing={6}
          >
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              color="white"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
            >
              Prepare for your IGCSE exams with confidence
            </Heading>
            <Text
              fontSize="xl"
              color="white"
              textShadow="1px 1px 2px rgba(0, 0, 0, 0.2)"
            >
              Get realistic practice tests, personalized analytics, and expert guidance to ace your IGCSE exams.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <Button
                as={RouterLink}
                to="/register"
                size="lg"
                colorScheme="blue"
                bg="white"
                color="brand.600"
                _hover={{ bg: 'gray.100' }}
                fontWeight="bold"
                rounded="md"
                px={8}
              >
                Get Started
              </Button>
              <Button
                as={RouterLink}
                to="/login"
                size="lg"
                colorScheme="blue"
                variant="outline"
                bg="transparent"
                borderColor="white"
                color="white"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                fontWeight="bold"
                rounded="md"
                px={8}
              >
                Sign In
              </Button>
            </Stack>
          </VStack>
          <Box
            w={{ base: 'full', md: '40%' }}
            display={{ base: 'none', md: 'block' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Students studying"
              rounded="lg"
              shadow="2xl"
              fallbackSrc="https://via.placeholder.com/500"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

// Feature Component
const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      align="center"
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      p={8}
      boxShadow="md"
      _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
      transition="all 0.3s"
    >
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="brand.600"
        mb={4}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Text fontWeight={600} fontSize="xl">
        {title}
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')} align="center">
        {text}
      </Text>
    </Stack>
  );
};

// Features Section
const Features = () => {
  return (
    <Box py={20} id="features">
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <VStack spacing={4}>
            <Heading as="h2" size="xl" textAlign="center">
              Features designed for exam success
            </Heading>
            <Text fontSize="lg" color="gray.500" textAlign="center" maxW="3xl">
              Our platform provides everything you need to prepare effectively for your IGCSE exams
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="full">
            <Feature
              icon={FiBookOpen}
              title="Realistic Exam Simulation"
              text="Practice with timed tests that replicate the exact format and difficulty of IGCSE exams."
            />
            <Feature
              icon={FiBarChart2}
              title="Personalized Analytics"
              text="Get detailed performance reports and identify your strengths and areas for improvement."
            />
            <Feature
              icon={FiClock}
              title="Time Management"
              text="Learn to pace yourself effectively with our timed practice environments."
            />
            <Feature
              icon={FiBriefcase}
              title="Subject Coverage"
              text="Comprehensive question banks covering all IGCSE subjects and exam boards."
            />
            <Feature
              icon={FiCheckCircle}
              title="Instant Feedback"
              text="Receive immediate scoring and detailed explanations for all practice questions."
            />
            <Feature
              icon={FiBarChart2}
              title="Progress Tracking"
              text="Monitor improvement over time with visual progress charts and improvement metrics."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up as a student, parent, or school administrator with your email.',
    },
    {
      number: '02',
      title: 'Customize Your Experience',
      description: 'Select your subjects, exam board, and personalize your study dashboard.',
    },
    {
      number: '03',
      title: 'Practice With Real Tests',
      description: 'Take simulated exams under timed conditions that mimic the real testing environment.',
    },
    {
      number: '04',
      title: 'Review Performance',
      description: 'Analyze detailed reports and understand where you need to improve.',
    },
  ];

  return (
    <Box
      py={20}
      bg={useColorModeValue('gray.50', 'gray.900')}
      id="how-it-works"
    >
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <VStack spacing={4}>
            <Heading as="h2" size="xl" textAlign="center">
              How It Works
            </Heading>
            <Text fontSize="lg" color="gray.500" textAlign="center" maxW="3xl">
              Get started in minutes and begin your journey to exam success
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} width="full">
            {steps.map((step) => (
              <VStack
                key={step.number}
                align="flex-start"
                spacing={6}
                p={6}
                borderRadius="lg"
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="md"
              >
                <Text
                  fontSize="5xl"
                  fontWeight="bold"
                  color="brand.600"
                  lineHeight="1"
                >
                  {step.number}
                </Text>
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h3" size="md">
                    {step.title}
                  </Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    {step.description}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>

          <Button
            as={RouterLink}
            to="/register"
            size="lg"
            colorScheme="blue"
            bg="brand.600"
            _hover={{ bg: 'brand.700' }}
            px={8}
            mt={8}
          >
            Get Started Now
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

// Subjects Section
const Subjects = () => {
  const subjects = [
    { name: 'Mathematics', icon: '📐', id: 'mathematics' },
    { name: 'Sciences', icon: '🧪', id: 'sciences' },
    { name: 'Languages', icon: '🔤', id: 'languages' },
    { name: 'Humanities', icon: '🌍', id: 'humanities' },
  ];

  return (
    <Box py={20} id="subjects">
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <VStack spacing={4}>
            <Heading as="h2" size="xl" textAlign="center">
              Subjects We Cover
            </Heading>
            <Text fontSize="lg" color="gray.500" textAlign="center" maxW="3xl">
              Comprehensive practice materials for all IGCSE subjects
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} width="full">
            {subjects.map((subject) => (
              <Box
                key={subject.name}
                id={subject.id}
                p={8}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
                _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
                transition="all 0.3s"
              >
                <Text fontSize="5xl" mb={4}>
                  {subject.icon}
                </Text>
                <Heading as="h3" size="md" mb={2}>
                  {subject.name}
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  Practice tests and resources tailored to your curriculum
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

// Call to Action Section
const CallToAction = () => {
  return (
    <Box py={16} bg="brand.600">
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={8}
          align="center"
          justify="space-between"
        >
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={4} maxW="xl">
            <Heading color="white" as="h2" size="xl">
              Ready to ace your IGCSE exams?
            </Heading>
            <Text color="white" fontSize="lg">
              Join thousands of students who have improved their grades with our platform.
            </Text>
          </VStack>
          <HStack spacing={4}>
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              bg="white"
              color="brand.600"
              _hover={{ bg: 'gray.100' }}
              px={8}
            >
              Sign Up Free
            </Button>
            <Button
              as={RouterLink}
              to="/login"
              size="lg"
              variant="outline"
              colorScheme="white"
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              px={8}
            >
              Login
            </Button>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

// About Section
const About = () => {
  return (
    <Box py={20} id="about">
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={12}
          align="center"
        >
          <Box w={{ base: 'full', lg: '50%' }}>
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Students collaborating"
              rounded="lg"
              shadow="xl"
              fallbackSrc="https://via.placeholder.com/500"
            />
          </Box>
          <VStack
            w={{ base: 'full', lg: '50%' }}
            align={{ base: 'center', lg: 'flex-start' }}
            spacing={6}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <Heading as="h2" size="xl">
              About Our Platform
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Our IGCSE Exam Preparation Platform was created by educators and technology experts with over 20 years of experience in international education. We understand the challenges students face when preparing for these critical exams.
            </Text>
            <Text fontSize="lg" color="gray.600">
              Our mission is to provide accessible, high-quality practice materials that help students build confidence and achieve their academic goals. We work closely with experienced IGCSE teachers to ensure our content matches the latest curriculum requirements.
            </Text>
            <Text fontSize="lg" color="gray.600">
              With thousands of questions, detailed explanations, and powerful analytics, we've helped students from over 50 countries improve their grades and gain admission to top universities worldwide.
            </Text>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
};

// Main Homepage Component
const HomePage = () => {
  return (
    <Box>
      <Hero />
      <Features />
      <HowItWorks />
      <Subjects />
      <About />
      <CallToAction />
    </Box>
  );
};

export default HomePage; 