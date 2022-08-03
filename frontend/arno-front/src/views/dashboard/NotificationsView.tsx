import { useEffect, useState } from "react";

import { Table, Title, Avatar } from "@mantine/core";
import {
  BellRinging,
  AlertCircle,
} from "tabler-icons-react";


import { Helmet } from "react-helmet";
import { APIDataToChats } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import { ChatsAPI } from "../../api/chats";
import { Group, ActionIcon, Box, Text, Indicator, Menu } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { Logout, Bell, Message } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/auth";
import { AuthAPI } from "../../api/auth";
import { NotificationAPI } from "../../api/notifications";
import { Notification } from "../../models";
import { APIDataToNotifications } from "../../models/utils";

const TITLE = "اعلان‌ها";

const NotificationsView = () => {
  const user = useAppSelector((state) => state.auth.user);


  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [notifs, setNotifs] = useState<Notification[]>([]);

  const doLogout = async () => {
    await AuthAPI.getInstance().logout();
    dispatch(logout());
    navigate("/");
  };

  const getData = async () => {
    let res = await NotificationAPI.getInstance().get([]);
    let data = res.data;

    if (res.success && data !== null) {
      console.log("NOTIFS", res);
      let notifs = APIDataToNotifications(res);
      console.log(notifs);
      setNotifs(notifs);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateToPage = (link: string) => {
    console.log(link);
    // navigate(link);
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
            {notifs.map((notif, i) => {
              return (
                <tr key={i} onClick={() => navigateToPage(notif.link)}>
                  <td width={50}>
                    <ActionIcon
                      variant="default"
                      onClick={() => doLogout()}
                      size={30}
                    >
                      <AlertCircle size={16} />
                    </ActionIcon>
                  </td>
                  <td>{notif.title}</td>
                  <td>{notif.message}</td>
                  <td>{formatDateString(notif.date)}</td>
                  <td>{notif.is_read ? <></> : <BellRinging />}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    </>
  );
};

export default NotificationsView;
