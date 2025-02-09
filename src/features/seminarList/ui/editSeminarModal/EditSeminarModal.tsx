import { Modal, Form, Input, DatePicker, TimePicker } from "antd";
import { Seminar } from "@features/seminarList";
import dayjs from "dayjs";

interface EditSeminarModalProps {
  seminar: Seminar;
  onSave: (updatedSeminar: Seminar) => void;
  onCancel: () => void;
  visible: boolean;
}

export const EditSeminarModal = (props: EditSeminarModalProps) => {
  const { seminar, onSave, onCancel, visible } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedSeminar: Seminar = {
        ...seminar,
        ...values,
        date: values.date.format("DD.MM.YYYY"),
        time: values.time.format("HH:mm"),
      };
      onSave(updatedSeminar);
    });
  };

  return (
    <Modal
      title="Edit Seminar"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...seminar,
          date: dayjs(seminar.date, "DD.MM.YYYY"),
          time: dayjs(seminar.time, "HH:mm"),
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select the date!" }]}
        >
          <DatePicker format="DD.MM.YYYY" />
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true, message: "Please select the time!" }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Photo URL"
          rules={[{ required: true, message: "Please input the photo URL!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
