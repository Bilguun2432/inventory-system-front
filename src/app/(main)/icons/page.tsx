"use client";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import React from "react";

const Icons = () => {
  return (
    <DashboardCard title="Icons">
      <iframe src="https://tabler-icons.io/" title="Inline Frame Example" frameBorder={0} width="100%" height="650"></iframe>
    </DashboardCard>
  );
};

export default Icons;
