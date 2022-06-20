import { useState } from "react";

import { useForm } from "@mantine/hooks";
import {
  Notification,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  LoadingOverlay,
  Center,
} from "@mantine/core";

import { useAppSelector } from "../../redux/hooks";

import { Lock, Mail, Phone, Check, X } from "tabler-icons-react";

import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";

import { UserRole } from "../../models";

import { Helmet } from "react-helmet";
const TITLE = "اطلاعات کاربری";

const EditProfileView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );
  const [specialityError, setSpecialityError] = useState("");

  const handleSubmit = async (values: any) => {};

  const onSpecialitySelectChange = (values: any[]) => {
    setSelectedSpecialities(values);
    setSpecialityError("");
  };

  const editProfileForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      phone: "",
      isSpecialistActive: true.valueOf,
    },

    validationRules: {
      firstName: (value) => value.trim().length >= 2,
      lastName: (value) => value.trim().length >= 2,
      email: (value) => /^\S+@\S+$/.test(value),
      phone: (value) => /^(\+|0)\d{10}$/.test(value),
      confirmPassword: (val, values: any) => val === values.password,
    },

    errorMessages: {
      // email: "Invalid email",
      // password:
      //   "Password should contain 1 number, 1 letter and at least 6 characters",
      phone: "شماره تلفن همراه وارد شده صحیح نمی‌باشد.",
      confirmPassword: "تکرار رمز مطابق رمز وارد شده نیست.",
    },
  });

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <h2>{TITLE}</h2>
      <div className="transparent-paper">
        {showSuccessNotification && (
          <Notification
            mb="sm"
            disallowClose
            icon={<Check size={18} />}
            color="teal"
            title="موفقیت"
          >
            اطلاعات کاربری با موفقیت ویرایش شد.
          </Notification>
        )}
        {showFailureNotification && (
          <Notification
            mb="sm"
            disallowClose
            icon={<X size={18} />}
            color="red"
            title=""
          >
            {errorMessage}
          </Notification>
        )}

        <form onSubmit={editProfileForm.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading} />
          <Group grow>
            <TextInput
              data-autofocus
              required
              placeholder={user?.firstName}
              label="نام"
              {...editProfileForm.getInputProps("firstName")}
            />

            <TextInput
              required
              placeholder={user?.lastName}
              label="نام خانوادگی"
              {...editProfileForm.getInputProps("lastName")}
            />
          </Group>

          <TextInput
            mt="md"
            disabled
            required
            placeholder={user?.email}
            label="ایمیل"
            icon={<Mail />}
            {...editProfileForm.getInputProps("email")}
          />

          <TextInput
            mt="md"
            disabled
            required
            placeholder={user?.phone}
            label="تلفن همراه"
            icon={<Phone />}
            {...editProfileForm.getInputProps("phone")}
          />
          <PasswordInput
            mt="md"
            required
            placeholder="رمز عبور قدیمی"
            label="رمز عبور قدیمی"
            icon={<Lock />}
            {...editProfileForm.getInputProps("oldPassword")}
          />
          <PasswordInput
            mt="md"
            required
            placeholder="رمز عبور جدید"
            label="رمز عبور جدید"
            icon={<Lock />}
            {...editProfileForm.getInputProps("newPassword")}
          />

          <PasswordInput
            mt="md"
            required
            label="تکرار رمز عبور"
            placeholder="تکرار رمز عبور"
            icon={<Lock />}
            {...editProfileForm.getInputProps("confirmPassword")}
          />

          {user?.role === UserRole.Specialist && (
            <div style={{ marginTop: "16px" }}>
              <SpecialityMultiSelect
                setter={onSpecialitySelectChange}
                required={true}
                error={specialityError}
              />
            </div>
          )}

          {user?.role === UserRole.Specialist && (
            <Checkbox
              mt="xl"
              label="فعال بودن متخصص"
              {...editProfileForm.getInputProps("isSpecialistActive", {
                type: "checkbox",
              })}
            />
          )}

          <Center>
            <Button mt="sm" color="blue" type="submit">
              ویرایش اطلاعات
            </Button>
          </Center>
        </form>
      </div>
    </>
  );
};

export default EditProfileView;
