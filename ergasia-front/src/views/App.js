import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Register from "views/examples/Register.js"

async function verifyToken(token) {
    await fetch(process.env.REACT_APP_API_LINK + "/api/users/current/", {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    })
        //.then(res => res.json())
        .then(
            (result) => {
                console.log(result.status);
                if (result.status == 401) {
                    localStorage.removeItem('token');
                    window.location.replace("/auth/login");
                }
                else {
                    localStorage.setItem('token', token);
                    // window.location.replace("/admin/index");

                }
            },

        )
};



function App() {
    const token = localStorage.getItem('token');

    if (!token) {
        if (window.location.href.includes('register')) {
            return (
                <BrowserRouter>
                    <Switch>
                    <Route path="/auth/register" render={(props) => <AuthLayout {...props} />} />

                    </Switch>
                </BrowserRouter>
            )
        }
        else {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                        <Redirect from="/" to="/auth" />
                    </Switch>
                </BrowserRouter>
            )
        }
    }
    else {
        verifyToken(token);

        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                    <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                    <Redirect from="/" to="/auth" />
                </Switch>
            </BrowserRouter>
        );
    }

}

export default App;
