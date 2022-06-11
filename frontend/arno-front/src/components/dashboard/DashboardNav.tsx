import { Navbar } from "@mantine/core";

import {
  AlertCircle,
  Users,
  UserExclamation,
  EyeCheck,
  FilePlus,
  ShoppingCartPlus,
  Edit,
  ClipboardText,
  BuildingStore,
  Calculator,
  Bucket,
  ReportAnalytics,
  MathFunction,
} from "tabler-icons-react";

import { UserCard } from "./_user";
import { MainLinks } from "./_main-links";
import { Brand } from "./_brand";

export interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
  roles: string[];
}

const links: MainLinkProps[] = [
  {
    icon: <AlertCircle size={16} />,
    color: "blue",
    label: "مشکلات فنی",
    path: "/technical_issues",
    roles: ["technicalManager", "companyManager"],
  },
  {
    icon: <Users size={16} />,
    color: "teal",
    label: "مختصصین سامانه",
    path: "/specialists",
    roles: ["customer", "specialist", "technicalManager", "companyManager"],
  },
  {
    icon: <UserExclamation size={16} />,
    color: "violet",
    label: "انتقادات و پیشنهادات",
    path: "/suggestion_complaint",
    roles: ["customer", "specialist"],
  },
  {
    icon: <MathFunction size={16} />, // or <Checklist />? :)
    color: "grape",
    label: "معیارهای ارزیابی",
    path: "/evaluation_metrics",
    roles: ["companyManager"],
  },
  {
    icon: <ReportAnalytics size={16} />,
    color: "blue",
    label: "گزارش‌گیری",
    path: "/report",
    roles: ["technicalManager", "companyManager"],
  },
  {
    icon: <Bucket size={16} />,
    color: "teal",
    label: "خدمات دریافت شده",
    path: "/requests",
    roles: ["customer"],
  },
  {
    icon: <Calculator size={16} />,
    color: "violet",
    label: "سیاست‌گذاری خدمت‌دهی",
    path: "/service_policy",
    roles: ["companyManager"],
  },
  {
    icon: <BuildingStore size={16} />,
    color: "grape",
    label: "مشاهده خدمات",
    path: "/services",
    roles: ["customer"],
  },
  {
    icon: <ClipboardText size={16} />,
    color: "blue",
    label: "خدمات ارائه شده",
    path: "/my_services",
    roles: ["specialist"],
  },
  {
    icon: <Edit size={16} />,
    color: "teal",
    label: "ویرایش اطلاعات",
    path: "/edit_data",
    roles: ["technicalManager"],
  },
  {
    icon: <ShoppingCartPlus size={16} />,
    color: "violet",
    label: "درخواست خدمت",
    path: "/request_service",
    roles: ["customer"],
  },
  {
    icon: <FilePlus size={16} />,
    color: "grape",
    label: "ایجاد خدمت برای مشتری",
    path: "/create_service",
    roles: ["technicalManager", "companyManager"],
  },
  {
    icon: <EyeCheck size={16} />,
    color: "blue",
    label: "مدیریت خدمات",
    path: "/manage_services",
    roles: ["technicalManager", "companyManager"],
  },
];

export function DashboardNav({ user }: any) {
  const linkItems: MainLinkProps[] = links.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <MainLinks links={linkItems} />
      </Navbar.Section>
      <Navbar.Section>
        <UserCard user={user} />
      </Navbar.Section>
    </Navbar>
  );
}
