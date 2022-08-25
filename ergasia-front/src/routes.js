
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import UserManagement from "views/examples/UserManagement.js";
import UserDetails from "views/examples/UserDetails.js";
import AuctionsManagement from "views/examples/AuctionsManagement.js";

var routes = [
  {
    path: "/index",
    name: "Αρχική",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users Management",
    icon: "ni ni-planet text-blue",
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/user/:id",
    name: "User Details",
    icon: "ni ni-planet text-blue",
    component: UserDetails,
    layout: "/admin",
  },
  {
    path: "/auctionsmanagement",
    name: "Auctions Management",
    icon: "ni ni-pin-3 text-orange",
    component: AuctionsManagement,
    layout: "/admin",
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
