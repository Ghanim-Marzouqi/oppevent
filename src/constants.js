// System Title
export const APP_TITLE = "مهامي";
export const CALANDER_CONTROL_NAMES = {
  date: "التاريخ",
  time: "الوقت",
  event: "الحدث",
  allDay: "كل اليوم",
  week: "الأسبوع",
  work_week: "جدول أعمال الأسبوع",
  day: "اليوم",
  month: "الشهر",
  previous: "خلف",
  next: "التالي",
  yesterday: "أمس",
  tomorrow: "غدا",
  today: "اليوم",
  agenda: "جدول الأعمال",
  noEventsInRange: "لا توجد أعمال لهذا اليوم",
  showMore: function showMore(total) {
    return "المزيد +" + total;
  }
};

// App Endpoints
const BASE_URL = process.env.REACT_APP_API_URL;
export const AUTH_URL = `${BASE_URL}/auth`;
export const ADD_USER_URL = `${BASE_URL}/auth/create`;
export const FETCH_CATEGORIES_URL = `${BASE_URL}/categories`;
export const FETCH_EVENTS_URL = `${BASE_URL}/events`;
export const FETCH_SINGLE_EVENT_URL = `${BASE_URL}/events`;
export const ADD_EVENT_URL = `${BASE_URL}/events`;
export const ADD_EVENT_WITH_FILE_URL = `${BASE_URL}/events/file`;
export const REMOVE_EVENT_URL = `${BASE_URL}/events`;
export const EDIT_EVENT_URL = `${BASE_URL}/events`;
export const EDIT_EVENT_WITH_FILE_URL = `${BASE_URL}/events/file`;
