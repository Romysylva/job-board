import React from "react";
import LoginForm from "../auth/LoginForm";
import Header from "../../Header/Header";
import DynamicDrawer from "../../components/TopNavAndDrawer";

const LoginPage = () => {
  const handleLogin = (data) => {
    console.log("Login data submitted:", data);
    // Connect with backend API for login
  };

  const handleTabSelection = (text) => {
    console.log("Menu item clicked:", text);
  };

  const menuItems = [
    {
      text: "Dashboard",
      // icon: <InboxIcon />,
    },
    { name: "Overview", path: "/dashboard" },
    {
      text: "Messages",
      // icon: <MailIcon />,
      subItems: [
        {
          text: "Inbox",
          //  icon: <InboxIcon />
        },
        {
          text: "Sent",
          //  icon: <MailIcon />
        },
      ],
    },
    {
      text: "Settings",
      // icon: <InboxIcon />,
    },
    {
      text: "Help",
      // icon: <InfoIcon />,
      subItems: [
        {
          text: "FAQ",
          //  icon: <InfoIcon />
        },
        {
          text: "Support",
          //  icon: <InfoIcon />
        },
      ],
    },
  ];

  return (
    <div className="h-screen ">
      <DynamicDrawer
        menuItems={menuItems}
        title="Home| Page"
        onSelectedTab={handleTabSelection}
      >
        <div
          className="w-full bg-white max-w-md p-6 dark:bg-gray-900 rounded-lg  shadow-md  flex  m-auto mt-20"
          // style={{ position: "relative" }}
        >
          <div
            className="w-full bg-white"
            // style={{
            //   margin: "0",
            //   position: "absolute",
            //   top: "50%",
            //   transform: "translateY-50%",
            // }}
          >
            <LoginForm onLogin={handleLogin} />
            <div className="flex justify-center">
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <div className="flex justify-center mt-6">
              <a
                href="/register"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Register
              </a>
            </div>

            <div className="flex justify-center mt-6"></div>
          </div>
        </div>
      </DynamicDrawer>
      {/* <Header />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <LoginForm onLogin={handleLogin} />
      </div> */}
    </div>
  );
};

export default LoginPage;
