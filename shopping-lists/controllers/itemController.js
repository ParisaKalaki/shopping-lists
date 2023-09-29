import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await itemService.createItem(urlParts[2]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const addItem = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await itemService.createItem(name, urlParts[2]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const collectedItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await itemService.collectItem(urlParts[4], urlParts[2]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createItem, collectedItem, addItem };
