import { renderFile } from "../deps.js";
import * as mainService from "../services/mainService.js";
const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewStatistics = async (request) => {
  const data = {
    lists: await mainService.lists(),
    items: await mainService.items(),
  };

  return new Response(await renderFile("main.eta", data), responseDetails);
};

export { viewStatistics };
