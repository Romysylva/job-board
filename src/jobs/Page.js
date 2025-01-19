import React, { useState, useEffect } from "react";
import DynamicDrawer from "../components/components/TopNavAndDrawer";
import JobDetails from "./JobDetailPage";

import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const DetailedPage = () => {
  const handleTabSelection = (text) => {
    console.log("Menu item clicked:", text);
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <InboxIcon />,
    },
    { name: "Overview", path: "/dashboard" },
    {
      text: "Messages",
      icon: <MailIcon />,
      subItems: [
        { text: "Inbox", icon: <InboxIcon /> },
        { text: "Sent", icon: <MailIcon /> },
      ],
    },
    {
      text: "Settings",
      icon: <InboxIcon />,
    },
    {
      text: "Help",
      icon: <InfoIcon />,
      subItems: [
        { text: "FAQ", icon: <InfoIcon /> },
        { text: "Support", icon: <InfoIcon /> },
      ],
    },
  ];
  return (
    <div>
      <DynamicDrawer
        menuItems={menuItems}
        title="Home| Page"
        onSelectedTab={handleTabSelection}
      >
        <JobDetails />
      </DynamicDrawer>
    </div>
  );
};

export default DetailedPage;
