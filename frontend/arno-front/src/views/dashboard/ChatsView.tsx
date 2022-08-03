import { useEffect, useState } from "react";

import { Table, Title, Avatar } from "@mantine/core";
import {
  X,
  Check,
  ListSearch,
  Search,
  Paperclip,
  BellRinging,
  Checks,
} from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";
import { Chat } from "../../models";

import { Helmet } from "react-helmet";
import { APIDataToChats } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import { useNavigate } from "react-router-dom";
import { ChatsAPI } from "../../api/chats";

const TITLE = "پیام‌ها";

const ChatsView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [chats, setChats] = useState<Chat[]>([]);

  let navigate = useNavigate();

  const getData = async () => {
    let res = await ChatsAPI.getInstance().getUserChatsList();
    if (res.success) {
      const data = APIDataToChats(res, user!);
      setChats(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateToChatPage = (peerID: number) => {
    console.log(peerID);
    navigate(`${peerID}`);
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <>
        <Title order={2}></Title>
        <Table striped highlightOnHover verticalSpacing="lg">
          <thead></thead>
          <tbody>
            {chats.map((chat, i) => {
              return (
                <tr key={i} onClick={() => navigateToChatPage(chat.peer.id)}>
                  <td width={50}>
                    <Avatar radius="xl" color="blue" />
                  </td>
                  <td>
                    {chat.peer.firstName} {chat.peer.lastName}
                  </td>
                  <td>{chat.lastMessage.text}</td>
                  <td>{formatDateString(chat.lastMessage.created_at)}</td>
                  <td>
                    {chat.peer.id === chat.lastMessage.sender.id ? (
                      chat.lastMessage.is_read ? (
                        <></>
                      ) : (
                        <BellRinging />
                      )
                    ) : chat.lastMessage.is_read ? (
                      <Checks />
                    ) : (
                      <Check />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    </>
  );
};

export default ChatsView;
