import { NumberInput, Table, Title } from "@mantine/core";
import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "سیاست‌گذاری خدمت‌دهی";

const ServicePoliciesView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <NumberInput
        defaultValue={3}
        placeholder="تعداد خدمات"
        label="تعداد خدمات"
        max={10}
        min={0}
      />
      <Table verticalSpacing="xl" striped highlightOnHover>
        <thead>
          <tr>
            <th>حداقل امتیاز</th>
            <th>حداکثر تعداد خدمات هم‌زمان</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ServicePoliciesView;
