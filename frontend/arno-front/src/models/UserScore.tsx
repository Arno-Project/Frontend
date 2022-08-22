import { Group } from "@mantine/core";
import { Star } from "tabler-icons-react";

import { RatingFillColorArray } from "../assets/consts";

export const UserScore = (props: { score: number }) => {
  const color = RatingFillColorArray[Math.floor(Math.min(99, props.score) / 10)];
  return <Group align="center" spacing={2}>
    <Star color={color} strokeWidth={2.5} size={20} fill={color}/>
    {props.score / 20}
  </Group>;
};
