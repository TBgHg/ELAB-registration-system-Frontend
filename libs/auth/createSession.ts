import { createApiServerClient } from "../client/v1";

interface CreateSessionOptions {
  state: string;
  redirect_uri: string;
  code_verifier: string;
}

async function createAuthSession(options: CreateSessionOptions) {
  try {
    const client = createApiServerClient();
    const { data } = await client.post("/auth/create", options);
    return data as { ok: boolean };
  } catch (e) {
    console.error(e);
    return { ok: false };
  }
}

export default createAuthSession;
