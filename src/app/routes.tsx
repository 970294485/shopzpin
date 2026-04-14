import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Features } from "./pages/Features";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { PricingPage } from "./pages/PricingPage";
import { ApiDocs } from "./pages/ApiDocs";
import { Contact } from "./pages/Contact";
import { EcommerceGuide } from "./pages/EcommerceGuide";
import { UserManual } from "./pages/UserManual";
import { Careers } from "./pages/Careers";
import { Partners } from "./pages/Partners";
import { VideoPage } from "./pages/VideoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "features", Component: Features },
      { path: "integrations", Component: IntegrationsPage },
      { path: "pricing", Component: PricingPage },
      { path: "api-docs", Component: ApiDocs },
      { path: "contact", Component: Contact },
      { path: "ecommerce-guide", Component: EcommerceGuide },
      { path: "user-manual", Component: UserManual },
      { path: "careers", Component: Careers },
      { path: "partners", Component: Partners },
      { path: "videos", Component: VideoPage },
    ],
  },
]);