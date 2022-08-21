import { useState } from "react";

import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  LoadingOverlay,
  Center,
  Title,
  Modal,
  FileInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { Lock, Mail, Phone, X, Edit, Id, FileUpload } from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";

import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";
import { UserRole } from "../../models";
import { notifyUser } from "../utils";
import { AccountAPI } from "../../api/accounts";
import { APIDataToUsers } from "../../models/utils";
import { PasswordValidator } from "../../assets/PasswordValidator";

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
      first_name: user?.firstName,
      last_name: user?.lastName,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      is_active: true,
      documents: null,
    },

    validate: {
      first_name: (value: string) =>
        value!.trim().length >= 2 ? null : "نام به‌درستی ثبت نشده است",
      last_name: (value: string) =>
        value!.trim().length >= 2 ? null : "نام به‌درستی ثبت نشده است",
      email: (value: string) =>
        /^\S+@\S+$/.test(value!) ? null : "ایمیل به‌درستی وارد نشده است.",
      phone: (value: string) =>
        /^(\+|0)\d{10}$/.test(value!)
          ? null
          : "شماره تلفن همراه وارد شده صحیح نمی‌باشد.",
    },
  });

  const changePasswordForm = useForm({
    initialValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },

    validate: {
      password: PasswordValidator.validatePassword,
      confirm_password: (val, values: any) =>
        val === values.password ? null : "تکرار رمز مطابق رمز وارد شده نیست.",
    },
  });

  const submitEditProfileForm = async (values: any) => {
    uploadSpecialistDocument(values["documents"]);

    const res = await AccountAPI.getInstance().editMyProfile(values);
    if (user?.role === UserRole.Specialist) {
      await syncSpecialities();
    }

    notifyUser(
      res,
      "ویرایش موفقیت‌آمیز",
      "اطلاعات کاربری با موفقیت ویرایش شد."
    );
    if (res.success) {
      // TODO find a better way
      // window.location.reload();
    }
  };

  const uploadSpecialistDocument = async (document: any) => {
    if (document === null) {
      return;
    }

    let formData = new FormData();
    formData.append("file", document);

    const res = await AccountAPI.getInstance().uploadDocument(formData);

    notifyUser(res, "بارگذاری موفقیت‌آمیز", "مدارک شما با موفقیت آپلود شد.");
  };

  const syncSpecialities = async () => {
    const res = await AccountAPI.getInstance().getSpecialistById(user!.id);
    if (!res.success) {
      showNotification({
        title: "خطا",
        message: "دریافت تخصص‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18} />,
      });
      return;
    }
    const allSpecialities = await AccountAPI.getInstance().fetchSpecialities();
    const mySpec = APIDataToUsers(res)[0].speciality.map((s) => s.id);

    for (let specialityId of allSpecialities.map((s) => s.id)) {
      let specialityIdStr = specialityId + "";
      if (
        mySpec.includes(specialityId) &&
        !selectedSpecialities.includes(specialityIdStr)
      ) {
        await AccountAPI.getInstance().removeSpeciality(specialityId);
      }
      if (
        selectedSpecialities.includes(specialityIdStr) &&
        !mySpec.includes(specialityId)
      ) {
        await AccountAPI.getInstance().addSpeciality(specialityId);
      }
    }
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
            {...editProfileForm.getInputProps("first_name")}
          />

          <TextInput
            required
            placeholder={user?.lastName}
            label="نام خانوادگی"
            {...editProfileForm.getInputProps("last_name")}
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
          <FileInput
            mt="sm"
            label="آپلود مدارک"
            placeholder="انتخاب مدارک اعتبارسنجی"
            icon={<FileUpload size={20} />}
            accept="application/pdf"
            {...editProfileForm.getInputProps("documents")}
          />
        )}

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
            label="در حال حاضر مایل به ارائه‌ی سرویس می‌باشم."
            {...editProfileForm.getInputProps("is_active", {
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
        <form onSubmit={changePasswordForm.onSubmit(submitEditProfileForm)}>
          <PasswordInput
            mt="md"
            required
            placeholder="رمز عبور قدیمی"
            label="رمز عبور قدیمی"
            icon={<Lock />}
            {...changePasswordForm.getInputProps("old_password")}
          />
          <PasswordInput
            mt="md"
            required
            placeholder="رمز عبور جدید"
            label="رمز عبور جدید"
            icon={<Lock />}
            {...changePasswordForm.getInputProps("password")}
          />

          <PasswordInput
            mt="md"
            required
            label="تکرار رمز عبور"
            placeholder="تکرار رمز عبور"
            icon={<Lock />}
            {...changePasswordForm.getInputProps("confirm_password")}
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
