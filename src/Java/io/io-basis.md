---
# 这是文章的标题
title: 文件操作的奥秘
# 一个页面可以有多个分类
category:
  - Java文件
# 一个页面可以有多个标签
tag:
  - 文件操作
---
## 学习思路

1. 先要定位文件
   - File类可以定位文件：进行删除、获取文本本身信息等操作
   - **但是不能读写文件**
2. 读写文件数据
   - IO流技术可以对硬盘中的文件进行读写
3. 总体学习思路
   - 先学会使用File类定位文件以及操作文件本身
   - 然后学习IO流读写文件数据



# File类概述

- File类在包java.io.File下、代表操作系统的文件对象（文件、文件夹）
- File类提供了诸如：定位文件，获取文件本身的信息、删除文件、创建文件（文件夹）等功能。

| 方法                                     | 说明                                                  |
| ---------------------------------------- | ----------------------------------------------------- |
| public File (String pathname)            | 根据文件路径创建文件对象                              |
| public File (String parent,String child) | 从父路径名 字符串和 子路径 字符串 创建对象            |
| public File (File parent,String child)   | 根据父路径对应的文件对象和子路径名 字符串创建文件对象 |

```java
package com.memg;

import java.io.File;

/**
 * 学会创建File对象，定位操作系统的文件对象
 */
public class FileDemo1 {
    public static void main(String[] args) {
        //创建File对象
        File f = new File("/Users/red/Pictures/2022.03.01.10.14.jpg");
        long length = f.length();
        System.out.println(length);
        System.out.println(f.getName());
        //file创建对象，支持绝对路径，支持相对路径
        //相对路径：一般是定位我们模块中的文件
        File f2 = new File("src/data.txt");
        System.out.println(f2.length());

        //判断路径是否存在
        File f3 = new File("/Users/red/Downloads");
        System.out.println(f3.isDirectory());//判断文件夹是否存在
        System.out.println(f3.exists());//判断路径是否存在


    }
}

```



# File类常用API

## 判断文件类型、获取文件信息

| 方法                            | 说明                                     |
| ------------------------------- | ---------------------------------------- |
| public boolean isDirectory()    | 测试此抽象路径表示的是File是否问文件夹   |
| public boolean isFile()         | 测试此抽象路径表示的是File是否问文件     |
| public boolean exists()         | 测试此抽象路径表示的是File是否存在       |
| public String getAbsolutePath() | 返回此抽象路径名的**绝对路径**名字符串   |
| public String getPath()         | 将此抽象路径名装换为路径名字符串         |
| public String getName()         | 返回由此抽象路径名表示的文件或文件夹名称 |
| public long lastModified()      | 返回文件最后修改的时间毫秒值             |

```java
package com.memg;

import java.io.File;
import java.text.SimpleDateFormat;

public class FileDemo2 {
    public static void main(String[] args) {
        //1、绝对路径创建一个文件对象
        File file = new File("src/data.txt");
        //2、获取它的绝对路径
        System.out.println(file.getAbsolutePath());
        //3、获取文件定义的时候使用的路径
        System.out.println(file.getPath());
        //4、获取文件名称，带后缀
        System.out.println(file.getName());
        //5、获取文件大小：字节个数
        System.out.println(file.length());
        //6、获取文件最后修改时间；时间毫秒值
        long time = file.lastModified();
        System.out.println("最后修改时间："+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(time));//格式化时间
        //7、判断文件是文件还是文件夹
        System.out.println(file.isFile());
        System.out.println(file.isDirectory());

    }
}

```



## 创建文件、删除文件功能

### File创建文件的功能

| 方法                           | 说明                   |
| ------------------------------ | ---------------------- |
| public boolean createNewFile() | 创建一个新的空的文件夹 |
| public boolean mkdir()         | 只能创建一级文件夹     |
| public boolean mkdirs()        | 可以创建多级文件夹     |

### File类删除文件夹的功能

| 方法                    | 说明                                   |
| ----------------------- | -------------------------------------- |
| public boolean delete() | 删除由此抽象路径名表示的文件或空文件夹 |

- delete方法直接删除不走回收站；如果删除的是一个文件，且文件没有被占用则直接被删除
- delete方法默认只能**删除空文件夹**



```java
package com.memg;

import java.io.File;
import java.io.IOException;

/**
 * 学会创建File对象，定位操作系统的文件对象
 */
public class FileDemo3 {
    public static void main(String[] args) throws IOException {
        //创建File对象
        File f = new File("src/data.txt");
        //创建文件
        System.out.println(f.createNewFile());//已存在文件，返回false
        //
        File f2 = new File("src/data2.txt");
        System.out.println(f2.createNewFile());//创建文件几乎不用，因为后面文件都是自动创建的，IO流写文件自动创建

        //mkdir 创建一级目录
        File file = new File("/Users/humeng/aaa");
        //System.out.println(file.mkdir());

        //mkdirs创建多级目录
        //File file1 = new File("/Users/humeng/aaa/bbb/ccc");
        //System.out.println(file1.mkdirs());

        //删除,只能删除空文件夹或文件
        System.out.println("--------");
        System.out.println(f2.delete());
        System.out.println(file.delete());
        
        File f3 = new File("/Users/humeng/aaa");
        System.out.println(f3.delete());


    }
}

```



## 遍历文件夹

| 方法                           | 说明                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------- |
| public String[] list()         | 获取当前目录下的所有的”一级文件夹名称“到一个字符串数组中去返回               |
| public File[] listFile()  常用 | 获取当前目录下的所有的”一级文件夹**对象**“到一个文件对象数组中去返回（重点） |



### 注意事项

- 当调用者不存在时，返回null
- 当调用者是一个文件时，返回null
- 当调用者是一个空文件夹时，返回一个长度为0的数组
- 当调用者是一个有内容的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回
- 当调用者是一个有隐藏文件的文件夹时，将里面的所有文件和文件夹的路径放在File数组中返回，包含隐藏内容
- 当调用者是一个需要权限才能进入的文件夹时，返回null

```java
package com.memg;

import java.io.File;

public class FileDemo4 {
    public static void main(String[] args) {
        File file = new File("/Users/humeng/Pictures");
        String[] names = file.list();
        for (String name : names) {
            System.out.println(name);
        }

        File[] files = file.listFiles();
        for (File file1 : files) {
            System.out.println(file1.getAbsolutePath());
//            file1.delete();会删除照片下的一级文件对象的，不要打开！！
        }
    }
}

```



# 方法递归

## 递归的形式和特点

什么是方法递归？

- 方法直接调用自己或者简介调用自己的形式成为方法递归（recursion）
- 递归作为一种<u>算法</u>在<u>程序设计语言</u>中广泛应用

## 递归的形式

- 直接递归：方法自己调用自己
- 简介递归：方法调用其他方法，其他方法又回调方法自己

## 方法递归存在的问题

- 递归如果没有控制好终止，会出现递归死循环，导致栈内存溢出现象

- ```java
  package com.recursion;
  
  public class RecursionDemo1 {
      public static void main(String[] args) {
          test();
      }
      public static void test(){
          System.out.println("=========test被执行========");
          test();//方法递归 直接递归形式
      }
  }
  
  ```

- ```java
  package com.recursion;
  
  public class RecursionDemo1 {
      public static void main(String[] args) {
          test2();
      }
      public static void test2(){
          System.out.println("=========test2被执行========");
          test3();//方法递归 间接递归形式
      }
      public static void test3(){
          System.out.println("=========test3被执行========");
          test2();//方法递归 间接递归形式
      }
  }
  
  ```

## 递归的算法流程、核心要素

### 案例：计算1 - n的阶乘

```java
package com.recursion;

/**
 * 递归算法
 */
public class Demo2 {
    public static void main(String[] args) {
        System.out.println(f(5));
    }
    public static int f(int n){
        if (n == 1){
            return 1;
        }else {
            return f(n-1) * n;
        }
    }
}

```

### 递归算法三要素大体可以总结为：

- 递归的公式：f(n) = f(n-1) * n;
- 递归的终点：f(1);
- 递归的方向必须走向终结点

### 案例：计算1-n的和

f(n) = 1+2+3+4+5+...+(n-1)+n;

那么这个公式就等价于：f(n)=f(n-1)+n;

终结点：f(1) = 1;

```java
package com.recursion;

public class Demo3 {
    public static void main(String[] args) {
        System.out.println(f(100));
    }
    public static int f(int n){
        if (n == 1){
            return 1;
        }else {
            return f(n-1) + n;
        }
    }
}

```

### 案例：猴子吃桃问题（经典问题）

```java
package com.recursion;

/**
 * 公式：
 * 第x天的桃子吃掉二分之一再吃掉一个 = 下一天的桃子
 * f(x) - f(x)/2 - 1 = f(x+1)
 * 2f(x) - f(x) -2 = 2f(x+1)
 * f(x) = 2f(x+1) + 2
 *
 * f(1) = ?
 * 终结点：f(10) = 1;
 *
 */
public class Demo4 {
    public static void main(String[] args) {
        System.out.println(f(1));

    }
    public static int f(int x){
        if (x == 10){
            return 1;
        }else {
            return 2*f(x+1)+2;
        }
    }
}

```

## 非规律化递归案例-文件搜索

### 案例：文件搜索

1. 先定位出的应该是一级文件对象
1. 遍历全部一级文件对象，判断是否是文件
1. 如果是文件，判断是否是自己想要的
1. 如果是文件夹，需要继续递归进去重复上述过程

```java
package com.recursion;

import java.io.File;

/**
 * 去humeng中搜索"Java入门.md"文件
 */
public class Demo5 {
    public static void main(String[] args) {
        File file = new File("/Users/humeng");
        searchFile(file,"Java入门.md");
    }

    /**
     * 搜索某个目录下的全部文件，找到我们想要的文件
     * @param dir 被搜索的原目录
     * @param fileName 被搜索的文件名称
     */
    public static void searchFile(File dir,String fileName){
        //3、判断dir是否是目录
        if (dir != null && dir.isDirectory()){
            //4、提取当前目录下的一级文件对象
            File[] files = dir.listFiles();
            //5、判断是否存在一级文件对象，存在才可以遍历
            if (files != null && files.length > 0){
                //6、遍历一级文件夹
                for (File file : files) {
                    //7、如果是文件
                    if (file.isFile()){
                        //8、判断文件名是否一样
                        if (file.getName().contains(fileName)){
                            //9、找到文件
                            System.out.println("查找到了"+file.getAbsolutePath());

                        }
                    }else {
                        //是文件夹，需要继续递归寻找
                        searchFile(file,fileName);

                    }
                }
            }
        }

    }

}

```



# 字符集

## 常见字符集

### 字符集基础知识

- 计算机底层不可以直接存储字符的，计算机中底层只能存储二进制（0、1）
- 二进制是可以转换成十进制的
- 结论：计算机底层可以表示十进制编号，计算机可以给人类字符进行编号存储，这套编号规则就是字符集

### ASCII字符集

- ASCII：包括了数字、英文、符号
- ASCII使用1个字节存储一个字符，一个字节是8位（2的8次方），总共可以表示256个字符信息，对于英文，数字来说是够用的。

### GBK：

- window系统默认的码表。兼容ASCII码表，也包含了几万个汉字，并支持繁体汉字以及部分日韩文字。
- 注意：GBK是中国的码表，一个中文以两个字节（16位，2的16次方）的形式存储。但不包含世界上所有国家的文字。

### Unicode码表

- Unicode是计算机科学领域里的一项业界字符编码标准
- 容纳世界上大多数国家的所有常见文字和符号
- Unicode会先通过UTF-8，UTF-16，以及UTF-32的编码成二进制后再存储到计算机，其中最常见的是UTF-8

注意：

- Unicode是万国码，以UTF-8编码后一个中文一般以三个字节的形式存储
- UTF-8也要兼容ASCII编码表
- 技术人员都应该使用UTF-8的字符集编码
- 编码前和编码后的字符集需要一致，否则会出现中文乱码

### 总结

- 英文和数字等在任何国家的字符集中都占1个字节
- GBK字符中一个中文字符占2个字节
- UTF-8编码中一个中文占3个字节
- 编码前和编码后的字符集必须一致，否则乱码
- 英文和数组在任何国家的编码中都不会乱码

## 字符集的编码、解码

```java
package com.recursion;


import java.util.Arrays;

public class Demo6 {
    public static void main(String[] args) throws Exception {
        String name = "小胡";
        byte[] bytes = name.getBytes();//以当前代码的默认字符集进行编码
        System.out.println(Arrays.toString(bytes));

        //解码
        String s = new String(bytes);
        System.out.println(s);
    }
}

```



# IO流（一）

## IO流概述

- I表示input，是数据从硬盘文件读入到内存的过程，称之为输入，负责读
- O表示output，是内存程序的数据从内存写出到硬盘文件的过程，称之输出，负责写

## IO流的分类

- 按照流的方向分：IO流分为输入流和输出流
- 按照流中的数据最小单位分：IO流分为字节流（音视频）和字符流（字符文件）

## 总结流的四大类

- 字节输入流
- 字节输出流
- 字符输入流
- 字符输出流

![image-20220810150205017](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101502126.png)

![image-20220810150254975](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101502012.png)





## 字节流的使用

### 文件字节输入流

![image-20220810150344088](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101503140.png)



#### 每次读取一个字节

作用：以内存为基准，把磁盘文件中的数据以字节的形式读取到内存中去

| 构造器                                  | 说明                               |
| --------------------------------------- | ---------------------------------- |
| public FileInputStream(File file)       | 创建字节输入流管道与源文件对象接通 |
| public FileInputStream(String pathname) | 创建字节输入流管道与源文件路径接通 |

| 方法名称                       | 说明                                                   |
| ------------------------------ | ------------------------------------------------------ |
| public int read()              | 每次读取一个字节返回，如果字节已经没有可读的返回-1     |
| public int read(byte[] buffer) | 每次读取一个字节数组返回，如果字节已经没有可读的返回-1 |

```java
package com.io;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

public class Demo1 {
    public static void main(String[] args) throws Exception {
        //1、创建一个文件字节输入流 管道 与源文件接通
        InputStream fileInputStream = new FileInputStream("src/data.txt");
        //2、读取一个字节返回（每次读一滴水）
//        int read = fileInputStream.read();//读取一个字节，int是4个字节，所以读取中文也可以（中文UTF-8占3个字节）
//        System.out.println((char) read);//a
//
//        int read1 = fileInputStream.read();
//        System.out.println((char) read1);//b
//
//        int read2 = fileInputStream.read();//c
//        System.out.println((char) read2);
//
//        int read3 = fileInputStream.read();//读取完毕返回：-1
//        System.out.println((char) read3);

        //3、使用循环读
        //定义一个变量，每次读取一个字节,但是中文是三个字节，所以永远无法避免中文乱码问题
//        int b;
//        while (( b = fileInputStream.read() ) != -1){
//            System.out.print((char) b);
//        }

    }
}

```

#### 每次读取一个字节数组

作用：以内存为基准，把磁盘文件中的数据以字节的形式读取到内存中去

```java
package com.io;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Arrays;

/**
 * 使用文件字节输入流每次读取一个字节数组数据
 */
public class Demo2 {
    public static void main(String[] args) throws Exception {
        //1、创建一个文件字节输入流管道与源文件接通
        InputStream fileInputStream = new FileInputStream("src/data.txt");
        //2、定义一个字节数组(桶），读取数据，注意：字节数据都是装在buffer桶中的！！！！！！！！！！
//        byte[] buffer = new byte[3];//3B(三个字节的桶）buffer:[0,0,0]
//
//        int read = fileInputStream.read(buffer);//   buffer:[97, 98, 99]
//        System.out.println("读了几个字节"+read);//     read:3
//        String s = new String(buffer);//             对buffer桶进行解码
//        System.out.println(s);//                     buffer:[97, 98, 99]  ——>[a,b,c]
//
//        int read1 = fileInputStream.read(buffer);//   buffer:[97, 98, 99]
//        System.out.println("读了几个字节"+read1);//     read:3
//        String s1 = new String(buffer);//             对buffer桶进行解码
//        System.out.println(s1);//                     buffer:[97, 98, 99]  ——>[a,b,c]
//
////        int read2 = fileInputStream.read(buffer);//   buffer:[99, 100, 99]
////        System.out.println("读了几个字节"+ read2);//     read:3
////        String s2 = new String(buffer);//             对buffer桶进行解码
////        System.out.println(s2);//                     buffer:[99, 100, 99]  ——>[c,d,c]:为什么最后只有两滴水，却还是三滴水？
////                                                                                    // 因为是前面的桶中剩余的水是[a,b,c],
////                                                                                    //而这桶水只有两滴水[c,d],但是上一桶水最后一个位置还有一滴水c,所以[c,d,c]
//
//        int read2 = fileInputStream.read(buffer);//   buffer:[99, 100, 99]
//        System.out.println("读了几个字节"+ read2);//     read:3
//        String s2 = new String(buffer,0,read2);//             对buffer桶进行解码,从0(桶的底部开始),到读了几个字节read2
//        System.out.println(s2);//                     buffer:[99, 100]  ——>[c,d]
//
//
//        int read3 = fileInputStream.read(buffer);
//        System.out.println("读取完毕"+read3);

        //3、使用循环
        /**
         * 注意：依然无法避免乱码
         * 文本内容：abc abc cd
         * 定义一个只能装3滴水的桶
         * 定义len记录每次读取的字节数
         * 使用while循环：每次读取的字节数不等于-1（也就是没有读取完）就进入while循环体：
         * 使用String的一个解码构造器：new String(buffer,0,len)；
         * 这个buffer是桶中的字节数据，0是从第0滴水开始，len是到第几滴水结束（有几滴水就读几滴水，不要读多，否则会出现上一桶水的残留）
         */
        byte[] buffer = new byte[3];
        int len;//记录每次读取的字节数
        while ( ( len = fileInputStream.read(buffer) ) != -1){
            //读多少倒多少！！！这个String的API非常重要！！
            System.out.print(new String(buffer,0,len));
        }
    }
}

```



#### 一次读取完全部字节（避免乱码）

- 定义一个与文件大小一样的字节数组，一次性读取完文件的全部字节
- 如果文件过大会引起内存溢出（例如一个16GB的内存去读一个100GB的文件，就会造成内存溢出）

```java
package com.io;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * 使用文件字节输入流一次读取字节数组数据
 */
public class Demo3 {
    public static void main(String[] args) throws Exception {
        //1、创建一个文件字节输入流管道与源文件接通
        File file = new File("src/data1.txt");
        InputStream fileInputStream = new FileInputStream(file);

        //2、定义一个字节数组，与文件大小一样大
        //自己实现
//        long length = file.length();//获取文件大小
//        byte[] buffer = new byte[(int) length];//定义一个和文件大小相同的桶buffer
//        int len = fileInputStream.read(buffer);//读取桶这么大小的文件返回字节的长度
//        System.out.println("读取了多少个字节"+len);//字节长度
//        System.out.println("文件大小"+length);//文件大小 = 字节长度
//        String s = new String(buffer);//字节解码
//        System.out.println(s);

        //JDK9 提供的API
        byte[] bytes = fileInputStream.readAllBytes();
        System.out.println(new String(bytes));

    }
}

```



### 文件字节输出流

![image-20220810154117721](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101541849.png)



```java
package com.io;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class Demo4 {
    public static void main(String[] args) throws Exception {
        //1、创建一个文件字节输出流管道与目标文件接通
//        OutputStream outputStream = new FileOutputStream("src/data2.txt");//先清空之前的数据，写入新数据
        OutputStream outputStream = new FileOutputStream("src/data2.txt",true);//true:追加数据


        //2、写入数据
        outputStream.write('a');
        outputStream.write(98);
        outputStream.write("\r\n".getBytes(StandardCharsets.UTF_8));
//        outputStream.write('胡');
        //写数据一定要刷新数据！！

        //写一个字节数组出去
        byte[] buffer = {98,'a',99};
        outputStream.write(buffer);
        outputStream.write("\r\n".getBytes(StandardCharsets.UTF_8));

        //写中文
        byte[] buffer2 = "我是中国人".getBytes();
        outputStream.write(buffer2);
        outputStream.write("\r\n".getBytes(StandardCharsets.UTF_8));

        //写一个字节数组的一部分
        byte[] buffer3 = {98,'a',99,100};
        outputStream.write(buffer3,0,3);
        outputStream.write("\r\n".getBytes(StandardCharsets.UTF_8));

//        outputStream.flush();
        outputStream.close();//释放资源，包含了刷新，关闭后流就不能使用了
    }
}

```



### 文件拷贝

![image-20220810155021245](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101550283.png)



```java
package com.io;

import java.io.*;

/**
 * 学会使用字节流完成文件的复制（支持一切文件）
 */
public class CopyDemo5 {
    public static void main(String[] args) {
        try {
            //1、创建字节输入流管道与原图片接通
            InputStream fileInputStream = new FileInputStream("/Users/humeng/Pictures/2022.03.01.10.14.jpg");
            //2、创建字节输出流与目标文件接通
            OutputStream fileOutputStream = new FileOutputStream("/Users/humeng/Pictures/new.jpg");
            //3、定义一个字节数组，来转移数据
            byte[] buffer = new byte[1024];
            int len;
            while ((len = fileInputStream.read(buffer)) != -1){
                fileOutputStream.write(buffer,0,len);//读多少，倒多少
            }
            System.out.println("copy success");
            //关闭流
            fileOutputStream.close();
            fileInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

![image-20220810155059730](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101550760.png)



## 资源释放的方式

### try-catch-finally

- finally :在异常处理的时候提供finally块来执行所有清除操作，比如说IO流中的资源释放
- 特点：被finally控制的语句最终一定会被执行，除非JVM退出
- 异常处理标准格式：try...catch...finally

```java
package com.io;

import java.io.*;

/**
 * 学会使用字节流完成文件的复制（支持一切文件）
 */
public class Demo6 {
    public static void main(String[] args) {
        InputStream fileInputStream = null;
        OutputStream fileOutputStream = null;
        try {

            //1、创建字节输入流管道与原图片接通
            fileInputStream = new FileInputStream("/Users/humeng/Pictures/2022.03.01.10.14.jpg");
            //2、创建字节输出流与目标文件接通
            fileOutputStream = new FileOutputStream("/Users/humeng/Pictures/new.jpg");
            //3、定义一个字节数组，来转移数据
            byte[] buffer = new byte[1024];
            int len;
            while ((len = fileInputStream.read(buffer)) != -1){
                fileOutputStream.write(buffer,0,len);//读多少，倒多少
            }
            System.out.println("copy success");

        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            //关闭流
            try {
                if (fileOutputStream != null)fileOutputStream.close();//防止还没有创建流对象的时候就出现异常出现空指针异常
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (fileInputStream != null)fileInputStream.close();//防止还没有创建流对象的时候就出现异常出现空指针异常
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}

```



### try-with-resource

资源就是实现了AutoCloseable接口的对象

![image-20220810155503910](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101555948.png)

![image-20220810155531840](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101555897.png)



```java
package com.io;

import java.io.*;

/**
 * 学会使用字节流完成文件的复制（支持一切文件）
 */
public class Demo7 {
    public static void main(String[] args) {

        try(
                //这里只能放置资源对象，用完会自动关闭，自动调用资源对象的close方法关闭资源
                //1、创建字节输入流管道与原图片接通
                InputStream fileInputStream = new FileInputStream("/Users/humeng/Pictures/2022.03.01.10.14.jpg");
                //2、创建字节输出流与目标文件接通
                OutputStream fileOutputStream = new FileOutputStream("/Users/humeng/Pictures/new.jpg");
                ) {
            //3、定义一个字节数组，来转移数据
            byte[] buffer = new byte[1024];
            int len;
            while ((len = fileInputStream.read(buffer)) != -1){
                fileOutputStream.write(buffer,0,len);//读多少，倒多少
            }
            System.out.println("copy success");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```



# 字符流

## 一次读取一个字符

![image-20220810155828636](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101558688.png)

![image-20220810160313348](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101603394.png)



- 因为字节流读取中文会出现乱码或者内存溢出
- 读取中文输入使用字符流更合适，最小单位是按照单个字符读取的

```java
package com.io;

import java.io.FileReader;
import java.io.Reader;

public class ReadDemo1 {
    public static void main(String[] args) throws Exception {
        //1、创建一个字符输入流管道与文件接通
        Reader fileReader = new FileReader("src/data2.txt");
        //2、读取一个字符返回，如果没有可读的字符返回-1
//        int code = fileReader.read();
//        System.out.println((char) code);

        //3、使用循环读取字符
        int code;
        while((code = fileReader.read()) != -1){
            System.out.print((char) code);
        }


    }
}

```



## 一次读取一个字符数组

```java
package com.io;

import java.io.FileReader;
import java.io.Reader;

public class ReadDemo2 {
    public static void main(String[] args) throws Exception {
        //1、创建一个字符输入流管道与文件接通
        Reader fileReader = new FileReader("src/data2.txt");
        char[] buffer = new char[1024];//1kb
        int len;
        while ((len = fileReader.read(buffer))!=-1){
            String s = new String(buffer, 0, len);
            System.out.print(s);
        }


    }
}

```



## 文件字符输入流

![image-20220810160819067](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101608117.png)



```java
package com.io;

import java.io.FileWriter;
import java.io.Writer;

public class WriterDemo {
    public static void main(String[] args) throws Exception {
        Writer fileWriter = new FileWriter("src/data1.txt",true);
        fileWriter.write(99);
        fileWriter.write('\n');
        fileWriter.write("小胡");
        char[] buffer = "我们的".toCharArray();
        fileWriter.write(buffer);

        fileWriter.write("abc我是中国人",0,3);//abc
        
        fileWriter.close();
    }
}

```



![image-20220810161002221](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101610266.png)





# IO流（二）

## 缓冲流

### 缓冲流概述

- 缓冲流也称为高效流、或者高级流。之前学习的字节流可以称为原始流
- 作用：**缓冲流自带缓冲区、可以提高原始字节流、字符流读写数据的性能**

![image-20220810161245496](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101612563.png)

![image-20220810161337830](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101613922.png)





### 字节缓冲流

![image-20220810161510193](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101615258.png)



- 字节缓冲输入流：BufferedInputStream,提高字节输入流读取数据的性能，读写功能上并无变化
- 字节缓冲输出流：BufferedOutputStream，提高字节输出流写数据的性能，读写功能上并无变化

| 构造器                                       | 说明                                                                                     |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| public BufferedInputStream (InputStream is)  | 可以把低级的字节输入流包装成一个高级的缓冲字节输入流管道，从而提高字节输入流读数据的性能 |
| public BufferedOutputStream(OutputStrean os) | 可以把低级的字节输出流包装成一个高级的缓冲字节输出流管道，从而提高字节输出流写数据的性能 |

```java
package com.io2;

import java.io.*;

public class Demo1 {
    public static void main(String[] args) {
        try (
                //创建字节输入流管道
                InputStream is = new FileInputStream("src/data2.txt");
                //把原始的字节输入流管道包装成高级的缓冲字节输入流
                InputStream bis = new BufferedInputStream(is);
                //创建字节输出流管道
                OutputStream os = new FileOutputStream("src/data3.txt");
                OutputStream bos = new BufferedOutputStream(os)

        ) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }
            System.out.println("完成了复制");
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
}

```



### 字符缓冲流

输入流

![image-20220810162655785](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101626837.png)



```java
package com.io2;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.Reader;

/**
 * 经典代码：按照行读
 */
public class BufferedReaderDemo1 {
    public static void main(String[] args) {
        try (
                Reader fr = new FileReader("src/data2.txt");
                //把低级的字符输入流包装成高级的字符缓冲输入流
                BufferedReader br = new BufferedReader(fr);

        ) {
//            char[] buffer = new char[1024];
//            int len;
//            while ((len = fr.read(buffer)) != -1) {
//                String s = new String(buffer, 0, len);
//                System.out.println(s);
//            }
//            System.out.println(br.readLine());
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```



输出流

![image-20220810162924092](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101629149.png)



```java
package com.io2;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.Writer;

public class Demo2 {
    public static void main(String[] args) throws Exception {
        Writer fw = new FileWriter("src/data1.txt", true);
        BufferedWriter bw = new BufferedWriter(fw);
        bw.write(99);
        bw.newLine();//换行
        bw.write('\n');
        bw.write("小胡");
        char[] buffer = "我们的".toCharArray();
        bw.write(buffer);
        bw.newLine();//换行

        bw.write("abc我是中国人", 0, 3);//abc

        bw.close();
    }
}

```

![image-20220810164319416](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101643462.png)

## 对象序列化和反序列化

![image-20220810164659455](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101646501.png)



<img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101646985.png" alt="image-20220810164628940" style="zoom:50%;" />

![image-20220810165525879](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101655961.png)

注意：

1. 对象如果要序列化必须要实现Serializable接口
2. transient修饰的成员变量不参与序列化，可以防止敏感信息暴露
3. ``` private static final long serialVersionUID = 1;```申请序列化的版本号，序列化的版本号必须和反序列化的版本号必须一致才不会出错

```java
package day05;

import java.io.Serializable;

/**
 * 对象如果要序列化必须要实现Serializable接口
 */
public class Student implements Serializable {
    //    申请序列化的版本号
    //    序列化的版本号必须和反序列化的版本号必须一致才不会出错
    private static final long serialVersionUID = 1;
    
    private String name;
    //    transient修饰的成员变量不参与序列化，可以防止敏感信息暴露
    private transient Integer age;
    private Character gender;

    public Student() {
    }

    public Student(String name, Integer age, Character gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Character getGender() {
        return gender;
    }

    public void setGender(Character gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                '}';
    }
}

```

```java
package day05;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

/**
 * 对象序列化
 */
public class Demo4 {
    public static void main(String[] args) throws Exception {
//        创建对象
        Student student = new Student("小张", 20, '男');

//        创建普通字节输出流
        FileOutputStream os = new FileOutputStream("src/obj.txt");
//        对象序列化:创建对象字节输出流
        ObjectOutputStream oos = new ObjectOutputStream(os);
        oos.writeObject(student);
        oos.close();
        os.close();

    }
}

```

最终输出的对象序列化文件(并不是乱码而是java的一种存储机制)

```
���sr�
day05.Student���c>;�L�aget�Ljava/lang/Integer;L�gendert�Ljava/lang/Character;L�namet�Ljava/lang/String;xpsr�java.lang.Integer⠤���8�I�valuexr�java.lang.Number��������xp���sr�java.lang.Character4�G�k&x�C�valuexpu7t�小张
```

![image-20220810165721366](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101657453.png)

![image-20220810170015030](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101700094.png)

```java
package day05;

import java.io.FileInputStream;
import java.io.ObjectInputStream;

/**
 * 对象的反序列化
 */
public class Demo5 {
    public static void main(String[] args) throws Exception {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("src/obj.txt"));
        Student student = (Student) ois.readObject();
        System.out.println(student);
    }
}

```

```
Student{name='小张', age=null, gender=男}
```

## 打印流

- 作用：打印流可以实现方便、高效的打印数据到文件中去。打印流一般是指：PrintStream,和PrintWriter两个类
- 可以实现打印什么就是什么数据，例如打印整数97写出去就是97，打印boolean的true，写出去就是true



### PrintStream、PrintWriter

![image-20220810171121584](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101711649.png)



| 构造器                              | 说明                         |
| ----------------------------------- | ---------------------------- |
| public PrintStream(OutputStream os) | 打印流直接通向字节输出流管道 |
| public PrintStream(File f)          | 打印流直接通向文件对象       |
| public PrintStream(String filepath) | 打印流直接通向文件路径       |

| 方法                      | 说明                   |
| ------------------------- | ---------------------- |
| public void print(Xxx xx) | 打印任意类型的数据出去 |

```java
package com.printStream;

import java.io.FileOutputStream;
import java.io.PrintStream;

public class PrintDemo1 {
    public static void main(String[] args) throws Exception {
        //1、创建一个打印流对象
        PrintStream ps = new PrintStream(new FileOutputStream("src/data4.txt", true));
//        PrintWriter ps = new PrintWriter("src/data4.txt");//打印功能与PrintStream的使用没有区别

        //2、打印
        ps.println(97);
        ps.println('a');
        ps.println(true);
        ps.println("xiaohu");
        ps.println("我是打印流输出的，我是啥就打印啥");

        ps.close();
    }
}

```

![image-20220810171331840](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101713892.png)

![image-20220810171606026](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101716096.png)

## Properties

![image-20220810173917264](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101739338.png)

![image-20220810174009175](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101740216.png)

```java
package day05;

import java.io.FileWriter;
import java.util.Properties;


public class Demo6 {
    public static void main(String[] args) throws Exception {
        Properties properties = new Properties();
        properties.setProperty("admin", "root");
        properties.setProperty("password", "123456");
//        System.out.println(properties);
        /**
         * 参数一：保存管道
         * 参数二：保存心得注释
         */
        properties.store(new FileWriter("src/application.properties"), "this is user");
    }
}

```

```java
package day05;

import java.io.FileReader;
import java.util.Properties;

public class Demo7 {
    public static void main(String[] args) throws Exception {
        Properties properties = new Properties();
        System.out.println(properties);
        properties.load(new FileReader("src/application.properties"));
        System.out.println(properties);
        String admin = properties.getProperty("admin");
        System.out.println(admin);
    }
}

```



# IO框架

## commons-io

- commons-io是Apache开源基金组织提供的一组有关IO操作的类库，可以提高IO功能开发效率
- 官网：https://commons.apache.org/proper/commons-io/
- commons-io工具包提供了很多io操作的类。有两个主要的类FileUtils、IOUtils



### FileUtils主要方法如下：

| 方法                                                    | 说明                         |
| ------------------------------------------------------- | ---------------------------- |
| String readFileToString(File file,String encoding)      | 读取文件中的数据，返回字符串 |
| void copyFile(File srcFile,File destFile)               | 复制文件                     |
| void copyDirectoryToDirectory(File srcDir,File destDir) | 复制文件夹                   |

<img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101751054.png" alt="image-20220810175104000" style="zoom:50%;" />



```java
package com.io3;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

public class IODemo1 {
    public static void main(String[] args) throws Exception {
        //完成文件拷贝
        IOUtils.copy(new FileInputStream("/Users/humeng/Pictures/IMG_8484(20220301-105418).JPG"),
                new FileOutputStream("/Users/humeng/Pictures/new2.JPG"));
        //完成文件夹复制到某个文件夹下
        FileUtils.copyDirectoryToDirectory(new File("/Users/humeng/Gitee"), new File("/Users/humeng/Gitee2"));
        //删除文件夹
        FileUtils.deleteDirectory(new File("/Users/humeng/Gitee2"));


    }
}

```















