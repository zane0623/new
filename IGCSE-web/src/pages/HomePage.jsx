import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { FaGraduationCap, FaUsers, FaChartLine, FaBook } from 'react-icons/fa';

// Hero Section Component
const Hero = () => {
  const navigate = useNavigate();

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
                size="lg"
                colorScheme="whiteAlpha"
                onClick={() => navigate('/login')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={() => navigate('/login')}
              >
                Learn More
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
      textAlign="center"
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="xl"
      shadow="md"
      height="100%"
    >
      <Icon as={icon} w={10} h={10} color="blue.500" />
      <Text fontWeight="bold" fontSize="lg">
        {title}
      </Text>
      <Text color="gray.600">{text}</Text>
    </Stack>
  );
};

// Features Section
const Features = () => {
  return (
    <Box py={20} id="features">
      <Container maxW="container.xl">
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading>Why Choose Our Platform?</Heading>
            <Text color="gray.600" fontSize="lg">
              Comprehensive tools and features designed to support your IGCSE journey
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            <Feature
              icon={FaGraduationCap}
              title="Expert-Led Content"
              text="Access high-quality study materials and practice questions created by experienced IGCSE teachers"
            />
            <Feature
              icon={FaUsers}
              title="Personalized Learning"
              text="Get customized study plans and recommendations based on your progress and performance"
            />
            <Feature
              icon={FaChartLine}
              title="Progress Tracking"
              text="Monitor your improvement with detailed analytics and performance insights"
            />
            <Feature
              icon={FaBook}
              title="Comprehensive Resources"
              text="Access a vast library of study materials, practice tests, and reference guides"
            />
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

// How It Works Section
const HowItWorks = () => {
  const navigate = useNavigate();
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
            size="lg"
            colorScheme="blue"
            bg="brand.600"
            _hover={{ bg: 'brand.700' }}
            px={8}
            mt={8}
            onClick={() => navigate('/login')}
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
  const navigate = useNavigate();

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
              size="lg"
              colorScheme="white"
              onClick={() => navigate('/login')}
            >
              Start Free Trial
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
  const navigate = useNavigate();

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