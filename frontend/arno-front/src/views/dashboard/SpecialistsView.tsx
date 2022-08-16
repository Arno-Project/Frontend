import { useEffect, useState } from "react";

import { Space, Table, Title } from "@mantine/core";
import { X, Check, Paperclip } from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";
import { User, UserRole } from "../../models";

import { Helmet } from "react-helmet";
import { AccountAPI } from "../../api/accounts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";
import { APIDataToUsers } from "../../models/utils";
import SpecialistsTable from "../../components/SpecialistsTable";
import { SpecialitiesBadges } from "../../models/SpecialityBadges";
const TITLE = "متخصصان";

const PAGE_SIZE = 4;

const SpecialistsView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [users, setUsers] = useState<User[]>([]);

  const getData = async () => {
    const filter = new FieldFilter(
      FieldFilterName.Role,
      UserRole.Specialist,
      FieldFilterType.Exact
    );
    let res = await AccountAPI.getInstance().get([filter]);
    const users = APIDataToUsers(res);
    setUsers(users);
  };

  useEffect(() => {
    getData();
  }, []);

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
              {users.map((user, i) => {
                if (!user.isValidated)
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>
                        <SpecialitiesBadges speciality={user.speciality} />
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
                  );
              })}
            </tbody>
          </Table>
        </>
      )}
      <Title order={3} my="md">
        مشاهده متخصصین برحسب امتیاز
      </Title>

      <SpecialistsTable users={users} button={null}></SpecialistsTable>
    </>
  );
};

export default SpecialistsView;
