"use client";

import { usersOptions } from "@/server/get-users";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DynamicTable, { DynamicColumn } from "./table";
import { User } from "@/types/user-type";
import styles from "@/styles/table.module.scss";
import { useUserStore } from "@/stores/user-store";
import Link from "next/link";

const UsersList = () => {
  const { data: usersData, isLoading, isError, error } = useQuery(usersOptions);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Error fetching users: {error instanceof Error ? error.message : "Unknown error"}</div>;
  }

  if (!usersData) {
    return <div>No users found.</div>;
  }

  const formattedRows = usersData.map((user: User) => ({
    ...user,
    action: (
      <Link
        href={`/todo?userId=${user.id}`}
        className={styles.Link}
        onClick={() => {
          setSelectedUser(user);
        }}
      >
        Ver Tareas
      </Link>
    ),
  }));

  const productColumns: DynamicColumn[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Nombre" },
    { key: "email", header: "Email" },
    { key: "action", header: "Acciones" },
  ];
  return <DynamicTable columns={productColumns} rows={formattedRows} itemsPerPage={5} />;
};

export default UsersList;
