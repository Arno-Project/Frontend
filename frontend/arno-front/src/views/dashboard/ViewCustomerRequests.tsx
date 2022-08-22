import {
  Table,
  Title,
  UnstyledButton,
  Alert,
  Space,
  ActionIcon,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ExternalLink, X, AlertCircle } from "tabler-icons-react";

import { CoreAPI } from "../../api/core";
import { RequestStatus, ServiceSummary } from "../../models";
import { APIDataToServiceSummary } from "../../models/utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SpecialitiesBadges } from "../../models/SpecialityBadges";
import { setSteps } from "../../redux/intro";
import { CustomerRequestStep } from "../../assets/IntroSteps";
import { FieldFilter, FieldFilterName } from "../../api/base";
import RequestSearchComponent from "../../components/RequestSearchComponent";

import { Helmet } from "react-helmet";
const TITLE = "درخواست‌های مشتریان";

const ViewCustomerRequests = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const [rows, setRows] = useState<ServiceSummary[]>([]);

  const getData = async (filters: FieldFilter[]) => {
    const res = await CoreAPI.getInstance().searchRequests(filters);

    console.info("customers request", res);

    if (res.success) {
      const data = APIDataToServiceSummary(res);
      setRows(data);
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت درخواست‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/dashboard/customer_requests") {
      dispatch(setSteps(CustomerRequestStep));
    }
  }, [location.pathname]);

  useEffect(() => {
    getData([]);
  }, []);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      {user?.isValidated === false ? (
        <>
          <Space h="md" />
          <Alert icon={<AlertCircle size={16} />} color="yellow">
            شما در حال حاضر امکان مشاهده‌ی این قسمت را ندارید. پس از تایید شدن
            توسط مدیر می‌توانید درخواست‌های مشتریان را مشاهده و آن‌ها انتخاب
            کنید.
          </Alert>
        </>
      ) : (
        <>
          <RequestSearchComponent
            getData={getData}
            searchFields={[
              FieldFilterName.Customer,
              FieldFilterName.DateRange,
              FieldFilterName.Sort,
            ]}
            includeQuickFilters={false}
          />
          <Table
            striped
            verticalSpacing="xs"
            highlightOnHover
            className="tour-customer-request-table"
          >
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام مشتری</th>
                <th>تخصص مورد نظر</th>
                <th>توضیحات</th>
                <th>مشاهده جزئیات</th>
              </tr>
            </thead>
            <tbody>
              {rows
                .filter((row) => row.status === RequestStatus.Pending)
                .map((row, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{row.customerName}</td>
                      <td>
                        {!!row.requested_speciality ? (
                          <SpecialitiesBadges
                            speciality={[row.requested_speciality]}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{!!row.description ? row.description : "-"}</td>
                      <td>
                        <ActionIcon
                          onClick={() =>
                            navigate(`/dashboard/request_details/${row.id}`)
                          }
                        >
                          <ExternalLink color="blue" size={22} />
                        </ActionIcon>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ViewCustomerRequests;
