import "dayjs/locale/fa";

import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Center,
  Table,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { ExternalLink, ListSearch, X } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

import { mantine_colors, RequestStatusBadge } from "../../assets/consts";
import { CoreAPI } from "../../api/core";
import { RequestStatus, ServiceSummary } from "../../models";
import { notifyUser } from "../utils";
import { APIDataToServiceSummary } from "../../models/utils";

import { DateRangePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";

import { Helmet } from "react-helmet";
const TITLE = "مدیریت خدمات";

const ManageServicesView = () => {
  const navigate = useNavigate();

  const [cancelableRows, setCancelableRows] = useState<ServiceSummary[]>([]);
  const [pendingRows, setPendingRows] = useState<ServiceSummary[]>([]);
  const [startTimeInterval, setStartTimeInterval] = useState<
    [Date | null, Date | null]
  >([new Date(), new Date()]);

  const getData = async () => {
    const res = await CoreAPI.getInstance().getAllRequestsSummary();
    if (res.success) {
      const data = APIDataToServiceSummary(res);
      setCancelableRows(data);
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت سفارش‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getPendingRequests = async () => {
    const query = {
      status: RequestStatus.Pending,
      desired_start_time_gte: startTimeInterval[0],
      desired_start_time_lte: startTimeInterval[1],
    };
    const res = await CoreAPI.getInstance().getRequestsSummary(query);
    if (res.success) {
      const data = APIDataToServiceSummary(res);
      setPendingRows(data);
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت سفارش‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  const cancelService = async (id: number) => {
    // TODO an "Are you sure" modal
    const res = await CoreAPI.getInstance().cancelRequestByManager(id);
    notifyUser(res, "لغو موفقیت‌آمیز", "خدمت موردنظر با موفقیت لغو شد.");
    if (res.success) {
      await getData();
    }
  };

  const renderRows = () => {
    const body: any[] = cancelableRows.map((obj: ServiceSummary, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{obj.customerName}</td>
        <td>{!!obj.specialistName?obj.specialistName: "-"}</td>
        <td>
          <Badge color={RequestStatusBadge[obj.status].color} variant="filled">
            {RequestStatusBadge[obj.status].message}
          </Badge>
        </td>
        <td>
          {obj.status !== RequestStatus.Cancelled && (
            <UnstyledButton onClick={() => cancelService(obj.id)}>
              <X color="red" size={22} />
            </UnstyledButton>
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
      <Title order={3} my="md">
        لغو خدمات
      </Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>نام مشتری</th>
            <th>نام متخصص</th>
            <th>وضعیت</th>
            <th>لغو خدمت</th>
          </tr>
        </thead>
        {renderRows()}
      </Table>
      <Title order={3} my="md">
        خدمات ارائه نشده
      </Title>
      <DateRangePicker
        locale="fa"
        label="زمان شروع سفارشات"
        placeholder="انتخاب بازه‌ی زمانی"
        value={startTimeInterval}
        onChange={setStartTimeInterval}
      />
      <Center>
        <Button
          mt="sm"
          color="lime"
          leftIcon={<ListSearch size={20} />}
          onClick={() => getPendingRequests()}
        >
          جست‌وجوی سفارشات
        </Button>
      </Center>
      <Table mt="md" striped highlightOnHover>
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
              <td>{i + 1}</td>
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
                  <ExternalLink color="blue" size={22} />
                </UnstyledButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ManageServicesView;
