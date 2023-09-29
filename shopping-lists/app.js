import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";
import * as mainController from "./controllers/mainController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    return await mainController.viewStatistics(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  } else if (
    url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") &&
    request.method === "POST"
  ) {
    return await itemController.collectedItem(request);
  } else if (
    url.pathname.match("lists/[0-9]+/deactivate") &&
    request.method === "POST"
  ) {
    return await listController.deactiveList(request);
  } else if (
    url.pathname.match("lists/[0-9]+/items") &&
    request.method === "POST"
  ) {
    return await itemController.addItem(request);
  }
};

serve(handleRequest, { port: 7777 });
