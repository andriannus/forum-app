import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faHouse,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/app";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./main.scss";

config.autoAddCss = false;
library.add(faArrowLeft, faHouse, faRankingStar);

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
