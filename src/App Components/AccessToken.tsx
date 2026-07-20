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
    <div className="flex flex-col items-center ">
      <h1>Access Token</h1>
      <p>Access Token: {accessToken ?? "None"}</p>
      <p>Auto Refresh: {isRefreshing ? "Running (10s)" : "Stopped"}</p>
      <button className="border-2 max-w-fit p-2 m-5" onClick={() => void generateAccessToken()}>Generate Now</button>
      <button className="border-2 max-w-fit p-2 m-5" onClick={startAccessTokenRefresh}>Start Auto Refresh</button>
      <button className="border-2 max-w-fit p-2 m-5" onClick={stopAccessTokenRefresh}>Stop Auto Refresh</button>
      <button className="border-2 max-w-fit p-2 m-5" onClick={clearAccessToken}>Clear Token</button>
    </div>
  );
}

export default AccessToken;
