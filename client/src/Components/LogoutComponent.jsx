import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import { useContext } from "react";

const LogoutComponent = () => {
  const { email, setEmail, name, setName, setIsAuthorized } = useContext(
    AuthenticationContext
  );

  let fullName = name.split(" ");

  return (
    <>
      <Box className="logout-div">
        <Flex
          direction={["column"]}
          color={"red"}
          fontSize={31}
          alignItems={"center"}
          gap={5}
          fontWeight={"bold"}
        >
          <Heading
            p={3}
            borderRadius={"50%"}
            bg={"black"}
            color={"yellow"}
            fontFamily={"Poppins"}
          >
            {fullName.length > 1 ? fullName[0][0] + fullName[1][0] : null}
          </Heading>
          <Text>{name}</Text>
        </Flex>

        <hr />

        <Text>
          Signed In as: <strong>{email}</strong>
        </Text>
        <Button
          onClick={() => {
            setIsAuthorized(false);
            setName("");
            setEmail("");
          }}
          colorScheme="red"
        >
          LOGOUT
        </Button>
      </Box>
    </>
  );
};

export default LogoutComponent;
