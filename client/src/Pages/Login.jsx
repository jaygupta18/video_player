// Packages
import { useContext, useEffect } from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import LoginComponent from "../Components/LoginComponent";
import LogoutComponent from "../Components/LogoutComponent";
import RegisterComponent from "../Components/RegisterComponent";

export default function Login() {
  const { isAuthorized } = useContext(AuthenticationContext);

  useEffect(() => {}, [isAuthorized]);

  if (isAuthorized) {
    return (
      <div>
        <LogoutComponent />
      </div>
    );
  }

  return (
    <div className="Login">
      <Tabs isFitted variant="enclosed" fontFamily={"Poppins"}>
        <TabList mb="1em">
          <Tab>Login User</Tab>
          <Tab>Register User</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginComponent />
          </TabPanel>

          <TabPanel>
            <RegisterComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
