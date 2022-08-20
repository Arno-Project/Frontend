import { useState, useEffect } from "react";

import { Table, Title, UnstyledButton, ActionIcon, Group } from "@mantine/core";

import { Check, ZoomInArea } from "tabler-icons-react";

import { Feedback, UserRole } from "../../models";

import { SystemFeedbackAPI } from "../../api/feedback";
import { APIDataToFeedbacks } from "../../models/utils";

import { Helmet } from "react-helmet";
import { SystemFeedbackTypeDict } from "../../assets/consts";
import UserModal from "../../components/UserModal";
const TITLE = "پیشنهادات و انتقادات دریافتی";

const SystemFeedbacksView = () => {
  const [rows, setRows] = useState<Feedback[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

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

  const renderRows = () => {
    const body: any[] = rows.map((obj: Feedback, i: number) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>
          <Group>
            {obj.user.username}
            <UnstyledButton
              onClick={() => {
                setIsUserModalOpen(true);
              }}
            >
              <ZoomInArea color="black" size={22} />
            </UnstyledButton>
          </Group>
        </td>
        <td>{obj.text}</td>
        <td>{SystemFeedbackTypeDict[obj.type]}</td>
        <td>
          <ActionIcon>
            <Check color="green" size={22} />
          </ActionIcon>
        </td>
        <UserModal
          user={obj.user!}
          isOpen={isUserModalOpen}
          changeIsOpen={setIsUserModalOpen}
          validateSpecialist={null}
        ></UserModal>
      </tr>
    ));
    return <tbody>{body}</tbody>;
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2} mb="sm">
        {TITLE}
      </Title>

      <Table striped highlightOnHover verticalSpacing="md">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>ارسال‌کننده</th>
            <th>متن</th>
            <th>نوع</th>
            <th>خواندم</th>
          </tr>
        </thead>
        {renderRows()}
      </Table>
    </>
  );
};

export default SystemFeedbacksView;
