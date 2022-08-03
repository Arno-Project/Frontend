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
  Title,
  Modal,
} from "@mantine/core";

import { useAppSelector } from "../../redux/hooks";

import { Lock, Mail, Phone, Check, X, Edit, Id } from "tabler-icons-react";

import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";

import { UserRole } from "../../models";
import { notifyUser } from "../utils";

import { Helmet } from "react-helmet";
const TITLE = "اطلاعات کاربری";

const EditProfileView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [passwordModalOpened, setPasswordModalOpened] =
    useState<boolean>(false);
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );
  const [specialityError, setSpecialityError] = useState("");

  const onSpecialitySelectChange = (values: any[]) => {
    setSelectedSpecialities(values);
    setSpecialityError("");
  };

  const editProfileForm = useForm({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      isSpecialistActive: true,
    },

    validationRules: {
      firstName: (value) => value!.trim().length >= 2,
      lastName: (value) => value!.trim().length >= 2,
      email: (value) => /^\S+@\S+$/.test(value!),
      phone: (value) => /^(\+|0)\d{10}$/.test(value!),
    },

    errorMessages: {
      email: "ایمیل به‌درستی وارد نشده است.",
      phone: "شماره تلفن همراه وارد شده صحیح نمی‌باشد.",
    },
  });

  const changePasswordForm = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationRules: {
      confirmPassword: (val, values: any) => val === values.password,
    },

    errorMessages: {
      // password:
      //   "Password should contain 1 number, 1 letter and at least 6 characters",
      confirmPassword: "تکرار رمز مطابق رمز وارد شده نیست.",
    },
  });

  const submitEditProfileForm = (values: any) => {
    console.log(values);
    // notifyUser(
    //   null,
    //   "ویرایش موفقیت‌آمیز",
    //   "اطلاعات کاربری با موفقیت ویرایش شد."
    // );
  };

  const submitChangePasswordForm = (values: any) => {
    console.log(values);
    // notifyUser(
    //   null,
    //   "تغییر موفقیت‌آمیز",
    //   "رمز عبور با موفقیت تغییر کرد. لطفاً دوباره وارد سامانه شوید."
    // );
  };

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <form onSubmit={editProfileForm.onSubmit(submitEditProfileForm)}>
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
          placeholder={user?.username}
          label="نام کاربری"
          icon={<Id />}
          {...editProfileForm.getInputProps("username")}
        />

        <TextInput
          mt="md"
          required
          placeholder={user?.email}
          label="ایمیل"
          icon={<Mail />}
          {...editProfileForm.getInputProps("email")}
        />

        <TextInput
          mt="md"
          required
          placeholder={user?.phone}
          label="تلفن همراه"
          icon={<Phone />}
          {...editProfileForm.getInputProps("phone")}
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
          <Button
            mt="sm"
            color="cyan"
            type="submit"
            leftIcon={<Edit size={20} />}
          >
            ویرایش اطلاعات
          </Button>
        </Center>
      </form>
      <Center>
        <Button
          mt="sm"
          color="indigo"
          leftIcon={<Lock size={20} />}
          onClick={() => setPasswordModalOpened(true)}
        >
          ویرایش رمز عبور
        </Button>
      </Center>

      <Modal
        opened={passwordModalOpened}
        onClose={() => setPasswordModalOpened(false)}
        title="ویرایش رمز عبور"
      >
        <form onSubmit={changePasswordForm.onSubmit(submitChangePasswordForm)}>
          <PasswordInput
            mt="md"
            required
            placeholder="رمز عبور قدیمی"
            label="رمز عبور قدیمی"
            icon={<Lock />}
            {...changePasswordForm.getInputProps("oldPassword")}
          />
          <PasswordInput
            mt="md"
            required
            placeholder="رمز عبور جدید"
            label="رمز عبور جدید"
            icon={<Lock />}
            {...changePasswordForm.getInputProps("newPassword")}
          />

          <PasswordInput
            mt="md"
            required
            label="تکرار رمز عبور"
            placeholder="تکرار رمز عبور"
            icon={<Lock />}
            {...changePasswordForm.getInputProps("confirmPassword")}
          />

          <Center>
            <Button
              mt="sm"
              color="cyan"
              type="submit"
              leftIcon={<Edit size={20} />}
            >
              تغییر رمز
            </Button>
          </Center>
        </form>
      </Modal>
    </>
  );
};

export default EditProfileView;
