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
  }, []);

  return (
    <MultiSelect
      onChange={setter}
      className="font-reminder"
      data={specialities
        .filter((s) => s.parent !== null)
        .map((s) => ({
          label: s.title,
          value: s.title,
          group: s.parent?.title,
        }))}
      icon={<UserSearch size={20} />}
      label="انتخاب تخصص(ها)"
      placeholder="تخصص‌های مورد نظر"
      required={required}
      error={error}
      searchable
      clearable
    />
  );
}
