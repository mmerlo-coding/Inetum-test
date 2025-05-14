import { Check, RotateCcw } from "lucide-react";
import styles from "@/styles/user-profile.module.scss";

export interface Task {
  id: number;
  title: string;
  status: "Completado" | "No completado";
}

export type ToggleTaskHandler = (taskId: number) => void;
export const initialRawTasks: Omit<Task, "action">[] = [
  { id: 1, title: "Crear un nuevo proyecto", status: "Completado" },
  { id: 2, title: "Terminar website de la empresa", status: "No completado" },
  { id: 3, title: "Iniciar campaña de marketing", status: "No completado" },
  { id: 4, title: "Registrar empresa en Google my business", status: "No completado" },
  { id: 5, title: "Enviar links de pago", status: "No completado" },
  { id: 6, title: "Hacer un video para Instagram", status: "No completado" },
];

export function generateTaskAction(task: Task, onToggleTask: ToggleTaskHandler): React.ReactNode {
  if (task.status === "Completado") {
    return (
      <button
        className={`${styles.actionButton} ${styles.actionButtonIncomplete}`} // Added a specific class for undo
        onClick={() => onToggleTask(task.id)}
      >
        Deshacer
        <RotateCcw size={16} />
      </button>
    );
  } else {
    return (
      <button className={styles.actionButton} onClick={() => onToggleTask(task.id)}>
        Completar
        <Check size={16} />
      </button>
    );
  }
}
