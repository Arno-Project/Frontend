import {
  Button,
  TextInput,
  Stack,
  Grid,
  Select,
  Group,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useState, useRef } from "react";
import { Eraser, ListSearch, Search } from "tabler-icons-react";

import { RequestStatusBadge } from "../assets/consts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../api/base";
import SpecialityMultiSelect from "./SpecialityMultiSelect";
import { DateRangePicker } from "@mantine/dates";

interface FormValues {
  customerName: string;
  specialistName: string;
  status: string;
  sort: string;
}

const RequestSearchComponent = (props: {
  getData: Function;
  searchFields: FieldFilterName[];
  includeQuickFilters: boolean;
}) => {
  const [startTimeInterval, setStartTimeInterval] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );

  const onSpecialitySelectChange = (values: any[]) => {
    setSelectedSpecialities(values);
  };

  const submitRef = useRef<HTMLButtonElement>(null);

  const searchForm = useForm<FormValues>({
    initialValues: {
      customerName: "",
      specialistName: "",
      status: "",
      sort: "",
    },

    validate: {},
  });

  const submitForm = (v: any) => {
    console.info("submitForm values", v);
    console.info("submitForm selected specs", selectedSpecialities);
    let filters = [];

    if (selectedSpecialities.length > 0) {
      filters.push(
        new FieldFilter(
          FieldFilterName.Speciality,
          { id: selectedSpecialities.join(",") },
          FieldFilterType.Exact
        )
      );
    }

    filters.push(
      new FieldFilter(
        FieldFilterName.Customer,
        { name: searchForm.values["customerName"] },
        FieldFilterType.Contains
      )
    );

    if (searchForm.values["specialistName"] !== "") {
      filters.push(
        new FieldFilter(
          FieldFilterName.Specialist,
          { name: searchForm.values["specialistName"] },
          FieldFilterType.Contains
        )
      );
    }

    if (startTimeInterval[0] !== null) {
      filters.push(
        new FieldFilter(
          "desired_start_time_gte",
          startTimeInterval[0],
          FieldFilterType.Exact
        )
      );
      filters.push(
        new FieldFilter(
          "desired_start_time_lte",
          startTimeInterval[1],
          FieldFilterType.Exact
        )
      );
    }

    for (const [key, value] of Object.entries(searchForm.values)) {
      if (["customerName", "specialistName"].includes(key)) continue;
      if (value && key.length > 0) {
        const filter = new FieldFilter(
          key as FieldFilterName,
          value as string,
          FieldFilterType.Exact
        );
        filters.push(filter);
      }
    }

    console.log(filters);
    props.getData(filters);
  };

  return (
    <>
      <Divider size="xs" my="xs" label="جست‌وجو" labelPosition="left" />

      <form
        onSubmit={searchForm.onSubmit(submitForm)}
        className="tour-manage-service-filter-form"
      >
        <Stack>
          <Grid grow align="flex-end" gutter="xs">
            {props.searchFields.includes(FieldFilterName.Status) && (
              <Grid.Col span={4}>
                <Select
                  className="tour-manage-service-filter-status"
                  label="وضعیت خدمت"
                  placeholder="وضعیت"
                  data={Object.keys(RequestStatusBadge).map((k) => ({
                    value: k,
                    label: RequestStatusBadge[k]["message"],
                  }))}
                  {...searchForm.getInputProps("status")}
                />
              </Grid.Col>
            )}
            {props.searchFields.includes(FieldFilterName.Speciality) && (
              <Grid.Col span={8} sm={6} md={4}>
                <SpecialityMultiSelect
                  setter={onSpecialitySelectChange}
                  required={false}
                  error=""
                  disabled={false}
                />
              </Grid.Col>
            )}
            {props.searchFields.includes(FieldFilterName.Customer) && (
              <Grid.Col span={4} sm={6} md={4}>
                <TextInput
                  className="tour-manage-service-filter-customer-name"
                  label="نام مشتری"
                  placeholder="بخشی از نام مشتری"
                  {...searchForm.getInputProps("customerName")}
                />
              </Grid.Col>
            )}
            {props.searchFields.includes(FieldFilterName.DateRange) && (
              <Grid.Col span={4}>
                <DateRangePicker
                  className="tour-manage-service-filter-date"
                  locale="fa"
                  label="زمان شروع سفارشات"
                  placeholder="انتخاب بازه‌ی زمانی"
                  value={startTimeInterval}
                  onChange={setStartTimeInterval}
                />
              </Grid.Col>
            )}
            {props.searchFields.includes(FieldFilterName.Specialist) && (
              <Grid.Col span={4}>
                <TextInput
                  className="tour-manage-service-filter-specialist-name"
                  icon={<Search size={20} />}
                  label="نام متخصص"
                  placeholder="بخشی از نام متخصص"
                  {...searchForm.getInputProps("specialistName")}
                />
              </Grid.Col>
            )}
            {props.searchFields.includes(FieldFilterName.Sort) && (
              <Grid.Col sm={6} md={4}>
                <Select
                  className="tour-search-input-sort"
                  clearable
                  label="مرتب سازی بر اساس"
                  placeholder="پیش‌فرض"
                  {...searchForm.getInputProps("sort")}
                  data={[
                    { value: "-status", label: "وضعیت (صعودی)" },
                    { value: "status", label: "وضعیت (نزولی)" },

                    { value: "-completed_at", label: "نزدیک‌ترین زمان پایان" },
                    { value: "completed_at", label: "دورترین زمان پایان" },

                    { value: "-updated_at", label: "جدیدترین تغییر" },
                    { value: "updated_at", label: "قدیمی‌ترین تغییر" },

                    {
                      value: "-customer__normal_user__score",
                      label: "بیش‌ترین امتیاز مشتری",
                    },
                    {
                      value: "customer__normal_user__score",
                      label: "کم‌ترین امتیاز مشتری",
                    },
                  ]}
                />
              </Grid.Col>
            )}
          </Grid>
          <Group position="center" spacing="md">
            <Button
              className="tour-manage-service-filter-submit"
              ref={submitRef}
              type="submit"
              variant="gradient"
              gradient={{ from: "cyan", to: "indigo", deg: 105 }}
              leftIcon={<ListSearch size={20} />}
            >
              جست‌وجو
            </Button>
            <Button
              className="tour-search-button-clear"
              variant="outline"
              gradient={{ from: "cyan", to: "indigo", deg: 105 }}
              leftIcon={<Eraser size={20} />}
              onClick={() => {
                searchForm.reset();
                setSelectedSpecialities([]);
                setStartTimeInterval([null, null]);
                props.getData([]);
              }}
            >
              پاک‌ کردن
            </Button>
          </Group>
        </Stack>
        <Divider size="xs" my="xs" />
      </form>
    </>
  );
};

export default RequestSearchComponent;
