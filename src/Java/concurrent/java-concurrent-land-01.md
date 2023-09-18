---
title: 多线程
---


## 多线程

![image-20220811094813259](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208110948395.png)



多线程是什么？

- 多线程是指从硬件上实现多条执行流程的技术

多线程用在哪？有什么好处

- 购票系统
- 百度网盘的下载和上传
- 消息通信(收发消息)，淘宝，京东...



## 多线程的创建

### 方式一：继承Thread类

1. 定义一个子类MyThread继承线程类java.lang.Thread，重写run()方法
2. 创建MyThread类对象
3. 调用线程对象的start()方法启动线程

```java
package com.demo1;

/**
 * 掌握多线程的创建方式一：继承Thread类
 */
public class Demo1 {
    public static void main(String[] args) {
        //1、new一个新线程对象，代表线程
        Thread t = new MyThread();
        //2、调用start方法执行线程中的run方法
        t.start();//实现了多线程

        //写一个主线程
        for (int i = 0; i < 5; i++) {
            System.out.println("主线程执行输出" + i);
        }

    }
}

/**
 * 定义一个线程类继承Thread类
 */
class MyThread extends Thread{
    /**
     * 重写run方法，里面是定义线程以后要干啥
     */
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("子线程执行输出" + i);
        }
    }
}

```



#### 优缺点：

- 优点：编码简单
- 缺点：线程类已经继承Thread，无法继承其他类，不利于扩展

#### 疑问：

为什么不是调用run方法启动多线程，而是调用start方法呢？

- 如果直接调用run方法会当成普通方法执行，此时相当于还是单线程执行

#### 注意点：

**不要**把**主线程**的任务放到**子线程**任务之前，否则主线程一直是先跑完的，相当于是一个单线程的效果了。

![image-20220811100852340](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111008476.png)





### 方式二：实现Runnable接口

1. 定义一个线程任务类MyRunnable实现Runnable接口，重写run()方法
2. 创建MyRunnable任务对象
3. 把MyRunnable任务对象交给Thread处理
4. 调用线程对象的start()方法启动线程

![image-20220811101703243](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111017312.png)

```java
package com.demo1;

public class Demo2 {
    public static void main(String[] args) {
        //创建一个任务对象
        Runnable target = new MyRunnable();
        //把任务对象交给Thread对象处理
        Thread t = new Thread(target);
        //启动线程
        t.start();

        //定义主线程（在main中）
        for (int i = 0; i < 10; i++) {
            System.out.println("主线程执行输出" + i);
        }


    }
}

/**
 * 定义一个线程任务类，实现Runnable接口
 */
class MyRunnable implements Runnable{

    /**
     * 实现run方法
     */
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("子线程执行输出" + i);
        }
    }
}

```



#### 优缺点：

- 优点：线程任务只是实现接口，可以继续继承和实现接口，扩展性强
- 缺点：编程多一层对象包装，如果线程有执行结果，是不可以直接返回的

![image-20220811102046877](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111020940.png)



#### 实现Runnable接口（匿名内部类形式）

```java
package com.demo1;

public class Demo2 {
    public static void main(String[] args) {
        

        //匿名内部类形式
        Runnable target = new Runnable(){
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println("子线程1执行输出" + i);
                }
            }
        };
        Thread thread = new Thread(target);
        thread.start();
        //简化
        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println("子线程2执行输出" + i);
                }
            }
        }).start();
        //简化
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                System.out.println("子线程3执行输出" + i);
            }
        }).start();

        //定义主线程（在main中）
        for (int i = 0; i < 10; i++) {
            System.out.println("主线程执行输出" + i);
        }


    }
}



```



### 方式三：JDK5.0新增：实现Callable接口

- 前两种线程创建的方式都存在一个问题：
  - 他们重写的run方法不能返回结果
  - 不适合需要返回线程执行结果的业务场景
- 于是JDK5.0提供了Callable和FutureTask，可以解决这个问题



1. 得到任务对象
   - 定义类实现Callable接口，重写call方法，封装要做的事情
   - 用FutureTask把Callable对象封装成线程任务对象
2. 把线程任务对象交给Thread处理
3. 调用Thread的start方法启动线程，执行任务
4. 线程执行完毕后，通过FutureTask的get方法区获取任务执行的结果



```java
package com.demo1;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

public class Demo3 {
    public static void main(String[] args) {
        //创建任务对象
        Callable<String> call = new MyCallable(100);
        //把Callable任务对象交给FutureTask对象
        //FutureTask对象的作用1：是Runnable的对象（实现了Runnable接口），可以交给Thread了
        //FutureTask对象的作用2：可以在线程执行完毕后通过调用其get方法得到线程执行完毕的结果
        FutureTask<String> task = new FutureTask<>(call);
        //交给线程处理
        Thread thread = new Thread(task);
        //启动线程
        thread.start();
        //获取结果（主线程）
        try {
            //如果task任务没有执行完，这里的代码会等待，直到线程跑完才取出结果
            String rs1 = task.get();
            System.out.println("第一个结果："+rs1);
        }  catch (Exception e) {
            e.printStackTrace();
        }

        Callable<String> call2 = new MyCallable(200);
        FutureTask<String> task2 = new FutureTask<>(call2);
        Thread thread2 = new Thread(task2);
        thread2.start();
        try {
            String rs2 = task2.get();
            System.out.println("第二个结果："+rs2);
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
}

/**
 * 定义一个任务类，实现Callable接口，应该声明线程任务执行完毕后的结果数据类型
 */
class MyCallable implements Callable<String>{
    //计算1到n的和
    private int n;

    public MyCallable(int n) {
        this.n = n;
    }

    /**
     * 重写call方法
     * @return
     * @throws Exception
     */
    @Override
    public String call() throws Exception {
        int sum = 0;
        for (int i = 0; i <= n; i++) {
            sum += i;
        }
        return "子线程执行的结果为：" + sum;
    }
}
```

![image-20220811104734651](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111047738.png)



#### 优缺点：

- 优点：线程任务类只是实现接口，可以继续继承和实现接口，扩展性强
- 优点：可以在线程执行完毕后通过FutureTask的get方法获取执行结果，如果没有执行完毕会等待执行完毕后，获取结果
- 缺点：编码复杂一些



### 总结

| 方式             | 优点                                                                 | 缺点                                                       |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| 继承Thread类     | 编码简单，可以直接使用Thread类中的start方法启动线程                  | 扩展性较差，不能在继续继承其他的类，不能返回线程执行的结果 |
| 实现Runnable接口 | 扩展性强，实现该接口的同时还可以继承其他的类                         | 编程相对复杂，不能返回线程执行的结果                       |
| 实现Callable接口 | 扩展性强，实现该接口的同时还可以继承其他的类，可以得到线程执行的结果 | 编程相对复杂                                               |



## Thread的常用方法

- Thread常用方法：获取线程名称getName()、设置名称setName()、获取当前线程对象currentThread()



1. 当有很多线程执行的时候，我们怎么区分这些线程？

   可以使用Thread的常用方法：getName()、setName()、currentThread()等



```java
package com.api;

public class MyThread extends Thread{
    public MyThread() {
    }

    public MyThread(String name) {
        //为当前线程对象设置名字，送给父类的有参构造器初始化名称
        super(name);
    }

    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName()+"子线程输出");
        }
    }
}

```



```java
package com.api;

public class Demo1 {
    public static void main(String[] args) {
        Thread t1 = new MyThread("1号");
//        t1.setName("1号");
        t1.start();
//        System.out.println(t1.getName());

        Thread t2 = new MyThread("2号");
//        t2.setName("2号");
        t2.start();
//        System.out.println(t2.getName());


        /**
         * 哪个线程执行它，它就代表哪个多线程对象（当前线程对象）
         * 主线程的默认名称就叫main
         */
        Thread m = Thread.currentThread();
        System.out.println(m.getName());
        for (int i = 0; i < 5; i++) {
            System.out.println("main线程输出");
        }
    }
}

```



## Thread类的线程休眠方法



| 方法名称                            | 说明                                             |
| ----------------------------------- | ------------------------------------------------ |
| public static void sleep(long time) | 让当前线程休眠指定的时间后再继续执行，单位为毫秒 |



```java
package com.api;

public class Demo2 {
    public static void main(String[] args) throws Exception {
        for (int i = 0; i < 5; i++) {
            System.out.println("输出"+i);
            if (i == 2){
                System.out.println("睡3秒休息一下~~");
                //让当前线程进入休眠状态
                Thread.sleep(3000);
            }
        }
    }
}

```



### 总结

Thread常用方法、构造器

| 方法名称                                                                                                                    | 说明                                                                  |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| String getName()                                                                                                            | 获取线程当前的名称，默认线程名称为Thread-索引                         |
| void setName(String name)                                                                                                   | 设置线程名称                                                          |
| public static Thread currentThread()     例如：如果在main方法中写：Thread m = Thread.currentThread(); m就代表main方法的线程 | 返回对当前正在执行的线程对象的引用。<br/>返回值：当前正在执行的线程。 |
| public static void sleep(long time)                                                                                         | 让线程休眠指定的时间，单位毫秒                                        |
| public void run()                                                                                                           | 线程任务方法                                                          |
| punlic void start()                                                                                                         | 线程启动方法                                                          |

| 构造器                                     | 说明                                       |
| ------------------------------------------ | ------------------------------------------ |
| public Thread(String name)                 | 可以设置当前线程指定的名称                 |
| public Thread(Runnable target)             | 把Runnable对象交给线程对象                 |
| public Thread(Runnable target,String name) | 把Runnable对象交给线程对象，并指定线程名称 |





## 线程安全

### 线程安全是什么、方式的原因

- 多个线程**同时**操作同一个**共享资源**的时候，可能会出现**业务（比如修改数据）**安全问题，称为线程安全问题



#### 取钱模型

- 需求：小明和小红是一对夫妻，他们有一个共同的账户，余额是10万元
- 如果小明和小红同时来取钱，而且2人都需要取钱10万元，可能出现什么问题？



#### 模拟线程安全问题：

```java
package com.thread_safe;

public class Account {
    private String cardId;
    private double money;

    public Account() {
    }

    public Account(String cardId, double money) {
        this.cardId = cardId;
        this.money = money;
    }
    /**
     * 小明 小红 取钱
     * @param money
     */
    public void drawMoney(double money) {
        //1、获取是谁来取钱
        String name = Thread.currentThread().getName();
        //2、判断账户余额
        if (this.money >= money){
            //2、取钱
            System.out.println(name + "取钱成功：" + money);
            //3、更新余额
            this.money -= money;
            System.out.println(name + "取钱后剩余：" + this.money);
        }else {
            //余额不足
            System.out.println(name + "余额不足");
        }
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }


}

```

```java
package com.thread_safe;

/**
 * 取钱的线程类
 */
public class DrawThread extends Thread{
    private Account account;
    public DrawThread(Account account,String name){
        super(name);
        this.account = account;
    }
    @Override
    public void run() {
        //取钱
        account.drawMoney(100000);

    }
}

```

```java
package com.thread_safe;

/**
 * 模拟取钱案例
 */
public class Demo1 {
    public static void main(String[] args) {
        //1、定义线程类，创建一个共享的账户对象
        Account account = new Account("001",100000);

        //2、创建两个线程对象，代表小明和小红同时进来了
        new DrawThread(account,"小明").start();
        new DrawThread(account,"小红").start();
    }
}

```

输出结果：

小红取钱成功：100000.0
小红取钱后剩余：0.0
小明取钱成功：100000.0
小明取钱后剩余：-100000.0



线程安全问题发生的原因是什么？

- 多个线程同时访问同一个共享资源且存在修改资源的时候，可能会出现线程安全问题



## 线程同步

- 为了解决线程安全问题

1. 取钱案例出现的问题原因

   多个线程同时执行，发现账户余额是足够的

2. 如何解决？

   - 让多个线程实现先后依次访问共享资源，这样就解决了安全问题（一起进入账户，然后依次访问，排队）



### 线程同步核心思想

- 加锁，把共享资源进行上锁，每次只能一个人进入访问，完毕以后进行解锁，然后其他线程才能进来



### 方式一：同步代码块

- 作用：把出现线程安全问题的核心代码给上锁
- 原理：每次只能一个线程进入，执行完毕后自动解锁，其他线程才可以进来执行



```java
synchronized ("lock") {
            //2、判断账户余额
            if (this.money >= money){
                //2、取钱
                System.out.println(name + "取钱成功：" + money);
                //3、更新余额
                this.money -= money;
                System.out.println(name + "取钱后剩余：" + this.money);
            }else {
                //余额不足
                System.out.println(name + "余额不足");
            }
        }
```



### 锁对象要求

- 理论上：锁对象只要对于当前同时执行的线程来说是同一个对象即可



#### 锁对象用任意唯一的对象好不好呢？

- 不好，因为会影响到其他无关线程的执行



#### 锁对象的规范要求

- 规范：**建议使用共享资源作为锁对象**
- 对于实例方法建议使用this作为锁对象
- 对于静态方法建议使用字节码（类名.class）对象作为锁对象

```java
synchronized (this) {
            //2、判断账户余额
            if (this.money >= money){
                //2、取钱
                System.out.println(name + "取钱成功：" + money);
                //3、更新余额
                this.money -= money;
                System.out.println(name + "取钱后剩余：" + this.money);
            }else {
                //余额不足
                System.out.println(name + "余额不足");
            }
        }
```

![image-20220811124659879](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111246973.png)



### 方式二：同步方法

- 作用：把出现线程安全问题的核心方法给上锁
- 原理：每次只能一个线程进入，执行完毕以后自动解锁，其他线程才可以进来执行



```java
/**
     * 小明 小红 取钱
     * @param money
     */
    public synchronized void drawMoney(double money) {
        //1、获取是谁来取钱
        String name = Thread.currentThread().getName();


            //2、判断账户余额
            if (this.money >= money){
                //2、取钱
                System.out.println(name + "取钱成功：" + money);
                //3、更新余额
                this.money -= money;
                System.out.println(name + "取钱后剩余：" + this.money);
            }else {
                //余额不足
                System.out.println(name + "余额不足");
            }
        }
```



格式：

```java
public synchronized void run(){//实例方法：同步方法默认用this作为锁的对象。但是代码要高度面向对象
        
        }
public synchronized static void run1(){//静态方法，同步方法默认用类名.class作为锁对象
        
        }
```





#### 同步方法底层原理

- 同步方法其实底层也是有**隐式锁对象**的，只是锁的范围是整个方法代码块
- 如果方法是**实例方法**：同步方法**默认用this**作为锁的对象。但是代码要高度面向对象
- 如果方法是**静态方法**：同步方法**默认用类名.class**作为锁对象



是同步代码块好还是同步方法好？

- 同步代码块锁的范围更小，同步方法锁的范围更大
- 同步方法可读性方便

![image-20220811125740602](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111257659.png)



### Lock锁

- 为了更清晰的表达如何加锁和释放锁，JDK5以后提供了一个新的锁对象Lock，更加灵活、方便
- Lock锁实现提供比使用synchronized方法和语句可以获得更广泛的锁定操作
- Lock是接口不能直接实例化，这里采用它的实现类ReentrantLock来构建Lock对象

| 方法名称               | 说明                   |
| ---------------------- | ---------------------- |
| Public ReentrantLock() | 获得Lock锁的实现类对象 |

Lock的API

| 方法          | 说明   |
| ------------- | ------ |
| void lock()   | 获得锁 |
| void unlock() | 释放锁 |

```java
private final Lock lock = new ReentrantLock();//final修饰后：锁对象是唯一不可替换的，非常专业
```

```java
			lock.lock();//上锁
        try {
           //上锁的内容
        } finally {
            lock.unlock();//解锁，写在finally中，防止出现bug然后被锁死！！！
        }
```



```java
package com.thread_lock;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Account {
    private String cardId;
    private double money;
    private final Lock lock = new ReentrantLock();//final修饰后：锁对象是唯一不可替换的，非常专业

    public Account() {
    }

    public Account(String cardId, double money) {
        this.cardId = cardId;
        this.money = money;
    }
    /**
     * 小明 小红 取钱
     * @param money
     */
    public void drawMoney(double money) {
        //1、获取是谁来取钱
        String name = Thread.currentThread().getName();


        lock.lock();//上锁
        try {
            //2、判断账户余额
            if (this.money >= money){
                //2、取钱
                System.out.println(name + "取钱成功：" + money);
                //3、更新余额
                this.money -= money;
                System.out.println(name + "取钱后剩余：" + this.money);
            }else {
                //余额不足
                System.out.println(name + "余额不足");
            }
        } finally {
            lock.unlock();//解锁，写在finally中，防止出现bug然后被锁死！！！
        }

    }
    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }
}

```





# 线程通信

什么是线程通信、如何实现？

- 所谓线程通信就是线程间互相发送数据

线程通信常见的形式

- 通过共享一个数据的方式实现
- 根据共享数据的情况决定自己改怎么做，以及通知其他线程怎么做

![image-20220811130657310](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111306357.png)

![image-20220811132950606](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111329677.png)

![image-20220811141019403](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111410608.png)

```java
package day06.thread_comunication;

public class Account {
    private String cardId;
    private double money;

    public Account() {
    }

    public Account(String cardId, double money) {
        this.cardId = cardId;
        this.money = money;
    }


    /**
     * 父亲们存钱 同步方法
     * 亲爹 干爹 岳父 存钱
     *
     * @param money
     */
    public synchronized void depositMoney(double money) {
        try {
            String name = Thread.currentThread().getName();
            if (this.money == 0) {
                //            存钱
                this.money += money;
                System.out.println(name + "存钱" + money + "成功！余额是:" + this.money);
                this.notifyAll();
                this.wait();

            } else {
                this.notifyAll();
                this.wait();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


    }

    /**
     * 孩子们取钱 同步方法
     * 小明和小红取钱
     *
     * @param money
     */
    public synchronized void drawMoney(double money) {
        try {
            String name = Thread.currentThread().getName();
            if (this.money >= money) {
                //            取钱
                this.money -= money;
                System.out.println(name + "来取钱" + money + "成功！余额是:" + this.money);
                //            唤醒正在此对象的监视器上等待的所有线程
                this.notifyAll();//唤醒所有线程
                this.wait();//让当前线程进入等待，并且释放占用的锁，直到另一个线程调用notify方法或者notifyAll方法
            } else {
//                钱不够,唤醒其他线程(期望唤醒父亲们存钱)
                this.notifyAll();
                this.wait();//让当前线程进入等待，并且释放占用的锁，直到另一个线程调用notify方法或者notifyAll方法
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


    }


    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }


}

```

```java
package day06.thread_comunication;

/**
 * 存钱线程
 */
public class DepositThread extends Thread {
    private Account account;

    public DepositThread(Account account, String name) {
        super(name);
        this.account = account;
    }

    @Override
    public void run() {
        while (true) {
            account.depositMoney(100000);
            try {
                Thread.sleep(2000);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}

```

```java
package day06.thread_comunication;

/**
 * 取钱线程
 */
public class DrawThread extends Thread {
    private Account account;

    public DrawThread(Account account, String name) {
        super(name);
        this.account = account;
    }

    @Override
    public void run() {
        while (true) {
            account.drawMoney(100000);
            try {
                Thread.sleep(3000);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}

```

```java
package day06.thread_comunication;

/**
 * 了解线程通信
 */
public class ThreadDemo {
    public static void main(String[] args) {
        Account account = new Account("ICBC-111", 0);

        new DrawThread(account, "小明").start();
        new DrawThread(account, "小红").start();

        new DepositThread(account, "亲爹").start();
        new DepositThread(account, "干爹").start();
        new DepositThread(account, "岳父").start();

    }
}

```

# 线程池[重点]

## 概述

- 线程池就是一个可以复用线程的技术

不使用线程池的问题

- 如果用户每发起一个请求，后台就创建一个新的线程来处理，下次新任务来了又要创建新线程，而创建新线程的开销是很大的，这样会严重影响系统的性能

![image-20220811141640927](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111416980.png)





## 线程池实现的API、参数说明

### 谁代表线程池？

- JDK5.0起提供了代表线程池的接口：ExecutorService

![image-20220811141756349](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111417394.png)



### 如何得到线程对象？

- 方式一：使用ExecutorService的实现类ThreadPoolExecutor自己创建一个线程对象【重要】
- 方式二：使用Executor（线程池工具类）调用方法返回不同特点的线程池对象



### ThreadPoolExecutor构造器的参数说明

```java
public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue,
                              ThreadFactory threadFactory,
                              RejectedExecutionHandler handler)
```

参数一：指定线程池的线程数量（核心线程）：corePoolSize-------------------------》不能小于0

参数二：指定线程池可以支持的最大线程数量：maximumPoolSize-----------------》最大数量>=核心数量

参数三：指定临时线程的最大存活时间：keepAliveTime--------------------------------》不能小于0

参数四：指定存活时间的单位（秒、分、时、天）：unit--------------------------------》时间单位

参数五：指定任务队列：workQueue----------------------------------------------------------》不能为null

参数六：指定用哪个线程工厂创建线程：threadFactory---------------------------------》不能为null

参数七：指定线程忙、任务慢的时候，新任务来了怎么办：handler-----------------》不能为null



## 线程池常见面试题

### 临时线程什么时候创建？

- **新任务提交时发现核心线程都在忙，而且任务队列也排满了！并且还可以创建临时线程，此时才会创建临时线程**

### 什么时候会开始拒绝任务？

- **核心线程和临时线程都在忙，而且任务队列也满了！！新任务过来的时候才会开始任务拒绝**



## 线程池处理Runnable任务

ThreadPoolExecutor创建线程池对象实例

```java
ExecutorService pools = new ThreadPoolExecutor(3,//指定线程池的线程数量（核心线程）
                                               5,//指定线程池可以支持的最大线程数量
                                               8,//指定临时线程的最大存活时间
                                               TimeUnit.SECONDS,//指定存活时间的单位
                                               new ArrayBlockingQueue<>(6),//指定任务队列
                                               Executor.defaultThreadFactory(),//指定用哪个线程工厂创建线程
                                               new ThreadPoolExecutor.AbortPolicy());//指定线程忙、任务慢的时候，新任务来了怎么办
```

ExecutorService的常用方法

| 方法名称                               | 说明                                                               |
| -------------------------------------- | ------------------------------------------------------------------ |
| void **execute**(Runnable command)     | 执行任务/命令，没有返回值，一般用来执行Runnable任务                |
| Future< T > submit(Callable< T > task) | 执行任务，返回未来任务对象获取线程结果，一般拿来执行 Callable 任务 |
| void shutdown()                        | 等待任务执行完毕后关闭线程池                                       |
| List < Runnable > shutdownNow()        | 立刻关闭，停止正在执行的任务，并返回队列中未执行的任务             |

![image-20220811145535092](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111455152.png)



```java
package com.threadpool;

public class MyRunnable implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName()+"输出了：HelloWorld==》"+i);
        }
        try {
            System.out.println(Thread.currentThread().getName()+"本任务与线程绑定了，线程进入休眠了。。。");
            Thread.sleep(1000000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

```

```java
package com.threadpool;

import java.util.concurrent.*;

/**
 * 自定义一个线程池对象，并且测试其特性
 */
public class ThreadPoolDemo1 {
    public static void main(String[] args) {
        //1、创建线程池对象
        /**
         * public ThreadPoolExecutor(int corePoolSize,
         *                               int maximumPoolSize,
         *                               long keepAliveTime,
         *                               TimeUnit unit,
         *                               BlockingQueue<Runnable> workQueue,
         *                               ThreadFactory threadFactory,//默认线程工厂：Executors.defaultThreadFactory()
         *                               RejectedExecutionHandler handler)
         */
        ExecutorService pool = new ThreadPoolExecutor(3,5,
                6, TimeUnit.SECONDS,new ArrayBlockingQueue<>(5), Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.AbortPolicy());

        //2、给任务，线程池处理
        Runnable target = new MyRunnable();
        pool.execute(target);//线程1
        pool.execute(target);//线程2
        pool.execute(target);//线程3
        //核心线程执行上面的任务，下面的任务进入队列等待，（5个任务队列，当等待的线程超过5的时候，才会启动临时线程）
        pool.execute(target);//队列线程1
        pool.execute(target);//队列线程2
        pool.execute(target);//3
        pool.execute(target);//4
        pool.execute(target);//5（队列线程满了而且核心线程还被占用着！）
        //启动临时线程！！！
        pool.execute(target);//临时线程1（线程4）
        pool.execute(target);//临时线程2（线程5）达到最大线程数量
        //满了，不创建，拒绝策略被触发
        //pool.execute(target);
        /**
         * 异常：
         * RejectedExecutionException:
         * [Running, pool size = 5, active threads = 5, queued tasks = 5, completed tasks = 0]
         * 执行，      池子数量 = 5 ， 执行的线程 = 5 ，      队列任务 = 5 ，    完成的任务 = 0
         */
        //关闭线程池（开发中一般不会使用）
        //pool.shutdownNow();//立即关闭，即使任务没有完成，会丢失任务的
        pool.shutdown();//会等待全部任务执行完毕之后再关闭

    }
}

```



## 线程处理Callable任务

```java
package com.threadpool;

import java.util.concurrent.*;

/**
 * 自定义一个线程池对象，并且测试其特性
 */
public class ThreadPoolDemo2 {
    public static void main(String[] args) {
        //1、创建线程池对象
        /**
         * public ThreadPoolExecutor(int corePoolSize,
         *                               int maximumPoolSize,
         *                               long keepAliveTime,
         *                               TimeUnit unit,
         *                               BlockingQueue<Runnable> workQueue,
         *                               ThreadFactory threadFactory,//默认线程工厂：Executors.defaultThreadFactory()
         *                               RejectedExecutionHandler handler)
         */
        ExecutorService pool = new ThreadPoolExecutor(3,5,
                6, TimeUnit.SECONDS,new ArrayBlockingQueue<>(5), Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.AbortPolicy());
        Future<String> submit1 = pool.submit(new MyCallable(100));
        Future<String> submit2 = pool.submit(new MyCallable(200));
        Future<String> submit3 = pool.submit(new MyCallable(300));
        Future<String> submit4 = pool.submit(new MyCallable(400));
        Future<String> submit5 = pool.submit(new MyCallable(500));
        try {
            System.out.println(submit1.get());
            System.out.println(submit2.get());
            System.out.println(submit3.get());
            System.out.println(submit4.get());
            System.out.println(submit5.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }


    }
}

```





## Executors工具类实现线程池

### Executors得到线程对象的常用方法

- Executor：线程池工具类通过调用方法返回不同类型的线程池对象

| 方法名称                                                                        |                                                                                                |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| public static ExecutorService newCachedThreadPool()                             | 线程数量随着任务的增加而增加，如果线程任务执行完毕且空闲了一段时间则会被回收掉                 |
| **public static ExecutorService newFixedThreadPool(int nThreads)**              | 创建固定线程数量的线程池，如果某个线程因为执行异常而结束，那么线程池就会补充一个新的线程代替他 |
| public static ExecutorService newSingleThreadExecutor()                         | 创建只有一个线程的线程对象，如果该线程出现异常而结束，那么线程池会补充一个新的线程池           |
| public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) | 创建一个线程池，可以实现在给定的延迟后运行任务，或者定期执行任务                               |

注意：**Executors的底层也是基于线程池的实现类ThreadPoolExecutor创建线程池对象的**

```java
package com.executors;

import com.threadpool.MyRunnable;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 使用Executors的工具方法直接得到一个线程池对象
 */
public class ThreadPoolDemo1 {
    public static void main(String[] args) {

        ExecutorService pool = Executors.newFixedThreadPool(3);
        /**
         * ExecutorService pool = Executors.newFixedThreadPool(3);
         * 源码的做法：就是在内部new了一个ThreadPoolExecutor给了一些参数
         * 核心线程3个，最大线程3个（没有临时线程），没有空闲时间（都是不死线程，没有临时线程，不需要配置空闲时间），任务队列没有限制任务数量
         * public static ExecutorService newFixedThreadPool(int nThreads) {
         *         return new ThreadPoolExecutor(nThreads, nThreads,
         *                                       0L, TimeUnit.MILLISECONDS,
         *                                       new LinkedBlockingQueue<Runnable>());
         *     }
         */
        pool.execute(new MyRunnable());
        pool.execute(new MyRunnable());
        pool.execute(new MyRunnable());
        //任务队列不受控制
        pool.execute(new MyRunnable());//已经没有多余线程了
        pool.execute(new MyRunnable());//已经没有多余线程了
        pool.execute(new MyRunnable());//已经没有多余线程了
        pool.execute(new MyRunnable());//已经没有多余线程了
        pool.execute(new MyRunnable());//已经没有多余线程了


    }
}

```



### Executors使用可能存在的陷阱

- 大型并发系统环境中使用Executors如果不注意可能会出现系统风险

| 方法名称                                                                        | 存在问题                                                                                                               |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| public static ExecutorService newFixedThreadPool(int nThreads)                  | 允许请求的任务队列长度是Integer.MAX_VALUE，可能出现OOM错误（java.lang.OutOfMemoryError)                                |
| public static ExecutorService newSingleThreadExecutor()                         | 同上                                                                                                                   |
| public static ExecutorService newCachedThreadPool()                             | 创建的线程数量最大上限是Integer.MAX_VALUE，线程数可能会随着任务1:1增长，也可能出现OOM错误（java.lang.OutOfMemoryError) |
| public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) | 同上                                                                                                                   |

![image-20220811151604202](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111516325.png)





# 定时器

- 定时器是一种控制任务延时调用，或者周期调用的技术
- 作用：闹钟、定时邮件发送

## 定时器的实现方式

- 方式一：Timer
- 方式二：ScheduledExecutorService



### Timer定时器(不推荐使用)

| 构造器         | 说明                |
| -------------- | ------------------- |
| public Timer() | 创建Timer定时器对象 |

| 方法                                                        | 说明                                      |
| ----------------------------------------------------------- | ----------------------------------------- |
| public void schedule(TimerTask task,long delay,long period) | 开启一个定时器，按照计划处理TimerTask任务 |

```java
package com.timer;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Timer定时器的使用和了解
 */
public class TimerDemo1 {
    public static void main(String[] args) {
        //1、创建Timer定时器
        Timer timer = new Timer();//定时器本身就是一个单线程
        //2、调用方法来处理定时任务
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName()+"执行一次~~~");
            }
        },3000,2000);
    }
}

```



Timer定时器的特点和存在的问题

1. Timer是单线程，处理多个任务按照顺序执行，存在延时与设置定时器的时间有出入
1. 可能因为其中某个任务的异常使Timer线程死掉，从而影响后续任务执行





### ScheduledExecutorService定时器

- ScheduledExecutorService是JDK1.5中引入的并发包，目的是为了弥补Timer的缺陷，ScheduledExecutorService内部为线程池

| Executors的方法                                                                 | 说明           |
| ------------------------------------------------------------------------------- | -------------- |
| public staitc ScheduledExecutorService newScheduledThreadPool(int corePoolSize) | 得到线程池对象 |

| ScheduledExecutorService的方法                                                                                   | 说明         |
| ---------------------------------------------------------------------------------------------------------------- | ------------ |
| public ScheduledFuture<?> **scheduledAtFixedRate**(Runnable command,long initialDelay,long period,TimeUnit unit) | 周期调度方法 |

#### ScheduledExecutorService的优点

- 基于线程池，某个任务的执行情况下不会影响其他定时任务的执行

```java
package com.timer;

import java.util.Date;
import java.util.TimerTask;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class TimerDemo2 {
    public static void main(String[] args) {
        //1、创建ScheduledExecutorService线程池，做定时器
        ScheduledExecutorService pool = Executors.newScheduledThreadPool(3);

        //2、开启定时器任务
        pool.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName()+"执行输出：AAA"+"====>"+new Date());
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },0,2, TimeUnit.SECONDS);
        //2、开启定时器任务
        pool.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName()+"执行输出：BBB"+"====>"+new Date());
            }
        },0,2, TimeUnit.SECONDS);

    }
}

```

![image-20220811153337574](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111533636.png)



## 线程的并发与并行

### 并发与并行

- 正在运行的程序（软件）就是一个独立的进程，线程是属于进程的，**多个线程其实是并发与并行同时进行的**

### 并发的理解

- CPU同时处理线程的数量有限
- CPU会轮询为系统的每个线程服务，由于CPU切换的速度很快，给我们的感觉这些线程在同时执行，这就是并发

### 并行的理解

- 在同一时刻上，同时有多个线程在被CPU处理并执行

![image-20220811153946533](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111539592.png)





## 线程的生命周期

### 状态

- 线程的状态：也就是线程从生到死的过程，以及中间经历的各种状态及状态转换
- 理解线程的状态有利于提升并发编程的理解能力

### Java线程的状态

- Java总共定义了6种状态
- 6种状态都定义在Thread类的内部枚举类中

```java
public enum State {
        
        NEW,//新建状态

        RUNNABLE,//可运行状态

        BLOCKED,//阻塞状态（锁被占用）

        WAITING,//无限等待状态

        TIMED_WAITING,//计时等待

        TERMINATED;//死亡状态
    }
```

![image-20220811155157442](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111551540.png)

![image-20220811155235160](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111552229.png)

![image-20220811155328547](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111553622.png)



