import { useState } from "react";

import { Badge, Space, Table, Title } from "@mantine/core";
import { showNotification } from '@mantine/notifications';

import { Helmet } from "react-helmet";
import { Check, X } from "tabler-icons-react";
const TITLE = "خدمات متخصص";

const SpecialistServicesView = () => {
  
  const notifySpecialist = () => {
    showNotification({
      title: 'پیام جدید',
      message: 'یک درخواست خدمت جدید برای شما ارسال شده است.',
    })
  }

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2} onClick={notifySpecialist}>{TITLE}</Title>
      <Title order={3} my="md">پذیرش/رد خدمت مشتری</Title>
      <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام مشتری</th>
                <th>نام خدمت</th>
                <th>تخصص(های) مورد نیاز</th>
                <th>تأیید/رد</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>علیرضا تاجمیرریاحی</td>
                <td>حمل بار</td>
                <td>
                  <Badge color="gray" variant="filled">
                    زور
                  </Badge>
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    <Check color="green" size={22} />
                    <Space w="lg" />
                    <X color="red" size={22} />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
    </>
  );
};

export default SpecialistServicesView;
