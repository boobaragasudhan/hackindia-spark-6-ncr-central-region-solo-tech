"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBox() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [showGuestInput, setShowGuestInput] = useState(false);
  const [guestName, setGuestName] = useState("");

  // Loading state — tiny pill
  if (status === "loading") {
    return (
      <div style={pillStyle}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#fbbf24", animation: "pulse 1.5s infinite" }} />
        <span style={{ fontSize: "12px", color: "#777" }}>Loading...</span>
      </div>
    );
  }

  // Logged in — tiny pill with avatar
  if (session?.user) {
    return (
      <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 100 }}>
        {open && (
          <div style={{
            ...popupStyle,
            bottom: "44px",
            left: 0,
          }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "2px" }}>
              {session.user.name || "User"}
            </div>
            <div style={{ fontSize: "11px", color: "#666", marginBottom: "10px" }}>
              {session.user.email || "Guest Mode"}
            </div>
            <div style={{ fontSize: "11px", color: "#10b981", marginBottom: "10px" }}>✅ Progress saved</div>
            <button
              onClick={() => signOut()}
              style={{
                width: "100%", padding: "6px", backgroundColor: "transparent", border: "1px solid #333",
                borderRadius: "6px", color: "#888", cursor: "pointer", fontSize: "11px", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; }}
            >
              Sign Out
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          style={{
            ...pillStyle,
            cursor: "pointer",
            border: open ? "1px solid #10b981" : "1px solid #2a2a2a",
          }}
        >
          {session.user.image ? (
            <img src={session.user.image} alt="" style={{ width: "22px", height: "22px", borderRadius: "50%" }} />
          ) : (
            <div style={{
              width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#10b981",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#000",
            }}>
              {(session.user.name || "U")[0].toUpperCase()}
            </div>
          )}
          <span style={{ fontSize: "12px", color: "#ccc", fontWeight: 500 }}>
            {session.user.name || "User"}
          </span>
        </button>
      </div>
    );
  }

  // Logged out — tiny "Sign in" pill
  return (
    <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 100 }}>
      {open && (
        <div style={{
          ...popupStyle,
          bottom: "44px",
          left: 0,
        }}>
          <div style={{ fontSize: "12px", color: "#888", marginBottom: "10px" }}>Sign in to save progress</div>

          {/* Guest Sign In */}
          {!showGuestInput ? (
            <button
              onClick={() => setShowGuestInput(true)}
              style={{
                width: "100%", padding: "8px", backgroundColor: "#1a1a1a", border: "1px solid #333",
                borderRadius: "6px", color: "#ccc", cursor: "pointer", fontSize: "12px", fontWeight: 500,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#10b981"; e.currentTarget.style.color = "#10b981"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#ccc"; }}
            >
              👤 Enter your name
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signIn("guest", { name: guestName || "Guest", redirect: false });
                setOpen(false);
              }}
              style={{ display: "flex", gap: "6px" }}
            >
              <input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your name"
                autoFocus
                style={{
                  flex: 1, padding: "7px 10px", backgroundColor: "#0f0f0f", border: "1px solid #333",
                  borderRadius: "6px", color: "#fff", fontSize: "12px", outline: "none", width: "100px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "7px 12px", backgroundColor: "#10b981", border: "none", borderRadius: "6px",
                  color: "#000", fontWeight: 600, cursor: "pointer", fontSize: "12px",
                }}
              >
                Go
              </button>
            </form>
          )}
        </div>
      )}
      <button
        onClick={() => { setOpen(!open); setShowGuestInput(false); }}
        style={{
          ...pillStyle,
          cursor: "pointer",
          border: open ? "1px solid #10b981" : "1px solid #2a2a2a",
        }}
      >
        <div style={{
          width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#333",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px",
        }}>
          👤
        </div>
        <span style={{ fontSize: "12px", color: "#aaa", fontWeight: 500 }}>Sign in</span>
      </button>
    </div>
  );
}

const pillStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 14px 6px 8px",
  backgroundColor: "rgba(20, 20, 20, 0.85)",
  backdropFilter: "blur(12px)",
  border: "1px solid #2a2a2a",
  borderRadius: "999px",
  zIndex: 100,
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const popupStyle: React.CSSProperties = {
  position: "absolute",
  width: "200px",
  backgroundColor: "rgba(20, 20, 20, 0.95)",
  backdropFilter: "blur(16px)",
  border: "1px solid #2a2a2a",
  borderRadius: "12px",
  padding: "14px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  fontFamily: "system-ui, -apple-system, sans-serif",
};
