import { arraySidebar } from "vuepress-theme-hope";

export const interview = arraySidebar([
    {
        text: "面试准备篇",
        link: "interview-summary",
        icon: "article",
    },
    {
        text: "面试过程记录",
        prefix: "interview-process/",
        icon: "article",
        children: "structure"
    },

])