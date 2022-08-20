import "dayjs/locale/fa";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

import {
  Button,
  Center,
  Modal,
  Select,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Map2, MapPin, Pencil, Send, UserSearch, X } from "tabler-icons-react";

import { Speciality } from "../../models";
import { AccountAPI } from "../../api/accounts";
import { CreateRequestSteps } from "../../assets/IntroSteps";
import { setSteps } from "../../redux/intro";
import { useAppDispatch } from "../../redux/hooks";
import { CoreAPI } from "../../api/core";
import { notifyUser } from "../utils";

import { Helmet } from "react-helmet";
const TITLE = "درخواست خدمات";

const initialLocation = { lat: 35.6857447, lng: 51.3892365 };

const RequestServiceView = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingRequestId, setEditingRequestId] = useState<number>(-1);

  const [position, setPosition] = useState<any>(initialLocation);
  const [locationModalOpened, setLocationModalOpened] =
    useState<boolean>(false);
  const [requestLocationId, setRequestLocationId] = useState<number>(-1);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  const markerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/request_service") {
      dispatch(setSteps(CreateRequestSteps));
    }
  }, [location.pathname]);

  const { state }: any = useLocation();

  const submitRequestForm = useForm({
    initialValues: {
      requested_speciality: "",
      desired_start_time: null,
      description: "",
    },
    validate: {
      requested_speciality: (value) =>
        value.length > 0 ? null : "این بخش نمی‌تواند خالی باشد",
      description: (value) =>
        value.trim().length > 0 ? null : "این بخش نمی‌تواند خالی باشد",
    },
  });

  const submitLocationForm = useForm({
    initialValues: {
      address: "",
    },
    validate: {
      address: (value) =>
        value.trim().length > 5 ? null : "لطفا آدرس بلندتری وارد کنید",
    },
  });

  useEffect(() => {
    initSpecialities();
    if (!!state && state.hasOwnProperty("request")) {
      const { request: reqParam }: any = state;
      submitRequestForm.setValues({
        requested_speciality: reqParam.requested_speciality.title,
        desired_start_time: reqParam.start_time,
        description: reqParam.description,
      });
      submitLocationForm.setValues({
        address: reqParam.location.address,
      });
      setRequestLocationId(reqParam.location.id);
      setPosition({
        lat: reqParam.location.latitude,
        lng: reqParam.location.longitude,
      });
      setEditingRequestId(reqParam.id);
      setIsEditing(true);
    }
  }, []);

  const initSpecialities = async () => {
    const spec = await AccountAPI.getInstance().fetchSpecialities();
    setSpecialities(spec);
  };

  const submitForm = async (values: any) => {
    values["requested_speciality"] = specialities.find(
      (s) => s.title === values["requested_speciality"]
    )?.id;

    if (isEditing) {
      await updateExistingRequest(values);
    } else {
      await postNewRequest(values);
    }
  };

  const updateExistingRequest = async (values: any) => {
    const res = await CoreAPI.getInstance().editRequest(editingRequestId, {
      ...values,
      location: requestLocationId,
    });

    notifyUser(
      res,
      "ویرایش موفقیت‌آمیز",
      "در حال بازگشت به صفحه‌ی جزئیات درخواست..."
    );

    if (res.success) {
      navigate("/dashboard/request_details/" + editingRequestId);
    }
  };

  const postNewRequest = async (values: any) => {
    values["requested_speciality"] = specialities.find(
      (s) => s.title === values["requested_speciality"]
    )?.id;

    if (!validateForm()) {
      return;
    }
    const res = await CoreAPI.getInstance().submitRequest({
      ...values,
      location: requestLocationId,
    });

    notifyUser(res, "ثبت موفقیت‌آمیز", "درخواست شما با موفقیت ارسال شد.");

    if (res.success) {
      submitRequestForm.reset();
      submitLocationForm.reset();
      setRequestLocationId(-1);
    }
  };

  const validateForm = () => {
    if (requestLocationId === -1) {
      showNotification({
        title: "خطا",
        message: "آدرس ثبت نشده است.",
        color: "red",
        icon: <X size={18} />,
      });
      return false;
    }
    return true;
  };

  const submitLocation = async (values: { address: string }) => {
    const marker: any = markerRef.current;
    const { lat, lng } = marker.getLatLng();
    const location = { latitude: lat, longitude: lng, address: values.address };
    const res = await CoreAPI.getInstance().submitLocation(location);
    notifyUser(res, "ثبت موفقیت‌آمیز", "آدرس این درخواست با موفقیت ثبت شد.");
    if (res.success) {
      const locationId =
        res.data!["location" as keyof object]["id" as keyof object];
      setRequestLocationId(locationId);
      setLocationModalOpened(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      {isEditing ? (
        <Title order={2}>{"ویرایش درخواست شماره " + editingRequestId}</Title>
      ) : (
        <Title order={2}>{TITLE}</Title>
      )}
      <form onSubmit={submitRequestForm.onSubmit(submitForm)}>
        <div style={{ marginTop: "16px" }}>
          <Select
            className="font-reminder tour-speciality-select"
            data={specialities
              .filter((s) => s.parent !== null)
              .map((s) => ({
                label: s.title,
                value: s.title,
                group: s.parent?.title,
              }))}
            icon={<UserSearch size={20} />}
            label="انتخاب تخصص"
            placeholder="تخصص مورد نیاز"
            required
            searchable
            clearable
            {...submitRequestForm.getInputProps("requested_speciality")}
          />
        </div>
        <DatePicker
          className="tour-start-date-select"
          locale="fa"
          placeholder="یک روز را انتخاب کنید"
          label="زمان شروع"
          required
          {...submitRequestForm.getInputProps("desired_start_time")}
        />
        <Center>
          <Button
            className="tour-submit-address-button"
            mt="md"
            color="cyan"
            leftIcon={<Map2 size={20} />}
            onClick={() => setLocationModalOpened(true)}
          >
            ثبت آدرس
          </Button>
        </Center>

        <Textarea
          className="tour-description-textarea"
          mt="sm"
          placeholder="توضیحات"
          label="شرح سفارش"
          description="لطفا شرح کامل درخواست خود را بنویسید."
          autosize
          minRows={4}
          maxRows={6}
          required
          {...submitRequestForm.getInputProps("description")}
        />
        <Center>
          {isEditing ? (
            <Button
              className="tour-submit-address-button"
              mt="md"
              variant="gradient"
              gradient={{ from: "lime", to: "teal", deg: 105 }}
              leftIcon={<Pencil size={20} />}
              type="submit"
            >
              ویرایش سفارش
            </Button>
          ) : (
            <Button
              className="tour-submit-address-button"
              mt="md"
              variant="gradient"
              gradient={{ from: "cyan", to: "indigo", deg: 105 }}
              leftIcon={<Send size={20} />}
              type="submit"
            >
              ثبت سفارش
            </Button>
          )}
        </Center>
      </form>

      <Modal
        opened={locationModalOpened}
        onClose={() => setLocationModalOpened(false)}
        title="تعیین آدرس روی نقشه"
      >
        <form onSubmit={submitLocationForm.onSubmit(submitLocation)}>
          <Textarea
            mt="sm"
            placeholder="تهران، خیابان ..."
            label="آدرس محل"
            description="لطفا آدرس کامل خود را بنویسید."
            autosize
            minRows={2}
            maxRows={4}
            required
            {...submitLocationForm.getInputProps("address")}
          />
          <Title mt="sm" order={5}>
            انتخاب روی نقشه
          </Title>
          <Text size="sm">نشان‌گر را با کمک زوم روی محل مورد نظر بکشید.</Text>
          <MapContainer
            style={{ height: "40vh", width: "100%", borderRadius: "10px" }}
            center={{
              lat: 35.7,
              lng: 51.3,
            }}
            zoom={11}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              draggable
              position={position}
              ref={markerRef}
            ></Marker>
          </MapContainer>
          <Center>
            <Button
              mt="md"
              color="indigo"
              leftIcon={<MapPin size={20} />}
              type="submit"
            >
              ثبت آدرس
            </Button>
          </Center>
        </form>
      </Modal>
    </>
  );
};

export default RequestServiceView;
