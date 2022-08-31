
import Index from "views/Index.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import UserManagement from "views/examples/UserManagement.js";
import UserDetails from "views/examples/UserDetails.js";
import AuctionsManagement from "views/examples/AuctionsManagement.js";
import AuctionsExplorer from "views/examples/Auctions.js";
import AuctionInfo from "views/examples/Auction.js";
import MyBids from "views/examples/MyBids.js";
import AuctionBids from "views/examples/AuctionBids.js";

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
  {
    path: "/auctionsexplorer",
    name: "Auctions Explorer",
    icon: "ni ni-pin-3 text-orange",
    component: AuctionsExplorer,
    layout: "/admin",
  },
  {
    path: "/auctioninfo/:id",
    name: "Auction Info",
    icon: "ni ni-pin-3 text-orange",
    component: AuctionInfo,
    layout: "/admin",
  },
  {
    path: "/mybids",
    name: "My Bids",
    icon: "ni ni-pin-3 text-orange",
    component: MyBids,
    layout: "/admin",
  },
  {
    path: "/auctionbids/:id",
    name: "Auction Bids",
    icon: "ni ni-pin-3 text-orange",
    component: AuctionBids,
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
