import { Card, Button, Typography, Space, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Seminar } from "@features/seminarList";

const { Text, Paragraph, Title } = Typography;
const { confirm } = Modal;

interface SeminarItemProps {
  seminar: Seminar;
  onDelete: (id: number) => void;
  onEdit: (seminar: Seminar) => void;
}

export const SeminarItem = (props: SeminarItemProps) => {
  const { seminar, onDelete, onEdit } = props;
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this seminar?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onDelete(seminar.id);
      },
    });
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={seminar.title} src={seminar.photo} />}
      actions={[
        <Button icon={<EditOutlined />} onClick={() => onEdit(seminar)}>
          Edit
        </Button>,
        <Button icon={<DeleteOutlined />} onClick={showDeleteConfirm} danger>
          Delete
        </Button>,
      ]}
    >
      <Card.Meta
        title={
          <Title level={5} style={{ whiteSpace: "normal", marginTop: "0px" }}>
            {seminar.title}
          </Title>
        }
        description={
          <Space direction="vertical">
            <Paragraph
              ellipsis={{ rows: 3, expandable: true, symbol: "открыть" }}
            >
              {seminar.description}
            </Paragraph>
            <Text strong>{`${seminar.date} в ${seminar.time}`}</Text>
          </Space>
        }
      />
    </Card>
  );
};
