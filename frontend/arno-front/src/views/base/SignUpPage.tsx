import { useForm } from "@mantine/hooks";

import { Notification, Radio, RadioGroup } from "@mantine/core";
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

import { Lock, Mail, Phone, Check, X } from "tabler-icons-react";

import { callLogin, callRegister } from "../../api/auth";
import SpecialityMultiSelect from "../../components/SpecialityMultiSelect";
import { User, UserRole } from "../../models";
import { useAppDispatch } from "../../redux/hooks";
import { login, setUserInfo } from "../../redux/auth";

const SignUpPage = () => {
  const [formType, setFormType] = useState<"register" | "login">("login");
  const [loading, setLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {},

    errorMessages: {},
  });

  const handleSubmit = async (values: any) => {
    if (userRole === UserRole.Specialist && selectedSpecialities.length === 0) {
      setSpecialityError("باید حداقل یک تخصص انتخاب کنید");
      return;
    }

    let data = null;
    if (formType === "login") {
      data = await callLogin(values);
    } else {
      data = await callRegister(
        { specialities: selectedSpecialities, ...values },
        userRole
      );
    }

    if (data["success"]) {
      console.log(formType, userRole);

      setShowFailureNotification(false);
      setShowSuccessNotification(true);

      if (formType === "login" || userRole === UserRole.Customer) {
        let userData = data["user"];
        let user: User = {
          id: userData["id"],
          username: userData["username"],
          firstName: userData["first_name"],
          lastName: userData["last_name"],
          email: userData["email"],
          role: data["role"] as UserRole,
          phone: userData["phone"],
        };

        dispatch(login(data["token"]));
        dispatch(setUserInfo(user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } else {
      setErrorMessage(data["error"]);
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
      <h1>ثبت‌نام / ورود به سامانه</h1>

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

        {formType === "register" ? (
          <form onSubmit={registerForm.onSubmit(handleSubmit)}>
            <RadioGroup
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
            </RadioGroup>

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

            <TextInput
              mt="md"
              required
              placeholder="پست الکترونیکی"
              label="ایمیل"
              icon={<Mail />}
              {...registerForm.getInputProps("email")}
            />

            <TextInput
              mt="md"
              required
              placeholder="تلفن همراه"
              label="تلفن همراه"
              icon={<Phone />}
              {...registerForm.getInputProps("phone")}
            />
            <PasswordInput
              mt="md"
              required
              placeholder="رمز عبور"
              label="رمز عبور"
              icon={<Lock />}
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

            {userRole === "specialist" && (
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

            <TextInput
              mt="md"
              required
              placeholder="پست الکترونیکی"
              label="ایمیل"
              icon={<Mail />}
              {...loginForm.getInputProps("email")}
            />

            <PasswordInput
              mt="md"
              required
              placeholder="رمز عبور"
              label="رمز عبور"
              icon={<Lock />}
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
