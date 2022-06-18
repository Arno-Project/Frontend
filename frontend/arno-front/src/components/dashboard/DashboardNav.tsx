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
import { useAppSelector } from "../../redux/hooks";
import { UserRole } from "../../models";

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
    roles: [UserRole.TechnicalManager, UserRole.CompanyManager],
  },
  {
    icon: <Users size={16} />,
    color: "teal",
    label: "مختصصین سامانه",
    path: "/specialists",
    roles: [
      UserRole.Customer,
      UserRole.Specialist,
      UserRole.TechnicalManager,
      UserRole.CompanyManager,
    ],
  },
  {
    icon: <UserExclamation size={16} />,
    color: "violet",
    label: "انتقادات و پیشنهادات",
    path: "/suggestion_complaint",
    roles: [UserRole.Customer, UserRole.Specialist],
  },
  {
    icon: <MathFunction size={16} />, // or <Checklist />? :)
    color: "grape",
    label: "معیارهای ارزیابی",
    path: "/evaluation_metrics",
    roles: [UserRole.CompanyManager],
  },
  {
    icon: <ReportAnalytics size={16} />,
    color: "blue",
    label: "گزارش‌گیری",
    path: "/report",
    roles: [UserRole.TechnicalManager, UserRole.CompanyManager],
  },
  {
    icon: <Bucket size={16} />,
    color: "teal",
    label: "خدمات دریافت شده",
    path: "/requests",
    roles: [UserRole.Customer],
  },
  {
    icon: <Calculator size={16} />,
    color: "violet",
    label: "سیاست‌گذاری خدمت‌دهی",
    path: "/service_policy",
    roles: [UserRole.CompanyManager],
  },
  {
    icon: <BuildingStore size={16} />,
    color: "grape",
    label: "مشاهده خدمات",
    path: "/services",
    roles: [UserRole.Customer],
  },
  {
    icon: <ClipboardText size={16} />,
    color: "blue",
    label: "خدمات ارائه شده",
    path: "/my_services",
    roles: [UserRole.Specialist],
  },
  {
    icon: <Edit size={16} />,
    color: "teal",
    label: "ویرایش اطلاعات",
    path: "/edit_data",
    roles: [UserRole.TechnicalManager],
  },
  {
    icon: <ShoppingCartPlus size={16} />,
    color: "violet",
    label: "درخواست خدمت",
    path: "/request_service",
    roles: [UserRole.Customer],
  },
  {
    icon: <FilePlus size={16} />,
    color: "grape",
    label: "ایجاد خدمت برای مشتری",
    path: "/create_service",
    roles: [UserRole.TechnicalManager, UserRole.CompanyManager],
  },
  {
    icon: <EyeCheck size={16} />,
    color: "blue",
    label: "مدیریت خدمات",
    path: "/manage_services",
    roles: [UserRole.TechnicalManager, UserRole.CompanyManager],
  },
];

export function DashboardNav() {
  const user = useAppSelector((state) => state.auth.user);

  const linkItems: MainLinkProps[] = links.filter((item) =>
    item.roles.includes(user!.role)
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
