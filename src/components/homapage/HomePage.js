import React from "react";
// import { NavLink, Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import FeaturedJobs from "./FeaturedJobs";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import TestimonialsCarousel from "./Testimonials";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DynamicDrawer from "../../components/components/TopNavAndDrawer";
import Dashboard from "./Dashboard";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
// import DynamicDrawer from "../../";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    feedback: "This platform is amazing! It exceeded all my expectations.",
    role: "Software Engineer",
  },
  {
    id: 2,
    name: "John Smith",
    feedback: "Fantastic experience. Highly recommend it to others!",
    role: "Product Manager",
  },
  {
    id: 3,
    name: "Alice Brown",
    feedback: "The user interface is intuitive and very easy to use.",
    role: "UX Designer",
  },
  {
    id: 4,
    name: "John Doe",
    position: "Senior Developer",
    company: "Tech Innovations",
    feedback: "This platform has transformed how I approach job hunting!",
    profileImage: "https://example.com/profile1.jpg",
  },
  {
    id: 5,
    name: "Jane Smith",
    position: "Project Manager",
    company: "Creative Solutions",
    feedback: "A user-friendly and efficient platform for job seekers.",
    profileImage: "https://example.com/profile2.jpg",
  },
];

const HomePage = () => {
  // const menuItems = [
  //   { text: "Home", icon: <HomeIcon /> },
  //   { text: "Inbox", icon: <InboxIcon /> },
  //   { text: "Starred", icon: <MailIcon /> },
  //   { text: "Send email", icon: <InboxIcon /> },
  //   { text: "Drafts", icon: <MailIcon /> },
  //   { text: "Settings", icon: <SettingsIcon /> },
  //   { text: "Info", icon: <InfoIcon /> },
  //   { text: "Contact", icon: <ContactMailIcon /> },
  // ];

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
    <div className="bg-gray-50 dark:bg-gray-900 ">
      <DynamicDrawer
        menuItems={menuItems}
        title="Home| Page"
        onSelectedTab={handleTabSelection}
      >
        <HeroSection />
        <div className="my-8">
          <SearchBar />
        </div>
        <FeaturedJobs />
        <div className="px-4"></div>
      </DynamicDrawer>
      <TestimonialsCarousel testimonials={testimonials} />
    </div>
  );
};

export default HomePage;
