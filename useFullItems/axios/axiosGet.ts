import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { urls } from ".";
import { constants } from "../constants/constants";
import { concatString } from "../functions/private";

export const axiosGetFunction = async ({
  parentUrl,
  thenFunction,
  childUrl = "",
  config,
}: //   useGlobalLoader,
{
  thenFunction?: any;
  parentUrl: keyof typeof urls;
  childUrl?: string;
  config?: AxiosRequestConfig;
  //   useGlobalLoader?: boolean;
}) => {
  //   if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(true));
  return await axios
    .get(concatString(parentUrl, childUrl), config)
    .then((response) => {
      if (thenFunction) {
        thenFunction(response.data);
      } else return response.data;
    })
    .catch((error: AxiosError) => {
      alert("Error " + error.name);
      console.log(error, error.cause, error.message, error.name, error.config);
    });
  // .finally(() => {
  // //   if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(false));
  // });
};
