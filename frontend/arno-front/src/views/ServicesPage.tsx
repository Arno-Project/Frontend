import {
  useMantineTheme,
  Table,
  Button,
  Center,
  MultiSelect,
  TextInput,
} from "@mantine/core";

import React from "react";

import { Search, ListSearch, UserSearch } from "tabler-icons-react";

const ServicesPage = () => {
  const theme = useMantineTheme();
  
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

  const data: any[] = [
    { attr: "1" },
    { attr: "2" },
    { attr: "3" },
    { attr: "4" },
    { attr: "5" },
  ];

  const rows = data.map((element) => (
    <tr key={element.attr}>
      <td>{element.attr}</td>
      <td>{element.attr}</td>
      <td>{element.attr}</td>
      <td>{element.attr}</td>
    </tr>
  ));

  return (
    <>
      <h1>جست‌وجوی خدمات</h1>
      <div className="search-criteria">
        <TextInput
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          icon={<Search />}
          label="شرح خدمت"
          placeholder="خدمت"
        />

        <MultiSelect
          onChange={(event) => setSelectedValues(event)}
          className="font-reminder"
          data={["React", "Angular", "Svelte", "Vue", "Riot", "Next.js", "Blitz.js",]} // TODO
          icon={<UserSearch size={14} />}
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
          leftIcon={<ListSearch />}
          loading={isSearching}
          // loaderPosition="right"
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
    </>
  );
};

export default ServicesPage;
