"use server";

import "server-only";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import axios from "axios";
const SF_MY_DOMAIN_URL = process.env.SF_MY_DOMAIN_URL ?? "";
const SF_CONSUMER_KEY = process.env.SF_CONSUMER_KEY ?? "";
const SF_CONSUMER_SECRET = process.env.SF_CONSUMER_SECRET ?? "";
const SF_AGENT_ID = process.env.SF_AGENT_ID ?? "";

const getToken = async () => {
  "use cache";
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", SF_CONSUMER_KEY);
  params.append("client_secret", SF_CONSUMER_SECRET);
  const { data } = await axios({
    method: "post",
    url: `https://${SF_MY_DOMAIN_URL}/services/oauth2/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  });
  const accessToken = data["access_token"];
  const apiInstanceUrl = data["api_instance_url"];
  cacheTag("token");
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
  const { data } = await axios({
    method: "post",
    url: `${apiInstanceUrl}/einstein/ai-agent/v1/agents/${SF_AGENT_ID}/sessions`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: payload,
  });
  return data;
};

export const getSession = async () => {
  "use cache";
  const session = await newSession();
  cacheTag("session");
  return session;
};
export const endSession = async () => {
  const { accessToken, apiInstanceUrl } = await getToken();
  const { sessionId } = await getSession();
  try {
    const { data } = await axios({
      method: "delete",
      url: `${apiInstanceUrl}/einstein/ai-agent/v1/sessions/${sessionId}`,
      headers: {
        "x-session-end-reason": "UserRequest",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    revalidateTag("session");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendStreamingMessage = async (
  text: string,
  sequenceId: number
) => {
  const { accessToken, apiInstanceUrl } = await getToken();
  const { sessionId } = await getSession();

  const { data } = await axios({
    method: "post",
    url: `${apiInstanceUrl}/einstein/ai-agent/v1/sessions/${sessionId}/messages/stream`,
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      message: {
        sequenceId,
        type: "Text",
        text,
      },
    },
    responseType: "stream",
  });
  return data;
};
