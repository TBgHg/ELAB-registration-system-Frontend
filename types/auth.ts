import type { ResponseBase } from "./server";

interface RefreshTokenResponse extends ResponseBase {
  data: {
    credential: Credential;
  };
}

export type { RefreshTokenResponse };
