import "dayjs/locale/fa";

import { useEffect, useState } from "react";
import { DateRangePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";

import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Grid,
  Pagination,
  Table,
  Tabs,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";

import {
  ExternalLink,
  Filter,
  ListSearch,
  UserExclamation,
  X,
} from "tabler-icons-react";
import {useLocation, useNavigate} from "react-router-dom";

import { mantine_colors, RequestStatusBadge } from "../../assets/consts";
import { CoreAPI } from "../../api/core";
import { RequestStatus, ServiceSummary } from "../../models";
import { notifyUser } from "../utils";
import { APIDataToServiceSummary } from "../../models/utils";
import { FieldFilter, FieldFilterName } from "../../api/base";
import { SpecialitiesBadges } from "../../models/SpecialityBadges";
import RequestSearchComponent from "../../components/RequestSearchComponent";

import {useAppDispatch} from "../../redux/hooks";
import {setSteps} from "../../redux/intro";
import {
  ManageServiceTab1Steps, ManageServiceTab2Steps,
  ManageUsersTab1Steps,
  ManageUsersTab2Steps,
  ManageUsersTab3Steps
} from "../../assets/IntroSteps";

import { Helmet } from "react-helmet";
const TITLE = "مدیریت خدمات";

const PAGE_SIZE = 5;

const ManageServicesView = () => {
  const navigate = useNavigate();

  const [cancelableData, setCancelableData] = useState<ServiceSummary[]>([]);
  const [pendingData, setPendingData] = useState<ServiceSummary[]>([]);

  const [tab1_activePage, setTab1_activePage] = useState(1);
  const [tab2_activePage, setTab2_activePage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const [tab2_startTimeInterval, setTab2_startTimeInterval] = useState<
    [Date | null, Date | null]
  >([new Date(), new Date()]);

  const getData = async (filters: FieldFilter[]) => {
    const res = await CoreAPI.getInstance().searchRequests(filters);
    if (res.success) {
      const data = APIDataToServiceSummary(res);
      setCancelableData(data);
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت درخواست‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18}/>,
      });
    }
  };

  useEffect(() => {
    getData([]);
  }, []);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/manage_services") {
      if (activeTab === 0) {
        dispatch(setSteps(ManageServiceTab1Steps));
      } else if (activeTab === 1) {
        dispatch(setSteps(ManageServiceTab2Steps));
      }
    }
  }, [location.pathname, activeTab]);

  const getPendingRequests = async () => {
    const query = {
      status: RequestStatus.Pending,
      desired_start_time_gte: tab2_startTimeInterval[0],
      desired_start_time_lte: tab2_startTimeInterval[1],
    };
    const res = await CoreAPI.getInstance().getRequestsSummary(query);
    if (res.success) {
      const data = APIDataToServiceSummary(res);
      setPendingData(data);
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت درخواست‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18}/>,
      });
    }
  };

  const cancelService = async (id: number) => {
    // TODO an "Are you sure" modal
    const res = await CoreAPI.getInstance().cancelRequestByManager(id);
    notifyUser(res, "لغو موفقیت‌آمیز", "خدمت موردنظر با موفقیت لغو شد.");
    if (res.success) {
      await getData([]);
    }
  };

  const cancelableRows = cancelableData.slice(
      PAGE_SIZE * (tab1_activePage - 1),
      PAGE_SIZE * tab1_activePage
  );
  const pendingRows = pendingData.slice(
      PAGE_SIZE * (tab2_activePage - 1),
      PAGE_SIZE * tab2_activePage
  );

  const renderRows = () => {
    const body: any[] = cancelableRows.map((obj: ServiceSummary, i) => (
      <tr key={i}>
        <td>{(tab1_activePage - 1) * PAGE_SIZE + (i + 1)}</td>
        <td>{obj.customerName}</td>
        <td>{!!obj.specialistName ? obj.specialistName : "-"}</td>
        <td>
          <SpecialitiesBadges speciality={[obj.requested_speciality]} />
        </td>
        <td>
          <Badge color={RequestStatusBadge[obj.status].color} variant="filled">
            {RequestStatusBadge[obj.status].message}
          </Badge>
        </td>
        <td>
          <ActionIcon
            onClick={() => navigate(`/dashboard/request_details/${obj.id}`)}
          >
            <ExternalLink color="blue" size={22} />
          </ActionIcon>
        </td>
        <td>
          {![RequestStatus.Cancelled, RequestStatus.Done].includes(
            obj.status
          ) && (
            <ActionIcon onClick={() => cancelService(obj.id)}>
              <X color="red" size={22} />
            </ActionIcon>
          )}
        </td>
      </tr>
    ));
    return <tbody>{body}</tbody>;
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <Tabs defaultValue="manage">
        <Tabs.List>
          <Tabs.Tab value="manage" icon={<Filter size={14} />} color="indigo">
            مشاهده و فیلتر
          </Tabs.Tab>
          <Tabs.Tab
            value="pending"
            icon={<UserExclamation size={14} />}
            color="lime"
          >
            خدمات ارائه‌نشده
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="manage" pt="xs">
          <RequestSearchComponent
            getData={getData}
            searchFields={[
              FieldFilterName.Status,
              FieldFilterName.Customer,
              FieldFilterName.Specialist,
              FieldFilterName.DateRange,
              FieldFilterName.Speciality,
              FieldFilterName.Sort,
            ]}
            includeQuickFilters={false}
          />
          <Table className="tour-manage-service-filter-table" striped highlightOnHover>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام مشتری</th>
                <th>نام متخصص</th>
                <th>تخصص مورد نیاز</th>
                <th>وضعیت</th>
                <th>جزئیات</th>
                <th>لغو خدمت</th>
              </tr>
              </thead>
              {renderRows()}
            </Table>
            <Center mt="sm">
              <Pagination
                  total={Math.ceil(cancelableData.length / PAGE_SIZE)}
                  color="cyan"
                  radius="md"
                  withEdges
                  page={tab1_activePage}
                  onChange={setTab1_activePage}
              />
            </Center>
          </Tabs.Panel>

          <Tabs.Panel value="pending" pt="xs">
            <Grid className="tour-manage-service-not-done-search" justify="center" align="flex-end">
              <Grid.Col span={9}>
                <DateRangePicker
                    className="tour-manage-service-not-done-search-date"
                    locale="fa"
                    label="زمان شروع سفارشات"
                    placeholder="انتخاب بازه‌ی زمانی"
                    value={tab2_startTimeInterval}
                    onChange={setTab2_startTimeInterval}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Button
                    className="tour-manage-service-not-done-search-submit"
                    mt="sm"
                    color="lime"
                    leftIcon={<ListSearch size={20}/>}
                    onClick={() => getPendingRequests()}
                >
                  جست‌وجوی سفارشات
                </Button>
              </Grid.Col>
            </Grid>
            <Table className="tour-manage-service-not-done-table" mt="md" striped highlightOnHover>
              <thead>
              <tr>
                <th>ردیف</th>
                <th>نام مشتری</th>
                <th>تخصص مورد نیاز</th>
                <th>مشاهده‌ی جزئیات</th>
              </tr>
              </thead>
              <tbody>
              {pendingRows.map((row, i) => (
                  <tr key={i}>
                    <td>{(tab2_activePage - 1) * PAGE_SIZE + (i + 1)}</td>
                    <td>{row.customerName}</td>
                    <td>
                      <Tooltip
                          label={row.requested_speciality.description}
                          color="gray"
                          transition="skew-down"
                          transitionDuration={300}
                          withArrow
                      >
                        <Badge
                            key={row.requested_speciality.id}
                            color={
                              mantine_colors[
                              row.requested_speciality.id % mantine_colors.length
                                  ]
                            }
                            variant="filled"
                        >
                          {row.requested_speciality.title}
                        </Badge>
                      </Tooltip>
                    </td>
                    <td>
                      <UnstyledButton
                          onClick={() =>
                              navigate(`/dashboard/request_details/${row.id}`)
                          }
                      >
                        <ExternalLink color="blue" size={22}/>
                      </UnstyledButton>
                    </td>
                  </tr>
              ))}
              </tbody>
            </Table>
            <Center mt="sm">
              <Pagination
                  total={Math.ceil(pendingData.length / PAGE_SIZE)}
                  color="lime"
                  radius="md"
                  withEdges
                  page={tab2_activePage}
                  onChange={setTab2_activePage}
              />
            </Center>
          </Tabs.Panel>
        </Tabs>
      </>
  );
};

export default ManageServicesView;
