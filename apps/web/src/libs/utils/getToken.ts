export const getToken = async (authCode: string) => {
  const reqData = {
    grant_type: "authorization_code",
    client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
    code: authCode,
    redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URL,
  } as { [key: string]: number | string };
  const body = Object.keys(reqData)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(reqData[key])
    )
    .join("&");

  const res = await fetch(import.meta.env.VITE_COGNITO_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await res.json();

  return data;
};
