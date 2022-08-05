import {
  Divider,
  Title,
  Text,
  Badge,
  Space,
  Table,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { CoreAPI } from "../../api/core";
import { ServiceSummary } from "../../models";
import { APIDataToServiceSummary } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import { mantine_colors, RequestStatusBadge } from "../../assets/consts";

import { Check, X } from "tabler-icons-react";
import { Helmet } from "react-helmet";
import { LatLngTuple } from "leaflet";
const TITLE = "جزئیات سفارش";

const RequestDetails = () => {
  let position = [35.7, 51.3];
  const { requestId } = useParams();
  const [requestDetails, setRequestDetails] = useState<ServiceSummary>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await CoreAPI.getInstance().getRequestDetails(requestId!);
    if (res.success) {
      setRequestDetails(APIDataToServiceSummary(res)[0]);
      position = [requestDetails!.location.lat, requestDetails!.location.lng];
    } else {
    }
  };

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

            <Text component="span">{requestDetails.location.address}</Text>
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
            <Marker
              position={position as LatLngTuple}
            ></Marker>
          </MapContainer>
        </>
      )}
      <Divider size="sm" my="xs" label="متخصص" labelPosition="left" />
      <Title order={4}>ارسال سفارش به متخصص</Title>
      <Title order={4}>پذیرش/رد متخصص</Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>نام متخصص</th>
            <th>نام خدمت</th>
            <th>تخصص(ها)</th>
            <th>تأیید/رد</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>امیرمهدی نامجو</td>
            <td>نصب ویندوز</td>
            <td>
              <Badge color="indigo" variant="filled">
                نرم‌افزار
              </Badge>
              <Badge color="cyan" variant="filled">
                سخت‌افزار
              </Badge>
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
  );
};

export default RequestDetails;
