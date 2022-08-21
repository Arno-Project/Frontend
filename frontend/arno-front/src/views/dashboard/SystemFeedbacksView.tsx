import { useState, useEffect } from "react";

import {
  Table,
  Button,
  Title,
  UnstyledButton,
  ActionIcon,
  Group,
  Text,
  Badge,
} from "@mantine/core";

import { Check, ZoomInArea, Checks } from "tabler-icons-react";

import {
  Feedback,
  FeedbackStatus,
  FeedbackType,
  User,
  UserRole,
} from "../../models";

import { SystemFeedbackAPI } from "../../api/feedback";
import { APIDataToFeedbacks } from "../../models/utils";

import { Helmet } from "react-helmet";
import { SystemFeedbackTypeDict } from "../../assets/consts";
import UserModal from "../../components/UserModal";
import { formatDateString } from "../../dateUtils";
const TITLE = "پیشنهادات و انتقادات دریافتی";

const SystemFeedbacksView = () => {
  const [rows, setRows] = useState<Feedback[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getData = async () => {
    const res =
      await SystemFeedbackAPI.getInstance().getNonTechnicalFeedbacks();
    console.log(res);
    if (res.success) {
      const data = APIDataToFeedbacks(res);
      setRows(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const markAllAsRead = () => {
    const ids = rows.map((n: Feedback) => n.id);
    markAsRead(ids);
  };

  const markAsRead = async (ids: number[]) => {
    const res = await SystemFeedbackAPI.getInstance().markAsRead(ids);
    console.log(res);

    if (res.success) {
      getData();
    }
  };

  const renderRows = () => {
    const body: any[] = rows.map((obj: Feedback, i: number) => {
      const isRead = obj.status === FeedbackStatus.Viewed;

      let typeColor = "black";
      if (obj.type === FeedbackType.Complaint) typeColor = "orange";
      else if (obj.type === FeedbackType.Suggestion) typeColor = "blue";
      return (
        <tr key={i} color="black">
          <td>
            {!isRead && (
              <Badge color="red" variant="filled">
                جدید
              </Badge>
            )}
          </td>
          <td>
            <Text>{i + 1}</Text>
          </td>
          <td>
            <Group>
              <Text>{obj.user.username}</Text>

              <UnstyledButton
                onClick={() => {
                  setSelectedUser(obj.user);
                  setIsUserModalOpen(true);
                }}
              >
                <ZoomInArea color="black" size={22} />
              </UnstyledButton>
            </Group>
          </td>
          <td>
            <Text>{obj.text}</Text>
          </td>
          <td>
            <Badge color={typeColor}>{SystemFeedbackTypeDict[obj.type]}</Badge>
          </td>
          <td>{formatDateString(obj.created_at)}</td>
          <td>
            {isRead ? (
              <>
                <Checks color="grey" size={22} />
              </>
            ) : (
              <ActionIcon
                onClick={() => {
                  markAsRead([obj.id]);
                }}
              >
                <Check color="green" size={22} />
              </ActionIcon>
            )}
          </td>
        </tr>
      );
    });
    return <tbody>{body}</tbody>;
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>

      <Group position="apart">
        <Title order={2}>{TITLE}</Title>
        <Button
          className="tour-mark-all-as-read"
          variant="outline"
          size="xs"
          color="dark"
          onClick={markAllAsRead}
        >
          علامت‌گذاری همه به عنوان خوانده شده
        </Button>
      </Group>

      <Table striped highlightOnHover verticalSpacing="md">
        <thead>
          <tr>
            <th></th>
            <th>ردیف</th>
            <th>ارسال‌کننده</th>
            <th>متن</th>
            <th>نوع</th>
            <th>تاریخ</th>
            <th>خواندم</th>
          </tr>
        </thead>
        {renderRows()}
      </Table>
      <UserModal
        user={selectedUser!}
        isOpen={isUserModalOpen}
        changeIsOpen={setIsUserModalOpen}
        validateSpecialist={null}
      />
    </>
  );
};

export default SystemFeedbacksView;
