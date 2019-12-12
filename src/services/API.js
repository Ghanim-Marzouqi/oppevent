import axios from "axios";
import {
  AUTH_URL,
  FETCH_EVENTS_URL,
  ADD_EVENT_URL,
  ADD_EVENT_WITH_FILE_URL,
  EDIT_EVENT_URL,
  EDIT_EVENT_WITH_FILE_URL,
  REMOVE_EVENT_URL
} from "../constants";

// authenticate user
export const authenticateUser = async (username, password, type) => {
  try {
    // call API
    const response = await axios.post(`${AUTH_URL}?type=${type}`, {
      username,
      password
    });

    // get data from response
    const data = response.data;
    const status = data.status;
    const message = data.message;

    // check response status
    if (status === "success") {
      const user = data.results[0];
      console.log(message);
      return user;
    } else {
      console.log(message);
      return null;
    }
  } catch (error) {
    return new Error("حدث خطأ اثناء التحقق من هوية المستخدم");
  }
};

// fetch updated events
export const getUpdatedEvents = async username => {
  try {
    // call API
    const response = await axios.get(
      `${FETCH_EVENTS_URL}?username=${username}`
    );

    // get data from response
    const data = response.data;
    const status = data.status;
    const message = data.message;

    // check response status
    if (status === "success") {
      const results = data.results;
      return results;
    } else {
      console.log(message);
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

// add new event
export const addNewEvent = async (username, allDay, isFile, event) => {
  console.log(`Before create an event ${JSON.stringify(event)}`);

  // check if file included in request
  if (isFile === "NO_FILE") {
    // construct request data
    const formDate = {
      title: event.title,
      desc: event.desc,
      startDate: event.start,
      endDate: event.end
    };

    // call API
    const response = await axios.post(
      `${ADD_EVENT_URL}?username=${username}&allDay=${allDay}`,
      formDate
    );

    // get data from response
    const data = response.data;
    const status = data.status;
    const message = data.message;

    // check response status
    if (status === "success") {
      const results = data.results;
      alert(message);
      return results;
    } else {
      alert(message);
      return {};
    }
  } else if (isFile === "FILE") {
    // construct request data
    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("desc", event.desc);
    formData.append("startDate", event.start);
    formData.append("endDate", event.end);
    formData.append("file", event.file);

    // call API
    const response = await axios.post(
      `${ADD_EVENT_WITH_FILE_URL}?username=${username}&allDay=${allDay}`,
      formData
    );

    // get data from response
    const data = response.data;
    const status = data.status;
    const message = data.message;

    // check response status
    if (status === "success") {
      const results = data.results;
      alert(message);
      return results;
    } else {
      alert(message);
      return {};
    }
  }
};

// update event
export const updateEvent = async (username, allDay, isFile, event) => {
  // check if file included in request
  if (isFile === "NO_FILE") {
    // construct request data
    const formDate = {
      title: event.title,
      desc: event.desc,
      startDate: event.start,
      endDate: event.end
    };

    // call API
    const response = await axios.patch(
      `${EDIT_EVENT_URL}/${event.eventId}?username=${username}&allDay=${allDay}`,
      formDate
    );

    // get data from response
    const data = response.data;
    const status = data.status;
    const message = data.message;

    // check response status
    if (status === "success") {
      const results = data.results;
      alert(message);
      return results;
    }
  } else if (isFile === "FILE") {
    // construct request data
    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("desc", event.desc);
    formData.append("startDate", event.start);
    formData.append("endDate", event.end);
    formData.append("file", event.file);

    console.log(formData);

    // call API
    const response = await axios.patch(
      `${EDIT_EVENT_WITH_FILE_URL}/file/${event.eventId}?username=${username}&allDay=${allDay}`,
      formData
    );

    // get data from response
    const data = response.data;
    const status = data.status;
    const message = data.message;

    // check response status
    if (status === "success") {
      const results = data.results;
      alert(message);
      return results;
    } else {
      alert(message);
      return {};
    }
  }
};

// delete event
export const deleteEvent = async (username, event) => {
  // call API
  const response = await axios.delete(
    `${REMOVE_EVENT_URL}/${event.eventId}?username=${username}`
  );

  // get response status
  const data = response.data;
  const message = data.message;
  const results = data.results;

  alert(message);

  return results;
};
