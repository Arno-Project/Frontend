import { useEffect, useState } from "react";

import { Badge, Table, Title, UnstyledButton } from "@mantine/core";
import { X } from "tabler-icons-react";

import { RequestStatusBadge } from "../../assets/consts";

import { CoreAPI } from "../../api/core";
import { RequestStatus, ServiceSummary } from "../../models";

import { Helmet } from "react-helmet";
import { APIDataToServiceSummary } from "../../models/utils";
import { notifyUser } from "../utils";
const TITLE = "مدیریت خدمات";

const ManageServicesView = () => {
  const [rows, setRows] = useState<ServiceSummary[]>([]);

  const getData = async () => {
    const res = await CoreAPI.getInstance().getAllRequestsSummary();
    if (res.success) {
      const data = APIDataToServiceSummary(res);
      setRows(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const cancelService = async (id: number) => {
    // TODO an "Are you sure" modal
    const res = await CoreAPI.getInstance().cancelRequestByManager(id);
    notifyUser(res, "لغو موفقیت‌آمیز", "خدمت موردنظر با موفقیت لغو شد.")
    if (res.success) {
      // TODO reload the list
      getData();
    }
  };

  const renderRows = () => {
    const body: any[] = rows.map((obj: ServiceSummary, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{obj.customer}</td>
        <td>{!!obj.specialist ? obj.specialist : "-"}</td>
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
    </>
  );
};

export default ManageServicesView;
