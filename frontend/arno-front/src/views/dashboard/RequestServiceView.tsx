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
import { useForm } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { Map2, MapPin, Send, UserSearch, X } from "tabler-icons-react";

import { CoreAPI } from "../../api/core";
import { Specialities, SpecialitiesId } from "../../assets/consts";
import { notifyUser } from "../utils";

import { useMemo, useRef, useState } from "react";

import { Helmet } from "react-helmet";
import { showNotification } from "@mantine/notifications";
const TITLE = "درخواست خدمات";

const initialLocation = {lat: 35.6857447, lng: 51.3892365};

const RequestServiceView = () => {
  const [position, setPosition] = useState<any>(initialLocation);
  const [locationModalOpened, setLocationModalOpened] =
    useState<boolean>(false);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          // setPosition({lat:marker.getLatLng().lat, lng:marker.getLatLng().lng});
        }
      },
    }),
    []
  );

  const submitRequestForm = useForm({
    initialValues: {
      requested_speciality: "",
      desired_start_time: new Date(),
      description: "",
    },
    validationRules: {
      requested_speciality: (value) => value.trim().length > 0,
      description: (value) => value.trim().length > 0,
    },
    errorMessages: {
      requested_speciality: "این بخش نمی‌تواند خالی باشد",
      desired_start_time: "زمان نمی‌تواند خالی باشد.",
      description: "این بخش نمی‌تواند خالی باشد",
    },
  });

  const submitForm = async (values: any) => {
    // TODO fetch from server
    values["requested_speciality"] =
      SpecialitiesId[values["requested_speciality"] as keyof object];

    if (!validateForm()) {
      return;
    }
    const res = await CoreAPI.getInstance().submitRequest(values);

    notifyUser(res, "ثبت موفقیت‌آمیز", "درخواست شما با موفقیت ارسال شد.");

    if (res.success) {
      submitRequestForm.reset();
    }
  };

  const validateForm = () => {
    if (true) {
      showNotification({
        title: "خطا",
        message: "آدرس ثبت نشده است.",
        color: "red",
        icon: <X size={18} />,
      });
    }
    return false;
  };

  const submitLocation = async () => {
    const marker: any = markerRef.current;
    console.log("location mark:", marker.getLatLng());
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <form onSubmit={submitRequestForm.onSubmit(submitForm)}>
        <div style={{ marginTop: "16px" }}>
          <Select
            className="font-reminder"
            data={Specialities}
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
          locale="fa"
          placeholder="یک روز را انتخاب کنید"
          label="زمان شروع"
          required
          {...submitRequestForm.getInputProps("desired_start_time")}
        />
        <Center>
          <Button
            mt="md"
            color="cyan"
            leftIcon={<Map2 size={20} />}
            onClick={() => setLocationModalOpened(true)}
          >
            ثبت آدرس
          </Button>
        </Center>

        <Textarea
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
        <Textarea
          mt="sm"
          placeholder="تهران، خیابان ..."
          label="آدرس محل"
          description="لطفا آدرس کامل خود را بنویسید."
          autosize
          minRows={2}
          maxRows={4}
          required
          {...submitRequestForm.getInputProps("description")}
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
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
          ></Marker>
        </MapContainer>
        <Center>
          <Button
            mt="md"
            color="indigo"
            leftIcon={<MapPin size={20} />}
            onClick={() => submitLocation()}
          >
            ثبت آدرس
          </Button>
        </Center>
      </Modal>
    </>
  );
};

export default RequestServiceView;
