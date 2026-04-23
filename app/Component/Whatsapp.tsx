"use client";
import { useState } from "react";
import "./WhatsAppWidget.scss";

import Close from "./Assets/Close";
import { WhatsappIcon } from "./Assets/WhatsAppIcon";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const phoneNumber = "8801944111150";
  const message = "Hello! I need some help.";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <div className="whatsapp-widget">
      {/* Chat Card */}
      <div className={`chat-card ${open ? "open" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="d-flex align-items-center gap-2">
            <WhatsappIcon size={32} color="#fff" />
            <div>
              <p className="title mb-0">Mint</p>
              <span className="subtitle">WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="chat-body">
          <p className="response-time">
            Typically responds in under <b>15 minutes</b>
          </p>

          <div className="chat-bubble">
            Hello! Contact us for new internet connections, package details, or
            technical support.
          </div>

          <button
            className="btn btn-success w-100 start-btn"
            onClick={() => window.open(whatsappURL, "_blank")}
          >
            START CHAT →
          </button>
        </div>

        {/* Footer */}
        <div className="chat-footer">SECURE END-TO-END ENCRYPTION</div>
      </div>

      {/* Floating Button */}
      <div className="floating-btn" onClick={() => setOpen((prev) => !prev)}>
        {open ? <Close /> : <WhatsappIcon size={32} color="#fff" />}
      </div>
    </div>
  );
}
