// Packages

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Text,
  Image,
  VStack,
  Box,
} from "@chakra-ui/react";

import React from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Channel,
  History,
  HomeIcon,
  LikedVideos,
  Purchase,
  Subscription,
  Trending,
  WatchLater,
} from "./VariousIcons";
import { Link } from "react-router-dom";

export default function DrawerComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Box className="hamburger" color={"black"} ref={btnRef} onClick={onOpen}>
        <i
          id="drawer-button"
          style={{ fontSize: "21px" }}
          className="bi bi-list"
        ></i>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex className="title">
              <HamburgerIcon />
              <Image
                src={`https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/youtube-256.png`}
                alt={"youtubeLogo"}
                w={"55px"}
              />
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack className="links">
              <Link>
                <HomeIcon />
                <Text>Home</Text>
              </Link>

              <Link>
                <Trending />
                <Text>Trending</Text>
              </Link>

              <Link>
                <Subscription />
                <Text>Subscription</Text>
              </Link>

              <Text className="lib">Library</Text>

              <Link>
                <History />
                <Text>History</Text>
              </Link>

              <Link>
                <WatchLater />
                <Text>Watch Later</Text>
              </Link>

              <Link>
                <LikedVideos />
                <Text>Liked Videos</Text>
              </Link>

              <Link>
                <Purchase />
                <Text>Purchase</Text>
              </Link>

              <Text className="lib">You</Text>

              <Link>
                <Channel />
                <Text>Your Channel</Text>
              </Link>

              <Text className="lib">Subscriptions</Text>

              <Link>
                <Channel />
                <Text>Channel 1</Text>
              </Link>

              <Link>
                <Channel />
                <Text>Channel 2</Text>
              </Link>

              <Link>
                <Channel />
                <Text>Channel 3</Text>
              </Link>

              <Link>
                <Channel />
                <Text>Channel 4</Text>
              </Link>

              <Link>
                <Channel />
                <Text>Channel 5</Text>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
