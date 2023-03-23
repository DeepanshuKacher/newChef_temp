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
}: {
  thenFunction?: any;
  parentUrl: keyof typeof urls;
  childUrl?: string;
  config?: AxiosRequestConfig;
  data: any;
  showGlobalLoader?: true;
  toggleGlobalLoader?: true;
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

      alert("Some Error");
      console.log(error, error.cause, error.message, error.name, error.config);
    })
    .finally(() => {
      if (toggleGlobalLoader)
        store.dispatch(action_types.toggleGlobalLoader(false));
    });
};
