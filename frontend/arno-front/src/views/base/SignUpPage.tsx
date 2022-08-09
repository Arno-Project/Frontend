import { useForm } from '@mantine/form';

import {
  Input,
  Notification,
  Radio,
  Space,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  LoadingOverlay,
  Anchor,
} from "@mantine/core";

import { Lock, Mail, Phone, Check, X, Id } from "tabler-icons-react";

import { AuthAPI } from "../../api/auth";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";
import { UserRole } from "../../models";
import { useAppDispatch } from "../../redux/hooks";
import { login, setUserInfo } from "../../redux/auth";
import { APIDataToUser } from "../../models/utils";
import { PasswordValidator } from '../../assets/PasswordValidator';

const SignUpPage = () => {
  const [formType, setFormType] = useState<"register" | "login">("login");
  const [loading, setLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [error, setErrorMessage] = useState<any>({});
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Customer);
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );
  const [specialityError, setSpecialityError] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const toggleFormType = () => {
    setShowFailureNotification(false);
    setShowSuccessNotification(false);
    setFormType((current) => (current === "register" ? "login" : "register"));
    // setError(null);
  };

  const registerForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      termsOfService: true,
    },

    validate: {
      // firstName: (value) => formType === "login" || value.trim().length >= 2,
      // lastName: (value) => formType === "login" || value.trim().length >= 2,
      // email: (value) => /^\S+@\S+$/.test(value),
      password: (value: string) => PasswordValidator.validatePassword(value),
      phone: (value: string) => /^(\+|0)\d{10}$/.test(value) ? null : "شماره تلفن همراه وارد شده صحیح نمی‌باشد.",
      confirmPassword: (val: string, values: any) => formType === "login" || val === values.password ? null : "تکرار رمز مطابق رمز وارد شده نیست.",
      termsOfService: (value: boolean) => value === true ? null : "لطفا با مقررات سایت موافقت کنید",
    },
  });

  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: any) => {
    if (userRole === UserRole.Specialist && selectedSpecialities.length === 0) {
      setSpecialityError("باید حداقل یک تخصص انتخاب کنید");
      return;
    }

    const api = AuthAPI.getInstance();

    let res = null;
    if (formType === "login") {
      res = await api.login(values["username"], values["password"]);
    } else {
      res = await api.register(
        { specialities: selectedSpecialities, ...values },
        userRole
      );
    }
    let data = res.data;

    if (res.success && data !== null) {
      setErrorMessage({});

      setShowFailureNotification(false);
      setShowSuccessNotification(true);

      if (formType === "login" || userRole === UserRole.Customer) {
        let user = APIDataToUser(res);

        dispatch(login(data["token" as keyof object]));
        dispatch(setUserInfo(user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } else {
      setErrorMessage(res.error);
      setShowSuccessNotification(false);
      setShowFailureNotification(true);
    }
  };

  const onSpecialitySelectChange = (values: any[]) => {
    setSelectedSpecialities(values);
    setSpecialityError("");
  };

  return (
    <>
      <Helmet>
        <title>
          {"آرنو | " + (formType === "register" ? "ثبت‌نام" : "ورود")}
        </title>
      </Helmet>
      <Title order={1}>ثبت‌نام / ورود به سامانه</Title>
      <Space h="lg" />

      <div className="transparent-paper">
        {showSuccessNotification && (
          <Notification
            mb="sm"
            disallowClose
            icon={<Check size={18} />}
            color="teal"
            title="موفقیت"
          >
            {"با موفقیت " +
              (formType === "register" ? "ثبت‌نام" : "وارد") +
              " شدید"}
          </Notification>
        )}
        {error && error["custom_errors" as keyof object] && (
          <Notification
            mb="sm"
            disallowClose
            icon={<X size={18} />}
            color="red"
            title="خطا"
          >
            {error["custom_errors"]}
          </Notification>
        )}
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

        {formType === "register" ? (
          <form onSubmit={registerForm.onSubmit(handleSubmit)}>
            <Radio.Group
              mb="sm"
              label="نوع کاربر"
              description="در صورت انتخاب متخصص، نیاز به تأیید مدیر خواهید داشت"
              spacing="xl"
              color="cyan"
              value={userRole}
              onChange={(val: string) => setUserRole(val as UserRole)}
              required
            >
              <Radio value={UserRole.Customer} label="مشتری" />
              <Radio value={UserRole.Specialist} label="متخصص" />
            </Radio.Group>

            <LoadingOverlay visible={loading} />
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

            {userRole === UserRole.Specialist && (
              <div style={{ marginTop: "16px" }}>
                <SpecialityMultiSelect
                  setter={onSpecialitySelectChange}
                  required={true}
                  error={specialityError}
                />
              </div>
            )}

            <Checkbox
              mt="xl"
              label="با قوانین و مقررات سایت موافقم"
              {...registerForm.getInputProps("termsOfService", {
                type: "checkbox",
              })}
            />

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="gray"
                onClick={toggleFormType}
                size="sm"
              >
                حساب کاربری دارید؟ وارد شوید.
              </Anchor>

              <Button color="blue" type="submit">
                ثبت‌نام
              </Button>
            </Group>
          </form>
        ) : (
          <form onSubmit={loginForm.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={loading} />

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
                {...loginForm.getInputProps("username")}
              />
            </Input.Wrapper>
            <PasswordInput
              mt="md"
              required
              placeholder="رمز عبور"
              label="رمز عبور"
              icon={<Lock />}
              autoComplete="current-password"
              {...loginForm.getInputProps("password")}
            />

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="gray"
                onClick={toggleFormType}
                size="sm"
              >
                حساب کاربری نساخته‌اید؟ ثبت‌نام کنید.
              </Anchor>

              <Button color="blue" type="submit">
                ورود
              </Button>
            </Group>
          </form>
        )}
      </div>
    </>
  );
};

export default SignUpPage;
