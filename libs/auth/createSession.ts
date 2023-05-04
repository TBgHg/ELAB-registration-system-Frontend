import { createApiServerClient } from "../client/v1";

interface CreateSessionOptions {
  state: string;
  redirect_uri: string;
  code_verifier: string;
}

async function createAuthSession(options: CreateSessionOptions) {
  console.log(options);

  const client = createApiServerClient();
  const { data } = await client.post("/auth/create", options);
  return data as { ok: boolean };
}

export default createAuthSession;
