import { useEffect, useState } from "react";

import { useForm } from "@mantine/form";
import { Rating } from "react-simple-star-rating";
import {
  Text,
  Title,
  Card,
  Space,
  Button,
  ActionIcon,
  Tooltip,
  Group,
  Textarea,
  Modal,
  UnstyledButton,
  Divider,
} from "@mantine/core";

import {
  Feedback,
  Metric,
  MetricScore,
  RequestFeedback,
  User,
} from "../models";
import { APIDataToMetrics } from "../models/utils";

import { InfoCircle, ExternalLink } from "tabler-icons-react";

import { MetricsAPI } from "../api/metrics";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../api/base";
import { FeedbackAPI } from "../api/feedback";
import { notifyUser } from "../views/utils";
import { RatingFillColorArray } from "../assets/consts";
import { UserScore } from "../models/UserScore";
import { useLocation, useNavigate } from "react-router-dom";

const FeedbacksListComponent = (props: {
  feedbacks: RequestFeedback[];
  user: User | null;
}) => {
  const navigate = useNavigate();

  console.info("FeedbacksListComponent", props.feedbacks);
  return (
    <>
      <Title order={3}> کاربر {props?.user?.username}</Title>
      {props.feedbacks.map((feedback: RequestFeedback, idx: number) => {
        return (
          <>
          <Space h="sm"/>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
              <Group>
                بازخورد مربوط به درخواست شماره {feedback.request}
                <UnstyledButton
                  onClick={() =>
                    navigate(`/dashboard/request_details/${feedback.request}`)
                  }
                >
                  <ExternalLink color="blue" size={22} />
                </UnstyledButton>
              </Group>
            </Card.Section>
            <Divider
              size="xs"
              my="xs"
              label="امتیازها"
              labelPosition="left"
              variant="dashed"
            />

            {feedback.metricScores.map(
              (metricScore: MetricScore, idx: number) => {
                const metric = metricScore.metric;
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
                      :
                      <UserScore score={metricScore.score} />
                    </Group>
                  </div>
                );
              }
            )}
            <Divider
              size="xs"
              my="xs"
              label="توضیحات"
              labelPosition="left"
              variant="dashed"
            />

            {feedback.description ? (
              <Text>{feedback.description}</Text>
            ) : (
              <Text color="dimmed"> کاربر توضیحی اضافه نکرده است.</Text>
            )}
          </Card>
          
          </>
        );
      })}
    </>
  );
};

export default FeedbacksListComponent;
