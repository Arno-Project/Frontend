import { useState, useEffect } from "react";

import {
  Table,
  Title,
  Text,
  Center,
  Button,
  UnstyledButton,
  Modal,
  Textarea,
} from "@mantine/core";

import {
  Check,
  ClipboardText,
  Download,
  Line,
  MessageReport,
  ReportOff,
} from "tabler-icons-react";
import { useAppSelector } from "../../redux/hooks";

import { Feedback, UserRole } from "../../models";

import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/hooks";

import { Helmet } from "react-helmet";
import { SystemFeedbackAPI } from "../../api/feedback";
import { APIDataToFeedbacks } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
const TITLE = "مشکلات فنی";

interface TechnicalIssue {
  sender: string;
  text: string;
  response: string;
}

const TechnicalIssuesView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [rows, setRows] = useState<Feedback[]>([]);

  const [rowId, setRowId] = useState<number>(-1);
  const [viewOpened, setViewOpened] = useState<boolean>(false);
  const [writeOpened, setWriteOpened] = useState<boolean>(false);

  const [newResponse, setNewResponse] = useState("");

  const getData = async () => {
    const res = await SystemFeedbackAPI.getInstance().getTechnicalFeedbacks();
    const data = APIDataToFeedbacks(res);
    setRows(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const viewResponse = (id: number) => {
    setRowId(id);
    setViewOpened(true);
  };

  const writeResponse = (id: number) => {
    setRowId(id);
    setWriteOpened(true);
  };

  const techManagerResponseForm = useForm({
    initialValues: {
      techResponse: "placeholder",
    },

    validationRules: {
      techResponse: (value) => value.trim().length >= 2,
    },

    errorMessages: {
      techResponse: "این بخش نمی‌تواند خالی باشد",
    },
  });

  const submitResponse = async () => {
    const reply = { system_feedback: rows[rowId]["id"], text: newResponse };
    console.log(reply);
    const res = await SystemFeedbackAPI.getInstance().submitReply(reply);
    if (res.success) {
      showNotification({
        title: "ارسال موفقیت‌آمیز",
        message: "پاسخ شما با موفقیت ارسال شد.",
        color: "teal",
        icon: <Check size={18} />,
      });
    }
  };

  const renderRows = () => {
    const body: any[] = rows.map((obj: Feedback, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{obj.user.username}</td>
        <td>{obj.text}</td>
        {user!.role === UserRole.CompanyManager && (
          <td>
            {!!obj.reply ? (
              <UnstyledButton onClick={() => viewResponse(i)}>
                <ClipboardText size={24} strokeWidth={2} color="blue" />
              </UnstyledButton>
            ) : (
              <ReportOff size={24} strokeWidth={2} />
            )}
          </td>
        )}
        {user!.role === UserRole.TechnicalManager && (
          <td>
            <UnstyledButton onClick={() => writeResponse(i)}>
              <MessageReport size={24} strokeWidth={2} color="blue" />
            </UnstyledButton>
          </td>
        )}
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
      <Text>برای دریافت گزارش کل مشکلات روی دکمه زیر کلیک کنید:</Text>
      <Center>
        <Button
          variant="gradient"
          gradient={{ from: "cyan", to: "indigo", deg: 105 }}
          leftIcon={<Download size={20} />}
          // onClick={() => fetchResults()}
        >
          دریافت گزارش
        </Button>
      </Center>
      <Table striped highlightOnHover verticalSpacing="md">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>ارسال‌کننده</th>
            <th>متن مشکل</th>
            {user!.role === UserRole.CompanyManager && <th>مشاهده پاسخ</th>}
            {user!.role === UserRole.TechnicalManager && <th>ارسال پاسخ</th>}
          </tr>
        </thead>
        {renderRows()}
      </Table>

      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title="گزارش مشکل فنی"
      >
        {rows.length > 0 && rowId !== -1 ? (
          <>
          
            <Text weight={700}>ارسال شده توسط:</Text>
             <Text>{rows[rowId].user.username}</Text>
             <Text weight={700}>تاریخ:</Text>
             <Text>{formatDateString(rows[rowId].created_at)}</Text>
            <Text weight={700}>متن مشکل:</Text>
            <Text>{rows[rowId].text}</Text>
            <Text weight={700}> پاسخ:</Text>
            <Text>{rows[rowId].reply ? rows[rowId].reply!.text : ""}</Text>
            <Text size="sm">پاسخ داده شده توسط {rows[rowId].reply!.user.username} در {formatDateString(rows[rowId].reply!.created_at)}</Text>
          </>
        ) : (
          <></>
        )}
      </Modal>

      <Modal
        opened={writeOpened}
        onClose={() => setWriteOpened(false)}
        title="ارسال پاسخ"
      >
        <form onSubmit={techManagerResponseForm.onSubmit(submitResponse)}>
          <Textarea
            value={newResponse}
            onChange={(event) => setNewResponse(event.currentTarget.value)}
            mt="sm"
            placeholder="پاسخ به مشکل"
            label="متن پیام"
            autosize
            minRows={4}
            maxRows={6}
            required
          />
          <Center>
            <Button mt="md" color="blue" type="submit">
              ارسال
            </Button>
          </Center>
        </form>
      </Modal>
    </>
  );
};

export default TechnicalIssuesView;
