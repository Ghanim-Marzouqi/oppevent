import React, { useState, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import history from "./services/history";
import Routes from "./routes";

// import contexts
import UserContext from "./context/UserContext";
import EventContext from "./context/EventContext";
import ContextDevTool from "react-context-devtool";

// RTL support
import RTL from "./utils/RTL";

// create a global team
const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: "DroidKufi"
  }
});

const App = () => {
  // create states for user and events
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(null);

  // create memo for both states, so they render only when changes happend
  const userValueProvider = useMemo(() => ({ user, setUser }), [user, setUser]);
  const eventValueProvider = useMemo(() => ({ events, setEvents }), [
    events,
    setEvents
  ]);

  return (
    <UserContext.Provider value={userValueProvider}>
      <ContextDevTool
        context={UserContext}
        id="UserContext"
        displayName="UserContext"
      />
      <EventContext.Provider value={eventValueProvider}>
        <ContextDevTool
          context={EventContext}
          id="EventContext"
          displayName="EventContext"
        />
        <ThemeProvider theme={theme}>
          <RTL>
            <Router basename={window.location.pathname || ""} history={history}>
              <Routes />
            </Router>
          </RTL>
        </ThemeProvider>
      </EventContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
