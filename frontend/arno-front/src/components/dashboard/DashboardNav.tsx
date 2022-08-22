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
  ShoppingCart,
  Note,
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
  classname: string;
}

const links: MainLinkProps[] = [
  {
    icon: <Users size={16} />,
    color: "orange",
    label: "مدیریت کاربران",
    path: "/manage_users",
    classname: "tour-manage-users",
  },
  {
    icon: <EyeCheck size={16} />,
    color: "blue",
    label: "مدیریت خدمات",
    path: "/manage_services",
    classname: "tour-manage-services",
  },
  {
    icon: <Tool size={16} />,
    color: "teal",
    label: "مدیریت تخصص‌ها",
    path: "/manage_specialities",
    classname: "tour-manage-specialities",
  },
  {
    icon: <AlertCircle size={16} />,
    color: "yellow",
    label: "مشکلات فنی",
    path: "/technical_issues",
    classname: "tour-technical-issues",
  },
  {
    icon: <Note size={16} />,
    color: "orange",
    label: "انتقادات و پیشنهادات دریافتی",
    path: "/system_feedbacks",
    classname: "tour-system-feedback",
  },
  {
    icon: <MathFunction size={16} />, // or <Checklist />? :)
    color: "grape",
    label: "معیارهای ارزیابی",
    path: "/evaluation_metrics",
    classname: "tour-evaluation-metric",
  },
  {
    icon: <ReportAnalytics size={16} />,
    color: "blue",
    label: "گزارش‌گیری",
    path: "/report",
    classname: "tour-report",
  },
  {
    icon: <Bucket size={16} />,
    color: "teal",
    label: "درخواست‌های من",
    path: "/requests",
    classname: "tour-my-requests",
  },
  {
    icon: <Calculator size={16} />,
    color: "violet",
    label: "سیاست‌گذاری خدمت‌دهی",
    path: "/service_policy",
    classname: "tour-service-policy",
  },
  // {
  //   icon: <BuildingStore size={16} />,
  //   color: "grape",
  //   label: "مشاهده خدمات",
  //   path: "/services",
  // },
  {
    icon: <ShoppingCart size={16} />,
    color: "lime",
    label: "درخواست‌ها",
    path: "/customer_requests",
    classname: "tour-customer-requests",
  },
  {
    icon: <ClipboardText size={16} />,
    color: "blue",
    label: "خدمات ارائه شده",
    path: "/my_services",
    classname: "tour-my-services",
  },
  {
    icon: <Edit size={16} />,
    color: "teal",
    label: "ویرایش اطلاعات",
    path: "/edit_data",
    classname: "",
  },
  {
    icon: <ShoppingCartPlus size={16} />,
    color: "violet",
    label: "درخواست خدمت",
    path: "/request_service",
    classname: "tour-request-service",
  },
  {
    icon: <FilePlus size={16} />,
    color: "grape",
    label: "ایجاد خدمت برای مشتری",
    path: "/create_request",
    classname: "tour-create-request",
  },
  {
    icon: <Users size={16} />,
    color: "teal",
    label: "مختصصین سامانه",
    path: "/specialists",
    classname: "tour-specialists",
  },
  {
    icon: <Message size={16} />,
    color: "red",
    label: "پیام‌ها",
    path: "/chats",
    classname: "tour-chat",
  },
  {
    icon: <UserExclamation size={16} />,
    color: "violet",
    label: "انتقادات و پیشنهادات",
    path: "/suggestion_complaint",
    classname: "tour-suggestion-complaint",
  },
];

export function DashboardNav() {
  const user = useAppSelector((state) => state.auth.user);

  const linkItems: MainLinkProps[] = links.filter((item) =>
    AccessRules[item.path].includes(user!.role)
  );

  return (
    <Navbar p="xs" width={{ base: 280 }}>
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
