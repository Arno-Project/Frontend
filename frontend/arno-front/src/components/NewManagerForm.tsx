import { useForm } from "@mantine/form";

import { Input, Notification, Radio, Space, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  LoadingOverlay,
  Anchor,
} from "@mantine/core";

import { Lock, Mail, Phone, Check, X, Id} from "tabler-icons-react";

import { AuthAPI } from "../api/auth";
import SpecialityMultiSelect from "../components/SpecialityMultiSelect";
import { UserRole } from "../models";
import { useAppDispatch } from "../redux/hooks";
import { login, setUserInfo } from "../redux/auth";
import { APIDataToUser } from "../models/utils";
import { PasswordValidator } from "../assets/PasswordValidator";

const NewManagerForm = () => {
  const [error, setErrorMessage] = useState<any>({});
  const [userRole, setUserRole] = useState<UserRole>(UserRole.TechnicalManager);

  const registerForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },

    validate: {
      password: PasswordValidator.validatePassword,
      phone: (value: string) =>
        /^(\+|0)\d{10}$/.test(value)
          ? null
          : "شماره تلفن همراه وارد شده صحیح نمی‌باشد.",
      confirmPassword: (val: string, values: any) =>
        val === values.password ? null : "تکرار رمز مطابق رمز وارد شده نیست.",
    },
  });

  

  const handleSubmit = async (values: any) => {
    const api = AuthAPI.getInstance();

    let res = null;
    res = await api.registerManager(
        values, 
        userRole);
    let data = res.data;

    if (res.success && data !== null) {
        showNotification({
            title: "عملیات موفقیت‌آمیز",
            message: "مدیر جدید با موفقیت اضافه شد.",
            color: "teal",
            icon: <Check size={18} />,
          });
      setErrorMessage({});
    registerForm.reset()
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <>
      <div className="transparent-paper">
        {error && error["non_field_errors" as keyof object] && (
          <Notification
            mb="sm"
            disallowClose
            icon={<X size={18} />}
            color="red"
            title="خطا"
          >
            {error["non_field_errors" as keyof object].join("\n")}
          </Notification>
        )}

        <form onSubmit={registerForm.onSubmit(handleSubmit)}>
          <Radio.Group
            mb="sm"
            label="نوع کاربر"
            spacing="xl"
            color="cyan"
            value={userRole}
            onChange={(val: string) => setUserRole(val as UserRole)}
            required
          >
            <Radio value={UserRole.TechnicalManager} label="مدیر فنی" />
            <Radio value={UserRole.CompanyManager} label="مدیر شرکت" />
          </Radio.Group>

          <Group grow>
            <TextInput
              data-autofocus
              required
              placeholder="نام"
              label="نام"
              {...registerForm.getInputProps("firstName")}
            />

            <TextInput
              required
              placeholder="نام خانوادگی"
              label="نام خانوادگی"
              {...registerForm.getInputProps("lastName")}
            />
          </Group>
          <Input.Wrapper
            id="input-demo"
            required
            error={error ? error["email" as keyof object] : ""}
          >
            <TextInput
              mt="md"
              required
              placeholder="پست الکترونیکی"
              label="ایمیل"
              icon={<Mail />}
              {...registerForm.getInputProps("email")}
            />
          </Input.Wrapper>

          <Input.Wrapper
            id="input-demo"
            required
            error={error ? error["username" as keyof object] : ""}
          >
            <TextInput
              mt="md"
              required
              placeholder="نام کاربری"
              label="نام کاربری"
              icon={<Id />}
              {...registerForm.getInputProps("username")}
            />
          </Input.Wrapper>

          <Input.Wrapper
            id="input-demo"
            required
            error={error ? error["phone" as keyof object] : ""}
          >
            <TextInput
              mt="md"
              required
              placeholder="تلفن همراه"
              label="تلفن همراه"
              icon={<Phone />}
              {...registerForm.getInputProps("phone")}
            />
          </Input.Wrapper>
          <Input.Wrapper
            id="input-demo"
            required
            error={error ? error["password" as keyof object] : ""}
          >
            <PasswordInput
              mt="md"
              required
              placeholder="رمز عبور"
              label="رمز عبور"
              icon={<Lock />}
              autoComplete="current-password"
              {...registerForm.getInputProps("password")}
            />

            <PasswordInput
              mt="md"
              required
              label="تکرار رمز عبور"
              placeholder="تکرار رمز عبور"
              icon={<Lock />}
              {...registerForm.getInputProps("confirmPassword")}
            />
          </Input.Wrapper>

          <Group position="apart" mt="xl">
            <Button color="blue" type="submit">
              اضافه کردن
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default NewManagerForm;
