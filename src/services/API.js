import axios from "axios";
import {
  AUTH_URL,
  ADD_USER_URL,
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
      console.log(`AUTH SUCCESS: ${message}`);
      return user;
    } else {
      console.log(`AUTH FAILURE: ${message}`);
      return null;
    }
  } catch (error) {
    console.log(`AUTH ERROR: ${error}`);
    return null;
  }
};

// add new user
export const createUser = async (
  username,
  password,
  name,
  email,
  department
) => {
  try {
    // call API
    const response = await axios.post(ADD_USER_URL, {
      username,
      password,
      name,
      email,
      department
    });

    // get data from response
    const data = response.data;
    const status = data.status;
    const message = data.message;

    // check response status
    if (status === "success") {
      const results = data.results;
      console.log(`CREATE USER SUCCESS: ${message}`);
      return results;
    } else {
      console.log(`CREATE USER FAILURE: ${message}`);
      return null;
    }
  } catch (error) {
    console.log(`CREATE USER ERROR: ${error}`);
    return null;
  }
};

// fetch events
export const getEvents = async (username, category) => {
  try {
    // call API
    const response = await axios.get(
      `${FETCH_EVENTS_URL}?username=${username}&category=${category}`
    );

    // get data from response
    const data = response.data;
    const status = data.status;
    const message = data.message;

    // check response status
    if (status === "success") {
      const results = data.results;
      console.log(`AUTH SUCCESS: ${message}`);
      return results;
    } else {
      console.log(`AUTH FAILURE: ${message}`);
      return [];
    }
  } catch (error) {
    console.log(`AUTH ERROR: ${error}`);
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
      endDate: event.end,
      canView: event.canView,
      canDelete: event.canDelete,
      canUpdate: event.canUpdate
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
    formData.append("canView", event.canView);
    formData.append("canDelete", event.canDelete);
    formData.append("canUpdate", event.canUpdate);

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
      endDate: event.end,
      canView: event.canView,
      canDelete: event.canDelete,
      canUpdate: event.canUpdate
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
    formData.append("canView", event.canView);
    formData.append("canDelete", event.canDelete);
    formData.append("canUpdate", event.canUpdate);

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
