import { useState } from "react";

import { Button, Center, Select, Text, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";

import { useAppSelector } from "../../redux/hooks";

import { Helmet } from "react-helmet";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
const TITLE = "انتقادات و پیشنهادات";

const UserFeedbackView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const userFeedbackForm = useForm({
    initialValues: {
      type: "",
      text: "",
    },

    validationRules: {
      type: (value) => value.trim().length >= 2,
      text: (value) => value.trim().length >= 2,
    },

    errorMessages: {
      type: "این بخش نمی‌تواند خالی باشد",
      text: "این بخش نمی‌تواند خالی باشد",
    },
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
    // const data = await ();
    if (true) {
      showNotification({
        title: "ثبت موفقیت‌آمیز",
        message: "بازخورد شما با موفقیت ارسال شد.",
        color: "teal",
        icon: <Check size={18} />,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <Text>
        لطفا انتقادات و پیشنهادات خود و مشکلات فنی را با ما از طریق فرم زیر در
        میان بگذارید.
      </Text>

      <form onSubmit={userFeedbackForm.onSubmit(handleSubmit)}>
        <Select
          mt="sm"
          label="نوع بازخورد"
          description="لطفا یک مورد را انتخاب کنید:"
          placeholder="موضوع بازخورد"
          required
          data={[
            { value: "complaint", label: "انتقاد" },
            { value: "suggestion", label: "پیشنهاد" },
            { value: "technical", label: "مشکل فنی" },
          ]}
          {...userFeedbackForm.getInputProps("type")}
        />
        <Textarea
          mt="sm"
          placeholder="توضیحات"
          label="متن پیام"
          description="لطفا شرح کامل مشکل یا پیشنهاد خود را بنویسید."
          autosize
          minRows={6}
          maxRows={8}
          required
          {...userFeedbackForm.getInputProps("text")}
        />
        <Center>
          <Button mt="md" color="blue" type="submit">
            ارسال
          </Button>
        </Center>
      </form>
    </>
  );
};

export default UserFeedbackView;
