import React, { useState, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import clsx from "clsx";
import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import localizer from "react-big-calendar/lib/localizers/globalize";
import globalize from "globalize";
import { useStyles } from "./event.style";
import "./event.css";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  Box,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Dialog
} from "@material-ui/core";
import { Menu, ChevronLeft, Notifications } from "@material-ui/icons";
import Copyright from "../../components/Copyright";
import Statistics from "../../components/Statistics";
import { mainListItems, secondaryListItems } from "../../components/ListItems";
import NewEventDialog from "../../components/NewEventDailog";
import EditEventDialog from "../../components/EditEventDialog";
import { CALANDER_CONTROL_NAMES } from "../../constants";
import {
  getUpdatedEvents,
  addNewEvent,
  updateEvent,
  deleteEvent
} from "../../services/API";
import history from "../../services/history";

import UserContext from "../../context/UserContext";
import EventContext from "../../context/EventContext";

// load Language Support for Arabic
require("globalize/lib/cultures/globalize.culture.ar-AE");

// set global localizer
const globalizeLocalizer = localizer(globalize);

const EventPage = () => {
  // styles
  const classes = useStyles();

  // contexts
  const { user, setUser } = useContext(UserContext);
  const { events, setEvents } = useContext(EventContext);

  // initial states
  const initialEvent = {
    eventId: "",
    title: "",
    desc: "",
    start: "",
    end: "",
    file: null,
    allDay: 1
  };

  // states
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isVisible, setVisibility] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [isActive, setActive] = useState(false);
  const [event, setEvent] = useState(initialEvent);

  // handle drawer open
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  // handle drawer close
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // handle event select
  const handleEventSelect = event => {
    setDialogType("SELECT_EVENT");

    const newEvent = {
      eventId: event.eventId,
      title: event.title,
      start: event.start,
      end: event.end,
      desc: event.desc,
      allDay: event.allDay,
      file: event.file
    };

    console.log(`Selected Event: ${JSON.stringify(newEvent)}`);

    setEvent(newEvent);

    setVisibility(true);
  };

  // handle dates select
  const handleSelect = ({ start, end }) => {
    // set dialog type
    setDialogType("CREATE_EVENT");

    setEvent({
      ...event,
      start: moment(start).format("YYYY-MM-DD HH:mm"),
      end: moment(end)
        .add(23, "hours")
        .add(59, "minutes")
        .format("YYYY-MM-DD HH:mm")
    });

    setVisibility(true);
  };

  // handle input change
  const handleInputChange = e => {
    const name = e.target.name;
    let value = null;

    // check for input type
    if (name === "allDay") {
      e.target.checked ? (value = 1) : (value = 0);
      // reset time values
      if (value === 1) {
        setStartTime("");
        setEndTime("");
      }
    } else if (name === "file") {
      console.log(e.target.files);
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }

    // set event
    setEvent({ ...event, [name]: value });
  };

  // handle date picker
  const handleDatePickerChange = ({ start, end }) => {
    setEvent({
      ...event,
      start: moment(start._i).format("YYYY-MM-DD HH:mm"),
      end: moment(end._i)
        .add(23, "hours")
        .add(59, "minutes")
        .format("YYYY-MM-DD HH:mm")
    });
  };

  // handle start time picker
  const handleStartTimePickerChange = time => {
    if (time !== null) {
      // update start date
      const startDate = moment(event.start).format("YYYY-MM-DD");
      setEvent({
        ...event,
        start: moment(startDate)
          .add(Number.parseInt(time.split(":")[0]), "hours")
          .add(Number.parseInt(time.split(":")[1]), "minutes")
          .format("YYYY-MM-DD HH:mm")
      });
      setStartTime(time);
    }
  };

  // handle end time picker
  const handleEndTimePickerChange = time => {
    if (time !== null) {
      // update start date
      const endDate = moment(event.end).format("YYYY-MM-DD");
      setEvent({
        ...event,
        end: moment(endDate)
          .add(Number.parseInt(time.split(":")[0]), "hours")
          .add(Number.parseInt(time.split(":")[1]), "minutes")
          .format("YYYY-MM-DD HH:mm")
      });
      setEndTime(time);
    }
  };

  // handle form submit
  const handleSubmit = async e => {
    e.preventDefault();

    console.log(
      `All Day: ${event.allDay} - Start Time: ${startTime} - End Time: ${endTime}`
    );

    // check for time
    if (event.file === null) {
      let allDayStr = "";
      if (event.allDay === 1) {
        allDayStr = "yes";
      } else if (event.allDay === 0 && startTime !== "" && endTime !== "") {
        allDayStr = "no";
      } else {
        alert("الرجاء إختيار أوقات المهمة");
        return;
      }

      // add event with no file
      const newEvent = await addNewEvent(
        user.username,
        allDayStr,
        "NO_FILE",
        event
      );

      // get updated event
      if (newEvent !== null) {
        const updatedEvents = await getUpdatedEvents(user.username);
        setEvents(updatedEvents);
      }
    } else {
      let allDayStr = "";
      if (event.allDay) {
        allDayStr = "yes";
      } else if (event.allDay !== 1 && startTime !== "" && endTime !== "") {
        allDayStr = "no";
      } else {
        alert("الرجاء إختيار أوقات المهمة");
        return;
      }

      // add event with a file
      const newEvent = await addNewEvent(
        user.username,
        allDayStr,
        "FILE",
        event
      );

      // get updated event
      if (newEvent !== null) {
        const updatedEvents = await getUpdatedEvents(user.username);
        setEvents(updatedEvents);
      }
    }

    // reset
    setEvent(initialEvent);
    setStartTime("");
    setEndTime("");

    setVisibility(false);
  };

  // handle Edit Toggle Button
  const handleEditToggle = e => {
    e.preventDefault();
    setEvent({
      ...event,
      file: null
    });
    setActive(true);
  };

  // handle Edit Submit Button
  const handleEditSubmit = async e => {
    e.preventDefault();

    // set start and end dates
    await setStartTime(event.start.split(" ")[1]);
    await setEndTime(event.end.split(" ")[1]);

    // check for time
    if (event.file === null) {
      let allDayStr = "";
      if (event.allDay) {
        allDayStr = "yes";
      } else if (event.allDay !== 1 && startTime !== "" && endTime !== "") {
        allDayStr = "no";
      } else {
        alert("الرجاء إختيار أوقات المهمة");
        return;
      }

      // edit event with no file
      const updatedEvent = await updateEvent(
        user.username,
        allDayStr,
        "NO_FILE",
        event
      );

      // get updated events
      if (updatedEvent !== null) {
        const updatedEvents = await getUpdatedEvents(user.username);
        setEvents(updatedEvents);
      }
    } else {
      let allDayStr = "";
      if (event.allDay) {
        allDayStr = "yes";
      } else if (event.allDay !== 1 && startTime !== "" && endTime !== "") {
        allDayStr = "no";
      } else {
        alert("الرجاء إختيار أوقات المهمة");
        return;
      }

      // update event with a file
      const updatedEvent = await updateEvent(
        user.username,
        allDayStr,
        "FILE",
        event
      );

      // get updated events
      if (updatedEvent !== null) {
        const updatedEvents = await getUpdatedEvents(user.username);
        setEvents(updatedEvents);
      }
    }

    // reset
    setEvent(initialEvent);
    setStartTime("");
    setEndTime("");

    setVisibility(false);
    setActive(true);
  };

  // handle Delete Button
  const handleDelete = async e => {
    e.preventDefault();

    const deletedEvent = await deleteEvent(user.username, event);

    if (deletedEvent !== null) {
      // get updated events
      const updatedEvents = await getUpdatedEvents(user.username);
      setEvents(updatedEvents);
    }

    setVisibility(false);
    setActive(false);
  };

  const handleDialogClose = () => {
    setEvent(initialEvent);
    setVisibility(false);
  };

  return user === null ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <div dir="rtl" className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              isDrawerOpen && classes.menuButtonHidden
            )}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            مهامي
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !isDrawerOpen && classes.drawerPaperClose
          )
        }}
        open={isDrawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Statistics */}
            <Statistics />
            {/* Calander */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Calendar
                  className="ar-AE"
                  style={{ height: 500, width: "100%" }}
                  selectable
                  localizer={globalizeLocalizer}
                  culture="ar-AE"
                  rtl={true}
                  events={events || []}
                  messages={CALANDER_CONTROL_NAMES}
                  defaultView={Views.MONTH}
                  defaultDate={new Date()}
                  onSelectEvent={event => handleEventSelect(event)}
                  onSelectSlot={handleSelect}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      <Dialog
        open={isVisible}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        {dialogType === "CREATE_EVENT" ? (
          <NewEventDialog
            event={event}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onStartTimePickerChange={handleStartTimePickerChange}
            onEndTimePickerChange={handleEndTimePickerChange}
            onDialogClose={handleDialogClose}
          />
        ) : (
          <EditEventDialog
            event={event}
            isActive={isActive}
            onEditToggle={handleEditToggle}
            onInputChange={handleInputChange}
            onEditDatePickerChange={handleDatePickerChange}
            onEditSubmit={handleEditSubmit}
            onDelete={handleDelete}
            onStartTimePickerChange={handleStartTimePickerChange}
            onEndTimePickerChange={handleEndTimePickerChange}
            onDialogClose={handleDialogClose}
          />
        )}
      </Dialog>
    </div>
  );
};

export default withRouter(EventPage);
