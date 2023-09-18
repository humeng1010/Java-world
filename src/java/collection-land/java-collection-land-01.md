---
title: 集合
order: 1
---




## 集合概述

集合和数组都是容器。



数组的特点：

- 数组定义完成并启动后，类型确定，长度固定。
- 进行增删操作的时候，数组是不太合适的，增删数据都需要放弃原有的数组或者位移。



集合是Java中存储对象数据的一种容器

集合的特点：

- 集合大小不固定，启动后可以动态变化，类型也可以选择不固定。集合更想一个气球。
- 集合非常适合做元素增删操作。
- 注意：集合只能存储引用类型的数据，如果要存储基本数据类型的数据可以选用包装类。

![image-20220809155725450](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091557544.png)





## Collection集合的体系特点

### 集合类体系结构

![image-20220809155829876](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091558907.png)



集合分为Collection（单列）和Map（双列）

- Collection单例集合，每个元素（数据）只包含一个值
- Map双列集合，每个元素包含两个值（键值对：key : value）

首先我们先了解单列集合

### Collection集合体系

Collection集合是一个接口，是单列集合的祖宗类。

Collection又分了一个List接口和Set接口。

List下有ArrayList和LinkedList两个常用的实现类。

Set下有HashSet和TreeSet常用实现类。

HashSet下有LinkedHashSet实现类。

![image-20220809161431474](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091614526.png)



#### Collection集合的特点

##### List系列集合：添加元素是有序的、可重复的、有索引。

- ArrayList、LinkedList：有序、可重复、有索引

##### Set系列集合：添加元素是无序的、不重复、无索引。

- HashSet：无序、不重复、无索引；LinkedHashSet：有序、不重复、无索引

  ```java
  package com.meng.collection;
  
  import java.util.ArrayList;
  import java.util.Arrays;
  import java.util.Collection;
  import java.util.HashSet;
  
  /**
   * 明确Collection集合体系的特点
   */
  public class CollectionDemo1 {
      public static void main(String[] args) {
          //List 有序、可重复、有索引
          Collection list = new ArrayList();
          list.add("java");
          list.add(123);
          list.add(true);
          list.add("java");
          list.add(123);
          list.add(true);
          System.out.print("List:");//有序、可重复、有索引 :[java, 123, true, java, 123, true]
          System.out.println(list);//可以直接打印出内容，说明重写了toString方法
          //Object[] array = list.toArray(); toArray方法可以把集合转换成数组
          //System.out.println(Arrays.toString(array));  调用Arrays类的toString方法快速打印出数组
  
          //Set 无序 不重复 无索引
          Collection hashSet = new HashSet();
          hashSet.add("java");
          hashSet.add(123);
          hashSet.add(true);
          hashSet.add("java");
          hashSet.add(123);
          hashSet.add(true);
          System.out.print("Set:");
          System.out.println(hashSet);// 无序、不重复、无索引：[java, 123, true]
  
  
      }
  }
  
  ```

#### 集合对泛型的支持

集合都是支持泛型的，所谓泛型就是类，八种基本数据类型必须用他们的包装类（例如Integer，Double，Boolean...)，集合添加泛型可以在编译阶段约束集合只能操作某种数据类型。

```java
package com.meng.collection;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

/**
 * 明确Collection集合体系的特点
 */
public class CollectionDemo1 {
    public static void main(String[] args) {
        //List 有序、可重复、有索引
        Collection list = new ArrayList();
        list.add("java");
        list.add(123);
        list.add(true);
        list.add("java");
        list.add(123);
        list.add(true);
        System.out.print("List:");//有序、可重复、有索引 :[java, 123, true, java, 123, true]
        System.out.println(list);//可以直接打印出内容，说明重写了toString方法
        //Object[] array = list.toArray(); toArray方法可以把集合转换成数组
        //System.out.println(Arrays.toString(array));  调用Arrays类的toString方法快速打印出数组

        //Set 无序 不重复 无索引
        Collection hashSet = new HashSet();
        hashSet.add("java");
        hashSet.add(123);
        hashSet.add(true);
        hashSet.add("java");
        hashSet.add(123);
        hashSet.add(true);
        System.out.print("Set:");
        System.out.println(hashSet);// 无序、不重复、无索引：[java, 123, true]

        System.out.println("----------分割线-----------");
        //集合对泛型的支持,不支持基本数据类型
        Collection<String> list1 = new ArrayList<>();
        list1.add("java");
//        list1.add(1);编译阶段报错

        Collection<Integer> integers = new ArrayList<>();
        integers.add(23);//这个时候23会自动装箱成为Integer对象
        System.out.println(integers);



    }
}

```



## Conllection API

Collection是单列集合的祖宗接口，它的功能是全部单列集合都可以继承使用。

#### Collection API :

| 方法名                            |                                  |
| --------------------------------- | -------------------------------- |
| public boolean add(E e)           | 把给定的对象添加到当前集合中     |
| public void clear()               | 清空当前集合中的所有元素         |
| public boolean remove(E e)        | 把给定的对象在当前集合中删除     |
| public boolean contains(Object o) | 判断当前集合中是否包含指定的对象 |
| public boolean isEmpty()          | 判断当前集合是否为空             |
| public int size()                 | 返回集合中的元素个数             |
| public Objetc[] toArray()         | 把集合中的元素，存储到数组中     |

```java
package com.meng.collection;

import com.sun.istack.internal.NotNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

public class CollectionDemo2 {
    public static void main(String[] args) {
        //多态，list调用的都是左边Collection中的方法
        Collection<String> list = new ArrayList<>();
        //1、添加元素
        list.add("Java");
        list.add("MySQL");
        list.add("Spring");
        list.add("Java");
        System.out.println(list);
        //2、清空元素
        //list.clear();清空所以的元素
        //3、判断集合是否为空，是空返回true，反之false
        System.out.println(list.isEmpty());//false
        //4、获取元素大小
        System.out.println(list.size());
        //5、判断集合中是否包含某个元素
        System.out.println(list.contains("Java"));
        System.out.println(list.contains("java"));//false 精确匹配
        //6、删除某个元素，如果有多个重复的元素，会默认删除第一个
        System.out.println(list.remove("java"));//false
        System.out.println(list);
        System.out.println(list.remove("Java"));//true
        System.out.println(list);
        //7、把集合转换为数组 这里转换为Object是因为，以后有一种技术可以强行向String的集合中添加其他的元素，所以转成了Object
        Object[] array = list.toArray();
        System.out.println(Arrays.toString(array));

        System.out.println("-------------拓展-----------");

        Collection<String> list2 = new ArrayList<>();
        list2.add("HTML");
        list2.add("CSS");
        list2.add("JS");
        list2.add("vue");

        list.addAll(list2);//把list2中的元素拷贝到list中
        System.out.println(list);


    }
}

```



## Collection集合常用的遍历

#### 迭代器遍历概述

遍历就是一个一个的把容器中的元素访问一遍。

迭代器在java中的代表是iterator，迭代器是集合专用的遍历方式

![image-20220809164400430](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091644495.png)



```java
package com.meng.collection;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

public class CollectionDemo3 {
    public static void main(String[] args) {
        //多态，list调用的都是左边Collection中的方法
        Collection<String> list = new ArrayList<>();
        //1、添加元素
        list.add("Java");
        list.add("MySQL");
        list.add("Spring");
        list.add("Java");
        System.out.println(list);

        //得到当前集合的迭代器对象
        Iterator<String> iterator = list.iterator();//定义这个的时候就会得到一个该集合的迭代器，在第一个位置！！！
//        System.out.println(iterator.next());//遍历第一个元素，选取元素后移位
//        System.out.println(iterator.next());//遍历第一个元素，选取元素后移位
//        System.out.println(iterator.next());//遍历第一个元素，选取元素后移位
//        System.out.println(iterator.next());//遍历第一个元素，选取元素后移位
//        System.out.println(iterator.next());//出现无此元素异常，越界！！

        //定义while循环
        while (iterator.hasNext()){//hasNext 问一问iterator里面该位置也没有元素，有元素就返回true并且移到下一个元素，反之false
            System.out.println(iterator.next());
        }


    }
}

```

迭代器的默认位置在第一个元素的位置（当前集合索引为0）

如果迭代器越界了会出现NoSuchElementException异常



#### foreach/增强for循环

增强for循环：既可以遍历集合也可以遍历数组

它是JDK5之后出现的，其内部原来是一个iterator迭代器，遍历集合相当于是迭代器的简化写法

实现iterator接口的类才可以使用迭代器和增强for，Collection接口已经实现了iterator接口

格式：

for(元素数据类型 变量名 : 数组或Collection集合){

​		//在此处使用变量名就是该元素

}

```java
package com.meng.collection;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class CollectionDemo4 {
    public static void main(String[] args) {
        //多态，list调用的都是左边Collection中的方法
        Collection<String> list = new ArrayList<>();
        //1、添加元素
        list.add("Java");
        list.add("MySQL");
        list.add("Spring");
        list.add("Java");
        System.out.println(list);

        //foreach
        for (String s : list) {
            System.out.println(s);
        }

        System.out.println("----------------");

        double[] scores = {100,99,59.5};
        for (double score : scores) {
            System.out.println(score);
        }
    }
}

```



#### Lambda 表达式



```java
package com.meng.collection;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.function.Consumer;

public class CollectionDemo5 {
    public static void main(String[] args) {
        //多态，list调用的都是左边Collection中的方法
        Collection<String> list = new ArrayList<>();
        //1、添加元素
        list.add("Java");
        list.add("MySQL");
        list.add("Spring");
        list.add("Java");
        System.out.println(list);

        //forEach
        list.forEach(new Consumer<String>() {
            @Override
            public void accept(String s) {
                System.out.println(s);
            }
        });

        //简化
        list.forEach(s -> {
            System.out.println(s);
        });
        //更简化
        list.forEach(System.out::println);




    }
}

```



## Collection集合存储自定义类型的对象

```java
package com.meng.collection;

import java.util.ArrayList;
import java.util.Collection;

public class CollectionDemo6 {
    public static void main(String[] args) {
        //定义一个电影类
        //定义一个集合对象存储电影
        Collection<Movie> movies = new ArrayList<>();
        movies.add(new Movie("唐人街探案1",9.8,"王宝强，刘昊然"));
        movies.add(new Movie("唐人街探案2",9.8,"王宝强，刘昊然"));
        movies.add(new Movie("唐人街探案3",9.8,"王宝强，刘昊然"));

        //遍历集合中的每一个元素
        for (Movie movie : movies) {
            System.out.println(movie);
        }
    }
}

```

注意：**集合中存储的是对象的地址**。

## 常见数据结构

- 数据结构概述、栈、队列
- 数组
- 链表
- 二叉树、二叉查找树
- 平衡二叉树
- 红黑树

### 数据结构概述

数据结构是计算机底层存储、组织数据的方式。是指数据相互之间是以什么方式排列在一起的。

通常情况下，精心选择的数据结构可以带来更高的运行或存储效率

### 栈

栈的特点：后进先出，先进后出（薯片桶类型的）

数据进入栈称为：进栈

数据离开栈称为：出栈

应用：游戏中手枪弹夹中的子弹威力的大小（例如第一枪可以打多少血量，第二枪打多少血量...）

![image-20220809172231598](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091722688.png)



### 队列

队列的特点：先进先出，后进后出（排队）

数据从后端进入队列称为：入队列

数据从前端离开队列称为：出队列

应用：医院或餐厅叫号系统

![image-20220809172259302](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091722378.png)



### 数组

特点：内存中的一段连续空间、查询速度快（根据索引） 、删除效率低（删除数据后，再把后面的数据一个一个移过来）、增加效率极低

![image-20220809172438463](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091724536.png)



### 链表

链表中的元素是在内存中不连续存储的，每个元素结点包含数据值和下一个元素的地址。

链表查询慢，无论查询哪个数据都要从头开始找。

增删比较快，只需要把链（数据指向的下一个的地址）给改一改就行了

单链表：只能向后查找

双链表：向前向后都可以查找

![image-20220809174949079](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091749160.png)

![image-20220809175052880](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091750948.png)



### 二叉树，二叉查找树

二叉树：就是包含一个父节点，一个父节点产生一个左节点和右节点，每个结点最多有两个结点。

二叉查找树：又称为二叉排序树或者二叉搜索树

![image-20220809175404361](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091754414.png)

### 平衡二叉树

优化二叉树可能出现的瘸子现象（一边非常长，一边很短）

![image-20220809175546477](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091755517.png)



![image-20220809175738079](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091757138.png)



平衡二叉树是在满足查找的二叉树的大小规则下，让树尽可能矮小，以此提高查找数据的性能。

平衡二叉树在添加元素后导致不平衡后：基本策略是进行左旋或者右旋，保证平衡。

推荐观看黑马视频解析：https://www.bilibili.com/video/BV1Cv411372m?p=130&t=1826.1

### 红黑树

基于红黑规则实现了自平衡的排序二叉树

#### 红黑树概述

红黑树是一种自平衡的二叉树，是计算机科学中用到的一种数据结构。

1972年出现，当时被称为平衡二叉B树。1978年被修改为如今的”红黑树“

每一个结点可以是红或黑；红黑树不是通过高度平衡的，他的平衡是通过红黑规则进行实现的。

#### 红黑规则

每一个节点或是红色的，或是黑色的，**根节点必须是黑色的**

如果一个节点没有子节点或者父节点，则该节点对应节点相应的指针属性值为Nill,这些Nill视为叶节点，叶节点是黑色的。

如果某一个节点是红色的，那么它的子节点必须是黑色的（不能出现两个红色的节点相连的情况）

**对每一个节点，从该节点到其所有后代叶节点的简单路径上，均包含相同数目的黑色节点。**

**红黑树增删查改的性能都很好**

![image-20220809181657857](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091816892.png)



![image-20220809181620271](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091816332.png)

![image-20220809181736575](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091817613.png)





## List系列集合

### List集合特点：

- ArrayList、LinkedList：有序、可重复、有索引
- 有序：存储和去除的元素顺序一致
- 有索引：可通过索引操作元素
- 可重复：存储的元素可以重复

### List集合特有的方法

List集合因为支持索引，所以多了很多索引操作的独特api，其他Collection的功能List也继承了。

| 方法名                        | 说明                                   |
| ----------------------------- | -------------------------------------- |
| void add(int index,E element) | 在此集合中的指定位置插入指定元素       |
| E remove(int index)           | 删除指定索引处的元素，返回被删除的元素 |
| E set(int index,E element)    | 修改指定索引处的元素，返回被修改的元素 |
| E get(int index)              | 返回指定索引处的元素                   |

```java
package com.meng.list;

import java.util.ArrayList;
import java.util.List;

public class ListDemo1 {
    public static void main(String[] args) {
        //创建一个ArrayList集合对象
        //List：有序、可重复、有索引
        List<String> list = new ArrayList<>();//多态写法，经典
        list.add("Java");
        list.add("Java");
        list.add("MySQL");
        list.add("MySQL");

        //插入数据
        list.add(2,"HTML");
        System.out.println(list);//[Java, Java, HTML, MySQL, MySQL]

        //根据索引删除元素
        System.out.println(list.remove(2));
        System.out.println(list);

        //根据索引取元素
        System.out.println(list.get(2));

        //根据索引修改元素，返回修改前的数据
        System.out.println("被修改的数据"+list.set(0, "JavaSE"));
        System.out.println(list);
    }
}

```

List的实现类底层原理

- ArrayList底层是基于数组实现的，根据查询元素块，增删元素相对慢。
- LinkedList底层是基于双链表实现的，查询元素慢，增删首位元素是非常快的。



### List集合的遍历方式

- 迭代器
- 增强for循环
- Lambda表达式
- for循环（因为List集合存在索引，Collection不存在索引不能使用for循环）

### ArrayList集合底层原理（面试热点）

- ArrayList底层是基于**数组**实现的：根据索引定位元素快，增删需要做元素位移操作。
- 第一次创建集合并添加第一个元素的时候，在底层创建一个默认长度为10的数组。 

创建ArrayList集合后，首先会向集合中加入一个大小为10的数组，然后添加一个元素size加一，当元素的size等于10，会按照当前的1.5倍扩容(变为了15)，当插入的时候，会遍历插入的元素后面的元素然后后移一位，size加一；当删除元素的时候会把后面的元素全部迁移过来，size减一

### LinkedList集合底层原理

LinkedList的特点

- 底层是数据结构中的双链表，查询慢，首尾操作的速度是极快的，所以多了很多首尾操作的特有API

#### LinkedList集合特有的功能

| 方法名称                  | 说明                                     |
| ------------------------- | ---------------------------------------- |
| public void addFirst(E e) | 在该列表开头插入指定的元素               |
| public void addLast(E e)  | 在该列表末尾插入指定的元素               |
| public E getFirst()       | 从列表中获取第一个元素                   |
| public E getLast()        | 从列表中获取最后一个元素                 |
| public E removeFirst()    | 从列表中删除第一个元素并返回第一个元素   |
| public E removeLast()     | 从列表中删除最后一个元素并返回第一个元素 |

```java
package com.meng.list;

import java.util.LinkedList;

public class ListDemo2 {
    public static void main(String[] args) {
        //LinkedList 可以完成队列结构，和栈结构（双链表）

        //栈
        //我们想调用LinkedList的独有方法，这个时候就不需要用多态了
        LinkedList<String> stack = new LinkedList<>();
        //压栈，入栈
//        stack.addFirst("");
//        stack.push("");内的方法就是这个：
//        public void push(E e) {
//        addFirst(e);
//        }
        stack.push("第1颗子弹");
        stack.push("第2颗子弹");
        stack.push("第3颗子弹");
        stack.push("第4颗子弹");
        System.out.println("弹夹："+stack);
        //出栈 弹栈
        //System.out.println(stack.getFirst());
        System.out.println("碰~"+stack.pop());
        System.out.println("碰~"+stack.pop());
        System.out.println("碰~"+stack.pop());
        System.out.println("弹夹："+stack);

        
        //队列
        LinkedList<String> queue = new LinkedList<>();
        //入队
        queue.offerLast("1");//排队是排在最后一个位置；入队的专业英语：offerLast
        queue.addLast("2");
        queue.addLast("3");
        queue.addLast("4");
        queue.addLast("5");
        System.out.println("当前队伍："+queue);
        //出队
//        System.out.println(queue.getFirst());
        queue.removeFirst();
        queue.removeFirst();
        queue.removeFirst();
        System.out.println("出队3个后"+queue);
    }
}

```





## 集合的并发修改异常问题

我们之前发现：边遍历边删除元素的时候可能有BUG

- 迭代器遍历集合且直接用集合删除元素的时候可能出现问题
- 增强for循环遍历集合且直接用集合删除元素的时候可能出现问题

```java
package com.meng.deleteQuestion;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

public class Test1 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("C++");
        list.add("Java");
        list.add("Java");
        list.add("PHP");
        list.add("Python");
        list.add("HTML");
        System.out.println(list);
        //[C++, Java, Java, PHP, Python, HTML]

        //需求：删除list集合中的Java
        //a、迭代器遍历删除
//        Iterator<String> it = list.iterator();
//        while (it.hasNext()){
//            String ele = it.next();
//            if ("Java".equals(ele)){
//                //list.remove("Java");//不要使用这个删除 因为删除后就元素会前移，但是就不检测这个移动过来的元素了，直接后移
//                it.remove();//利用迭代器删除当前所在元素，并且不会后移!!!
//            }
//        }
//        System.out.println(list);

        //b、foreach删除。有bug
//        for (String s : list) {
//            if ("Java".equals(s)){
//                list.remove("Java");//并发异常
//            }
//        }
        //c、lambda表达式。有bug
//        list.forEach(s -> {
//            if ("Java".equals(s)){
//                list.remove("Java");//也有BUG
//            }
//        });

        //d、for循环。会漏删除，不过我们可以倒着删除
        for (int i = list.size()-1; i >= 0; i--) {
            String s = list.get(i);
            if ("Java".equals(s)){
                list.remove("Java");
            }
        }
        System.out.println(list);//[C++, Java, PHP, Python, HTML]



    }
}

```



## 泛型深入

### 泛型概述和优势

- 泛型：是JDK5中引入的新特性，可以在编译阶段约束操作的数据类型，并进行检查
- 泛型的格式：< 数据类型 >；注意：泛型只能支持引用数据类型
- 集合体系的全部接口和实现类都是支持泛型的使用

### 泛型的好处

- 统一数据类型
- 把运行时期的问题提前到了编译期间，避免了强制类型转换可能出现的异常，因为编译阶段类型就确定下来。



### 自定义泛型类

- 定义类时 同时定义了泛型的类就是泛型类

- 泛型类的格式：修饰符 class 类名 < 泛型变量 > {  }

- ```java
  public class MyArrayList<T>{}
  ```

- 此处泛型变量T可以随便写为任意的标志，常见的比如：E、T、K、V等。不过我们常用T

- 作用：编译阶段可以指定数据类型，类似于集合的作用。

#### 案例

模拟ArrayList集合自定义一个MyArrayList集合，完成添加和删除功能的泛型设计即可。

```java
package com.meng.genericity;


import java.util.ArrayList;

public class MyArrayList<T> {
    private ArrayList<T> lists = new ArrayList<>();//装饰模式的一种思想，外部类中可以再包一个内部对象

    public void add(T t){
        lists.add(t);
    }
    public void remove(T t){
        lists.remove(t);
    }

    @Override
    public String toString() {
        return lists.toString();
    }
}

```

```java
package com.meng.genericity;


public class Test {
    public static void main(String[] args) {
        MyArrayList<String> list = new MyArrayList<>();
        list.add("Java");
        list.add("JavaWeb");
        list.add("MySQL");
        list.remove("Java");
        System.out.println(list);

    }
}

```



### 自定义泛型方法

- 定义方法的同时定义了泛型方法就是泛型方法

- 泛型方法的格式：修饰符 < 泛型变量 > 方法返回值 方法名称(形参列表){  }

- ```java
  public <T> void show(T t){ }
  ```

- 方法中可以使用泛型接收一切实际类型的参数，方法更具有通用性

#### 案例

给任意一个类型的数组，都能返回特点内容，也就是实现Arrays.toString(数组)的功能

```java
package com.meng.genericity;

public class Demo1 {
    public static void main(String[] args) {
        String[] name = {"张三","李四","王五"};
        printArray(name);

        Integer[] ages = {10,20,30};
        printArray(ages);

        
        Integer[] array = getArray(ages);
        System.out.println(array);
        String[] array1 = getArray(name);
        System.out.println(array1);

    }
    //泛型方法
    public static <T> T[] getArray(T[] arr){
        return arr;
    }
    public static <T> void printArray(T[] arr){
        if (arr != null){
            StringBuffer stringBuffer = new StringBuffer("[");
            for (int i = 0; i<arr.length; i++) {
                stringBuffer.append(i).append(i == arr.length - 1 ? "" : ", ");
            }
            stringBuffer.append("]");
            System.out.println(stringBuffer);
        }else {
            System.out.println(arr);
        }
    }
}


```



### 自定义泛型接口

- 使用了泛型定义的接口就是泛型接口
- 泛型接口格式：修饰符 interface 接口名称< 泛型变量 >{ }
- 作用：泛型接口可以让实现类选择当前功能操作的数据类型

#### 案例

教务系统：提供一个案例可以约束一定要完成数据（老师、学生）的增删改查操作。

```java
package com.meng.genericity_interface;

public interface Data<T> {
    void add (T t);
    void remove(int id);
    void update(T t);
    T getById(int id);
}

```

```java
package com.meng.genericity_interface;

public class Teacher {
}

```

```java
package com.meng.genericity_interface;

public class Student {
}

```

```java
package com.meng.genericity_interface;

public class TeacherData implements Data<Teacher>{
    @Override
    public void add(Teacher teacher) {

    }

    @Override
    public void remove(int id) {

    }

    @Override
    public void update(Teacher teacher) {

    }

    @Override
    public Teacher getById(int id) {
        return null;
    }
}

```

```java
package com.meng.genericity_interface;

//由实现类决定操作哪些信息                  泛型接口传入的是学生，下面泛型就会表示成为学生
public class StudentData implements Data<Student>{
    @Override
    public void add(Student student) {

    }

    @Override
    public void remove(int id) {

    }

    @Override
    public void update(Student student) {

    }

    @Override
    public Student getById(int id) {
        return null;
    }
}

```

#### 泛型接口的作用

泛型接口可以约束实现类，实现类可以在实现接口的时候传入自己的操作的数据类型，这样重写的方法都是针对与该类型的操作。



### 泛型通配符、上下限

通配符：？

- 可以在使用泛型的时候代表一切类型
- ETKV是在定义泛型的时候使用的

泛型的上下限：

- ? extends Car: ？必须是Car或者是其子类 泛型上限
- ? super Car : ？必须是Car或者其父类 泛型下限

#### 案例

开发一个极品飞车的游戏，所有的汽车都能一起参加比赛

```java
package com.meng.game;

import java.util.ArrayList;

public class GenericDemo {
    public static void main(String[] args) {
        ArrayList<BMW> bmws = new ArrayList<>();
        bmws.add(new BMW());
        bmws.add(new BMW());
        bmws.add(new BMW());
        go(bmws);


        ArrayList<SUV> suvs = new ArrayList<>();
        suvs.add(new SUV());
        suvs.add(new SUV());
        suvs.add(new SUV());
        go(suvs);

        ArrayList<Dog> dogs = new ArrayList<>();
        dogs.add(new Dog());
        dogs.add(new Dog());
        dogs.add(new Dog());
        //go(dogs);//这是赛车游戏，狗不能进来的！！！达咩！使用泛型上下限

    }

    /**
     * 所有车参加比赛,泛型通配符：? 可以
     * @param cars
     */
    public static void go(ArrayList<? extends Car> cars){

    }
}

class Dog{

}

class SUV extends Car{

}

class BMW extends Car{

}

//父类汽车
class Car{

}

```

## Set集合体系

### Set集合的特点

![image-20220809161431474](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101015981.png)



- 无序：存储顺序不一致
- 不重复：可以去重复
- 无索引：没有带索引的一些方法，所以不能使用普通的for循环遍历，也不能通过索引获取元素

### Set集合实现类的特点

- HashSet：无序、不重复、无索引
- LinkedHashSet：**有序**、不重复、无索引
- TreeSet：排序（天然对元素大小做升序排序）、不重复、无索引



Set集合的功能其实和Collection集合的API一致



```java
package com.meng.collection_map;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

public class SetDemo1 {
    public static void main(String[] args) {
        //Set集合体系的特点
        Set<String> sets = new HashSet<>();//经典的代码：多态；以后我们如果HashSet不想使用，可以直接修改后面的HashSet，不用修改下面的元素了
        sets.add("MySQL");
        sets.add("MySQL");
        sets.add("Java");
        sets.add("Java");
        sets.add("HTML");
        sets.add("HTML");
        sets.add("SpringBoot");
        sets.add("SpringBoot");
        System.out.println(sets);//[Java, MySQL, HTML, SpringBoot] 无序、不重复、无索引。无序：第一次是无序的，后面是有规律的

        Set<String> linked = new LinkedHashSet<>();//多态；以后我们如果HashSet不想使用，可以直接修改后面的HashSet，不用修改下面的元素了
        linked.add("MySQL");
        linked.add("MySQL");
        linked.add("Java");
        linked.add("Java");
        linked.add("HTML");
        linked.add("HTML");
        linked.add("SpringBoot");
        linked.add("SpringBoot");
        System.out.println(linked);//[MySQL, Java, HTML, SpringBoot]有序、不重复、无索引。无索引：只是没有提供索引的方法，底层还是有索引的
        

    }
}

```



### HashSet元素无序的底层原理：哈希表

#### HashSet底层原理

- HashSet底层采用哈希表存储的数据
- 哈希表是一种对应增删改查数据性能都较好的结构

#### 哈希表的组成

- JDK8之前，底层采用数组+链表组成
- JDK8开始后，底层采用数组+链表+红黑树组成

#### 哈希值

- **JDK根据对象的地址，按照某种规则算出来的int类型的数值**

#### Object类的API

- **public int hashCode();**返回对象的哈希值

#### 对象的哈希值特点

- 同一个对象多次调用hashCode()方法返回的哈希值是相同的
- 默认情况下，不同对象的哈希值是不同的

```java
package com.meng.collection_map;

import java.util.Objects;

/**
 * 目标：获取对象的哈希值，并确认
 */
public class SetDemo2 {
    public static void main(String[] args) {
        String name = "小胡";
        System.out.println(name.hashCode());
        System.out.println(name.hashCode());

        String name1 = "小虎";
        System.out.println(name1.hashCode());
        System.out.println(name1.hashCode());
    }
}

```

#### 哈希表原理

JDK1.7:https://www.bilibili.com/video/BV1Cv411372m?p=134&spm_id_from=pageDriver&vd_source=51ea6336b76b9ea01f2d5cad2110fe0a&t=1095.8

![image-20220810103158118](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101031217.png)



1. 创建一个默认长度为**16**的数组，数组名为table

2. 根据元素的**哈希值**跟**数组的长度求余**计算出应存入的位置（哈希算法）

3. 判断当前位置是否为null，如果是null直接存入

4. **如果位置不为null，表示有元素，则调用equals方法比较哈希值**

5. **如果哈希值一样，则不存，如果不一样，则存入数组**

   - JDK7新元素会占据老元素的位置，指向老元素

   - JDK8中的新元素会挂在老元素的下面

JDK1.8

![image-20220810103529523](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101035568.png)



- 底层结构：哈希表（数组、链表、红黑树）
- 当挂在元素下面的数据过多时，查询性能降低，从JDK8后**当链表长度超过8的时候，自动转换为红黑树（根据哈希值比较）**

![image-20220810104015476](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101040523.png)



```java
package com.meng.collection_map;

import java.util.Objects;

public class Student {
    private String name;
    private int age;
    private char sex;

    public Student() {
    }

    public Student(String name, int age, char sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", sex=" + sex +
                '}';
    }

    /**
     * 只要两个结果内容一样，返回的就是true
     * @param o
     * @return
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && sex == student.sex && Objects.equals(name, student.name);
    }

    /**
     * 两个对象的内容一样，重写后的hashCode的哈希值就是一样的
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(name, age, sex);
    }
}

```

```java
package com.meng.collection_map;

import java.util.HashSet;
import java.util.Set;

public class SetDemo3 {
    public static void main(String[] args) {
        //Set集合去重复的原因是先判断哈希值，在判断equals。重写hashCode和equals去重复
        Set<Student> students = new HashSet<>();
        students.add(new Student("小胡",18,'男'));
        students.add(new Student("小胡",18,'男'));
        students.add(new Student("小王",18,'男'));
        students.add(new Student("小张",18,'男'));
        System.out.println(students);
    }
}

```

![image-20220810104318377](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101043436.png)



### LinkedHashSet集合

- **有序**、不重复、无索引
- 这里的有序指的是保证存储和取出的元素顺序一致
- 原理：底层数据结构依然是哈希表，只是每个元素又额外的多了一个双链表的机制记录存储的顺序
- ![image-20220810104528185](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101045238.png)



### TreeSet集合

- 不重复、无索引、可排序
- 可排序：按照元素大小默认升序（由小到大)排序
- TreeSet集合底层是基于红黑树的数据结构实现排序的，增删改查性能都较好

#### TreeSet集合默认的排序规则

- 对于数值类型：Integer、Double，官方默认按照大小进行升序排序
- 对于字符串类型：默认按照首字符的编号升序排序。
- 对于自定义的类型如Student对象，TreeSet无法直接排序

如果想使用TreeSet存储自定义类型，需要制定排序规则

![image-20220810105035042](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101050096.png)

![image-20220810105424559](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101054603.png)





```java
package com.meng.collection_map;

import java.util.Objects;

public class Student implements Comparable<Student>{
    private String name;
    private int age;
    private char sex;

    public Student() {
    }

    public Student(String name, int age, char sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", sex=" + sex +
                '}';
    }

    /**
     * 只要两个结果内容一样，返回的就是true
     * @param o
     * @return
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && sex == student.sex && Objects.equals(name, student.name);
    }

    /**
     * 两个对象的内容一样，重写后的hashCode的哈希值就是一样的
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(name, age, sex);
    }

    /**
     * 方式一：类自定义比较规则
     * @param o
     * @return
     */
    @Override
    public int compareTo(Student o) {
        //按照年龄比较
//        return this.age - o.age;//取掉年龄重复的元素
        return this.age - o.age >= 0 ? 1 : -1;//把等于零的情况取掉了，保留元素重复的元素，避免了少元素的情况
    }
}

```

```java
package com.meng.collection_map;

import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class SetDemo4 {
    public static void main(String[] args) {
        Set<Integer> set = new TreeSet<>();
        set.add(23);
        set.add(80);
        set.add(21);
        set.add(25);
        System.out.println(set);

        Set<String> strings = new TreeSet<>();
        strings.add("Java");
        strings.add("Java");
        strings.add("A");
        strings.add("Z");
        strings.add("b");
        strings.add("小黑");
        System.out.println(strings);//按照首字符编号从小到大排序

        System.out.println("----------------------");
      //优先使用集合自带的比较器
//        Set<Student> students = new TreeSet<>(new Comparator<Student>() {
//            @Override
//            public int compare(Student o1, Student o2) {
//                return o1.getAge() - o2.getAge();
//            }
//        });
        Set<Student> students = new TreeSet<>(Comparator.comparingInt(Student::getAge));
        students.add(new Student("xx",11,'男'));
        students.add(new Student("xx",11,'男'));
        students.add(new Student("xx",13,'男'));
        students.add(new Student("xx",1,'男'));

        System.out.println(students);


    }
}


```

总结：

1. TreeSet集合特点：
   - 可排序、不重复、无索引
   - 底层基于红黑树实现的、增删改查性能好
2. TreeSet集合自定义排序规则有几种方式
   - 2种
   - 类实现Comparable接口，重写比较规则
   - 集合自定义Comparable比较器，重写比较规则

### 总结

1. 如果希望元素可以重复，有索引，索引查询要快

   用ArrayList集合，基于数组的（用的最多）

2. 如果希望元素可以重复，有索引，增删首尾操作快

   用LinkedList集合，基于链表

3. 如果希望增删改查都快，但是元素不重复、无序、无索引

   用HashSet集合，基于哈希表

4. 如果希望增删改查都快，但是元素不重复、有序、无索引

   用LinkedHashSet集合，基于哈希表和双链表

5. 如果要对对象进行排序

   用TreeSet集合，基于红黑树。后续也可以用List集合实现排序





## 可变参数

- 可变参数用在形参中可以接收多个数据
- 可变参数的格式：数据类型 ... 参数名称

可变参数的作用

- 传输参数非常灵活，方便。可以不穿参数，可以传一个参数或多个，甚至也可以传一个数组
- 可变参数在方法内部本身就是一个数组

可变参数的注意事项：

- 一个形参列表中的可变参数只能有一个
- 可变参数必须放在形参列表的最后面

```java
package com.meng.params;

import java.util.Arrays;

public class MethodDemo {
    public static void main(String[] args) {

        sum(1);
        sum(10);
        sum(10,20,30);
        sum(1,new int[]{10,20,30});
    }
    public static void sum(int a,int...nums){
        //注意nums在方法内部其实就是数组
        System.out.println("参数个数"+nums.length);
        System.out.println("元素内容"+ Arrays.toString(nums));

    }
}

```



## 集合工具类

- java.utils.Collections:是集合工具类
- 作用：Collections并不属于集合，是用来操作集合的工具类

### Collections常用的API

| 方法名称                                                                       | 说明                   |
| ------------------------------------------------------------------------------ | ---------------------- |
| public static < T > boolean addAll(Collection < ? super T > c ,T ... elements) | 给集合对象批量添加元素 |
| public static void shuffle ( List < ? > list)                                  | 打乱List集合元素的顺序 |

### Collections常用的排序的API

| 方法                                                                       | 说明                                                                                                                     |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| public static < T > void sort(LIst< T > list)                              | 将集合中的元素按照默认规则排序，注意：本方式不可以直接对自定义类型的List排序，除非自定义类实现了比较规则的Comparable接口 |
| public static < T > void sort(List< T > list , Comparator< ? super T  > c) | 将集合中的元素按照指定规则排序                                                                                           |

```java
package com.meng.collections;

import java.util.Objects;

public class Student implements Comparable<Student>{
    private String name;
    private int age;
    private char sex;

    public Student() {
    }

    public Student(String name, int age, char sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", sex=" + sex +
                '}';
    }

    /**
     * 只要两个结果内容一样，返回的就是true
     * @param o
     * @return
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && sex == student.sex && Objects.equals(name, student.name);
    }

    /**
     * 两个对象的内容一样，重写后的hashCode的哈希值就是一样的
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(name, age, sex);
    }



    /**
     * 方式一：类自定义比较规则
     * @param o
     * @return
     */
    @Override
    public int compareTo(Student o) {
        return this.age - o.age;
    }
}

```

```java
package com.meng.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionDemo2 {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        Collections.addAll(students,new Student("xx",10,'男'),
                                    new Student("xx",9,'男'),
                                    new Student("xx",8,'男'),
                                    new Student("xx",10,'男'));
        System.out.println(students);
        Collections.sort(students);//学生类已经实现类Comparable接口（implements）
        System.out.println(students);
    }
}

```



## 案例：斗地主游戏

```java
package com.meng.games;

public class Card {
    private String size;//点数
    private String color;//花色

    private int index;//牌的大小，解决排序中J Q K A 大小王排序的问题

    public Card() {
    }

    public Card(String size, String color,int index) {
        this.size = size;
        this.color = color;
        this.index = index;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    @Override
    public String toString() {
        return color + size;
    }


}

```



```java
package com.meng.games;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * 1、做牌
 * 2、洗牌
 * 3、定义三个玩家
 * 4、发牌
 * 5、排序
 * 6、看牌
 */
public class GameDemo {
    /**
     *1、定义一个静态的集合存储54张牌
     */

    public static ArrayList<Card> allCards = new ArrayList<>();

    /**
     *2、定义静态代码块，加载数据
     */
    static {
        String[] sizes = {"3","4","5","6","7","8","9","10","J","Q","K","A","2"};
        String[] colors = {"♠","♥","♣","♦"};
        //组合点数和花色
        int index = 0;//记录牌的大小
        for (String size : sizes) {
            index++;
            for (String color : colors) {
                //封装成牌对象
                Card card = new Card(size, color,index);
                //存入到集合容器
                allCards.add(card);
            }
        }

        Card c1 = new Card("", "小王",++index);
        Card c2 = new Card("", "大王",++index);

        Collections.addAll(allCards,c1,c2);//把大小王放到牌中
        System.out.println("新牌："+allCards);
    }

    public static void main(String[] args) {
        //9、洗牌
        Collections.shuffle(allCards);
        //洗牌后
        System.out.println("洗牌："+allCards);

        //10、发牌、定义3个玩家
        List<Card> play1 = new ArrayList<>();
        List<Card> play2 = new ArrayList<>();
        List<Card> play3 = new ArrayList<>();

        //发牌,剩余3张牌作为底牌
        for (int i = 0; i < allCards.size() - 3; i++) {
            //先拿到当前循环一次的牌对象
            Card card = allCards.get(i);
            if (i%3 == 0){
                //play1
                play1.add(card);
            }else if ( i%3 == 1){
                play2.add(card);
            }else if (i%3 == 2){
                play3.add(card);
            }
        }

        //12、拿到底牌
        List<Card> lastThreeCards = allCards.subList(allCards.size() - 3, allCards.size());

        //13、给玩家的牌排序
        sortCards(play1);
        sortCards(play2);
        sortCards(play3);
        sortCards(lastThreeCards);

        //14、输出
        System.out.println("play1:"+play1);
        System.out.println("play2:"+play2);
        System.out.println("play3:"+play3);
        System.out.println("底牌:"+lastThreeCards);

    }

    private static void sortCards(List<Card> cards) {
        //给牌排序
        Collections.sort(cards, (o1, o2) -> o2.getIndex() - o1.getIndex());

    }

}

```





## Map集合

### Map集合概述和使用

- Map集合是一种双列集合，每个元素包含两个元素
- Map集合的每个元素的格式：key=value（键值对元素）
- Map集合也被称为”**键值对集合**“



### Map集合整体格式

- Collection集合的格式：[元素1，元素2，元素3]
- Map集合完整的格式：{key1 = value1, key2 = value2, key3 = value3, ...}



key1  ==========value1

key2  ==========value2

key3  ==========value3



### Map集合体系

![image-20220810131346237](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101313300.png)

![image-20220810132212721](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101322792.png)

![image-20220810132414102](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101324168.png)





Map集合的键无序、不重复的；Map集合的值不做要求可以重复

### Map集合的特点

- Map集合的特点都是由键决定的
- Map集合的键是无序的、不重复、无索引，值不做要求（可以重复）
- Map集合后面的重复的键会覆盖前面的重复的键
- Map集合的键值对都可以为null

### Map集合实现类的特点

- HashMap：元素按照键是无序的，不重复，无索引，值不做要求（与Map体系一致）
- LinkedHashMap：元素按照键是有序的，不重复，无索引，值不做要求
- TreeMap：元素按照键是排序的，不重复，无索引，值不做要求

```java
package com.meng.map;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 认识Map体系的特点：键无序、不重复、无索引、值不做要求
 */
public class MapDemo1 {
    public static void main(String[] args) {
//        Map<String,Integer> maps = new HashMap<>();//一行经典代码！！多态
        Map<String,Integer> maps = new LinkedHashMap<>();//一行经典代码！！多态。LinkedHashMap有序
        maps.put("NIKE",1);
        maps.put("鸿星尔克",1);
        maps.put("Java",1);
        maps.put("Java",10);//覆盖了上面的Java
        maps.put(null,null);
        System.out.println(maps);

    }
}

```



### Map集合常用API

| 方法                                | 说明                                 |
| ----------------------------------- | ------------------------------------ |
| V **put** (K key, V value)          | 添加元素                             |
| V remove (Object key)               | 根据键删除集合中的元素               |
| void clear()                        | 清空集合中所有的元素                 |
| boolean containsKey(Object key)     | 判断集合中是否包含指定的键           |
| boolean containsValue(Object value) | 判断集合中是否包含指定的值           |
| boolean isEmpty()                   | 判断集合是否为空                     |
| int size()                          | 集合的长度，也就是集合中键值对的个数 |
| V get(Object key)                   | 根据键取出值对应的元素               |

```java
package com.meng.map;

import java.util.*;

/**
 * 认识Map体系的特点：键无序、不重复、无索引、值不做要求
 */
public class MapDemo1 {
    public static void main(String[] args) {
        Map<String,Integer> maps = new HashMap<>();//一行经典代码！！多态
//        Map<String,Integer> maps = new LinkedHashMap<>();//一行经典代码！！多态。LinkedHashMap有序
        //1、添加元素
        maps.put("NIKE",1);
        maps.put("鸿星尔克",1);
        maps.put("Java",1);
        maps.put("Java",10);//覆盖了上面的Java
        maps.put("iPhone13",1);//覆盖了上面的Java
        maps.put("HuaWei",2);//覆盖了上面的Java
        //{NIKE=1, Java=10, iPhone13=1, HuaWei=2, 鸿星尔克=1}

        //2、清空集合
        //maps.clear();//{}
        System.out.println(maps);

        //3、判断集合是否为空
        //System.out.println(maps.isEmpty());//true

        //4、根据键获取对应的值
        Integer nike = maps.get("NIKE");
        System.out.println(nike);
        System.out.println(maps.get("Java"));
        System.out.println(maps.get("Java2"));//null

        //5、根据键删除整个元素,删除键会返回对应的值
        Integer java = maps.remove("Java");
        System.out.println(java);
        System.out.println(maps);

        //6、判断是否包含某个键
        System.out.println(maps.containsKey("Java"));

        //7、判断是否包含某个值
        System.out.println(maps.containsValue(1));

        //8、获取全部键的集合，返回一个Set集合，因为Map集合和Set集合的特点是一样的
        Set<String> keys = maps.keySet();
        System.out.println(keys);

        //9、获取所有值的集合,返回的是Collection集合不是Set集合，因为怕值出现一样的时候用Set会出现值的丢失,所以使用Collection集合
        Collection<Integer> values = maps.values();
        System.out.println(values);

        //10、集合大小
        System.out.println(maps.size());//4

        //11、合并集合
        Map<String,Integer> map1 = new HashMap<>();
        map1.put("java1",1);
        map1.put("java2",100);
        Map<String,Integer> map2 = new HashMap<>();
        map2.put("java2",1);
        map2.put("java3",100);
        map1.putAll(map2);//把map2中的集合拷贝到map1中
        System.out.println(map1);



    }
}

```



### Map集合的遍历

#### 键找值

1. 先获取Map集合的全部键的Set集合
2. 遍历Set集合，然后通过键提取对应的值

```java
package com.meng.map;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * 认识Map体系的特点：键无序、不重复、无索引、值不做要求
 */
public class MapDemo2 {
    public static void main(String[] args) {
        Map<String, Integer> maps = new HashMap<>();//一行经典代码！！多态
//        Map<String,Integer> maps = new LinkedHashMap<>();//一行经典代码！！多态。LinkedHashMap有序
        //1、添加元素
        maps.put("NIKE", 1);
        maps.put("鸿星尔克", 1);
        maps.put("Java", 1);
        maps.put("Java", 10);//覆盖了上面的Java
        maps.put("iPhone13", 1);//覆盖了上面的Java
        maps.put("HuaWei", 2);//覆盖了上面的Java
        //{NIKE=1, Java=10, iPhone13=1, HuaWei=2, 鸿星尔克=1}
        System.out.println(maps);

        //1、把键转为Set集合
        Set<String> keySet = maps.keySet();
        //2、遍历每个键，根据键找值
        for (String s : keySet) {
            System.out.println(s+"=====>"+maps.get(s));
        }

    }
}

```

#### 键值对

1. 先把Map集合装换成Set集合，Set集合中的每个元素都是**键值对实体类型**了
2. 遍历Set集合，然后提取键以及值



```java
package com.meng.map;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MapDemo3 {
    public static void main(String[] args) {
        Map<String, Integer> maps = new HashMap<>();//一行经典代码！！多态
        //1、添加元素
        maps.put("NIKE", 1);
        maps.put("鸿星尔克", 1);
        maps.put("Java", 1);
        maps.put("Java", 10);//覆盖了上面的Java
        maps.put("iPhone13", 1);//覆盖了上面的Java
        maps.put("HuaWei", 2);//覆盖了上面的Java
        //{NIKE=1, Java=10, iPhone13=1, HuaWei=2, 鸿星尔克=1}
        System.out.println(maps);

        /**
         * 此时 maps = {NIKE=1, Java=10, iPhone13=1, HuaWei=2, 鸿星尔克=1}
         * 使用foreach遍历map集合，发现map集合的键值对元素直接是没有类型的。所以不可以直接使用foreach遍历集合
         * 不过我们可以通过Map的方法 entrySet() 的方法，把Map转换成Set集合的形式
         * Set<Map.Entry<String, Integer>> entries = [ (NIKE=1), (Java=10), (iPhone13=1), (HuaWei=2), (鸿星尔克=1) ]
         * 然后我们就可以直接遍历Set集合得到Map集合了
         *
         */
        Set<Map.Entry<String, Integer>> entries = maps.entrySet();
        for (Map.Entry<String, Integer> entry : entries) {
            System.out.println(entry);
//            String key = entry.getKey();
//            Integer value = entry.getValue();
//            System.out.println(key+"----->"+value);
        }
    }
}

```



#### Lambda表达式

```java
package com.meng.map;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.function.BiConsumer;

public class MapDemo4 {
    public static void main(String[] args) {
        Map<String, Integer> maps = new HashMap<>();//一行经典代码！！多态
        //1、添加元素
        maps.put("NIKE", 1);
        maps.put("鸿星尔克", 1);
        maps.put("Java", 1);
        maps.put("Java", 10);//覆盖了上面的Java
        maps.put("iPhone13", 1);//覆盖了上面的Java
        maps.put("HuaWei", 2);//覆盖了上面的Java
        //{NIKE=1, Java=10, iPhone13=1, HuaWei=2, 鸿星尔克=1}
        System.out.println(maps);


//        maps.forEach(new BiConsumer<String, Integer>() {
//            @Override
//            public void accept(String s, Integer integer) {
//                System.out.println(s+"---->"+integer);
//            }
//        });

        //lambda表达式,一行直接解决Map集合遍历
        maps.forEach((k,v) -> {
            System.out.println(k+"--->"+v);
        });



    }
}

```



map集合的foeEach底层源码：其实就是在调用第二种的键值对方法，把键和值封装成一个类型整体给Set集合，然后再回调BiConsumer函数型接口



案例

```java
package com.meng.map;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class MapCase {
    public static void main(String[] args) {
        //80个学生的选择
        String[] selects = {"A","B","C","D"};
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 80; i++) {
            sb.append(selects[random.nextInt(selects.length)]);
        }
        System.out.println(sb);

        //定义一个Map集合
        Map<Character,Integer> infos = new HashMap<>();

        for (int i = 0; i < 80; i++) {
            char c = sb.charAt(i);
            if (infos.containsKey(c)){
                //让值加一
                infos.put(c,infos.get(c)+1);
            }else {
                //第一次被选
                infos.put(c,1);
            }
        }
        System.out.println(infos);

    }
}

```



## 不可变集合

什么是不可变集合？

- 不可以被修改的集合
- 集合的数据在创建的时候就已经提供，并且在整个生命周期中都不可改变。否则报错

如何创建不可变集合？

- 在List、Set、Map接口中，都存在of方法，可以创建一个不可变集合

```java
package com.meng.unchange_collection;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class CollectionDemo1 {
    public static void main(String[] args) {
        //不可变的List集合，注意JDK1.8不支持
        List<Double> lists = List.of(569.5,600.5,599.3);
//        lists.add(500.4);
        System.out.println(lists);

        //不可变的Set集合
        Set<String> sets = Set.of("1","2","3","4");
        System.out.println(sets);

        //不可变的Map集合
        Map<String,Integer> maps = Map.of("huawei",2,"java",3);
        System.out.println(maps);
    }
}

```

#### 总结：

- 定义完成之后不可修改、添加、删除
- List、Set、Map接口中都存在of方法可以创建不可变集合

![image-20220810132436936](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208101324015.png)









