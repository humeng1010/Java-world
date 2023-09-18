---
# 这是文章的标题
title: 异常的破解
# 这是页面的图标
# icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: hm
# 设置写作时间
# date: 2020-01-01
# 一个页面可以有多个分类
category:
  - Java异常
# 一个页面可以有多个标签
tag:
  - 异常的破解
---

## 什么是异常？

- 异常是在程序在编译或者运行的过程中可能出现的问题，注意：语法错误不算异常体系
- 比如：数组索引越界，空指针异常，日期格式化异常，......
- 异常一旦出现，如果没有提前处理异常，程序就会退出JVM虚拟机而终止

## 异常体系

![image-20220810135605293](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101356409.png)



- 编译异常：在编译的时候会出现的异常
- 运行异常：在运行的时候会出现的异常

![image-20220810135731947](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101357997.png)



## 编译时异常的处理形式：

- 出现异常直接抛出去给调用者，调用者也继续抛出去
- 出现异常自己捕获处理，不麻烦别人
- 前两者结合，出现异常直接抛出去给调用者，调用者处理异常

![image-20220810140233954](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101402036.png)



### 处理方式1--throws

- throws:用在方法上，可以将方法内部出现的异常抛出去给本方法的调用者处理
- 这种方式并不好，发生异常的方法自己不处理异常，如果异常最终抛出去给虚拟机将会引起程序的死亡

抛出异常格式：

```java
方法 throws 异常1，异常2，异常3...{
  
}
```

规范做法：

```java
方法 throws Exception{
  
}
```



### 处理方式2--try...catch...

- 监视捕获异常，用在方法内部，可以将方法内部出现的异常直接捕获处理
- 这种方式还可以，发生异常的方法自己独立完成异常的处理，程序可以继续往下执行

格式：

```java
package com.meng;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ExceptionDemo2 {
    public static void main(String[] args) {
        System.out.println("程序开始。。。");
        parseTime("2020-1-1 11:11:11");
        System.out.println("程序结束。。。");

    }
    public static void parseTime(String date){
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date d = sdf.parse(date);
            System.out.println(d);
            InputStream inputStream = new FileInputStream("/Users/humeng/Pictures/1.jpg");
        } catch (Exception e) {
            e.printStackTrace();
        }
//        try {
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            Date d = sdf.parse(date);
//            System.out.println(d);
//            InputStream inputStream = new FileInputStream("/Users/humeng/Pictures/1.jpg");
//        } catch (ParseException e) {
//            e.printStackTrace();
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        }
//        try {
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            Date d = sdf.parse(date);
//            System.out.println(d);
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//
//        try {
//            InputStream inputStream = new FileInputStream("/Users/humeng/Pictures/1.jpg");
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        }

    }
}

```

### 处理方式3--前两者结合

- 方法直接将异常通过throws抛出去给调用者
- 调用者收到异常后直接捕获处理

```java
package com.meng;

import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ExceptionDemo3 {
    public static void main(String[] args) {
        System.out.println("程序开始。。。");
        try {
            parseTime("2020-1-1 11:11:11");//如果出现异常，下面的就不会执行，而直接跳到catch
            System.out.println("操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("操作失败");
        }
        System.out.println("程序结束。。。");

    }
    public static void parseTime(String date) throws Exception {

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date d = sdf.parse(date);
            System.out.println(d);
            InputStream inputStream = new FileInputStream("/Users/humeng/Pictures/1.jpg");

    }
}

```



## 运行时异常处理形式

- 运行时异常编译阶段不报错，是运行时才可能出错的，使用编译阶段不处理也可以
- 按照规范建议：建议在最外层调用处集中捕获处理即可

```java
package com.meng;

/**
 * 运行时的异常处理
 */
public class ExceptionDemo4 {
    public static void main(String[] args) {

        System.out.println("程序开始");
        try {
            div(10,0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("程序结束");

    }
    public static void div(int a,int b){
        System.out.println(a);
        System.out.println(b);
        int c = a / b;
        System.out.println(c);
    }

}

```

## 自定义异常

- java无法为这个世界上所有的问题提供异常类
- 如果企业想要通过异常方式管理自己的某个业务问题，就需要自定义异常类

```java
package com.meng;

//自定义编译时异常
//继承Exception并重写构造器
public class MyException extends Exception{
    public MyException(){

    }
    public MyException(String message){
        super(message);
    }
}

```

```java
package com.meng;

public class ExceptionDemo5 {
    public static void main(String[] args) {
        try {
            checkAge(23);
        } catch (MyException e) {
            e.printStackTrace();
        }

    }
    public static void checkAge(int age) throws MyException {
        if (age < 0 || age > 200){
          //抛出一个异常给对象调用者
          //throw:在方法内部直接创建一个异常对象，并在此点抛出
          //throws:在方法申明上的，抛出方法内部的异常
            throw new MyException(age+" is false");
        }else {
            System.out.println("年龄合法");
        }
    }
}

```

![image-20220810142240642](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101422688.png)

![image-20220810142329260](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101423317.png)

