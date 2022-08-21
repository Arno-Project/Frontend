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
} from "@mantine/core";

import { useForm } from "@mantine/form";

import { useState, useRef } from "react";

import { UserRole } from "../models";

import { Eraser, ListSearch } from "tabler-icons-react";

import { RoleDict, RoleDictColor } from "../assets/consts";

import { FieldFilter, FieldFilterName, FieldFilterType } from "../api/base";
import SpecialityMultiSelect from "./SpecialityMultiSelect";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  specialities: number[];
  roles: UserRole[];
  sort: string;
}

const UserSearchComponent = (props: {
  getData: Function;
  searchFields: FieldFilterName[];
  includeQuickFilters: boolean;
}) => {
  const onSpecialitySelectChange = (values: any[]) => {
    setSelectedSpecialities(values);
  };
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );

  const submitRef = useRef<HTMLButtonElement>(null);

  const searchForm = useForm<FormValues>({
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
    console.info("submitForm values", v);
    console.info("submitForm selected specs", selectedSpecialities);
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
    <>
      {props.includeQuickFilters && (
        <>
          <Divider size="xs" my="xs" label="فیلتر سریع" labelPosition="left" />

          <Group position="left" mt="md" mb="xs" px="lg">
            <Button
              variant="gradient"
              gradient={{
                from: RoleDictColor[UserRole.Specialist],
                to: RoleDictColor[UserRole.Specialist],
              }}
              radius="xs"
              compact
              onClick={async () => {
                await searchForm.setValues({
                  name: "",
                  phone: "",
                  email: "",
                  specialities: [],
                  roles: [UserRole.Specialist],
                  sort: "-score",
                });
                submitRef?.current?.click();
              }}
            >
              متخصصان بر حسب امتیاز
            </Button>

            <Button
              variant="gradient"
              gradient={{
                from: RoleDictColor[UserRole.Customer],
                to: RoleDictColor[UserRole.Customer],
              }}
              radius="xs"
              compact
              onClick={async () => {
                await searchForm.setValues({
                  name: "",
                  phone: "",
                  email: "",
                  specialities: [],
                  roles: [UserRole.Customer],
                  sort: "-score",
                });
                submitRef?.current?.click();
              }}
            >
              مشتریان بر حسب امتیاز
            </Button>

            <Button
              variant="gradient"
              gradient={{
                from: RoleDictColor[UserRole.CompanyManager],
                to: RoleDictColor[UserRole.TechnicalManager],
              }}
              radius="xs"
              compact
              onClick={async () => {
                await searchForm.setValues({
                  name: "",
                  phone: "",
                  email: "",
                  specialities: [],
                  roles: [UserRole.CompanyManager, UserRole.TechnicalManager],
                  sort: "",
                });
                submitRef?.current?.click();
              }}
            >
              مدیران شرکت
            </Button>
          </Group>
        </>
      )}
      <Divider size="xs" my="xs" label="جست‌وجو" labelPosition="left" />

      <form onSubmit={searchForm.onSubmit(submitForm)}>
        <Stack>
          <Grid grow>
            {props.searchFields.includes(FieldFilterName.Name) && (
              <Grid.Col sm={6} md={4}>
                <TextInput
                  className="tour-search-input-name"
                  label="نام یا نام کاربری"
                  placeholder="نام یا نام کاربری"
                  {...searchForm.getInputProps("name")}
                />
              </Grid.Col>
            )}
            {props.searchFields.includes(FieldFilterName.Phone) && (
              <Grid.Col sm={6} md={4}>
                <TextInput
                  className="tour-search-input-phone"
                  label="تلفن همراه"
                  placeholder="تلفن همراه"
                  {...searchForm.getInputProps("phone")}
                />
              </Grid.Col>
            )}

            {props.searchFields.includes(FieldFilterName.Email) && (
              <Grid.Col sm={6} md={4}>
                <TextInput
                  className="tour-search-input-email"
                  label="ایمیل"
                  placeholder="ایمیل"
                  {...searchForm.getInputProps("email")}
                />
              </Grid.Col>
            )}
            {props.searchFields.includes(FieldFilterName.Roles) && (
              <Grid.Col sm={6} md={4}>
                <MultiSelect
                  className="tour-search-input-role"
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
                      searchForm.values["roles"].length === 1 &&
                      searchForm.values["roles"].at(0) === UserRole.Specialist
                    )
                  }
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
              className="tour-search-button"
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

export default UserSearchComponent;
