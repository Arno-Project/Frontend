import { Button, Center, TextInput, Table, Textarea, Title, Pagination } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/hooks";

import { useState, useEffect } from "react";

import { Speciality } from "../../models";
import { AccountAPI } from "../../api/accounts";
import { APIDataToSpecialities } from "../../models/utils";
import { notifyUser } from "../utils";

import { Plus, X } from "tabler-icons-react";

import { Helmet } from "react-helmet";
const TITLE = "مدیریت تخصص‌ها";
const PAGE_SIZE = 4;

const ManageSpecialitiesView = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [activePage, setPage] = useState(1);

  const getData = async () => {
    const res = await AccountAPI.getInstance().getSpecialities();
    if (res.success) {
      const data = APIDataToSpecialities(res);
      setSpecialities(data.sort((a, b) => (a.id > b.id) ? 1 : -1));
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت تخصص‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const newSpecialityForm = useForm({
    initialValues: {
      title: "",
      description: "",
    },

    validationRules: {
      title: (value) => value.trim().length > 2,
      description: (value) => value.trim().length >= 2,
    },

    errorMessages: {
      title: "این بخش نمی‌تواند خالی (یا خیلی کوتاه) باشد",
      description: "این بخش نمی‌تواند خالی (یا خیلی کوتاه) باشد",
    },
  });

  const handleSubmit = async (values: any) => {
    const res = await AccountAPI.getInstance().defineNewSpeciality(values);
    
    notifyUser(res, "ایجاد موفقیت‌آمیز", "تخصص مورد نظر با موفقیت ایجاد شد.");
    
    if (res.success) {
      newSpecialityForm.reset();
      getData();
    }
  };

  const rows = specialities.slice(PAGE_SIZE * (activePage - 1), PAGE_SIZE * activePage);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <Title order={3} my="md">
        مشاهده تخصص‌ها
      </Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>عنوان</th>
            <th>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row: Speciality, i) => (
            <tr key={i}>
              <td>{row.id}</td>
              <td>{row.title}</td>
              <td>{row.description}</td>
              {/* <td>
                <UnstyledButton onClick={() => removeSpeciality(row.id)}>
                  <X color="red" size={22} />
                </UnstyledButton>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
      <Center mt="sm">
        <Pagination
          total={Math.ceil(specialities.length / PAGE_SIZE)}
          color="teal"
          radius="md"
          withEdges
          page={activePage}
          onChange={setPage}
        />
      </Center>
      <Title order={3} my="md">
        افزودن تخصص جدید
      </Title>
      <form onSubmit={newSpecialityForm.onSubmit(handleSubmit)}>
        <TextInput
          mt="sm"
          placeholder="عنوان تخصص"
          label="عنوان تخصص"
          description="یک نام مختصر و مشخص برای معرفی تخصص"
          required
          {...newSpecialityForm.getInputProps("title")}
        />
        <Textarea
          mt="sm"
          placeholder="توضیحات (شامل جزئیات، کاربردها، ...)"
          label="توضیحات تخصص"
          description="لطفا توضیح کاملی از تخصص مد نظر خود بنویسید"
          autosize
          minRows={1}
          maxRows={3}
          required
          {...newSpecialityForm.getInputProps("description")}
        />
        <Center>
          <Button mt="md" color="teal" type="submit" leftIcon={<Plus size={20} />}>
            ایجاد تخصص
          </Button>
        </Center>
      </form>
    </>
  );
};

export default ManageSpecialitiesView;
