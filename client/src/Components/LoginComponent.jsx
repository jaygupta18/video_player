import { useContext, useEffect, useState } from "react";

import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import { loginUser } from "../API/fetchData";

const LoginComponent = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [submitted, setSubmitted] = useState(false);

  const { setEmail, isAuthorized, setIsAuthorized, setName } = useContext(
    AuthenticationContext
  );

  const handleChange = (event) => {
    const { type, value } = event.target;
    setCredentials({ ...credentials, [type]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await loginUser(credentials);
    if (response.status == 200 && response.data.auth) {
      setIsAuthorized(response.data.auth);
      setName(response.data.name);
      setEmail(response.data.email);
    }
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted)
      setTimeout(() => {
        setSubmitted(false);
      }, 1500);
  }, [submitted]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl mb={3} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            onChange={handleChange}
            placeholder="Email Address"
          />
        </FormControl>

        <FormControl mb={3} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </FormControl>

        <Button type="submit" onClick={handleSubmit} colorScheme="green">
          LOGIN
        </Button>
      </form>

      {submitted && !isAuthorized ? (
        <Text fontWeight={"bold"} mt={3} textAlign={"center"} color={"red"}>
          User Not Found
        </Text>
      ) : null}
    </div>
  );
};

export default LoginComponent;
