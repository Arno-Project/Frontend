import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Center,
  Pagination,
  Space,
  Table,
  TextInput,
  Title,
  Avatar,
  Anchor,
  Timeline,
  Text,
  CSSObject,
  Paper,
  Group,
  Textarea,
  Grid,
} from "@mantine/core";
import { X, Check, ListSearch, Search, Paperclip } from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";
import { Chat, Message, User, UserGeneralRole, UserRole } from "../../models";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";

import { Helmet } from "react-helmet";
import { AccountAPI } from "../../api/accounts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";
import { APIDataToMessages, APIDataToUsers } from "../../models/utils";
import { mantine_colors } from "../../assets/consts";
import { formatDateString } from "../../dateUtils";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { ChatsAPI } from "../../api/chats";
import { useForm, useInterval } from "@mantine/hooks";

const TITLE = "پیام‌ها";

const SingleChatView = (props: any) => {
  const user = useAppSelector((state) => state.auth.user);

  const [chats, setChats] = useState<Message[]>([]);

  const params = useParams();
  const peerId = Number(params.peerID);

  const getData = async () => {
    let res = await ChatsAPI.getInstance().getUserChatsWithPeer(peerId);
    if (res.success) {
      const data = APIDataToMessages(res);
      setChats(data);
    }
  };

  const sendData = async (text: string) => {
    let res = await ChatsAPI.getInstance().sendNewMessage(peerId, text);
    if (res.success) {
      console.log(res);
    }
  };

  const interval = useInterval(() => getData(), 30000);

  useEffect(() => {
    getData();
    interval.start();
    return interval.stop;
  }, []);

  let navigate = useNavigate();

  const navigateToChats = () => {
    navigate("/dashboard/chats");
  };

  const form = useForm({
    initialValues: {
      text: "",
    },

    validationRules: {
      text: (value) => Boolean(value),
    },
  });

  const sendNewMessage = async (values: any) => {
    sendData(values["text"]);
    form.reset()
    await new Promise((r) => setTimeout(r, 1000));
    getData();
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Group position="apart">
        <Title order={2}>{TITLE}</Title>
        <Button
          variant="outline"
          size="xs"
          onClick={navigateToChats}>
          بازگشت
        </Button>
      </Group>
      <>
        <Space h="lg" />
        <form onSubmit={form.onSubmit((values) => sendNewMessage(values))}>
          <Grid align={"center"}>
            <Grid.Col span={1}>
              <Avatar radius="xl" color={"pink"} />
            </Grid.Col>
            <Grid.Col span={9}>
              <Textarea
                placeholder="پیام خود را بنویسید..."
                radius="lg"
                required
                {...form.getInputProps("text")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Button variant="light" color="pink" type="submit">
                ارسال
              </Button>
            </Grid.Col>
          </Grid>
        </form>

        <Space h="lg" />
        {chats.map((msg, i) => {
          let name =
            msg.sender.id == peerId
              ? msg.sender.firstName + " " + msg.sender.lastName
              : "شما";
          return (
            <>
              <Group align={"center"}>
                <Avatar
                  radius="xl"
                  color={msg.sender.id == peerId ? "blue" : "pink"}
                />
                <Paper shadow="sm" radius="md" p="md" withBorder>
                  <Group position="apart">
                    <Text>{msg.text}</Text>

                    <Text color="dimmed">
                      {name + " در " + formatDateString(msg.created_at)}
                    </Text>
                  </Group>
                </Paper>
              </Group>
            </>
          );
        })}
      </>
    </>
  );
};

export default SingleChatView;
