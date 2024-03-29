import {
  Button,
  Center,
  TextInput,
  Table,
  Textarea,
  Title,
  Pagination,
  Tabs,
  Grid,
  Select,
  Switch,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { DateRangePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";

import { useState, useEffect } from "react";

import { Speciality, UserRole } from "../../models";
import { AccountAPI } from "../../api/accounts";
import { APIDataToSpecialities } from "../../models/utils";
import { notifyUser } from "../utils";
import { SpecialitiesBadges } from "../../models/SpecialityBadges";
import { CoreAPI } from "../../api/core";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  Eye,
  Plus,
  Tool,
  X,
  Heart,
  Search,
  Category,
  ListSearch,
} from "tabler-icons-react";

import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { setSteps } from "../../redux/intro";
import {
  ManageSpecialitiesInputSteps,
  ManageSpecialitiesPopularitySteps,
  ManageSpecialitiesSearchSteps,
} from "../../assets/IntroSteps";

const TITLE = "مدیریت تخصص‌ها";

const PAGE_SIZE = 5;

interface Popularity {
  speciality: Speciality;
  count: number;
}

const ManageSpecialitiesView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [specTitle, setSpecTitle] = useState<string>("");
  const [specCategory, setSpecCategory] = useState<string | null>("");

  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [activePage, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const [popularities, setPopularities] = useState<Popularity[]>([]);
  const [tab3_activePage, setTab3_activePage] = useState(1);

  const [ascending, setAscending] = useState<boolean>(false);
  const [startTimeInterval, setStartTimeInterval] = useState<
    [Date | null, Date | null]
  >([new Date(), new Date()]);

  const getAllSpecialities = async () => {
    const res = await AccountAPI.getInstance().getSpecialities();
    if (res.success) {
      const data = APIDataToSpecialities(res);
      setSpecialities(data.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت تخصص‌ها از سرور با خطا مواجه شد",
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
    getAllSpecialities();
  }, []);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/manage_specialities") {
      if (activeTab === 0) {
        dispatch(setSteps(ManageSpecialitiesSearchSteps));
      } else if (activeTab === 1) {
        dispatch(setSteps(ManageSpecialitiesInputSteps));
      } else if (activeTab === 2) {
        if (user!.role !== UserRole.Specialist) {
          dispatch(setSteps(ManageSpecialitiesPopularitySteps));
        }
      }
    }
  }, [location.pathname, activeTab, user]);

  const newSpecialityForm = useForm({
    initialValues: {
      title: "",
      parent: "",
      description: "",
    },

    validate: {
      title: (value) =>
        value.trim().length > 2
          ? null
          : "این بخش نمی‌تواند خالی (یا خیلی کوتاه) باشد",
      description: (value) =>
        value.trim().length >= 2
          ? null
          : "این بخش نمی‌تواند خالی (یا خیلی کوتاه) باشد",
    },
  });

  const handleSubmit = async (values: any) => {
    const res = await AccountAPI.getInstance().defineNewSpeciality(values);

    notifyUser(res, "ایجاد موفقیت‌آمیز", "تخصص مورد نظر با موفقیت ایجاد شد.");

    if (res.success) {
      newSpecialityForm.reset();
      getAllSpecialities();
    }
  };

  const applyFilters = (specArr: Speciality[]): Speciality[] => {
    return specArr.filter(
      (s: Speciality) =>
        s.title.includes(specTitle) &&
        (s.parent == null
          ? false
          : Boolean(specCategory)
          ? s.parent.id.toString() === specCategory
          : true)
    );
  };

  const filteredRows = applyFilters(specialities);
  const rows = filteredRows.slice(
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
          <Tabs.Tab
            onClick={() => {
              setActiveTab(0);
            }}
            value="manage"
            icon={<Eye size={14} />}
            color="teal"
          >
            مشاهده و جست‌وجو
          </Tabs.Tab>
          <Tabs.Tab
            onClick={() => {
              setActiveTab(1);
            }}
            value="create"
            icon={<Tool size={14} />}
            color="cyan"
          >
            افزودن تخصص جدید
          </Tabs.Tab>
          {user!.role !== UserRole.Specialist && (
            <Tabs.Tab
              onClick={() => {
                setActiveTab(2);
              }}
              value="reputation"
              icon={<Heart size={14} />}
              color="pink"
            >
              تخصص‌های پرتقاضا
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="manage" pt="xs">
          <Grid my="sm" align="flex-end" justify="center" gutter="md">
            <Grid.Col span={4}>
              <Select
                className="tour-manage-specialities-search-category"
                label="دسته‌بندی"
                placeholder="دسته‌ی مورد نظر"
                description="نمایش تخصص‌های دسته‌ی زیر:"
                data={specialities
                  .filter((s) => s.parent == null)
                  .map((s) => ({ value: s.id.toString(), label: s.title }))}
                value={specCategory}
                onChange={setSpecCategory}
                clearable
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                className="tour-manage-specialities-search-title"
                icon={<Search size={20} />}
                label="عنوان تخصص"
                placeholder="عنوان"
                description="بخشی از عنوان تخصص را وارد کنید"
                value={specTitle}
                onChange={(event) => setSpecTitle(event.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
          <Table
            className="tour-manage-specialities-search-table"
            striped
            highlightOnHover
            verticalSpacing="sm"
          >
            <thead>
              <tr>
                <th>ردیف</th>
                <th>عنوان</th>
                <th>دسته‌بندی</th>
                <th>توضیحات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: Speciality, i) => (
                <tr key={i}>
                  <td>{(activePage - 1) * PAGE_SIZE + (i + 1)}</td>
                  <td>{row.title}</td>
                  <td>
                    {row.parent == null ? (
                      "-"
                    ) : (
                      <SpecialitiesBadges speciality={[row.parent]} />
                    )}
                  </td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Center mt="sm">
            <Pagination
              total={Math.ceil(filteredRows.length / PAGE_SIZE)}
              color="teal"
              radius="md"
              withEdges
              page={activePage}
              onChange={setPage}
            />
          </Center>
        </Tabs.Panel>

        <Tabs.Panel value="create" pt="xs">
          <form onSubmit={newSpecialityForm.onSubmit(handleSubmit)}>
            <Grid grow align="flex-end" justify="center" gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  className="tour-manage-specialities-input-title"
                  mt="sm"
                  placeholder="عنوان تخصص"
                  label="عنوان تخصص"
                  description="یک نام مختصر و مشخص برای معرفی تخصص"
                  required
                  {...newSpecialityForm.getInputProps("title")}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  className="tour-manage-specialities-input-category"
                  label="دسته‌بندی"
                  placeholder="دسته‌ی مورد نظر"
                  description="در صورتی که خود یک دسته‌ی جدید است خالی بگذارید:"
                  clearable
                  icon={<Category size={18} />}
                  data={specialities
                    .filter((s) => s.parent == null)
                    .map((s) => ({ value: s.id.toString(), label: s.title }))}
                  {...newSpecialityForm.getInputProps("parent")}
                />
              </Grid.Col>
            </Grid>
            <Textarea
              className="tour-manage-specialities-input-description"
              mt="sm"
              placeholder="توضیحات (شامل جزئیات، کاربردها، ...)"
              label="توضیحات تخصص"
              description="لطفا توضیح کاملی از تخصص مد نظر خود بنویسید"
              autosize
              minRows={1}
              maxRows={3}
              required
              {...newSpecialityForm.getInputProps("description")}
            />
            <Center>
              <Button
                className="tour-manage-specialities-input-submit"
                mt="md"
                color="cyan"
                type="submit"
                leftIcon={<Plus size={20} />}
              >
                ایجاد تخصص
              </Button>
            </Center>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="reputation" pt="xs">
          <Grid
            my="sm"
            justify="center"
            align="flex-end"
            className="tour-manage-specialities-popularity-form"
          >
            <Grid.Col span={8}>
              <DateRangePicker
                className="tour-manage-specialities-popularity-date"
                locale="fa"
                label="زمان شروع سفارشات"
                placeholder="انتخاب بازه‌ی زمانی"
                value={startTimeInterval}
                onChange={setStartTimeInterval}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <Button
                className="tour-manage-specialities-popularity-submit"
                mt="sm"
                color="pink"
                leftIcon={<ListSearch size={20} />}
                onClick={() => getPopularRequests()}
              >
                جست‌وجوی سفارشات
              </Button>
            </Grid.Col>
            <Grid.Col
              span={1}
              className="tour-manage-specialities-popularity-ascdsc"
            >
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
              mt="sm"
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
    </>
  );
};

export default ManageSpecialitiesView;
