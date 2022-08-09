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

const SpecialistsTable = (props: {
  users: User[];
  button: {
    label: string;
    action: Function;
  } | null;
}) => {
  const PAGE_SIZE = 5;
  const [activePage, setPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <>
      <div className="search-criteria">
        <Group align="flex-end">
          <TextInput
            // value={inputValue}
            // onChange={(event) => setInputValue(event.currentTarget.value)}
            icon={<Search size={20} />}
            label="نام متخصص"
            placeholder="نام"
          />

          <SpecialityMultiSelect setter={setSelectedValues} />

          <Button
            variant="gradient"
            gradient={{ from: "cyan", to: "indigo", deg: 105 }}
            leftIcon={<ListSearch size={20} />}
            // loading={isSearching}
            // onClick={() => fetchResults()}
          >
            جست‌وجو
          </Button>
        </Group>
      </div>

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
                <SpecialistRow user={user} idx={i + 1} button={props.button} />
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