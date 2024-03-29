import { useState, useEffect } from "react";

import {
  Table,
  Title,
  Text,
  Center,
  Button,
  UnstyledButton,
  Modal,
  Divider,
  Textarea,
  Stack,
  Group,
} from "@mantine/core";

import {
  ClipboardText,
  Download,
  MessageReport,
  ReportOff,
} from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Feedback, UserRole } from "../../models";

import { useForm } from "@mantine/form";

import { SystemFeedbackAPI } from "../../api/feedback";
import { APIDataToFeedbacks } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import { notifyUser } from "../utils";
import { ObjectSerializer } from "../../assets/ObjectSerializer";

import { CSVLink } from "react-csv";

import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { setSteps } from "../../redux/intro";
import {
  ManageServiceTab1Steps,
  ManageServiceTab2Steps,
  TechnicalIssuesSteps,
} from "../../assets/IntroSteps";

const TITLE = "مشکلات فنی";

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

    validate: {
      techResponse: (value) =>
        value.trim().length >= 2 ? null : "این بخش نمی‌تواند خالی باشد",
    },
  });

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/technical_issues") {
      dispatch(setSteps(TechnicalIssuesSteps));
    }
  }, [location.pathname]);

  const submitResponse = async () => {
    const reply = { system_feedback: rows[rowId]["id"], text: newResponse };

    const res = await SystemFeedbackAPI.getInstance().submitReply(reply);

    notifyUser(res, "ارسال موفقیت‌آمیز", "پاسخ شما با موفقیت ارسال شد.");
    getData();
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
      {!!rows && rows.length > 0 && (
        <Text>برای دریافت گزارش کل مشکلات روی دکمه زیر کلیک کنید:</Text>
      )}
      <Center>
        {!!rows && rows.length > 0 && (
          <CSVLink
            filename={`TechnicalIssues ${new Date().toDateString()}.csv`}
            data={ObjectSerializer.serializeData(rows)}
            target="_blank"
          >
            <Button
              variant="gradient"
              gradient={{ from: "cyan", to: "indigo", deg: 105 }}
              leftIcon={<Download size={20} />}
            >
              دریافت گزارش
            </Button>
          </CSVLink>
        )}
      </Center>
      <Table
        striped
        highlightOnHover
        verticalSpacing="sm"
        className="tour-technical-issues-table"
      >
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
        size="50%"
      >
        {rows.length > 0 && rowId !== -1 ? viewFeedback() : <></>}
      </Modal>

      <Modal
        opened={writeOpened}
        onClose={() => setWriteOpened(false)}
        title="ارسال پاسخ"
        size="50%"
      >
        <form onSubmit={techManagerResponseForm.onSubmit(submitResponse)}>
          {!!rows &&
            rows.length > 0 &&
            rowId > -1 &&
            rows !== undefined &&
            rows?.at(rowId)?.reply && <>{viewFeedback()}</>}
          <Divider
            size="xs"
            my="xs"
            label="پاسخ جدید"
            labelPosition="left"
            variant="dashed"
          />
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

  function viewFeedback() {
    return (
      <>
        <Divider
          size="xs"
          my="xs"
          label="مشکل گزارش شده"
          labelPosition="left"
          variant="dashed"
        />
        <Stack>
          <Group>
            <Text weight={700}>ارسال شده توسط:</Text>
            <Text>{rows[rowId].user.username}</Text>
          </Group>
          <Group>
            <Text weight={700}>تاریخ:</Text>
            <Text>{formatDateString(rows[rowId].created_at)}</Text>
          </Group>
          <Text weight={700}>متن مشکل:</Text>
          <Text>{rows[rowId].text}</Text>
          {rows[rowId].reply && (
            <>
              <Divider
                size="xs"
                my="xs"
                label="پاسخ ثبت شده"
                labelPosition="left"
                variant="dashed"
              />

              <Text weight={700}> پاسخ:</Text>

              <Text>{rows[rowId].reply ? rows[rowId].reply?.text : ""}</Text>
              <Text size="sm" color="dimmed">
                پاسخ داده شده توسط {rows[rowId].reply!.user.username} در{" "}
                {formatDateString(rows[rowId].reply!.created_at)}
              </Text>
            </>
          )}
        </Stack>
      </>
    );
  }
};

export default TechnicalIssuesView;
