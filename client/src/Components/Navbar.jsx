// Packages
import React, { useContext, useState } from "react";

// Components
import {
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";

import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

export default function Navbar() {
  const { query, setQuery } = useContext(AuthenticationContext);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="Navbar">
      <Flex>
        <Flex className="SideNav">
          <DrawerComponent />
          <Link to={"/"}>
            <Image
              src={`https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/youtube-256.png`}
              alt={"youtubeLogo"}
              w={"85px"}
            />
          </Link>
        </Flex>

        <Flex>
          <InputGroup>
            <InputRightElement pointerEvents="auto">
              <Link className="searchIcon" to={`search/${query}`}>
                <Search2Icon />
              </Link>
            </InputRightElement>
            <Input
              onChange={handleChange}
              type="text"
              placeholder="Search"
              value={query}
            />
          </InputGroup>
          <Button borderRadius={"50%"} p={0}>
            <i className="bi bi-mic"></i>
          </Button>
        </Flex>

        <Flex>
          <Button borderRadius={"50%"} bg={"none"} p={0}>
            <Link to={"/upload"}>
              <i className="bi bi-camera-reels"></i>
            </Link>
          </Button>
          <Button borderRadius={"50%"} bg={"none"} p={0}>
            <i className="bi bi-bell"></i>
          </Button>
          <Button borderRadius={"50%"} bg={"none"} p={0}>
            <Link to={"/login"}>
              <i className="bi bi-person"></i>
            </Link>
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
