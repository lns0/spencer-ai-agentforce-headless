"use server";
import "server-only";

const SF_MY_DOMAIN_URL = process.env.SF_MY_DOMAIN_URL ?? "";
const SF_CONSUMER_KEY = process.env.SF_CONSUMER_KEY ?? "";
const SF_CONSUMER_SECRET = process.env.SF_CONSUMER_SECRET ?? "";
const SF_AGENT_ID = process.env.SF_AGENT_ID ?? "";

const getToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", SF_CONSUMER_KEY);
  params.append("client_secret", SF_CONSUMER_SECRET);
  const res = await fetch(
    `https://${SF_MY_DOMAIN_URL}/services/oauth2/token?${params.toString()}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "force-cache",
      next: { revalidate: 1200 },
    }
  );
  const data = await res.json();
  const accessToken = data["access_token"];
  const apiInstanceUrl = data["api_instance_url"];
  return { accessToken, apiInstanceUrl };
};
export const newSession = async () => {
  const { accessToken, apiInstanceUrl } = await getToken();
  const uuid = crypto.randomUUID();
  const payload = {
    externalSessionKey: uuid,
    instanceConfig: {
      endpoint: `https://${SF_MY_DOMAIN_URL}/`,
    },
    featureSupport: "Streaming",
    streamingCapabilities: {
      chunkTypes: ["Text"],
    },
    bypassUser: true,
  };
  const res = await fetch(
    `${apiInstanceUrl}/einstein/ai-agent/v1/agents/${SF_AGENT_ID}/sessions`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  );
  const data = await res.json();

  return data;
};

export const getSession = async () => {
  const session = await newSession();
  console.log("session", session);
  return session;
};
export const endSession = async () => {
  const { accessToken, apiInstanceUrl } = await getToken();
  const { sessionId } = await getSession();
  try {
    const res = await fetch(
      `${apiInstanceUrl}/einstein/ai-agent/v1/sessions/${sessionId}`,
      {
        method: "delete",
        headers: {
          "x-session-end-reason": "UserRequest",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendStreamingMessage = async (
  sessionId: string,
  text: string,
  sequenceId: number
) => {
  const { accessToken, apiInstanceUrl } = await getToken();
  const res = await fetch(
    `${apiInstanceUrl}/einstein/ai-agent/v1/sessions/${sessionId}/messages/stream`,
    {
      method: "post",
      keepalive: true,
      cache: "no-store",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        message: {
          sequenceId,
          type: "Text",
          text,
        },
      }),
    }
  );
  const data = res.body;
  return data;
};
