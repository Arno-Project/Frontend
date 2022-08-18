import { useEffect, useState, useRef } from "react";

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
  Affix,
  Transition,
  ScrollArea,
} from "@mantine/core";
import { IconArrowUp } from "@tabler/icons";

import { X } from "tabler-icons-react";
import { useWindowScroll } from "@mantine/hooks";

import { Message } from "../../models";

import { Helmet } from "react-helmet";
import { APIDataToMessages } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import { useNavigate, useParams } from "react-router-dom";
import { ChatsAPI } from "../../api/chats";
import { useInterval } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useWindowDimensions } from "../utils";

const TITLE = "پیام‌ها";

const SingleChatView = (props: any) => {
  const [chats, setChats] = useState<Message[]>([]);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const { height, width } = useWindowDimensions();

  const viewport = useRef<HTMLDivElement>(null);

  const scrollToTop = () =>
    viewport!.current!.scrollTo({ top: 0, behavior: "smooth" });

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
      text: (value) => (Boolean(value) ? null : "پیام نامعتبر"),
    },
  });

  const sendNewMessage = async (values: any) => {
    sendData(values["text"]);
    form.reset();
    await new Promise((r) => setTimeout(r, 1000));
    getData();
    scrollToTop();
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
        <ScrollArea
          onScrollPositionChange={onScrollPositionChange}
          style={{ height: height - 250 }}
          type="auto"
          viewportRef={viewport}
        >
          {chats.map((msg, i) => {
            let name =
              msg.sender.id == peerId
                ? msg.sender.firstName + " " + msg.sender.lastName
                : "شما";
            return (
              <div key={i}>
                <Group
                  dir={msg.sender.id !== peerId ? "rtl" : "ltr"}
                  align={"center"}
                >
                  <Avatar
                    radius="xl"
                    color={msg.sender.id == peerId ? "blue" : "pink"}
                  />
                  <Paper shadow="sm" radius="md" p="md" withBorder>
                    <Group position="apart">
                      <Text>{msg.text}</Text>

                      <Text color="dimmed" size="sm">
                        {name + " در " + formatDateString(msg.created_at)}
                      </Text>
                    </Group>
                  </Paper>
                </Group>
                <Space h="sm" />
              </div>
            );
          })}
          <Affix position={{ bottom: 34, right: 45 }}>
            <Transition transition="fade" mounted={scrollPosition.y > 0}>
              {(transitionStyles: any) => (
                <Button
                  size="xs"
                  compact
                  leftIcon={<IconArrowUp size={16} />}
                  style={transitionStyles}
                  onClick={scrollToTop}
                  variant="default"
                >
                  بازگشت به بالا
                </Button>
              )}
            </Transition>
          </Affix>
        </ScrollArea>
      </>
    </>
  );
};

export default SingleChatView;
