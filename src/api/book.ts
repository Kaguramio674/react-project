import { BookQueryType } from "@/type/";
import axios from "axios";
import qs from "qs";



export async function getBookList(params?: BookQueryType) {
  // https://mock.apifox.cn/m1/2398938-0-default/api/books?name=xxx&author=xxx&category=xxx
  const res = await axios(
    `https://mock.apifox.cn/m1/2398938-0-default/api/books?${qs.stringify(
      params
    )}`
  );
  return res.data;
}