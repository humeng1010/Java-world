---
title: Maven
order: 2
---

:::tip
- Maven是专门用于管理和构建Java项目的工具，它的主要功能有：
  - 提供了一套标准化的项目结构
  - 提供了一套标准化的构建流程（编译、测试、打包、发布...）
  - 提供了一套依赖管理机制
- Maven提供了一套标准化的项目结构，所有的IDE使用Maven构建的项目结构完全一样，所有IDE创建的Maven项目可以通用
- Maven提供了一套简单的命令来完成项目构建
- Maven依赖管理就是管理项目的第三方资源（jar包、插件...）
:::


![image-20220814103941013](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141039074.png)

## Maven简介

- Apache Maven 是一个项目管理和构建的**工具**，它基于项目对象模型（POM）的概念，通过一小段描述信息来管理项目的构建、报告和文档
- 官网：https://maven.apache.org



## Maven仓库

- 本地仓库

- 中央仓库：由Maven团队维护的全球唯一的仓库

  - 地址：https://repo1.maven.org/maven2/

- 远程仓库（私服）：一般由公司团队搭建私有仓库

  

- 当项目使用坐标引入对应的依赖jar包，**首先**会查找**本地仓库**中是否有对应的jar包

  - 如果有，项目会直接使用
  - 如果没有，则会去中央仓库中下载对应的jar包导入到本地仓库

![image-20220814105454764](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141054913.png)



## Maven环境配置

下载Maven并且配置环境变量后，打开Maven文件夹，进入到conf文件夹的setting文件进行配置

- 本地仓库的位置

```xml
<!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
  <localRepository>/Users/humeng/devTools/apache-maven-3.8.4/mvn_resp</localRepository>
```

- 阿里云私服镜像

```xml
			<mirror>
        <id>nexus-aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Nexus aliyun</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
      </mirror>
```

## Maven的基本使用

### Maven的常用命令

- compile：编译
- clean：清理
- test：测试
- package：打包
- install：安装

### Maven生命周期

- Maven构建项目的时候经历了哪些事情就是生命周期
- Maven对项目构建的生命周期划分为3套
  - clean：清理工作
  - default：核心工作，例如编译，测试，打包，安装等
  - site：产生报告，发布站点等
- 同一生命周期内，执行后面的命令，前面的所有命令会自动执行

-------------------------------------------------->

pre-clean   clean   post-clean

-------------------------------------------------->

compile    test    package    install

-------------------------------------------------->

pre-site        site        post-site





## IDEA配置Maven

在IDEA中把Maven主路径和设置文件以及本地仓库更改为我们下载的Maven文件

![image-20220814110522799](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141105853.png)



### Maven坐标

- 什么是坐标？
  - Maven中坐标是资源的唯一标识
  - 使用坐标来定义项目或引入项目中需要的依赖
- Maven坐标的主要组成
  - groupId：定义当前的Maven项目隶属组织的名称（通常是域名的反写，例如：com.xxx）
  - artifactId：定义当前Maven项目名称（通常是模块名）
  - version：定义当前项目的版本号



## 依赖管理

### 使用坐标导入jar包

1. 在pom.xml 中编写 < dependencies >标签
2. 在 < dependencies > 标签中 使用 < dependency > 引入坐标
3. 定义坐标的 groupId，artifactId，version
4. 点击刷新按钮，使坐标生效

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!--    当前项目的jar包-->
    <groupId>com.meng</groupId>
    <artifactId>maven-demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <!--    MySQL驱动jar包-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.25</version>
        </dependency>

        <!--        druid数据库连接池jar包-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.8</version>
        </dependency>

        <!--        Junit测试jar包-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>


</project>
```

### 依赖范围

- 通过设置坐标的依赖范围（scope），可以设置对应的jar包的作用范围：编译环境、测试环境、运行环境

```xml
<!--        Junit测试jar包-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
```

| 依赖范围 | 编译classpath            | 测试classpath            | 运行classpath            | 例子            |
| -------- | ------------------------ | ------------------------ | ------------------------ | --------------- |
| compile  | 有效                     | 有效                     | 有效                     | logback         |
| test     | -                        | 有效                     | -                        | Junit           |
| provided | 有效                     | 有效                     | -                        | servlet-api     |
| runtime  | -                        | 有效                     | 有效                     | jdbc驱动        |
| system   | 有效                     | 有效                     | -                        | 存在本地的jar包 |
| import   | 引入DependencyManagement | 引入DependencyManagement | 引入DependencyManagement |                 |

- < scope > 默认值：compile



