---
title: SpringMVC
---

## SpringMVC简介
### SpringMVC概述

- springMVC技术与Servlet技术功能相同，均属于web层开发技术

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660822633487-7110664c-44b1-4caf-9c58-4dbc4eb21d9c.png#clientId=u40898c62-2afa-4&from=paste&height=521&id=u10ced414&name=image.png&originHeight=1042&originWidth=2078&originalType=binary&ratio=1&rotation=0&showTitle=false&size=645225&status=done&style=shadow&taskId=u28f2f2be-10af-4958-87ac-e5163a2d393&title=&width=1039)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660822722191-3c0449e7-ec31-429b-bccd-d198f7b4143d.png#clientId=u40898c62-2afa-4&from=paste&height=498&id=u4b2bc0e9&name=image.png&originHeight=996&originWidth=2038&originalType=binary&ratio=1&rotation=0&showTitle=false&size=235595&status=done&style=shadow&taskId=u0d12e044-accb-49a3-becb-037805da964&title=&width=1019)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660822840151-64c86b8c-1edc-4a98-a2f9-04add95da0dd.png#clientId=u40898c62-2afa-4&from=paste&height=521&id=ue8b99907&name=image.png&originHeight=1042&originWidth=2386&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1062423&status=done&style=shadow&taskId=ue27bc931-5fb0-41c0-94ff-bedd65c615f&title=&width=1193)
### SpringMVC入门案例
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660868363191-3e42457d-204c-4d06-81b2-b444e36020fa.png#clientId=ufa46b146-fcc0-4&from=paste&height=515&id=u21440a24&name=image.png&originHeight=1030&originWidth=2306&originalType=binary&ratio=1&rotation=0&showTitle=false&size=558494&status=done&style=shadow&taskId=u9a1e7b4a-a5ea-4280-b647-68924f45752&title=&width=1153)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660868433022-e285f3a5-ec55-478e-9527-65de8f383454.png#clientId=ufa46b146-fcc0-4&from=paste&height=406&id=u39f681d4&name=image.png&originHeight=812&originWidth=2126&originalType=binary&ratio=1&rotation=0&showTitle=false&size=313608&status=done&style=shadow&taskId=u733ba2dc-3b80-45a9-a037-ed55d5e22f5&title=&width=1063)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660868467510-9406ffb6-8256-470a-ba96-1375d2060929.png#clientId=ufa46b146-fcc0-4&from=paste&height=222&id=ud0504e7a&name=image.png&originHeight=444&originWidth=2064&originalType=binary&ratio=1&rotation=0&showTitle=false&size=233378&status=done&style=shadow&taskId=ud82a2557-d333-4fe5-b1e2-9b8029c9392&title=&width=1032)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660868625283-e2ae49b8-681f-4522-9449-71feecca4184.png#clientId=ufa46b146-fcc0-4&from=paste&height=503&id=u2e30926a&name=image.png&originHeight=1006&originWidth=2292&originalType=binary&ratio=1&rotation=0&showTitle=false&size=729033&status=done&style=shadow&taskId=uc94d4287-24f3-4825-acd1-2e9247019f3&title=&width=1146)
```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.red</groupId>
  <artifactId>springmvc_01_quickstart</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>


  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>

  <dependencies>
<!--    导入springmvc坐标和Servlet坐标-->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <!--  注意版本要使用5.3.0以下的版本 否则会出现500错误  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.2</version>
        <configuration>
          <port>80</port>
          <path>/</path>
        </configuration>
      </plugin>
    </plugins>
  </build>


</project>

```
```java
package com.red.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

//2.定义controller
@Controller//定义bean
public class UserController {
    //2.2设置当前操作访问路径
    @RequestMapping("/save")
    @ResponseBody
    public String save(){
        System.out.println("user module save is running...");
        return "{'module': 'springmvc'}";
    }
}

```
```java
package com.red.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

//3.创建springmvc的配置类，加载controller对应的bean
@Configuration
@ComponentScan("com.red")
public class SpringMvcConfig {
}

```
```java
package com.red.config;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.support.AbstractDispatcherServletInitializer;

//4.定义一个Servlet容器启动的配置类，在里面加载spring的配置
public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
    /**
     * 加载springmvc配置的
     * @return
     */
    @Override
    protected WebApplicationContext createServletApplicationContext() {
//        AnnotationConfigApplicationContext 注意区别
//        springmvc需要加载对应的AnnotationConfigWebApplicationContext
        AnnotationConfigWebApplicationContext webApplicationContext = new AnnotationConfigWebApplicationContext();
        webApplicationContext.register(SpringMvcConfig.class);
        return webApplicationContext;
    }

    /**
     * 用来设置哪些请求归属springmvc处理
     * @return
     */
    @Override
    protected String[] getServletMappings() {
        //所有请求归springmvc处理
        return new String[]{"/"};
    }

    /**
     * 加载spring容器配置
     * @return
     */
    @Override
    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }
}

```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660870509266-78e2b029-bf2d-47b5-81d6-7f87f6b0790d.png#clientId=ufa46b146-fcc0-4&from=paste&height=320&id=u6dd8fac5&name=image.png&originHeight=640&originWidth=1836&originalType=binary&ratio=1&rotation=0&showTitle=false&size=236491&status=done&style=shadow&taskId=u8e26ec0b-eea0-4323-8b36-5998b0cb5b0&title=&width=918)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660870524700-e33adbae-e0cf-4936-b3ca-d91fb69c9b35.png#clientId=ufa46b146-fcc0-4&from=paste&height=434&id=u6bda0934&name=image.png&originHeight=868&originWidth=2034&originalType=binary&ratio=1&rotation=0&showTitle=false&size=320889&status=done&style=shadow&taskId=u5e3720e0-bdd3-4687-9cfe-d535ca4f6ad&title=&width=1017)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660870536511-04b3725a-1011-4fd2-854e-c62695a026c4.png#clientId=ufa46b146-fcc0-4&from=paste&height=437&id=u156ddc0b&name=image.png&originHeight=874&originWidth=1800&originalType=binary&ratio=1&rotation=0&showTitle=false&size=331647&status=done&style=shadow&taskId=ub2253305-2e92-4b63-a458-89df15f0584&title=&width=900)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660870643485-46550894-b738-4599-a642-855135f63e49.png#clientId=ufa46b146-fcc0-4&from=paste&height=411&id=u87d3383a&name=image.png&originHeight=822&originWidth=2180&originalType=binary&ratio=1&rotation=0&showTitle=false&size=618010&status=done&style=shadow&taskId=u98085fbf-571f-45fd-9692-68ca5544b76&title=&width=1090)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660870705490-9f1abefb-048d-4d74-9435-f1d832b1dd63.png#clientId=ufa46b146-fcc0-4&from=paste&height=374&id=u06f04b53&name=image.png&originHeight=748&originWidth=2266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=778596&status=done&style=shadow&taskId=u5c54221e-f747-466a-9ca0-e60e1e97d27&title=&width=1133)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660870735097-61f3b68b-92e6-4a52-b03f-9766e87df7f1.png#clientId=ufa46b146-fcc0-4&from=paste&height=183&id=u512261f1&name=image.png&originHeight=366&originWidth=2182&originalType=binary&ratio=1&rotation=0&showTitle=false&size=279428&status=done&style=shadow&taskId=udece6088-fcd0-47a5-b3db-e68c028c804&title=&width=1091)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660870762852-b6e44ee7-d36e-47c2-8ed1-cae7f80651dc.png#clientId=ufa46b146-fcc0-4&from=paste&height=190&id=u2fdc31ef&name=image.png&originHeight=380&originWidth=2166&originalType=binary&ratio=1&rotation=0&showTitle=false&size=241451&status=done&style=shadow&taskId=uea15dc48-6bbe-46f8-9261-676263663a6&title=&width=1083)
#### 流程分析
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660871130915-f6b1e039-3950-4be9-bc74-17dd542dd096.png#clientId=ufa46b146-fcc0-4&from=paste&height=598&id=u9d36aa7b&name=image.png&originHeight=1196&originWidth=2336&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1514000&status=done&style=shadow&taskId=u1f7da35b-a0ba-4907-b6a1-bd40abdec63&title=&width=1168)
#### bean加载控制
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660871443819-823edf06-a504-4c3d-86f1-7c9646911194.png#clientId=ufa46b146-fcc0-4&from=paste&height=563&id=u626288b5&name=image.png&originHeight=1126&originWidth=2216&originalType=binary&ratio=1&rotation=0&showTitle=false&size=497310&status=done&style=shadow&taskId=u899d6f76-4de0-4df6-b70f-624a4e859b5&title=&width=1108)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660871473742-2910d1be-9289-45b1-9f31-9abe16cfbc64.png#clientId=ufa46b146-fcc0-4&from=paste&height=166&id=u847ad92b&name=image.png&originHeight=332&originWidth=1222&originalType=binary&ratio=1&rotation=0&showTitle=false&size=237191&status=done&style=shadow&taskId=u195a29de-6517-47f3-87d7-02ba250f8a3&title=&width=611)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660871520537-765253c0-0619-403c-b10d-1870974e56fa.png#clientId=ufa46b146-fcc0-4&from=paste&height=237&id=u7e0ca7b4&name=image.png&originHeight=474&originWidth=1702&originalType=binary&ratio=1&rotation=0&showTitle=false&size=437476&status=done&style=shadow&taskId=ua3492ab1-f075-4fab-af2c-7e666e802a5&title=&width=851)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660872109838-afb6c4a1-d9a1-468f-ae43-84fc5c8baa2f.png#clientId=ufa46b146-fcc0-4&from=paste&height=529&id=u868faaa7&name=image.png&originHeight=1058&originWidth=2266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=794947&status=done&style=shadow&taskId=u96910141-306e-4271-b0ca-eba0d911bba&title=&width=1133)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660872397379-b926255e-c29a-4ef7-b2be-6e3876e1e579.png#clientId=ufa46b146-fcc0-4&from=paste&height=508&id=u78d17b8f&name=image.png&originHeight=1016&originWidth=2164&originalType=binary&ratio=1&rotation=0&showTitle=false&size=721535&status=done&style=shadow&taskId=u94090588-c0f0-4da1-ab75-b93328a807e&title=&width=1082)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660872504562-02a51f35-c3f6-45e1-b278-04a3b9dacebf.png#clientId=ufa46b146-fcc0-4&from=paste&height=440&id=ue9ae42d0&name=image.png&originHeight=880&originWidth=2202&originalType=binary&ratio=1&rotation=0&showTitle=false&size=698859&status=done&style=shadow&taskId=u04048168-fe7c-4607-af2e-46277ca0079&title=&width=1101)
### 请求与响应
#### 请求映射路径
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660873307373-9e144588-4376-4197-adaa-78ad4a53b8f2.png#clientId=ufa46b146-fcc0-4&from=paste&height=571&id=ud4bff322&name=image.png&originHeight=1142&originWidth=2242&originalType=binary&ratio=1&rotation=0&showTitle=false&size=898001&status=done&style=shadow&taskId=u7dc98ff1-c8c3-40a0-bd7e-17d32f37a18&title=&width=1121)
#### 请求参数
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660876054445-f6db65d2-69b9-4007-97ce-820399ab970f.png#clientId=ufa46b146-fcc0-4&from=paste&height=566&id=ubad7e56d&name=image.png&originHeight=1132&originWidth=2258&originalType=binary&ratio=1&rotation=0&showTitle=false&size=813919&status=done&style=shadow&taskId=u007973d2-7d7a-4369-af63-d6e1ba3b3f4&title=&width=1129)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660877165408-29911b50-192c-4eb4-97d1-f6d3c5bee64a.png#clientId=ufa46b146-fcc0-4&from=paste&height=553&id=u2cc9dc5d&name=image.png&originHeight=1106&originWidth=2200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=562123&status=done&style=shadow&taskId=ua3d31aec-5e40-433f-bc36-b327a06592d&title=&width=1100)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660877670293-3615afaf-5a35-41d7-9ff7-ffd98f8b1400.png#clientId=ufa46b146-fcc0-4&from=paste&height=427&id=u09256336&name=image.png&originHeight=854&originWidth=2250&originalType=binary&ratio=1&rotation=0&showTitle=false&size=504951&status=done&style=shadow&taskId=ua8604ef5-fab1-4d14-b269-7b3492acc49&title=&width=1125)
```java
package com.red.config;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;

public class ServletContainersInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    /**
     * 设置过滤器
     * 处理字符乱码
     * @return
     */
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("utf-8");
        return new Filter[]{filter};
    }
}

```
##### 5种类型参数传参
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660882878574-9680a042-7b80-43ee-8448-f3228b19ead2.png#clientId=ufa46b146-fcc0-4&from=paste&height=501&id=uae9385d8&name=image.png&originHeight=1002&originWidth=2218&originalType=binary&ratio=1&rotation=0&showTitle=false&size=512933&status=done&style=shadow&taskId=u3e120660-b1b3-4363-bb7b-177f111f276&title=&width=1109)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660882903811-7751d6dc-7b41-42e1-8f8b-11a499b7943f.png#clientId=ufa46b146-fcc0-4&from=paste&height=494&id=u219ec709&name=image.png&originHeight=988&originWidth=2212&originalType=binary&ratio=1&rotation=0&showTitle=false&size=581465&status=done&style=shadow&taskId=ub787d0ed-5b7e-4acc-9354-0a7c77b2371&title=&width=1106)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660882920162-92246a98-499c-4469-ae20-07f7592f72f9.png#clientId=ufa46b146-fcc0-4&from=paste&height=463&id=u502b4a35&name=image.png&originHeight=926&originWidth=2220&originalType=binary&ratio=1&rotation=0&showTitle=false&size=904953&status=done&style=shadow&taskId=ub6dbf87b-9188-4ce3-a85d-2fbdd3425c6&title=&width=1110)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660882941024-5c427bfa-cae2-4db6-8ce0-d3a096d4061e.png#clientId=ufa46b146-fcc0-4&from=paste&height=514&id=u7339cc65&name=image.png&originHeight=1028&originWidth=2242&originalType=binary&ratio=1&rotation=0&showTitle=false&size=439950&status=done&style=shadow&taskId=udb08fc91-8e20-4d24-860b-c78efaacc19&title=&width=1121)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660882954061-98b51c6a-bf2e-4e57-a608-713479f20966.png#clientId=ufa46b146-fcc0-4&from=paste&height=532&id=u08843b3b&name=image.png&originHeight=1064&originWidth=2286&originalType=binary&ratio=1&rotation=0&showTitle=false&size=577991&status=done&style=shadow&taskId=ua631a69c-a86a-484c-a569-5a1b6237a9b&title=&width=1143)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660882962864-1a8b5626-e64a-4d62-b2cd-208342a0e64b.png#clientId=ufa46b146-fcc0-4&from=paste&height=515&id=u07922aff&name=image.png&originHeight=1030&originWidth=2208&originalType=binary&ratio=1&rotation=0&showTitle=false&size=470900&status=done&style=shadow&taskId=uf0e61e2b-690e-4030-8cb5-45d33267bbf&title=&width=1104)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660882976760-8855f3cc-ad00-4e4c-a7f8-6d6d063ce20e.png#clientId=ufa46b146-fcc0-4&from=paste&height=508&id=u6904b48a&name=image.png&originHeight=1016&originWidth=2240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=447434&status=done&style=shadow&taskId=u7b2ade1f-263d-44e6-8a08-0d2cd2d3643&title=&width=1120)
##### JSON数据传递参数
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660884279260-b7b25593-4f03-4326-af35-78f046bdb7de.png#clientId=ufa46b146-fcc0-4&from=paste&height=269&id=u8be87c5b&name=image.png&originHeight=538&originWidth=1952&originalType=binary&ratio=1&rotation=0&showTitle=false&size=352615&status=done&style=shadow&taskId=ua69b0265-2815-455c-91fc-b8f09d5d8ba&title=&width=976)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660884294259-f6e3c70e-5a23-475c-a873-841926103844.png#clientId=ufa46b146-fcc0-4&from=paste&height=328&id=ud4717f46&name=image.png&originHeight=656&originWidth=1826&originalType=binary&ratio=1&rotation=0&showTitle=false&size=222681&status=done&style=shadow&taskId=u4cfe761d-01d2-4611-abd2-ebe8e294089&title=&width=913)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660884333952-3a8fbca6-6af9-4c5b-8989-7e31fe4207a8.png#clientId=ufa46b146-fcc0-4&from=paste&height=482&id=u95001315&name=image.png&originHeight=964&originWidth=2228&originalType=binary&ratio=1&rotation=0&showTitle=false&size=379909&status=done&style=shadow&taskId=udd0ca327-0944-4ef9-8e48-aad56d3fc38&title=&width=1114)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660884353958-cb53efd5-a7df-4080-a2cb-442fb7ae99e3.png#clientId=ufa46b146-fcc0-4&from=paste&height=300&id=ue7e8ceec&name=image.png&originHeight=600&originWidth=2182&originalType=binary&ratio=1&rotation=0&showTitle=false&size=338773&status=done&style=shadow&taskId=u0252c646-1ba8-4556-b073-13aad4f5129&title=&width=1091)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660884449010-2b9c7d64-c8cc-4282-bda6-1809cdced18f.png#clientId=ufa46b146-fcc0-4&from=paste&height=357&id=u9440ff50&name=image.png&originHeight=714&originWidth=2072&originalType=binary&ratio=1&rotation=0&showTitle=false&size=420897&status=done&style=shadow&taskId=u94f32998-864d-4136-827e-ca755f0607f&title=&width=1036)

##### 日期类型参数传递
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660884786602-27d2beca-a4a8-4906-8094-9f2a4422318e.png#clientId=ufa46b146-fcc0-4&from=paste&height=570&id=ub491163c&name=image.png&originHeight=1140&originWidth=2230&originalType=binary&ratio=1&rotation=0&showTitle=false&size=679448&status=done&style=shadow&taskId=ud3d291ee-7c47-4d69-896e-fb9d9332489&title=&width=1115)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660884901034-30d722a7-aa51-48b0-bc05-b411125e201b.png#clientId=ufa46b146-fcc0-4&from=paste&height=535&id=u59edce0e&name=image.png&originHeight=1070&originWidth=1994&originalType=binary&ratio=1&rotation=0&showTitle=false&size=326804&status=done&style=shadow&taskId=u9ee997bf-e197-41e5-bbc0-8f466b8aa42&title=&width=997)
#### 响应JSON数据
下面这些功能都是基于在pom中导入jackson-databind以及在SpringMvcConfig中开启注解@EnableWebMvc如下：
```xml
<dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.13.3</version>
</dependency>
```
```java
@Configuration
@ComponentScan("com.red.controller")
@EnableWebMvc//功能非常多，这里是开启json数据转对象
public class SpringMvcConfig {
}
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660885235352-35b613fd-2933-4339-b067-a9cc94e1b005.png#clientId=ufa46b146-fcc0-4&from=paste&height=239&id=u3ad84160&name=image.png&originHeight=478&originWidth=1768&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84044&status=done&style=shadow&taskId=u3b8ff046-3af7-4910-b07a-a9500fde06d&title=&width=884)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660885244466-b0d7c98c-6177-4431-9c95-0a2f97edaadc.png#clientId=ufa46b146-fcc0-4&from=paste&height=235&id=ufd1fc43b&name=image.png&originHeight=470&originWidth=1500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=115119&status=done&style=shadow&taskId=u212b28cd-9085-4e02-ac0b-f8457cd4fce&title=&width=750)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660885253476-00d83b03-091f-42fe-9efe-bc87d03b5d4c.png#clientId=ufa46b146-fcc0-4&from=paste&height=275&id=ua58fd176&name=image.png&originHeight=550&originWidth=1820&originalType=binary&ratio=1&rotation=0&showTitle=false&size=240593&status=done&style=shadow&taskId=uda04e11f-a07d-466f-8165-803156aab66&title=&width=910)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660885272662-4938d14b-fb95-4d79-b7f1-e55955f56445.png#clientId=ufa46b146-fcc0-4&from=paste&height=350&id=u3967732c&name=image.png&originHeight=700&originWidth=1936&originalType=binary&ratio=1&rotation=0&showTitle=false&size=253305&status=done&style=shadow&taskId=uff97666d-99b3-4835-8635-a84277c9ab5&title=&width=968)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660885286424-b60edca3-9221-4899-bf2d-9b8ba9b0dd8c.png#clientId=ufa46b146-fcc0-4&from=paste&height=519&id=ud1231564&name=image.png&originHeight=1038&originWidth=1714&originalType=binary&ratio=1&rotation=0&showTitle=false&size=676822&status=done&style=shadow&taskId=u9db02ddf-511d-453a-a0ae-dc96cc79a28&title=&width=857)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660885325159-4411c6c1-48c4-412e-943f-5a8107c3458c.png#clientId=ufa46b146-fcc0-4&from=paste&height=422&id=u0b5b07a2&name=image.png&originHeight=844&originWidth=1896&originalType=binary&ratio=1&rotation=0&showTitle=false&size=313551&status=done&style=shadow&taskId=uc343ed0d-3110-404c-a288-98f584b2982&title=&width=948)
依靠这个接口下的实现类
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660885438216-166743b1-fa06-4862-ae1e-2f055a376881.png#clientId=ufa46b146-fcc0-4&from=paste&height=402&id=u85dbef72&name=image.png&originHeight=804&originWidth=2216&originalType=binary&ratio=1&rotation=0&showTitle=false&size=466182&status=done&style=shadow&taskId=u537b62a5-4f32-4b88-a0d3-f81639fc80c&title=&width=1108)
## REST风格
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660886181058-529039d0-acb0-4552-bd90-8111b7781275.png#clientId=ufa46b146-fcc0-4&from=paste&height=503&id=u58fae047&name=image.png&originHeight=1006&originWidth=2258&originalType=binary&ratio=1&rotation=0&showTitle=false&size=428814&status=done&style=shadow&taskId=u20cdd11d-8194-41d6-9712-97e53e54bfb&title=&width=1129)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660886457755-cbc3df09-0f14-4a07-b3f9-7496488928b3.png#clientId=ufa46b146-fcc0-4&from=paste&height=584&id=u75fc95d1&name=image.png&originHeight=1168&originWidth=2254&originalType=binary&ratio=1&rotation=0&showTitle=false&size=726222&status=done&style=shadow&taskId=u673ba144-648c-4cc9-b502-1ddefa3f0a0&title=&width=1127)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660886903561-27a43ad7-71f7-4835-b448-a390c1da748d.png#clientId=ufa46b146-fcc0-4&from=paste&height=557&id=u5e59e64c&name=image.png&originHeight=1114&originWidth=2284&originalType=binary&ratio=1&rotation=0&showTitle=false&size=555485&status=done&style=shadow&taskId=u12b0d8a9-fed4-4f26-9552-e1f32548e4a&title=&width=1142)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660886940116-7edbd01b-f31c-4456-816e-b143e2a56bd8.png#clientId=ufa46b146-fcc0-4&from=paste&height=320&id=u1d960182&name=image.png&originHeight=640&originWidth=2182&originalType=binary&ratio=1&rotation=0&showTitle=false&size=301811&status=done&style=shadow&taskId=uc4590af7-367f-475f-bfd1-e172357b322&title=&width=1091)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660886991341-ab0c2475-685f-47e2-9316-2fa5d993a95d.png#clientId=ufa46b146-fcc0-4&from=paste&height=533&id=u55a2d5ca&name=image.png&originHeight=1066&originWidth=2222&originalType=binary&ratio=1&rotation=0&showTitle=false&size=576032&status=done&style=shadow&taskId=u1eefb3ac-746e-4da7-add0-4e1a389dc38&title=&width=1111)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660887003255-a1fcdcbd-7ee0-498e-b3bd-e4099a689f4e.png#clientId=ufa46b146-fcc0-4&from=paste&height=444&id=u41229cff&name=image.png&originHeight=888&originWidth=2052&originalType=binary&ratio=1&rotation=0&showTitle=false&size=535303&status=done&style=shadow&taskId=u4f19614e-1007-48e5-b19a-cb237b33936&title=&width=1026)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660887079185-de75a986-4fa7-4a98-89b2-720650ab50ab.png#clientId=ufa46b146-fcc0-4&from=paste&height=432&id=u68942a6e&name=image.png&originHeight=864&originWidth=2194&originalType=binary&ratio=1&rotation=0&showTitle=false&size=763609&status=done&style=shadow&taskId=u63c4a9bb-9151-4ede-99e9-bd3d75c4b0a&title=&width=1097)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660887504001-a281a189-d1ed-4cde-9fe1-d236d3e41880.png#clientId=ufa46b146-fcc0-4&from=paste&height=437&id=uf13e4a3f&name=image.png&originHeight=874&originWidth=2246&originalType=binary&ratio=1&rotation=0&showTitle=false&size=553995&status=done&style=shadow&taskId=u0a829183-1005-4b6f-9c08-8f426333024&title=&width=1123)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660887539876-9939a49c-140c-4875-8e7e-bb2299aa8b93.png#clientId=ufa46b146-fcc0-4&from=paste&height=474&id=u1654030b&name=image.png&originHeight=948&originWidth=2288&originalType=binary&ratio=1&rotation=0&showTitle=false&size=601689&status=done&style=shadow&taskId=u72ebbdf3-43a0-44e3-85eb-c6521eca1ff&title=&width=1144)
### 最后注意：
处理ServletContainerInitConfig类中拦截的所有路径都归于SpringMVC管理，导致静态页面资源访问不到的问题（被误当做controller）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660889809797-04320b29-b5a7-4d33-bf61-8a87e61897fd.png#clientId=ufa46b146-fcc0-4&from=paste&height=437&id=u787c3b27&name=image.png&originHeight=874&originWidth=2316&originalType=binary&ratio=1&rotation=0&showTitle=false&size=750265&status=done&style=shadow&taskId=ue744a601-7fe2-48cf-aca8-a0ca0225bba&title=&width=1158)
## SSM整合
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660890004371-8fb9c4ce-84ba-495c-a008-41736b3a2412.png#clientId=ufa46b146-fcc0-4&from=paste&height=573&id=u996a1c44&name=image.png&originHeight=1146&originWidth=1042&originalType=binary&ratio=1&rotation=0&showTitle=false&size=380906&status=done&style=shadow&taskId=u713ef3ce-6428-44a6-bc74-699a80dd71f&title=&width=521)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660897298128-3ee89a7f-9819-4e96-a1e5-ecd0d101ae62.png#clientId=u9e0c1b43-00df-4&from=paste&height=747&id=u5725fb74&name=image.png&originHeight=1494&originWidth=718&originalType=binary&ratio=1&rotation=0&showTitle=false&size=140405&status=done&style=shadow&taskId=ua7fe99a0-9c7c-4816-927c-a97cb497e4b&title=&width=359)
### 代码区
```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.red</groupId>
  <artifactId>springmvc_08_ssm</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13.2</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.13.3</version>
    </dependency>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.10</version>
    </dependency>
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.2</version>
    </dependency>
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.2.8</version>
    </dependency>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.28</version>
    </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.24</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.2</version>
        <configuration>
          <port>80</port>
          <path>/</path>
        </configuration>
      </plugin>
    </plugins>
  </build>

</project>

```
```java
package com.red.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan({"com.red.service","com.red.dao"})
@PropertySource("classpath:jdbc.properties")
@Import({JdbcConfig.class,MybatisConfig.class})
@EnableTransactionManagement//开启事务注解
public class SpringConfig {
}

```
```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring_db
jdbc.username=root
jdbc.password=12345678
```
```java
package com.red.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

public class JdbcConfig {

    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource dataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource){
        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
        dataSourceTransactionManager.setDataSource(dataSource);
        return dataSourceTransactionManager;
    }
}

```
```java
package com.red.config;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

public class MybatisConfig {

    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource){
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setTypeAliasesPackage("com.red.pojo");
        sqlSessionFactoryBean.setDataSource(dataSource);
        return sqlSessionFactoryBean;
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setBasePackage("com.red.dao");
        return mapperScannerConfigurer;
    }
}

```
```java
package com.red.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan("com.red.controller")
@EnableWebMvc
public class SpringMvcConfig {
}

```
```java
package com.red.config;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;

public class ServletConfig extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    /**
     * 表单提交 中文乱码处理 - 过滤器
     * 提交的json数据直接在jackson工具中进行了数据处理
     * @return
     */
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("utf-8");
        return new Filter[]{filter};
    }
}

```
```java
package com.red.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    private Integer id;
    private String type;
    private String name;
    private String description;
}

```
```java
package com.red.dao;

import com.red.pojo.Book;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookDao {
    /**
     * 如果查询参数返回值的名称与实体类的属性名称不匹配，可以使用注解定义映射关系
     *
     */
//    @Results(id = "bookResultMap",value = {
//            @Result(column = "name",property = "name"),
//            @Result(column = "description",property = "description")
//    })
    @Insert("insert into tbl_book (type, name, description) values (#{type},#{name},#{description});")
    void save(Book book);
    @Update("update tbl_book set type = #{type}, name = #{name}, description = #{description} where id = #{id} ;")
    void update(Book book);
    @Delete("delete from tbl_book where id = #{id};")
    void delete(Integer id);
    //使用ResultMap定义返回值映射类型
//    @ResultMap("bookResultMap")
    @Select("select * from tbl_book where id = #{id};")
    Book getById(Integer id);
//    @ResultMap("bookResultMap")
    @Select("select * from tbl_book;")
    List<Book> getAll();
}

```
```java
package com.red.service;

import com.red.pojo.Book;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface BookService {
    /**
     * 保存
     * @param book
     * @return
     */
    boolean save(Book book);

    /**
     * 更新
     * @param book
     * @return
     */
    boolean update(Book book);

    /**
     * 删除
     * @param id
     * @return
     */
    boolean delete(Integer id);

    /**
     * 根据id查询
     * @param id
     * @return
     */
    Book getById(Integer id);

    /**
     * 查询全部
     * @return
     */
    List<Book> getAll();
}

```
```java
package com.red.service.impl;

import com.red.dao.BookDao;
import com.red.pojo.Book;
import com.red.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;
    @Override
    public boolean save(Book book) {
        bookDao.save(book);
        return true;
    }

    @Override
    public boolean update(Book book) {
        bookDao.update(book);
        return true;
    }

    @Override
    public boolean delete(Integer id) {
        bookDao.delete(id);
        return true;
    }

    @Override
    public Book getById(Integer id) {
        return bookDao.getById(id);
    }

    @Override
    public List<Book> getAll() {
        return bookDao.getAll();
    }
}

```
```java
package com.red.controller;

import com.red.pojo.Book;
import com.red.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;
    @PostMapping
    public boolean save(@RequestBody Book book) {
        return bookService.save(book);
    }

    @PutMapping
    public boolean update(@RequestBody Book book) {
        return bookService.update(book);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable("id") Integer id) {
        return bookService.delete(id);
    }

    @GetMapping("/{id}")
    public Book getById(@PathVariable Integer id) {
        return bookService.getById(id);
    }

    @GetMapping
    public List<Book> getAll() {
        return bookService.getAll();
    }
}

```
```java
package com.red.service;

import com.red.config.SpringConfig;
import com.red.pojo.Book;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class BookServiceTest {

    @Autowired
    private BookService bookService;
    @Test
    public void testGetById(){
        Book book = bookService.getById(1);
        System.out.println(book);
    }
    @Test
    public void testGetAll(){
        List<Book> all = bookService.getAll();
        System.out.println(all);
    }
}

```
### 表现层数据封装
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660897853577-cacb27c6-01e0-4a64-af47-b71193bc18a6.png#clientId=u9e0c1b43-00df-4&from=paste&height=578&id=u885e5c02&name=image.png&originHeight=1156&originWidth=2344&originalType=binary&ratio=1&rotation=0&showTitle=false&size=524676&status=done&style=shadow&taskId=ub48702ac-7134-4e59-b776-35c4c2e01ea&title=&width=1172)
统一格式
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660898111054-b8767797-1592-4425-a5e0-1d24b2f26d01.png#clientId=u9e0c1b43-00df-4&from=paste&height=506&id=uf1de7c6d&name=image.png&originHeight=1012&originWidth=2414&originalType=binary&ratio=1&rotation=0&showTitle=false&size=513958&status=done&style=shadow&taskId=uddc88ab1-33fd-4da1-a0f9-a8bd98f47b9&title=&width=1207)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660898157718-2f9ce03c-40f1-43d7-a7ba-af8758870b39.png#clientId=u9e0c1b43-00df-4&from=paste&height=516&id=ueb7814e2&name=image.png&originHeight=1032&originWidth=2302&originalType=binary&ratio=1&rotation=0&showTitle=false&size=304973&status=done&style=shadow&taskId=ua9e7dafd-be30-40ae-99a8-d087129200a&title=&width=1151)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660899423342-cc4902f1-a5bc-4547-b613-1e6a5361fbe8.png#clientId=u9e0c1b43-00df-4&from=paste&height=496&id=u846ba702&name=image.png&originHeight=992&originWidth=2220&originalType=binary&ratio=1&rotation=0&showTitle=false&size=707998&status=done&style=shadow&taskId=ud327e90a-0b7c-4672-9627-1687fa99e9a&title=&width=1110)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660899453167-89a216f3-8873-4ea2-86d7-acff86230339.png#clientId=u9e0c1b43-00df-4&from=paste&height=480&id=uf33cd48e&name=image.png&originHeight=960&originWidth=2202&originalType=binary&ratio=1&rotation=0&showTitle=false&size=458437&status=done&style=shadow&taskId=ud8221d40-5e97-4b5a-8371-fdd716d9420&title=&width=1101)
```java
package com.red.controller;

public class Result {
    private Object data;
    private Integer code;
    private String msg;

    public Result() {
    }

    public Result(Integer code, Object data, String msg) {
        this.data = data;
        this.code = code;
        this.msg = msg;
    }

    public Result(Integer code,Object data) {
        this.data = data;
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

```
```java
package com.red.controller;

/**
 * 响应状态码
 */
public class Code {
    public static final Integer SAVE_OK = 20011;
    public static final Integer DELETE_OK = 20021;
    public static final Integer UPDATE_OK = 20031;
    public static final Integer GET_OK = 20041;

    public static final Integer SAVE_ERR = 20010;
    public static final Integer DELETE_ERR = 20020;
    public static final Integer UPDATE_ERR = 20030;
    public static final Integer GET_ERR = 20040;

}

```
### 异常处理器
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660899606211-c27215cc-2833-4ea0-a00d-f8cb8facbcc6.png#clientId=u9e0c1b43-00df-4&from=paste&height=431&id=ua7ca13dc&name=image.png&originHeight=862&originWidth=2222&originalType=binary&ratio=1&rotation=0&showTitle=false&size=466607&status=done&style=shadow&taskId=u8eedd352-5d4a-451c-9cfa-7778678b60f&title=&width=1111)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660899769277-f2add454-db2c-4fc3-bfb7-5bdde7d3fe97.png#clientId=u9e0c1b43-00df-4&from=paste&height=320&id=u40d5b0b1&name=image.png&originHeight=640&originWidth=2154&originalType=binary&ratio=1&rotation=0&showTitle=false&size=581355&status=done&style=shadow&taskId=u0f8ec624-f8a5-4436-a6e5-bf5a23e1539&title=&width=1077)

1. 各个层级均出现异常，异常处理代码书写在哪一层?
   1. 所有的异常均抛出到表现层进行处理
2. 表现层处理异常，每个方法中单独书写，代码书写量巨大且意义不强，如何解决
   1. AOP思想

其实SpringMVC已经替我们想到了:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660900158581-64362738-67a5-448e-a169-b7671a3ca1b7.png#clientId=u9e0c1b43-00df-4&from=paste&height=422&id=u4c911ec5&name=image.png&originHeight=844&originWidth=2150&originalType=binary&ratio=1&rotation=0&showTitle=false&size=319447&status=done&style=shadow&taskId=u31657140-6a3e-4d32-819d-4e3be733528&title=&width=1075)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660901727998-cab0326f-1e85-4475-991b-3e9255116524.png#clientId=u9e0c1b43-00df-4&from=paste&height=242&id=ua5935705&name=image.png&originHeight=484&originWidth=1678&originalType=binary&ratio=1&rotation=0&showTitle=false&size=125062&status=done&style=shadow&taskId=ud68ed54a-06d1-4abc-96c1-7a1db6ffc97&title=&width=839)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660901785863-40f36fcd-9c09-42ec-af36-9d2f494959db.png#clientId=u9e0c1b43-00df-4&from=paste&height=460&id=u477d550a&name=image.png&originHeight=920&originWidth=2128&originalType=binary&ratio=1&rotation=0&showTitle=false&size=416384&status=done&style=shadow&taskId=u8922d608-498c-4729-b13c-2aa29a43d0d&title=&width=1064)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660901803878-e16007fe-a240-4286-9da4-ce894391123b.png#clientId=u9e0c1b43-00df-4&from=paste&height=524&id=u5acfc8c5&name=image.png&originHeight=1048&originWidth=2232&originalType=binary&ratio=1&rotation=0&showTitle=false&size=836268&status=done&style=shadow&taskId=u7afad46c-5b7f-4cc0-9cf3-a44349f905b&title=&width=1116)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660901838103-23c66382-a0a3-4295-a4d7-e6c2242a15e2.png#clientId=u9e0c1b43-00df-4&from=paste&height=875&id=uf9fed502&name=image.png&originHeight=1750&originWidth=2880&originalType=binary&ratio=1&rotation=0&showTitle=false&size=245669&status=done&style=shadow&taskId=ud8f1dbd1-710b-461d-87ec-8068c3c7169&title=&width=1440)
### 项目异常处理方案
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660902838516-011fdd7d-5ee2-436d-8f27-23fb5db88cde.png#clientId=u9e0c1b43-00df-4&from=paste&height=484&id=u86da3f36&name=image.png&originHeight=968&originWidth=2374&originalType=binary&ratio=1&rotation=0&showTitle=false&size=311520&status=done&style=shadow&taskId=u62bec630-bd95-4720-93f2-7e76677409f&title=&width=1187)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660902908765-b2233b67-4ab7-4d33-9b3e-9a9d6fc49160.png#clientId=u9e0c1b43-00df-4&from=paste&height=511&id=ua7a46b66&name=image.png&originHeight=1022&originWidth=2344&originalType=binary&ratio=1&rotation=0&showTitle=false&size=479935&status=done&style=shadow&taskId=u501b9f4a-fb24-44fe-8ea4-bffaead9d0c&title=&width=1172)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660902989851-8cc4d28c-973a-41a8-b2e1-20f3577bee2c.png#clientId=u9e0c1b43-00df-4&from=paste&height=462&id=ua923754c&name=image.png&originHeight=924&originWidth=1620&originalType=binary&ratio=1&rotation=0&showTitle=false&size=407851&status=done&style=shadow&taskId=ub88f7acf-2deb-4891-8dd6-4966f7965e7&title=&width=810)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660903711408-00ef8158-3294-43b7-ac82-9a6b96eef0e0.png#clientId=u9e0c1b43-00df-4&from=paste&height=521&id=u8539e39e&name=image.png&originHeight=1042&originWidth=2240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=538923&status=done&style=shadow&taskId=u89433046-1ce6-4aef-b114-11e8c3ccdba&title=&width=1120)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660903725274-512e0a85-c112-4853-ae45-608bb175e576.png#clientId=u9e0c1b43-00df-4&from=paste&height=522&id=u28d885f2&name=image.png&originHeight=1044&originWidth=2242&originalType=binary&ratio=1&rotation=0&showTitle=false&size=567598&status=done&style=shadow&taskId=ued5521e2-fb3b-4c3a-bf8e-e3973f8ad06&title=&width=1121)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660903740414-ddfb4259-86cd-4c9b-805e-b9d086627a8a.png#clientId=u9e0c1b43-00df-4&from=paste&height=327&id=u7b7df9f4&name=image.png&originHeight=654&originWidth=2224&originalType=binary&ratio=1&rotation=0&showTitle=false&size=367893&status=done&style=shadow&taskId=u49913989-f14e-4976-b735-15750eb0a71&title=&width=1112)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660903793199-c4224fd1-3f8b-43ea-91e9-d32f19a942d7.png#clientId=u9e0c1b43-00df-4&from=paste&height=475&id=ub6a5675d&name=image.png&originHeight=950&originWidth=2300&originalType=binary&ratio=1&rotation=0&showTitle=false&size=404384&status=done&style=shadow&taskId=u39d8310a-6db7-4f2c-91fa-8dcb6ef7cdc&title=&width=1150)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660903832807-fa5c8564-81b7-4339-a9c9-efbc027f07b2.png#clientId=u9e0c1b43-00df-4&from=paste&height=519&id=u92d40818&name=image.png&originHeight=1038&originWidth=2248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1195584&status=done&style=shadow&taskId=ub155bda8-c144-4652-a944-dce38714fde&title=&width=1124)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660903867857-cf17772e-834f-4d20-b77c-dbcfdceb340d.png#clientId=u9e0c1b43-00df-4&from=paste&height=472&id=uaa9d6acc&name=image.png&originHeight=944&originWidth=2282&originalType=binary&ratio=1&rotation=0&showTitle=false&size=539011&status=done&style=shadow&taskId=u1ced64e5-da50-4e31-8adf-5963f263cbb&title=&width=1141)
```java
package com.red.controller;

import com.red.exception.BusinessException;
import com.red.exception.SystemException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice//声明这个类是处理REST风格开发的异常处理类
public class ProjectExceptionAdvice {

    @ExceptionHandler(BusinessException.class)
    public Result doBusinessException(BusinessException exception){

        return new Result(exception.getCode(),null,exception.getMessage());
    }

    @ExceptionHandler(SystemException.class)
    public Result doSystemException(SystemException exception){
        //记录日志
        //发送邮件通知开发人员
        //发送短信给运维人员
        return new Result(exception.getCode(),null,exception.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public Result doException(Exception exception){
        //记录日志
        //发送邮件通知开发人员
        //发送短信给运维人员
        return new Result(666,null,"出现异常了"+exception.getMessage());
    }
}

```

## 拦截器
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660905451686-2e33e180-f32b-47c4-96b6-f2e81f2b8aca.png#clientId=u9e0c1b43-00df-4&from=paste&height=566&id=u827601d5&name=image.png&originHeight=1132&originWidth=2392&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1107642&status=done&style=shadow&taskId=uc071bcd5-ee30-44c4-8315-34227f5c395&title=&width=1196)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660905767424-a18707ce-879f-4e0a-ab1d-2d2b0d0f5800.png#clientId=u9e0c1b43-00df-4&from=paste&height=306&id=uf84dd05b&name=image.png&originHeight=612&originWidth=1414&originalType=binary&ratio=1&rotation=0&showTitle=false&size=206488&status=done&style=shadow&taskId=u1c738f17-d0f5-4539-95e3-2f6e7397e05&title=&width=707)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660905784525-7d45a4e9-9853-40db-abfd-35549cdd860f.png#clientId=u9e0c1b43-00df-4&from=paste&height=233&id=u35b94e6f&name=image.png&originHeight=466&originWidth=2142&originalType=binary&ratio=1&rotation=0&showTitle=false&size=243329&status=done&style=shadow&taskId=u006ef45c-8ede-4d6c-9dda-3afaf8c8c3c&title=&width=1071)
### 入门案例
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660907399089-977d730a-e5a5-40fb-b69f-89cf3370f131.png#clientId=u9e0c1b43-00df-4&from=paste&height=491&id=u6cbca543&name=image.png&originHeight=982&originWidth=2176&originalType=binary&ratio=1&rotation=0&showTitle=false&size=577546&status=done&style=shadow&taskId=u3289a1a3-76fa-4113-bd97-a19d514f749&title=&width=1088)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660907418636-9c5ceaea-545f-4a96-b62f-d591e3e62a27.png#clientId=u9e0c1b43-00df-4&from=paste&height=343&id=ufee27e65&name=image.png&originHeight=686&originWidth=2192&originalType=binary&ratio=1&rotation=0&showTitle=false&size=488668&status=done&style=shadow&taskId=u0b7a7880-9274-40c4-93fb-0dcaddc5587&title=&width=1096)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660907447184-e874911c-643a-4b37-a6fc-96c0fcaff997.png#clientId=u9e0c1b43-00df-4&from=paste&height=433&id=ua93fd2ac&name=image.png&originHeight=866&originWidth=2364&originalType=binary&ratio=1&rotation=0&showTitle=false&size=685666&status=done&style=shadow&taskId=ucec9d848-0729-4b02-8238-7c31fb440a9&title=&width=1182)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660907653436-b58ad4af-080a-4117-b3fe-0eb501929765.png#clientId=u9e0c1b43-00df-4&from=paste&height=474&id=udd49f7f1&name=image.png&originHeight=948&originWidth=2346&originalType=binary&ratio=1&rotation=0&showTitle=false&size=591037&status=done&style=shadow&taskId=u4c08aa8d-e20d-4d8e-b266-c82f0297a6b&title=&width=1173)
### 执行流程
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660907718713-9700d8bb-4ac1-47df-92f3-83716da62d9e.png#clientId=u9e0c1b43-00df-4&from=paste&height=556&id=u75d79966&name=image.png&originHeight=1112&originWidth=2494&originalType=binary&ratio=1&rotation=0&showTitle=false&size=484618&status=done&style=shadow&taskId=uf9556a0a-2061-4822-bdc5-3ab0e9502f4&title=&width=1247)
### 拦截器参数
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660907977307-c707deaf-6e6c-4022-9e0c-1ec692cd6e28.png#clientId=u9e0c1b43-00df-4&from=paste&height=579&id=ufad9c6fe&name=image.png&originHeight=1158&originWidth=2256&originalType=binary&ratio=1&rotation=0&showTitle=false&size=530883&status=done&style=shadow&taskId=ue4a5f697-27d0-48d2-9d4e-1f4c0f6bd66&title=&width=1128)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660907988928-4d142ef7-547d-45cc-9965-b66183f03269.png#clientId=u9e0c1b43-00df-4&from=paste&height=364&id=ua5387ebe&name=image.png&originHeight=728&originWidth=2190&originalType=binary&ratio=1&rotation=0&showTitle=false&size=399360&status=done&style=shadow&taskId=ub95482f7-1ae0-4c73-9ee0-8113e38b307&title=&width=1095)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660907997189-7e30c5e8-0419-45cd-a2d4-d911175965a9.png#clientId=u9e0c1b43-00df-4&from=paste&height=377&id=u597ea066&name=image.png&originHeight=754&originWidth=2266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=367284&status=done&style=shadow&taskId=u3695df66-1ee1-4045-950f-671963fe829&title=&width=1133)
### 多拦截器执行顺序
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660908240067-e631763a-c74a-4a8f-bea7-d51897323e26.png#clientId=u9e0c1b43-00df-4&from=paste&height=599&id=u0144c152&name=image.png&originHeight=1198&originWidth=2360&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1278774&status=done&style=shadow&taskId=u1561aa34-6e5b-4720-b9a2-8d5c206415e&title=&width=1180)
### 代码
```java
package com.red.config;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;

public class ServletContainersInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        return new Filter[]{filter};
    }
}

```
```java
package com.red.controller.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class ProjectInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion");
    }
}

```
```java
package com.red.config;

import com.red.controller.interceptor.ProjectInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class SpringMvcSupport extends WebMvcConfigurationSupport {
    @Autowired
    private ProjectInterceptor projectInterceptor;
    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(projectInterceptor).addPathPatterns("/books","/books/*");
    }

    /**
     * 对应的静态资源的映射
     * @param registry
     */
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/pages/**").addResourceLocations("/pages/");
    }

}

```
```java
package com.red.config;

import com.red.controller.interceptor.ProjectInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ComponentScan({"com.red.controller","com.red.config"})
@EnableWebMvc
public class SpringMvcConfig implements WebMvcConfigurer {
    
}

```
或者上面两块代码更改为下面一块
```java
package com.red.config;

import com.red.controller.interceptor.ProjectInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ComponentScan({"com.red.controller"})
@EnableWebMvc
public class SpringMvcConfig implements WebMvcConfigurer {
    @Autowired
    private ProjectInterceptor projectInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(projectInterceptor).addPathPatterns("/books","/books/*");
    }
}

```
```java
package com.red.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/books")
public class BookController {
    @GetMapping
    public String getAll(){
        return "{'books':'all'}";
    }
    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id){
        return "{'books':'"+id+"'}";
    }
}

```
