import React, { useState, useEffect } from "react";
import ProfileDetails from "./ProfileDetails";
import ActivityFeed from "./ActivityFeed";
import SettingsSection from "./SettingsSection";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "./Sidebar";
import UpdateProfile from "./UpdateProfile";
import axios from "axios";
import ManagePreferences from "./ManagePreference";
import UserProfile from "./UserProfile";

const UserProfilePage = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openPreferences, setOpenPreferences] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const handleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleOpenProfile = () => {
    setOpenProfile(!openProfile);
    setOpenPreferences(false);
    setUserProfile(false);
  };
  const handleOpenPreferences = () => {
    setOpenPreferences(!openPreferences);
    setOpenProfile(false);
    setUserProfile(false);
  };

  const handleUserOpen = () => {
    setUserProfile(!userProfile);
    setOpenPreferences(false);
    setOpenSetting(false);
    setOpenProfile(false);
  };
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 ">
        <Sidebar
          onHandleOpen={handleOpenSetting}
          setOpenProfile={setOpenProfile}
          setOpenPreferences={setOpenPreferences}
          onOpenUserProfile={handleUserOpen}
          setUserProfile={setUserProfile}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex w-full ">
              {/* Left Sidebar: Profile Details */}
              {/* <aside className="col-span-1">
              <ProfileDetails />
            </aside> */}

              {/* Main Content: Activity Feed */}
              <section className="col-span-2">
                <ActivityFeed />
              </section>
              {openSetting && (
                <section className="col-span-2">
                  <SettingsSection
                    onOpenProfile={handleOpenProfile}
                    onOpenPreference={handleOpenPreferences}
                    setUserProfile={setUserProfile}
                  />
                </section>
              )}
            </div>
            <div className="w-full lg:w-1/3 ">
              {openProfile && (
                <section className="col-span-2">
                  <UpdateProfile />
                </section>
              )}
            </div>
            <div className="w-full lg:w-1/3 ">
              {openPreferences && (
                <section className="col-span-2">
                  <ManagePreferences />
                </section>
              )}
              <div>{userProfile && <UserProfile />}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserProfilePage;

// import React from "react";

// const UserProfilePage = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Sidebar */}

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold dark:text-white">User Profile</h1>
//         {/* Add content for selected section */}
//         <p className="mt-4 text-gray-700 dark:text-gray-300">
//           Select a section from the sidebar to view details.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;
