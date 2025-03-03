"use client";

import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { GiAchievement } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";

import List from "./List";

interface LikesCheckpointsContainerProps {
  likedRoutes: { id: string; title: string }[];
  badgedRoutes: { id: string; title: string }[];
}

function LikesCheckpointsContainer({
  likedRoutes,
  badgedRoutes,
}: LikesCheckpointsContainerProps) {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <Tabs
      selectedIndex={selectedTab}
      onSelect={(index) => setSelectedTab(index)}
    >
      <TabList className="flex w-full">
        <Tab
          className="flex-grow flex justify-center items-center p-2 cursor-pointer text-theme-gray text-3xl opacity-75"
          selectedClassName="border-b-2 border-theme-green text-theme-green"
        >
          <FaHeart />
        </Tab>
        <Tab
          className="flex-grow flex justify-center items-center p-2 cursor-pointer text-theme-gray text-4xl opacity-75"
          selectedClassName="border-b-2 border-theme-green text-theme-green"
        >
          <GiAchievement />
        </Tab>
      </TabList>
      <TabPanel>
        <List items={likedRoutes} />
      </TabPanel>
      <TabPanel>
        <List items={badgedRoutes} />
      </TabPanel>
    </Tabs>
  );
}

export default LikesCheckpointsContainer;
