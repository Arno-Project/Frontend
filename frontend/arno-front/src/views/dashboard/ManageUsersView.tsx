import {
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
} from "@mantine/core";

import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

import { useState, useEffect } from "react";

import { Speciality, User, UserRole } from "../../models";
import { AccountAPI } from "../../api/accounts";
import { APIDataToSpecialities, APIDataToUsers } from "../../models/utils";
import { notifyUser } from "../utils";

import {
  Eraser,
  Paperclip,
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
} from "tabler-icons-react";

import { Helmet } from "react-helmet";
import { SpecialitiesBadges } from "../../models/SpecialityBadges";
import { CoreAPI } from "../../api/core";
import { DateRangePicker } from "@mantine/dates";
import { useAppSelector } from "../../redux/hooks";
import UserModal from "../../components/UserModal";
import { RoleDict } from "../../assets/consts";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";

const TITLE = "مدیریت کاربران";
const PAGE_SIZE = 10;

interface Popularity {
  speciality: Speciality;
  count: number;
}

const ManageUsersView = () => {
  const [activePage, setPage] = useState(1);

  const [popularities, setPopularities] = useState<Popularity[]>([]);
  const [tab3_activePage, setTab3_activePage] = useState(1);

  const [ascending, setAscending] = useState<boolean>(false);
  const [startTimeInterval, setStartTimeInterval] = useState<
    [Date | null, Date | null]
  >([new Date(), new Date()]);

  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  const getData = async (filters: FieldFilter[]) => {
    const res = await AccountAPI.getInstance().get(filters);
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

  const getPopularRequests = async () => {
    const query = {
      desired_start_time_gte: startTimeInterval[0],
      desired_start_time_lte: startTimeInterval[1],
    };
    const res = await CoreAPI.getInstance().getRequestPopularityReport(query);
    if (res.success) {
      const data = res.data!["popularity" as keyof object] as Popularity[];
      setPopularities(data);
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
      username: "",
      email: "",
      specialities: [],
      roles: [],
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

  const popularityRows = popularities.slice(
    PAGE_SIZE * (tab3_activePage - 1),
    PAGE_SIZE * tab3_activePage
  );

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <Tabs defaultValue="manage">
        <Tabs.List>
          <Tabs.Tab value="manage" icon={<Eye size={14} />} color="teal">
            مشاهده و جست‌وجو
          </Tabs.Tab>
          <Tabs.Tab value="create" icon={<Checklist size={14} />} color="cyan">
            متخصصین در انتظار تایید
          </Tabs.Tab>
          <Tabs.Tab value="reputation" icon={<Heart size={14} />} color="pink">
            تخصص‌های پرتقاضا
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="manage" pt="xs">
          <>
            {userSearchComponent()}
            {userTableComponent()}
          </>
        </Tabs.Panel>

        <Tabs.Panel value="create" pt="xs">
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
                          <ExternalLink color="blue" size={22} />
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
        </Tabs.Panel>

        <Tabs.Panel value="reputation" pt="xs">
          <Grid my="sm" justify="center" align="flex-end">
            <Grid.Col span={8}>
              <DateRangePicker
                locale="fa"
                label="زمان شروع سفارشات"
                placeholder="انتخاب بازه‌ی زمانی"
                value={startTimeInterval}
                onChange={setStartTimeInterval}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <Button
                mt="sm"
                color="pink"
                leftIcon={<ListSearch size={20} />}
                onClick={() => getPopularRequests()}
              >
                جست‌وجوی سفارشات
              </Button>
            </Grid.Col>
            <Grid.Col span={1}>
              <Switch
                size="lg"
                color="pink"
                mb={3}
                checked={ascending}
                onChange={(event) => {
                  setAscending(event.currentTarget.checked);
                  popularities.reverse();
                }}
                onLabel="صعودی"
                offLabel="نزولی"
              />
            </Grid.Col>
          </Grid>
          <Table striped highlightOnHover verticalSpacing="sm">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>عنوان</th>
                <th>دسته‌بندی</th>
                <th>تعداد درخواست</th>
              </tr>
            </thead>
            <tbody>
              {popularityRows.map((row: Popularity, i) => (
                <tr key={i}>
                  <td>{(tab3_activePage - 1) * PAGE_SIZE + (i + 1)}</td>
                  <td>{row.speciality.title}</td>
                  <td>
                    {row.speciality.parent == null ? (
                      "-"
                    ) : (
                      <SpecialitiesBadges
                        speciality={[row.speciality.parent]}
                      />
                    )}
                  </td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Center>
            <Pagination
              total={Math.ceil(popularities.length / PAGE_SIZE)}
              color="pink"
              radius="md"
              withEdges
              page={tab3_activePage}
              onChange={setTab3_activePage}
            />
          </Center>
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

  function userTableComponent() {
    return (
      <>
        <Table striped highlightOnHover verticalSpacing="sm" mt="sm">
          <thead>
            <tr>
              <th>نام کاربری</th>
              <th>نام</th>
              <th>نقش</th>
              <th>شماره تماس</th>
              <th>جزئیات</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user: User, idx: number) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{RoleDict[user.role]}</td>
                <td>{user.phone}</td>
                <td>
                  <UnstyledButton
                    onClick={() => {
                      setSelectedUser(user);
                      setIsUserModalOpen(true);
                    }}
                  >
                    <ExternalLink color="blue" size={22} />
                  </UnstyledButton>
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
              label="نام"
              placeholder="نام"
              {...searchForm.getInputProps("name")}
            />
            <TextInput
              label="نام کاربری"
              placeholder="نام کاربری"
              {...searchForm.getInputProps("username")}
            />
            <TextInput
              label="شماره تماس"
              placeholder="شماره تماس"
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
