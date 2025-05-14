"use client";

import { useUserStore } from "@/stores/user-store";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usersOptions } from "@/server/get-users";
import { User } from "@/types/user-type";
import { useSearchParams } from "next/navigation";
import Card from "./card";
import DynamicTable, { DynamicColumn } from "./table";
import styles from "@/styles/user-profile.module.scss";
import { SquareUserRound } from "lucide-react";
import { initialRawTasks, ToggleTaskHandler, generateTaskAction, Task } from "@/constants/tasks";

function UserProfileContent({ userId }: { userId: string | null }) {
  const [tasks, setTasks] = useState<Task[]>(initialRawTasks);
  const selectedUser = useUserStore((state) => state.selectedUser);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const { data: userData } = useSuspenseQuery(usersOptions);

  useEffect(() => {
    if (userId) {
      const userFromParams = userData.find((user: User) => user.id === Number(userId));
      if (userFromParams) {
        if (selectedUser?.id !== userFromParams.id) {
          setSelectedUser(userFromParams);
        }
      } else {
        setSelectedUser(null);
      }
    } else {
      setSelectedUser(null);
    }
  }, [userId, userData, setSelectedUser, selectedUser?.id]);

  const handleToggleTask: ToggleTaskHandler = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, status: task.status === "Completado" ? "No completado" : "Completado" } : task))
    );
  }, []);

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

  if (!selectedUser) {
    return <div className={styles.loadingState}>Seleccione un usuario para ver sus tareas.</div>;
  }

  return (
    <figure className={styles.userProfileLayout}>
      <Card>
        <Card.Header>
          {selectedUser.name} <SquareUserRound size={30} />
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Calle:</strong> {selectedUser.address.street}, {selectedUser.address.suite}
          </p>
          <p>
            <strong>Ciudad:</strong> {selectedUser.address.city}
          </p>
          <p>
            <strong>Código Postal:</strong> {selectedUser.address.zipcode}
          </p>
        </Card.Body>
        <Card.Footer>
          <h4>Detalles de la Compañía:</h4>
          <p>
            <strong>Nombre:</strong> {selectedUser.company.name}
          </p>
          <p>
            <strong>Eslogan:</strong> {selectedUser.company.catchPhrase}
          </p>
        </Card.Footer>
      </Card>
      <div className={styles.profileTableContainer}>
        <DynamicTable columns={taskColumns} rows={tableRows} itemsPerPage={5} />
      </div>
    </figure>
  );
}

const UserProfileWithParamsReader = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <Suspense fallback={<div className={styles.loadingState}>Loading user tasks and details...</div>}>
      <UserProfileContent userId={userId} />
    </Suspense>
  );
};

const UserProfilePage = () => {
  return (
    <Suspense fallback={<div className={styles.loadingState}>Loading user information...</div>}>
      <UserProfileWithParamsReader />
    </Suspense>
  );
};

export default UserProfilePage;
