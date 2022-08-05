import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Center,
  Pagination,
  Space,
  Table,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { X, Check, ListSearch, Search, Paperclip } from "tabler-icons-react";

import { useAppSelector } from "../redux/hooks";
import { User, UserGeneralRole, UserRole } from "../models";
import SpecialityMultiSelect from "../components/SpecialityMultiSelect";

import { AccountAPI } from "../api/accounts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../api/base";
import { APIDataToUsers } from "../models/utils";
import { mantine_colors } from "../assets/consts";
const TITLE = "متخصصان";

const SpecialistsTable = (props: { users: User[] }) => {
  const user = useAppSelector((state) => state.auth.user);

  const PAGE_SIZE = 5;
  const [activePage, setPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <>
      <div className="search-criteria">
        <TextInput
          // value={inputValue}
          // onChange={(event) => setInputValue(event.currentTarget.value)}
          icon={<Search size={20} />}
          label="نام متخصص"
          placeholder="نام"
        />

        <SpecialityMultiSelect setter={setSelectedValues} />
      </div>
      <Center>
        <Button
          variant="gradient"
          gradient={{ from: "cyan", to: "indigo", deg: 105 }}
          leftIcon={<ListSearch size={20} />}
          // loading={isSearching}
          // onClick={() => fetchResults()}
        >
          جست‌وجو
        </Button>
      </Center>

      <Table striped highlightOnHover verticalSpacing="sm" mt="sm">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>نام متخصص</th>
            <th>تخصص(ها)</th>
            <th>امتیاز</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, i) => {
            if (user.is_validated)
              return (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>
                    {user.speciality.map((s) => {
                      return (
                        <Tooltip
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
                </tr>
              );
          })}
        </tbody>
      </Table>
      <Center mt="sm">
        <Pagination
          mt="sm"
          total={3} // {Math.ceil(data.length / PAGE_SIZE)}
          color="cyan"
          radius="md"
          withEdges
          page={activePage}
          onChange={setPage}
        />
      </Center>
    </>
  );
};

export default SpecialistsTable;
