import { Badge, Space, Table, Title, UnstyledButton } from "@mantine/core";

import { Helmet } from "react-helmet";
import { Check, X, ExternalLink } from "tabler-icons-react";

import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CoreAPI } from "../../api/core";
import { RequestStatus, ServiceSummary } from "../../models";
import {
  APIDataToRequestsSummary,
  APIDataToServiceSummary,
} from "../../models/utils";

import { SpecialitiesBadges } from "../../models/SpecialityBadges";
import { RequestStatusBadge } from "../../assets/consts";

const TITLE = "خدمات متخصص";

const SpecialistServicesView = () => {
  const notifySpecialist = () => {
    showNotification({
      title: "پیام جدید",
      message: "یک درخواست خدمت جدید برای شما ارسال شده است.",
    });
  };

  const navigate = useNavigate();

  const [rows, setRows] = useState<ServiceSummary[]>([]);

  const getData = async () => {
    const res = await CoreAPI.getInstance().getMyRequestsStatus();
    console.log(res);
    if (res.success) {
      const data = APIDataToRequestsSummary(res);
      console.log("DDDD", data);
      setRows(data);
      console.log(rows);
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

  console.log(rows);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2} onClick={notifySpecialist}>
        {TITLE}
      </Title>
      <Title order={3} my="md">
        خدمات من{" "}
      </Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>نام مشتری</th>
            <th>تخصص</th>
            <th>وضعیت</th>

            <th>مشاهده جزئیات</th>
          </tr>
        </thead>
        {rows.map((row, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{!!row.customerName ? row.customerName : "-"}</td>
              <td>
                {!!row.requested_speciality ? (
                  <SpecialitiesBadges speciality={[row.requested_speciality]} />
                ) : (
                  ""
                )}
              </td>
              <td>
                <Badge
                  color={RequestStatusBadge[row.status].color}
                  variant="filled"
                >
                  {RequestStatusBadge[row.status].message}
                </Badge>
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
          );
        })}
      </Table>
    </>
  );
};

export default SpecialistServicesView;
