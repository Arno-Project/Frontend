import { MultiSelect } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { UserSearch, X } from "tabler-icons-react";

import { AccountAPI } from "../api/accounts";
import { Speciality } from "../models";
import { APIDataToSpecialities } from "../models/utils";

export default function SpecialityMultiSelect({
  setter,
  required,
  error,
  initialValues = [],
  disabled = false,
  form = {},
  formProps = {}
}: any) {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  const getSpecialities = async () => {
    const res = await AccountAPI.getInstance().getSpecialities();

    if (res.success) {
      const data = APIDataToSpecialities(res);
      setSpecialities(data);
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت تخصص‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  useEffect(() => {
    getSpecialities();
    if (Object.keys(form).length > 0) {
      form.setFieldValue("specialities", initialValues);
    }
  }, []);

  return (
    <MultiSelect
      onChange={setter}
      className="font-reminder tour-search-input-speciality"
      data={specialities
        .filter((s: Speciality) => s.parent !== null)
        .map((s: Speciality) => ({
          label: s.title,
          value: s.id + "",
          group: s.parent?.title,
        }))}
      icon={<UserSearch size={20} />}
      label="انتخاب تخصص‌ها برای متخصصین"
      placeholder="تخصص‌های مورد نظر"
      required={required}
      error={error}
      searchable
      clearable
      disabled={disabled}
      {...formProps}
    />
  );
}
