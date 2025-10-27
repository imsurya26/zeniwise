"use client";

import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setOffline(!navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="bg-yellow-300 text-black text-center py-2 px-4 text-sm font-medium">
      ⚠️ Offline Mode — Data stored locally
    </div>
  );
}
