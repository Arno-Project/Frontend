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
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";

import { CoreAPI } from "../../api/core";
import { RequestStatus, ServiceSummary } from "../../models";
import { APIDataToServiceSummary } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import { mantine_colors, RequestStatusBadge } from "../../assets/consts";

import { Check, X, Message } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

import { Helmet } from "react-helmet";
import SpecialistsTable from "../../components/SpecialistsTable";
import { SpecialistRow } from "../../components/SpecialistRow";
const TITLE = "جزئیات سفارش";

const RequestDetails = () => {
  const { requestId } = useParams();
  const [requestDetails, setRequestDetails] = useState<ServiceSummary>();
  const [position, setPosition] = useState<[number, number]>([35.7, 51.3]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await CoreAPI.getInstance().getRequestDetails(requestId!);
    if (res.success) {
      const data = APIDataToServiceSummary(res)[0];
      console.log(data);

      setRequestDetails(data);
      if (data.location)
        setPosition([data.location.latitude, data.location.longitude]);
    } else {
      showNotification({
        title: "خطا",
        message: res.error!["error" as keyof object],
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  const acceptOrRejectSpecialist = async (is_accept: boolean) => {
    const res = await CoreAPI.getInstance().acceptOrRejectSpecialist(
      requestDetails!.id,
      is_accept
    );

    if (res.success) {
      const is_accept_string = is_accept ? "پذیرفته" : "رد";
      showNotification({
        title: "عملیات موفقیت‌آمیز",
        message: `متخصص با موفقیت ${is_accept_string} شد.`,
        color: "teal",
        icon: <Check size={18} />,
      });

      getData()
    }
  };

  const navigate = useNavigate();
  const sendMessageToSpecialist = async () => {
    console.log("send msg");
    navigate("/dashboard/chats/" + requestDetails!.specialist!.id);

  };

  let specialistComponent = <></>;

  if (requestDetails) {
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
            <Grid align={"center"}>
              <Grid.Col span={9}>
                <Table>
                  <tbody>
                    <SpecialistRow user={requestDetails.specialist} idx={""} />
                  </tbody>
                </Table>
              </Grid.Col>
              <Grid.Col span={3}>
                <Group>
                  <ActionIcon onClick={() => acceptOrRejectSpecialist(true)}>
                    <Check color="green" size={22} />
                  </ActionIcon>
                  <ActionIcon onClick={() => acceptOrRejectSpecialist(false)}>
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
      specialistComponent = (
        <>
          {specialistComponent}
          <Divider
            size="sm"
            my="xs"
            label="انتخاب متخصص"
            labelPosition="left"
          />
          <SpecialistsTable users={[]}></SpecialistsTable>{" "}
        </>
      );
      /* TODO get specialists matching speciality */
      /* TODO first reject currect*/
    }

    if (requestDetails.status === RequestStatus.In_progress) {
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
            <Grid align={"center"}>
              <Grid.Col span={9}>
                <Table>
                  <tbody>
                    <SpecialistRow user={requestDetails.specialist} idx={""} />
                  </tbody>
                </Table>
              </Grid.Col>
              <Grid.Col span={3}>
                <Group>
                  <ActionIcon onClick={() => sendMessageToSpecialist()}>
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
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{"سفارش شماره " + requestId}</Title>

      <Divider size="sm" my="xs" label="مشخصات سفارش" labelPosition="left" />
      {!!requestDetails && (
        <>
          <div style={{ display: "flex" }}>
            <Text weight={500} component="span">
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
            <Text weight={500} component="span">
              تاریخ شروع:
            </Text>
            <Space w="lg" />
            <Text component="span">
              {formatDateString(requestDetails.start_time)}
            </Text>
            {/* {!!requestDetails && new Date(Date.parse(requestDetails?.start_time)).toLocaleString('fa-IR')}; */}
          </div>
          <div style={{ display: "flex" }}>
            <Text weight={500} component="span">
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
            <Text weight={500} component="span">
              توضیحات:
            </Text>
            <Space w="lg" />

            <Text component="span">{requestDetails.description}</Text>
          </div>
          <div style={{ display: "flex" }}>
            <Text weight={500} component="span">
              آدرس:
            </Text>
            <Space w="lg" />

            <Text component="span">{requestDetails.location?.address}</Text>
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
        </>
      )}
      {specialistComponent}
    </>
  );
};

export default RequestDetails;
