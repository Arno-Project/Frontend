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
  Tooltip,
  Stack,
  Modal,
  Center,
} from "@mantine/core";

import { Check, ZoomInArea, Checks, InfoCircle, Eye } from "tabler-icons-react";

import { RequestFeedback, SatisfactionItem, User } from "../../models";

import { APIDataToSatisfactionItems } from "../../models/utils";

import { Helmet } from "react-helmet";
import UserModal from "../../components/UserModal";
import { AccountAPI } from "../../api/accounts";
import UserFeedbackSearchComponent from "../../components/UserFeedbackSearchComponent";
import FeedbacksListComponent from "../../components/FeedbacksListComponent";
const TITLE = "کاربران ناراضی از خدمات";

const UserSatisfactionView = () => {
  const [rows, setRows] = useState<SatisfactionItem[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);

  const [selectedFeedbacks, setSelectedFeedbacks] = useState<RequestFeedback[]>(
    []
  );

  const threshold = 50;
  const getData = async (filters: any) => {
    const res = await AccountAPI.getInstance().getNonSatisfied(filters);
    console.log(res);
    if (res.success && res.data) {
      const data = APIDataToSatisfactionItems(res);
      console.log(data);
      setRows(data);
    }
  };

  useEffect(() => {
    getData({});
  }, []);

  const renderRows = () => {
    const body: any[] = rows.map((obj: SatisfactionItem, i: number) => {
      const infoText = `این کاربر به ${obj.badFeedbacks.length} بازخورد از ${
        obj.totalFeedbacksCount
      } بازخورد، امتیاز کم‌تر از 
      ${threshold / 20} داده است.`;
      return (
        <tr key={i} color="black">
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
          <td>{`${obj.badFeedbacks.length} بازخورد`}</td>
          <td>{`${obj.totalFeedbacksCount} بازخورد`}</td>
          <td>{obj.average / 20}</td>

          <td>
            <Stack>
              {obj.badMetrics.map((metric) => {
                return (
                    <Tooltip
                      label={metric.description}
                      color="gray"
                      transition="skew-down"
                      transitionDuration={300}
                      withArrow
                    >
                      <Badge color="dark">{metric.title}</Badge>
                    </Tooltip>
                );
              })}
            </Stack>
          </td>
          <td>
            <Center>
              <ActionIcon
                onClick={() => {
                  setSelectedUser(obj.user);
                  setSelectedFeedbacks(obj.badFeedbacks);
                  setFeedbackModalOpen(true);
                }}
              >
                <Eye color="blue" size={20} />
              </ActionIcon>
            </Center>
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

      <Title order={2}>{TITLE}</Title>

      <UserFeedbackSearchComponent
        getData={getData}
      ></UserFeedbackSearchComponent>
      <Table
        striped
        highlightOnHover
        verticalSpacing="md"
        className="tour-system-feedback-table"
      >
        <thead>
          <tr>
            <th>ردیف</th>
            <th>کاربر</th>
            <th>تعداد نارضایتی‌ها</th>
            <th>تعداد کل بازخوردها</th>
            <th>میانگین امتیاز</th>
            <th>معیارهای نارضایتی</th>
            <th> مشاهده‌ی بازخوردها</th>
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
      <Modal
        centered
        opened={isFeedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        title="بازخوردهای نارضایت‌بخش"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="80%"
      >
        <FeedbacksListComponent
          user={selectedUser}
          feedbacks={selectedFeedbacks}
        />
      </Modal>
    </>
  );
};

export default UserSatisfactionView;
