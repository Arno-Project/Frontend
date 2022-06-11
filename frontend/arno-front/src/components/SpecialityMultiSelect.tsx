import { MultiSelect } from "@mantine/core";
import { UserSearch } from "tabler-icons-react";
import { Specialities } from "../assets/consts";


export default function SpecialityMultiSelect({ setter, required, error }: any) {
  return (
    <MultiSelect
      onChange={setter}
      className="font-reminder"
      data={Specialities}
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
