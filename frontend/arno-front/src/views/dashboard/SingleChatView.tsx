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
} from "@mantine/core";
import { X, Check, ListSearch, Search, Paperclip } from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";
import { Chat, Message, User, UserGeneralRole, UserRole } from "../../models";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";

import { Helmet } from "react-helmet";
import { AccountAPI } from "../../api/accounts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";
import { APIDataToUsers } from "../../models/utils";
import { mantine_colors } from "../../assets/consts";
import { formatDateString } from "../../dateUtils";
import { Link, NavLink, useParams } from "react-router-dom";

const TITLE = "پیام‌ها";

const SingleChatView = (props: any) => {
  const user = useAppSelector((state) => state.auth.user);

  const PAGE_SIZE = 5;
  const [activePage, setPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const params = useParams();
  const getData = async (peerId: number) => {};
  const peerId = Number(params.peerID);

  useEffect(() => {
    getData(peerId!);
  }, []);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <>
        <Title order={2}></Title> 
        {messages.map((msg, i) => {
          return (
            <div key={i}>
              <Avatar
                radius="xl"
                color={msg.sender.id == peerId ? "pink" : "blue"}
              />
              {msg.text}
              {formatDateString(msg.created_at)}
            </div>
          );
        })}
      </>
    </>
  );
};

export default SingleChatView;
