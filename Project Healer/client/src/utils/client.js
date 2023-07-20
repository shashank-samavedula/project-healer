import axios from "axios";
import { isEmpty } from "lodash";
import { apiBaseUrl, loginStorageKey } from "../constants/configuration";
import { getItem } from "./storage";

const TYPE_JSON = "application/json";

export const buildAPIInstance = ({ contenttype = TYPE_JSON }) => {
  let token = null;
  if (!isEmpty(getItem(loginStorageKey)))
    token = getItem(loginStorageKey).token;

  // wait for valid base url
  const objAxios = axios.create({
    baseURL: apiBaseUrl,
    headers: {
      Authorization: `JWT ${token}`,
      common: {
        Accept: TYPE_JSON,
        "Content-Type": contenttype
      },
      post: {
        "Content-Type": TYPE_JSON
      }
    }
  });

  return objAxios;
};

const client = (params = {}) => buildAPIInstance(params);

export default client;
