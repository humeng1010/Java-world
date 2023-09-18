---
title: Web核心内容
order: 4
---
# Web核心

JavaEE：Java企业版。指Java企业级开发的技术规范总和。包含13项技术规范：JDBC、JNDI、EJB、RMI、JSP、Servlet、XML、JMS、Java IDL、JTS、JTA、JavaMail、JAF

## HTTP

- HTTP的特点
  1. 基于TCP协议：面向连接，安全
  2. 基于请求-响应模型的：一次请求对应一次响应
  3. HTTP协议是无状态的协议：对于事务处理没有记忆能力，每次请求-响应都是独立的
     - 缺点：多次请求之间不能共享数据。Java中会使用会话技术（Cookie和Session）来解决这些问题
     - 优点：速度快



### HTTP-请求数据格式

- 请求数据分为3部分：
  1. **请求行**：请求数据的第一行。其中GET表示请求方式，/ 表示请求资源路径，HTTP/1.1 表示协议版本
  2. **请求头**：第二行开始，格式为key : value 形式
  3. **请求体**：**POST**请求的最后一部分，存放请求参数

![image-20220815093322207](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208150933262.png)

![image-20220815093443392](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208150934475.png)









### HTTP响应数据格式

- 响应数据分为3部分
  1. **响应行**：响应数据的第一行，其中HTTP/1.1表示协议版本，200表示响应状态码，OK表示状态码描述
  2. **响应头**：第二行开始，格式为key : value 形式
  3. **响应体**：最后一部分，存放数据

![image-20220815094326688](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208150943739.png)

响应状态码

| 状态码分类 | 说明                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| 1xx        | 响应中——临时状态码，表示请求已接受，告诉客户端应该继续请求或者如果它已完成则忽略它                   |
| 2xx        | 成功——表示请求已经被成功接收，处理完成                                                               |
| 3xx        | 重定向——重定向到其他地方：它让客户端再发起一个请求以完成整个处理                                     |
| 4xx        | 客户端错误——处理发生错误，责任在客户端，如：客户端的请求一个不存在的资源，客户端未被授权，禁止访问等 |
| 5xx        | 服务器端错误——处理发生错误，责任在服务端，如：服务端抛出异常，路由错误，HTTP版本不支持               |





## Apache Tmocat

### 概述

- Tomcat是Apache软件基金会的一个核心项目，是一个开源的免费的轻量级的web服务器，支持Servlet/JSP少量JavaEE规范
- Tomcat称为Web容器、Servlet容器。Servlet需要依赖于Tomcat才能运行
- 官网：https://tomcat.apache.org

#### 总结：

1. web服务器的作用？
   - **封装HTTP协议操作、开发简单**
   - **可以将web项目部署到服务器中，对外提供网上浏览服务**
2. Tomcat是一个开源的免费的轻量级的web服务器，支持Servlet/JSP少量JavaEE规范也称为Web容器、Servlet容器。

### IDEA中创建Maven Web项目

![image-20220815100352988](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151003147.png)



- 使用骨架
  1. 选择web项目骨架，创建项目
  2. 删除pom.xml中的多余的坐标
  3. 补齐缺失的目录结构

![image-20220815100441716](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151004804.png)



![image-20220815101126341](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151011473.png)



### IDEA中使用Tomcat

- 将本地的Tomcat集成到IDEA中，然后进行项目**部署**即可

![image-20220815101348247](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151013316.png)





- Maven插件使用Tomcat

  1. pom.xml中添加Tomcat插件

     ```xml
     		<build>
             <plugins>
                 <!--            tomcat的插件-->
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
     ```

     

  2. 使用Maven Helper插件快速启动项目，选中项目，右键--》Run Maven--》tomcat7：run

![image-20220815102432544](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151024620.png)



## Servlet

- Servlet是Java提供的动态web资源开发技术
- Servlet是JavaEE规范之一，其实就是一个**接口**，将来我们需要定义Servlet类实现Servlet接口，并由web服务器运行Servlet



### 快速入门

1. 创建 web 项目，导入Servlet 依赖坐标（**注意范围scope为provided运行时无效，因为tomcat中已经自带了Servlet的jar包，防止冲突）**

   ```xml
   <!--        导入Servlet依赖坐标-->
           <dependency>
               <groupId>javax.servlet</groupId>
               <artifactId>javax.servlet-api</artifactId>
               <version>4.0.1</version>
               <scope>provided</scope>
           </dependency>
   ```

   

2. 创建：定义一个类，实现Servlet接口，并重写接口中的所有方法，并在 service 方法总共输入一句话

   ```java
   public class ServletDemo1 implements Servlet {
   
       @Override
       public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
           System.out.println("servlet hello world~你好");
   
       }
   
   ```

   

3. 配置：在类上是用 @WebServlet 注解，配置该Servlet的访问路径

   ```java
   @WebServlet("/demo1")//配置访问路径
   public class ServletDemo1 implements Servlet {
   ```

   

4. 访问：启动 Tomcat ，浏览器输入URL 访问该Servlet

   ```
   http://localhost:8080/tomcat-demo1/demo1
   ```



### Servlet执行流程

![image-20220815121826653](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151218794.png)

1. Servlet由谁创建？Servlet方法由谁调用？
   - Servlet由web服务器创建，Servlet方法由web服务器调用
2. 服务器怎么知道Servlet中一定有service方法？
   - 因为我们自定义的Servlet类是实现了Servlet接口并且重写其方法，而Servlet接口中有service方法



### Servlet生命周期

- 对象的生命周期是指一个对象从被创建到被销毁的过程

- Servlet运行在Servlet容器（web服务器）中，其生命周期由容器来管理，分为4个阶段：

  1. **加载和实例化**：**默认情况下**，当Servlet**第一次被访问**的时候，由容器创建Servlet对象（可以设置在服务器启动的时候创建对象节约第一次访问时间：@WebServlet(urlPatterns = "/demo",loadOnStartup = 1)默认值为-1，设置为大于等于0的数在服务器启动的时候创建Servlet对象并且执行init初始化方法，优先级0最大 ）
  2. **初始化**：在Servlet实例化之后（创建），容器将调用Servlet的**init()**方法初始化这个对象，完成一些如加载配置文件、创建连接等初始化工作，该方法只会被调用**一次**
  3. **请求处理**：**每次**请求（访问url）Servlet时，Servlet容器会调用Servlet的**service()**方法对请求进行处理
  4. **服务终止**：当需要释放内存或者容器关闭时，容器会调用Servlet实例的**destroy()**方法完成资源的释放，在destroy()方法调用之后，容器会释放这个Servlet实例，该实例随后会被Java的垃圾收集器回收



### Servlet方法介绍

- 初始化方法，在Servlet对象被创建时执行，只执行一次

  ```java
  void init(ServletConfig config)
  ```

- 提供服务方法，每次Servlet被访问，都会调用该方法

  ```java
  void service(ServletRequest req,ServletResponse res)
  ```

- 销毁方法，当Servlet被销毁时，调用该方法，在内存释放或服务关闭时销毁Servlet

  ```java
  void destroy()
  ```

- 获取ServletConfig对象

  ```java
  ServletConfig getServletConfig()
  ```

- 获取Servlet信息(返回作者信息等，很少使用，可以直接返回""空字符串)

  ```java
  String getServletInfo()
  ```



### Servlet体系结构

![image-20220815123839835](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151238930.png)



- Servlet是**根接口**有抽象实现类GenericServlet，这个抽象实现类又有**HttpServlet抽象实现类**（对HTTP协议封装的Servlet实现类）
- 我们将来都是开发B/S架构的web项目，都是针对HTTP协议，所以我们**自定义的Servlet**，会**继承HttpServlet**

```java
package com.meng.web;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/demo2")
public class ServletDemo2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("get...");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("post...");
    }
}

```

#### 思考

1. HttpServlet中为什么要根据请求方式的不同，调用不同的方法？

   因为Get和POST的请求消息不一样，我们需要分别的去处理

#### 总结

1. HttpServlet使用步骤：

   1. 继承HttpServlet
   2. 重写doGet和doPost方法

2. HttpServlet原理

   获取请求方式，根据不同的请求方式，调用不同的doXxx方法



### Servlet urlPattern配置

- Servlet要想被访问，必须配置其访问路径（urlPattern）

  1. 一个Servlet，可以配置多个urlPattern

     @WebServlet(urlPatterns = { " /demo1 " , " /demo2 " }  )

  2. urlPattern配置规则

     1. 精确匹配
     2. 目录匹配
     3. 扩展名匹配
     4. 任意匹配

  1. 精确匹配：
     - 配置路径：@WebServlet("/user/select")
     - 访问路径：localhost:8080/web-demo/user/select
  2. 目录匹配：
     - 配置路径：@WebServlet("/user/*")
     - 访问路径：localhost:8080/web-demo/user/aaa   或者   localhost:8080/web-demo/user/bbb
  3. 扩展名匹配：
     - 配置路径：@WebServlet("*.do")
     - 访问路径：localhost:8080/web-demo/aaa.do或者localhost:8080/web-demo/bbb.do
  4. 任意匹配：不要配置
     - 配置路径：@WebServlet("/")或者@WebServlet("/*")
     - 访问路径：localhost:8080/web-demo/aaa 或者 localhost:8080/web-demo/bbb

  优先级：精确路径>目录路径>扩展名路径> /* > /

### 使用XML配置Servlet

![image-20220815124837628](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151248739.png)





### Request&Response

- Request：**获取**请求数据
- Response：**设置**响应数据

  

#### Request

##### Request继承体系

1. ServletRequest：java提供的请求对象**根接口**
2. HttpServletRequest：java提供的对Http协议封装的请求对象**接口**（继承1）
3. RequestFacade：Tomcat定义的实现类（继承2）（tomcat需要解析请求数据，封装为request对象，并且创建request对象传递到service方法中



##### Request获取请求数据

- 请求数据分为三部分：

  1. **请求行**：GET/reuqest-demo/req1?username=zhangsan HTTP/1.1
     - String getMethod()：获取请求方式：GET
     - String getContextPath()：获取**虚拟目录**（项目访问路径）：/request-demo
     - StringBuffer getRequestURL() ：获取URL(统一资源定位符)：*http://localhost:8080/request-demo/req1*
     - String getRequestURI()：获取URI(统一资源标识符)：/request-demo/req1
     - String **getQueryString()**：获取请求参数（GET方式）：username=zhangsan&password=123
  2. **请求头**：
     - String getHeader(String name)：根据请求头名称，获取值。（user-agent：浏览器版本）
  3. **请求体**：
     - ServletInputStream getInputStream()：获取字节输入流（音视频文件）
     - BufferReader getReader()：获取字符输入流（文本）

  ```java
  package com.meng.web;
  
  import javax.servlet.ServletException;
  import javax.servlet.annotation.WebServlet;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import java.io.BufferedReader;
  import java.io.IOException;
  
  @WebServlet("/demo3")
  public class ServletDemo3 extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          //1. **请求行**：GET/reuqest-demo/req1?username=zhangsan HTTP/1.1
          //   - String getMethod()：获取请求方式：GET
          String method = request.getMethod();
          System.out.println("请求方式：" + method);
          //   - String getContextPath()：获取虚拟目录（项目访问路径）：/tomcat-demo1
          String contextPath = request.getContextPath();
          System.out.println("虚拟目录" + contextPath);
          //   - StringBuffer getRequestURL() ：获取URL(统一资源定位符)：http://localhost:8080/tomcat-demo1/demo3
          StringBuffer url = request.getRequestURL();
          System.out.println(url.toString());
  
          //   - String getRequestURI()：获取URI(统一资源标识符)：/request-demo/req1
          String requestURI = request.getRequestURI();
          System.out.println(requestURI);
          //   - String getQueryString()：获取请求参数（GET方式）：username=zhangsan&password=123
          String queryString = request.getQueryString();
          System.out.println(queryString);
          //2. **请求头**：
          //   - String getHeader(String name)：根据请求头名称，获取值。（user-agent：浏览器版本）
          String agent = request.getHeader("user-agent");
          System.out.println(agent);
          //3. **请求体**：
          //   - ServletInputStream getInputStream()：获取字节输入流（音视频文件）
          //   - BufferReader getReader()：获取字符输入流（文本）
          BufferedReader reader = request.getReader();
          String line = reader.readLine();
          System.out.println(line);
  
      }
  
      @Override
      protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          this.doGet(request, response);
  
      }
  }
  
  ```

  

##### Request使用通用方式获取参数

- 刚刚我们发现：
  - GET方式：
    - String getQueryString()
  - POST方式：
    - BufferRead getReader();   reader.readLine();
- 通用方式：（思考：因为GET和POST方式代码中只有一部分获取用户传输的数据不一样，其他都一样，所有我们想在doPost中写this.doGet(request,response)将来收到POST请求也让它去GET方法中，可以大大简化重复代码，所以我们要使用相同的方式去获取不同方式传输的数据
  - 我们的想法：在doGet中写一个先获取请求方式，然后if判断是GET还是POST，**如果是GET就调用request的getQueryString()方法，如果是POST就调用request的getReader()方法**然后读一行reader.readLine();。
  - 其实Request已经这样做好了，而且做得更详细，它会把传进来的参数自动切割为键和值的**Map集合**！！而且如果一个键对应多个值，Request会判断键是否一样，如果一样会把值拼接一起形成一个数组！！！**Map集合：键：字符串；值：字符串数组**我们可以直接通过Request对象获取数据
  - Request提供的获取参数的通用方法：
    - Map<String, String[]> getParameterMap();：获取所有参数Map集合
    - String[] getParameterValues(String name)：根据名称获取参数值（数组）
    - String getParameter(String name)：根据名称获取参数值（单个值）



```java
package com.meng.web;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

@WebServlet("/req1")
public class RequestDemo1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = req.getMethod();
        System.out.println(method);
        //1、获取所有参数集合
        Map<String, String[]> map = req.getParameterMap();
        for (String key : map.keySet()) {
            System.out.print(key + ":");
            String[] values = map.get(key);
            for (String value : values) {
                System.out.print(value + " ");
            }
            System.out.println();
        }
        System.out.println("-------------------");
        //2、根据key获取参数值，数组
        String[] hobbies = req.getParameterValues("hobby");
        System.out.println(Arrays.toString(hobbies));
        System.out.println("-------------------");

        //3、根据key获取单个参数值
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        System.out.println(username);
        System.out.println(password);
        System.out.println("-------------------");

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}

```



##### 请求参数中文乱码处理

- 请求参数如果存在中文数据，则会乱码，原因：tomcat7默认的编解码字符集为ISO_8859_1

- 解决方案：

  - POST：设置输入流的编码

    ```java
    //1、解决乱码:POST。POST底层是通过getReader() 字符输入流获取数据，但是tomcat默认的获取流的数据的编码是ISO-8859-1的 所以读中文数据的时候乱码
            request.setCharacterEncoding("UTF-8");//设置字符输入流的编码
    ```

  - GET：获取参数后，先通过getBytes(StandardCharsets.ISO_8859_1)编码获取参数对应的字节码数组byte[] bytes，再通过

    String s = new String(bytes, StandardCharsets.UTF_8);通过UTF-8将字节数组转换为字符串，解码，详细解析如下：

    ```java
    @Override
        protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            //1、解决乱码:POST。POST底层是通过getReader() 字符输入流获取数据，但是tomcat默认的获取流的数据的编码是ISO-8859-1的 所以读中文数据的时候乱码
            request.setCharacterEncoding("UTF-8");//设置字符输入流的编码
            //2、获取username
            String username = request.getParameter("username");
            //System.out.println(username);
    
            //1、get方式，底层获取请求参数和post不一样，所以不可以使用设置字符输入流的编码
            //  getQueryString() 返回的是字符串
            //  乱码原因：首先中文参数通过浏览器的HTTP协议发送到Tomcat中，
            //  而浏览器不支持中文，则会对中文的字符串做出处理，会对中文进行URL编码
            //  （ 浏览器数据：张三----浏览器对utf-8进行URL编码为----->%E5%BC%A0%E4%B8%89 ---传送到--> tomcat中 ）
            //  （tomcat7对URL解码 ： %E5%BC%A0%E4%B8%89-------ISO-8859-1解码 --- 产生乱码-------> å¼ ä¸）
            //  解决思路：既然tomcat通过ISO_8859_1解码产生乱码，但是底层的字符编码始终没有改变
            //   我们可以得到乱码的字符编码 ( getBytes(StandardCharsets.ISO_8859_1) ) 要通过StandardCharsets.ISO_8859_1进行解码获得字节编码为：
            //  [-27, -68, -96, -28, -72, -119]   就是 张三 对应的二进制的转为十进制的编码的字符集编码utf-8（一个汉字占三个字节）
            //  然后再通过 new String的构造器方法把字符集：[-27, -68, -96, -28, -72, -119] 按照utf-8编码得到 张三
            byte[] usernameBytes = username.getBytes(StandardCharsets.ISO_8859_1);//转换为字节数据，编码
            String s = new String(usernameBytes, StandardCharsets.UTF_8);//将字节数组转换为字符串，解码
            //String newUsername = CharsetsUtil.getChinese(username);自定义的一个工具类，用于解决get方式的乱码问题
            System.out.println(s);
    
    
        }
    ```

  - 自定义了一个解决Tomcat7 的获取 Get 方式的参数乱码的工具类

    ```java
    package com.meng.utils;
    
    import java.nio.charset.StandardCharsets;
    
    /**
     * 解决Get请求方式获取参数乱码的工具类！！！注意仅仅解决Get请求方式乱码
     * 由于Get请求底层获取参数为getQueryString() 返回值为String字符串
     * 乱码原因：首先中文参数通过浏览器的HTTP协议发送到Tomcat中，
     * 而浏览器不支持中文，则会对中文的字符串做出处理，会对中文进行URL编码
     * （ 浏览器数据：张三----浏览器对utf-8进行URL编码为----->%E5%BC%A0%E4%B8%89 ---传送到--> tomcat中 ）
     * （tomcat7对URL解码 ： %E5%BC%A0%E4%B8%89-------ISO-8859-1解码 --- 产生乱码-------> å¼ ä¸）
     * 解决思路：既然tomcat通过ISO_8859_1解码产生乱码，但是底层的字符编码始终没有改变
     * 我们可以得到乱码的字符编码 ( getBytes(StandardCharsets.ISO_8859_1) ) 要通过StandardCharsets.ISO_8859_1进行解码获得字节编码为：
     * [-27, -68, -96, -28, -72, -119]   就是 张三 对应的二进制的转为十进制的编码的字符集编码utf-8（一个汉字占三个字节）
     * 然后再通过 new String的构造器方法把字符集：[-27, -68, -96, -28, -72, -119] 按照utf-8编码得到 张三
     * <p>
     * <p>
     * 由于解决Post方式请求参数乱码可以直接通过设置字符输入流的编码进行解决：
     * 解决乱码:POST。
     * POST底层是通过getReader() 字符输入流获取数据，但是tomcat默认的获取流的数据的编码是ISO-8859-1的 所以读中文数据的时候乱码
     * request.setCharacterEncoding("UTF-8");//通过这行代码设置字符输入流的编码
     */
    public class CharsetsUtil {
        public static String getChinese(String s) {
            //通过ISO_8859_1编码获取s的字节
            byte[] bytes = s.getBytes(StandardCharsets.ISO_8859_1);
            //直接使用utf-8对字节进行解码获取内容
            return new String(bytes, StandardCharsets.UTF_8);
        }
    }
    
    ```

- Tomcat8.0 之后，已经将GET请求乱码问题解决，设置默认的解码方式为UTF-8

![image-20220815135721642](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151357588.png)



##### Request请求转发

- 请求转发(forward)：一种在服务器内部的资源跳转方式（转发地址栏的url不会变，重定向url会改变，在登入的时候要使用重定向改变url地址为主页面，防止刷新的时候登入表单的重复提交）

- 实现方式：

  ```java
  request.getRequestDispatcher("/req4").forward(request, response);
  ```

- 请求转发资源间共享数据：使用Request对象

  - void setAttribute(String name,Object o)：存储数据到request域中
  - Object getAttribute(String name)：根据 key ，获取值
  - void removeAttribute(String name)：根据 key，删除该键值对

![image-20220815141002875](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151410936.png)



- req3

```java
package com.meng.web;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 请求转发
 */
@WebServlet("/req3")
public class RequestDemo3 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("req3......");
        //把要转发的数据存储到Request对象中
        request.setAttribute("msg", "hello");
        //请求转发
        request.getRequestDispatcher("/req4").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}

```

- req4

```java
package com.meng.web;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 请求转发
 */
@WebServlet("/req4")
public class RequestDemo4 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("req4......");
        //获取res3的数据
        Object msg = request.getAttribute("msg");
        System.out.println(msg);
//        request.removeAttribute("msg");//删除共享的数据
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}

```



- 请求转发的特点：
  - 请求地址栏的路径url不发生变化
  - **只能转发到当前服务器内部资源**
  - 一次请求，可以在转发的资源间使用Request对象共享数据





#### Response

![image-20220815141304120](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151413158.png)



- 使用Response对象设置响应数据
- Response继承体系和Request继承体系基本一样
  - ServletResponse：java提供的响应对象**根接口**
  - HttpServletResponse：java提供的对Http协议封装的响应对象**接口**
  - ResponseFacade：Tomcat定义的实现类

##### Response设置响应数据功能介绍

- 响应数据分为三部分：
  1. 响应行：HTTP/1.1 200 OK
     - void setStatus(int sc)：设置响应码
  2. 响应头：Context-Type:text/html
     - void setHeader(String name,String value)：设置响应头键值对
  3. 响应体：```<html><header><header/><body><body/><html/>```
     - PrintWriter getWriter()：获取字符输出流
     - ServletOutputStream getOutputStream()：获取字节输出流

##### Response完成重定向

- 重定向(Redirect)：**一种资源跳转的方式**

  1. 设置状态码：302
  2. 响应头：location:xxxx

- 实现方式：

  ```java
  resp.setStatus(302);
  resp.setHeader("location","资源b的路径")
  ```

```java
package com.meng.web.response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/resp1")
public class ResponseDemo1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("resp1...");
        //重定向
        //1、设置响应状态码：302
        //resp.setStatus(302);
        //2、设置响应头location
        //resp.setHeader("location", req.getContextPath() + "/resp2");

        //简化方式完成重定向
        resp.sendRedirect(req.getContextPath() + "/resp2");


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}

```

```java
package com.meng.web.response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/resp2")
public class ResponseDemo2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("resp2...");
        PrintWriter writer = resp.getWriter();
        writer.write("hello");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}

```

- 重定向的特点：（和转发的特点完全相反）
  - **浏览器的路径地址栏url发生改变**
  - **可以重定向到任意位置资源（服务器内部、外部均可）**
  - **两次请求，不能在多个资源使用request共享数据**

- 路径问题：
  - 浏览器使用：需要加虚拟目录（项目的访问路径）（重定向）
  - 服务端使用：不需要加虚拟目录（转发）

![image-20220815141930909](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151419944.png)

![image-20220815142201707](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151422753.png)



##### Response响应字符数据

- 使用：

  1. 通过Response对象获取字符输入流

     ```java
     PrintWriter writer = response.getWriter();
     ```

  2. 写数据

     ```java
     writer.write("aaa");
     ```

```java
package com.meng.web.response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 设置字符数据的响应体
 */
@WebServlet("/resp3")
public class ResponseDemo3 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //1、设置响应数据格式以及字符集!!!!!!!!!!否则会乱码
        resp.setContentType("text/html;charset=utf-8");
        //2、获取字符输出流
//        resp.setHeader("content-type", "text/html");
        PrintWriter writer = resp.getWriter();
        writer.write("<h1>你好<h1>");
        //细节：1. 输出流不需要关闭，会随着response对象销毁，由服务器关闭
        //     2. 中文数据乱码：原因通过Response获取的字符字符输出流默认编码：ISO_8859_1
        //         resp.setContentType("text/html;charset=utf-8");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}

```



##### Response响应字节数据

- 使用

  1. 通过Response对象获取字节输出流

     ```java
     ServletOutputStream outputStream = response.getOutputStream();
     ```

  2. 写数据

     ```java
     outputStream.write(字节数据);
     ```

- IOUtils工具类使用

  1. 导入坐标

     ```xml
     <!--        commons-io依赖坐标，提供了很多对io操作的工具-->
             <dependency>
                 <groupId>commons-io</groupId>
                 <artifactId>commons-io</artifactId>
                 <version>2.11.0</version>
             </dependency>
     ```

  2. 使用

     ```java
     IOUtlis.copy(输入流，输出流);
     ```

```java
package com.meng.web.response;

import org.apache.commons.io.IOUtils;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * 设置字节数据的响应体
 */
@WebServlet("/resp4")
public class ResponseDemo4 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1、读取文件
        FileInputStream fileInputStream = new FileInputStream("/Users/humeng/Pictures/IMG_8484(20220301-105418).JPG");

        //2、获取response字节输出流
        ServletOutputStream outputStream = resp.getOutputStream();

        //3、完成流的copy
        /*byte[] buffer = new byte[1024];
        int len = 0;
        while ((len = fileInputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, len);
        }*/
        IOUtils.copy(fileInputStream, outputStream);
        fileInputStream.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}

```



### SqlSessionFatory工具类抽取

- 问题：
  1. 代码重复：工具类
  2. SqlSessionFactory 工厂只创建一次，不要重复创建（浪费资源）：静态代码块



```java
package com.meng.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

public class SqlSessionFactoryUtils {
    private static SqlSessionFactory sqlSessionFactory;

    //静态代码块会随着类的加载自动执行，并且值执行一次
    static {
        try {
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static SqlSessionFactory getSqlSessionFactory() {

        return sqlSessionFactory;

    }
}

```





## JSP

- 概念：Java Server Pages，Java服务端页面
- 一种动态的网站技术，其中既可以定义HTML、CSS、JS等静态内容，还可以定义Java代码的动态内容
- JSP = HTML + Java
- JSP的作用：简化开发，避免了在Servlet中直接输出HTML标签

### JSP快速入门

1. 导入JSP坐标（范围：provided）

   ```xml
   <!--      jsp-->
           <dependency>
               <groupId>javax.servlet.jsp</groupId>
               <artifactId>jsp-api</artifactId>
               <version>2.2</version>
               <scope>provided</scope>
           </dependency>
   ```

   

2. 创建JSP文件

3. 编写HTML标签和Java代码

   ```jsp
   
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <html>
   <head>
       <title>Title</title>
   </head>
   <body>
   <h1>hello jsp</h1>
   <%
       System.out.println("hello jsp");
   %>
   </body>
   </html>
   
   ```



### JSP原理

- **JSP本质就是一个Servlet**（JSP继承HttpJspBase，而HttpJspBase又继承HttpServlet，**在jsp中的_jspService里就是通过输出流把我们的jsp写出去了**，简化开发）

  当浏览器请求hello.jsp，tomcat会把hello.jsp转换为Servlet的hello_jsp.java然后经过编译为class文件hello_jsp.class然后提供服务

- JSP被访问的时候，由JSP容器（tomcat）将其转换为Java文件（Servlet），由JSP容器（Tomcat）将其编译，最终对外提供服务的其实就是这个字节码文件

### JSP脚本

- JSP脚本用于JSP页面内定义Java代码
- JSP脚本分类：
  1. <%.....%>：内容会直接放到_jspService()方法之中
  1. <%=...%>：内容会放到out.print()之中，作为out.print()的参数
  1. <%!...%>：内容会放到_jspService()方法之外，被类直接包含

```jsp
<%--
  Created by IntelliJ IDEA.
  User: humeng
  Date: 2022/3/16
  Time: 3:51 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>hello jsp</h1>
<%--jsp_service中--%>
<%
    System.out.println("hello jsp");
    int i = 3;
%>
<%--out.print("内容")--%>
<%="hello" + i%>
<%--jsp_service方法外，成员变量，成员方法--%>
<%!
    String name = "张三";

    void show() {

        System.out.println(name);

    }
%>
</body>
</html>

```

### JSP缺点

- 由于JSP页面内，既可以定义HTML标签，又可以定义Java代码，造成了以下问题：
  - 书写麻烦：特别是复杂的页面
  - 阅读麻烦
  - 复杂程度高：运行需要依赖各种环境，JRE，JSP容器，JavaEE...
  - 占内存和磁盘：JSP会自动生成 .java和 .class 文件占磁盘，运行的是 .class 文件占内存
  - 调试困难：出错后，需要找到自动生成的 .java 文件进行调试
  - 不利于团队协作：前端人员不会Java，后端人员不精HTML
  - 。。。
- **JSP已经逐渐退出历史舞台**，因为更好的技术替代了jsp：**HTML+AJAX**



**JavaWeb技术演进的过程：Servlet，JSP，Servlet+JSP，Servlet+HTML+AJAX**

**不要直接在JSP里面写JSP代码**：我们在Servlet中逻辑处理，封装数据；在JSP中获取数据，遍历展现数据



### EL表达式

- Expression Language 表达式语言，用于简化 JSP 页面内的Java代码

- 主要功能：获取数据

- 语法：${expression}

  ${brands}：获取**域**中存储的key为brands的数据

- JavaWeb中的四大域对象：

  1. page：当前页面有效

  2. request：当前请求有效（ **request.setAttribute("brands",brands);//存储到request域中，**

     **通过转发到el-demo.jsp页面：request.getRequestDispatcher("/el-demo.jsp").forward(request,response);**

  3. session：当前会话有效

  4. application：当前应用有效

- el表达式获取数据( ${brands} )，会依次从这4个域中寻找，直到找到为止（由小到大）



### JSTL标签

- JSP标准标签库，使用标签来取代JSP页面上的Java代码

- 快速入门

  1. 导入坐标

     ```xml
     <!--        jstl-->
             <dependency>
                 <groupId>javax.servlet</groupId>
                 <artifactId>jstl</artifactId>
                 <version>1.2</version>
             </dependency>
             <dependency>
                 <groupId>taglibs</groupId>
                 <artifactId>standard</artifactId>
                 <version>1.1.2</version>
             </dependency>
     ```

     

  2. 在JSP页面上引入JSTL标签库

     ```jsp
     <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
     ```

  3. 使用

     - < c:if >

       ```jsp
       <%--
               c:if  ：是来完成逻辑判断的，替换java if else
       --%>
       <c:if test="${status == 1}">
           <h1>启用</h1>
       </c:if>
       <c:if test="${status != 1}">
           <h1>禁用</h1>
       </c:if>
       ```

       

     - < c:forEach >：相当于for循环

       - items：被遍历的容器

       - var：遍历产生的临时变量

         ```jsp
         <c:forEach items="${brands}" var="brand">
             <tr align="center">
                 <td>${brand.id}</td>
                 <td>${brand.brandName}</td>
                 <td>${brand.companyName}</td>
                 <td>${brand.description}</td>
             </tr>
         </c:forEach>
         ```





## MVC模式和三层架构

### MVC

- MVC是一种分成开发的模式，其中：
  - M：Model，业务模型，处理业务
  - V：View，视图，界面展示
  - C：Controller，控制器，处理请求，调用模型和视图
- 步骤：
  - 浏览器请求访问控制器，控制器（Servlet）就要来调用模型（JavaBean：业务逻辑层和数据访问层）获取数据（从数据库查询。。。），获取数据之后控制器将数据交给视图（JSP），视图做最终的页面展示

- MVC好处：
  - 职责单一，互不影响
  - 有利于分工协作
  - 有利于组件重用



### 三层架构

- **数据访问层**（数据持久层）（**dao/mapper**)  ：对数据库的CRUD基本操作（selectById，selectAll，insert，update，delete）
- **业务逻辑层**（**service**）：对业务逻辑的封装，组合数据访问层 层中的基本功能，形成复杂的业务逻辑功能（例如：注册：selectByName，insert）
- **表现层**（**controller**） ：接收请求，封装数据，调用业务逻辑层，响应数据



后期框架：

- 表现层（**S**pringMVC）
- 业务逻辑层（**S**pring）
- 数据访问层（**M**yBatis）
- SSM框架





## 会话跟踪技术

- 会话：用户打开浏览器，访问web服务器的资源，会话建立，直到有一方断开连接，会话结束，在一次会话中可以包含**多次**请求和响应
- 会话跟踪：一种维护浏览器状态的方法，服务器需要识别多次请求是否来自于同一浏览器，以便在同一次会话的多次请求之间**共享数据**
- HTTP协议是**无状态**的，每次浏览器向服务器请求时候，服务器都会视为**新的**请求，因此我们需要会话跟踪技术来实现会话内数据共享
- 实现方式：
  1. **客户端**会话跟踪技术：**Cookie**
  2. **服务端**会话跟踪技术：**Session**



### Cookie

![image-20220815154853163](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151548324.png)



#### 基本使用

- Cookie：客户端会话技术，将数据保存到客户端，以后每次请求都携带Cookie数据进行访问

- Cookie基本使用：
  1. 创建Cookie对象，设置数据

     ```java
     Cookie cookie = new Cookie("key","value");
     ```

  2. 发送Cookie到客户端：使用response对象

     ```java
     response.addCookie(cookie);
     ```

     Cookie发送到浏览器后，浏览器携带Cookie数据访问服务器的其他资源（这次会话还在）
     
     获取Cookie
     
  3. 获取客户端携带的所有的cookie，使用request对象
  
     ```java
     Cookie[] cookies = request.getCookies();
     ```
  
  4. 遍历数组，获取每一个Cookie对象：for
  
  5. 遍历Cookie对象方法获取数据：
  
     ```java
     cookie.getName();
     cookie.getValue();
     ```
  
  发送Cookie
  
  ```java
  package com.meng.controller;
  
  import javax.servlet.ServletException;
  import javax.servlet.annotation.WebServlet;
  import javax.servlet.http.Cookie;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import java.io.IOException;
  
  @WebServlet("/aServlet")
  public class AServlet extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          //发送Cookie
          //1、创建Cookie
          Cookie cookie = new Cookie("username", "zs");
          //2、发送Cookie对象
          resp.addCookie(cookie);
  
  
      }
  
      @Override
      protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          this.doGet(req, resp);
      }
  }
  
  ```
  
  获取Cookie
  
  ```java
  package com.meng.controller;
  
  import javax.servlet.ServletException;
  import javax.servlet.annotation.WebServlet;
  import javax.servlet.http.Cookie;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import java.io.IOException;
  
  @WebServlet("/bServlet")
  public class BServlet extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          //获取Cookie
          Cookie[] cookies = req.getCookies();
          for (Cookie cookie : cookies) {
              if ("username".equals(cookie.getName())) {
                  String name = cookie.getName();
                  String value = cookie.getValue();
                  System.out.println(name + " : " + value);
              }
          }
  
  
      }
  
      @Override
      protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          this.doGet(req, resp);
      }
  }
  
  ```
  
#### Cookie原理

- Cookie的实现是基于HTTP协议的
  - 响应头：set-cookie
  - 请求头：cookie



#### Cookie的使用细节

- cookie的存活时间

  - 默认情况下，cookie存活在浏览器内存当中，当浏览器关闭，内存释放，则cookie被销毁
  - setMaxAge(int seconds)：设置Cookie存活时间（单位：秒）
    1. 正数：将Cookie写入到浏览器所在电脑的**硬盘**，持久化存储，到时间自动删除
    1. 负数：默认值，cookie在当前浏览器内存中，当浏览器关闭，则Cookie被销毁
    1. 零：删除对应的Cookie

- Cookie存储中文

  - Cookie默认不能直接存储中文，否则会报错（500）

  - 如果需要存储，则需要进行转码：URL编码

    ```java
    //URL编码
    URLEncoder.encode(value, "UTF-8");
    //URL解码
    value = URLDecoder.decode(value, "utf-8");
    ```



### Session

#### 基本使用

- 服务端会话跟踪技术：将数据保存到服务端（由于Cookie是保存在客户端，数据会携带来写带去的所以不安全，因此我们使用Session把数据保存到服务端）

- JavaEE提供**HttpSession接口**，来实现一次会话的多次请求间数据共享功能

- 使用：

  1. 获取Session对象

     ```java
     HttpSession session = request.getSession();
     ```

  2. Session对象功能：

     - void setAttribute(String name,Object o)：存储数据到session域中
     - Object getAttribute(String name)：根据key，获取值
     - void removeAttribute(String name)：根据key，删除该键值对



```java
package com.meng.controller.session;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/demo1")
public class SessionDemo1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1、获取session对象
        HttpSession session = req.getSession();
        //2、存数据
        session.setAttribute("username", "zs");


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}

```

```java
package com.meng.controller.session;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/demo2")
public class SessionDemo2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //1、获取session对象
        HttpSession session = req.getSession();
        //2、取数据
        Object username = session.getAttribute("username");
        System.out.println(username);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }
}

```



#### Session原理

- **Session是基于Cookie实现的**
  - 通过请求1获取session对象，其实session在服务端是有一个唯一的标识：id，会自动通过cookie发送到客户端浏览器（JSEEIONID=xxxxxx），当浏览器发送请求2的时候，会把JSESSIONID=xxxxxxx发送给服务端，根据id找对应的session，如果有该session对象直接使用，如果没有会创建session对象

![image-20220815160423990](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151604031.png)



#### Session的使用细节

![image-20220815161059845](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151610906.png)



- Session的钝化、活化

  - 服务器重启后，Session中的数据是否还在？（在）
    - 钝化：在服务器正常关闭后，tomcat会自动将session数据写入到硬盘文件中去
    - 活化：再次启动服务器后，从文件中加载数据到session中

- Session销毁

  - 默认情况下，无操作，30分钟自动销毁

    ```xml
    		<!-- web.xml -->
    		<session-config>
            <session-timeout>30</session-timeout>
        </session-config>
    ```

  - ```java
    //销毁，注销账户
    session.invalidate();
    ```



### 小结

- Cookie和Session都是来完成一次会话内的多次请求间**共享数据**的
- 区别：
  - **存储位置：**Cookie是将数据存储在客户端，Session是将数据存储在服务端
  - **安全性：**Cookie不安全，Session安全
  - **数据大小：**Cookie最大3kb，Session无大小限制
  - **存储时间：**Cookie可以长期存储，Session默认30分钟
  - **服务器性能：**Cookie不占服务器资源，Session占用服务器资源





## Filter

- 概念：Filter表示过滤器，是javaWeb三大组件（Servlet、Filter、Listener）之一
- 过滤器可以把对资源的请求**拦截**下来，从而实现一些特殊的功能
- 过滤器一般完成一些**通用**的操作，比如权限控制、统一编码处理、敏感字符处理等等...

![image-20220815162357169](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151623249.png)

### Filter快速入门

![image-20220815162622066](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151626119.png)

```java
package com.meng.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter("/*")
public class FilterDemo implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("filter demo...");

        //        放行
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void destroy() {

    }
}

```



### Filter执行流程

![image-20220815163706765](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151637884.png)





### Filter使用细节

![image-20220815164232549](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151642661.png)

![image-20220815164911765](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151649807.png)

![image-20220815165838615](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151658722.png)

## Listener

![image-20220815170031879](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151700968.png)

![image-20220815170202341](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208151702469.png)

