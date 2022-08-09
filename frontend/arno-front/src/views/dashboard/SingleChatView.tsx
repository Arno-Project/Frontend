import { useEffect, useState } from "react";

import {
  Button,
  Space,
  Title,
  Avatar,
  Text,
  Paper,
  Group,
  Grid,
  Input,
} from "@mantine/core";
import { X } from "tabler-icons-react";

import { Message} from "../../models";

import { Helmet } from "react-helmet";
import { APIDataToMessages } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import { useNavigate, useParams } from "react-router-dom";
import { ChatsAPI } from "../../api/chats";
import { useInterval } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

const TITLE = "پیام‌ها";

const SingleChatView = (props: any) => {
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
    if (!res.success) {
      showNotification({
        title: "خطا",
        message: "در ارسال پیام شما خطایی به وجود آمد.",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  const interval = useInterval(() => getData(), 3000);

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

    validate: {
      text: (value) => Boolean(value) ? null : "پیام نامعتبر",
    },
  });

  const sendNewMessage = async (values: any) => {
    sendData(values["text"]);
    form.reset();
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
        <Button variant="outline" size="xs" onClick={navigateToChats}>
          بازگشت به لیست پیام‌ها
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
              <Input
                placeholder="پیام خود را بنویسید..."
                size="md"
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
            <div key={i}>
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
            </div>
          );
        })}
      </>
    </>
  );
};

export default SingleChatView;
