import { useState } from "react";
import 'dayjs/locale/fa';

import { Button, Center, Select, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from '@mantine/dates';
import { Check, Send, UserSearch } from "tabler-icons-react";

import { CoreAPI } from "../../api/core";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";

import { Helmet } from "react-helmet";
import { Specialities, SpecialitiesId } from "../../assets/consts";
const TITLE = "درخواست خدمات";

const RequestServiceView = () => {
  const submitRequestForm = useForm({
    initialValues: {
      requested_speciality: "",
      desired_start_time: new Date(),
      description: "",
    },
    validationRules: {
      requested_speciality: (value) => value.trim().length > 0,
      description: (value) => value.trim().length > 0,
    },
    errorMessages: {
      requested_speciality: "این بخش نمی‌تواند خالی باشد",
      desired_start_time: "زمان نمی‌تواند خالی باشد.",
      description: "این بخش نمی‌تواند خالی باشد",
    },
  });

  const submitForm = async (values: any) => {
    values["requested_speciality"] = SpecialitiesId[values["requested_speciality"] as keyof object];
    const res = await CoreAPI.getInstance().submitRequest(values);
    if (res.success) {
      showNotification({
        title: "ثبت موفقیت‌آمیز",
        message: "درخواست شما با موفقیت ارسال شد.",
        color: "teal",
        icon: <Check size={18} />,
      });
      submitRequestForm.reset();
    }
  }

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <form onSubmit={submitRequestForm.onSubmit(submitForm)}>
      <div style={{ marginTop: "16px" }}>
        <Select
          className="font-reminder"
          data={Specialities}
          icon={<UserSearch size={20} />}
          label="انتخاب تخصص"
          placeholder="تخصص مورد نیاز"
          required
          searchable
          clearable
          {...submitRequestForm.getInputProps("requested_speciality")}
        />
      </div>
      <DatePicker
        locale="fa"
        placeholder="یک روز را انتخاب کنید"
        label="زمان شروع"
        required
        {...submitRequestForm.getInputProps("desired_start_time")}
      />
      <Textarea
          mt="sm"
          placeholder="توضیحات"
          label="شرح سفارش"
          description="لطفا شرح کامل درخواست خود را بنویسید."
          autosize
          minRows={4}
          maxRows={6}
          required
          {...submitRequestForm.getInputProps("description")}
        />
        <Center>
          <Button
            mt="md"
            variant="gradient"
            gradient={{ from: "cyan", to: "indigo", deg: 105 }}
            leftIcon={<Send size={20} />}
            type="submit"
          >
            ثبت سفارش
          </Button>
        </Center>
      </form>
    </>
  );
};

export default RequestServiceView;
