import React from "react";

import S from "./Layout.module.css";

const Layout: React.FC = ({ children }) => (
  <main className={S.LayoutContainer}>{children}</main>
);
export default Layout;
