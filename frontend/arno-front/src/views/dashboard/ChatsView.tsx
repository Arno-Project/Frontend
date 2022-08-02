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
  Anchor
} from "@mantine/core";
import { X, Check, ListSearch, Search, Paperclip } from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";
import { Chat, User, UserGeneralRole, UserRole } from "../../models";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";

import { Helmet } from "react-helmet";
import { AccountAPI } from "../../api/accounts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";
import { APIDataToUsers } from "../../models/utils";
import { mantine_colors } from "../../assets/consts";
import { formatDateString } from "../../dateUtils";
import { Link, NavLink } from "react-router-dom";
import { ChatsAPI } from "../../api/chats";

const TITLE = "پیام‌ها";

const ChatsView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const PAGE_SIZE = 5;
  const [activePage, setPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  const getData = async () => {
    let res = await ChatsAPI.getInstance().getUserChatsList();
    console.log(res)
  };

  useEffect(() => {
    getData();
  }, []);

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
            <tr>
            <td> <Avatar radius="xl" color="pink" /></td>
            <td>user</td>
              <td>فلانی</td>
              <td>سلام خوبی؟</td>
              <td>2022-10-2</td>
            </tr>
            <tr>
            <td> <Avatar radius="xl" /></td>
            <td>user2</td>
            <td>فلانی</td>
              <td>سلام خوبی؟</td>
              <td>2022-10-2</td>
            </tr>
            {chats.map((chat, i) => {
                return (
                    <a href={`/chats/${chat.peer.id}`}> 
                  <tr key={i}>
                     <td> <Avatar radius="xl" color="pink" /></td>
                     <td>{chat.peer.username} </td>
                    <td>{chat.peer.firstName} {chat.peer.lastName}</td>
                    <td>
                      {chat.lastMessage.text}
                    </td>
                    <td>
                    {formatDateString(chat.lastMessage.created_at)}
                    </td>
                  </tr>
                  </a>
            )}
            )}
          </tbody>
        </Table>
      </>
    </>
  );
};

export default ChatsView;
