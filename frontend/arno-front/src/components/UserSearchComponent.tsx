import {
  Button,
  TextInput,
  Stack,
  Grid,
  Select,
  MultiSelect,
  Group,
} from "@mantine/core";

import { useForm } from "@mantine/form";

import { useState } from "react";

import { UserRole } from "../models";

import { Eraser, ListSearch } from "tabler-icons-react";

import { RoleDict } from "../assets/consts";

import { FieldFilter, FieldFilterName, FieldFilterType } from "../api/base";
import SpecialityMultiSelect from "./SpecialityMultiSelect";

const UserSearchComponent = (props: {
  getData: Function;
  searchFields: FieldFilterName[];
}) => {
  const onSpecialitySelectChange = (values: any[]) => {
    setSelectedSpecialities(values);
  };
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );

  const searchForm = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      specialities: [],
      roles: [],
      sort: "",
    },

    validate: {},
  });

  const submitForm = (v: any) => {
    console.log(v);
    console.log(selectedSpecialities);
    let filters = [];

    if (selectedSpecialities.length > 0) {
      searchForm.setFieldValue("roles", [UserRole.Specialist as never]);
      filters.push(
        new FieldFilter(
          FieldFilterName.Speciality,
          selectedSpecialities.join(","),
          FieldFilterType.Exact
        )
      );
      filters.push(
        new FieldFilter(
          FieldFilterName.Role,
          UserRole.Specialist,
          FieldFilterType.Exact
        )
      );
    }

    for (const [key, value] of Object.entries(searchForm.values)) {
      if (value && (key !== "roles" || key.length > 0)) {
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
    <form onSubmit={searchForm.onSubmit(submitForm)}>
      <Stack>
        <Grid grow>
          {props.searchFields.includes(FieldFilterName.Name) && (
            <Grid.Col sm={6} md={4}>
              <TextInput
                label="نام یا نام کاربری"
                placeholder="نام یا نام کاربری"
                {...searchForm.getInputProps("name")}
              />
            </Grid.Col>
          )}
          {props.searchFields.includes(FieldFilterName.Phone) && (
            <Grid.Col sm={6} md={4}>
              <TextInput
                label="تلفن همراه"
                placeholder="تلفن همراه"
                {...searchForm.getInputProps("phone")}
              />
            </Grid.Col>
          )}

          {props.searchFields.includes(FieldFilterName.Email) && (
            <Grid.Col sm={6} md={4}>
              <TextInput
                label="ایمیل"
                placeholder="ایمیل"
                {...searchForm.getInputProps("email")}
              />
            </Grid.Col>
          )}
          {props.searchFields.includes(FieldFilterName.Roles) && (
            <Grid.Col sm={6} md={4}>
              <MultiSelect
                label="نقش"
                placeholder="همه"
                clearable
                data={Object.values(UserRole).map((r) => ({
                  value: r,
                  label: RoleDict[r],
                }))}
                {...searchForm.getInputProps("roles")}
                disabled={
                  // enable this filter only if no speciality is selected
                  props.searchFields.includes(FieldFilterName.Speciality) &&
                  selectedSpecialities.length > 0
                }
              />
            </Grid.Col>
          )}
          {props.searchFields.includes(FieldFilterName.Speciality) && (
            <Grid.Col sm={6} md={4}>
              <SpecialityMultiSelect
                setter={onSpecialitySelectChange}
                required={false}
                error=""
                disabled={
                  // enable this filter only if specialist role is selected
                  props.searchFields.includes(FieldFilterName.Roles) &&
                  !(
                    (searchForm.values["roles"] as object[]).length === 1 &&
                    searchForm.values["roles"].at(0) === UserRole.Specialist
                  )
                }
              />
            </Grid.Col>
          )}
          {props.searchFields.includes(FieldFilterName.Sort) && (
            <Grid.Col sm={6} md={4}>
              <Select
                clearable
                label="مرتب سازی بر اساس"
                placeholder="پیش‌فرض"
                {...searchForm.getInputProps("sort")}
                data={[
                  {
                    value: "-score",
                    label: "بیشترین امتیاز (برای کاربران عادی)",
                  },
                  {
                    value: "score",
                    label: "کم‌ترین امتیاز (برای کاربران عادی)",
                  },
                  { value: "-date_joined", label: "جدیدترین تاریخ عضویت" },
                  { value: "date_joined", label: "قدیمی‌ترین تاریخ عضویت" },
                ]}
              />
            </Grid.Col>
          )}
        </Grid>
        <Group position="center" spacing="md">
          <Button
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
              setSelectedSpecialities([]);
              props.getData([]);
            }}
          >
            پاک‌ کردن
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default UserSearchComponent;
