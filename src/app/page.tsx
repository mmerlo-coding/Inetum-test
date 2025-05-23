import PageLayout from "@/components/page-layout";
import { getQueryClient } from "@/server/get-query-client";
import { usersOptions } from "@/server/get-users";
import { dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import UsersList from "@/components/users-list";

const Home = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(usersOptions);

  return (
    <PageLayout title="Lista de usuarios">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersList />
      </HydrationBoundary>
    </PageLayout>
  );
};

export default Home;
