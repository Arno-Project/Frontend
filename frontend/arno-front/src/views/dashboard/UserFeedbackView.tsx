import { Button, Center, Select, Text, Textarea, Title } from "@mantine/core";
import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "انتقادات و پیشنهادات";

const UserFeedbackView = () => {
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

      <Select
        mt="sm"
        label="نوع بازخورد"
        description="لطفا یک مورد را انتخاب کنید:"
        placeholder="موضوع بازخورد"
        error="" // TODO handle error
        required
        data={[
          { value: "complaint", label: "انتقاد" },
          { value: "suggestion", label: "پیشنهاد" },
          { value: "technical", label: "مشکل فنی" },
        ]}
      />
      <Textarea
        mt="sm"
        placeholder="توضیحات"
        label="متن پیام"
        description="لطفا شرح کامل مشکل یا پیشنهاد خود را بنویسید."
        error="" // TODO handle error
        autosize
        minRows={6}
        maxRows={8}
        required
      />
      <Center>
        <Button mt="md" color="blue" type="submit">
          ارسال
        </Button>
      </Center>
    </>
  );
};

export default UserFeedbackView;
