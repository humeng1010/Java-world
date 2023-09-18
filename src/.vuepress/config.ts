import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JavaWorld",
  description: "JavaWorld",

  theme,


  // Enable it with pwa
  // shouldPrefetch: false,
});
