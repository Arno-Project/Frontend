import { useEffect, useState } from "react";

import { useForm } from "@mantine/form";
import { Rating } from "react-simple-star-rating";
import {
  Text,
  Button,
  ActionIcon,
  Tooltip,
  Group,
  Textarea,
  Modal,
} from "@mantine/core";

import { Metric } from "../models";
import { APIDataToMetrics } from "../models/utils";

import { InfoCircle } from "tabler-icons-react";

import { MetricsAPI } from "../api/metrics";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../api/base";
import { FeedbackAPI } from "../api/feedback";
import { notifyUser } from "../views/utils";
import { RatingFillColorArray } from "../assets/consts";

const RequestFeedbackModal = (props: {
  role: string;
  isOpen: boolean;
  changeIsOpen: Function;
  requestID: string;
}) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  const handleRatingChange = (rate: number, idx: number) => {
    const newRatings = ratings.map((r: number, i: number) =>
      i === idx ? rate : r
    );
    setRatings(newRatings);
  };

  useEffect(() => {
    getData();
  }, []);

  const feedbackForm = useForm({
    initialValues: {
      description: "",
    },

    validate: {},
  });

  const getData = async () => {
    /* get metrics */
    let filter = new FieldFilter(
      FieldFilterName.Role,
      props.role,
      FieldFilterType.Exact
    );
    let res = await MetricsAPI.getInstance().get([filter]);
    if (res.success) {
      const data = APIDataToMetrics(res);
      setMetrics(data);
      const initialRatings = data.map(() => 50);
      setRatings(initialRatings);

      /* get old feedback */

      filter = new FieldFilter(
        FieldFilterName.RequestID,
        props.requestID,
        FieldFilterType.Exact
      );
      res = await FeedbackAPI.getInstance().get([filter]);

      if (res.success) {
        const feedbackArray = res.data as Array<object>;

        /* use old feedback as initial values if exist */
        if (feedbackArray.length > 0) {
          const oldFeedback = feedbackArray[0];
          feedbackForm.setValues({
            description: oldFeedback["description" as keyof object],
          });
          const metricScoresArray = oldFeedback[
            "metric_scores" as keyof object
          ] as Array<object>;
          const newRatings = data.map((r: Metric, i: number) => {
            for (let index = 0; index < metricScoresArray.length; index++) {
              const element = metricScoresArray[index];
              if (element["metric" as keyof object] === r.id)
                return element["score" as keyof object];
            }
            return 50;
          });

          setRatings(newRatings);
        }
      }
    }
  };

  const submitForm = async (values: any) => {
    const metricScoreMap = metrics.map((m: Metric, idx: number) => {
      return { metric_id: m.id, rating: ratings[idx] };
    });
    const feedbackData = {
      ...values,
      metric_scores: metricScoreMap,
      request_id: props.requestID,
    };
    const res = await FeedbackAPI.getInstance().add(feedbackData);

    props.changeIsOpen(false);
    notifyUser(res, "عملیات موفقیت‌آمیز", "بازخورد شما با موفقیت ثبت شد.");
  };

  return (
    <>
      <Modal
        centered
        opened={props.isOpen}
        onClose={() => props.changeIsOpen(false)}
        title="ثبت بازخورد"
        overlayOpacity={0.55}
        overlayBlur={3}
        style={{ position: "absolute", zIndex: 1000 }}
      >
        <form onSubmit={feedbackForm.onSubmit(submitForm)}>
          {metrics.map((metric: Metric, idx: number) => {
            return (
              <div key={idx}>
                <Group>
                  <Text weight={500}>{metric.title}</Text>
                  <Tooltip
                    label={metric.description}
                    color="gray"
                    transition="skew-down"
                    transitionDuration={300}
                    withArrow
                  >
                    <ActionIcon>
                      <InfoCircle />
                    </ActionIcon>
                  </Tooltip>
                </Group>
                <Rating
                  onClick={(r: number) => handleRatingChange(r, idx)}
                  ratingValue={ratings[idx]}
                  initialValue={3}
                  fillColorArray={RatingFillColorArray}
                  allowHalfIcon
                  rtl
                />
              </div>
            );
          })}
          <Textarea
            data-autofocus
            label="توضیحات"
            {...feedbackForm.getInputProps("description")}
          />

          <Group position="right">
            <Button mt="sm" color="blue" type="submit">
              ثبت
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default RequestFeedbackModal;
