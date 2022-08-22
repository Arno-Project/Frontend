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
} from "@mantine/core";

import { Check, ZoomInArea, Checks, InfoCircle, Eye } from "tabler-icons-react";

import {
  Feedback,
  FeedbackStatus,
  FeedbackType,
  SatisfactionItem,
  User,
} from "../../models";

import { SystemFeedbackAPI } from "../../api/feedback";
import {
  APIDataToFeedbacks,
  APIDataToSatisfactionItems,
} from "../../models/utils";

import { Helmet } from "react-helmet";
import { SystemFeedbackTypeDict } from "../../assets/consts";
import UserModal from "../../components/UserModal";
import { formatDateString } from "../../dateUtils";
import { useAppDispatch } from "../../redux/hooks";
import { useLocation } from "react-router-dom";
import { setSteps } from "../../redux/intro";
import {
  CustomerRequestStep,
  SystemFeedbackSteps,
} from "../../assets/IntroSteps";
import { AccountAPI } from "../../api/accounts";
import RequestFeedbackModal from "../../components/RequestFeedbackModal";
import UserFeedbackSearchComponent from "../../components/UserFeedbackSearchComponent";
const TITLE = "کاربران ناراضی از خدمات";

const UserSatisfactionView = () => {
  const [rows, setRows] = useState<SatisfactionItem[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
          <td>{`${  obj.totalFeedbacksCount} بازخورد`}</td>
          <td>{obj.average / 20}</td>
          
          <td>
            <Stack>
              {obj.badMetrics.map((metric) => {
                return (
                  <Group>
                    <Text weight={500}>{metric.title}</Text>
                    <Tooltip
                      label={metric.description}
                      color="gray"
                      transition="skew-down"
                      transitionDuration={300}
                      withArrow
                    >
                      <ActionIcon>
                        <InfoCircle />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                );
              })}
            </Stack>
          </td>
          <td>
            <Button
              color="pink"
              onClick={() => {}}
              leftIcon={<Eye size={20} />}
            >
              مشاهده‌ی بازخوردها
            </Button>
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
            <th>عملیات</th>
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
      {/* <RequestFeedbackModal */}
    </>
  );
};

export default UserSatisfactionView;
