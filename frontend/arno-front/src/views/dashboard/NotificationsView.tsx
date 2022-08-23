import { useEffect, useState } from "react";

import { Title, Text, Space, Alert, Group, Button } from "@mantine/core";
import { Helmet } from "react-helmet";
import { formatDateString } from "../../dateUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  InfoCircle,
} from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/auth";
import { AuthAPI } from "../../api/auth";
import { NotificationAPI } from "../../api/notifications";
import { Notification, NotificationType } from "../../models";
import { APIDataToNotifications } from "../../models/utils";
import {setSteps} from "../../redux/intro";
import {NotificationSteps, SpecialistListSteps} from "../../assets/IntroSteps";

const TITLE = "اعلان‌ها";

const NotificationsView = () => {
  const user = useAppSelector((state) => state.auth.user);

  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/notifications") {
      dispatch(setSteps(NotificationSteps));
    }
  }, [location.pathname]);

  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [notifsReadStatus, setNotifsReadStatus] = useState<boolean[]>([]);

  const doLogout = async () => {
    await AuthAPI.getInstance().logout();
    dispatch(logout());
    navigate("/");
  };

  const getData = async () => {
    let res = await NotificationAPI.getInstance().get([]);
    let data = res.data;

    if (res.success && data !== null) {
      let notifs = APIDataToNotifications(res);
      setNotifs(notifs);
      setNotifsReadStatus(notifs.map((n) => n.is_read));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateToPage = (link: string, index: number) => {
    if (link) {
      markAsRead(index);
      navigate(link);
    }
  };

  const markAsRead = (index: number) => {
    NotificationAPI.getInstance().markAsRead([notifs!.at(index)!.id]);
    setNotifsReadStatus(
      notifs.map((n, i) => notifsReadStatus.at(i) || i === index)
    );
  };
  const markAllAsRead = () => {
    NotificationAPI.getInstance().markAsRead(notifs.map((n:Notification) => n.id));
    setNotifsReadStatus(notifs.map((n:Notification) => true));
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Group position="apart">
        <Title order={2}>{TITLE}</Title>
        <Button
          className="tour-mark-all-as-read"
          variant="outline"
          size="xs"
          color="dark"
          onClick={markAllAsRead}
        >
          علامت‌گذاری همه به عنوان خوانده شده
        </Button>
      </Group>
      <div className="tour-notification-page">
        <Space h="lg" />
        {notifs.length === 0 || notifsReadStatus.every((is_read) => is_read) ? (
          <Alert radius="lg" title="" color="gray" variant="light">
            شما اعلان خوانده نشده‌ای ندارید.
          </Alert>
        ) : (
          <></>
        )}
        {notifs.map((notif, i) => {
          if (notifsReadStatus.at(i)) {
            return;
          }
          let color = "gray";
          let icon = <AlertCircle />;
          switch (notif.type) {
            case NotificationType.Error:
              color = "red";
              icon = <AlertTriangle />;
              break;
            case NotificationType.Success:
              color = "green";
              icon = <Check />;
              break;
            case NotificationType.Info:
              color = "cyan";
              icon = <InfoCircle />;
              break;
            default:
              break;
          }
          return (
            <div key={i}>
              <Space h="lg" />
              <Alert
                onClick={() => navigateToPage(notif.link, i)}
                radius="lg"
                icon={icon}
                title={notif.title}
                color={color}
                variant="light"
                withCloseButton
                closeButtonLabel="خواندم"
                onClose={() => {
                  markAsRead(i);
                }}
              >
                {notif.message}
                <Text color="dimmed"> {formatDateString(notif.date)}</Text>
              </Alert>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NotificationsView;
