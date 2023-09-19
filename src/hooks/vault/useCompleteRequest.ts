import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useExtension } from "./useExtension";
import { useVerifyVpMutation } from "../verifier/useVerifyVpMutation";
import { VaultRequestType } from "./useInitiateRequest";

const errorMessageMap: Record<string, string> = {
  invalid_request: "Invalid authorization request or We could not find any data that meets our criteria.",
  unauthorized_client: "Unauthorized website",
  access_denied: "Cancelled",
};

const errorDescriptionMessageMap: Record<string, string> = {
  invalid_redirect_uri: "Invalid redirect uri",
  not_logged_into_wallet: "Not logged into the vault",
  unsupported_dcf_connector_type: "Unsupported connector type",
  unsupported_concierge_question: "Unsupported concierge question",
  missing_concierge_data: "Missing Concierge data, please try again in few minutes",
  request_declined: "Request has been declined by user",
  user_declined_connecting_missing_connectors: "User has declined to connect missing connectors",
};

export function useCompleteRequest({
  presentationDefinition,
  callbackUrl,
  doVerification = true,
}: VaultRequestType) {
  const router = useRouter();
  const { client } = useExtension();

  const [error, setError] = useState<string>();
  const [errorDescription, setErrorDescription] = useState<string>()
  const [vpToken, setVpToken] = useState<any>();
  const [presentationSubmission, setPresentationSubmission] = useState<any>();

  const { mutate, ...mutation } = useVerifyVpMutation();

  useEffect(() => {
    if (!router.asPath.startsWith(callbackUrl)) return

    try {
      const response = client.completeAuth(window.location.href);

      if ("error" in response) {
        setError(errorMessageMap[response.error] || 'Unexpected error')
        setErrorDescription((response.errorDescription && errorDescriptionMessageMap[response.errorDescription]) || undefined)
        return;
      } else {
        setVpToken(response.vpToken);
        setPresentationSubmission(response.presentationSubmission);
      }

    } catch (err: any) {
      setError(err.messsage || "Unexpected error");
    }
  }, [client, setVpToken, setPresentationSubmission, router]);


  useEffect(() => {
    if (doVerification && mutation.error) {
      setVpToken(undefined)
      setPresentationSubmission(undefined)
      setError('Could not verify your data')
      setErrorDescription(mutation.error.message)
    }
  }, [mutation.error]);


  useEffect(() => {
    if (vpToken && doVerification) {
      // VP verification
      mutate({
        verifiablePresentation: vpToken,
        presentationSubmission,
        presentationDefinition,
      });
    }
  }, [vpToken, presentationSubmission, mutate]);


  return {
    vpToken,
    presentationSubmission,
    error,
    errorDescription,
    isLoading: doVerification ? mutation.isIdle || mutation.isLoading : false,
    isCompliant: doVerification ? Boolean(mutation.data?.isCompliant) : true,
  };

}
