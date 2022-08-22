import {
  Button,
  TextInput,
  Stack,
  Grid,
  Select,
  MultiSelect,
  Group,
  Text,
  Card,
  Divider,
  NumberInput,
} from "@mantine/core";

import { DatePicker } from "@mantine/dates";

import { useForm } from "@mantine/form";

import { useState, useRef } from "react";

import { UserRole } from "../models";

import { Eraser, ListSearch } from "tabler-icons-react";

import { RoleDict, RoleDictColor } from "../assets/consts";

import { FieldFilter, FieldFilterName, FieldFilterType } from "../api/base";
import SpecialityMultiSelect from "./SpecialityMultiSelect";

interface FormValues {
  threshold: number;
  after: Date | null;
  role: UserRole;
  ordering: string;
}

const UserFeedbackSearchComponent = (props: { getData: Function }) => {
  const submitRef = useRef<HTMLButtonElement>(null);

  const searchForm = useForm<FormValues>({
    initialValues: {
      threshold: 2.5,
      after: null,
      role: UserRole.Customer,
      ordering: "avg",
    },

    validate: {},
  });

  const submitForm = (v: any) => {
    let q = {
      threshold: v.threshold * 20,
      after: v.after,
      role: v.role,
      ordering: v.ordering
    };
    console.log("submit form", q);
    props.getData(q);
  };

  const validRoles = [UserRole.Customer, UserRole.Specialist];

  return (
    <>
      <Divider size="xs" my="xs" label="جست‌وجو" labelPosition="left" />
      <form onSubmit={searchForm.onSubmit(submitForm)}>
        <Stack>
          <Grid grow>
            <Grid.Col sm={6} md={4}>
              <Select
                label="نقش"
                placeholder="همه"
                data={validRoles.map((r) => ({
                  value: r,
                  label: RoleDict[r],
                }))}
                {...searchForm.getInputProps("role")}
              />
            </Grid.Col>

            <Grid.Col sm={6} md={4}>
              <NumberInput
                label="نمایش امتیازهای کمتر از"
                max={5}
                min={0}
                stepHoldDelay={500}
                stepHoldInterval={100}
                precision={1}
                step={0.1}
                {...searchForm.getInputProps("threshold")}
              />
            </Grid.Col>

            <Grid.Col sm={6} md={4}>
              <DatePicker
                locale="fa"
                placeholder="یک تاریخ را انتخاب کنید"
                label="پس از تاریخ"
                {...searchForm.getInputProps("after")}
              />
            </Grid.Col>

            <Grid.Col sm={6} md={4}>
              <Select
                className="tour-search-input-sort"
                clearable
                label="مرتب سازی بر اساس"
                placeholder="پیش‌فرض"
                {...searchForm.getInputProps("ordering")}
                data={[
                  {
                    value: "avg",
                    label: "کمترین میانگین امتیاز",
                  },
                  {
                    value: "total_feedbacks",
                    label: "بیشترین تعداد کل بازخوردها",
                  },
                  { value: "bad_feedbacks", label: " بیشترین تعداد نارضایتی‌ها" },
                  { value: "ratio", label: "بیشترین نرخ نارضایتی" },
                ]}
              />
            </Grid.Col>
          </Grid>
          <Group position="center" spacing="md">
            <Button
              ref={submitRef}
              type="submit"
              variant="gradient"
              gradient={{ from: "cyan", to: "indigo", deg: 105 }}
              leftIcon={<ListSearch size={20} />}
            >
              جست‌وجو
            </Button>
            <Button
              variant="outline"
              gradient={{ from: "cyan", to: "indigo", deg: 105 }}
              leftIcon={<Eraser size={20} />}
              onClick={() => {
                searchForm.reset();
                props.getData({});
              }}
            >
              پیش‌فرض
            </Button>
          </Group>
        </Stack>
        <Divider size="xs" my="xs" />
      </form>
    </>
  );
};

export default UserFeedbackSearchComponent;
