import {
  Table,
  Button,
  Center,
  MultiSelect,
  TextInput,
  Pagination,
} from "@mantine/core";

import React from "react";

import { Search, ListSearch, UserSearch } from "tabler-icons-react";

const ServicesPage = () => {
  const PAGE_SIZE = 5;

  const fetchResults = () => {
    setSearching(true);
    console.log(inputValue);
    console.log(selectedValues);
    // TODO fetch items
    setSearching(false);
  };

  const [isSearching, setSearching] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const [activePage, setPage] = React.useState(1);

  const data: any[] = [
    { attr: "1" },
    { attr: "2" },
    { attr: "3" },
    { attr: "4" },
    { attr: "5" },
    { attr: "11" },
    { attr: "12" },
    { attr: "13" },
    { attr: "14" },
    { attr: "15" },
    { attr: "21" },
    { attr: "22" },
    { attr: "23" },
    { attr: "24" },
    { attr: "25" },
  ];

  const rows = data.slice(PAGE_SIZE * (activePage - 1), PAGE_SIZE * activePage).map(
    (element) => (
      <tr key={element.attr}>
        <td>{element.attr}</td>
        <td>{element.attr}</td>
        <td>{element.attr}</td>
        <td>{element.attr}</td>
      </tr>
    )
  );

  return (
    <>
      <h1>جست‌وجوی خدمات</h1>
      <div className="search-criteria">
        <TextInput
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          icon={<Search size={20} />}
          label="شرح خدمت"
          placeholder="خدمت"
        />

        <MultiSelect
          onChange={(event) => setSelectedValues(event)}
          className="font-reminder"
          data={[
            "React",
            "Angular",
            "Svelte",
            "Vue",
            "Riot",
            "Next.js",
            "Blitz.js",
          ]} // TODO
          icon={<UserSearch size={20} />}
          label="انتخاب تخصص(ها)"
          placeholder="تخصص‌های مورد نظر"
          searchable
          clearable
        />
      </div>
      <Center>
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          leftIcon={<ListSearch size={20} />}
          loading={isSearching}
          onClick={() => fetchResults()}
        >
          جست‌وجو
        </Button>
      </Center>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>فیلد 1</th>
            <th>فیلد 2</th>
            <th>فیلد 3</th>
            <th>فیلد 4</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Center mt="sm">
        <Pagination
          total={Math.ceil(data.length / PAGE_SIZE)}
          color="lime"
          radius="md"
          withEdges
          page={activePage}
          onChange={setPage}
        />
      </Center>
    </>
  );
};

export default ServicesPage;
