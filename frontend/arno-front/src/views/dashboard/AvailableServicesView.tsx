import {
  Badge,
  Button,
  Center,
  Pagination,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";

import { Helmet } from "react-helmet";
import { ListSearch, Search, FileText } from "tabler-icons-react";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";
const TITLE = "خدمات";

const AvailableServicesView = () => {
  const PAGE_SIZE = 5;

  const fetchResults = () => {
    setSearching(true);
    console.log(inputValue);
    console.log(selectedValues);
    // TODO fetch items
    setSearching(false);
  };

  const [isSearching, setSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [activePage, setPage] = useState(1);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <div className="search-criteria">
        <TextInput
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          icon={<Search size={20} />}
          label="شرح خدمت"
          placeholder="خدمت"
        />

        <SpecialityMultiSelect setter={setSelectedValues} />
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
      <Table striped highlightOnHover my="sm">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>عنوان خدمت</th>
            <th>تخصص(های) مرتبط</th>
            <th>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>حمل بار</td>
            <td>
              <Badge color="gray" variant="filled">
                زور
              </Badge>
            </td>
            <td>
              <FileText size={20} />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>نصب ویندوز</td>
            <td>
              <Badge color="violet" variant="filled">
                شبکه
              </Badge>
              <Badge color="grape" variant="filled">
                نرم‌افزار
              </Badge>
            </td>
            <td>
              <FileText size={20} />
            </td>
          </tr>
        </tbody>
      </Table>
      <Center mt="sm">
        <Pagination
          total={2} // {Math.ceil(data.length / PAGE_SIZE)}
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

export default AvailableServicesView;
