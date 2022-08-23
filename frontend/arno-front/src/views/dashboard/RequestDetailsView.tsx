import {
  Divider,
  Title,
  Text,
  Badge,
  Space,
  Table,
  Tooltip,
  Group,
  Grid,
  ActionIcon,
  Button,
  Modal,
  Stack,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Check,
  X,
  Message,
  Pencil,
  ExternalLink,
  Eye,
} from "tabler-icons-react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";

import { CoreAPI } from "../../api/core";
import {
  RequestFeedback,
  RequestStatus,
  ServiceSummary,
  User,
  UserRole,
} from "../../models";
import {
  APIDataToRequestFeedbacks,
  APIDataToServiceSummary,
  APIDataToUsers,
  ObjectToRequestFeedback,
} from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import {
  mantine_colors,
  RequestStatusBadge,
  RoleDictColor,
} from "../../assets/consts";
import { SpecialistRow } from "../../components/SpecialistRow";
import { FieldFilter, FieldFilterName, FieldFilterType } from "../../api/base";
import { AccountAPI } from "../../api/accounts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SpecialistsTable from "../../components/SpecialistsTable";
import RequestFeedbackModal from "../../components/RequestFeedbackModal";

import { Helmet } from "react-helmet";
import { setSteps } from "../../redux/intro";
import {
  RequestDetailsAcceptCustomerRequestFromSpecialistStep,
  RequestDetailsAcceptRejectSpecialistDividerStep,
  RequestDetailsAcceptRequestFromSpecialistStep,
  RequestDetailsAcceptSpecialistStep,
  RequestDetailsChatToCustomerStep,
  RequestDetailsChooseSpecialistButtonStep,
  RequestDetailsCompleteRequestStep,
  RequestDetailsEditRequestButtonStep,
  RequestDetailsManagerViewFeedbackStep,
  RequestDetailsRejectCustomerRequestFromSpecialistStep,
  RequestDetailsRejectSpecialistStep,
  RequestDetailsSelectedSpecialistStep,
  RequestDetailsShowSpecialistButtonStep,
  RequestDetailsStateSteps,
  RequestDetailsSubmitFeedbackStep,
  SearchButtonClearStep,
  SearchButtonStep,
  SearchNameStep,
  SearchSortStep,
} from "../../assets/IntroSteps";
import FeedbacksListComponent from "../../components/FeedbacksListComponent";
import { FeedbackAPI } from "../../api/feedback";
import { notifyUser } from "../utils";

const TITLE = "جزئیات سفارش";

const RequestDetailsView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { requestId } = useParams();
  const [requestDetails, setRequestDetails] = useState<ServiceSummary>();
  const [hasRequestDetails, setHasRequestDetails] = useState(0);
  const [position, setPosition] = useState<[number, number]>([35.7, 51.3]);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isFeedbacksListModalOpen, setIsFeedbacksListModalOpen] = useState<
    boolean[]
  >([false]);

  const [specs, setSpecs] = useState<User[]>([]);
  const [showSpecialists, setShowSpecialists] = useState(false);

  const [customerFeedback, setCustomerFeedback] = useState<RequestFeedback>();
  const [specFeedback, setSpecFeedback] = useState<RequestFeedback>();

  const dispatch = useAppDispatch();
  const location = useLocation();

  const getData = async () => {
    let res = await CoreAPI.getInstance().getRequestDetails(requestId!);
    if (res.success) {
      const data = APIDataToServiceSummary(res)[0];
      console.log(data);

      setRequestDetails(data);
      setHasRequestDetails(1);
      if (data.location)
        setPosition([data.location.latitude, data.location.longitude]);

      const filter = new FieldFilter(
        FieldFilterName.RequestID,
        requestId,
        FieldFilterType.Exact
      );
      res = await FeedbackAPI.getInstance().get([
        filter,
        new FieldFilter(
          FieldFilterName.UserID,
          data.customer.id,
          FieldFilterType.Exact
        ),
      ]);
      if (res.success) {
        const f1 = APIDataToRequestFeedbacks(res);
        if (f1.length > 0) setCustomerFeedback(f1.at(0));
        console.info("F1", f1);
      }
      if (data.specialist) {
        res = await FeedbackAPI.getInstance().get([
          filter,
          new FieldFilter(
            FieldFilterName.UserID,
            data.specialist.id,
            FieldFilterType.Exact
          ),
        ]);
        if (res.success) {
          const f2 = APIDataToRequestFeedbacks(res);
          console.info("F2", f2);
          if (f2.length > 0) setSpecFeedback(f2.at(0));
        }
      }
    } else {
      showNotification({
        title: "خطا",
        message: res.error!["error" as keyof object],
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  const getSpecialists = async (filters: FieldFilter[]) => {
    if (!requestDetails) {
      return;
    }
    const filter1 = new FieldFilter(
      FieldFilterName.Role,
      UserRole.Specialist,
      FieldFilterType.Exact
    );
    const filter2 = new FieldFilter(
      FieldFilterName.Speciality,
      `${requestDetails.requested_speciality.id}`,
      FieldFilterType.Exact
    );
    let res = await AccountAPI.getInstance().get([
      ...filters,
      filter1,
      filter2,
    ]);
    if (res.success) {
      const users = APIDataToUsers(res);
      setSpecs(users);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const acceptOrRejectCustomerRequest = async (is_accept: boolean) => {
    const res = await CoreAPI.getInstance().acceptOrRejectCustomerRequest(
      requestDetails!.id,
      is_accept
    );

    const is_accept_string = is_accept ? "پذیرفته" : "رد";

    notifyUser(
      res,
      "عملیات موفقیت‌آمیز",
      `متخصص با موفقیت ${is_accept_string} شد.`
    );
    if (res.success) {
      getData();
    }
  };

  const acceptOrRejectSpecialist = async (is_accept: boolean) => {
    const res = await CoreAPI.getInstance().acceptOrRejectSpecialist(
      requestDetails!.id,
      is_accept
    );

    const is_accept_string = is_accept ? "پذیرفته" : "رد";

    notifyUser(
      res,
      "عملیات موفقیت‌آمیز",
      `متخصص با موفقیت ${is_accept_string} شد.`
    );

    if (res.success) {
      getData();
    }
  };

  const chooseSpecialist = async (id: number) => {
    console.log("choose", id);
    const res = await CoreAPI.getInstance().chooseSpecialist(
      requestDetails!.id,
      id
    );

    if (res.success) {
      showNotification({
        title: "عملیات موفقیت‌آمیز",
        message: `متخصص با موفقیت انتخاب شد.`,
        color: "teal",
        icon: <Check size={18} />,
      });

      getData();
    }
  };

  const selectRequest = async () => {
    const res = await CoreAPI.getInstance().selectRequestBySpecialist(
      requestDetails!.id
    );

    notifyUser(res, "عملیات موفقیت‌آمیز", `درخواست با موفقیت پذیرفته شد.`);
    if (res.success) {
      getData();
    }
  };

  const endRequest = async () => {
    const res = await CoreAPI.getInstance().finishRequest(requestDetails!.id);

    if (res.success) {
      showNotification({
        title: "عملیات موفقیت‌آمیز",
        message: `درخواست با موفقیت به اتمام رسید.`,
        color: "teal",
        icon: <Check size={18} />,
      });

      getData();
    }
  };

  const navigate = useNavigate();
  const sendMessage = async (id: number) => {
    navigate("/dashboard/chats/" + id);
  };

  useEffect(() => {
    let steps = [];
    if (/dashboard\/request_details\/\d+/g.test(location.pathname)) {
      steps.push(...RequestDetailsStateSteps);

      if (requestDetails) {
        if (user!.role === UserRole.Customer) {
          if (
            requestDetails.status === RequestStatus.In_progress ||
            requestDetails.status === RequestStatus.WaitForSpecialist ||
            requestDetails.status === RequestStatus.Done
          ) {
            steps.push(RequestDetailsSelectedSpecialistStep);
          }
          if (
            requestDetails.status === RequestStatus.Pending ||
            requestDetails.status === RequestStatus.WaitForCustomer
          ) {
            if (!showSpecialists) {
              steps.push(RequestDetailsShowSpecialistButtonStep);
            } else {
              steps.push(
                ...[
                  SearchNameStep,
                  SearchSortStep,
                  SearchButtonStep,
                  SearchButtonClearStep,
                ]
              );
              if (specs) {
                if (specs.length > 0) {
                  steps.push(RequestDetailsChooseSpecialistButtonStep);
                }
              }
            }
          }
          if (requestDetails.status === RequestStatus.WaitForCustomer) {
            steps.push(
              ...[
                RequestDetailsAcceptRejectSpecialistDividerStep,
                RequestDetailsAcceptSpecialistStep,
                RequestDetailsRejectSpecialistStep,
              ]
            );
          }
          if (requestDetails.status === RequestStatus.Done) {
            steps.push(RequestDetailsSubmitFeedbackStep);
          }
          if (
            [RequestStatus.Pending, RequestStatus.WaitForSpecialist].includes(
              requestDetails!.status
            )
          ) {
            steps.push(RequestDetailsEditRequestButtonStep);
          }
        }
        if (user!.role === UserRole.Specialist) {
          if (requestDetails.status === RequestStatus.Pending) {
            steps.push(RequestDetailsAcceptRequestFromSpecialistStep);
          }
          if (
            requestDetails.status === RequestStatus.In_progress &&
            user!.id === requestDetails.specialist?.id
          ) {
            steps.push(RequestDetailsCompleteRequestStep);
          }
          if (requestDetails.status === RequestStatus.Done) {
            steps.push(RequestDetailsSubmitFeedbackStep);
          }
          if (
            requestDetails.status === RequestStatus.WaitForSpecialist &&
            user!.id === requestDetails.specialist?.id
          ) {
            steps.push(
              ...[
                RequestDetailsAcceptCustomerRequestFromSpecialistStep,
                RequestDetailsRejectCustomerRequestFromSpecialistStep,
              ]
            );
          }
          steps.push(RequestDetailsChatToCustomerStep);
        }

        if (
          user!.role === UserRole.CompanyManager ||
          user!.role === UserRole.TechnicalManager
        ) {
          if (
            [RequestStatus.Pending, RequestStatus.WaitForSpecialist].includes(
              requestDetails!.status
            )
          ) {
            steps.push(RequestDetailsEditRequestButtonStep);
          }
          if (
            requestDetails.status === RequestStatus.In_progress ||
            requestDetails.status === RequestStatus.WaitForSpecialist ||
            requestDetails.status === RequestStatus.Done
          ) {
            steps.push(RequestDetailsSelectedSpecialistStep);
          }

          if (requestDetails.status === RequestStatus.Done) {
            steps.push(RequestDetailsManagerViewFeedbackStep);
          }
        }
      }
      dispatch(setSteps(steps));
    }
  }, [
    location.pathname,
    hasRequestDetails,
    showSpecialists,
    requestDetails,
    specs,
  ]);

  let specialistComponent = <></>;

  if (requestDetails) {
    if (user!.role === UserRole.Specialist) {
      if (
        requestDetails.status === RequestStatus.WaitForSpecialist &&
        user!.id === requestDetails.specialist?.id
      ) {
        specialistComponent = (
          <>
            {specialistComponent}
            <Divider
              size="sm"
              my="xs"
              label="پذیرش/رد درخواست"
              labelPosition="left"
            />
            {requestDetails?.specialist && (
              <Group>
                <Button
                  className="tour-request-details-accept-customer-request-from-specialist"
                  color="blue"
                  onClick={() => {
                    acceptOrRejectCustomerRequest(true);
                  }}
                  leftIcon={<Check size={20} />}
                >
                  قبول درخواست مشتری
                </Button>
                <Button
                  className="tour-request-details-reject-customer-request-from-specialist"
                  color="red"
                  onClick={() => {
                    acceptOrRejectCustomerRequest(false);
                  }}
                  leftIcon={<X size={22} />}
                >
                  رد درخواست مشتری
                </Button>
              </Group>
            )}
          </>
        );
      }

      if (requestDetails.status === RequestStatus.Pending) {
        specialistComponent = (
          <>
            {specialistComponent}
            <Divider
              size="sm"
              my="xs"
              label="پذیرش/رد درخواست"
              labelPosition="left"
            />
            <Group>
              <Button
                className="tour-request-details-accept-from-specialist-button"
                color="blue"
                onClick={() => {
                  selectRequest();
                }}
                leftIcon={<Check size={20} />}
              >
                اعلام آمادگی برای درخواست
              </Button>
            </Group>
          </>
        );
      }

      if (
        requestDetails.status === RequestStatus.In_progress &&
        user!.id === requestDetails.specialist?.id
      ) {
        specialistComponent = (
          <>
            {specialistComponent}
            <Divider
              size="sm"
              my="xs"
              label="وضعیت درخواست"
              labelPosition="left"
            />
            {requestDetails?.specialist && (
              <Group>
                <Button
                  className="tour-request-details-complete-request-button"
                  color="green"
                  onClick={() => {
                    endRequest();
                  }}
                  leftIcon={<Check size={20} />}
                >
                  اتمام درخواست
                </Button>
              </Group>
            )}
          </>
        );
      }

      specialistComponent = (
        <>
          {specialistComponent}
          <Divider
            size="sm"
            my="xs"
            label="ارتباط با مشتری"
            labelPosition="left"
          />
          <Group>
            <Button
              className="tour-request-details-send-message-to-customer-button"
              color="yellow"
              onClick={() => {
                sendMessage(requestDetails.customer.id);
              }}
              leftIcon={<Message size={20} />}
            >
              ارسال پیام به مشتری
            </Button>
          </Group>
        </>
      );
    }

    if (user!.role === UserRole.Customer) {
      if (requestDetails.status === RequestStatus.WaitForCustomer) {
        specialistComponent = (
          <>
            {specialistComponent}
            <Divider
              size="sm"
              my="xs"
              label="پذیرش/رد متخصص"
              labelPosition="left"
            />
            {requestDetails?.specialist && (
              <Grid
                align={"center"}
                className="tour-request-details-accept-or-reject-specialist"
              >
                <Grid.Col span={9}>
                  <Table>
                    <tbody>
                      <SpecialistRow
                        user={requestDetails.specialist}
                        idx={""}
                        button={null}
                      />
                    </tbody>
                  </Table>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Group>
                    <ActionIcon
                      className="tour-request-details-accept-specialist"
                      onClick={() => acceptOrRejectSpecialist(true)}
                    >
                      <Check color="green" size={22} />
                    </ActionIcon>
                    <ActionIcon
                      className="tour-request-details-reject-specialist"
                      onClick={() => acceptOrRejectSpecialist(false)}
                    >
                      <X color="red" size={22} />
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>
            )}
          </>
        );
      }

      if (
        requestDetails.status === RequestStatus.Pending ||
        requestDetails.status === RequestStatus.WaitForCustomer
      ) {
        const button = {
          label: "انتخاب متخصص",
          action: chooseSpecialist,
          className: "tour-choose-specialist-button",
        };
        specialistComponent = (
          <>
            {specialistComponent}
            <Divider
              size="sm"
              my="xs"
              label="انتخاب متخصص"
              labelPosition="left"
            />

            {showSpecialists ? (
              <SpecialistsTable
                users={specs}
                button={button}
                search={{
                  getUsers: getSpecialists,
                  searchFields: [FieldFilterName.Name, FieldFilterName.Sort],
                }}
              ></SpecialistsTable>
            ) : (
              <Button
                className="tour-show-specialist-button"
                color="blue"
                onClick={() => {
                  getSpecialists([]);
                  setShowSpecialists(true);
                }}
              >
                نمایش متخصصان
              </Button>
            )}
          </>
        );
      }

      if (
        requestDetails.status === RequestStatus.In_progress ||
        requestDetails.status === RequestStatus.WaitForSpecialist ||
        requestDetails.status === RequestStatus.Done
      ) {
        specialistComponent = (
          <>
            {specialistComponent}
            <Divider
              size="sm"
              my="xs"
              label="متخصص انتخاب شده"
              labelPosition="left"
            />
            {requestDetails?.specialist && (
              <Grid
                align={"center"}
                className="tour-request-details-selected-specialist"
              >
                <Grid.Col span={9}>
                  <Table>
                    <tbody>
                      <SpecialistRow
                        user={requestDetails.specialist}
                        idx={""}
                        button={null}
                      />
                    </tbody>
                  </Table>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Group>
                    <ActionIcon
                      onClick={() =>
                        sendMessage(requestDetails!.specialist!.id)
                      }
                    >
                      <Message color={"#40bfa3"} size={22} />
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>
            )}
          </>
        );
      }
    }
    if (
      user!.role === UserRole.Customer ||
      user!.role === UserRole.Specialist
    ) {
      if (requestDetails.status === RequestStatus.Done) {
        specialistComponent = (
          <>
            {specialistComponent}
            <Divider size="sm" my="xs" label="بازخورد" labelPosition="left" />
            <Group>
              <Button
                className="tour-request-details-submit-feedback"
                color="pink"
                onClick={() => {
                  setIsFeedbackModalOpen(true);
                }}
                leftIcon={<Pencil size={20} />}
              >
                ثبت بازخورد
              </Button>
            </Group>
          </>
        );
      }
    }

    if (
      user!.role === UserRole.CompanyManager ||
      user!.role === UserRole.TechnicalManager
    ) {
      if (
        requestDetails.status === RequestStatus.In_progress ||
        requestDetails.status === RequestStatus.WaitForSpecialist ||
        requestDetails.status === RequestStatus.Done
      ) {
        specialistComponent = (
          <>
            {specialistComponent}
            <Divider
              size="sm"
              my="xs"
              label="متخصص انتخاب شده"
              labelPosition="left"
            />
            {requestDetails?.specialist && (
              <Grid
                align={"center"}
                className="tour-request-details-selected-specialist"
              >
                <Grid.Col span={12}>
                  <Table>
                    <tbody>
                      <SpecialistRow
                        user={requestDetails.specialist}
                        idx={""}
                        button={null}
                      />
                    </tbody>
                  </Table>
                </Grid.Col>
              </Grid>
            )}
          </>
        );
      }
      if (requestDetails.status === RequestStatus.Done) {
        specialistComponent = (
          <>
            {specialistComponent}
            <div className="tour-request-details-view-feedback">
              <Divider size="sm" my="xs" label="بازخورد" labelPosition="left" />
              <Group>
                {customerFeedback && (
                  <>
                    <Button
                      color={RoleDictColor[UserRole.Customer]}
                      onClick={() => {
                        setIsFeedbacksListModalOpen([true, false]);
                      }}
                      leftIcon={<Eye size={20} />}
                    >
                      مشاهده بازخورد مشتری
                    </Button>

                    <Modal
                      centered
                      opened={isFeedbacksListModalOpen[0]}
                      onClose={() =>
                        setIsFeedbacksListModalOpen([false, false])
                      }
                      title="بازخورد"
                      overlayOpacity={0.55}
                      overlayBlur={3}
                      size="80%"
                      style={{ zIndex: 1000 }}
                    >
                      <FeedbacksListComponent
                        user={requestDetails.customer}
                        feedbacks={[customerFeedback]}
                      />
                    </Modal>
                  </>
                )}

                {specFeedback && (
                  <>
                    <Button
                      color={RoleDictColor[UserRole.Specialist]}
                      onClick={() => {
                        setIsFeedbacksListModalOpen([false, true]);
                      }}
                      leftIcon={<Eye size={20} />}
                    >
                      مشاهده بازخورد متخصص
                    </Button>

                    <Modal
                      centered
                      opened={isFeedbacksListModalOpen[1]}
                      onClose={() =>
                        setIsFeedbacksListModalOpen([false, false])
                      }
                      title="بازخورد"
                      overlayOpacity={0.55}
                      overlayBlur={3}
                      size="80%"
                      style={{ zIndex: 1000 }}
                    >
                      <FeedbacksListComponent
                        user={requestDetails.specialist}
                        feedbacks={[specFeedback]}
                      />
                    </Modal>
                  </>
                )}
              </Group>
            </div>
          </>
        );
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{"سفارش شماره " + requestId}</Title>

      <Divider size="sm" my="xs" label="مشخصات سفارش" labelPosition="left" />
      {!!requestDetails && (
        <div className="tour-request-details-info">
          <Stack>
            <div style={{ display: "flex" }}>
              <Text weight={500} span>
                تخصص مورد نیاز:
              </Text>
              <Space w="lg" />
              <Tooltip
                label={requestDetails.requested_speciality.description}
                color="gray"
                transition="skew-down"
                transitionDuration={300}
                withArrow
              >
                <Badge
                  key={requestDetails.requested_speciality.id}
                  color={
                    mantine_colors[
                      requestDetails.requested_speciality.id %
                        mantine_colors.length
                    ]
                  }
                  variant="filled"
                >
                  {requestDetails.requested_speciality.title}
                </Badge>
              </Tooltip>
            </div>
            <div style={{ display: "flex" }}>
              <Text weight={500} span>
                تاریخ شروع:
              </Text>
              <Space w="lg" />
              <Text span>{formatDateString(requestDetails.start_time)}</Text>
              {/* {!!requestDetails && new Date(Date.parse(requestDetails?.start_time)).toLocaleString('fa-IR')}; */}
            </div>
            <div style={{ display: "flex" }}>
              <Text weight={500} span>
                وضعیت:
              </Text>
              <Space w="lg" />
              <Badge
                color={RequestStatusBadge[requestDetails.status].color}
                variant="filled"
              >
                {RequestStatusBadge[requestDetails.status].message}
              </Badge>
            </div>
            <div style={{ display: "flex" }}>
              <Text weight={500} span>
                توضیحات:
              </Text>
              <Space w="lg" />

              <Text span>{requestDetails.description}</Text>
            </div>
            <div style={{ display: "flex" }}>
              <Text weight={500} span>
                آدرس:
              </Text>
              <Space w="lg" />

              <Text span>{requestDetails.location?.address}</Text>
            </div>
            <MapContainer
              style={{ height: "40vh", width: "40%", borderRadius: "10px" }}
              center={position as LatLngTuple}
              zoom={15}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position as LatLngTuple}></Marker>
            </MapContainer>
          </Stack>
        </div>
      )}
      {!!requestDetails &&
        [RequestStatus.Pending, RequestStatus.WaitForSpecialist].includes(
          requestDetails!.status
        ) &&
        user?.role !== UserRole.Specialist && (
          <>
            <Divider
              size="xs"
              my="xs"
              label="ویرایش درخواست"
              labelPosition="left"
            />
            <Button
              className="tour-request-details-edit-button"
              color="lime"
              onClick={() => {
                navigate("/dashboard/request_service/", {
                  state: { request: requestDetails },
                });
              }}
              leftIcon={<ExternalLink size={20} />}
            >
              ویرایش
            </Button>
          </>
        )}
      {specialistComponent}
      <RequestFeedbackModal
        role={user!.role}
        isOpen={isFeedbackModalOpen}
        changeIsOpen={setIsFeedbackModalOpen}
        requestID={requestId!}
      />
    </>
  );
};

export default RequestDetailsView;
