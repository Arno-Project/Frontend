import { Group, ActionIcon, Box, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { Logout, Bell, Notification, Message } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/auth";
import { AuthAPI } from "../../api/auth";

export function Brand() {
  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  const doLogout = async () => {
    await AuthAPI.getInstance().logout();
    dispatch(logout());
    navigate("/");
  };

  const navigateToMessages = () => {
    navigate("/dashboard/chats");
  }

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
        <ActionIcon variant="default" onClick={() => navigateToMessages()} size={30}>
          <Bell size={16} />
        </ActionIcon>
        <ActionIcon variant="default" onClick={() => doLogout()} size={30}>
          <Logout size={16} />
        </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}
