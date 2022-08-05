import {
  Badge,
  Table,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { ExternalLink, X } from "tabler-icons-react";

import { useNavigate } from "react-router-dom";

import { mantine_colors, RequestStatusBadge } from "../../assets/consts";
import { RequestStatus, ServiceSummary } from "../../models";
import { CoreAPI } from "../../api/core";
import { APIDataToRequestsSummary } from "../../models/utils";

import { Helmet } from "react-helmet";
import { notifyUser } from "../utils";
const TITLE = "سفارش‌های من";

const CustomerRequestsView = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ServiceSummary[]>([]);

  const getData = async () => {
    const res = await CoreAPI.getInstance().getMyRequestsStatus();

    if (res.success) {
      const data = APIDataToRequestsSummary(res);
      setRows(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const cancelRequest = async (requestId: number) => {
    const res = await CoreAPI.getInstance().cancelRequest(requestId);
    notifyUser(res, "لغو موفقیت‌آمیز", "سفارش موردنظر با موفقیت لغو شد.");
    if (res.success) {
      await getData();
    }
  };

  const renderRows = () => {
    const body: any[] = rows.map((obj: ServiceSummary, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>
          <Tooltip
            label={obj.requested_speciality.description}
            color="gray"
            transition="skew-down"
            transitionDuration={300}
            withArrow
          >
            <Badge
              key={obj.requested_speciality.id}
              color={
                mantine_colors[
                  obj.requested_speciality.id % mantine_colors.length
                ]
              }
              variant="filled"
            >
              {obj.requested_speciality.title}
            </Badge>
          </Tooltip>
        </td>
        <td>{!!obj.specialist ? obj.specialist : "-"}</td>
        <td>
          <Badge color={RequestStatusBadge[obj.status].color} variant="filled">
            {RequestStatusBadge[obj.status].message}
          </Badge>
        </td>
        <td>
          <UnstyledButton
            onClick={() => navigate(`/dashboard/request_details/${obj.id}`)}
          >
            <ExternalLink color="blue" size={22} />
          </UnstyledButton>
        </td>
        <td>
          {![RequestStatus.In_progress, RequestStatus.Done, RequestStatus.Cancelled].includes(obj.status) && (
            <UnstyledButton onClick={() => cancelRequest(obj.id)}>
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
        وضعیت سفارش‌ها
      </Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>تخصص مورد نیاز</th>
            <th>نام متخصص</th>
            <th>وضعیت</th>
            <th>مشاهده جزئیات</th>
            <th>لغو درخواست</th>
          </tr>
        </thead>
        {renderRows()}
      </Table>
    </>
  );
};

export default CustomerRequestsView;
