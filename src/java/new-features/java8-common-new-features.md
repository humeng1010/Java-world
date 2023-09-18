---
# 这是文章的标题
title: Java8特性的科技
# 这是页面的图标
# icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
# 设置写作时间
# date: 2020-01-01
# 一个页面可以有多个分类
category:
  - Java8
# 一个页面可以有多个标签
tag:
  - lambda
  - stream
---

## Lambda概述

Lambda表达式是JDK8开始后的一种新语法形式。

**作用：简化 匿名内部类（面向对象中的内容）的代码写法**

Lambda表达式的简化格式：

(匿名内部类被重写方法的形参列表) ->{

被重写方法的方法体代码。

}

注：->是语法形式，无实际含义。



**注意：**Lambda表达式只能简化函数式接口的匿名内部类的写法形式。

什么是函数式接口？

首先必须是接口、其次接口中有且仅有一个抽象方法的形式；

通常我们会在接口上加一个@FunctionalInterface注解，标记该接口必须满足函数式接口。

![image-20220809154042123](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091540186.png)



```java
package com.lambda;

public class LambdaDemo1 {
    public static void main(String[] args) {
        //目标：学会使用Lambda表达式简化匿名内部类
        //Lambda表达式只能简化接口中只有一个抽象方法的匿名内部类形式

        //普通的匿名内部类
        Swimming s1 = new Swimming() {
            @Override
            public void swim() {
                System.out.println("老师游的很快");
            }
        };
        go(s1);

        //简化（因为这个Swimming接口中只有一个抽象方法，所以不会产生二义性）
        Swimming s2 = ()->{
            System.out.println("老师游泳很很很块");
        };
        go(s2);

        //再进一步简化
        go(()->{
            System.out.println("老师游泳游得超过了光速！！");
        });


    }
    public static void go(Swimming s){
        System.out.println("开始。。。");
        s.swim();
        System.out.println("结束。。。");
    }
}

@FunctionalInterface//一旦加上这个注解，这个接口就必须是函数式接口，里面只能有一个抽象方法。
interface Swimming{
    void swim();
}

```

### 总结：

1. Lambda表达式的基本作用

   简化函数式接口的匿名内部类的写法

2. Lambda表达式有什么使用前提？

   必须是接口的匿名内部类，接口中只能有一个抽象方法

3. Lambda的好处

   Lambda是一个匿名函数，我们可以把Lambda表达式理解为是一段可传递的代码，它可以写出更简洁、灵活的代码，作为一种更紧凑的代码风格，使Java语言表达能力得到了提升。



Lambda表达式省略写法（在Lambda基础上继续简化）

- 参数类型可以省略不写

- 如果只有一个参数，参数类型可以省略，同时（）也可以省略
- 如果Lambda方法体重只有一行代码，可以省略大括号不写，同时也要省略分号
- 如果Lambda方法体重只有一行代码，可以省略大括号不写，如果这行代码是return语句，必须省略return不写，同时也要省略；不写

```java
package com.lambda;

import java.util.Arrays;
import java.util.Comparator;

public class LambdaDemo2 {
    public static void main(String[] args) {
        Integer[] ages1 = {34,12,42,23};
//        Arrays.sort(ages1, new Comparator<Integer>() {
//            @Override
//            public int compare(Integer o1, Integer o2) {
//                return o2-o1;//降序：o2 - o1;  升序：o1 - o2;
//            }
//        });
            //简化
//        Arrays.sort(ages1,(Integer o1,Integer o2) -> {
//            return o2 - o1;
//        });
//          再简化！！
//        Arrays.sort(ages1,((o1, o2) -> {
//            return o2 - o1;
//        }));
        //再再再简化！！！
        Arrays.sort(ages1,(o1, o2) -> o2 - o1);

        System.out.println(Arrays.toString(ages1));



    }
}

```




## Stream流

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

# 函数式接口Function、Consumer、Predicate、Supplier
## 函数式接口定义

函数式接口（Functional Interface）：有且仅有一个抽象方法的接口，但可以有多个非抽象方法的接口

函数式接口，即适用于`函数式编程`场景的接口，可以被隐式转换为Lambda表达式来表示接口的一个实现；jdk8以前是使用匿名类实现的。

示例：jdk1.8 使用注解@FunctionalInterface注解表示一个函数式接口
```java
@FunctionalInterface  
public interface IHello {
	public void sayHello(String name);
}
```
> 示例: jdk1.8 之前使用匿名内部类方式来调用函数式接口

```java
@Test  
void test1() {
	IHello hello = new IHello() {
		@Override  
		public void sayHello(String name) {
			System.out.println("hello "  + name);
		}
	};
	hello.sayHello("张三");
}
```
> 示例: jdk1.8 之后可以使用lambda表达式隐式的实现函数式接口

```java
@Test  
void test2() {
	IHello hello = name -> System.out.println("hello " + name);
	hello.sayHello("李四");
}
```
## jdk1.8 新增的函数式接口
jdk1.8之前,已有的函数式接口有很多：
> java.lang.Runnable
java.util.concurrent.Callable
java.security.PrivilegedAction
java.util.Comparator
java.io.FileFilter
java.nio.file.PathMatcher
java.lang.reflect.InvocationHandler
java.beans.PropertyChangeListener
java.awt.event.ActionListener
javax.swing.event.ChangeListener


jdk1.8之后新增的一个重要的函数接口:
> java.util.function


此包下有很多类来支持java的函数式编程, 现在就讲到本篇文章的重点, 其中重要的四个接口Function、Consumer、Predicate、Supplier。

| 接口            | 参数 | 返回值  | 说明                                     |
| --------------- | ---- | ------- | ---------------------------------------- |
| `Supplier<T>`   | 无   | T       | 供给型；无参，返回一个指定泛型的对象     |
| `Consumer<T>`   | T    | 无      | 消费型；传入一个指定泛型的参数，无返回值 |
| `Predicate<T>`  | T    | Boolean | 断言型；判断函数，返回判断结果true/false |
| `Function<T,R>` | T    | R       | 方法型；输入一个参数，得到一个结果       |

## Supplier：供给型函数式接口
使用场景：提前定义可能返回的一个指定类型结果，等需要调用的时候再获取结果。
```java
	@Test  
    void test3(){
        // 示例1
        int num1 = 100;
        int num2 = 200;
        // 提前定义好需要返回的指定类型结果，但不运行
        Supplier supplier= () -> num1 + num2;
        // 调取get()方法获取一个结果
        System.out.println(supplier.get());
        // 示例2
        String str = "abcdefghijklmn";
        String s = getValue(()->str.substring(1,5));
        System.out.println(s);
    } 

// 定义一个方法，返回一个结果，参数使用Supplier，具体返回内容由调用者决定
public static String getValue(Supplier supplier){
    return supplier.get();
}
```
> 注意：此示例中返回的结果引用的对象num1和num2其实是不能更改的，如果我们在supplier定义后，suppliser.get()调用前将num1或num更改了，则编译会报错！

## Consumer：消费型函数式接口
使用场景：处理一些结果或数据，不需要返回的消费型，例如打印、发送通知等操作。
方法：
> void accept(T t); 给参数T执行指定的操作
default Consumer andThen(Consumer<? super T> after) 给参数T执行指定操作后，再执行after方法


```java
@Test  
    void test4(){
        // 传入一个加法并打印结果
        modify(10,x->System.out.println(x+20));
        // 传入一个减法并打印结果
        modify(10,x->System.out.println(x-20));
    } 

// 定义一个方法，第二个参数为一个Consumer
public static void modify(int num,Consumer consumer){
    // 执行accept()方法，方法的具体实现不关心，调用的时候才关心
    consumer.accept(num);
}
```

示例：将一批用户里面的“李四”整理出来。
```java
@Test  
    void test4(){
        List lisiList = new ArrayList<>();
        // 定义一个消费方法，将李四筛选出来存入lisiList
        Consumer  consumer  = x -> {
            if (x.getName().equals("李四")){
                lisiList.add(x);
            }
        };
        List list = new ArrayList<>();
        list.add(new Person(21,"张三"));
        list.add(new Person(22,"李四"));
        list.add(new Person(23,"张三"));
        list.add(new Person(16,"李四"));
        list.add(new Person(30,"王五"));
        list.add(new Person(52,"李四"));
        // 传入一个消费方法
        list.forEach(consumer);
        // 打印消费方法处理后的lisiList
        System.out.println(lisiList);
    }
```

> Consumer接口还有一个方法andThen(Consumer<? super T> after)，表示对给定参数执行定义操作后，再继续执行after定义的操作。 

示例：将李四整理出来后将年龄大于25的李四整理出来
```java
@Test  
    void test4(){
        List lisiList = new ArrayList<>();
        // 定义一个消费方法，将李四筛选出来存入lisiList
        Consumer  consumer  = x -> {
            if (x.getName().equals("李四")){
                lisiList.add(x);
            }
        };
        // 整理出李四后，继续将年龄大于25的筛选出来
        consumer = consumer.andThen(x->{
            // removeIf方法里传入了一个Predicate断言接口实例，下面示例中将要讲到
            lisiList.removeIf(y->y.getAge()<25);
        });
        List list = new ArrayList<>();
        list.add(new Person(21,"张三"));
        list.add(new Person(22,"李四"));
        list.add(new Person(23,"张三"));
        list.add(new Person(16,"李四"));
        list.add(new Person(30,"王五"));
        list.add(new Person(52,"李四"));
        // 传入一个消费方法
        list.forEach(consumer);
        // 打印消费方法处理后的lisiList
        System.out.println(lisiList);
    } 
```
## Predicate：断言型函数式接口
使用场景：对一个数据进行判断，并返回boolean
方法：
> boolean test(T t) 判断指定值是否符合条件
Predicate and(Predicate<? super T> other) 与操作
Predicate or(Predicate<? super T> other) 或操作
static  Predicate isEqual(Object targetRef) 静态方法，equals判断第一个test与第二个test方法相同

```java
@Test  
public void test5(){
    Predicate predicate = (x)-> x==10;
    System.out.println(predicate.test(10));
}
```
> 在上例中我们有使用到List集合里的一个方法removeIf(Predicate<? super E> filter) 他的方法参数就是一个Predicate，用来判断list值并移除

示例：将list集合里面小于20的数据移除
```java
@Test  
    public void test5(){
        List list =  new ArrayList<>();
        list.add(9);
        list.add(12);
        list.add(21);
        list.add(60);
        // 使用lambda表达式Predicate，判断list里数是否满足条件，并删除
        list.removeIf(x->x<20);
        System.out.println(list);
    }
```
> 查看list.removeIf()方法源码，我们发现他实现的方式就是遍历集合并对每个集合元素调用Predicate.test()方法，验证结果并移除元素。 

Predicate其他方法的使用类似
示例：1.移除集合中大于20的元素。2.然后移除小于50的元素。3.或者移除值等于60的元素。4.前面整个结果取反
```java
@Test  
    public void test5(){
        // 1.断言 值大于20
        Predicate<Integer> predicate2 = (x)-> x>20;
        // 2.断言 并且值小于50
        predicate2 = predicate2.and(y->y<50);
        // 3.断言 或者值等于60
        predicate2 = predicate2.or(y->y==60);
        // 4.断言 逻辑取反
        predicate2 = predicate2.negate();

        List<Integer> list =  new ArrayList<>();
        list.add(9);
        list.add(12);
        list.add(21);
        list.add(60);

        // 使用lambda表达式Predicate，判断list里数是否满足条件，并删除
        list.removeIf(predicate2);
        System.out.println(list);
    }
```
结果：
`[21, 60]`

示例：使用isEqual() 统计集合中与设定相等的元素个数
```java
@Test  
    public void test5(){
        // 示例3 统计集合中相等的对象的个数
        Person p = new Person(22, "李四");
        // 使用isEqual生成一个断言
        Predicate<Person> predicate3 =  Predicate.isEqual(p);
        Long count = Stream.of(
            new Person(21,"张三"),
            new Person(22,"李四"),
            new Person(23,"王五"),
            new Person(24,"王五"),
            new Person(22,"李四"),
            new Person(26,"张三")
        ).filter(predicate3).count();
        System.out.println(count);
    }
```

结果：2
## Function：函数型函数式接口
使用场景：根据一个数据类型得到另一个数据类型。

方法：
> R apply(T t); 根据一个数据类型T加工得到一个数据类型R
 Function<V, R> compose(Function<? super V, ? extends T> before) 组合函数，调用当前function之前调用
 Function<T, V> andThen(Function<? super R, ? extends V> after) 组合函数，调用当前function之后调用
static  Function<T, T> identity() 静态方法，返回与原函数参数一致的结果。x=y;


apply()
示例：实现一个function将String转换为Integer
```java
@Test  
    public void test6(){
        //示例1：定义一个funciton,实现将String转换为Integer
        Function<String,Integer> function = x->Integer.parseInt(x);
        Integer a = function.apply("100");
        System.out.println(a.getClass());           // 结果：class java.lang.Integer
    }
```

andThen()
示例：使用andThen()方法实现一个函数：y=10x + 10
```java
@Test  
    public void test6(){
        //示例3：使用andThen() 实现一个函数 y=10x + 10;
        Function<Integer,Integer> function2 = x->10*x;
        function2 = function2.andThen(x->x+10);
        System.out.println(function2.apply(2));                 //结果：30
    }
```

compose()
示例：使用compose() 实现一个函数 y=(10+x)2
```java
@Test  
    public void test6(){
        //示例4：使用compose() 实现一个函数 y=(10+x)2;
        Function<Integer,Integer> function3 = x->x*2;
        function3 = function3.compose(x->x+10);
        System.out.println(function3.apply(3));                 //结果：26
    }
```

联合使用
示例：使用使用andThen()、compose() 方法实现一个函数 y=(10+x)2+10;
```java
@Test  
    public void test6(){
        //示例5：使用使用compose()、andThen()实现一个函数 y=(10+x)2+10;
        Function<Integer,Integer> function4 = x->x*2;
        function4 = function4.compose(x->x+10);
        function4 = function4.andThen(x->x+10);
        System.out.println(function4.apply(3));                 //结果：36
    }
```
## 总结

这些函数式接口用的最多的地方就是`方法参数`，向参数中传递一个函数，只有函数的定义，函数的具体实现则由调用者来实现。这就是函数式接口的意义所在。

