import { renderFile } from "../deps.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};

const deactiveList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listService.deactiveById(urlParts[2]);

  return await requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    currentItem: await itemService.findCurrentItem(urlParts[2]),
    items: await itemService.viewItems(urlParts[2]),
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllNonActiveShopping_lists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

export { addList, viewList, viewLists, deactiveList };
