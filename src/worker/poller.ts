import { Data } from "../types";
import { config } from "../config/config";
import { ItemRespository } from "../database";
import axios, { AxiosInstance } from "axios";

const options: Data = {
  baseURL: config.url,
  timeout: config.timeout,
};

export async function poll() {
  const axiosInstance: AxiosInstance = axios.create(options);
  const response: number[] = (
    await axiosInstance.get("newstories.json")
  ).data.slice(0, 100);
  const newsArr: Data[] = [];
  for (const res of response) {
    const news: Data = (await axiosInstance.get(`item/${res}.json`)).data;
    newsArr.push(news);
  }
  for (const news of newsArr) {
    const res = await ItemRespository.findOneBy({ hackerId: news.id });
    if (!res) {
      const des = ItemRespository.create({
        hackerId: news.id,
        title: news?.title,
        text: news?.text,
        url: news?.url,
        type: news.type,
      });
      await ItemRespository.save(des);
    }
  }
}
