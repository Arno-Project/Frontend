
import { Badge, Tooltip } from "@mantine/core";

import { Speciality } from "../models";

import { mantine_colors } from "../assets/consts";

export const SpecialitiesBadges = (props: { speciality: Speciality[] }) => {
  return (
    <>
      {props.speciality.map((s, i) => {
        return (
          <Tooltip
            key={i}
            label={s.description}
            color="gray"
            transition="skew-down"
            transitionDuration={300}
            withArrow
          >
            <Badge
              key={s.id}
              color={mantine_colors[s.id % mantine_colors.length]}
              variant="filled"
            >
              {s.title}
            </Badge>
          </Tooltip>
        );
      })}
    </>
  );
};
