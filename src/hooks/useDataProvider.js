import { useState, useEffect, useCallback, useRef } from "react";

/**
 * هوک عمومی برای ارسال درخواست به API با پشتیبانی از body، header، params و ...
 *
 * @param {Object} options
 * @param {string} options.provider - آدرس endpoint یا کلید provider
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} [options.method='GET']
 * @param {Object} [options.params={}] - در GET به query string تبدیل می‌شود، در بقیه متدها به body می‌رود (مگر body جدا داده شود)
 * @param {Object|null} [options.body=null] - بدنه‌ی درخواست (برای POST/PUT/...)
 * @param {Object} [options.headers={}] - هدرهای دلخواه
 * @param {boolean} [options.autoLoad=true] - اجرای خودکار در mount
 * @param {Array} [options.deps=[]] - وابستگی‌های اضافی برای اجرای مجدد خودکار
 * @param {Function} [options.onSuccess] - callback موفقیت، پارامتر ورودی: داده‌ی response
 * @param {Function} [options.onError] - callback خطا
 */
function useDataProvider({
  provider,
  method = "GET",
  params = {},
  body = null,
  headers = {},
  autoLoad = true,
  deps = [],
  onSuccess,
  onError,
  urlPrefix,
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  // برای جلوگیری از rerun اضافی، آبجکت‌ها رو serialize می‌کنیم
  const paramsKey = JSON.stringify(params);
  const bodyKey = JSON.stringify(body);
  const headersKey = JSON.stringify(headers);

  const buildUrl = useCallback(
    (currentParams) => {
      let prefix = urlPrefix || import.meta.env.VITE_API_URL;
      let url = prefix + provider;
      const isGetLike = (method || "GET").toUpperCase() === "GET";
      if (isGetLike && currentParams && Object.keys(currentParams).length > 0) {
        const query = new URLSearchParams(currentParams).toString();
        url += (url.includes("?") ? "&" : "?") + query;
      }
      return url;
    },
    [provider, method],
  );

  /**
   * request می‌تونه با override options صدا زده بشه، مثلا:
   * reload({ params: { page: 2 } })
   * reload({ body: { title: 'new' }, method: 'PUT' })
   */
  const request = useCallback(
    async (overrideOptions = {}) => {
      // اگر درخواست قبلی در حال اجراست، لغوش کن
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const finalMethod = (
        overrideOptions.method ||
        method ||
        "GET"
      ).toUpperCase();
      const finalParams = overrideOptions.params ?? params;
      const finalHeaders = {
        "Content-Type": "application/json",
        ...headers,
        ...(overrideOptions.headers || {}),
      };
      const finalBody =
        overrideOptions.body ??
        body ??
        (finalMethod !== "GET" ? finalParams : null);

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          buildUrl(finalMethod === "GET" ? finalParams : null),
          {
            method: finalMethod,
            headers: finalHeaders,
            body:
              finalMethod !== "GET" && finalBody
                ? JSON.stringify(finalBody)
                : undefined,
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          throw new Error(`Request failed [${res.status}]: ${errText}`);
        }

        // اگر response بدنه نداشت (مثلا 204) خطا نده
        const contentType = res.headers.get("content-type") || "";
        const json = contentType.includes("application/json")
          ? await res.json()
          : await res.text();

        setData(json);
        if (onSuccess) onSuccess(json);
        return json;
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
          if (onError) onError(err);
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [provider, method, paramsKey, bodyKey, headersKey, buildUrl],
  );

  const reload = useCallback(
    (overrideOptions) => request(overrideOptions),
    [request],
  );

  useEffect(
    () => {
      if (autoLoad) {
        request();
      }
      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    deps.length ? deps : [provider, paramsKey],
  );

  return { data, reload, loading, error };
}

export default useDataProvider;
