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

export const SearchNameStep = {
  element: ".tour-search-input-name",
  intro: "در این قسمت می‌توانید بخشی از نام یا نام‌کاربری را برای جست‌وجو وارد کنید."
}

export const SearchPhoneStep = {
  element: ".tour-search-input-phone",
  intro: "در این قسمت می‌توانید شماره موبایل را برای جست‌وجو وارد کنید."
}

export const SearchEmailStep = {
  element: ".tour-search-input-email",
  intro: "در این قسمت می‌توانید ایمیل را برای جست‌وجو وارد کنید."
}

export const SearchRoleStep = {
  element: ".tour-search-input-role",
  intro: "در این قسمت می‌توانید نقش (نوع) کاربر را برای جست‌وجو وارد کنید."
}

export const SearchSpecialtyStep = {
  element: ".tour-search-input-speciality",
  intro: "در این قسمت می‌توانید تخصص‌های مدنظر را برای جست‌وجو وارد کنید."
}

export const SearchSortStep = {
  element: ".tour-search-input-sort",
  intro: "در این قسمت می‌توانید معیار مرتب‌سازی را مشخص نمایید."
}

export const SearchButtonStep = {
  element: ".tour-search-button",
  intro: "با کلیک بر این دکمه جست‌وجو انجام می‌شود."
}

export const SearchButtonClearStep = {
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

const SystemFeedbackMarkAllStep = {
  element: ".tour-mark-all-feedback-as-read",
  intro: "با کلیک بر این دکمه، وضعیت همه بازخوردها به حالت خوانده شده تغییر می‌یابد."
}


const SystemFeedbackTablelStep = {
  element: ".tour-system-feedback-table",
  intro: "در این قسمت بازخوردهای سیستم را مشاهده می‌کنید."
}
const AddEvalMetricStep = {
  element: ".tour-add-metric-button",
  intro: "با کلیک بر این دکمه، می‌توانید معیار ارزیابی جدید به سیستم اضافه کنید."
}


const EvalMetricTableStep = {
  element: ".tour-metric-table",
  intro: "در این قسمت معیارهای ارزیابی برای مشتری و متخصص را مشاهده و جست‌وجو می‌کنید."
}

const ReportFormStep = {
  element: ".tour-report-form",
  intro: "در این بخش می‌توانید لاگ‌های سیستمی را دریافت کنید."
}

const ReportFormTypeStep = {
  element: ".tour-report-type",
  intro: "در این قسمت می‌توانید نوع لاگ را انتخاب کنید."
}

const ReportFormDateStep = {
  element: ".tour-report-date",
  intro: "در این قسمت می‌توانید بازه زمانی لاگ را مشخص کنید."
}

const ReportFormSourceStep = {
  element: ".tour-report-source",
  intro: "در این قسمت می‌توانید منبع لاگ را بنویسید."
}

const ReportFormMessageStep = {
  element: ".tour-report-message",
  intro: "در این قسمت می‌توانید متن لاگ را بنویسید."
}

const ReportFormSubmitStep = {
  element: ".tour-report-submit",
  intro: "با کلیک بر این دکمه، جست‌وجوی لاگ انجام می‌شود."
}

export const ReportCSVStep = {
  element: ".tour-report-csv",
  intro: "با کلیک بر این دکمه، لاگ‌های انتخاب شده را به صورت فایل CSV دریافت می‌کنید."
}

export const ReportFormSteps = [
  ReportFormStep,
  ReportFormDateStep,
  ReportFormTypeStep,
  ReportFormSourceStep,
  ReportFormMessageStep,
  ReportFormSubmitStep,
]


export const EvalMetricSteps = [
  AddEvalMetricStep,
  EvalMetricTableStep
]

export const SystemFeedbackSteps = [
  SystemFeedbackTablelStep,
  SystemFeedbackMarkAllStep
]

const AddPolicyStep = {
  element: ".tour-add-policy",
  intro: "با کلیک بر این دکمه، می‌توانید سیاست امتیازی جدید را به سیستم اضافه کنید."
}

const PolicyTableStep = {
  element: ".tour-policy-table",
  intro: "در این قسمت سیاست‌های امتیازی برای حداکثر درخواست قابل انجام به صورت همزمان را مشاهده می‌کنید."
}

const ManagerCreateRequestFormStep = {
  element: ".tour-create-request-form",
  intro: "در این قسمت می‌توانید درخواست جدید را به صورت دستی برای مشتری ایجاد کنید."
}
const ManagerCreateRequestIdStep = {
  element: ".tour-create-request-id",
  intro: "در این قسمت آی‌دی مشتری را وارد نمایید."
}

const ManagerCreateRequestSpecialtyStep = {
  element: ".tour-create-request-specialty",
  intro: "در این قسمت تخصص لازم برای درخواست  را مشخص نمایید."
}


const ManagerCreateRequestDateStep = {
  element: ".tour-create-request-date",
  intro: "در این قسمت تاریخ شروع درخواست  را مشخص نمایید."
}

const ManagerCreateRequestAddressStep = {
  element: ".tour-create-request-address",
  intro: "با کلیک بر این دکمه آدرس درخواست  را ثبت نمایید."
}

const ManagerCreateRequestDescriptionStep = {
  element: ".tour-create-request-description",
  intro: "در این قسمت توضیحات درخواست  را بنویسید."
}

const ManagerCreateRequestSubmitStep = {
  element: ".tour-create-request-submit",
  intro: "با کلیک بر این دکمه، درخواست جدید را ثبت کنید."
}

export const ManagerCreateRequestSteps = [
  ManagerCreateRequestFormStep,
  ManagerCreateRequestIdStep,
  ManagerCreateRequestSpecialtyStep,
  ManagerCreateRequestDateStep,
  ManagerCreateRequestAddressStep,
  ManagerCreateRequestDescriptionStep,
  ManagerCreateRequestSubmitStep
]


const QuickSelectStep = {
  element: ".tour-quick-select",
  intro: "در این قسمت می‌توانید فیلترهای ترکیبی را به صورت سریع اعمال کنید."
}

const QuickSelectCustomerBasedOnScoreStep = {
  element: ".tour-customer-based-on-score",
  intro: "با کلیک بر این دکمه می‌توانید  فیلتر مرتب‌سازی مشتریان بر اساس امتیاز را به صورت سریع اعمال کنید."
}

const QuickSelectSpecialistBasedOnScoreStep = {
  element: ".tour-specialist-based-on-score",
  intro: "با کلیک بر این دکمه می‌توانید فیلتر مرتب‌سازی متخصصان بر اساس امتیاز به صورت سریع اعمال کنید."
}

const QuickSelectManagerStep = {
  element: ".tour-managers-quick-select",
  intro: "با کلیک بر این دکمه می‌توانید فیلتر انتخاب مدیران به صورت سریع اعمال کنید."
}

const ManageUsersUserTableStep = {
  element: ".tour-manage-users-user-table",
  intro: "در این قسمت لیست کاربران سیستم را مشاهده می‌کنید."
}


export const ManageUsersTab1Steps = [
  ManageUsersUserTableStep,
  QuickSelectStep,
  QuickSelectCustomerBasedOnScoreStep,
  QuickSelectSpecialistBasedOnScoreStep,
  QuickSelectManagerStep,
  SearchNameStep,
  SearchPhoneStep,
  SearchEmailStep,
  SearchRoleStep,
  SearchSpecialtyStep,
  SearchSortStep,
  SearchButtonClearStep,
  SearchButtonStep


]


const ManageUsersSpecialistValidationTableStep = {
  element: ".tour-manage-users-specialist-validation-table",
  intro: "در این قسمت لیست متخصصان تایید نشده را مشاهده می‌کنید."
}

export const ManageUsersTab2Steps = [
  ManageUsersSpecialistValidationTableStep
]

const ManageUsersAddManagerFormStep = {
  element: ".manage-users-create-manager-form",
  intro: "در این قسمت می‌توانید مدیر جدید را به صورت دستی ایجاد کنید."
}

const ManagerUsersAddManagerRoleStep = {
  element: ".manage-users-create-manager-role",
  intro: "در این قسمت نوع مدیر (مدیر شرکت یا مدیر فنی) را مشخص نمایید."
}

const ManageUsersAddManagerFirstNameStep = {
  element: ".manage-users-create-manager-first-name",
  intro: "در این قسمت نام مدیر را وارد نمایید."
}

const ManageUsersAddManagerLastNameStep = {
  element: ".manage-users-create-manager-last-name",
  intro: "در این قسمت نام خانوادگی مدیر را وارد نمایید."
}

const ManageUsersAddManagerPhoneStep = {
  element: ".manage-users-create-manager-phone",
  intro: "در این قسمت شماره تلفن مدیر را وارد نمایید."
}

const ManageUsersAddManagerUsernameStep = {
  element: ".manage-users-create-manager-username",
  intro: "در این قسمت نام کاربری مدیر را وارد نمایید."
}

const ManageUsersAddManagerEmailStep = {
  element: ".manage-users-create-manager-email",
  intro: "در این قسمت ایمیل مدیر را وارد نمایید."
}


const ManageUsersAddManagerPasswordStep = {
  element: ".manage-users-create-manager-password",
  intro: "در این قسمت رمز عبور مدیر را وارد نمایید."
}

const ManageUsersAddManagerConfirmPasswordStep = {
  element: ".manage-users-create-manager-confirm-password",
  intro: "در این قسمت رمز عبور مدیر را دوباره وارد نمایید."
}

const ManageUsersAddManagerSubmitStep = {
  element: ".manage-users-create-manager-submit",
  intro: "با کلیک بر این دکمه مدیر جدید را ثبت کنید."
}

export const ManageUsersTab3Steps = [
  ManageUsersAddManagerFormStep,
  ManagerUsersAddManagerRoleStep,
  ManageUsersAddManagerFirstNameStep,
  ManageUsersAddManagerLastNameStep,
  ManageUsersAddManagerPhoneStep,
  ManageUsersAddManagerUsernameStep,
  ManageUsersAddManagerEmailStep,
  ManageUsersAddManagerPasswordStep,
  ManageUsersAddManagerConfirmPasswordStep,
  ManageUsersAddManagerSubmitStep
]


export const PolicySteps = [
  AddPolicyStep,
  PolicyTableStep
]

const NotificationPageStep = {
  element: ".tour-notification-page",
  intro: "در این قسمت می‌توانید نوتیفیکشن‌های خود را مشاهده نمایید."
}

const RequestDetailsInfoStep = {
  element: ".tour-request-details-info",
  intro: "در این قسمت می‌توانید اطلاعات درخواست را مشاهده نمایید."
}

export const RequestDetailsSelectedSpecialistStep = {
  element: ".tour-request-details-selected-specialist",
  intro: "در این قسمت می‌توانید اطلاعات متخصص را مشاهده نمایید."
}

export const RequestDetailsEditRequestButtonStep = {
  element: ".tour-request-details-edit-button",
  intro: "با کلیک بر این دکمه می‌توانید درخواست را ویرایش نمایید."
}

export const RequestDetailsShowSpecialistButtonStep = {
  element: ".tour-show-specialist-button",
  intro: "با کلیک بر این دکمه می‌توانید لیست متخصصان را مشاهده نمایید."
}

export const RequestDetailsChooseSpecialistButtonStep = {
  element: ".tour-choose-specialist-button-1",
  intro: "با کلیک بر این دکمه می‌توانید از متخصص برای انجام این کار درخواست کنید."

}

export const RequestDetailsAcceptRejectSpecialistDividerStep = {
  element: ".tour-request-details-accept-or-reject-specialist",
  intro: "در این قسمت می‌توانید مشخصات متخصصی که برای درخواست اعلام آمادگی کرده را مشاهده نمایید."
}

export const RequestDetailsAcceptSpecialistStep = {
  element: ".tour-request-details-accept-specialist",
  intro: "با کلیک بر این گزینه می‌توانید متخصص را برای انجام درخواست تایید کنید."
}

export const RequestDetailsRejectSpecialistStep = {
  element: ".tour-request-details-reject-specialist",
  intro: "با کلیک بر این گزینه می‌توانید متخصص را برای انجام درخواست رد کنید."
}

export const RequestDetailsAcceptRequestFromSpecialistStep = {
  element: ".tour-request-details-accept-from-specialist-button",
  intro: "با کلیک بر این دکمه می‌توانید آمادگی اولیه خود را برای انجام درخواست اعلام کنید."
}

export const RequestDetailsChatToCustomerStep = {
  element: ".tour-request-details-send-message-to-customer-button",
  intro: "با کلیک بر این دکمه می‌توانید با مشتری درخواست‌دهنده چت کنید."
}

export const RequestDetailsCompleteRequestStep = {
  element: ".tour-request-details-complete-request-button",
  intro: "با کلیک بر این دکمه می‌توانید اتمام درخواست را اعلام نمایید."
}

export const RequestDetailsSubmitFeedbackStep = {
  element: ".tour-request-details-submit-feedback",
  intro: "با کلیک بر روی این دکمه می توانید بازخورد خود را نسبت به درخواست ثبت کنید."
}


export const RequestDetailsAcceptCustomerRequestFromSpecialistStep = {
  element: ".tour-request-details-accept-customer-request-from-specialist",
  intro: "با کلیک بر روی این دکمه می‌توانید درخواست مشتری برای انجام درخواست را بپذیرید."
}

export const RequestDetailsRejectCustomerRequestFromSpecialistStep = {
  element: ".tour-request-details-reject-customer-request-from-specialist",
  intro: "با کلیک بر روی این دکمه می‌توانید درخواست مشتری برای انجام درخواست را رد کنید."
}


export const CustomerRequestTableStep = {
  element: ".tour-customer-request-table",
  intro: "در این قسمت درخواست‌های مشتریان را که منتظر متخصصی برای انجام هستند مشاهده می‌کنید."
}

export const ChatTableStep = {
  element: ".tour-chat-table",
  intro: "در این قسمت چت‌های خود را در صورت وجود مشاهده می‌کنید و با کلیک بر روی‌ آن‌ها وارد چت با آن فرد خواهید شد."
}

export const ChatBackStep = {
  element: ".tour-back-to-chat-list",
  intro: "با کلیک کردن بر این دکمه به صفحه مربوط به لیست چت‌ها باز می‌گردید."
}

export const ChatInputStep = {
  element: ".tour-chat-input",
  intro: "در این قسمت می‌توانید متن پیام را بنویسید."
}

export const ChatSendStep = {
  element: ".tour-chat-send",
  intro: "با کلیک کردن بر این دکمه پیام شما ارسال می‌شود."
}


export const SingleChatSteps = [
  ChatInputStep,
  ChatSendStep,
  ChatBackStep
]

export const ChatSteps = [
  ChatTableStep,
]

export const CustomerRequestStep = [
  CustomerRequestTableStep
]


export const RequestDetailsStateSteps = [
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

export const SpecialistListStep = {
  element: ".tour-specialist-list",
  intro: "در این قسمت می‌توانید لیست متخصصین را مشاهده نمایید."
}


export const SpecialistListSteps = [
  SearchNameStep,
  SearchSpecialtyStep,
  SearchSortStep,
  SearchButtonStep,
  SearchButtonClearStep,
  SpecialistListStep
]


export const SuggestionComplaintSteps = [
  InputComplaintTypeStep,
  InputComplaintDescriptionStep,
  InputComplaintSubmitStep
]


