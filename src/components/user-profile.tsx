"use client";

import { useUserStore } from "@/stores/user-store";
import React, { useCallback, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usersOptions } from "@/server/get-users";
import { User } from "@/types/user-type";
import { useSearchParams } from "next/navigation";
import Card from "./card";
import DynamicTable, { DynamicColumn } from "./table";
import styles from "@/styles/user-profile.module.scss";
import { SquareUserRound } from "lucide-react";
import { initialRawTasks, ToggleTaskHandler } from "@/constants/tasks";
import { generateTaskAction } from "@/constants/tasks";

const UserProfile = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [tasks, setTasks] = useState(initialRawTasks);
  //I check here if there is an existing context state, if not I use the id in the params to locate the proper user.
  //This allows me to persist the selected user when reloading the page and not lose state.
  const selectedUser = useUserStore((state) => state.selectedUser);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const { data: userData } = useSuspenseQuery(usersOptions);
  if (!selectedUser) {
    const currentUser = userData.find((user: User) => user.id === Number(userId));
    setSelectedUser(currentUser);
  }

  const handleToggleTask: ToggleTaskHandler = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, status: task.status === "Completado" ? "No completado" : "Completado" } : task))
    );
  }, []);

  // Prepare rows for the DynamicTable, generating the action button for each task
  const tableRows = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      action: generateTaskAction(task, handleToggleTask),
    }));
  }, [tasks, handleToggleTask]);

  const taskColumns: DynamicColumn[] = [
    { key: "id", header: "ID" },
    { key: "title", header: "Tarea" },
    { key: "status", header: "Estado" },
    { key: "action", header: "Acciones" },
  ];

  return (
    <figure className={styles.userProfileLayout}>
      <Card>
        <Card.Header>
          {selectedUser?.name} <SquareUserRound size={30} />
        </Card.Header>
        <Card.Body>
          <strong>Sitio Web:</strong>{" "}
          <a href={`http://${selectedUser?.website}`} target="_blank" rel="noopener noreferrer">
            {selectedUser?.website}
          </a>
          <p>
            <strong>Calle:</strong> {selectedUser?.address.street}, {selectedUser?.address.suite}
          </p>
          <p>
            <strong>Ciudad:</strong> {selectedUser?.address.city}
          </p>
          <p>
            <strong>Código Postal:</strong> {selectedUser?.address.zipcode}
          </p>
        </Card.Body>
        <Card.Footer>
          <h4>Detalles de la Compañía:</h4>
          <p>
            <strong>Nombre:</strong> {selectedUser?.company.name}
          </p>
          <p>
            <strong>Eslogan:</strong> {selectedUser?.company.catchPhrase}
          </p>
        </Card.Footer>
      </Card>
      <div className={styles.profileTableContainer}>
        <DynamicTable columns={taskColumns} rows={tableRows} itemsPerPage={5} />
      </div>
    </figure>
  );
};

export default UserProfile;
