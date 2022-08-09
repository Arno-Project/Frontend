
import { Button } from "@mantine/core";

import { User } from "../models";

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
  return ( // To Saba: key={user.id} -> key={idx} :?
    <tr key={idx}>
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
