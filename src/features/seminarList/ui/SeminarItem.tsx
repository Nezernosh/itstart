import React from "react";
import { Seminar } from "../model/types";

interface SeminarItemProps {
  seminar: Seminar;
  onDelete: (id: number) => void;
  onEdit: (seminar: Seminar) => void;
}

export const SeminarItem: React.FC<SeminarItemProps> = ({
  seminar,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="seminar-item">
      <h3>{seminar.title}</h3>
      <p>{seminar.description}</p>
      <p>
        {seminar.date} at {seminar.time}
      </p>
      <img src={seminar.photo} alt={seminar.title} width={200} />
      <div className="actions">
        <button onClick={() => onDelete(seminar.id)}>Delete</button>
        <button onClick={() => onEdit(seminar)}>Edit</button>
      </div>
    </div>
  );
};
