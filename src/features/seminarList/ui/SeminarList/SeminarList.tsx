import { useState, useEffect } from "react";
import { List, message } from "antd";
import { Seminar, SeminarItem, EditSeminarModal } from "@features/seminarList";
import { deleteSeminar, editSeminar, fetchSeminars } from "@shared/api";

export const SeminarList = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadSeminars = async () => {
      try {
        const data = await fetchSeminars();
        setSeminars(data);
      } catch (error) {
        message.error("Error fetching seminars:" + error);
      }
    };

    loadSeminars();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSeminar(id);
      setSeminars((prev) => prev.filter((s) => s.id !== id));
      message.success("Seminar deleted successfully");
    } catch (error) {
      message.error("Error deleting seminar" + error);
    }
  };

  const handleEdit = (seminar: Seminar) => {
    setEditingSeminar(seminar);
    setModalVisible(true);
  };

  const handleSave = async (updatedSeminar: Seminar) => {
    try {
      const savedSeminar = await editSeminar(updatedSeminar.id, updatedSeminar);
      setSeminars((prev) =>
        prev.map((s) => (s.id === savedSeminar.id ? savedSeminar : s))
      );
      setModalVisible(false);
      setEditingSeminar(null);
      message.success("Seminar updated successfully");
    } catch (error) {
      message.error("Error editing seminar" + error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingSeminar(null);
  };

  return (
    <div>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        dataSource={seminars}
        renderItem={(seminar) => (
          <List.Item>
            <SeminarItem
              seminar={seminar}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </List.Item>
        )}
      />

      {editingSeminar && (
        <EditSeminarModal
          seminar={editingSeminar}
          onSave={handleSave}
          onCancel={handleCancel}
          visible={modalVisible}
        />
      )}
    </div>
  );
};
