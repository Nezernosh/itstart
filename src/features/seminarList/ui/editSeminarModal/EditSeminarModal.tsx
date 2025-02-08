import React, { useState } from "react";
import { Seminar } from "../../model/types";
//import "./modal.css"; // Adjust the relative path as needed

interface EditSeminarModalProps {
  seminar: Seminar;
  onSave: (updatedSeminar: Seminar) => void;
  onCancel: () => void;
}

export const EditSeminarModal: React.FC<EditSeminarModalProps> = ({
  seminar,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Seminar>(seminar);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Seminar</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="time">Time:</label>
            <input
              id="time"
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="photo">Photo URL:</label>
            <input
              id="photo"
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
