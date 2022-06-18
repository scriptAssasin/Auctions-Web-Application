import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//       <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
//       <Redirect from="/" to="/auth" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
