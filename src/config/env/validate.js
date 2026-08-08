export function getNumber(value, defaultValue) {
  if (value === undefined || value === null || value === "") return defaultValue;
  const n = Number(value);
  return Number.isFinite(n) ? n : defaultValue;
}

export function getBoolean(value, defaultValue) {
  if (value === undefined || value === null || value === "") return defaultValue;
  // اجازه می‌دهی "true/false" یا "1/0"
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  return defaultValue;
}
