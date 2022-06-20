import { useState } from "react";

import { Badge, Space, Table, Title } from "@mantine/core";
import { Check, X } from "tabler-icons-react";

import { Helmet } from "react-helmet";
const TITLE = "مدیریت خدمات";

const ManageServicesView = () => {
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
            <th>نام خدمت</th>
            <th>وضعیت</th>
            <th>لغو خدمت</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>علیرضا تاجمیرریاحی</td>
            <td>حمل بار</td>
            <td>
              <Badge color="cyan" variant="filled">
                در حال انجام
              </Badge>
            </td>
            <td>
              <X color="red" size={22} />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ManageServicesView;
