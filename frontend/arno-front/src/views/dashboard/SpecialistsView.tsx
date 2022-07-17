import { useEffect, useState } from "react";

import { Badge, Button, Center, Pagination, Space, Table, TextInput, Title } from "@mantine/core";
import { X, Check, ListSearch, Search, Paperclip } from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";
import { User, UserGeneralRole, UserRole } from "../../models";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";

import { Helmet } from "react-helmet";
import { AccountAPI } from "../../api/accounts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";
import { APIDataToUsers } from "../../models/utils";
import { mantine_colors } from "../../assets/consts";
const TITLE = "متخصصان";

const SpecialistsView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const PAGE_SIZE = 5;
  const [activePage, setPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const getData = async () => {
    const filter = new FieldFilter(FieldFilterName.Role, UserRole.Specialist, FieldFilterType.Exact)
    let res = await AccountAPI.getInstance().get([filter]);
    console.log("RES", res)
    const users = APIDataToUsers(res)
    setUsers(users)
    console.log("SPECIALIST", users)
  };
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      {[UserRole.CompanyManager, UserRole.TechnicalManager].includes(
        user!.role
      ) && (
        <>
          <Title order={3} my="md">
            تأیید متخصصین
          </Title>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام متخصص</th>
                <th>تخصص(ها)</th>
                <th>مدارک اعتبارسنجی</th>
                <th>تأیید/رد</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>امیرمهدی نامجو</td>
                <td>
                  <Badge color="indigo" variant="filled">
                    نرم‌افزار
                  </Badge>
                  <Badge color="cyan" variant="filled">
                    سخت‌افزار
                  </Badge>
                </td>
                <td>
                  <Paperclip size={24} />
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    <Check color="green" size={22} />
                    <Space w="lg" />
                    <X color="red" size={22} />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
      <Title order={3} my="md">
        مشاهده متخصصین برحسب امتیاز
      </Title>

      {user?.role === UserRole.Customer && (
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
        </>
      )}

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
          {users.map((user, i) => {
            return (
              <tr key={user.id}>
              <td>{i+1}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>
                {user.speciality.map(s => {
                  return (
                  <Badge key ={s.id} color={mantine_colors[s.id % mantine_colors.length]} variant="filled">
                  {s.title}
                </Badge>
                  )
                })}
                
              </td>
              <td>{user.score}</td>
            </tr>
            )
          })}
          <tr>
            <td>1</td>
            <td>مصطفی</td>
            <td>
              <Badge color="id" variant="filled">
                سخت‌افزار
              </Badge>
            </td>
            <td>4.85</td>
          </tr>
          <tr>
            <td>2</td>
            <td>امیرمهدی</td>
            <td>
              <Badge color="indigo" variant="filled">
                نرم‌افزار
              </Badge>
              <Badge color="orange" variant="filled">
                شبکه
              </Badge>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>3</td>
            <td>علیرضا</td>
            <td>
              <Badge color="indigo" variant="filled">
                نرم‌افزار
              </Badge>
              <Badge color="pink" variant="filled">
                فرانت‌اند
              </Badge>
            </td>
            <td>2.5</td>
          </tr>
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

export default SpecialistsView;
