import { useEffect, useState } from "react";

import { Table, Title, Avatar, Alert } from "@mantine/core";
import {
  X,
  Check,
  ListSearch,
  Search,
  Paperclip,
  BellRinging,
  Checks,
} from "tabler-icons-react";

import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import { Chat, User, UserRole } from "../../models";

import { Helmet } from "react-helmet";
import { APIDataToChats } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import {useLocation, useNavigate} from "react-router-dom";
import { ChatsAPI } from "../../api/chats";
import {setSteps} from "../../redux/intro";
import {ChatSteps, SpecialistListSteps} from "../../assets/IntroSteps";

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

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/chats") {
      dispatch(setSteps(ChatSteps));
    }
  }, [location.pathname]);

  const navigateToChatPage = (peerID: number) => {
    navigate(`${peerID}`);
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <div className="tour-chat-table">
        {chats.length > 0 ? (
          <Table striped highlightOnHover verticalSpacing="lg">
            <thead></thead>
            <tbody>
              {chats.map((chat: Chat, i: number) => {
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
        ) : (
          <>
            {user?.role === UserRole.Customer && (
              <Alert radius="lg" title="" color="gray" variant="light">
                شما در حال حاضر پیامی ندارید. با ثبت درخواست جدید می‌توانید به
                متخصصان مرتبط با درخواست خود پیام دهید.
              </Alert>
            )}
            {user?.role === UserRole.Specialist && (
              <Alert radius="lg" title="" color="gray" variant="light">
                شما در حال حاضر پیامی ندارید. برای ارتباط با مشتریانی که درخواست
                ثبت کرده‌اند می‌توانید از صفحه‌ی جزئیات هر درخواست استفاده کنید.
              </Alert>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ChatsView;
