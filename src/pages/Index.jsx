import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Spacer, VStack, Link, Container, Text, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/events");
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch events. Please try again.");
      setLoading(false);
    }
  };

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
            <Link to="/create-event">Create Event</Link>
            <Link>Profile</Link>
          </VStack>
        </Box>

        {/* Main Content */}
        <Container maxW="container.lg" p={8}>
          {loading ? (
            <Flex justify="center">
              <Spinner size="xl" />
            </Flex>
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <Heading as="h2" size="lg" mb={4}>
                Upcoming Events
              </Heading>
              {events.map((event) => (
                <Box key={event.id} mb={4} p={4} borderWidth={1} borderRadius="md">
                  <Heading as="h3" size="md">
                    {event.name}
                  </Heading>
                  <Text>{event.description}</Text>
                </Box>
              ))}
            </>
          )}
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
