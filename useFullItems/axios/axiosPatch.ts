import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { urls } from ".";
import { concatString } from "../functions/private";
import { action_types, store } from "../redux-store";

export const axiosPatchFunction = async ({
  parentUrl,
  thenFunction,
  childUrl = "",
  config,
  data,
  showGlobalLoader,
  toggleGlobalLoader,
  errorInfo,
}: {
  thenFunction?: any;
  parentUrl: keyof typeof urls;
  childUrl?: string;
  config?: AxiosRequestConfig;
  data: any;
  showGlobalLoader?: true;
  toggleGlobalLoader?: true;
  errorInfo?: {
    code: number;
    message: string;
  };
}) => {
  if (showGlobalLoader || toggleGlobalLoader)
    store.dispatch(action_types.toggleGlobalLoader(true));
  return await axios
    .patch(concatString(parentUrl, childUrl), data, config)
    .then((response) => {
      if (thenFunction) {
        thenFunction(response.data);
      } else return response.data;
    })
    .catch((error: AxiosError) => {
      if (showGlobalLoader)
        store.dispatch(action_types.toggleGlobalLoader(false));

      if (errorInfo?.code) {
        if (error.response?.status === errorInfo.code) {
          return alert(errorInfo.message);
        }
      }
      alert("Some Error");
      console.log(error.response?.status);
    })
    .finally(() => {
      if (toggleGlobalLoader)
        store.dispatch(action_types.toggleGlobalLoader(false));
    });
};
