
import {
  Text,
  Button,
  Group,
  Card,
  Badge,
  Avatar,
  Modal,
  Space,
  Highlight,
  LoadingOverlay,
} from "@mantine/core";

import { User, UserRole } from "../models";


import { RoleDict, RoleDictColor } from "../assets/consts";
import { SpecialitiesBadges } from "../models/SpecialityBadges";
import { formatDateString } from "../dateUtils";
import { UserScore } from "../models/UserScore";

const UserModal = (props: {
  user: User;
  isOpen: boolean;
  changeIsOpen: Function;
  validateSpecialist: Function | null;
}) => {
  console.info("UserModal", props)
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   let res = await CoreAPI.getInstance().get([]); //TODO
  //   console.log(res);
  //   if (res.success) {
  //   }
  // };

  return (
    <>
      <Modal
        centered
        opened={props.isOpen}
        onClose={() => props.changeIsOpen(false)}
        title="مشخصات کاربر"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="80%"
        style={{ zIndex: 1000 }}
      >
        <LoadingOverlay visible={!props.user} overlayBlur={2} />
        {props.user && (
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Group position="apart" mt="md" mb="xs" px="lg">
                <Group>
                  <Avatar size="xl" color={RoleDictColor[props.user.role]} />

                  <Text weight={500}>
                    {props.user.firstName + " " + props.user.lastName}
                  </Text>
                </Group>

                <Badge
                  color={RoleDictColor[props.user.role]}
                  variant="dot"
                  size="lg"
                >
                  {RoleDict[props.user.role]}
                </Badge>
              </Group>
            </Card.Section>

            {props.user.role === UserRole.Specialist &&
              props.user.isValidated === false && (
                <>
                  <Space h="md" />
                  <Group>
                    <Highlight highlightColor="red" highlight="در انتظار تایید">
                      در انتظار تایید
                    </Highlight>
                  </Group>
                </>
              )}

            <Space h="md" />
            <Group>
              <Text size="md" color="dimmed">
                تلفن همراه:
              </Text>
              <Text>{props.user.phone}</Text>
            </Group>
            <Space h="md" />
            <Group>
              <Text size="md" color="dimmed">
                ایمیل:
              </Text>
              <Text>{props.user.email}</Text>
            </Group>
            {props.user.role === UserRole.Specialist && (
              <>
                <Space h="md" />
                <Group>
                  <Text size="md" color="dimmed">
                    تخصص‌ها:
                  </Text>
                  <SpecialitiesBadges speciality={props.user.speciality} />
                </Group>
              </>
            )}

            {(props.user.role === UserRole.Specialist ||
              props.user.role === UserRole.Customer) && (
              <>
                <Space h="md" />
                <Group>
                  <Text size="md" color="dimmed">
                    امتیاز:
                  </Text>
                  <UserScore score={props.user.score} />
                </Group>
              </>
            )}

            <Space h="md" />
            <Group>
              <Text size="md" color="dimmed">
                تاریخ عضویت:
              </Text>
              <Text>{formatDateString(props.user.dateJoined)}</Text>
            </Group>

            <Space h="md" />
            <Group>
              <Text size="md" color="dimmed">
                آخرین ورود:
              </Text>
              <Text>
                {props.user.lastLogin
                  ? formatDateString(props.user.lastLogin)
                  : "-"}
              </Text>
            </Group>
            {props.user.role === UserRole.Customer && (
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                ثبت درخواست برای این کاربر
              </Button>
            )}

            {props.user.role === UserRole.Specialist &&
            props.validateSpecialist !== null &&
              !props.user.isValidated && (
                <Button
                  variant="light"
                  color="cyan"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => {
                    props.validateSpecialist!(props.user);
                  }}
                >
                  تایید متخصص
                </Button>
              )}
          </Card>
        )}
      </Modal>
    </>
  );
};

export default UserModal;
