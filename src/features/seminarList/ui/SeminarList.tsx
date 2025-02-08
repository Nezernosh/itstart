import React, { useState, useEffect } from "react";
import { Seminar } from "../model/types";
import { fetchSeminars } from "../api/fetchSeminars";
import { deleteSeminar } from "../api/deleteSeminar";
import { editSeminar } from "../api/editSeminar";
import { SeminarItem } from "./SeminarItem";
import { EditSeminarModal } from "./editSeminarModal/EditSeminarModal";

export const SeminarList: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);

  useEffect(() => {
    const loadSeminars = async () => {
      try {
        const data = await fetchSeminars();
        setSeminars(data);
      } catch (error) {
        console.error("Error fetching seminars:", error);
      }
    };

    loadSeminars();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSeminar(id);
      setSeminars((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting seminar:", error);
    }
  };

  const handleEditClick = (seminar: Seminar) => {
    setEditingSeminar(seminar);
  };

  const handleSave = async (updatedSeminar: Seminar) => {
    try {
      const savedSeminar = await editSeminar(updatedSeminar.id, updatedSeminar);
      setSeminars((prev) =>
        prev.map((s) => (s.id === savedSeminar.id ? savedSeminar : s))
      );
      setEditingSeminar(null);
    } catch (error) {
      console.error("Error editing seminar:", error);
    }
  };

  const handleCancel = () => {
    setEditingSeminar(null);
  };

  return (
    <div>
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          onDelete={handleDelete}
          onEdit={handleEditClick}
        />
      ))}

      {editingSeminar && (
        <EditSeminarModal
          seminar={editingSeminar}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
