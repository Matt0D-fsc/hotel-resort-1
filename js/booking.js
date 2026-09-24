(() => {
  const stays = {
    "garden-bungalow": { name: "Garden Bungalow", rate: 26000, capacity: 2, image: "stay-garden-bungalow.webp" },
    "garden-suite": { name: "Garden Suite", rate: 32000, capacity: 2, image: "stay-garden-suite.webp" },
    "beach-villa": { name: "Beach Villa", rate: 40000, capacity: 2, image: "stay-beach-villa.webp" },
    "family-beach-villa": { name: "Family Beach Villa", rate: 52000, capacity: 4, image: "stay-family-villa.webp" },
    "mermaid-suite": { name: "Mermaid Suite", rate: 35000, capacity: 4, image: "stay-mermaid-suite.webp" },
    "pool-suite": { name: "Pool Suite", rate: 50000, capacity: 2, image: "stay-pool-suite.webp" },
    "beach-house": { name: "Friends & Family Beach House", rate: 40000, capacity: 4, image: "stay-beach-house.webp" }
  };
  const form = document.querySelector("#booking-form");
  if (!form) return;
  const fields = Object.fromEntries(["stay", "checkin", "checkout", "adults", "children", "name", "phone", "email", "notes"].map((id) => [id, document.getElementById(id)]));
  const summary = Object.fromEntries(["image", "name", "dates", "guests", "nights", "rate", "total"].map((id) => [id, document.getElementById(`summary-${id}`)]));
  const warning = document.querySelector("#booking-warning");
  const taka = (value) => `৳${new Intl.NumberFormat("en-BD").format(value)}`;
  const day = 86400000;
  const today = new Date();
  const todayISO = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())).toISOString().slice(0, 10);
  const addDays = (iso, amount) => new Date(Date.parse(`${iso}T00:00:00Z`) + amount * day).toISOString().slice(0, 10);
  fields.checkin.min = todayISO;
  fields.checkout.min = addDays(todayISO, 1);
  const requested = new URLSearchParams(location.search).get("stay");
  if (requested && stays[requested]) fields.stay.value = requested;
  function nightsBetween() {
    const arrival = Date.parse(`${fields.checkin.value}T00:00:00Z`);
    const departure = Date.parse(`${fields.checkout.value}T00:00:00Z`);
    return Number.isFinite(arrival) && Number.isFinite(departure) ? Math.round((departure - arrival) / day) : 0;
  }
  function refresh() {
    const stay = stays[fields.stay.value];
    const nights = nightsBetween();
    const adults = Number(fields.adults.value);
    const children = Number(fields.children.value);
    if (stay) {
      summary.name.textContent = stay.name;
      summary.image.src = `assets/img/${stay.image}`;
      summary.image.alt = `${stay.name} at Mermaid Beach Resort`;
      summary.rate.textContent = `${taka(stay.rate)} / night`;
    } else {
      summary.name.textContent = "Your stay awaits.";
      summary.image.src = "assets/img/stay-beach-villa.webp";
      summary.image.alt = "Beach Villa at Mermaid Beach Resort";
      summary.rate.textContent = "Select a stay";
    }
    summary.dates.textContent = fields.checkin.value && fields.checkout.value ? `${fields.checkin.value} → ${fields.checkout.value}` : "Choose your dates";
    summary.guests.textContent = `${adults} adult${adults === 1 ? "" : "s"}${children ? ` · ${children} child${children === 1 ? "" : "ren"}` : ""}`;
    summary.nights.textContent = nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "—";
    summary.total.textContent = stay && nights > 0 ? taka(stay.rate * nights) : "—";
    if (fields.checkin.value) fields.checkout.min = addDays(fields.checkin.value, 1);
    if (stay && adults > stay.capacity) warning.textContent = `${stay.name} is listed for up to ${stay.capacity} guests. Please choose a larger stay or call the team about multiple rooms.`;
    else if (warning.dataset.transient !== "true") warning.textContent = "";
  }
  fields.checkin.addEventListener("change", () => {
    if (fields.checkout.value && fields.checkout.value <= fields.checkin.value) fields.checkout.value = "";
    refresh();
  });
  [fields.stay, fields.checkout, fields.adults, fields.children].forEach((field) => field.addEventListener("change", () => { warning.dataset.transient = "false"; refresh(); }));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    warning.dataset.transient = "false";
    if (!form.reportValidity()) return;
    const stay = stays[fields.stay.value];
    const nights = nightsBetween();
    if (!stay || !fields.checkin.value || fields.checkin.value < todayISO || nights < 1 || Number(fields.adults.value) > stay.capacity) {
      warning.textContent = Number(fields.adults.value) > (stay?.capacity ?? 0) ? "Please choose a stay that fits your party, or call us about multiple rooms." : "Please choose a valid stay and dates, with check-out after check-in.";
      warning.dataset.transient = "true";
      return;
    }
    const adults = Number(fields.adults.value);
    const children = Number(fields.children.value);
    const message = [
      "Hello Mermaid Beach Resort, I'd like to request a stay.",
      "",
      `Stay: ${stay.name}`,
      `Check-in: ${fields.checkin.value}`,
      `Check-out: ${fields.checkout.value} (${nights} night${nights === 1 ? "" : "s"})`,
      `Guests: ${adults} adult${adults === 1 ? "" : "s"}, ${children} child${children === 1 ? "" : "ren"}`,
      `Published-rate estimate: ${taka(stay.rate * nights)} (subject to confirmation)`,
      "",
      `Name: ${fields.name.value.trim()}`,
      `Phone: ${fields.phone.value.trim()}`,
      `Email: ${fields.email.value.trim()}`,
      fields.notes.value.trim() ? `Notes: ${fields.notes.value.trim()}` : "",
      "",
      "Please confirm availability, final price and booking details. Thank you."
    ].filter((line, index, all) => line !== "" || (all[index - 1] !== "" && all[index + 1] !== "")).join("\n");
    const url = `https://wa.me/8801841416467?text=${encodeURIComponent(message)}`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.append(link);
    link.click();
    link.remove();
  });
  refresh();
})();
