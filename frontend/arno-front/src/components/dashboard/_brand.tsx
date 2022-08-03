import { Group, ActionIcon, Box, Text, Indicator, Menu } from "@mantine/core";
import { Link } from "react-router-dom";
import { Logout, Bell, Message } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/auth";
import { AuthAPI } from "../../api/auth";
import { NotificationAPI } from "../../api/notifications";
import { useEffect, useState } from "react";
import { Notification } from "../../models";
import { APIDataToNotifications } from "../../models/utils";

export function Brand() {
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

  const navigateToNotifs = () => {
    navigate("/dashboard/notifications"); //todo notif page
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group position="apart">
        <Text
          component={Link}
          to="/dashboard"
          style={{ fontSize: 24 }}
          weight="bold"
        >
          داشبورد
        </Text>
        <Group>
          <Indicator disabled={notifs.length === 0} color="red">
            <ActionIcon
              variant="default"
              onClick={() => navigateToNotifs()}
              size={30}
            >
              <Bell size={16} />
            </ActionIcon>
          </Indicator>
          <ActionIcon variant="default" onClick={() => doLogout()} size={30}>
            <Logout size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}
