import { MultiSelect } from "@mantine/core";
import { UserSearch } from "tabler-icons-react";

const specialities = [
  "React",
  "Angular",
  "Svelte",
  "Vue",
  "Riot",
  "Next.js",
  "Blitz.js",
]; // TODO fetch from server

export default function SpecialityMultiSelect({ setter, required, error }: any) {
  return (
    <MultiSelect
      onChange={setter}
      className="font-reminder"
      data={specialities}
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
