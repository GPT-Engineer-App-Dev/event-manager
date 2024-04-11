import React from "react";
import { Box, Flex, Heading, VStack, Link } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Box bg="blue.500" py={4} px={8}>
        <Heading as="h1" size="xl" color="white">
          Event Manager
        </Heading>
      </Box>

      <Flex flex={1}>
        <Box bg="gray.100" width="200px" p={4}>
          <VStack align="stretch" spacing={4}>
            <Link as={RouterLink} to="/">
              Events
            </Link>
            {isAuthenticated ? (
              <>
                <Link as={RouterLink} to="/create-event">
                  Create Event
                </Link>
                <Link onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <>
                <Link as={RouterLink} to="/register">
                  Register
                </Link>
                <Link as={RouterLink} to="/login">
                  Login
                </Link>
              </>
            )}
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Navigation;
