import { useState } from "react";
import { ZoomInArea } from "tabler-icons-react";
import { Button, UnstyledButton } from "@mantine/core";

import { User } from "../models";
import { SpecialitiesBadges } from "../models/SpecialityBadges";
import { UserScore } from "../models/UserScore";
import UserModal from "./UserModal";

export const SpecialistRow = (props: {
  user: User;
  idx: string | number;
  button: {
    label: string;
    action: Function;
    className: string | null;
  } | null;
}) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

  const user = props.user;
  const idx = props.idx;
  return (
    <tr>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>
        <SpecialitiesBadges speciality={user.speciality} />
      </td>
      <td>
        <UserScore score={user.score} />
      </td>
      <td>
        <UnstyledButton
          onClick={() => {
            setIsUserModalOpen(true);
          }}
        >
          <ZoomInArea color="black" size={22} />
        </UnstyledButton>
        {props.button !== null && (
          <Button
            color="orange"
            variant="outline"
            compact
            onClick={() => {
              props.button!.action(user.id);
            }}
            className={
              props.button!.className ? props.button!.className + "-" + idx : ""
            }
          >
            {props.button.label}
          </Button>
        )}
      </td>

      <UserModal
        key={user.id}
        user={props.user}
        isOpen={isUserModalOpen}
        changeIsOpen={setIsUserModalOpen}
        validateSpecialist={null}
      />
    </tr>
  );
};
