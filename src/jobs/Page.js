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
      {/* <DynamicDrawer
        menuItems={menuItems}
        title="Home| Page"
        onSelectedTab={handleTabSelection}
      > */}
      <JobDetails />
      {/* </DynamicDrawer> */}
    </div>
  );
};

export default DetailedPage;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DynamicDrawer from "./DynamicDrawer";

// const Dashboard = () => (
//   <div>
//     <JobDetails />
//   </div>
// );
// const Messages = () => <div>Messages Content</div>;
// const Inbox = () => <div>Inbox Content</div>;
// const Sent = () => <div>Sent Content</div>;
// const Settings = () => <div>Settings Content</div>;

// const DetailedPage = () => {
//   const menuItems = [
//     { text: "Dashboard", icon: <InboxIcon />, path: "/" },
//     {
//       text: "Messages",
//       icon: <MailIcon />,
//       subItems: [
//         { text: "Inbox", icon: <InboxIcon />, path: "/messages/inbox" },
//         { text: "Sent", icon: <MailIcon />, path: "/messages/sent" },
//       ],
//     },
//     { text: "Settings", icon: <InboxIcon />, path: "/settings" },
//   ];

//   const onSelectedTab = (menuItem) => {
//     console.log("Selected Tab:", menuItem.text);
//   };

//   return (
//     <Router>
//       <DynamicDrawer menuItems={menuItems} onSelectedTab={onSelectedTab} />
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/messages/inbox" element={<Inbox />} />
//         <Route path="/messages/sent" element={<Sent />} />
//         <Route path="/settings" element={<Settings />} />
//       </Routes>
//     </Router>
//   );
// };

// export default DetailedPage;
