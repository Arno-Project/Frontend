import { useState } from "react";

import { Center, NumberInput, Table, Title } from "@mantine/core";

import { Rating } from "react-simple-star-rating";

import { Star, StarHalf } from "tabler-icons-react";

import { Helmet } from "react-helmet";
const TITLE = "سیاست‌گذاری خدمت‌دهی";

const fillColorArray = [
  "#f17a45",
  "#f17a45",
  "#f19745",
  "#f19745",
  "#f1a545",
  "#f1a545",
  "#f1b345",
  "#f1b345",
  "#f1d045",
  "#f1d045",
];

const ServicePoliciesView = () => {
  const [rating5, setRating5] = useState(5);
  const [rating4, setRating4] = useState(4);
  const [rating3, setRating3] = useState(3);
  const [rating2, setRating2] = useState(2);
  const [rating1, setRating1] = useState(1);
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>

      <Center>
        <Table verticalSpacing="xl" striped highlightOnHover>
          <thead>
            <tr>
              <th>حداقل امتیاز</th>
              <th>حداکثر تعداد خدمات هم‌زمان</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Rating // TODO: fix this lie
                  // onClick={handleRating5}
                  ratingValue={rating5}
                  initialValue={5}
                  size={30}
                  transition
                  allowHalfIcon
                  fillColorArray={fillColorArray}
                  readonly={false}
                />
              </th>
              <th>
                <NumberInput py="sm"
                  defaultValue={3}
                  placeholder="تعداد خدمات"
                  max={10}
                  min={0}
                />
              </th>
            </tr>
            <tr>
              <th>
                <Rating
                  // onClick={handleRating4}
                  ratingValue={rating4}
                  initialValue={4}
                  size={30}
                  transition
                  allowHalfIcon
                  fillColorArray={fillColorArray}
                  readonly={false}
                />
              </th>
              <th>
                <NumberInput py="sm"
                  defaultValue={3}
                  placeholder="تعداد خدمات"
                  max={10}
                  min={0}
                />
              </th>
            </tr>
            <tr>
              <th>
                <Rating
                  // onClick={handleRating3}
                  ratingValue={rating3}
                  initialValue={3}
                  size={30}
                  transition
                  allowHalfIcon
                  fillColorArray={fillColorArray}
                  readonly={false}
                />
              </th>
              <th>
                <NumberInput py="sm"
                  defaultValue={2}
                  placeholder="تعداد خدمات"
                  max={10}
                  min={0}
                />
              </th>
            </tr>
            <tr>
              <th>
                <Rating
                  // onClick={handleRating2}
                  ratingValue={rating2}
                  initialValue={2}
                  size={30}
                  transition
                  allowHalfIcon
                  fillColorArray={fillColorArray}
                  readonly={false}
                />
              </th>
              <th>
                <NumberInput py="sm"
                  defaultValue={2}
                  placeholder="تعداد خدمات"
                  max={10}
                  min={0}
                />
              </th>
            </tr>
            <tr>
              <th>
                <Rating
                  // onClick={handleRating1}
                  ratingValue={rating1}
                  initialValue={1}
                  size={30}
                  transition
                  allowHalfIcon
                  fillColorArray={fillColorArray}
                  readonly={false}
                />
              </th>
              <th>
                <NumberInput py="sm"
                  defaultValue={1}
                  placeholder="تعداد خدمات"
                  max={10}
                  min={0}
                />
              </th>
            </tr>
          </tbody>
        </Table>
      </Center>
    </>
  );
};

export default ServicePoliciesView;
