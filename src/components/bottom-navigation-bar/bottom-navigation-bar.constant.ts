import { BottomNavigationBarMenu } from "./bottom-navigation-bar.model";

export const MENUS: BottomNavigationBarMenu[] = [
  {
    icon: "house",
    id: "LnkHome",
    name: "home",
    title: "Home",
    to: "/",
  },
  {
    icon: "ranking-star",
    id: "LnkLeaderboards",
    name: "leaderboards",
    title: "Leaderboards",
    to: "/leaderboards",
  },
];
