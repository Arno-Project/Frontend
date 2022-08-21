import { Button, Center, Select, Text, Textarea, Title } from "@mantine/core";
import { useForm } from '@mantine/form';

import { SystemFeedbackAPI } from "../../api/feedback";

import { Helmet } from "react-helmet";
import { FeedbackType } from "../../models";
import { notifyUser } from "../utils";
import {useEffect} from "react";
import {setSteps} from "../../redux/intro";
import {SpecialistListSteps, SuggestionComplaintSteps} from "../../assets/IntroSteps";
import {useAppDispatch} from "../../redux/hooks";
import {useLocation} from "react-router-dom";
const TITLE = "انتقادات و پیشنهادات";

const UserFeedbackView = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/suggestion_complaint") {
      dispatch(setSteps(SuggestionComplaintSteps));
    }
  }, [location.pathname]);

  const userFeedbackForm = useForm({
    initialValues: {
      type: "",
      text: "",
    },

    validate: {
      type: (value) => value.trim().length === 1 ? null : "این بخش نمی‌تواند خالی باشد",
      text: (value) => value.trim().length >= 2 ? null : "این بخش نمی‌تواند خالی باشد",
    },
  });

  const handleSubmit = async (values: any) => {
    const res = await SystemFeedbackAPI.getInstance().submitFeedback(values);
    
    notifyUser(res, "ثبت موفقیت‌آمیز", "بازخورد شما با موفقیت ارسال شد.");
    if (res.success) {
      userFeedbackForm.reset();
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
          className="tour-input-complaint-type"
          mt="sm"
          label="نوع بازخورد"
          description="لطفا یک مورد را انتخاب کنید:"
          placeholder="موضوع بازخورد"
          required
          data={[
            { value: FeedbackType.Complaint, label: "انتقاد" },
            { value: FeedbackType.Suggestion, label: "پیشنهاد" },
            { value: FeedbackType.Technical, label: "مشکل فنی" },
          ]}
          {...userFeedbackForm.getInputProps("type")}
        />
        <Textarea
          className="tour-input-complaint-description"
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
          <Button
              className="tour-button-submit-complaint"
              mt="md" color="blue" type="submit">
            ارسال
          </Button>
        </Center>
      </form>
    </>
  );
};

export default UserFeedbackView;
