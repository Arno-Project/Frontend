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
  MessageReport,
  ReportOff,
} from "tabler-icons-react";
import { useAppSelector } from "../../redux/hooks";

import { UserRole } from "../../models";

import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/hooks";

import { Helmet } from "react-helmet";
const TITLE = "مشکلات فنی";

interface TechnicalIssue {
  sender: string;
  text: string;
  response: string;
}

const fake: TechnicalIssue[] = [
  { sender: "علیرضا", text: "سلاام", response: "سلام به روی ماهت" },
  { sender: "ممد", text: "این چه شتیه دیگه", response: "چاکریم" },
  { sender: "امیر", text: "آب قطعه", response: "" },
];

const TechnicalIssuesView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [rows, setRows] = useState<TechnicalIssue[]>([]);

  const [rowId, setRowId] = useState<number>(-1);
  const [viewOpened, setViewOpened] = useState<boolean>(false);
  const [writeOpened, setWriteOpened] = useState<boolean>(false);

  const [newResponse, setNewResponse] = useState("");

  useEffect(() => {
    // fetch rows from the server
    setRows(fake);
  }, []);

  const viewResponse = (id: number) => {
    setRowId(id);
    setViewOpened(true);
  };

  const writeResponse = (id: number) => {
    setRowId(id);
    setNewResponse(rows[id].response);
    setWriteOpened(true);
  };

  const techManagerResponseForm = useForm({
    initialValues: {
      techResponse: "",
    },

    validationRules: {
      techResponse: (value) => value.trim().length >= 2,
    },

    errorMessages: {
      techResponse: "این بخش نمی‌تواند خالی باشد",
    },
  });
  
  const submitResponse = () => {
    console.log(newResponse);
    // TODO post
    if (true) {
      showNotification({
        title: "ارسال موفقیت‌آمیز",
        message: "پاسخ شما با موفقیت ارسال شد.",
        color: "teal",
        icon: <Check size={18} />,
      });
    }
  };

  const renderRows = () => {
    const body: any[] = rows.map((obj: TechnicalIssue, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{obj.sender}</td>
        <td>{obj.text}</td>
        {user!.role === UserRole.CompanyManager && (
          <td>
            {!!obj.response ? (
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
            <th>نام ارسال‌کننده</th>
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
        title="مشاهده‌ی پاسخ"
      >
        <Text>
          {rows.length > 0 && rowId !== -1 ? rows[rowId].response : ""}
        </Text>
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
