import { getBoolean, getNumber } from "./validate";

const defaults = {
  // حتماً نام‌ها با VITE_ باشند تا در Vite قابل استفاده/جایگذاری باشند
  VITE_API_BASE_URL: "http://localhost:3000",
  VITE_GO_API_URL: "http://localhost:8000",
  VITE_LOG_LEVEL: "info",
  VITE_FEATURE_X_ENABLED: false,
  VITE_TIMEOUT_MS: 8000,
};

export function loadEnv() {
  // این‌ها در زمان build توسط Vite تزریق/جایگذاری می‌شوند
  // مقدار واقعی از .env می‌آید (اگر وجود داشته باشد)
  const env = import.meta.env || {};

  const config = {
    VITE_API_BASE_URL: env.VITE_API_BASE_URL ?? defaults.VITE_API_BASE_URL,

    VITE_GO_API_URL: env.VITE_GO_API_URL ?? defaults.VITE_GO_API_URL,

    VITE_LOG_LEVEL: env.VITE_LOG_LEVEL ?? defaults.VITE_LOG_LEVEL,

    VITE_FEATURE_X_ENABLED: getBoolean(
      env.VITE_FEATURE_X_ENABLED,
      defaults.VITE_FEATURE_X_ENABLED,
    ),

    VITE_TIMEOUT_MS: getNumber(env.VITE_TIMEOUT_MS, defaults.VITE_TIMEOUT_MS),
  };

  return config;
}

// config singleton
export const envConfig = loadEnv();
