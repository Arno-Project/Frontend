import { useForm } from "@mantine/hooks";

import React, { useState } from "react";

import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  Anchor,
  useMantineTheme,
} from "@mantine/core";
import { Lock, Mail } from "tabler-icons-react";

const SignUpPage = () => { // TODO resolve style compatibilty
  const [formType, setFormType] = useState<"register" | "login">("register");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string>(null);
  const theme = useMantineTheme();

  const toggleFormType = () => {
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
      termsOfService: true,
    },

    // validationRules: {
    //   firstName: (value) => formType === 'login' || value.trim().length >= 2,
    //   lastName: (value) => formType === 'login' || value.trim().length >= 2,
    //   email: (value) => /^\S+@\S+$/.test(value),
    //   password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
    //   confirmPassword: (val, values) => formType === 'login' || val === values.password,
    // },

    // errorMessages: {
    //   email: 'Invalid email',
    //   password: 'Password should contain 1 number, 1 letter and at least 6 characters',
    //   confirmPassword: "Passwords don't match. Try again",
    // },
  });

  const handleSubmit = (values: any) => {
    console.log(values);
    // TODO: call api
  };

  return (
    <>
      <h1>ثبت نام / ورود به سامانه</h1>
      <Paper style={{ position: "relative" }}>
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
      </Paper>
    </>
  );
};

export default SignUpPage;
