import React from "react";
import { Box, Flex, Heading, Spacer, VStack, Link, Container, Text } from "@chakra-ui/react";

const Index = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      {/* Header */}
      <Box bg="blue.500" py={4} px={8}>
        <Heading as="h1" size="xl" color="white">
          Event Manager
        </Heading>
      </Box>

      <Flex flex={1}>
        {/* Sidebar Navigation */}
        <Box bg="gray.100" width="200px" p={4}>
          <VStack align="stretch" spacing={4}>
            <Link>Events</Link>
            <Link>Create Event</Link>
            <Link>Profile</Link>
          </VStack>
        </Box>

        {/* Main Content */}
        <Container maxW="container.lg" p={8}>
          <Heading as="h2" size="lg" mb={4}>
            Upcoming Events
          </Heading>
          {/* Event listing will be added here */}
        </Container>
      </Flex>

      {/* Footer */}
      <Box bg="gray.200" py={4} px={8}>
        <Text>&copy; 2023 Event Manager. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default Index;
