
# 网络编程

## 什么是网络编程？

- 网络编程可以让程序与网络上的其他设备中的程序进行数据交换

## 网络体系基本模式

- 常见的通信模式有如下2中形式：Client-Server（CS）、Browser/Server（BS）

![image-20220811155616271](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111556332.png)

![image-20220811155720260](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111557302.png)



## 网络通信的三要素

### 三要素概述、要素一：IP地址

#### 实现网络编程的关键三要素

- IP地址：设备在网络中的地址，是唯一的标识
- 端口：应用程序在设备中的唯一标识
- 协议：数据在网络中传输的规则，常见的协议有UDP协议和TCP协议

![image-20220811161144990](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111611030.png)



#### IP地址

- IP：全称”互联网协议地址”，是分配给上网设备的唯一标志
- 常见IP分为：IPv4和IPv6

![image-20220811161447089](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111614126.png)

![image-20220811161534805](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111615868.png)

![image-20220811162933624](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111629694.png)



![image-20220811162903436](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208111629502.png)



#### IP地址形式

- 公网地址、私有地址（局域网使用）
- 192.168. 开头的就是常见的局域网地址，范围为：192.168.0.0——192.168.255.255

#### IP常用命令

- ipconfig：查看本机IP (Mac:```ifconfig```)
- ping IP地址：检查网络是否连通

#### 特殊IP

- 本机IP：127.0.0.1或者localhost：称为回送地址也可以称本地回环地址，只会寻找当前所在的本机



### IP地址操作类-InetAddress

- 此类表示Internet协议（IP）地址

#### InetAddress API如下

| 名称                                             | 说明                                               |
| ------------------------------------------------ | -------------------------------------------------- |
| public static InetAddress getLocalHost()         | 返回本主机的地址对象                               |
| public static InetAddress getByName(String host) | 得到指定主机的IP地址对象，参数是域名或者IP地址     |
| public String getHostName()                      | 获取此IP地址的主机名                               |
| public String getHostAddress()                   | 返回IP地址字符串                                   |
| public boolean isReachable(int timeout)          | 在指定的毫秒内连通该IP地址对象的主机，连通返回true |

```java
package com.inetAddress;


import java.net.InetAddress;

public class InetAddressDemo1 {
    public static void main(String[] args) throws Exception {
        //1、获取本机IP地址
        InetAddress ip1 = InetAddress.getLocalHost();
//        System.out.println(ip1);
        System.out.println(ip1.getHostName());//获取主机名
        System.out.println(ip1.getHostAddress());//获取IP

        //2、获取域名的IP对象
        InetAddress ip2 = InetAddress.getByName("www.baidu.com");
        System.out.println(ip2.getHostName());
        System.out.println(ip2.getHostAddress());

        //3、获取公网IP对象
        InetAddress ip3 = InetAddress.getByName("36.152.44.96");
        System.out.println(ip3.getHostName());
        System.out.println(ip3.getHostAddress());

        //4、判断是否能互通 ping 5s之内测试
        System.out.println(ip3.isReachable(5000));
    }
}

```



### 端口号

- 标识正在计算机设备上运行的程序（进程），被规定为一个16位的二进制，范围是0——65535
- 一个设备不可以出现两个端口号一样，会出现端口号冲突的
- ip地址相当于酒店的地址而端口号相当于酒店的房间

![image-20220812094948778](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208120949830.png)





### 协议

#### 通信协议

- 连接和通信数据的规则被称为网络通信协议

#### 网络通信协议有两种参考模型

##### 传输层的2个常见协议

- TCP：传输控制协议
- UDP：用户数据报协议

##### TCP协议特点

- 使用TCP协议，必须双方先建立连接，**它是一种面向连接的可靠通信协议**
- 传输前，**采用三次握手**方式建立连接，所以是可靠的
- 在连接中可进行大数据的传输
- 连接、发送数据都需要确认，且传输完毕后，还需释放已经建立的连接

##### TCP协议通信场景

- 对信息安全要求较高的场景：例如：文件下载，金融等数据通信



#### TCP三次握手确立连接

1. 首先客户端向服务器发出连接请求（问服务器在吗？）等待服务器确认
2. 服务器向客户端返回了一个响应（在哦）告诉客户端收到了请求
3. 然后客户端向服务器再次发出确认信息，最后建立连接

双方建立信任的过程（确认收发信息都没有问题，首先客户端发请求，服务器收请求，服务器发响应，客户端收响应，客户端再次向服务端发出确认信息，建立连接）

![image-20220812095033346](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208120950383.png)





#### TCP四次挥手断开连接

1. 客户端向服务器发出取消连接请求
2. 服务器向客户端返回一个响应，表示收到客户端取消请求（让客户端稍等一会）
3. 服务器将最后的数据处理完毕，然后再向客户端发出确认取消信息
4. 客户端再次发送确认消息，连接取消

![image-20220812095202456](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208120952511.png)





##### UDP协议

- UDP是一种无连接、不可靠传输的协议
- 将数据源IP、目的地IP和端口封装成数据包，不需要建立连接
- 每个数据包的大小限制在64KB内
- 发送不管对方是否准备好，接收方收到也不确认，所以是不可靠的
- 可以广播发送，发送数据结束时无需释放资源，开销小，速度快

##### UDP协议通信场景

- 语音通话，视频会话等





## UDP通信

### 快速入门

#### DatagramPacket：数据包对象（韭菜盘子）

| 构造器                                                                    | 说明                                                                                                                               |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| public DatagramPacket(byte[] buf,int length,InetAddress address,int port) | 创建发送端数据包对象：buf：要发送的内容，字节数组；length：要发送内容的字节长度；address：接收端的IP地址对象；port：接收端的端口号 |
| public DatagramPacket(byte[] buf,int length)                              | 创建接收的数据包对象：buf：用来存储接收的内容；length：能够接收的内容长度                                                          |

#### DatagramSocket：发送端和接收端对象（人）

| 构造器                          | 说明                                             |
| ------------------------------- | ------------------------------------------------ |
| public DatagramSocket()         | 创建发送端的Socket对象，系统会随机分配一个端口号 |
| public DatagramSocket(int port) | 创建接收端的Socket对象并指定端口号               |

#### DatagramSocket类成员方法

| 方法                                  | 说明       |
| ------------------------------------- | ---------- |
| public void send(DatagramSocket dp)   | 发送数据包 |
| public void receive(DatagramSocket p) | 接收数据包 |

```java
package com.udp;

import java.net.DatagramPacket;
import java.net.DatagramSocket;

/**
 * 接收端 （服务端）
 */
public class ServerDemo2 {
    public static void main(String[] args) throws Exception {
        System.out.println("========服务端启动=========");
        //1、创建接收端对象，注册端口（人）
        DatagramSocket socket = new DatagramSocket(8888);

        //2、创建一个数据包对象接收数据（韭菜盘子）
        byte[] buffer = new byte[1024 * 64];//64KB
        DatagramPacket packet = new DatagramPacket(buffer,buffer.length);

        //3、等待接收数据即可
        socket.receive(packet);

        //4、取出数据即可（读多少，取出多少）
        int length = packet.getLength();
        String rs = new String(buffer,0,length);
        System.out.println("收到了："+rs);
        // 获取发送端的IP和端口
        String ip = packet.getSocketAddress().toString();
        System.out.println("对方地址："+ip);
        int port = packet.getPort();
        System.out.println("对方端口"+port);


        socket.close();//关闭对象资源

    }
}

```

```java
package com.udp;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

/**
 * 发送端  一发  一收 （客户端）
 */
public class ClientDemo1 {
    public static void main(String[] args) throws Exception {
        System.out.println("========客户端启动=========");

        //1、创建发送端对象，发送端自带默认的端口号（人）
        DatagramSocket socket = new DatagramSocket(6666);

        //2、创建一个数据包对象封装对象（韭菜盘子）
        /**
         * public DatagramPacket(byte buf[], int offset, int length,
         *                           InetAddress address, int port)
         * 参数一：封装要发送的数据（韭菜）
         * 参数二：发送数据的大小
         * 参数三：服务端的IP地址
         * 参数四：服务端的端口
         *
         *
         */
        byte[] buffer = "我是一颗快乐的韭菜".getBytes();
        DatagramPacket packet = new DatagramPacket(buffer,buffer.length,
                InetAddress.getLocalHost(),8888);

        //3、发送数据
        socket.send(packet);

        socket.close();//关闭对象资源

    }
}

```



### 多发多收

```java
package com.udp2;

import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class ServerDemo2 {
    public static void main(String[] args) throws Exception {
        System.out.println("========服务端启动=========");
        //1、创建接收端对象，注册端口（人）
        DatagramSocket socket = new DatagramSocket(8888);

        //2、创建一个数据包对象接收数据（韭菜盘子）
        byte[] buffer = new byte[1024 * 64];//64KB
        DatagramPacket packet = new DatagramPacket(buffer,buffer.length);

        while (true) {
            //3、等待接收数据即可
            socket.receive(packet);

            //4、取出数据即可（读多少，取出多少）
            int length = packet.getLength();
            String rs = new String(buffer,0,length);
            if ("exit".equals(rs)){
                System.out.println("客户离线！");
                socket.close();
                break;
            }
            System.out.println("收到了来自："+packet.getAddress() + "，对方端口是："+packet.getPort()+"的消息："+rs);
            // 获取发送端的IP和端口
        }

    }
}

```

```java
package com.udp2;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Scanner;

/**
 * 发送端：多发 多收
 */
public class ClientDemo1 {
    public static void main(String[] args) throws Exception {
        System.out.println("========客户端启动=========");

        //1、创建发送端对象，发送端自带默认的端口号（人）
        DatagramSocket socket = new DatagramSocket(6666);

        //2、创建一个数据包对象封装对象（韭菜盘子）
        /**
         * public DatagramPacket(byte buf[], int offset, int length,
         *                           InetAddress address, int port)
         * 参数一：封装要发送的数据（韭菜）
         * 参数二：发送数据的大小
         * 参数三：服务端的IP地址
         * 参数四：服务端的端口
         *
         *
         */
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("请说：");
            String msg = scanner.nextLine();

            byte[] buffer = msg.getBytes();
            DatagramPacket packet = new DatagramPacket(buffer,buffer.length,
                    InetAddress.getLocalHost(),8888);

            //3、发送数据
            socket.send(packet);
            if ("exit".equals(msg)){
                System.out.println("离线成功！");
                socket.close();
                scanner.close();
                break;
            }
        }


    }
}

```



### 广播、组播

#### UDP的三种通信方式

- 单播：单台主机与单台主机之间的通信
- 广播：当前主机与所在网络中的所有主机通信
- 组播：当前主机与选定的一组主机的通信

#### UDP如何实现广播

- 使用广播地址：255.255.255.255
- 具体操作：
  1. **发送端**发送的数据包的目的地写的是广播地址，且指定端口。（255.255.255.255,9999）
  2. 本机所在网段的其他主机的程序只要匹配端口成功就可以收到消息了。（9999）

#### UDP如何实现组播

- 使用组播地址：224.0.0.0——239.255.255.255
- 具体操作：
  1. 发送端的数据包的目的地是组播IP（例如 ：244.0.1.1，端口：9999）
  2. 接收端必须绑定该组播IP（224.0.1.1），端口还要对应发送的目的端口9999，这样即可接收该组播消息
  3. DatagramSocket的子类MulticastSocket可以在接收端绑定组播IP



## TCP通信

### 客户端

#### Socket

| 构造器                             | 说明                                                           |
| ---------------------------------- | -------------------------------------------------------------- |
| public Socket(String host,int pot) | 创建发送端的Socket对象与服务器连接，参数为服务端重写的IP和端口 |

#### Socket类成员方法

| 方法                           | 说明               |
| ------------------------------ | ------------------ |
| OutputStream getOutputStream() | 获得字节输出流对象 |
| InputStream getInputStream()   | 获得字节输入流对象 |

```java
package com.socket1;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.Socket;

/**
 * 完成Socket网络编程入门案例的客户端开发
 */
public class ClientDemo1 {
    public static void main(String[] args) {
        //1、创建Socket通信管道请求与服务器的连接
        //public Socket(String host,int port)
        //参数一：服务端的地址；参数二：服务端的端口号
        try {
            Socket socket = new Socket("localhost",7777);

            //2、从socket通信管道中得到一个字节输出流，负责发送数据
            OutputStream os = socket.getOutputStream();

            //3、把低级的字节流包装成打印流
            PrintStream ps = new PrintStream(os);

            //4、发送消息
            ps.print("我是TCP的客户端，我已经与你对接，发出要求，约吗？");
            ps.flush();//刷新

            //关闭资源（正常情况不用关闭，除非用户点击离线才进行关闭）
//            socket.close();//可能会出现bug：消息还没有发完，发一半，就关闭了资源

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

### 服务端

#### ServerSocket

| 构造器                        | 说明           |
| ----------------------------- | -------------- |
| public ServerSocket(int port) | 注册服务端端口 |

#### ServerSocket类成员方法

| 方法                   | 说明                                                                         |
| ---------------------- | ---------------------------------------------------------------------------- |
| public Socket accept() | 等待接收客户端的Socket通信连接，连接成功返回Socket对象与客户端建立端到端通信 |

```java
package com.socket2;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 目标：开发Socket网络编程入门代码的服务端，实现接收消息
 */
public class ServerDemo2 {
    public static void main(String[] args) {
        try {
            System.out.println("======服务端启动成功=====");
            //1、注册端口
            ServerSocket serverSocket = new ServerSocket(7777);
            //2、调用accept方法，等待接收客户端的Socket连接请求，建立Socket通信管道
            Socket socket = serverSocket.accept();
            //3、从Socket通信管道中得到一个字节输入流
            InputStream is = socket.getInputStream();
            //4、把字节输入流包装成缓冲字节输入流，进行消息的接收
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            //5、按照行读取消息
            String msg;
            while ((msg = br.readLine()) != null){
                System.out.println(socket.getRemoteSocketAddress()+"说了:"+msg);
                if ("exit".equals(msg)){
                    br.close();
                    is.close();
                    socket.close();
                    break;
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

```java
package com.socket2;

import java.io.OutputStream;
import java.io.PrintStream;
import java.net.Socket;
import java.util.Scanner;

/**
 * 完成Socket网络编程入门案例的客户端开发
 */
public class ClientDemo1 {
    public static void main(String[] args) {
        //1、创建Socket通信管道请求与服务器的连接
        //public Socket(String host,int port)
        //参数一：服务端的地址；参数二：服务端的端口号
        try {
            Socket socket = new Socket("localhost",7777);

            //2、从socket通信管道中得到一个字节输出流，负责发送数据
            OutputStream os = socket.getOutputStream();

            //3、把低级的字节流包装成打印流
            PrintStream ps = new PrintStream(os);

            //4、发送消息
            Scanner scanner = new Scanner(System.in);
            while (true) {
                System.out.println("请说：");
                String msg = scanner.nextLine();
                ps.println(msg);
                ps.flush();//刷新
                if ("exit".equals(msg)){
                    ps.close();
                    os.close();
                    socket.close();
                    break;
                }
            }

            //关闭资源（正常情况不用关闭，除非用户点击离线才进行关闭）
//            socket.close();//可能会出现bug：消息还没有发完，发一半，就关闭了资源

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```



##### 本案例的多发多收，是否可以同时接收多个客户端的消息？

- 不可以
- 因为服务端现在只有一个线程，只能与一个客户进行通信



#### TCP通信-同时接收多个客户端消息[重点]

##### 如何才可以让服务端可以处理多个客户端的通信需求？

- 引入多线程

```java
package com.socket3;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 目标：实现服务端可同时处理多个客户端的消息
 */
public class ServerDemo2 {
    public static void main(String[] args) {
        try {
            System.out.println("======服务端启动成功=====");
            //1、注册端口
            ServerSocket serverSocket = new ServerSocket(7777);
            //a、定义一个死循环，不断的由主线程负责不断的接收客户端的Socket管道
            while (true) {
                //2、每接收到一个客户端的Socket管道，交给一个独立的子线程类负责读取消息
                Socket socket = serverSocket.accept();
                //3、开始创建独立线程处理Socket管道
                ServerReaderThread serverReaderThread = new ServerReaderThread(socket);
                serverReaderThread.start();

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

```java
package com.socket3;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;

public class ServerReaderThread extends Thread{
    private Socket socket;
    public ServerReaderThread(Socket socket){
        this.socket = socket;
    }
    @Override
    public void run() {
        try {
            //3、从Socket通信管道中得到一个字节输入流
            InputStream is = socket.getInputStream();
            //4、把字节输入流包装成缓冲字节输入流，进行消息的接收
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            //5、按照行读取消息
            String msg;
            while ((msg = br.readLine()) != null){
                System.out.println(socket.getRemoteSocketAddress()+"说了:"+msg);
                if ("exit".equals(msg)){
                    br.close();
                    is.close();
                    socket.close();
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

```java
package com.socket3;

import java.io.OutputStream;
import java.io.PrintStream;
import java.net.Socket;
import java.util.Scanner;

/**
 * 完成Socket网络编程入门案例的客户端开发
 */
public class ClientDemo1 {
    public static void main(String[] args) {
        //1、创建Socket通信管道请求与服务器的连接
        //public Socket(String host,int port)
        //参数一：服务端的地址；参数二：服务端的端口号
        try {
            Socket socket = new Socket("localhost",7777);

            //2、从socket通信管道中得到一个字节输出流，负责发送数据
            OutputStream os = socket.getOutputStream();

            //3、把低级的字节流包装成打印流
            PrintStream ps = new PrintStream(os);

            //4、发送消息
            Scanner scanner = new Scanner(System.in);
            while (true) {
                System.out.println("请说：");
                String msg = scanner.nextLine();
                ps.println(msg);
                ps.flush();//刷新
                if ("exit".equals(msg)){
                    ps.close();
                    os.close();
                    socket.close();
                    break;
                }
            }

            //关闭资源（正常情况不用关闭，除非用户点击离线才进行关闭）
//            socket.close();//可能会出现bug：消息还没有发完，发一半，就关闭了资源

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```



#### TCP通信模型：线程池优化

```java
package com.socket4;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;

public class ServerReaderRunnable implements Runnable{
    private Socket socket;
    public ServerReaderRunnable(Socket socket){
        this.socket = socket;
    }
    @Override
    public void run() {
        try {
            //3、从Socket通信管道中得到一个字节输入流
            InputStream is = socket.getInputStream();
            //4、把字节输入流包装成缓冲字节输入流，进行消息的接收
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            //5、按照行读取消息
            String msg;
            while ((msg = br.readLine()) != null){
                System.out.println(socket.getRemoteSocketAddress()+"说了:"+msg);
                if ("exit".equals(msg)){
                    br.close();
                    is.close();
                    socket.close();
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

```

```java
package com.socket4;


import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.*;

/**
 * 目标：实现服务端可同时处理多个客户端的消息
 */
public class ServerDemo2 {
    //使用静态变量
    private static ExecutorService pool = new ThreadPoolExecutor(3,5,
            6, TimeUnit.SECONDS,new ArrayBlockingQueue<>(2), Executors.defaultThreadFactory(),
            new ThreadPoolExecutor.AbortPolicy());
    public static void main(String[] args) {
        try {
            System.out.println("======服务端启动成功=====");
            //1、注册端口
            ServerSocket serverSocket = new ServerSocket(7777);
            //a、定义一个死循环，不断的由主线程负责不断的接收客户端的Socket管道
            while (true) {
                //2、每接收到一个客户端的Socket管道，交给一个独立的子线程类负责读取消息
                Socket socket = serverSocket.accept();
                ServerReaderRunnable target = new ServerReaderRunnable(socket);
                pool.execute(target);


            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

```java
package com.socket4;

import java.io.OutputStream;
import java.io.PrintStream;
import java.net.Socket;
import java.util.Scanner;

/**
 * 完成Socket网络编程入门案例的客户端开发
 */
public class ClientDemo1 {
    public static void main(String[] args) {
        //1、创建Socket通信管道请求与服务器的连接
        //public Socket(String host,int port)
        //参数一：服务端的地址；参数二：服务端的端口号
        try {
            Socket socket = new Socket("localhost",7777);

            //2、从socket通信管道中得到一个字节输出流，负责发送数据
            OutputStream os = socket.getOutputStream();

            //3、把低级的字节流包装成打印流
            PrintStream ps = new PrintStream(os);

            //4、发送消息
            Scanner scanner = new Scanner(System.in);
            while (true) {
                System.out.println("请说：");
                String msg = scanner.nextLine();
                ps.println(msg);
                ps.flush();//刷新
                if ("exit".equals(msg)){
                    ps.close();
                    os.close();
                    socket.close();
                    break;
                }
            }

            //关闭资源（正常情况不用关闭，除非用户点击离线才进行关闭）
//            socket.close();//可能会出现bug：消息还没有发完，发一半，就关闭了资源

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```



## 实现BS开发-模拟

![image-20220812140237167](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121402312.png)

1. 基于一个线程的BS

```java
package day07.d4_bs;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 模拟BS架构
 */
public class BSserverDemo {
    public static void main(String[] args) {
        try {
            ServerSocket socket = new ServerSocket(8080);
            while (true) {
                Socket accept = socket.accept();

                new ServerReaderThread(accept).start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

class ServerReaderThread extends Thread {
    private Socket socket;

    public ServerReaderThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            OutputStream outputStream = socket.getOutputStream();
            PrintStream printStream = new PrintStream(outputStream);

            printStream.println("HTTP/1.1 200 OK");
            printStream.println("Content-Type:text/html;charset=UTF-8");
            printStream.println();//必须换行才可以响应
            printStream.println("<h1>hello我的</h1>");
            printStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```



2. 使用线程池(因为BS架构浏览器请求已经服务器响应是非常快的，所以使用线程池可以处理很多请求和响应)

```java
package day07.d4_bs;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.*;

/**
 * 模拟BS架构
 */
public class BSserverDemo {
    //    创建线程池
    public static ExecutorService pool = new ThreadPoolExecutor(3,
            5, 6, TimeUnit.SECONDS, new ArrayBlockingQueue<>(2), Executors.defaultThreadFactory(),
            new ThreadPoolExecutor.AbortPolicy());

    public static void main(String[] args) {
        try {
            ServerSocket socket = new ServerSocket(8080);
            while (true) {
                Socket accept = socket.accept();
                pool.execute(new ServerReadRunnable(accept));

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}


```

```java
package day07.d4_bs;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.Socket;

public class ServerReadRunnable implements Runnable {

    private Socket socket;

    public ServerReadRunnable(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            OutputStream outputStream = socket.getOutputStream();
            PrintStream printStream = new PrintStream(outputStream);

            printStream.println("HTTP/1.1 200 OK");
            printStream.println("Content-Type:text/html;charset=UTF-8");
            printStream.println();//必须换行才可以响应
            printStream.println("<h1>hello我的</h1>");
            printStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

```

