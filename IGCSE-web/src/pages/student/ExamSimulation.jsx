import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Badge,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Checkbox,
  Tooltip,
  Alert,
  AlertIcon,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FiFlag, FiClock, FiAlertCircle, FiCheck, FiBookmark, FiHelpCircle } from 'react-icons/fi';

const ExamSimulation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [errorTracking, setErrorTracking] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Placeholder exam data - this would typically come from an API
  const examData = {
    title: "Sample IGCSE Mathematics Exam",
    subject: "Mathematics",
    duration: 7200, // 2 hours in seconds
    questions: [
      {
        id: 1,
        text: "If f(x) = 2x² + 3x - 5, calculate f(3).",
        options: ["16", "22", "28", "34"],
        correctAnswer: "22",
        concept: "Function Evaluation",
        explanation: "Substitute x = 3 into f(x) = 2x² + 3x - 5:\nf(3) = 2(3)² + 3(3) - 5\nf(3) = 2(9) + 9 - 5\nf(3) = 18 + 9 - 5\nf(3) = 22",
        hint: "Replace all instances of x with 3, then follow order of operations: square first, then multiply, then add/subtract."
      },
      {
        id: 2,
        text: "Solve for x: 3x - 7 = 8",
        options: ["x = 3", "x = 5", "x = 7", "x = 15/3"],
        correctAnswer: "x = 5",
        concept: "Linear Equations",
        explanation: "3x - 7 = 8\n3x = 15\nx = 5",
        hint: "To isolate x, first add 7 to both sides of the equation."
      },
      {
        id: 3,
        text: "What is the derivative of y = x³ + 2x² - 4x with respect to x?",
        options: ["3x² + 4x - 4", "3x² + 4x", "3x² + 4x - 1", "x² + 2x - 4"],
        correctAnswer: "3x² + 4x - 4",
        concept: "Differentiation",
        explanation: "For y = x³ + 2x² - 4x, use the power rule: d/dx(xⁿ) = nxⁿ⁻¹\nd/dx(x³) = 3x²\nd/dx(2x²) = 4x\nd/dx(-4x) = -4\nSo the derivative is 3x² + 4x - 4",
        hint: "Use the power rule: differentiate each term separately, then combine."
      }
    ],
  };

  useEffect(() => {
    // Initialize timer when component mounts
    if (timeRemaining === null) {
      setTimeRemaining(examData.duration);
    }

    // Timer countdown
    const timer = timeRemaining > 0 && !examCompleted && setInterval(() => {
      setTimeRemaining(prev => {
        // Show time warning when 15 minutes left
        if (prev === 900) {
          toast({
            title: "15 minutes remaining",
            description: "You're running out of time. Focus on completing the remaining questions.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, examCompleted, toast]);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleFlaggedQuestion = (questionId) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
  };

  const handleSubmitExam = () => {
    // Calculate results and track errors
    const newErrorTracking = [];
    let correctCount = 0;

    examData.questions.forEach(question => {
      const isCorrect = answers[question.id] === question.correctAnswer;
      
      if (!isCorrect && answers[question.id]) {
        newErrorTracking.push({
          questionId: question.id,
          question: question.text,
          studentAnswer: answers[question.id],
          correctAnswer: question.correctAnswer,
          concept: question.concept,
          explanation: question.explanation,
          timestamp: new Date(),
        });
      }

      if (isCorrect) correctCount++;
    });

    // Update error tracking state
    setErrorTracking(newErrorTracking);
    
    // Calculate score
    const score = Math.round((correctCount / examData.questions.length) * 100);
    
    // Show toast notification with score
    toast({
      title: `Exam Completed`,
      description: `Your score: ${score}%. ${newErrorTracking.length > 0 ? 'Some errors have been recorded for review.' : 'Great job!'}`,
      status: score >= 70 ? "success" : score >= 50 ? "info" : "warning",
      duration: 5000,
      isClosable: true,
    });
    
    setExamCompleted(true);
    onOpen(); // Open results modal
  };

  const handleTimeExpired = () => {
    toast({
      title: "Time Expired",
      description: "Your exam time has run out. Your answers have been submitted automatically.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    
    handleSubmitExam();
  };

  if (timeRemaining === 0 && !examCompleted) {
    handleTimeExpired();
  }

  return (
    <Container maxW="container.lg" py={8}>
      {/* Exam Header */}
      <Box bg="white" boxShadow="sm" borderRadius="lg" p={4} mb={4}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">{examData.title}</Heading>
          <HStack>
            <Badge colorScheme="blue" fontSize="sm" p={1}>{examData.subject}</Badge>
            <Flex align="center" bg="gray.100" px={3} py={2} borderRadius="md">
              <FiClock size={18} color={timeRemaining < 600 ? "red" : "currentColor"} />
              <Text ml={2} fontFamily="mono" fontWeight="bold" color={timeRemaining < 600 ? "red.500" : "gray.700"}>
                {formatTime(timeRemaining)}
              </Text>
            </Flex>
          </HStack>
        </Flex>
        
        {/* Question navigation indicators */}
        <Box mt={4}>
          <Text mb={2} fontSize="sm" fontWeight="medium">Question Navigation:</Text>
          <Flex wrap="wrap" gap={2}>
            {examData.questions.map((q, index) => (
              <Button 
                key={q.id}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                colorScheme={currentQuestion === index ? "blue" : undefined}
                variant={currentQuestion === index ? "solid" : "outline"}
                bg={answers[q.id] ? (currentQuestion === index ? "blue.500" : "green.100") : undefined}
                position="relative"
              >
                {index + 1}
                {flaggedQuestions.includes(q.id) && (
                  <Box position="absolute" top="-2px" right="-2px">
                    <FiFlag size={10} color="red" />
                  </Box>
                )}
              </Button>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Progress 
        value={(Object.keys(answers).length / examData.questions.length) * 100} 
        size="sm" 
        colorScheme="green" 
        borderRadius="full" 
        mb={4}
      />

      {/* Question Section */}
      <Box bg="white" boxShadow="md" borderRadius="lg" p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="md">
            Question {currentQuestion + 1} of {examData.questions.length}
          </Heading>
          <HStack>
            <Tooltip label={flaggedQuestions.includes(examData.questions[currentQuestion]?.id) ? "Unflag this question" : "Flag for review"}>
              <IconButton
                icon={<FiFlag />}
                variant="ghost"
                colorScheme={flaggedQuestions.includes(examData.questions[currentQuestion]?.id) ? "red" : "gray"}
                aria-label="Flag question"
                onClick={() => toggleFlaggedQuestion(examData.questions[currentQuestion]?.id)}
              />
            </Tooltip>
            <Tooltip label="Show hint">
              <IconButton
                icon={<FiHelpCircle />}
                variant="ghost"
                colorScheme="blue"
                aria-label="Show hint"
                onClick={() => setShowHint(!showHint)}
              />
            </Tooltip>
          </HStack>
        </Flex>
        
        {/* Question Text */}
        <Text fontSize="lg" mb={4}>{examData.questions[currentQuestion]?.text}</Text>
        
        {/* Hint (if shown) */}
        {showHint && (
          <Alert status="info" mb={4} borderRadius="md">
            <AlertIcon />
            <Text fontSize="sm">{examData.questions[currentQuestion]?.hint}</Text>
          </Alert>
        )}
        
        {/* Answer Options */}
        <RadioGroup 
          onChange={(value) => handleAnswerSelect(examData.questions[currentQuestion]?.id, value)} 
          value={answers[examData.questions[currentQuestion]?.id] || ''}
        >
          <Stack spacing={3}>
            {examData.questions[currentQuestion]?.options.map((option, index) => (
              <Box 
                key={index}
                borderWidth="1px"
                borderRadius="md"
                p={3}
                _hover={{ bg: "gray.50" }}
                borderColor={answers[examData.questions[currentQuestion]?.id] === option ? "blue.500" : "gray.200"}
              >
                <Radio value={option}>
                  <Text>{option}</Text>
                </Radio>
              </Box>
            ))}
          </Stack>
        </RadioGroup>

        {/* Navigation Buttons */}
        <Flex justify="space-between" mt={8}>
          <Button
            leftIcon={<FiAlertCircle />}
            colorScheme="red"
            variant="outline"
            onClick={onOpen}
            isDisabled={!examCompleted}
          >
            Review Errors
          </Button>
          
          <HStack>
            <Button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              isDisabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
            {currentQuestion === examData.questions.length - 1 ? (
              <Button
                colorScheme="green"
                onClick={handleSubmitExam}
                isDisabled={examCompleted}
              >
                Submit Exam
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                onClick={() => setCurrentQuestion(prev => Math.min(examData.questions.length - 1, prev + 1))}
              >
                Next
              </Button>
            )}
          </HStack>
        </Flex>
      </Box>

      {/* Results Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {examCompleted ? "Exam Results" : "Confirm Submission"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {examCompleted ? (
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Summary</Heading>
                <HStack justify="space-between">
                  <Text>Total Questions:</Text>
                  <Text fontWeight="bold">{examData.questions.length}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Answered:</Text>
                  <Text fontWeight="bold">{Object.keys(answers).length}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Correct Answers:</Text>
                  <Text fontWeight="bold">{examData.questions.filter(q => answers[q.id] === q.correctAnswer).length}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Errors Tracked:</Text>
                  <Text fontWeight="bold" color={errorTracking.length > 0 ? "red.500" : "green.500"}>
                    {errorTracking.length}
                  </Text>
                </HStack>
                
                {errorTracking.length > 0 && (
                  <>
                    <Divider />
                    <Heading size="md">Errors to Review</Heading>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      These errors have been added to your error management system for future review.
                    </Text>
                    
                    {errorTracking.map((error, index) => (
                      <Box 
                        key={index} 
                        p={4} 
                        borderWidth="1px" 
                        borderRadius="md" 
                        borderColor="red.200"
                        bg="red.50"
                      >
                        <Text fontWeight="bold" mb={2}>
                          Question {error.questionId}: {error.concept}
                        </Text>
                        <Text mb={2}>{error.question}</Text>
                        <HStack mb={1}>
                          <Text fontWeight="bold" color="red.500">Your answer:</Text>
                          <Text>{error.studentAnswer}</Text>
                        </HStack>
                        <HStack mb={3}>
                          <Text fontWeight="bold" color="green.500">Correct answer:</Text>
                          <Text>{error.correctAnswer}</Text>
                        </HStack>
                        <Divider mb={2} />
                        <Text fontSize="sm" fontWeight="bold">Explanation:</Text>
                        <Text fontSize="sm" whiteSpace="pre-line">{error.explanation}</Text>
                      </Box>
                    ))}
                  </>
                )}
              </VStack>
            ) : (
              <Text>Are you sure you want to submit your exam? You won't be able to change your answers afterward.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            {examCompleted ? (
              <Button colorScheme="blue" onClick={onClose}>Close</Button>
            ) : (
              <>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Continue Exam
                </Button>
                <Button colorScheme="blue" onClick={handleSubmitExam}>
                  Submit Exam
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ExamSimulation; 