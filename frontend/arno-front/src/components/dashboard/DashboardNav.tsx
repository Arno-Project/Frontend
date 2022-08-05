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
  Tool,
  Message,
} from "tabler-icons-react";

import { UserCard } from "./_user";
import { MainLinks } from "./_main-links";
import { useAppSelector } from "../../redux/hooks";
import { AccessRules } from "../../assets/consts";

export interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

const links: MainLinkProps[] = [
  {
    icon: <AlertCircle size={16} />,
    color: "blue",
    label: "مشکلات فنی",
    path: "/technical_issues",
  },
  {
    icon: <Users size={16} />,
    color: "teal",
    label: "مختصصین سامانه",
    path: "/specialists",
  },
  {
    icon: <UserExclamation size={16} />,
    color: "violet",
    label: "انتقادات و پیشنهادات",
    path: "/suggestion_complaint",
  },
  {
    icon: <MathFunction size={16} />, // or <Checklist />? :)
    color: "grape",
    label: "معیارهای ارزیابی",
    path: "/evaluation_metrics",
  },
  {
    icon: <ReportAnalytics size={16} />,
    color: "blue",
    label: "گزارش‌گیری",
    path: "/report",
  },
  {
    icon: <Bucket size={16} />,
    color: "teal",
    label: "خدمات دریافت شده",
    path: "/requests",
  },
  {
    icon: <Calculator size={16} />,
    color: "violet",
    label: "سیاست‌گذاری خدمت‌دهی",
    path: "/service_policy",
  },
  {
    icon: <BuildingStore size={16} />,
    color: "grape",
    label: "مشاهده خدمات",
    path: "/services",
  },
  {
    icon: <ClipboardText size={16} />,
    color: "blue",
    label: "خدمات ارائه شده",
    path: "/my_services",
  },
  {
    icon: <Edit size={16} />,
    color: "teal",
    label: "ویرایش اطلاعات",
    path: "/edit_data",
  },
  {
    icon: <ShoppingCartPlus size={16} />,
    color: "violet",
    label: "درخواست خدمت",
    path: "/request_service",
  },
  {
    icon: <FilePlus size={16} />,
    color: "grape",
    label: "ایجاد خدمت برای مشتری",
    path: "/create_request",
  },
  {
    icon: <EyeCheck size={16} />,
    color: "blue",
    label: "مدیریت خدمات",
    path: "/manage_services",
  },
  {
    icon: <Tool size={16} />,
    color: "teal",
    label: "مدیریت تخصص‌ها",
    path: "/manage_specialities",
  },
  {
    icon: <Message size={16} />,
    color: "red",
    label: "پیام‌ها",
    path: "/chats",
  },
];

export function DashboardNav() {
  const user = useAppSelector((state) => state.auth.user);

  const linkItems: MainLinkProps[] = links.filter((item) =>
    AccessRules[item.path].includes(user!.role)
  );

  return (
    <Navbar p="xs" width={{ base: 300 }}>
      {/* <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section> */}
      <Navbar.Section grow>
        <MainLinks links={linkItems} />
      </Navbar.Section>
      <Navbar.Section>
        <UserCard user={user} />
      </Navbar.Section>
    </Navbar>
  );
}
