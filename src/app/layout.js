"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { I18nProvider } from "../i18n/I18nProvider";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <I18nProvider>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </I18nProvider>
    </Provider>
  );
}
