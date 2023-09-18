import { arraySidebar } from "vuepress-theme-hope";

export const index = arraySidebar([
    {
        text: "Java大陆",
        icon: "java",
        collapsible: true,
        prefix: "Java/",
        children: [
            {
                text: "基础大陆",
                prefix: "basis-land/",
                icon: "bit",
                children: [
                    "java-basic-land-01",
                    "java-basic-land-02",
                    "java-basic-land-03",
                    {
                        text: "重要知识点",
                        icon: "info",
                        collapsible: true,
                        children: [
                            "regular-expression",
                            "xml-tag",
                            "reflection",
                            "dynamic-proxy",
                            "factory-pattern",
                            "decorative-pattern",
                        ],
                    },
                ],
            },
            {
                text: "集合",
                prefix: "collection-land/",
                icon: "array",
                children: [
                    "java-collection-land-01",
                    {
                        text: "源码分析",
                        icon: "star",
                        collapsible: true,
                        children: [
                            "arraylist-source-code",
                        ],
                    },
                ],
            },
            {
                text: "并发编程",
                prefix: "concurrent/",
                icon: "asynchronous",
                children: [
                    "java-concurrent-land-01",
                    {
                        text: "重要知识点",
                        icon: "star",
                        collapsible: true,
                        children: [
                        ],
                    },
                ],
            },
            {
                text: "IO",
                prefix: "io/",
                icon: "code",
                children: ["io-basis"],
            },
            {
                text: "新特性",
                prefix: "new-features/",
                icon: "featured",
                children: [
                    "java8-common-new-features",
                ],
            },
        ]
    },

    {
        text: "MySQL大陆",
        icon: "mysql",
        prefix: "mysql/",
        collapsible: true,// 可折叠
        children: [
            "mysql-basis"
        ],
    },

])