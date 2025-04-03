"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";


export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body
          // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </Provider>
  );
}

