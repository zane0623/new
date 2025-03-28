import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Badge,
  Image,
  Icon,
  Progress,
  useColorModeValue
} from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const CourseCard = ({ 
  id, 
  title, 
  progress, 
  description, 
  image, 
  level, 
  badge, 
  nextLesson,
  isEnrolled = false 
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Box h="160px" position="relative">
        {image ? (
          <Image src={image} alt={title} objectFit="cover" w="100%" h="100%" />
        ) : (
          <Flex 
            align="center" 
            justify="center" 
            h="100%" 
            bg={useColorModeValue('blue.50', 'blue.900')}
          >
            <Icon as={FaBook} boxSize={10} color="blue.500" />
          </Flex>
        )}
        {level && (
          <Box 
            position="absolute" 
            top={2} 
            right={2} 
            bg="blue.500" 
            color="white" 
            fontSize="sm" 
            px={2} 
            py={1} 
            borderRadius="md"
          >
            {level}
          </Box>
        )}
        {badge && (
          <Box 
            position="absolute" 
            top={2} 
            left={2} 
            bg={badge === 'New' ? 'green.500' : 'orange.500'} 
            color="white" 
            fontSize="sm" 
            px={2} 
            py={1} 
            borderRadius="md"
          >
            {badge}
          </Box>
        )}
      </Box>
      
      <Box p={4}>
        <Heading size="md" mb={2}>{title}</Heading>
        
        {description && (
          <Text color={textColor} noOfLines={2} mb={4}>
            {description}
          </Text>
        )}
        
        {isEnrolled && progress !== undefined && (
          <Box mb={4}>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="medium">Progress</Text>
              <Text fontSize="sm" color={textColor}>{progress}%</Text>
            </Flex>
            <Progress value={progress} size="sm" colorScheme="blue" borderRadius="full" />
            {nextLesson && (
              <Text fontSize="xs" mt={1} color={textColor}>
                Next: {nextLesson}
              </Text>
            )}
          </Box>
        )}
        
        <Flex justify="space-between" align="center" mt={2}>
          {isEnrolled ? (
            <Button 
              as={RouterLink} 
              to={`/courses/${id}`} 
              size="sm" 
              colorScheme="blue"
              width="full"
            >
              Continue
            </Button>
          ) : (
            <Button 
              as={RouterLink} 
              to={`/courses/${id}`} 
              size="sm" 
              colorScheme="blue" 
              variant="outline"
              width="full"
            >
              View Course
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default CourseCard; 