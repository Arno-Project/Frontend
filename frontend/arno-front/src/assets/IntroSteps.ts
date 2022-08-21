import {UserRole} from "../models";

const CustomerNavbarSteps = [
  {
    element: ".tour-my-requests",
    intro: "در این قسمت لیست درخواست‌های ثبت شده خود را مشاهده می‌کنید."
  },
  {
    element: ".tour-request-service",
    intro: "در این قسمت می‌توانید درخواست جدید ثبت نمایید."
  },
  {
    element: ".tour-specialists",
    intro: "در این قسمت می‌توانید متخصصین سامانه را مشاهده نمایید."
  },
  {
    element: ".tour-chat",
    intro: "در این قسمت می‌توانید به تبادل پیام و چت بپردازید."
  },
  {
    element: ".tour-suggestion-complaint",
    intro: "این قسمت برای ثبت انتقادات و پیشنهادات در نظر گرفته شده است."
  },
]


const SpecialistNavbarSteps = [
  {
    element: ".tour-customer-requests",
    intro: "در این قسمت لیست درخواست‌های ثبت شده توسط کاربران را مشاهده می‌کنید."
  },
  {
    element: ".tour-my-services",
    intro: "در این قسمت می‌توانید خدماتی که تاکنون ارائه داده‌اید را مشاهده نمایید."
  },
  {
    element: ".tour-specialists",
    intro: "در این قسمت می‌توانید متخصصین سامانه را مشاهده نمایید."
  },
  {
    element: ".tour-chat",
    intro: "در این قسمت می‌توانید به تبادل پیام و چت بپردازید."
  },
  {
    element: ".tour-suggestion-complaint",
    intro: "این قسمت برای ثبت انتقادات و پیشنهادات در نظر گرفته شده است."
  },
]
type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export const NavbarSteps: EnumDictionary<UserRole, Object> = {
  [UserRole.Customer]: CustomerNavbarSteps,
  [UserRole.Specialist]: SpecialistNavbarSteps,
  [UserRole.CompanyManager]: [],
  [UserRole.TechnicalManager]: [],

}

export const CreateRequestSteps = [
  {
    element: ".tour-speciality-select",
    intro: "در این قسمت تخصص‌های مدنظر خود برای درخواست را مشخص نمایید."
  },
  {
    element: ".tour-start-date-select",
    intro: "در این قسمت تاریخ شروع درخواست را مشخص نمایید."
  },
  {
    element: ".tour-submit-address-button",
    intro: "با کلیک بر روی این دکمه می‌توانید آدرس درخواست را ثبت نمایید."
  },
  {
    element: ".tour-description-textarea",
    intro: "در این قسمت توضیحات درخواست را بنویسید."
  },
  {
    element: ".tour-submit-button",
    intro: "با کلیک بر روی این دکمه می‌توانید درخواست را ثبت نمایید."
  }
]


export const MyRequestsStatus = [
  {
    element: ".tour-my-requests-status",
    intro: "در این قسمت می‌توانید وضعیت درخواست‌های خود را مشاهده نمایید."
  }
]
