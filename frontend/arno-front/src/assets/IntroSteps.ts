import {UserRole} from "../models";
import exp from "constants";

const NotificationIconStep = {
  element: ".tour-notification-icon",
  intro: "با کلیک بر این دکمه وارد صفحه نوتیفیکشن‌ها می‌شوید."
}

const LogoutIconStep = {
  element: ".tour-logout-icon",
  intro: "با کلیک بر این دکمه از حساب کاربری خود خارج می‌شوید."
}

const UserProfileStep = {
  element: ".tour-user-profile",
  intro: "با کلیک بر این دکمه وارد پروفایل کاربری خود می‌شوید."
}

const ChatStep = {
  element: ".tour-chat",
  intro: "در این قسمت می‌توانید به تبادل پیام و چت بپردازید."
}

const SuggestionComplaintButtonStep = {
  element: ".tour-suggestion-complaint",
  intro: "این قسمت برای ثبت انتقادات و پیشنهادات در نظر گرفته شده است."
}

const SpecialistsButtonStep = {
  element: ".tour-specialists",
  intro: "در این قسمت می‌توانید متخصصین سامانه را مشاهده نمایید."
}

const CustomerNavbarSteps = [
  {
    element: ".tour-my-requests",
    intro: "در این قسمت لیست درخواست‌های ثبت شده خود را مشاهده می‌کنید."
  },
  {
    element: ".tour-request-service",
    intro: "در این قسمت می‌توانید درخواست جدید ثبت نمایید."
  },
  SpecialistsButtonStep,
  ChatStep,
  SuggestionComplaintButtonStep,
  UserProfileStep,
  NotificationIconStep,
  LogoutIconStep
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
  SpecialistsButtonStep,
  ChatStep,
  SuggestionComplaintButtonStep,
  UserProfileStep,
  NotificationIconStep,
  LogoutIconStep
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

const SearchNameStep = {
  element: ".tour-search-input-name",
  intro: "در این قسمت می‌توانید بخشی از نام یا نام‌کاربری را برای جست‌وجو وارد کنید."
}

const SearchPhoneStep = {
  element: ".tour-search-input-phone",
  intro: "در این قسمت می‌توانید شماره موبایل را برای جست‌وجو وارد کنید."
}

const SearchEmailStep = {
  element: ".tour-search-input-email",
  intro: "در این قسمت می‌توانید ایمیل را برای جست‌وجو وارد کنید."
}

const SearchRoleStep = {
  element: ".tour-search-input-role",
  intro: "در این قسمت می‌توانید نقش (نوع) کاربر را برای جست‌وجو وارد کنید."
}


const SearchSpecialtyStep = {
  element: ".tour-search-input-speciality",
  intro: "در این قسمت می‌توانید تخصص‌های مدنظر را برای جست‌وجو وارد کنید."
}

const SearchSortStep = {
  element: ".tour-search-input-sort",
  intro: "در این قسمت می‌توانید معیار مرتب‌سازی را مشخص نمایید."
}

const SearchButtonStep = {
  element: ".tour-search-button",
  intro: "با کلیک بر این دکمه جست‌وجو انجام می‌شود."
}

const SearchButtonClearStep = {
  element: ".tour-search-button-clear",
  intro: "با کلیک بر این دکمه فیلتر‌های جست‌وجو همگی پاک می‌شوند."
}

const InputComplaintTypeStep = {
  element: ".tour-input-complaint-type",
  intro: "در این قسمت می‌توانید نوع بازخورد (پیشنهاد، انتقاد، بازخورد فنی) را مشخص کنید."
}

const InputComplaintDescriptionStep = {
  element: ".tour-input-complaint-description",
  intro: "در این قسمت می‌توانید توضیحات بازخورد را وارد کنید."
}

const InputComplaintSubmitStep = {
  element: ".tour-button-submit-complaint",
  intro: "با کلیک بر این دکمه بازخورد را ثبت نمایید."
}


export const MyRequestsStatusSteps = [
  {
    element: ".tour-my-requests-status",
    intro: "در این قسمت می‌توانید وضعیت درخواست‌های خود را مشاهده نمایید."
  }
]


const ManageSpecialitiesSearchCategoryStep = {
  element: ".tour-manage-specialities-search-category",
  intro: "در این قسمت می‌توانید دسته‌بندی تخصص را برای جست‌وجو وارد کنید."
}

const ManageSpecialitiesSearchTitleStep = {
  element: ".tour-manage-specialities-search-title",
  intro: "در این قسمت می‌توانید عنوان تخصص را برای جست‌وجو وارد کنید."
}

const ManageSpecialitiesSearchTableStep = {
  element: ".tour-manage-specialities-search-table",
  intro: "در این قسمت می‌توانید تخصص‌های موجود را مشاهده نمایید."
}


const ManageSpecialitiesInputTitleStep = {
  element: ".tour-manage-specialities-input-title",
  intro: "در این قسمت عنوان تخصص را وارد کنید."
}

const ManageSpecialitiesInputCategoryStep = {
  element: ".tour-manage-specialities-input-category",
  intro: "در این قسمت دسته‌بندی تخصص را انتخاب کنید."
}

const ManageSpecialitiesInputDescriptionStep = {
  element: ".tour-manage-specialities-input-description",
  intro: "در این قسمت توضیحات تخصص را وارد کنید."
}

const ManageSpecialitiesInputSubmitStep = {
  element: ".tour-manage-specialities-input-submit",
  intro: "با کلیک بر این دکمه تخصص جدید را ثبت نمایید."
}



const NotificationMarkAllStep = {
    element: ".tour-mark-all-as-read",
    intro: "با کلیک بر این دکمه، همه نوتیفیکشن‌ها به حالت خوانده شده تبدیل می‌شوند."
}

const NotificationPageStep = {
    element: ".tour-notification-page",
    intro: "در این قسمت می‌توانید نوتیفیکشن‌های خود را مشاهده نمایید."
}

const RequestDetailsInfoStep ={
  element: ".tour-request-details-info",
  intro: "در این قسمت می‌توانید اطلاعات درخواست را مشاهده نمایید."
}

export const RequestDetailsStateSteps =[
    RequestDetailsInfoStep
]

export const NotificationSteps = [
    NotificationPageStep,
    NotificationMarkAllStep
]

export const ManageSpecialitiesSearchSteps = [
  ManageSpecialitiesSearchCategoryStep,
  ManageSpecialitiesSearchTitleStep,
  ManageSpecialitiesSearchTableStep

]

export const ManageSpecialitiesInputSteps = [
  ManageSpecialitiesInputTitleStep,
  ManageSpecialitiesInputCategoryStep,
  ManageSpecialitiesInputDescriptionStep,
  ManageSpecialitiesInputSubmitStep
]


export const SpecialistListSteps = [
  SearchNameStep,
  SearchSpecialtyStep,
  SearchSortStep,
  SearchButtonStep,
  SearchButtonClearStep,
  {
    element: ".tour-specialist-list",
    intro: "در این قسمت می‌توانید لیست متخصصین را مشاهده نمایید."
  }
]


export const SuggestionComplaintSteps = [
  InputComplaintTypeStep,
  InputComplaintDescriptionStep,
  InputComplaintSubmitStep
]


