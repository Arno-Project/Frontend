import {
  Button,
  TextInput,
  Stack,
  SimpleGrid,
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
    for (const [key, value] of Object.entries(v)) {
      if (value && (key !== "roles" || key.length > 0)) {
        const filter = new FieldFilter(
          key as FieldFilterName,
          value as string,
          FieldFilterType.Exact
        );
        filters.push(filter);
      }
    }
    if (selectedSpecialities.length > 0) {
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
    console.log(filters);
    props.getData(filters);
  };

  return (
    <form onSubmit={searchForm.onSubmit(submitForm)}>
      <Stack>
        <SimpleGrid cols={2}>
          {props.searchFields.includes(FieldFilterName.Name) && (
            <TextInput
              label="نام یا نام کاربری"
              placeholder="نام یا نام کاربری"
              {...searchForm.getInputProps("name")}
            />
          )}
          {props.searchFields.includes(FieldFilterName.Phone) && (
            <TextInput
              label="تلفن همراه"
              placeholder="تلفن همراه"
              {...searchForm.getInputProps("phone")}
            />
          )}

          {props.searchFields.includes(FieldFilterName.Email) && (
            <TextInput
              label="ایمیل"
              placeholder="ایمیل"
              {...searchForm.getInputProps("email")}
            />
          )}
          {props.searchFields.includes(FieldFilterName.Roles) && (
            <MultiSelect
              label="نقش"
              placeholder="همه"
              clearable
              data={Object.values(UserRole).map((r) => ({
                value: r,
                label: RoleDict[r],
              }))}
              {...searchForm.getInputProps("roles")}
            />
          )}
          {props.searchFields.includes(FieldFilterName.Speciality) && (
            <SpecialityMultiSelect
              setter={onSpecialitySelectChange}
              required={false}
              error=""
            />
          )}
          {props.searchFields.includes(FieldFilterName.Sort) && (
            <Select
              clearable
              label="مرتب سازی بر اساس"
              placeholder="پیش‌فرض"
              {...searchForm.getInputProps("sort")}
              data={[
                { value: "-score", label: "بیشترین امتیاز" },
                { value: "score", label: "کم‌ترین امتیاز" },
                { value: "-date_joined", label: "جدیدترین تاریخ عضویت" },
                { value: "date_joined", label: "قدیمی‌ترین تاریخ عضویت" },
              ]}
            />
          )}
        </SimpleGrid>
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
