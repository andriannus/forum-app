import { BottomNavigationBarMenu } from "./bottom-navigation-bar.model";

export const MENUS: BottomNavigationBarMenu[] = [
  {
    icon: "house",
    id: "LnkHome",
    name: "home",
    title: "Beranda",
    to: "/",
  },
  {
    icon: "comment-medical",
    id: "LnkDiscuss",
    name: "home",
    title: "Berdiskusi",
    to: "/threads/create",
  },
  {
    icon: "ranking-star",
    id: "LnkLeaderboards",
    name: "leaderboards",
    title: "Klasemen",
    to: "/leaderboards",
  },
];
