import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, VStack, Link, Container, Text, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useToast } from "@chakra-ui/react";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");

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
              {events.map((event) => {
                const { isOpen, onOpen, onClose } = useDisclosure();
                const initialRef = React.useRef();
                const finalRef = React.useRef();
                const toast = useToast();

                const handleEdit = async () => {
                  try {
                    const response = await fetch(`http://localhost:1337/api/events/${event.id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ name: eventName, description }),
                    });

                    if (response.ok) {
                      toast({
                        title: "Event updated.",
                        description: "The event details have been updated successfully.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                      fetchEvents();
                      onClose();
                    } else {
                      throw new Error("Failed to update event");
                    }
                  } catch (error) {
                    toast({
                      title: "Error updating event.",
                      description: error.toString(),
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                };

                return (
                  <Box key={event.id} mb={4} p={4} borderWidth={1} borderRadius="md">
                    <Heading as="h3" size="md">
                      {event.name}
                    </Heading>
                    <Text>{event.description}</Text>
                    <Button ml={4} onClick={onOpen}>
                      Edit
                    </Button>
                    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Event</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl>
                            <FormLabel>Event Name</FormLabel>
                            <Input ref={initialRef} defaultValue={event.name} onChange={(e) => setEventName(e.target.value)} />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input defaultValue={event.description} onChange={(e) => setDescription(e.target.value)} />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={handleEdit}>
                            Save
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Box>
                );
              })}
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
