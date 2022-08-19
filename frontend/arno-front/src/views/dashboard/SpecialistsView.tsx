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
    const filter1 = new FieldFilter(
      FieldFilterName.Role,
      UserRole.Specialist,
      FieldFilterType.Exact
    );
    const filter2 = new FieldFilter(
      FieldFilterName.Sort,
      '-score',
      FieldFilterType.Exact
    );
    let res = await AccountAPI.getInstance().get([filter1, filter2]);
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

      <Title order={3} my="md">
        مشاهده متخصصین برحسب امتیاز
      </Title>

      <SpecialistsTable users={users} button={null}></SpecialistsTable>
    </>
  );
};

export default SpecialistsView;
