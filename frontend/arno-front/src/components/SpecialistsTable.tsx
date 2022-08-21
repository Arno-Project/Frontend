import { useState } from "react";

import {
  Button,
  Center,
  Pagination,
  Table,
  TextInput,
  Group,
} from "@mantine/core";
import { ListSearch, Search } from "tabler-icons-react";

import { User } from "../models";
import SpecialityMultiSelect from "../components/SpecialityMultiSelect";
import { SpecialistRow } from "./SpecialistRow";
import UserSearchComponent from "./UserSearchComponent";
import { FieldFilterName } from "../api/base";

const PAGE_SIZE = 5;

const SpecialistsTable = (props: {
  users: User[];
  search: {
    getUsers: Function;
    searchFields: FieldFilterName[];
  } | null;
  button: {
    label: string;
    action: Function;
  } | null;
}) => {
  const [activePage, setPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const rows = props.users.slice(
    PAGE_SIZE * (activePage - 1),
    PAGE_SIZE * activePage
  );

  return (
    <>
      {props.search !== null && (
        <UserSearchComponent
          getData={props.search.getUsers}
          searchFields={props.search.searchFields}
          includeQuickFilters={false}
        />
      )}

      <Table striped highlightOnHover verticalSpacing="sm" mt="sm" className="tour-specialist-list">
        <thead>
          <tr>
            <th>نام متخصص</th>
            <th>تخصص‌ها</th>
            <th>امتیاز</th>
            <th>جزئیات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((user, i) => {
            if (user.isValidated)
              return (
                <SpecialistRow user={user} idx={i + 1} button={props.button} />
              );
          })}
        </tbody>
      </Table>
      <Center mt="sm">
        <Pagination
          mt="sm"
          total={Math.ceil(props.users.length / PAGE_SIZE)}
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
