import { useEffect } from "react";
import { useBoundStore } from "../store";

function AccessToken() {
  const accessToken = useBoundStore((state) => state.accessToken);
  const isRefreshing = useBoundStore((state) => state.isRefreshing);
  const generateAccessToken = useBoundStore(
    (state) => state.generateAccessToken,
  );
  const startAccessTokenRefresh = useBoundStore(
    (state) => state.startAccessTokenRefresh,
  );
  const stopAccessTokenRefresh = useBoundStore(
    (state) => state.stopAccessTokenRefresh,
  );
  const clearAccessToken = useBoundStore((state) => state.clearAccessToken);

  useEffect(() => {
    startAccessTokenRefresh();

    return () => {
      stopAccessTokenRefresh();
    };
  }, [startAccessTokenRefresh, stopAccessTokenRefresh]);

  return (
    <>
      <h1>Access Token</h1>
      <p>Access Token: {accessToken ?? "None"}</p>
      <p>Auto Refresh: {isRefreshing ? "Running (10s)" : "Stopped"}</p>
      <button onClick={() => void generateAccessToken()}>Generate Now</button>
      <button onClick={startAccessTokenRefresh}>Start Auto Refresh</button>
      <button onClick={stopAccessTokenRefresh}>Stop Auto Refresh</button>
      <button onClick={clearAccessToken}>Clear Token</button>
    </>
  );
}

export default AccessToken;
