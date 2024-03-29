import { useEffect, useState } from "react";

import { Space, Table, Title } from "@mantine/core";
import { X, Check, Paperclip } from "tabler-icons-react";

import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import { User, UserRole } from "../../models";

import { Helmet } from "react-helmet";
import { AccountAPI } from "../../api/accounts";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";
import { APIDataToUsers } from "../../models/utils";
import SpecialistsTable from "../../components/SpecialistsTable";
import { SpecialitiesBadges } from "../../models/SpecialityBadges";
import {useLocation} from "react-router-dom";
import {setSteps} from "../../redux/intro";
import {SpecialistListSteps} from "../../assets/IntroSteps";
const TITLE = "متخصصان";

const PAGE_SIZE = 5;

const SpecialistsView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [users, setUsers] = useState<User[]>([]);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/specialists") {
      dispatch(setSteps(SpecialistListSteps));
    }
  }, [location.pathname]);


  const getData = async (filters: FieldFilter[]) => {
    const filter1 = new FieldFilter(
      FieldFilterName.Role,
      UserRole.Specialist,
      FieldFilterType.Exact
    );
    const filter2 = new FieldFilter(
      FieldFilterName.Sort,
      "-score",
      FieldFilterType.Exact
    );
    let res = await AccountAPI.getInstance().get([
      filter2,
      ...filters,
      filter1,
    ]);
    const users = APIDataToUsers(res);
    setUsers(users);
  };

  useEffect(() => {
    getData([]);
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

      <SpecialistsTable
        users={users}
        button={null}
        search={{
          getUsers: getData,
          searchFields: [FieldFilterName.Name, FieldFilterName.Sort, FieldFilterName.Speciality],
        }}
      ></SpecialistsTable>
    </>
  );
};

export default SpecialistsView;
