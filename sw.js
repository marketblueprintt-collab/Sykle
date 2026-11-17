// Sykle bildirim servisi: sadece telefona gelen haber bildirimlerini gösterir (sayfa önbelleği yok, güncellemeler etkilenmez)
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: "Sykle", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Sykle", { body: d.body || "", tag: d.tag || "sykle", icon: "icon.png", badge: "icon.png" }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(L => {
    for (const c of L) { if ("focus" in c) return c.focus(); }
    return self.clients.openWindow("./");
  }));
});
