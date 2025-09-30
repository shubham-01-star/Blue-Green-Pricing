import axios from "axios";

// Configuration
export const API_CONFIG = {
  baseUrl: "https://dynamic-pricing-api-3epx.onrender.com/api/v1",
  cookieName: "pricing_version",
  headerName: "x-version",
  stickyDays: 30,
};

// Feature mapping
const FEATURE_MAP = {
  A: "Core API Access",
  B: "Basic Analytics",
  C: "Advanced Features",
  D: "Priority Support",
};

// Cookie helpers
export const getCurrentVersion = () => {
  const cookies = document.cookie.split(";");
  const versionCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${API_CONFIG.cookieName}=`)
  );
  return versionCookie ? versionCookie.split("=")[1].trim() : null;
};

export const setVersionCookie = (version) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + API_CONFIG.stickyDays);
  document.cookie = `${API_CONFIG.cookieName}=${version}; expires=${expiryDate.toUTCString()}; path=/`;
};

export const clearVersionCookie = () => {
  document.cookie = `${API_CONFIG.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

// API call
export const fetchPricingData = async (forceVersion = null) => {
  try {
    const headers = {};

    // Force version via header + cookie
    if (forceVersion) {
      headers[API_CONFIG.headerName] = forceVersion;
      setVersionCookie(forceVersion);
    }

    // Use existing cookie if no forced version
    const currentVersion = getCurrentVersion();
    if (currentVersion && !forceVersion) {
      headers["Cookie"] = `${API_CONFIG.cookieName}=${currentVersion}`;
    }

    const response = await axios.get(`${API_CONFIG.baseUrl}/pricing`, {
      headers,
      withCredentials: false,
    });

    const pricingData = response.data.pricing || response.data;
    const servedVersion = response.data.servedVersion || pricingData.version;

    const transformedData = {
      ...pricingData,
      version: servedVersion,
      plans: pricingData.plans.map((plan) => ({
        ...plan,
        features: plan.features.map((f) => FEATURE_MAP[f] || f),
      })),
    };

    if (servedVersion && !getCurrentVersion()) {
      setVersionCookie(servedVersion);
    }

    return {
      success: true,
      data: transformedData,
      routingInfo: {
        version: servedVersion,
        reason: currentVersion ? "cookie" : "api_routing",
      },
    };
  } catch (error) {
    console.error("Error fetching pricing data:", error);
    return { success: false, error: error.message, data: null };
  }
};
