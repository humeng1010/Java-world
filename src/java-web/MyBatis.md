---
title: MyBatis
order: 3
---


## 什么是MyBatis？

- MyBatis是一款优秀的**持久层**框架，用于简化JDBC开发
- 官网：https://mybatis.org/mybatis-3/zh/index.html



### 持久层

- 负责将**数据**保存到**数据库**的那一层代码
- JavaEE三层架构：表现层、业务层、**持久层**
- 表现层：页面展示
- 业务层：逻辑处理
- 持久层：数据持久化（保存到数据库）

![image-20220814113823463](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141138613.png)

![image-20220814114048918](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141140979.png)



## MyBatis快速入门

### 查询User表中的所有数据

1. 创建User表，添加数据
2. 创建模块，导入坐标
3. 编写MyBatis核心配置文件 --> 替换连接信息 解决硬编码问题
4. 编写SQL映射文件 --> 统一SQL管理，解决硬编码问题
5. 编码：
   1. 定义POJO类
   2. 加载核心配置文件，获取SqlSessionFactory对象
   3. 获取SqlSession对象，执行SQL语句
   4. 释放资源



1. 配置pom.xml文件(pom.xml)

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
        <!--        MyBatis 依赖jar包-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>

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

        <!--        logback依赖坐标-->
        <!-- 添加slf4j日志api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.20</version>
        </dependency>
        <!-- 添加logback-classic依赖 -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
        </dependency>
        <!-- 添加logback-core依赖 -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.2.3</version>
        </dependency>
    </dependencies>


</project>
```

2. logback.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <configuration>
       <!--
           CONSOLE ：表示当前的日志信息是可以输出到控制台的。
       -->
       <appender name="Console" class="ch.qos.logback.core.ConsoleAppender">
           <encoder>
               <pattern>[%level] %blue(%d{HH:mm:ss.SSS}) %cyan([%thread]) %boldGreen(%logger{15}) - %msg %n</pattern>
           </encoder>
       </appender>
   
       <logger name="com.meng" level="DEBUG" additivity="false">
           <appender-ref ref="Console"/>
       </logger>
   
   
       <!--
   
         level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF
        ， 默认debug
         <root>可以包含零个或多个<appender-ref>元素，标识这个输出位置将会被本日志级别控制。
         -->
       <root level="DEBUG">
           <appender-ref ref="Console"/>
       </root>
   </configuration>
   ```

   

3. 配置mybatis-config配置文件(mybatis-config.xml)

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE configuration
           PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-config.dtd">
   <configuration>
       <environments default="development">
           <environment id="development">
               <transactionManager type="JDBC"/>
               <dataSource type="POOLED">
                   <!--                连接信息-->
                   <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                   <property name="url" value="jdbc:mysql:///mybatis"/>
                   <property name="username" value="root"/>
                   <property name="password" value="12345678"/>
               </dataSource>
           </environment>
       </environments>
       <mappers>
           <!--        加载SQL的映射文件-->
           <mapper resource="UserMapper.xml"/>
       </mappers>
   </configuration>
   ```

4. SQL的映射文件(UserMapper.xml)

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <!--
       namespace:名称空间
   -->
   <mapper namespace="com.meng.MyBatisDemo">
       <!--    id：唯一标识
               resultType:返回结果的类型（将来数据返回的是什么类型就写什么类型）
       -->
       <select id="selectAll" resultType="com.meng.pojo.User">
           select *
           from tb_user;
       </select>
   </mapper>
   ```

5. POJO(User)

   ```java
   package com.meng.pojo;
   
   public class User {
       private Integer id;
       private String username;
       private String password;
       private String gender;
       private String addr;
   
       public User() {
       }
   
       public User(Integer id, String username, String password, String gender, String addr) {
           this.id = id;
           this.username = username;
           this.password = password;
           this.gender = gender;
           this.addr = addr;
       }
   
       public Integer getId() {
           return id;
       }
   
       public void setId(Integer id) {
           this.id = id;
       }
   
       public String getUsername() {
           return username;
       }
   
       public void setUsername(String username) {
           this.username = username;
       }
   
       public String getPassword() {
           return password;
       }
   
       public void setPassword(String password) {
           this.password = password;
       }
   
       public String getGender() {
           return gender;
       }
   
       public void setGender(String gender) {
           this.gender = gender;
       }
   
       public String getAddr() {
           return addr;
       }
   
       public void setAddr(String addr) {
           this.addr = addr;
       }
   
       @Override
       public String toString() {
           return "User{" +
                   "id=" + id +
                   ", username='" + username + '\'' +
                   ", password='" + password + '\'' +
                   ", gender='" + gender + '\'' +
                   ", addr='" + addr + '\'' +
                   '}';
       }
   }
   
   ```

6. MyBatisDemo.java

   ```java
   package com.meng;
   
   import com.meng.pojo.User;
   import org.apache.ibatis.io.Resources;
   import org.apache.ibatis.session.SqlSession;
   import org.apache.ibatis.session.SqlSessionFactory;
   import org.apache.ibatis.session.SqlSessionFactoryBuilder;
   
   import java.io.InputStream;
   import java.util.List;
   
   /**
    * MyBatis的快速入门
    */
   public class MyBatisDemo {
       public static void main(String[] args) throws Exception {
           //1、加载MyBatis的核心配置文件，获取SqlSessionFactory对象(官网直接复制）
           String resource = "mybatis-config.xml";
           InputStream inputStream = Resources.getResourceAsStream(resource);
           SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
   
           //2、获取SqlSession 对象，用它来执行sql
           SqlSession sqlSession = sqlSessionFactory.openSession();
   
           //3、执行sql语句
           List<User> users = sqlSession.selectList("com.meng.MyBatisDemo.selectAll");
   
           //4、打印users
           System.out.println(users);
   
           //5、释放资源
           sqlSession.close();
       }
   }
   
   ```



## Mapper代理开发

- 目的

  - 解决原生方式中的硬编码问题

    例如：

    ```java
    //2、获取SqlSession 对象，用它来执行sql
            SqlSession sqlSession = sqlSessionFactory.openSession();
    
            //3、执行sql语句
            List<User> users = sqlSession.selectList("com.meng.MyBatisDemo.selectAll");
    
    
    ```

    通过Mapper代理可以简化成这样

    ```java
    //3.1获取UserMapper接口的代理对象
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            List<User> users = userMapper.selectAll();
    
    ```

  - 简化后期执行SQL

### 步骤

1. 定义与SQL映射文件**同名的Mapper接口**，并且将Mapper接口和SQL映射文件放置在**同一目录下**

   附上一张编译打包后的图片注意文件位置和原本的位置

   ![image-20220814134849573](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141348627.png)

   

2. 设置SQL映射文件的**namespace属性为Mapper接口的全限名**

3. 在**Mapper接口中定义方法**，**方法名**就是**SQL映射文件中SQL语句的id**，并且**保持参数类型和返回值类型一致**

4. 编码：
   1. 通过SQLSession的getMapper方法获取Mapper接口的代理对象
   2. 调用对应的方法完成sql的执行

**细节：如果Mapper接口名称和SQL映射文件名称相同，并且在同一目录下，则可以使用包扫描的方式简化SQL映射文件的加载**

![image-20220814134248084](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141342227.png)









## MyBatis核心配置文件

mybatis-config

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!--    起别名，以后在Mapper映射文件中SQL语句上面的resultType返回值类型就可以不带包名了，可以直接使用返回值类型
                    而且不区分大小写了
    -->
    <typeAliases>
        <package name="com.meng.pojo"/>
    </typeAliases>


    <!--
           environments：配置数据库连接环境信息，可以配置多个environment，将来使用哪个数据库可以直接修改environments的default
    -->
    <environments default="development">
        <!--        开发环境的数据库-->
        <environment id="development">
           <!--       事务的信息，以后会被Spring接管-->
            <transactionManager type="JDBC"/>
           <!--        数据源信息，以后也会被spring接管-->
            <dataSource type="POOLED">
                <!--                连接信息-->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="12345678"/>
            </dataSource>
        </environment>

        <!--        测试环境的数据库-->
        <environment id="test">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!--                连接信息-->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="12345678"/>
            </dataSource>
        </environment>

    </environments>
    <mappers>
        <!--        加载SQL的映射文件-->
        <!--        <mapper resource="com/meng/mapper/UserMapper.xml"/>-->
        <!--        Mapper 代理方式（包扫描）-->
        <package name="com.meng.mapper"/>
    </mappers>
</configuration>
```



**细节**：**配置各个标签的时候**，**需要遵守前后的顺序**

<img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141422539.png" alt="image-20220814142208442" style="zoom:50%;" />



#### 别名typeAliases属性

起别名，以后在Mapper映射文件中SQL语句上面的resultType返回值类型就可以不带包名了，可以直接使用返回值类型而且不区分大小写了

![image-20220814141907126](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141419293.png)

![image-20220814142119638](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141421720.png)



## 结果映射

### resultMap标签

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--
    namespace:名称空间
-->
<mapper namespace="com.meng.mapper.BrandMapper">
    <!--    id：唯一标识
            resultType:返回结果的类型（将来数据返回的是什么类型就写什么类型）
    -->
    <!--    我们发现数据库列名和实体类的名称有的不一样，显示数据为null-->
    <!--    解决方案一：起别名（每次查询都要定义一次别名，不方便）-->
    <!--    <select id="getAll" resultType="brand">-->
    <!--        select id, brand_name as brandName, company_name as companyName, ordered, description, status-->
    <!--        from tb_brand;-->
    <!--    </select>-->
    <!--    解决方案二：sql片段（不灵活）-->
    <!--    <sql id="brand_column">-->
    <!--        id, brand_name as brandName, company_name as companyName, ordered, description, status-->
    <!--    </sql>-->
    <!--    <select id="getAll" resultType="brand">-->
    <!--        select-->
    <!--        <include refid="brand_column"></include>-->
    <!--        from tb_brand;-->
    <!--    </select>-->
    <!--解决方案三：resultMap-->
    <!--    id:唯一标识
            type：映射的文件类型（该实体类），支持别名
    -->
    <resultMap id="brandResultMap" type="brand">
        <!--
                id:完成主键字段的映射
                result：完成一般字段的映射
                column:表的列名
                property:实体列的属性名
        -->
        <result column="brand_name" property="brandName"></result>
        <result column="company_name" property="companyName"></result>
    </resultMap>
    <select id="getAll" resultMap="brandResultMap">
        select *
        from tb_brand;
    </select>
</mapper>
```

![image-20220814150743094](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141507304.png)



## 参数占位符

```
参数占位符：
1. #{}  :select * from tb_brand where id = ?;（会将其参数替换为？，为了防止SQL注入）
2. ${}  :select * from tb_brand where id = 1;（拼SQL，存在SQL注入问题）不要使用！！
3. 使用时机：
    参数传递的时候使用: #{}
    
特殊字符处理（例如小于号<)
1. 转义字符 : &lt;(字符少的时候)
2. CDATA区 :<![CDATA[  <  ]]>  (字符多的时候)
```

```xml
<!--    参数占位符：
            1. #{}  :select * from tb_brand where id = ?;（会将其参数替换为？，为了防止SQL注入）
            2. ${}  :select * from tb_brand where id = 1;（拼SQL，存在SQL注入问题）不要使用！！
            3. 使用时机：
                参数传递的时候使用: #{}

            特殊字符处理（例如小于号<)
            1. 转义字符 : &lt;(字符少的时候)
            2. CDATA区 :<![CDATA[  <  ]]>  (字符多的时候)
    -->
    <select id="getById" resultMap="brandResultMap">
        select *
        from tb_brand
        where id = #{id};
    </select>
```





## 条件查询

```java
/**
     * 条件查询
     * * 参数接收：
     * 1. 散装参数：如果方法中有多个参数（传到Mapper的映射的xml SQL文件 不知道哪个对应哪个），所以需要使用@Parma("SQL参数占位符")
     * 2. 对象参数
     * 3. map集合参数
     *
     * @param status
     * @param companyName
     * @param brandName
     * @return
     */
    List<Brand> selectByCondition(@Param("status") int status, @Param("companyName") String companyName, @Param("brandName") String brandName);

```

```xml
<select id="selectByCondition" resultMap="brandResultMap">
        select *
        from tb_brand
        where status = #{status}
          and company_name like #{companyName}
          and brand_name like #{brandName};
    </select>
```

```java
/**
     * 条件查询
     *
     * @throws Exception
     */
    @Test
    public void selectByCondition() throws Exception {
        //接收参数
        Integer status = 1;
        String companyName = "华为";//%华为%
        String brandName = "华为";//%华为%
        //处理参数
        companyName = "%" + companyName + "%";
        brandName = "%" + brandName + "%";
        //1、获取SqlSessionFactory对象
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);


        SqlSession sqlSession = sqlSessionFactory.openSession();
        BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

        List<Brand> brands = brandMapper.selectByCondition(status, companyName, brandName);

        System.out.println(brands);

        sqlSession.close();

    }
```

发现存在BUG，当用户只传入一个参数的时候

我们原来的SQL为

```sql
select *
        from tb_brand
        where status = #{status}
          and company_name like #{companyName}
          and brand_name like #{brandName};
```

当只传入brandName时

```sql
select *
        from tb_brand
        where status = #{status}
          and company_name like #{companyName}
          and brand_name like #{brandName};
Parameters: null,null,%华为%(String)
```

所有我们就要使用动态的条件查询了

## 动态条件查询

![image-20220814160056984](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141600102.png)

https://mybatis.org/mybatis-3/zh/dynamic-sql.html

- SQL语句随着用户的输入或外部条件的变化而变化，我们称之为 动态SQL

- ```xml
  <select id="selectByCondition" resultMap="brandResultMap">
          select *
          from tb_brand
          where status = #{status}
            and company_name like #{companyName}
            and brand_name like #{brandName};
      </select>
  ```

- MyBatis对动态SQL有很强大的支持

  - if
  - choose(when,otherwise)
  - trim(where,set)
  - foreach

- ```xml
  if标签（这个时候出现了一个问题 where后可能直接连接了and 造成SQL语法错误，解决方案MyBatis提供了where标签）
  <select id="selectByCondition" resultMap="brandResultMap">
          select *
          from tb_brand
          where
          <if test="status != null">
              status = #{status}
          </if>
          <if test="companyName != null and companyName !='' ">
              and company_name like #{companyName}
          </if>
          <if test="brandName != null and brandName != '' ">
              and brand_name like #{brandName};
          </if>
      </select>
  ```

- where标签(解决上面的SQL语法错误问题)*where* 元素只会在子元素返回任何内容的情况下才插入 “WHERE” 子句。而且，若子句的开头为 “AND” 或 “OR”，*where* 元素也会将它们去除。

  ```xml
  <select id="selectByCondition" resultMap="brandResultMap">
          select *
          from tb_brand
          <where>
              <if test="status != null">
                  and status = #{status}
              </if>
              <if test="companyName != null and companyName !='' ">
                  and company_name like #{companyName}
              </if>
              <if test="brandName != null and brandName != '' ">
                  and brand_name like #{brandName};
              </if>
          </where>
      </select>
  
  <!-- Preparing: select * from tb_brand WHERE company_name like ?   -->
  ```



### 单条件的动态查询

- 从多个条件中选择一个
- choose相当于switch

```xml
<select id="selectByConditionSingle" resultMap="brandResultMap">
        select *
        from tb_brand
        where
        <choose><!-- choose相当于switch -->
            <when test="status != null"><!--when相当于case  -->
                status = #{status}
            </when>
            <when test="companyName != null and companyName != '' ">
                company_name like #{companyName}
            </when>
            <when test="brandName != null and brandName != ''">
                brand_name like #{brandName};
            </when>
            <otherwise><!-- 相当于default -->
                1=1
            </otherwise>
        </choose>
    </select>
<!--  Preparing: select * from tb_brand WHERE 1=1 -->
```

```xml
<select id="selectByConditionSingle" resultMap="brandResultMap">
        select *
        from tb_brand
        <where><!-- 使用where标签-->
            <choose>
                <when test="status != null">
                    status = #{status}
                </when>
                <when test="companyName != null and companyName != '' ">
                    company_name like #{companyName}
                </when>
                <when test="brandName != null and brandName != ''">
                    brand_name like #{brandName};
                </when>
            </choose>
        </where>
    </select>
<!--  Preparing: select * from tb_brand -->
```


## 添加-MyBatis事务默认开启的，需要手动提交

- BrandMapper.java

  ```java
  /**
       * 添加
       */
      void add(Brand brand);
  ```

- BrandMapper.xml

  ```xml
  <!--    添加-->
      <insert id="add">
          insert into tb_brand (brand_name, company_name, ordered, description, status)
          values (#{brandName}, #{companyName}, #{ordered}, #{description}, #{status});
      </insert>
  ```

- Test.java

  ```java
  /**
       * 添加
       *
       * @throws IOException
       */
      @Test
      public void add() throws IOException {
          int status = 1;
          String companyName = "测试数据";
          String brandName = "测试数据";
          String description = "测试数据";
          int ordered = 100;
  
          Brand brand = new Brand();
          brand.setStatus(status);
          brand.setCompanyName(companyName);
          brand.setBrandName(brandName);
          brand.setDescription(description);
          brand.setOrdered(ordered);
  
          //1、获取SqlSessionFactory对象
          String resource = "mybatis-config.xml";
          InputStream inputStream = Resources.getResourceAsStream(resource);
          SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
  
          SqlSession sqlSession = sqlSessionFactory.openSession();
          BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);
  
          brandMapper.add(brand);
  
  
          sqlSession.commit();//提交事务!!!
          sqlSession.close();
  
      }
  ```

### 返回添加数据的主键

![image-20220814162016102](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141620209.png)



  useGeneratedKeys="true" keyProperty="id"

  ```xml
   <insert id="add" useGeneratedKeys="true" keyProperty="id">
          insert into tb_brand (brand_name, company_name, ordered, description, status)
          values (#{brandName}, #{companyName}, #{ordered}, #{description}, #{status});
      </insert>
  ```

![image-20220814162156033](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208141621108.png)



## 修改-动态字段

这个例子中，*set* 元素会动态地在行首插入 SET 关键字，并会删掉额外的逗号（这些逗号是在使用条件语句给列赋值时引入的）。

  ```xml
  <update id="update">
          update tb_brand
          <set>
              <if test="brandName != null and brandName != '' ">
                  brand_name = #{brandName},
              </if>
              <if test="companyName != null and companyName != '' ">
                  company_name = #{companyName},
              </if>
              <if test="description != null and description != '' ">
                  description = #{description},
              </if>
              <if test="ordered != null">
                  ordered = #{ordered},
              </if>
              <if test="status != null ">
                  status = #{status},
              </if>
          </set>
          where id = #{id};
      </update>
  ```

  ```java
  /**
       * 修改
       *
       * @throws IOException
       */
      @Test
      public void update() throws IOException {
          int id = 2;//要修改的id
  
          int status = 1;
          String companyName = "测试数据11111111";
          String brandName = "测试数据";
          String description = "测试数据";
          int ordered = 100000;
  
          Brand brand = new Brand();
          brand.setId(id);
          brand.setStatus(status);
          //brand.setCompanyName(companyName);
          //brand.setBrandName(brandName);
          //brand.setDescription(description);
          brand.setOrdered(ordered);
  
          //1、获取SqlSessionFactory对象
          String resource = "mybatis-config.xml";
          InputStream inputStream = Resources.getResourceAsStream(resource);
          SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
  
          SqlSession sqlSession = sqlSessionFactory.openSession();
          BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);
  
          int count = brandMapper.update(brand);
          System.out.println(count);
  
  
          sqlSession.commit();//提交事务
          sqlSession.close();
  
      }
  ```
## 删除

###   根据id删除

```xml
<!--    删除-->
    <delete id="deleteById">
        delete
        from tb_brand
        where id = #{id};
    </delete>
```

```java
@Test
    public void deleteById() throws IOException {
        int id = 10;//要删除的id

        //1、获取SqlSessionFactory对象
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

        int count = brandMapper.deleteById(id);
        System.out.println(count);


        sqlSession.commit();//提交事务
        sqlSession.close();

    }
```



### 批量删除

```java
/**
     * 批量删除
     *
     * @param ids
     * @return
     */
    int deleteByIds(@Param("ids") int[] ids);

```



```xml
<!--    批量删除-->
    <!--    mybatis会将数组封装成一个map集合
            * 默认 ： array = 数组
            * 使用 @Param注解改变map集合的默认key的名称

            foreach标签中的属性
            * collection ： 集合的名字（map集合）
            * item ：使用foreach遍历后得到的每一个元素
            * separator ： 每一个元素之间的分割符" , "
            * open : 开头的符号 " ( "
            * close : 结束的符号 " ) "
    -->
    <delete id="deleteByIds">
        delete
        from tb_brand
        where id in
        <foreach collection="ids" item="id" separator="," open="(" close=")">
            #{id}
        </foreach>
    </delete>
```

```java
@Test
    public void deleteByIds() throws IOException {
        int[] ids = {12, 13, 14, 15, 16};//要删除的id

        //1、获取SqlSessionFactory对象
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

        int count = brandMapper.deleteByIds(ids);
        System.out.println(count);


        sqlSession.commit();//提交事务
        sqlSession.close();

    }
```

```
[DEBUG] 14:38:05.563 [main] c.m.m.B.deleteByIds - ==>  Preparing: delete from tb_brand where id in ( ? , ? , ? , ? , ? ) 
[DEBUG] 14:38:05.586 [main] c.m.m.B.deleteByIds - ==> Parameters: 12(Integer), 13(Integer), 14(Integer), 15(Integer), 16(Integer) 
[DEBUG] 14:38:05.593 [main] c.m.m.B.deleteByIds - <==    Updates: 5 
5
[DEBUG] 14:38:05.593 [main] o.a.i.t.j.JdbcTransaction - Committing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@4dbb42b7] 
[DEBUG] 14:38:05.594 [main] o.a.i.t.j.JdbcTransaction - Resetting autocommit to true on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@4dbb42b7] 
[DEBUG] 14:38:05.594 [main] o.a.i.t.j.JdbcTransaction - Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@4dbb42b7] 
[DEBUG] 14:38:05.595 [main] o.a.i.d.p.PooledDataSource - Returned connection 1304117943 to pool. 
```





## 参数传递

MyBatis接口方法中可以接收各种各样的参数，MyBatis底层对于这些参数进行不同的封装处理方式

https://www.bilibili.com/video/BV1Qf4y1T7Hx?p=59&spm_id_from=pageDriver&vd_source=51ea6336b76b9ea01f2d5cad2110fe0a&t=340.9

- 单个参数：

  1. POJO类型：直接使用，属性名 和 参数占位符( #{} )名称一致

  2. Map集合：直接使用，键名 和 参数占位符名称一致

  3. **Collection**：也封装为Map集合，**可以使用@Param注解，替换Map集合的默认的arg键名**

     map.put("arg0",collection集合)

     map.put("collection",collection集合)

  4. **List**：也封装为Map集合，**可以使用@Param注解，替换Map集合的默认的arg键名**

     map.put("arg0",List集合)

     map.put("collection",List集合)

     map.put("List",List集合)

  5. **Array**：也封装为Map集合 ，**可以使用@Param注解，替换Map集合的默认的arg键名**

     map.put("arg0",数组)

     map.put("array",数组)

  6. 其他类型：直接使用

- **多个参数**：封装为Map集合，**可以使用@Param注解，替换Map集合的默认的arg键名**

  map.put("arg0",参数1)

  map.put("param1",参数1)

  map.put("arg1",参数2)

  map.put("param2",参数2)

  MyBatis提供了ParamNameResolver类来进行参数封装

  ```java
  /**
       * 条件查询
       * * 参数接收：
       * 1. 散装参数：如果方法中有多个参数（传到Mapper的映射的xml SQL文件 不知道哪个对应哪个），所以需要使用@Parma("SQL参数占位符")
       * <p>
       * 1. 散装参数：多个参数（mybatis会把多个参数封装为Mao集合）
       * 封装为Map集合(底层原理）
       * map值为参数值，而不是@Param注解中的
       * 如果不写@Param map的键是默认的[arg0,arg1,arg3...]或者[param1,param2...]
       * map.put("arg0",status)
       * map.put("param1",status)
       * <p>
       * map.put("arg1",companyName)
       * map.put("param2",companyName)
       * <p>
       * map.put("arg2",brandName)
       * map.put("param3",brandName)
       *
       * @param status
       * @param companyName
       * @param brandName
       * @return
       */
      List<Brand> selectByCondition(@Param("status") int status, @Param("companyName") String companyName, @Param("brandName") String brandName);
  
  ```



### 建议：

将来 都使用 @Param 注解 来修改 Map集合中的 默认键名，并使用 修改后的名称 来获取值，这样可读性更高！



## 注解完成增删改查

使用注解开发会比使用配置文件开发更方便

```java
		//注解开发
    @Select("select * from tb_brand;")
    List<Brand> selectAll();

    @Select("select * from tb_brand where id = #{id} ;")
    Brand selectById();
```

- 查询：@Select
- 添加：@Insert
- 修改：@Update
- 删除：@Delete

### 提示：

注解完成简单功能

配置文件完成复杂功能（动态SQL）











