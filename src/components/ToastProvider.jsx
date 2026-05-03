"use client";

import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={4700}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      draggableDirection="x"
      icon={false}
      closeButton
      toastClassName={(context) =>
        `tutoy-toast ${context?.type ? `tutoy-toast--${context.type}` : ""}`
      }
      bodyClassName={() => "tutoy-toast__body"}
    />
  );
}
