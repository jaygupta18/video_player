import { useEffect, useState } from "react";

import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { registerUser } from "../API/fetchData";

const RegisterComponent = () => {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse(await registerUser(details));
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
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
          />
        </FormControl>

        <FormControl mb={3} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
          />
        </FormControl>

        <FormControl mb={3} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </FormControl>

        <Button type="submit" onClick={handleSubmit} colorScheme="green">
          REGISTER
        </Button>
      </form>

      {submitted ? console.log(response) : null}
      <Text
        textAlign={"center"}
        fontWeight={"bold"}
        color={response.registered ? "black" : "red"}
        mt={2}
      >
        {submitted ? response.data.message : null}
      </Text>
    </div>
  );
};

export default RegisterComponent;
