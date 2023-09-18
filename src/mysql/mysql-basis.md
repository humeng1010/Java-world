# MySQL

## 数据库相关概念

![image-20220813132000741](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131320872.png)

### 常见的关系型数据库管理系统

![image-20220813132058698](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131320758.png)

### MySQL下载官网

https://downloads.mysql.com/archives/community/



### MySQL登陆参数

```bash
mysql -u 用户名 -p 密码 [-h(ip地址) -P(端口号默认3306)]
```

### MySQL数据模型

#### 关系型数据库

![image-20220813134023770](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131340887.png)

![image-20220813134216064](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131342163.png)



## SQL

1. SQL语句可以单行或多行书写，以分号结尾
2. MySQL数据库的SQL语句部分大小写，关键字建议使用大写
3. 注释
   - 单行注释：**--** 注释内容或 **#**注释内容（SQL独有）
   - 多行注释：**/* 注释 */**

```sql
SHOW DATABASES; -- 查询所有数据库名称
SHOW DATABASES; #查询所有数据库名称
SHOW DATABASES;/*select all database*/

```



### SQL分类

- DDL 数据定义语言，用来定义数据库对象：数据库，表，列等
- DML 数据库操作语言，用来对数据库中的表进行增删改
- DQL 数据库查询语言，用来查询数据库中表的记录（数据）
- DCL 数据控制语言，用来定义数据库的访问权限和安全级别，及创建用户的

![image-20220813134639482](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131346520.png)





## DDL

### DDL--操作数据库

1. 查询

   ```sql
   SHOW DATABASES;
   ```

2. 创建

   - 创建数据库

     ```sql
     CREATE DATABASE 数据库名称;
     ```

   - 创建数据库（判断，如果存在则不创建）

     ```sql
     CREATE DATABASE IF NOT EXISTS 数据库名称;
     ```

3. 删除

   - 删除数据库

     ```sql
     DROP DATABASE IF EXISTS 数据库名称;
     ```

4. 使用数据库

   - 查看当前使用的数据库

     ```sql
     SELECT DATABASE();
     ```

   - 使用数据库

     ```sql
     USE 数据库名称;
     ```

![image-20220813135546408](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131355520.png)



### DDL--操作表

- 创建(Create)
- 查询(Retrieve)
- 修改(Update)
- 删除(Delete)

#### 查询表

- 查询当前数据库下有哪些表的名称

  ```sql
  SHOW TABLES;
  ```

- 查询表结构

  ```sql
  DESC 表名称;
  ```

#### 创建表

```sql
CREATE TABLE tb_user(
id int,
username VARCHAR(20),
password VARCHAR(32)
);
DESC tb_user; -- 查看表的结构
```

#### 数据类型

- MySQL支持多种类型，可以分为三类：
  - 数值
  - 日期
  - 字符串

![image-20220813135942300](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131359372.png)

<img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131416713.png" alt="image-20220813141629612" style="zoom:50%;" />

```sql
CREATE TABLE student (
	id INT,
	NAME VARCHAR ( 10 ),
	gender CHAR ( 1 ),
	brithday DATE,
	score DOUBLE ( 5, 2 ),
	email VARCHAR ( 64 ),
	tel VARCHAR ( 15 ),
	STATUS TINYINT -- 最后一行没有逗号

);
DESC student;
```



#### 修改

1. 修改表名

   ```sql
   ALTER TABLE 表名 RENAME TO 新的表名;
   ```

2. 添加一列

   ```sql
   ALTER TABLE 表名 ADD 列名 数据类型;
   ```

3. 修改数据类型

   ```sql
   ALTER TABLE 表名 MODIFY 列名 新的数据类型;
   ```

4. 修改列名和数据类型

   ```sql
   ALTER TABLE 表名 CHANGE 列名 新列名 新数据类型;
   ```

5. 删除列

   ```sql
   ALTER TABLE 表名 DROP 列名;
   ```

   ![image-20220813142255313](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131422438.png)
   
   

#### 删除

1. 删除表

   ```sql
   DROP TABLE 表名;
   ```

2. 删除表时判断表是否存在

   ```sql
   DROP TABLE IF EXISTS 表名;
   ```



## DML

- 添加(insert)
- 修改(update)
- 删除(delete)

```sql
/*----------- insert----------*/
SELECT
	* 
FROM
	tb_user;
	
INSERT INTO tb_user ( id, username )
VALUES
	( 1, '张三' );
	
INSERT INTO tb_user ( id, username, PASSWORD )
VALUES
	( 3, '王五', 123456 );
	
INSERT INTO tb_user -- 如果给所有的列添加数据，列名可以省略，不过不建议省略
VALUES
	( 2, '李四', 123 );
/*   批量添加   */
INSERT INTO tb_user
VALUES
	( 2, '李四', 123 ),( 2, '李四', 123 ),( 2, '李四', 123 );
	
/*--------update-----------*/
UPDATE tb_user 
SET id = 4,
username = 'lisi',
PASSWORD = 222 
WHERE
	id = 3;
	
UPDATE tb_user 
SET PASSWORD = 123333 
WHERE
	id = 1;
	
SELECT
	* 
FROM
	tb_user;
	
/*----删除数据------*/
DELETE 
FROM
	tb_user 
WHERE -- 如果不加where会删除所有的数据
	id = 4;
```



## DQL

### 查询语法

- 基础查询
- 条件查询(WHERE)
- 分组查询(GROUP BY)
- 排序查询(ORDER BY)
- 分页查询(LIMIT)

```sql
SELECT
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段
HAVING
	分组后的条件
ORDER BY
	排序字段
LIMIT
	分页限定
```

#### 补充

```sql
-- 去除重复 distinct
SELECT DISTINCT 列名 FROM 表名;
-- 起别名 as（as不写也可以，但是得有一个空格）
SELECT 原列名 AS 别名,原列名 AS 别名 FROM 表名;
```

![image-20220813150012732](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131500883.png)



### 条件查询

```sql
-- 查询age在20到30之间的  BETWEEN 20 and 30;
SELECT * FROM tb_user WHERE age BETWEEN 20 and 30;

-- 模糊查询
-- _代表一个占位符；%代表多个占位符
-- 查询性马的信息
SELECT * FROM tb_user WHERE name LIKE '马%';
-- 查询第二个字是花的信息
SELECT * FROM tb_user WHERE name LIKE '_花%';
-- 查询名字中包含德的信息(最常用的)
SELECT * FROM tb_user WHERE name LIKE '%德%';
```

![image-20220813150616143](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131506220.png)



### 排序查询

1. 排序查询语法

   ```sql
   SELECT 字段列表 FROM 表名 ORDER BY 排序字段名1 [排序方式1],排序字段名2 [排序方式2] ... ;
   ```

排序方式：

- ASC：升序排列（默认值）
- DESC：降序排列

```sql
-- 查询学生信息，按照年龄升序排序
SELECT * FROM tb_user ORDER BY age ASC;
-- 查询数学成绩按照降序排列，如果数学成绩一样，按照英语成绩升序排列
select * from tb_user order by match desc,english asc;
```

![image-20220813151814709](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131518779.png)



### 分组查询

#### 聚合函数

1. 将一列作为一个整体，进行纵向计算

2. 聚合函数分类

   | 函数名      | 功能                             |
   | ----------- | -------------------------------- |
   | count(列名) | 统计数量（一般选用不为null的列） |
   | max(列名)   | 最大值                           |
   | min(列名)   | 最小值                           |
   | sum(列名)   | 求和                             |
   | avg(列名)   | 平均值                           |

3. 聚合函数语法：

   ```sql
   SELECT 聚合函数(列名) FROM 表
   ```

```sql
-- 统计班级一共有多少学生
SELECT COUNT(*) FROM tb_user;
-- 查询数学成绩的最高分
select max(match) from tb_user;
-- 查询英语成绩的最低分
select min(english) from tb_user;
-- 查询数学成绩的总分
select sum(match) from tb_user;
-- 查询数学成绩的平均分
select avg(match) from tb_user;
-- 查询英语成绩的最低分（存在null）
select min(english) for tb_user;-- 不是null值，聚合函数排除了null
```

#### 分组查询

1. 分组查询语法

   ```sql
   select 字段列表 from 表名 [where 分组条件限定] group by 分组字段名 [having 分组后条件过滤]
   ```

   注意：分组后，查询的字段为**聚合函数**和**分组字段**，查询其他的字段无任何意义

2. where和having区别：

   - **执行时机不一样**：where是分组之前进行限定，不满足where条件，则不参与分组，而having是分组后对结果进行过滤
   - **可判断的条件不一样**：where不能对聚合函数进行判断，having可以

   **执行顺序：where > 聚合函数 > having**

### 分页查询

1. 分页查询语法

   ```sql
   select 字段列表 from 表名 limit 起始索引,查询条目数;
   ```

   - 起始索引：从0开始
   - 计算公式：起始索引 = （当前页码 - 1）* 每页显示的条目数





## 约束

### 概念

1. 约束概念

   - 约束是作用于表中列上的规则，用于限制加入表的数据
   - 约束的存在保证了数据库中数据的正确性、有效性和完整性

2. 约束的分类

   | 约束名称 | 描述                                                         | 关键字      |
   | -------- | ------------------------------------------------------------ | ----------- |
   | 非空约束 | 保证列中的所有数据不能有null值                               | NOT NULL    |
   | 唯一约束 | 保证列中所有数据各不相同                                     | UNIQUE      |
   | 主键约束 | 主键是一行数据的唯一标识，要求非空且唯一                     | PRIMARY KEY |
   | 检查约束 | 保证列中的值满足某一条件                                     | CHECK       |
   | 默认约束 | 保存数据时，未指定值采用某人值                               | DEFAULT     |
   | 外键约束 | 外键用来让两个表的数据之间建立连接，保证数据的一致性和完整性 | FOREIGN KEY |

```sql
drop table if exists emp;

-- 员工表
create table emp(
	id int primary key auto_increment,-- 员工id，主键且自增长
	ename varchar(50) not null unique,-- 员工姓名，非空且唯一
	joindate date not null,-- 入职日期，非空
	salary double(7,2) not null,-- 工资，非空
	bonus double(7,2) default 0 -- 奖金，如果没有奖金，默认为0  

);
insert into emp values(1,'张三','2020-1-1',3500,1000);
insert into emp values(3,'张三sa','2020-1-1',3500,1000);

-- 演示自动增长 auto_increment
insert into emp(ename,joindate,salary,bonus) values('张珊珊1','2022-2-2',5000,200);
insert into emp values(null,'张珊珊','2022-2-2',5000,200);

select * from emp;
```



## 外键约束

1. 概念
   - 外键用来让**两个表之间建立连接的**，保证数据的一致性和完整性

2. 语法

   - 添加约束

   ```sql
   -- 部门表
   drop table if exists dept;
   create table dept(
   	id int primary key auto_increment,
   	dep_name varchar(20),
   	addr varchar(20)
   );
   
   -- 员工表
   drop table if exists emp;
   create table emp(
   	id int primary key auto_increment,
   	name varchar(20),
   	age int,
   	dep_id int,
   	-- 添加外键，关联dept表的主键
   	-- 外键：foreign key(这个表中要作为外键的列，id)
   	-- 关联：references 关联的表(id)
   	constraint fk_emp_dept foreign key(dep_id) references dept(id)
   	
   );
   
   -- 添加部门
   insert into dept (dep_name,addr) values
   ('研发部','广州'),
   ('销售部','深圳');
   -- 添加员工，dep_id 表示员工所在的部门
   insert into emp (name,age,dep_id) values
   ('张三',20,1),
   ('李四',20,1),
   ('王五',20,1),
   ('赵六',20,2),
   ('小明',20,2),
   ('小白',20,2);
   
   -- -------------
   select * from emp;
   
   select * from dept;
   delete from dept where id = 1;
   
   alter table db1.emp drop foreign key fk_emp_dept;
   
   alter table db1.emp add constraint fk_emp_dept foreign key (dep_id) references dept(id);
   
   ```

![image-20220813161441371](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131614537.png)





## 数据库设计

### 数据库设计步骤

1. 需求分析（数据是什么？数据具体有哪些属性？数据与属性的特点是什么？）
2. 逻辑分析（通过ER图对数据库进行逻辑建模，不需要考虑我们所选用的数据库管理系统）
3. 物理设计（根据数据库自身的特点把逻辑设计转换为物理设计）
4. 维护设计（1. 对新的需求进行建模；2.表的优化）

![image-20220813161930018](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131619104.png)



### 表的关系

- 一对一：
  - 如：用户 和 用户详情
  - 一对一多用于表的拆分，将一个实体中经常使用的字段放在一张表中，不经常使用的放在另一张表中，用于提升查询的性能
  - 实现方式：在任意一方建立外键，关联对方主键，并**设置外键唯一(unique)**
  
  ![image-20220813164434292](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131644353.png)
  
  ```sql
  
  create table tb_user(
      id int primary key auto_increment,
      avant varchar(50) not null ,
      age int check ( age between 0 and 200),
      gender char(1),
      desc_id int unique
  );
  create table tb_user_desc(
      id int primary key auto_increment,
      city varchar(50),
      status tinyint,
      `desc` varchar(100)
  );
  
  alter table tb_user add constraint fk_desc_id foreign key (desc_id) references tb_user_desc(id);
  ```
  
  
  
  ![image-20220813165009465](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131650540.png)
  
  
  
- 一对多（多对一）：
  - 如：部门和员工
  - 一个部门对应多个员工，一个员工对应一个部门
  - 实现方式：在**多**的一方建立外键关联**一**的一方主键
  
  ![image-20220813162312378](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131623436.png)
  
  
  
- 多对多：
  - 如：商品和订单
  - 一个商品对应多个订单，一个订单包含多个商品
  - 实现方式：**建立第三张中间表**，中间表至少**包含两个外键**，分别关联两方主键
  
  ![image-20220813162242368](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131622463.png)
  
  ```sql
  create table tb_order(
      id int primary key auto_increment,
      payment double,
      payment_type tinyint,
      status tinyint
  );
  create table tb_goods(
      id int primary key auto_increment,
      title varchar(50),
      price double
  );
  create table tb_order_goods(
      id int primary key auto_increment,
      order_id int,
      goods_id int,
      count int
  );
  
  # 在中间表中添加外键
  alter table tb_order_goods add constraint fk_order_id foreign key (order_id) references tb_order(id);
  alter table tb_order_goods add constraint fk_goods_id foreign key (goods_id) references tb_goods(id);
  
  ```
  
  
  
  

![image-20220813163251421](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131632537.png)





## 多表查询

### 内连接-显示(inner join 表名 on 条件)

![image-20220813170024222](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131700335.png)



1. 内连接查询语法

   ```sql
   -- 隐式内连接
   select 字段列表 from 表1，表2... where 条件;
   select * from emp , dept where emp.dep_id = dept.id;
   select emp.name,emp.gender,dept.name from emp,dept where emp.dep_id = dept.id;
   -- 显示内连接
   select 字段列表 from 表1 [inner] join 表2 on 条件;
   select * from emp inner join dep on emp.dep_id = dept.id;
   ```

![image-20220813170314141](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131703210.png)



### 外连接-左[右]外连接(表1 left[right] join 表2 on 条件)

1. 外连接查询语法

   ```sql
   -- 左外连接
   select 字段列表 from 表1 left join 表2 on 条件;
   -- 右外连接
   select 字段列表 from 表1 right join 表2 on 条件;
   ```

### 子查询

1. 子查询根据查询结果不同，作用不同：

   ```sql
   -- 单行单列：作为条件值，使用 = != > < 等进行条件判断
   select 字段列表 from 表 where 字段名 = (子查询);
   -- 多行单列：作为条件值，使用in等关键字进行条件判断
   select 字段列表 from 表 where 字段名 in (子查询);
   -- 多行多列：作为虚拟表
   select 字段列表 from (子查询) where 条件;
   ```

   ![image-20220813172807566](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131728640.png)
   
   

## 事务

### 简介

- 数据库的事务是一种机制、一个操作序列，包含了**一组数据库操作命令**
- 事务把所有的命令作为一个整体一起向系统提交或撤销操作的请求，即这一组数据库命令**要么同时成功，要么同时失败**
- 事务是一个不可分割的工作逻辑单元

```sql
-- 开启事务
start transaction;
-- 或者
begin;

-- 提交事务
commit;

-- 出异常回滚事务
rollback;
```



### 事务的四大特征

- 原子性（**A**tomicity）：**事务是不可分割的最小操作单位，要么同时成功，要么同时失败**
- 一致性（**C**onsistency）：事务完成时，必须使所有的数据都保持一致状态
- 隔离性（**I**solation）：多个事务之间，操作的可见性
- 持久性（**D**urability）：**事务一旦提交或回滚，它对数据库中的数据的改变就是永久的**

MySQL事务默认自动提交

```sql
-- 查看事务的默认提交方式
select @@autocommit;
-- 1 自动提交  0 手动提交
-- 修改事务的提交方式
set @@autocommit = 0;
```

