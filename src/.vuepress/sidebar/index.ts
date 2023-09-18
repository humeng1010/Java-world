import { arraySidebar } from "vuepress-theme-hope";

export const index = arraySidebar([
    {
        text: "Java",
        icon: "java",
        collapsible: true,
        prefix: "java/",
        children: [
            {
                text: "Java基础",
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
                        icon: "info",
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
                        icon: "info",
                        collapsible: true,
                        children: [
                        ],
                    },
                ],
            },
            {
                text: "IO",
                prefix: "io/",
                icon: "IO",
                children: ["io-basis"],
            },
            {
                text: "网络编程",
                prefix: "network/",
                icon: "network",
                children: ["network-program"],
            },
            {
                text: "新特性",
                prefix: "new-features/",
                icon: "more",
                children: [
                    "java8-common-new-features",
                ],
            },
        ]
    },

    {
        text: "MySQL",
        icon: "mysql",
        prefix: "mysql/",
        collapsible: true,// 可折叠
        children: [
            "mysql-basis"
        ],
    },
    {
        text: "JavaWeb",
        icon: "chrome",
        prefix: "java-web/",
        collapsible: true,// 可折叠
        children: "structure",
    },
    {
        text: "Linux",
        icon: "centos",
        prefix: "linux/",
        collapsible: true,// 可折叠
        children: [
            "one-week-learning-linux",
            "linux-common-commands",
            {
                text: "linux实战",
                icon: "info",
                collapsible: true,
                children: [
                    "deploying-various-software",
                    "use-docker-to-deploy-backend-separation-projects",
                    "linux-nohup-&"
                ]
            }
        ],
    },
    {
        text: "SSM框架",
        icon: "type",
        prefix: "ssm/",
        collapsible: true,
        children: [
            "spring",
            "spring-mvc",
            "maven-advance",
            "springboot",
            "mybatis-plus"
        ]

    }

])