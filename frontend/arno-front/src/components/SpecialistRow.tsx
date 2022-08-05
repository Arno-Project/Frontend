import { useEffect, useState } from "react";

import { Badge, Button, Tooltip } from "@mantine/core";
import { X, Check, ListSearch, Search, Paperclip } from "tabler-icons-react";

import { useAppSelector } from "../redux/hooks";
import { User, UserGeneralRole, UserRole } from "../models";
import SpecialityMultiSelect from "../components/SpecialityMultiSelect";

import { AccountAPI } from "../api/accounts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../api/base";
import { APIDataToUsers } from "../models/utils";
import { mantine_colors } from "../assets/consts";

export const SpecialistRow = (props: {
  user: User;
  idx: string | number;
  button: {
    label: string;
    action: Function;
  } | null;
}) => {
  const user = props.user;
  const idx = props.idx;
  return (
    <tr key={user.id}>
      <td>{idx}</td>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>
        {user.speciality.map((s, i) => {
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
      </td>
      <td>{user.score}</td>
      {props.button !== null && (
        <td>
          <Button
          color="orange"
          variant="outline"
            compact
            onClick={() => {
              props.button!.action(user.id);
            }}
          >
            {props.button.label}
          </Button>
        </td>
      )}
    </tr>
  );
};
