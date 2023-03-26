import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface BottomNavigationBarMenu {
  icon: IconProp;
  id: string;
  name: string;
  title: string;
  to: string;
}
