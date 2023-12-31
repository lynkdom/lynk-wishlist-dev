import { navigate } from "raviger";

function useFetch() {
  return async (uri, options) => {
    const response = await fetch(uri, options);

    if (response.headers.get("Verify-Request-Failure") === "1") {
      const authUrlHeader = response.headers.get("Verify-Request-Reauth-URL");
      navigate(authUrlHeader);

      return null;
    }

    return response;
  };
}

export default useFetch;
