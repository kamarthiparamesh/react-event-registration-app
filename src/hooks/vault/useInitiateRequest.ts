import { useExtension } from "./useExtension";
import { nanoid } from "nanoid";
import { hostUrl } from "src/utils/env_public";

export type VaultRequestType = {
  presentationDefinition?: any;
  callbackUrl: string;
  doVerification?: boolean;
};

export function useInitiateRequest({
  presentationDefinition,
  callbackUrl,
}: VaultRequestType) {
  const { isInitializing, isExtensionInstalled, client } = useExtension();

  async function handleInitiate() {
    if (!isExtensionInstalled) {
      window.location.href = client.getChromeWebStoreUrl();
      return;
    }

    client.initiateAuth({
      nonce: nanoid(),
      state: nanoid(),
      responseDestination: {
        responseMode: "query",
        redirectUri: `${hostUrl}${callbackUrl}`,
      },
      presentationDefinition,
    });
  }

  return {
    isInitializing,
    isExtensionInstalled,
    handleInitiate,
  };
}
