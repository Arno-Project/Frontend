import "dayjs/locale/fa";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

import {
  Button,
  Center,
  Modal,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { Map2, MapPin, Send, UserSearch, X } from "tabler-icons-react";

import { CoreAPI } from "../../api/core";
import { notifyUser } from "../utils";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { showNotification } from "@mantine/notifications";
import { Speciality, User } from "../../models";
import { AccountAPI } from "../../api/accounts";


import { Helmet } from "react-helmet";
import {useAppDispatch} from "../../redux/hooks";
import {setSteps} from "../../redux/intro";
import {ManagerCreateRequestSteps, PolicySteps} from "../../assets/IntroSteps";
const TITLE = "ایجاد سفارش";

const initialLocation = { lat: 35.6857447, lng: 51.3892365 };

const CreateRequestView = () => {
  // TODO fix this duplicate shit
  const [position, setPosition] = useState<any>(initialLocation);
  const [locationModalOpened, setLocationModalOpened] =
    useState<boolean>(false);
  const [requestLocationId, setRequestLocationId] = useState<number>(-1);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  const [customer_param, setCustomerParam] = useState<User | null>(null);

  const markerRef = useRef(null);
  const { state }: any = useLocation();

  const initSpecialities = async () => {
    const spec = await AccountAPI.getInstance().fetchSpecialities();
    setSpecialities(spec);
  };

  const submitRequestForm = useForm({
    initialValues: {
      customer: null,
      requested_speciality: "",
      desired_start_time: new Date(),
      description: "",
    },
    validate: {
      customer: (value) => isNaN(+value!)? "شناسه باید عدد باشد" : null,
      requested_speciality: (value) =>
        value.length > 0 ? null : "این بخش نمی‌تواند خالی باشد",
      description: (value) =>
        value.trim().length > 0 ? null : "این بخش نمی‌تواند خالی باشد",
    },
  });

  useEffect(() => {
    initSpecialities();

    if (!!state && state.hasOwnProperty("customer")) {
      const { customer }: any = state;
      setCustomerParam(customer);
      submitRequestForm.setFieldValue("customer", customer.id);
    }
  }, []);

  const submitLocationForm = useForm({
    initialValues: {
      address: "",
    },
    validate: {
      address: (value) =>
        value.trim().length > 5 ? null : "لطفا آدرس بلندتری وارد کنید",
    },
  });

  const submitForm = async (values: any) => {
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

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/create_request") {
      dispatch(setSteps(ManagerCreateRequestSteps));
    }
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <form onSubmit={submitRequestForm.onSubmit(submitForm)} className="tour-create-request-form">
        <Center>
          <TextInput
              className="tour-create-request-id"
            mt="sm"
            label="شناسه‌ی مشتری"
            description={
              Boolean(customer_param)
                ? "شناسه‌ی مشتری به نام " +
                  customer_param?.firstName +
                  " " +
                  customer_param?.lastName
                : 'می‌توانید مشتری را از صفحه‌ی "مدیریت کاربران" انتخاب کنید.'
            }
            placeholder="id مشتری برای ایجاد سفارش"
            disabled={Boolean(customer_param)}
            required
            {...submitRequestForm.getInputProps("customer")}
          />
        </Center>
        <div style={{ marginTop: "16px" }}>
          <Select
            className="font-reminder tour-create-request-specialty"
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
            className="tour-create-request-date"
          locale="fa"
          placeholder="یک روز را انتخاب کنید"
          label="زمان شروع"
          required
          {...submitRequestForm.getInputProps("desired_start_time")}
        />
        <Center>
          <Button
              className="tour-create-request-address"
            mt="md"
            color="cyan"
            leftIcon={<Map2 size={20} />}
            onClick={() => setLocationModalOpened(true)}
          >
            ثبت آدرس
          </Button>
        </Center>

        <Textarea
            className="tour-create-request-description"
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
          <Button
                className="tour-create-request-submit"
            mt="md"
            variant="gradient"
            gradient={{ from: "cyan", to: "indigo", deg: 105 }}
            leftIcon={<Send size={20} />}
            type="submit"
          >
            ثبت سفارش
          </Button>
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
              // eventHandlers={eventHandlers}
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

export default CreateRequestView;
