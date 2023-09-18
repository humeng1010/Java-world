---
title: JDBC
order: 1
category:
  - java web
tag:
  - jdbc
---

## JDBC简介

- JDBC就是使用java语言操作关系型数据库的一套API
- 全称（Java DataBase Connectivity）Java数据库连接
- 同一套Java代码操作不同的关系型数据库
- sun公司通过Java代码写了一套标准接口 JDBC ，关系型数据库想要被java操作就必须自己去实现java写的JDBC接口，于是关系型数据库都自己实现了JDBC接口又称为驱动（例如MySQL驱动，Oracle驱动，DB2驱动）jar包。
- JDBC的好处：各个数据库厂商使用相同的接口，java代码不需要针对不同的数据库分别开发，可以随时替换底层数据库，访问数据库的java代码基本不变

![image-20220813181127793](https://raw.githubusercontent.com/humeng1010/images-for-blog/main/img02/202208131811907.png)



## JDBC快速入门

旧版MySQL的url和driver的写法

```
url = jdbc:mysql://localhost:3306/user?useUnicode=true&characterEncoding=utf8
driver = com.mysql.jdbc.Driver
```

MySQL8.x新版本的url和driver的写法

```
url = jdbc:mysql://localhost:3306/user?serverTimezone=UTC&characterEncoding=utf8&useUnicode=true&useSSL=false
drive = com.mysql.cj.jdbc.Driver
```

**注意：新版mysql驱动的url必须设置时区，即serverTimezone=UTC**

```java
package com.JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/**
 * JDBC的快速入门
 */
public class JDBCDemo1 {
    public static void main(String[] args) throws Exception {
        //1、注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");

        //2、获取连接
        String url = "jdbc:mysql://localhost:3306/db2";
        String username = "root";
        String password = "12345678";
        Connection connection = DriverManager.getConnection(url, username, password);

        //3、定义sql语句
        String sql = "update emp set age = 22 where id = 1";
        //4、获取执行sql的对象 Statement
        Statement statement = connection.createStatement();
        //5、执行sql
        int count = statement.executeUpdate(sql);
        //6、处理结果
        System.out.println("受影响的行数：" + count);

        //7、释放资源
        statement.close();
        connection.close();


    }
}

```



## JDBC-API详解

### DriverManager工具类

- DriverManager（驱动管理类）作用：
  1. 注册驱动
  2. 获取数据库连接

作用：

1. 注册驱动

   ```java
   Class.forName("com.mysql.cj.jdbc.Driver");//MySQL5之后就可以不用写这行注册驱动代码了
   ```

   提示：MySQL5之后就可以不用写这行注册驱动代码了，自动加载jar包中的META-INF/services/java.sql.Driver文件中的驱动类

2. 获取连接

   DriverManager.getConnection(url, username, password);

   1. 参数一：URL：连接路径
   2. 参数二：username：用户名
   3. 参数三：password：密码



### Connection

- Connection作用：
  1. 获取执行sql的对象
  2. 管理事务

1. 获取执行SQL的对象

   - 执行普通的SQL对象

     ```java
     Statement createStatement()
     ```

   - **预编译SQL**的执行SQL对象：防止SQL注入(注意要在url后面加上```&useServerPrepStmts=true```)

     ```java
     PreparedStatement prepareStatement(sql)
     ```

   - 执行存储过程的对象

     ```java
     CallableStatement prepareCall(sql)
     ```

2. 事务管理

   - MySQL事务管理

     ```
     开启事务：begin
     提交事务：commit
     回滚事务：rollback
     MySQL默认自动提交事务
     ```

   - JDBC事务管理：Connection接口中定义了3个对应的方法

     ```
     开启事务：setAutoCommit(boolean autoCommit):true为自动提交;false为手动提交
     提交事务：commit()
     回滚事务：rollback()
     ```

   ```java
   package com.JDBC;
   
   import java.sql.Connection;
   import java.sql.DriverManager;
   import java.sql.Statement;
   
   /**
    * JDBC的快速入门
    */
   public class JDBCDemo2 {
       public static void main(String[] args) throws Exception {
           //1、注册驱动
           //Class.forName("com.mysql.cj.jdbc.Driver");MySQL5之后就可以不用写这行注册驱动代码了
   
           //2、获取连接
           String url = "jdbc:mysql://localhost:3306/db2";
           String username = "root";
           String password = "12345678";
           Connection connection = DriverManager.getConnection(url, username, password);
   
           //3、定义sql语句
           String sql = "update emp set age = 22 where id = 2";
           //4、获取执行sql的对象 Statement
           Statement statement = connection.createStatement();
   
           try {
               //开启事务
               connection.setAutoCommit(false);
               //5、执行sql
               int count = statement.executeUpdate(sql);
               //6、处理结果
               System.out.println("受影响的行数：" + count);
               //提交事务
               connection.commit();
           } catch (Exception e) {
               //回滚事务
               connection.rollback();
               e.printStackTrace();
           }
   
           //7、释放资源
           statement.close();
           connection.close();
   
   
       }
   }
   
   ```



### Statement

- 作用

  1. 执行SQL语句

- 执行SQL语句

  ```
  int executeUpdate(sql):执行DML、DDL语句
  返回值：1.DML语句影响的行数 2.DDL语句执行成功后，执行成功也可能返回 0 
  
  ResultSet executeQuery(sql):执行DQL语句
  返回值：ResultSet结果集对象
  
  ```



### ResultSet

- ResultSet结果集对象作用：
  1. 封装了DQL查询语句的结果

```java
package com.JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * JDBC的快速入门
 */
public class JDBCDemo3 {
    public static void main(String[] args) throws Exception {
        //1、注册驱动
        //Class.forName("com.mysql.cj.jdbc.Driver");MySQL5之后就可以不用写这行注册驱动代码了

        //2、获取连接
        String url = "jdbc:mysql://localhost:3306/db2";
        String username = "root";
        String password = "12345678";
        Connection connection = DriverManager.getConnection(url, username, password);

        //3、定义sql语句
        String sql = "select * from tb_user;";
        //4、获取执行sql的对象 Statement
        Statement statement = connection.createStatement();
        //5、执行sql
        ResultSet resultSet = statement.executeQuery(sql);

        List<User> list = new ArrayList<>();

        while (resultSet.next()) {

            int id = resultSet.getInt(1);
            String name = resultSet.getString(2);
            String UserPassword = resultSet.getString(3);
            User user = new User(id, name, UserPassword);
            list.add(user);

        }

        //6、处理结果
        System.out.println(list);

        //7、释放资源
        statement.close();
        connection.close();


    }
}

```



### PreparedStatement

#### 作用

- 继承Statement，也是执行SQL语句的，进行预编译的SQL语句对象

- 作用

  1. 预编译SQL语句并执行：预防SQL注入问题

- SQL注入

  - SQL注入是通过**操作输入来修改事先定义好的SQL语句**，用以达到执行代码对服务器进行攻击的方法
  - 例如： 'or'1'='1

- 登入案例的SQL：

  ```sql
  select * from tb_user where username = 'zhangsan' and password = '123';
  -- 当我们密码输入'or'1'='1的时候，我们发现我们的SQL变成了：
  select * from tb_user where username = 'zhangsan' and password = ''or'1'='1';
  -- 我们发现用户对SQL的语句进行了更改！就相当于密码是空或者'1'='1'，因为中间是or连接，而后者永远为true所以登入成功了
  ```

- 防止SQL注入：

  1. 获取PreparedStatement对象

     ```java
     //SQL语句中的参数值用？占位符替代
     String sql = "select * from tb_user where username = ? and password = ?";
     
     //通过Connection对象获取，并传入对应的SQL语句
     PreparedStatement pstmt = conn.preparedStatement(sql);
     ```

  2. 设置参数

     ```java
     PreparedStatement对象：setXxx(参数1，参数2):给？赋值
       Xxx：数据类型；如setInt（参数1，参数2）
       参数：
       - 参数1：？的位置编号，从1开始
       - 参数2：？的值
     ```

  3. 执行SQL

     ```java
     executeUpdata();/executeQuery();//不需要再传递SQL
     ```

  ```java
  package com.JDBC;
  
  import java.sql.Connection;
  import java.sql.DriverManager;
  import java.sql.PreparedStatement;
  import java.sql.ResultSet;
  
  /**
   * JDBC的快速入门
   */
  public class JDBCDemo4 {
      public static void main(String[] args) throws Exception {
          //1、注册驱动
          //Class.forName("com.mysql.cj.jdbc.Driver");MySQL5之后就可以不用写这行注册驱动代码了
  
          //2、获取连接
          String url = "jdbc:mysql://localhost:3306/db2";
          String username = "root";
          String password = "12345678";
          Connection connection = DriverManager.getConnection(url, username, password);
  
          String name = "李四";
          String password2 = "'or'1'='1";//再尝试SQL注入，发现登入失败
  
          //3、定义sql语句
          String sql = "select * from tb_user where username = ? and password = ?;";
          //4、获取执行sql的对象 Statement
          PreparedStatement preparedStatement = connection.prepareStatement(sql);
          //5、替换？占位符
          preparedStatement.setString(1, name);
          preparedStatement.setString(2, password2);//预编译会把密码自动转义为  \'or\'1\'=\'1  将敏感字符进行转义
          //6、执行sql
          ResultSet resultSet = preparedStatement.executeQuery();
          //7、结果处理
          if (resultSet.next()) {
              System.out.println("success");
          } else {
              System.out.println("false");
          }
          //8、释放资源
          resultSet.close();
          preparedStatement.close();
          connection.close();
  
  
      }
  }
  
  ```

  ![image-20220814100647636](https://raw.githubusercontent.com/humeng1010/images-for-blog/main/img02/202208141006804.png)
  
  

#### 原理

- PreparedStatement好处
  1. 预编译SQL，性能更好
  2. 防止SQL注入：将敏感字符进行转义

```java
        String url = "jdbc:mysql://localhost:3306/db2&useServerPrepStmts=true";//开启预编译功能
```

PreparedStatement原理：

1. 在获取PreparedStatement对象时，将SQL语句发送给MySQL服务器进行检查，编译（这些步骤很耗时）
1. 执行时就不用再进行这些步骤了，速度很快
1. 如果SQL模板一样，则只需要进行一次检查、编译

注意：要在URL后面开启预编译：加上： &useServerPrepStmts=true



## 数据库连接池

### 简介

- 数据库连接池是一个容器，负责分配，管理数据库连接（Connection）
- 它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个
- 释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接连接而引起的数据库连接遗漏
- 好处
  - 资源重用
  - 提升系统响应速度
  - 避免数据库连接遗漏



#### 数据库连接池的实现

- 标准接口：DataSource

  - 官方（SUN）提供的数据库连接池的标准接口，由第三方组织实现此接口

  - 功能：获取连接

    ```java
    Connection getConnection()
    ```

- 常见的数据库连接池有：

  - DBCP
  - C3P0
  - Druid

- Druid(德鲁伊)

  - Druid连接池是阿里巴巴开源的数据库连接池项目
  - 功能强大，性能优秀，是java语言最好的数据库连接池之一



### Druid数据库连接池

#### 使用步骤

1. 导入jar包  druid-1.1.12.jar
2. 定义配置文件
3. 加载配置文件
4. 获取数据库连接池对象
5. 获取连接

#### druid配置详解


|                   属性                   |                                  说明                                  |          建议值           |
| :--------------------------------------: | :--------------------------------------------------------------------: | :-----------------------: |
|                   url                    |        数据库的jdbc连接地址。一般为连接oracle/mysql。示例如下：        |                           |
|                                          |         mysql : jdbc:mysql://ip:port/dbname?option1&option2&…          |                           |
|                                          |             oracle : jdbc:oracle:thin:@ip:port:oracle_sid              |                           |
|                                          |                                                                        |                           |
|                 username                 |                           登录数据库的用户名                           |                           |
|                 password                 |                          登录数据库的用户密码                          |                           |
|               initialSize                |                 启动程序时，在连接池中初始化多少个连接                 |        10-50已足够        |
|                maxActive                 |                     连接池中最多支持多少个活动会话                     |                           |
|                 maxWait                  | 程序向连接池中请求连接时,超过maxWait的值后，认为本次请求失败，即连接池 |            100            |
|                                          |              没有可用连接，单位毫秒，设置-1时表示无限等待              |                           |
|        minEvictableIdleTimeMillis        |  池中某个连接的空闲时长达到 N 毫秒后, 连接池在下次检查空闲连接时，将   |        见说明部分         |
|                                          |                    回收该连接,要小于防火墙超时设置                     |                           |
|                                          |        net.netfilter.nf_conntrack_tcp_timeout_established的设置        |                           |
|      timeBetweenEvictionRunsMillis       |         检查空闲连接的频率，单位毫秒, 非正整数时表示不进行检查         |                           |
|                keepAlive                 |   程序没有close连接且空闲时长超过 minEvictableIdleTimeMillis,则会执    |           true            |
|                                          |   行validationQuery指定的SQL,以保证该程序连接不会池kill掉,其范围不超   |                           |
|                                          |                       过minIdle指定的连接个数。                        |                           |
|                 minIdle                  |               回收空闲连接时，将保证至少有minIdle个连接.               |     与initialSize相同     |
|             removeAbandoned              |   要求程序从池中get到连接后, N 秒后必须close,否则druid 会强制回收该    |   false,当发现程序有未    |
|                                          |  连接,不管该连接中是活动还是空闲, 以防止进程不会进行close而霸占连接。  | 正常close连接时设置为true |
|          removeAbandonedTimeout          |  设置druid 强制回收连接的时限，当程序从池中get到连接开始算起，超过此   |  应大于业务运行最长时间   |
|                                          |                 值后，druid将强制回收该连接，单位秒。                  |                           |
|               logAbandoned               |         当druid强制回收连接后，是否将stack trace 记录到日志中          |           true            |
|              testWhileIdle               |    当程序请求连接，池在分配连接时，是否先检查该连接是否有效。(高效)    |           true            |
|             validationQuery              | 检查池中的连接是否仍可用的 SQL 语句,drui会连接到数据库执行该SQL, 如果  |                           |
|                                          |              正常返回，则表示连接可用，否则表示连接不可用              |                           |
|               testOnBorrow               |       程序 **申请** 连接时,进行连接有效性检查（低效，影响性能）        |           false           |
|               testOnReturn               |       程序 **返还** 连接时,进行连接有效性检查（低效，影响性能）        |           false           |
|          poolPreparedStatements          |                     缓存通过以下两个方法发起的SQL:                     |           true            |
|                                          |         public PreparedStatement prepareStatement(String sql)          |                           |
|                                          |         public PreparedStatement prepareStatement(String sql,          |                           |
|                                          |              int resultSetType, int resultSetConcurrency)              |                           |
| maxPoolPrepareStatementPerConnectionSize |                       每个连接最多缓存多少个SQL                        |            20             |
|                 filters                  |                     这里配置的是插件,常用的插件有:                     |      stat,wall,slf4j      |
|                                          |                         监控统计: filter:stat                          |                           |
|                                          |                   日志监控: filter:log4j 或者 slf4j                    |                           |
|                                          |                        防御SQL注入: filter:wall                        |                           |
|            connectProperties             |              连接属性。比如设置一些连接池统计方面的配置。              |                           |
|                                          |         druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000         |                           |
|                                          |                      比如设置一些数据库连接属性:                       |                           |
|                                          |                                                                        |                           |

```properties
# 数据库连接池的配置文件
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql:///db2
username=root
password=12345678
# initial connection count 5
initialSize=5
# max connection 10
maxActive=10
# max wait time 3s
maxWait=3000
```

```java
package com.druid;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.pojo.User;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;

/**
 * Druid数据库连接池演示
 */
public class DruidDemo1 {
    public static void main(String[] args) throws Exception {
        //1、导入jar包

        //2、定义配置文件

        //3、加载配置文件
        Properties prop = new Properties();
        prop.load(new FileInputStream("d1_JDBC/src/druid.properties"));

        //4、获取连接池对象
        DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);

        //5、获取数据库连接 Connection
        Connection connection = dataSource.getConnection();

        System.out.println(connection);//打印一下连接对象检查是否连接成功


        //根据Uid查询用户
        int Uid = 2;
        String sql = "select * from tb_user where id = ?";//SQL语句
        PreparedStatement preparedStatement = connection.prepareStatement(sql);//预编译sql

        preparedStatement.setInt(1, Uid);//设置？占位符的参数
        ResultSet resultSet = preparedStatement.executeQuery();//执行查询的sql

        while (resultSet.next()) {    //将光标向下一行查询结果（起始光标在内容的上一行，也就是在表头）
            int id = resultSet.getInt(1);
            String name = resultSet.getString(2);
            String pwd = resultSet.getString(3);
            User user = new User(id, name, pwd);
            System.out.println(user);
        }


        resultSet.close();
        preparedStatement.close();
        connection.close();
    }
}

```





## 练习：完成商品品牌数据的增删改查操作

- 查询：查询所有数据
- 添加：添加品牌
- 修改：根据id修改品牌
- 删除：根据id删除品牌

### 准备环境

#### SQL

```sql
-- 建表sql
-- 删除tb_brand表
drop table if exists tb_brand;
-- 创建tb_brand表
create table tb_brand
(
    -- id 主键
    id           int primary key auto_increment,
    -- 品牌名称
    brand_name   varchar(20),
    -- 企业名称
    company_name varchar(20),
    -- 排序字段
    ordered      int,
    -- 描述信息
    description  varchar(100),
    -- 状态：0：禁用  1：启用
    status       int
);
-- 添加数据
insert into tb_brand (brand_name, company_name, ordered, description, status)
values ('三只松鼠', '三只松鼠股份有限公司', 5, '好吃不上火', 0),
       ('华为', '华为技术有限公司', 100, '华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界', 1),
       ('小米', '小米科技有限公司', 50, 'are you ok', 1);


SELECT * FROM tb_brand;
```

#### 实体类

- 根据SQL列表字段还原实体类（pojo或者叫javabean）

```java
package com.test.pojo;

public class Brand {
    private Integer id;//商品的id
    private String brandName;//商品的名称
    private String companyName;//公司名称
    private Integer ordered;//排序
    private String description;//描述
    private Integer status;//开关

    public Brand() {
    }

    public Brand(int id, String brandName, String companyName, int ordered, String description, int status) {
        this.id = id;
        this.brandName = brandName;
        this.companyName = companyName;
        this.ordered = ordered;
        this.description = description;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getOrdered() {
        return ordered;
    }

    public void setOrdered(int ordered) {
        this.ordered = ordered;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Brand{" +
                "id=" + id +
                ", brandName='" + brandName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", ordered=" + ordered +
                ", description='" + description + '\'' +
                ", status=" + status +
                '}';
    }
}

```

#### 测试用例

数据库连接池工具类

```java
package com.test.utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.util.Properties;

/**
 * 数据库连接池工具类
 */
public class ConnectionUtils {
    public static Connection connection() {

        Connection connection = null;
        try {
            //3、加载配置文件
            Properties prop = new Properties();
            prop.load(new FileInputStream("src/druid.properties"));

            //4、获取连接池对象
            DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);

            //5、获取数据库连接 Connection
            connection = dataSource.getConnection();
        } catch (Exception e) {
            e.printStackTrace();
        }


        return connection;
    }
}

```

增删改查业务

```java
package com.test.crud;

import com.test.pojo.Brand;
import com.test.utils.ConnectionUtils;
import org.junit.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TestCRUD {
    /**
     * 查询所有
     */
    @Test
    public void getAll() throws Exception {
        //通过数据库连接池工具类获取连接对象
        Connection connection = ConnectionUtils.connection();

        String sql = "select * from tb_brand;";
        //获取预编译对象
        PreparedStatement preparedStatement = connection.prepareStatement(sql);

        ResultSet resultSet = preparedStatement.executeQuery();

        List<Brand> brands = new ArrayList<>();

        while (resultSet.next()) {

            int id = resultSet.getInt("id");
            String brandName = resultSet.getString("brand_name");
            String companyName = resultSet.getString("company_name");
            int ordered = resultSet.getInt("ordered");
            String description = resultSet.getString("description");
            int status = resultSet.getInt("status");
            Brand brand = new Brand(id, brandName, companyName, ordered, description, status);

            brands.add(brand);
        }
        System.out.println(brands);
        preparedStatement.close();
        connection.close();
    }

    /**
     * 添加
     *
     * @throws Exception
     */
    @Test
    public void add() throws Exception {
        //模拟来自web的数据
        String brandName = "大米";//商品的名称
        String companyName = "大米";//公司名称
        int ordered = 100;//排序
        String description = "好吃";//描述
        int status = 1;//开关

        Connection connection = ConnectionUtils.connection();

        String sql = "insert into tb_brand (brand_name, company_name, ordered, description, status) values (?,?,?,?,?);";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);

        preparedStatement.setString(1, brandName);
        preparedStatement.setString(2, companyName);
        preparedStatement.setInt(3, ordered);
        preparedStatement.setString(4, description);
        preparedStatement.setInt(5, status);

        int count = preparedStatement.executeUpdate();//影响的行数

        System.out.println(count > 0);
        preparedStatement.close();
        connection.close();

    }


    /**
     * 修改
     */
    @Test
    public void update() throws Exception {
        int id = 4;
        String brandName = "测试数据";//商品的名称
        String companyName = "大米";//公司名称
        int ordered = 1000;//排序
        String description = "好吃";//描述
        int status = 1;//开关
        Connection connection = ConnectionUtils.connection();
        String sql = "update tb_brand set brand_name = ?,company_name = ?,ordered = ?, description = ?,status = ? where id = ?;";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);

        preparedStatement.setString(1, brandName);
        preparedStatement.setString(2, companyName);
        preparedStatement.setInt(3, ordered);
        preparedStatement.setString(4, description);
        preparedStatement.setInt(5, status);
        preparedStatement.setInt(6, id);

        int count = preparedStatement.executeUpdate();//影响的行数

        System.out.println(count > 0);
        preparedStatement.close();
        connection.close();


    }

    @Test
    public void remove() throws Exception {
        int id = 4;
        Connection connection = ConnectionUtils.connection();

        String sql = "delete from tb_brand where id = ?;";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, id);

        int count = preparedStatement.executeUpdate();
        System.out.println(count > 0);
        getAll();//查询所有
        preparedStatement.close();
        connection.close();

    }

}

```

