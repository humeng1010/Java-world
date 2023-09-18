---
# 这是文章的标题
title: Stream流
# 这是页面的图标
# icon: file
# 这是侧边栏的顺序
order: 2
# 设置作者
author: hm
# 设置写作时间
# date: 2020-01-01
# 一个页面可以有多个分类
category:
  - Java8
# 一个页面可以有多个标签
tag:
  - Stream
---

## 概述

什么是Stream流？

- 在Java 8 中，得益于Lambda表达式所带来的函数式编程，引入了一个全新的Stream流的概念
- **目的：用于简化集合和数组操作的API**
- ![image-20220810133948555](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101339674.png)
- <img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101342945.png" alt="image-20220810134228903" style="zoom:50%;" />







```java
package com.meng.streamDemo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 初步体验Stream流的快捷
 */
public class StreamTest {
    public static void main(String[] args) {
        List<String> name = new ArrayList<>();
        Collections.addAll(name,"刘备","张飞","关羽","张三","张无忌");
        System.out.println(name);

        //从name集合中取出姓张的放到新的集合
//        List<String> zhangList = new ArrayList<>();
//        for (String s : name) {
//            if (s.startsWith("张")){
//                zhangList.add(s);
//            }
//        }
//        System.out.println(zhangList);
//
//        //找名称长度是3的姓名
//        List<String> zhangThree = new ArrayList<>();
//        for (String s : zhangList) {
//            if (s.length() == 3){
//                zhangThree.add(s);
//            }
//        }
//        System.out.println(zhangThree);

        //使用Stream实现
        /**
         * 先得到集合的Stream流（类似于传送带），然后经过一层一层的过滤，最终得到的就是我们想要的结果
         */
        //得到Stream流。过滤不是姓张的元素             。   过滤长度不是3的元素         。forEach遍历流
        name.stream().filter(s -> s.startsWith("张")).filter(s -> s.length() == 3).forEach(s -> System.out.println(s));
    }
}

```

## Stream流的获取

```java
package com.meng.streamDemo;

import java.util.*;
import java.util.stream.Stream;

public class StreamTest2 {
    public static void main(String[] args) {
        /**-----------------Collection集合获取流-----------------------*/
        Collection<String> list = new ArrayList<>();
        Stream<String> s = list.stream();//拿到Collection的Stream流



        /**-----------------Map集合获取流-----------------------*/
        Map<String,Integer> maps = new HashMap<>();

        //键流
        Stream<String> keyStream = maps.keySet().stream();
        //值流
        Stream<Integer> valueStream = maps.values().stream();
        //或者键值对
        Stream<Map.Entry<String, Integer>> kvStream = maps.entrySet().stream();


        /**-----------------数组获取流-----------------------*/
        String[] name = {"小王","小杜","小李"};
        Stream<String> nameStream = Arrays.stream(name);
        

    }
}

```

## Stream常用API

![image-20220810134701065](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101347119.png)



```java
package com.meng.streamDemo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class StreamTest3 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("张无忌");
        list.add("张三丰");
        list.add("张飞");
        list.add("吴邪");
        list.add("张启灵");
        list.add("王月半");
        System.out.println(list);

        //Stream<T> filter(Predicate<? super T> predicate);
//        list.stream().filter(new Predicate<String>() {
//            @Override
//            public boolean test(String s) {
//                return s.startsWith("张");
//            }
//        });
        //使用Lambda表达式，我们认为s是list中的每一个元素
        //注意过滤的不是filter形参的元素，filter中的形参是要保留的元素，过滤的是不符合形参的元素
        list.stream().filter( s-> s.startsWith("张")).forEach(s -> System.out.println(s));

        //只会过滤，而不会改变原本的，list集合中的内容
        System.out.println(list);

        long size = list.stream().filter(s -> s.length() == 3).count();
        System.out.println(size);

        //limit取前几个元素
        //扩展，我们认为在Lambda表达式中，我们发现如果入参和后面的方法参数一样的话，我们可以使用方法引用，例如
        // s -> System.out.println(s)  可以变成这样 System.out::println  方法引用
        list.stream().filter(s -> s.startsWith("张")).limit(2).forEach(System.out::println);

        //skip是跳过前几个元素
        list.stream().filter(s -> s.startsWith("张")).skip(2).forEach(System.out::println);

        //Map加工
        //给集合元素的前面都加上"黑马的"
//        list.stream().map(new Function<String, String>() {
//            @Override
//            public String apply(String s) {
//                return "黑马的"+s;
//            }
//        });
        //简化：          s：原材料  ->  加工后的
        list.stream().map(s -> "黑马的"+s).forEach(System.out::println);

        //需求：把所有的名称，都加工为一个学生对象
//        list.stream().map(s -> new Student(s)).forEach(student -> System.out.println(student));
        list.stream().map(Student::new).forEach(System.out::println);//构造器引用   方法引用

        //合并流
        Stream<String> s1 = list.stream().filter(s -> s.startsWith("张"));
        Stream<String> s2 = Stream.of("java1","java2");
        Stream<String> s3 = Stream.concat(s1,s2);
        s3.forEach(s -> System.out.println(s));



    }
}

```



## Stream流的收集操作

![image-20220810135140321](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101351367.png)



- 就是把Stream流操作后的结果数据转回到集合或数组中去
- Stream流：方便操作集合/数组的手段
- 集合/数组:才是开发中的目的
- 流只能被收集一次

```java
package com.meng.streamDemo;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamTest4 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("张无忌");
        list.add("张三丰");
        list.add("张飞");
        list.add("吴邪");
        list.add("张启灵");
        list.add("王月半");
        System.out.println(list);

        Stream<String> s1 = list.stream().filter(s -> s.startsWith("张"));

        List<String> zhangList = s1.collect(Collectors.toList());
        System.out.println(zhangList);

    }
}

```

![image-20220810135243897](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101352946.png)

