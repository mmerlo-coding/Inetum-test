"use client";

import PageLayout from "@/components/page-layout";
import { getQueryClient } from "@/server/get-query-client";
import { usersOptions } from "@/server/get-users";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import UserProfile from "@/components/user-profile";

const UserProfilePage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(usersOptions);
  return (
    <PageLayout title={`Informacion de usuario y tareas`}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile />
      </HydrationBoundary>
    </PageLayout>
  );
};

export default UserProfilePage;
