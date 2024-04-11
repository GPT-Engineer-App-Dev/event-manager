import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast({
          title: "Registration successful.",
          description: "You have successfully registered and logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      } else {
        throw new Error("Failed to register user");
      }
    } catch (error) {
      toast({
        title: "Error registering user.",
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
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
