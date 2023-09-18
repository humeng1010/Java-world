---
# 这是文章的标题
title: Java基础大陆第一幕
# 这是页面的图标
# icon: file
# 这是侧边栏的顺序
order: 1
# 设置写作时间
# date: 2022-01-01
# 一个页面可以有多个分类
category:
  - Java基础
# 一个页面可以有多个标签
tag:
  - Java语法
---
::: tip 第一幕
语法之谜
:::


## 标识符


> Java中的所有组成部分都需要名字，类名，变量名，方法名都被称为标识符


1. Java中的关键字不能作为标识符（就是关键字不能作为名字）

   ![img](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181713950.png)

<!-- more -->

## 数据类型

### Java是强类型语言

要求变量的使用严格符合类型规定，所有的变量必须先定义后才能使用

### 数据类型

Java的数据类型分为两大类：基本类型和引用类型

Java语言类型：

 基本类型：

 数值类型：整数型，浮点型

 boolean类型：占一位其值只有ture和false两个

 引用数据类型：**类，接口，数组**（注意：字符串类型也是一个类，也属于引用数据类型）

### 整型拓展

```java
十进制整数，如：99,-500,0。
        八进制整数，要求以 0开头，如：015。
        十六进制数，要求 0x或 0X开头，如：0x15 。

        //整型 
        int i=10;
        int i2=010;
        int i3=0x10;
        System.out.println(i); //10 System.out.println(i2); //8 System.out.println(i3); //16
```

### 字符型拓展

单引号用来表示字符常量。例如'A'是一个字符，他与"A"是不同的，"A"表示的是一个字符串。

```java
//代码1 
String sa=new String("Hello world");
        String sb=new String("Hello world");System.out.println(sa==sb); // false,因为sa与sb是通过String对象new出来的,创建了两个对象，而且sa和sb的地址也不一样，所以返回false
//代码2 
        String sc="Hello world";
        String sd="Hello world";System.out.println(sc==sd); // true，因为创建的都是同一个对象，地址一样，内容也一样，所以返回true
```

### 布尔类型拓展

boolean类型：一位，不是一个字节，就是0或1

boolean类型有两个值，true和false，不可以用0或1代替true或false，这点和c语言不同

```JAVA
if(is==true&&un==false){

        }
        if(is&&!un){
        //是一样的，熟练的人应该使用下面的方式，代码要精简易读！
        }
```

### 类型转换

因为Java是强类型的语言，所以有时候进行运算的时候，需要类型转换。

> 低 ------------------------------------> 高
>
>byte,short,char—> int —> long—> float —> double

类型转换满足的规则：

- 不能对boolean类型进行类型转换
- 不能把对象类型转换成不相关类的对象
- 在把容量大的类型转换为容量小的类型时必须使用强制类型转换。
- 转换过程中可能导致溢出或损失精度
- 浮点数到整数的转换是通过舍弃小数得到，而不是四舍五入

### 自动类型转换

自动类型转换：容量小的数据类型可以自动转换为容量大的数据类型

byte,short,char是直接转换成int类型进行运算的

### 强制类型转换

```java
public static void main(String[]args){
        double x=3.14;
        int nx=(int)x; //值为3 
        char c='a';
        int d=c+1;
        System.out.println(d); //98 
        System.out.println((char)d); //b 
        }
```

### java的switch参数与case匹配规则的本质

switch语句中的执行过程是，表达式里面的值可以直接匹配到case里面的值，因为编译器有一套算法，这也是switch语句执行起来高效的原因。

编译器对switch语句有两套算法，

第一种情况，如果case里面的值都是比较接近的。

例如是这样的代码：

```java
    switch（num）{

        case 1:

        执行语句；

        break;

        case 2:

        执行语句；

        break；

        ......

        }
```

编译器会把case值装到一个类似数组的容器里，然后通过索引直接找到具体的值。数组遍历是不用挨个遍历的，通过索引可以锁定具体的值。

第二种情况，case里面的值间距比较大，比如第一个case里面的值是1，第二个case里面的值是2，第三个case里面的值是1000，这会儿编译器的算法是通过二分查找法，来找到具体case值。

## 方法参数传递机制：值传递

```shell
基本类型的参数传输存储的：数据值
引用类型的参数传输存储的：地址值
主要看变量中存储的是什么 基本类型就是在栈内存中的 而引用类型是在堆内存中的，变量存储的是对象的地址
```

```java
package day01;

//方法参数传递机制：值传递
//基本类型的参数传输存储的：数据值
//引用类型的参数传输存储的：地址值
//主要看变量中存储的是什么 基本类型就是在栈内存中的 而引用类型是在堆内存中的，变量存储的是对象的地址
public class D11_method {
    public static void main(String[] args) {
//        基本类型
        int num = 22;
        changeNum(num);//传递的是num的值：22
        System.out.println(num);
        System.out.println("----------------------------");
//        引用类型
        int[] arr = new int[]{11, 22, 33};
        System.out.println("地址为" + arr);
        change(arr);//传递的是地址值：[I@75b84c92
        System.out.println(arr[1]);//222
        System.out.println("地址为" + arr);

    }

    public static void changeNum(int num) {
        System.out.println(num);
        num = 222;
        System.out.println(num);
    }

    public static void change(int[] arr) {
        System.out.println("地址为" + arr);
        System.out.println(arr[1]);//22
        arr[1] = 222;
        System.out.println(arr[1]);//222
        System.out.println("地址为" + arr);

    }
}

```

