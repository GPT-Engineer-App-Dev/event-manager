import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";

function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: eventName, description }),
      });

      if (response.ok) {
        toast({
          title: "Event created.",
          description: "We've created your event.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setEventName("");
        setDescription("");
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      toast({
        title: "Error creating event.",
        description: error.toString(),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="eventName">Event Name</FormLabel>
          <Input id="eventName" placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Create Event
        </Button>
      </form>
    </Box>
  );
}

export default CreateEvent;
