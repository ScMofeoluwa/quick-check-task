import { Data } from "../types";
import { config } from "../config/config";
import { DBSource } from "../database/data-source";
import { Item } from "../database/entity/Item";
import axios, { AxiosInstance } from "axios";

const options: Data = {
  baseURL: config.url,
  timeout: config.timeout,
};

export async function poll() {
  const userRespository = DBSource.getRepository(Item);
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
    const res = await userRespository.findOneBy({ hackerId: news.id });
    if (!res) {
      const des = userRespository.create({
        hackerId: news.id,
        title: news?.title,
        text: news?.text,
        url: news?.url,
      });
      await userRespository.save(des);
    }
  }
}
