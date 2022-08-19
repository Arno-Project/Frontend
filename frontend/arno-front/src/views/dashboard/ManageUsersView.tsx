import {
  Anchor,
  Tooltip,
  Button,
  Center,
  TextInput,
  Table,
  Stack,
  SimpleGrid,
  Title,
  Pagination,
  Tabs,
  Grid,
  Select,
  Space,
  MultiSelect,
  Switch,
  Group,
  UnstyledButton,
  Accordion,
  Badge,
} from "@mantine/core";

import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

import { useState, useEffect } from "react";

import { Speciality, User, UserRole } from "../../models";
import { AccountAPI } from "../../api/accounts";
import { APIDataToSpecialities, APIDataToUsers } from "../../models/utils";
import { notifyUser } from "../utils";

import {
  ZoomInArea,
  Eraser,
  Paperclip,
  Phone,
  Check,
  Eye,
  Plus,
  Tool,
  X,
  Heart,
  Search,
  Category,
  ListSearch,
  ExternalLink,
  Checklist,
  Mail,
} from "tabler-icons-react";

import { Helmet } from "react-helmet";
import { SpecialitiesBadges } from "../../models/SpecialityBadges";
import { CoreAPI } from "../../api/core";
import { DateRangePicker } from "@mantine/dates";
import { useAppSelector } from "../../redux/hooks";
import UserModal from "../../components/UserModal";
import { RoleDict, RoleDictColor } from "../../assets/consts";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";
import NewManagerForm from "../../components/NewManagerForm";
import SpecialistsTable from "../../components/SpecialistsTable";

const TITLE = "مدیریت کاربران";
const PAGE_SIZE = 10;

const ManageUsersView = () => {
  const [activePage, setPage] = useState(1);

  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  const getData = async (filters: FieldFilter[]) => {
    let res = await AccountAPI.getInstance().get(filters);
    if (res.success) {
      console.log("R", res);
      const users = APIDataToUsers(res);
      setUsers(users);
      console.log(users);
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت کاربران از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  useEffect(() => {
    getData([]);
  }, []);

  const validateSpecialist = async (user: User) => {
    const res = await AccountAPI.getInstance().confirmSpecialist(user.id);

    if (res.success) {
      notifyUser(res, "عملیات موفقیت‌آمیز", "متخصص با موفقیت تایید شد.");
      getData([]);
    }
  };

  const onSpecialitySelectChange = (values: any[]) => {
    setSelectedSpecialities(values);
  };
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );

  const searchForm = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      specialities: [],
      roles: [],
      sort: "",
    },

    validate: {},
  });

  const submitForm = (v: any) => {
    console.log(v);
    console.log(selectedSpecialities);
    let filters = [];
    for (const [key, value] of Object.entries(v)) {
      if (value && (key !== "roles" || key.length > 0)) {
        const filter = new FieldFilter(
          key as FieldFilterName,
          value as string,
          FieldFilterType.Exact
        );
        filters.push(filter);
      }
    }
    if (selectedSpecialities.length > 0) {
      filters.push(
        new FieldFilter(
          FieldFilterName.Speciality,
          selectedSpecialities.join(","),
          FieldFilterType.Exact
        )
      );
      filters.push(
        new FieldFilter(
          FieldFilterName.Role,
          UserRole.Specialist,
          FieldFilterType.Exact
        )
      );
    }
    console.log(filters);
    getData(filters);
  };

  const rows = users.slice(
    PAGE_SIZE * (activePage - 1),
    PAGE_SIZE * activePage
  );

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <Tabs defaultValue="view">
        <Tabs.List>
          <Tabs.Tab value="view" icon={<Eye size={14} />} color="teal">
            مشاهده و جست‌وجو
          </Tabs.Tab>
          <Tabs.Tab value="edit" icon={<Checklist size={14} />} color="yellow">
            متخصصین در انتظار تایید
          </Tabs.Tab>
          <Tabs.Tab value="new" icon={<Plus size={14} />} color="pink">
            اضافه کردن مدیر جدید
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="view" pt="xs">
          <>
            {userSearchComponent()}
            {userTableComponent()}
          </>
        </Tabs.Panel>

        <Tabs.Panel value="edit" pt="xs">
          {specialistValidationComponent()}
        </Tabs.Panel>

        <Tabs.Panel value="new" pt="xs">
          <NewManagerForm />
        </Tabs.Panel>
      </Tabs>

      <UserModal
        user={selectedUser!}
        isOpen={isUserModalOpen}
        changeIsOpen={setIsUserModalOpen}
        validateSpecialist={validateSpecialist}
      />
    </>
  );

  function specialistValidationComponent() {
    return (
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>نام متخصص</th>
            <th>تخصص(ها)</th>
            <th>مدارک اعتبارسنجی</th>
            <th>جزئیات</th>
            <th>تأیید</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, idx: number) => {
            if (user.role === UserRole.Specialist && !user.isValidated)
              return (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>
                    <SpecialitiesBadges speciality={user.speciality} />
                  </td>
                  <td>
                    <Paperclip size={24} />
                  </td>
                  <td>
                    <UnstyledButton
                      onClick={() => {
                        setSelectedUser(user);
                        setIsUserModalOpen(true);
                      }}
                    >
                      <ZoomInArea color="black" size={22} />
                    </UnstyledButton>
                  </td>

                  <td>
                    <div style={{ display: "flex" }}>
                      <UnstyledButton
                        onClick={() => {
                          validateSpecialist(user);
                        }}
                      >
                        <Check color="green" size={22} />
                      </UnstyledButton>
                    </div>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </Table>
    );
  }

  function userTableComponent() {
    return (
      <>
        <Table striped highlightOnHover verticalSpacing="sm" mt="sm">
          <thead>
            <tr>
              <th>نام کاربری</th>
              <th>نام</th>
              <th>نقش</th>
              <th>امتیاز</th>
              <th>جزئیات</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user: User, idx: number) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>
                  <Badge
                    color={RoleDictColor[user.role]}
                    variant="dot"
                    size="lg"
                  >
                    {RoleDict[user.role]}
                  </Badge>
                </td>
                <td>{user.score !== undefined ? user.score : "_"}</td>
                <td>
                  <UnstyledButton
                    onClick={() => {
                      setSelectedUser(user);
                      setIsUserModalOpen(true);
                    }}
                  >
                    <ZoomInArea color="black" size={22} />
                  </UnstyledButton>
                </td>
                <td>
                  <Tooltip
                    color="gray"
                    position="right"
                    label={"تماس با " + user.phone}
                  >
                    <Anchor href={"callto://" + user.phone}>
                      <Phone color="green" size={15} />
                    </Anchor>
                  </Tooltip>
                  <Space w="sm" />
                  <Tooltip
                    color="gray"
                    position="right"
                    label={"ارسال ایمیل به " + user.email}
                  >
                    <Anchor href={"mailto:" + user.email}>
                      <Mail color="blue" size={15} />
                    </Anchor>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Center mt="sm">
          <Pagination
            mt="sm"
            total={Math.ceil(users.length / PAGE_SIZE)}
            color="cyan"
            radius="md"
            withEdges
            page={activePage}
            onChange={setPage}
          />
        </Center>
      </>
    );
  }

  function userSearchComponent() {
    return (
      <form onSubmit={searchForm.onSubmit(submitForm)}>
        <Stack>
          <SimpleGrid cols={2}>
            <TextInput
              rightSection={() => {
                return "sfsfs";
              }}
              label="نام یا نام کاربری"
              placeholder="نام یا نام کاربری"
              {...searchForm.getInputProps("name")}
            />
            <TextInput
              label="تلفن همراه"
              placeholder="تلفن همراه"
              {...searchForm.getInputProps("phone")}
            />

            <TextInput
              label="ایمیل"
              placeholder="ایمیل"
              {...searchForm.getInputProps("email")}
            />
            <MultiSelect
              label="نقش"
              placeholder="همه"
              clearable
              data={Object.values(UserRole).map((r) => ({
                value: r,
                label: RoleDict[r],
              }))}
              {...searchForm.getInputProps("roles")}
            />

            <SpecialityMultiSelect
              setter={onSpecialitySelectChange}
              required={false}
              error=""
            />

            <Select
              clearable
              label="مرتب سازی بر اساس"
              placeholder="پیش‌فرض"
              {...searchForm.getInputProps("sort")}
              data={[
                { value: "-score", label: "بیشترین امتیاز" },
                { value: "score", label: "کم‌ترین امتیاز" },
                { value: "-date_joined", label: "جدیدترین تاریخ عضویت" },
                { value: "date_joined", label: "قدیمی‌ترین تاریخ عضویت" },
              ]}
            />
          </SimpleGrid>
          <Group position="center" spacing="md">
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "cyan", to: "indigo", deg: 105 }}
              leftIcon={<ListSearch size={20} />}
            >
              جست‌وجو
            </Button>
            <Button
              variant="outline"
              gradient={{ from: "cyan", to: "indigo", deg: 105 }}
              leftIcon={<Eraser size={20} />}
              onClick={() => {
                searchForm.reset();
                setSelectedSpecialities([]);
                getData([]);
              }}
            >
              پاک‌ کردن
            </Button>
          </Group>
        </Stack>
      </form>
    );
  }
};

export default ManageUsersView;
