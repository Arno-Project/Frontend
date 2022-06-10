import { useForm } from "@mantine/hooks";

import { Notification } from "@mantine/core";
import { Check, X } from "tabler-icons-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  LoadingOverlay,
  Anchor,
  useMantineTheme,
} from "@mantine/core";
import { Lock, Mail, Phone } from "tabler-icons-react";
import { sendLoginRequest, sendSignUpRequest } from "../api/account";

const SignUpPage = () => {
  const [formType, setFormType] = useState<"register" | "login">("register");
  const [loading, setLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useMantineTheme();

  const navigate = useNavigate();

  const toggleFormType = () => {
    setShowFailureNotification(false);
    setShowSuccessNotification(false);
    setFormType((current) => (current === "register" ? "login" : "register"));
    // setError(null);
  };

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      termsOfService: true,
    },

    validationRules: {
      // firstName: (value) => formType === "login" || value.trim().length >= 2,
      // lastName: (value) => formType === "login" || value.trim().length >= 2,
      // email: (value) => /^\S+@\S+$/.test(value),
      // password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
      phone: (value) => /^(\+|0)\d{10}$/.test(value),
      confirmPassword: (val, values: any) =>
        formType === "login" || val === values.password,
      termsOfService: (value) => value === true,
    },

    errorMessages: {
      // email: "Invalid email",
      // password:
      //   "Password should contain 1 number, 1 letter and at least 6 characters",
      phone: "شماره تلفن همراه وارد شده صحیح نمی‌باشد.",
      confirmPassword: "تکرار رمز مطابق رمز وارد شده نیست.",
      termsOfService: "لطفا با مقررات سایت موافقت کنید",
    },
  });

  const handleErrors = (data: any) => {
    if (
      data["success"] &&
      (data["status"] == undefined || data["status"] === 200) // ?
    ) {
      setShowFailureNotification(false);
      setShowSuccessNotification(true);
    } else {
      setErrorMessage(data["error"]);
      setShowSuccessNotification(false);
      setShowFailureNotification(true);
    }
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
    let data = null;
    if (formType === "login") {
      data = await sendLoginRequest(values);
    } else {
      data = await sendSignUpRequest(values, "customer");
    }

    handleErrors(data);
    if (formType === "login") {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
  };

  return (
    <>
      <h1>ثبت‌نام / ورود به سامانه</h1>
      <div className="transparent-paper">
        {showSuccessNotification && (
          <Notification
            disallowClose
            icon={<Check size={18} />}
            color="teal"
            title="موفقیت"
          >
            با موفقیت ثبت‌نام شدید.
          </Notification>
        )}
        {showFailureNotification && (
          <Notification
            disallowClose
            icon={<X size={18} />}
            color="red"
            title=""
          >
            {errorMessage}
          </Notification>
        )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading} />
          {formType === "register" && (
            <Group grow>
              <TextInput
                data-autofocus
                required
                placeholder="نام"
                label="نام"
                {...form.getInputProps("firstName")}
              />

              <TextInput
                required
                placeholder="نام خانوادگی"
                label="نام خانوادگی"
                {...form.getInputProps("lastName")}
              />
            </Group>
          )}

          <TextInput
            mt="md"
            required
            placeholder="پست الکترونیکی"
            label="ایمیل"
            icon={<Mail />}
            {...form.getInputProps("email")}
          />

          <TextInput
            mt="md"
            required
            placeholder="تلفن همراه"
            label="تلفن همراه"
            icon={<Phone />}
            {...form.getInputProps("phone")}
          />
          <PasswordInput
            mt="md"
            required
            placeholder="رمز عبور"
            label="رمز عبور"
            icon={<Lock />}
            {...form.getInputProps("password")}
          />

          {formType === "register" && (
            <PasswordInput
              mt="md"
              required
              label="تکرار رمز عبور"
              placeholder="تکرار رمز عبور"
              icon={<Lock />}
              {...form.getInputProps("confirmPassword")}
            />
          )}

          {formType === "register" && (
            <Checkbox
              mt="xl"
              label="با قوانین و مقررات سایت موافقم"
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />
          )}

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="gray"
              onClick={toggleFormType}
              size="sm"
            >
              {formType === "register"
                ? "حساب کاربری دارید؟ وارد شوید."
                : "حساب کاربری نساخته‌اید؟ ثبت‌نام کنید."}
            </Anchor>

            <Button color="blue" type="submit">
              {formType === "register" ? "ثبت‌نام" : "ورود"}
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
