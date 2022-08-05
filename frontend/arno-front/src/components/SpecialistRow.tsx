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
import { SpecialitiesBadges } from "../models/SpecialityBadges";

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
        <SpecialitiesBadges speciality={user.speciality} />
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
