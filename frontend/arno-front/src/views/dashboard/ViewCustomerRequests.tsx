import { Table, Title, UnstyledButton } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ExternalLink, X } from "tabler-icons-react";

import { CoreAPI } from "../../api/core";
import { RequestStatus, ServiceSummary } from "../../models";
import { APIDataToServiceSummary } from "../../models/utils";

import { Helmet } from "react-helmet";
import { SpecialitiesBadges } from "../../models/SpecialityBadges";
const TITLE = "سفارشات مشتریان";

const ViewCustomerRequests = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<ServiceSummary[]>([]);

  const getData = async () => {
    const res = await CoreAPI.getInstance().getAllRequestsSummary();
    console.log(res)
    if (res.success) {
      const data = APIDataToServiceSummary(res);
      setRows(data);
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
            <th>توضیحات</th>
            <th>تخصص مورد نظر</th>
            <th>مشاهده جزئیات</th>
          </tr>
        </thead>
        {rows.map((row, i) => {
          if (
            row.status === RequestStatus.Pending 
          )
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{!!row.description ? row.description : "-"}</td>
                <td>
                  {!!row.requested_speciality ? (
                    <SpecialitiesBadges
                      speciality={[row.requested_speciality]}
                    />
                  ) : (
                    ""
                  )}
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

export default ViewCustomerRequests;