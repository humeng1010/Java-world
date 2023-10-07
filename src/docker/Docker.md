---
title: Docker
category: 
- Docker
tag: 
- Docker
---

# Docker2023

> 这篇文章是2023年温习Docker容器，对[Docker旧](http://wuluwulu.cn/archives/docker)文章的整理和优化，请放心食用~

## Docker介绍

### 谈一谈Docker为什么比VM虚拟机快？？！！

1. `docker有比虚拟机更少的抽象层`

   > ​	由于docker`不需要虚拟机实现硬件资源虚拟化`，运行在`docker容器上的程序直接使用的都是实际的物理机的硬件资源`。因此在CPU、内存利用率上docker将会在效率上有明显优势。

2. `docker利用的是宿主机的内核，而不需要加载操作系统OS内核`

   > ​	当新建一个容器的时候，`docker不需要和虚拟机一样重新加载一个操作系统内核`；进而避免加载操作系统等费时费资源的过程，当新建一个虚拟机时，虚拟机软件需要加载OS，返回新建过程是分钟级别的。而`docker由于直接利用宿主机的操作系统，则省略了返回过程，因此新建一个docker容器只需要几秒钟！！`

![docker](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304241906192.png)



## Docker命令

### 镜像命令

- docker images [-a -q] 显示本地仓库的镜像

  - -a:列出本地所有镜像
  - -q:只显示镜像ID

  ![image-20230424205737146](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242057202.png)

- docker search xxx [--limit x] 搜索某个镜像

  > `docker search xxx --limit 5`显示前五个搜索结果
  >
  > ![image-20230424205623659](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242056768.png)

- docker pull 镜像名称[:TAG版本号] 拉取镜像

  ![image-20230424210522392](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242105431.png)

  > 不加版本号则默认是最新的版本latest

- docker system df 查看容器、镜像、数据卷所占的空间

  ![image-20230424211340169](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242113216.png)

  > 与操作系统的命令很类似：`df -h` 使用df命令查看磁盘的使用情况

- docker rmi [-f] `镜像`ID或名称 删除镜像(rmi -> remove image) 

  - -f:强制删除，一般用于当前镜像创建了容器之后，容器没有先删除的情况下我们直接删除镜像会弹出提示，我们则需要加上-f参数强制删除；或者先去把容器删除掉。

  ![image-20230424212343394](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242123456.png)

- `docker rmi -f $(docker images -aq)` 删除全部镜像！

  慎用，该命令会强制删除所有镜像！

  > docker支持参数引用 `docker rmi -f $(docker images -aq)` 该命令的$(docker images -aq)也会被当做命令执行

### 谈一谈虚悬镜像是什么？

仓库名称、标签都是`<none>`的镜像，俗称虚悬镜像dangling image。

![image-20230424213219548](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242132607.png)

> 这种镜像建议删除



### 容器命令

- `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]` 使用镜像创建+启动容器

  - OPTIONS：

    - `--name="容器新名称"`	为容器指定一个名称；

    - `-d`:**后台运行容器**并返回容器ID，也即启动守护式容器(后台运行)；

      

    - `-i`:(interactive:交互)使用交互模式运行容器，通常与`-t`同时使用

    - `-t`：(tty:伪终端)为容器重新分配一个伪终端，通常与`-i`同时使用

      > 即`-it`**启动交互式容器**
      >
      > ![image-20230424221304783](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242213839.png)
      >
      > - 使用`exit`退出，容器停止
      > - 使用`ctrl+p+q`退出，容器不停止

    - `-P`：随机端口映射，大写P

    - `-p`：`指定`端口映射，小写p

      | 参数                      | 说明                               |
      | ------------------------- | ---------------------------------- |
      | -p hostPort:containerPort | 端口映射 -p 8080:80                |
      | -p ip:hostPort:           | 配置监听地址 -p 10.0.0.100:8080:80 |
      |                           |                                    |

      <img src="https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242207960.png" style="zoom:33%;" />

- docker ps [OPTIONS]

  - -a:列出当前所有`正在运行`的容器+`历史运行`过的
  - -l:显示最近创建的容器
  - -n:显示最近n个创建的容器`docker ps -n 1`只显示最近的一个
  - -q:静默模式，只显示容器编号

  > ![image-20230424222740009](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304242227072.png)

- `docker start 容器ID或者容器名称`启动已停止运行的容器

  ```sh
  [root@VM-0-5-centos ~]# docker start --help
  
  Usage:  docker start [OPTIONS] CONTAINER [CONTAINER...]
  
  Start one or more stopped containers
  
  Aliases:
    docker container start, docker start
  
  Options:
    -a, --attach               Attach STDOUT/STDERR and forward signals
        --detach-keys string   Override the key sequence for detaching a container
    -i, --interactive          Attach container's STDIN
  [root@VM-0-5-centos ~]# docker start 76c75e423fa0
  76c75e423fa0
  [root@VM-0-5-centos ~]# docker ps
  CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                                                  NAMES
  76c75e423fa0   ubuntu               "bash"                   19 minutes ago   Up 20 seconds                                                          myubuntu
  ```

- `docker restart 容器ID或者容器名称 `重启容器

- `docker stop 容器ID或者容器名称`停止容器

- `docker kill 容器ID或者容器名称`强制停止容器

- `docker rm 容器ID`删除`已停止`的容器

#### 重要部分

启动守护式容器(后台服务器)

> 在大部分场景下，我们希望docker的服务是后台运行的，我们可以通过-d指定容器的后台运行模式。
>
> `docker run -d 容器名`

redis前后台启动演示:

在演示之前先来一个小插曲：使用后台方式启动Ubuntu容器会发生什么事？

```sh
# 首先查看所有正在运行的容器。
[root@VM-0-5-centos ~]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED       STATUS        PORTS            NAMES
# OK~ 发现没有任何正在运行的容器，我们直接后台启动ubuntu
[root@VM-0-5-centos ~]# docker run -d ubuntu
4a82d76ad397a8979c29f0ea2cae666c2b55aa88dbfbefb0505b88567a303d8c
# en~弹出容器的ID了，对启动成功了哈哈~查看一下正在运行的容器
[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED       STATUS        PORTS            NAMES
# 好家伙？？什么鬼我的容器呢，鲸鱼🐳背上的集装箱呢？？跑哪去了？我们加上-a参数查看所有容器
[root@VM-0-5-centos ~]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS                    PORTS  NAMES
4a82d76ad397   ubuntu               "bash"                   7 seconds ago   Exited (0) 6 seconds ago         tender_austin
# ??你怎么退出了呀??
```

> 很重要的一点：`Docker容器后台运行，就必须有一个前台进程！`
>
> 容器运行的命令如果不是那些`一直挂起的命令`比如(top,tail)，就是会自动退出的。
>
> 这个是docker的机制问题，比如我们的web容器，我们以nginx为例，正常情况下，我们配置启动服务只需要启动相应的service即可。例如service nginx start。但是这样做nginx为后台进程模式运行，就导致docker前台没有运行的应用，这样的容器后台启动会立即自杀，因为他觉得他没事可做了。
>
> 所以最佳的解决方案是：将你要运行的程序以前台进程的形式运行。

```sh
# 使用交互式伪终端启动
[root@VM-0-5-centos ~]# docker run -it ubuntu bash
# 使用快捷键退出ctrl+p+q
root@e00b7cfb39c0:/# 
[root@VM-0-5-centos ~]# 
# 再次查看大鲸鱼背上正在运行的容器
[root@VM-0-5-centos ~]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS             PORTS        NAMES
e00b7cfb39c0   ubuntu               "bash"                   16 seconds ago   Up 15 seconds                   hungry_benz
[root@VM-0-5-centos ~]# 
```

> **因此有些镜像使用-d启动时不可以的，我们需要使用-it交互模式启动**

下面我们步入正题：redis启动！

```sh
# 我们先使用-it前台启动redis
[root@VM-0-5-centos ~]# docker run -it redis
1:C 25 Apr 2023 01:16:54.832 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 25 Apr 2023 01:16:54.832 # Redis version=7.0.10, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 25 Apr 2023 01:16:54.832 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 25 Apr 2023 01:16:54.833 * monotonic clock: POSIX clock_gettime
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 7.0.10 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                  
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 1
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           https://redis.io       
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

1:M 25 Apr 2023 01:16:54.834 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
1:M 25 Apr 2023 01:16:54.834 # Server initialized
1:M 25 Apr 2023 01:16:54.834 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 25 Apr 2023 01:16:54.834 * Ready to accept connections
^C1:signal-handler (1682385443) Received SIGINT scheduling shutdown...
1:M 25 Apr 2023 01:17:23.791 # User requested shutdown...
1:M 25 Apr 2023 01:17:23.791 * Saving the final RDB snapshot before exiting.
1:M 25 Apr 2023 01:17:23.799 * DB saved on disk
1:M 25 Apr 2023 01:17:23.799 # Redis is now ready to exit, bye bye...
# 使用ctrl+c退出，查看一下所有的容器
[root@VM-0-5-centos ~]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS                     PORTS                                                  NAMES
86e05dadf5fc   redis                "docker-entrypoint.s…"   36 seconds ago   Exited (0) 6 seconds ago                                                          stupefied_murdock
# 嗯~这个容器没了，好我们使用-d后台redis
[root@VM-0-5-centos ~]# docker run -d redis
3a94559dc6ea81b06ed67b6f5d96d30027a00afc71601d76ced40ac4189a15e5
# 查看一下启动的容器；呀？还在启动中？
[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS         PORTS                                                  NAMES
3a94559dc6ea   redis                "docker-entrypoint.s…"   4 seconds ago   Up 4 seconds   6379/tcp                                               confident_wilson
[root@VM-0-5-centos ~]# 
```

> 那我上面的是不是写错了？
>
> 其实并没有错，因为redis启动时有前台守护进程的(就是我们上面看到的redis启动界面，我们启动redis会停止在那地方)；而Ubuntu没有前台守护进程，所以-d启动会直接退出。



查看docker日志

- `docker logs [OPTIONS] 容器ID` 

  ```sh
  [root@VM-0-5-centos ~]# docker logs 3a94559dc6ea
  1:C 25 Apr 2023 01:19:26.656 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
  1:C 25 Apr 2023 01:19:26.656 # Redis version=7.0.10, bits=64, commit=00000000, modified=0, pid=1, just started
  1:C 25 Apr 2023 01:19:26.656 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
  1:M 25 Apr 2023 01:19:26.657 * monotonic clock: POSIX clock_gettime
  1:M 25 Apr 2023 01:19:26.658 * Running mode=standalone, port=6379.
  1:M 25 Apr 2023 01:19:26.658 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
  1:M 25 Apr 2023 01:19:26.658 # Server initialized
  1:M 25 Apr 2023 01:19:26.658 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
  1:M 25 Apr 2023 01:19:26.659 * Ready to accept connections
  [root@VM-0-5-centos ~]# 
  ```

  - Options:
          --details        Show extra details provided to logs
      -f, --follow         Follow log output
          --since string   Show logs since timestamp (e.g. "2013-01-02T13:23:37Z") or relative (e.g. "42m" for 42 minutes)
      -n, --tail string    Number of lines to show from the end of the logs (default "all")
      -t, --timestamps     Show timestamps
          --until string   Show logs before a timestamp (e.g. "2013-01-02T13:23:37Z") or relative (e.g. "42m" for 42 minutes)

查看容器内运行的进程

- `docker top 容器ID`

  ```sh
  [root@VM-0-5-centos ~]# docker top 3a94559dc6ea
  UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
  polkitd             27113               27093               0                   09:19               ?                   00:00:01            redis-server *:6379
  ```

查看容器内部细节

- `docker inspect 容器ID`

  ![image-20230425124104798](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304251241933.png)

进入之前创建的容器：

- `docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`

  `docker exec -it 容器ID bashShell`

  ```sh
  # 使用交互式伪终端创建容器
  [root@VM-0-5-centos ~]# docker run -it ubuntu bash
  root@83c7a25b3c35:/# ls
  bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
  # ctrl+p+q退出容器
  root@83c7a25b3c35:/# [root@VM-0-5-centos ~]# 
  # 查看正在运行的容器
  [root@VM-0-5-centos ~]# docker ps
  CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                                                  NAMES
  83c7a25b3c35   ubuntu               "bash"                   16 seconds ago   Up 15 seconds                                                          tender_khayyam
  # 重新进入退出的容器并使用-it交互式启动
  [root@VM-0-5-centos ~]# docker exec -it 83c7a25b3c35 bash
  root@83c7a25b3c35:/# ls
  bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
  root@83c7a25b3c35:/# 
  [root@VM-0-5-centos ~]# 
  ```

- `docker attach 容器ID`

  这个命令也可以进入之前创建的容器内部

> 区别：
>
> attach直接进入容器启动命令的终端，不会启动新的进程；用exit退出，会导致容器的停止。
>
> exec是在容器中打开新的终端，并且可以启动新的进程；用exit退出，不会导致容器的停止。

> 演示：exec

```sh
[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                                                  NAMES
83c7a25b3c35   ubuntu               "bash"                   10 minutes ago   Up 10 minutes                                                          tender_khayyam
[root@VM-0-5-centos ~]# docker exec -it 83c7a25b3c35 bash
root@83c7a25b3c35:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@83c7a25b3c35:/# exit
exit
[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                                                  NAMES
83c7a25b3c35   ubuntu               "bash"                   11 minutes ago   Up 10 minutes                                                          tender_khayyam
```

> 演示：attach

```sh
[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                                                  NAMES
83c7a25b3c35   ubuntu               "bash"                   11 minutes ago   Up 10 minutes                                                          tender_khayyam

[root@VM-0-5-centos ~]# docker attach 83c7a25b3c35
root@83c7a25b3c35:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@83c7a25b3c35:/# exit
exit
[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED       STATUS          PORTS                                                  NAMES
[root@VM-0-5-centos ~]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS                      PORTS                                                  NAMES
83c7a25b3c35   ubuntu               "bash"                   16 minutes ago   Exited (0) 14 seconds ago                                                          tender_khayyam
```

> 工作建议使用exec，因为退出容器终端不会导致容器停止

练习：现在我们尝试进入redis服务：

```sh
[root@VM-0-5-centos ~]# docker exec -it 3a94559dc6ea bash
root@3a94559dc6ea:/data# redis-cli    
127.0.0.1:6379> set k1 v1
OK
127.0.0.1:6379> get k1
"v1"
127.0.0.1:6379> del k1
(integer) 1
127.0.0.1:6379> get k1
(nil)
127.0.0.1:6379> exit
root@3a94559dc6ea:/data# exit
exit
[root@VM-0-5-centos ~]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS                     PORTS                                                  NAMES
83c7a25b3c35   ubuntu               "bash"                   23 minutes ago   Exited (0) 7 minutes ago                                                          tender_khayyam
3a94559dc6ea   redis                "docker-entrypoint.s…"   4 hours ago      Up 24 minutes              6379/tcp                                               confident_wilson
[root@VM-0-5-centos ~]# 
```

从容器内拷贝文件到主机上

- `docker cp 容器ID:容器内路径 目的主机的路径`

  ```sh
  # 进入正在运行的Ubuntu容器在tmp文件夹下创建一个a.txt文件并写入hello world
  [root@VM-0-5-centos ~]# docker exec -it 83c7a25b3c35 bash
  root@83c7a25b3c35:/# ls
  bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
  root@83c7a25b3c35:/# cd tmp
  root@83c7a25b3c35:/tmp# ls
  root@83c7a25b3c35:/tmp# touch a.txt
  root@83c7a25b3c35:/tmp# ls
  a.txt
  root@83c7a25b3c35:/tmp# echo 'hello world' >> a.txt 
  root@83c7a25b3c35:/tmp# cat a.txt 
  hello world
  root@83c7a25b3c35:/tmp# exit
  exit
  # 把对应的Ubuntu容器中的文件拷贝到宿主机中的当前目录下
  [root@VM-0-5-centos ~]# docker cp 83c7a25b3c35:/tmp/a.txt `pwd`
  Successfully copied 2.048kB to /root
  [root@VM-0-5-centos ~]# ls
  a.txt  code  halo-app
  [root@VM-0-5-centos ~]# cat a.txt 
  hello world
  [root@VM-0-5-centos ~]# 
  ```

**导入和导出容器**

- `export`导出容器的内容作为一个tar归档文件[对应import导入命令]
- `import`从tar包中的内容创建一个新的文件系统再导入为镜像[对应export]

案例：

```sh
docker export 容器ID > 文件名.tar
cat 文件名.tar | docker import -镜像用户名/镜像名:镜像版本号
```

```sh
[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED       STATUS          PORTS                                                  NAMES
83c7a25b3c35   ubuntu               "bash"                   5 hours ago   Up 12 minutes                                                          tender_khayyam
# 导出Ubuntu容器到该路径下的abcd.tar文件
[root@VM-0-5-centos ~]# docker export 83c7a25b3c35 > abcd.tar
[root@VM-0-5-centos ~]# ls
abcd.tar  a.txt 
[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED       STATUS          PORTS                                                  NAMES
83c7a25b3c35   ubuntu               "bash"                   5 hours ago   Up 13 minutes                                                          tender_khayyam
# 强制删除容器
[root@VM-0-5-centos ~]# docker rm -f 83c7a25b3c35
83c7a25b3c35
[root@VM-0-5-centos ~]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED       STATUS        PORTS                                                  NAMES
# 导入刚刚打包好的容器作为镜像文件
[root@VM-0-5-centos ~]# cat abcd.tar | docker import - root/ubuntu:3.7
sha256:075f11130823815fb43117cf2cd413f1ba9605779ebfd76197527f4b1b7c9d1a
# 查看镜像，第一个就是我们刚刚导入的镜像
[root@VM-0-5-centos ~]# docker images
REPOSITORY      TAG       IMAGE ID       CREATED          SIZE
root/ubuntu     3.7       075f11130823   19 seconds ago   72.8MB
redis           latest    31f08b90668e   4 weeks ago      117MB
ubuntu          latest    ba6acccedd29   18 months ago    72.8MB
# 启动该镜像，查看a.txt还在不在
[root@VM-0-5-centos ~]# docker run -it 075f11130823 bash
root@a39afdbfb20c:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@a39afdbfb20c:/# cd tmp/
root@a39afdbfb20c:/tmp# ll
total 12
drwxrwxrwt 2 root root 4096 Apr 25 10:23 ./
drwxr-xr-x 1 root root 4096 Apr 25 10:37 ../
-rw-r--r-- 1 root root   12 Apr 25 10:23 a.txt
root@a39afdbfb20c:/tmp# cat a.txt 
hello world
root@a39afdbfb20c:/tmp# 
```



## Docker镜像

### Docker镜像分层结构

Docker镜像采用分层结构。

#### 谈一谈为什么Docker镜像采用分层结构呢？

> 分层结构最大的好处就是共享资源，方便复制迁移，就是为了复用。
>
> 比如说有多个镜像都从相同的base镜像构建而来，那么DockerHost只需要在磁盘上保存一份base镜像；
>
> 同时内存中也只需加载一份base镜像，就可以为所有容器服务了。而且镜像的每一层都可以被共享。



### Docker镜像commit命令案例

- `docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`

  - `-a`, --author string    Author (e.g., "John Hannibal Smith <hannibal@a-team.com>")
  - -c, --change list      Apply Dockerfile instruction to the created image
  - `-m`, --message string   Commit message
  - -p, --pause            Pause container during commit (default true) # 提交之间暂停容器？

  > 示例：`docker commit -m "add vim cmd" -a "tom" 770baa5b1071 tom/myubuntu:1.3`

本小结将基于案例的方式来演示：

> 由于docker pull ubuntu得到的ubuntu镜像是一个不完整的系统，比如vim命令就没有，我们现在打算自定义一个集成了vim命令的ubuntu系统并commit到仓库

```sh
[root@VM-0-5-centos ~]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED        STATUS        PORTS                                                  NAMES
770baa5b1071   ubuntu         "bash"                   24 hours ago   Up 24 hours                                                          upbeat_morse

[root@VM-0-5-centos ~]# docker exec -it 770baa5b1071 bash

root@770baa5b1071:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
# 并没有vim命令
root@770baa5b1071:/# vim a.txt
bash: vim: command not found
root@770baa5b1071:/# apt update        
# 安装vim
root@770baa5b1071:/# apt install vim -y
# 创建并使用vim编辑a.txt
root@770baa5b1071:/# vim a.txt
root@770baa5b1071:/# cat a.txt 
this is docker
root@770baa5b1071:/# exit
exit

[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED        STATUS        PORTS                                                  NAMES
770baa5b1071   ubuntu         "bash"                   25 hours ago   Up 25 hours                                                          upbeat_morse
# 使用docker commit 命令提交该镜像到本地仓库，和export不同的是commit命令适用于团队版本的迭代合作开发，而export仅仅是导出容器作为镜像备份
[root@VM-0-5-centos ~]# docker commit -m "add vim cmd" -a "tom" 770baa5b1071 tom/myubuntu:1.3
sha256:8bc5e004acb81771880401f8d4471f1c27b1e1d990e4217fee1aca535dcbef84
# 查看镜像
[root@VM-0-5-centos ~]# docker images
REPOSITORY      TAG       IMAGE ID       CREATED         SIZE
tom/myubuntu    1.3       8bc5e004acb8   4 seconds ago   183MB
ubuntu          latest    ba6acccedd29   18 months ago   72.8MB
# 启动我们带有vim命令的镜像
[root@VM-0-5-centos ~]# docker run -it 8bc5e004acb8 bash
# 使用vim命令编辑a.txt，发现内容都还在
root@9958a95cf374:/# vim a.txt
# 退出容器
root@9958a95cf374:/# [root@VM-0-5-centos ~]# 

[root@VM-0-5-centos ~]# docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                                                  NAMES
9958a95cf374   8bc5e004acb8         "bash"                   25 seconds ago   Up 24 seconds                                                          sweet_faraday
770baa5b1071   ba6acccedd29         "bash"                   25 hours ago     Up 25 hours                                                            upbeat_morse
[root@VM-0-5-centos ~]# 
```

#### 小总结

> Docker中的镜像分层，支持通过扩展现有的镜像，创建新的镜像，类似java继承于一个父类，自己按照需求扩展，新镜像就是从父镜像一层一层叠加生生的。每安装一个软件，就类似在现有的镜像基础上增加一层。

### Docker本地镜像发布到阿里云

1. 首先进入阿里云的镜像服务网址[点击进入](https://cr.console.aliyun.com/cn-hangzhou/instances)

2. 创建个人实例并配置密码,密码请牢记。

3. 创建命名空间

   ![image-20230427082000324](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304270820521.png)

4. 创建镜像仓库

   ![image-20230427082327243](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304270823400.png)

   ![image-20230427082452585](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304270824675.png)

5. 将本地镜像推送到阿里云

   ![image-20230427082543404](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304270825472.png)

```sh
[root@VM-0-5-centos ~]# docker login --username=aliyun7367000373 registry.cn-hangzhou.aliyuncs.com
Password: 
Login Succeeded
[root@VM-0-5-centos ~]# docker images
REPOSITORY      TAG       IMAGE ID       CREATED         SIZE
tom/myubuntu    1.3       8bc5e004acb8   13 hours ago    183MB
ubuntu          latest    ba6acccedd29   18 months ago   72.8MB

[root@VM-0-5-centos ~]# docker tag 8bc5e004acb8 registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu:1.3

[root@VM-0-5-centos ~]# docker push registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu:1.3
The push refers to repository [registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu]
f6212982c01a: Pushing [=======>                                           ]  17.44MB/110.6MB
9f54eef41275: Pushing [====>                                              ]  7.079MB/72.78MB

```

#### 拉取阿里云镜像

```sh
docker pull registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu:[镜像版本号]
```

> 先删除我们本地的镜像，然后再把阿里云的远程仓库的pull下来

 ```sh
 [root@VM-0-5-centos ~]# docker rmi 8bc5e004acb8 8bc5e004acb8 
 Error response from daemon: conflict: unable to delete 8bc5e004acb8 (must be forced) - image is referenced in multiple repositories
 Error response from daemon: conflict: unable to delete 8bc5e004acb8 (must be forced) - image is referenced in multiple repositories
 # 不能删除，我们使用-f强制删除
 [root@VM-0-5-centos ~]# docker rmi -f 8bc5e004acb8 8bc5e004acb8
 Untagged: tom/myubuntu:1.3
 Untagged: registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu:1.3
 Untagged: registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu@sha256:95fb29ab9097488857cd3a4ac4685303bb302d60c46d1ebc7597166bc98afa8b
 Deleted: sha256:8bc5e004acb81771880401f8d4471f1c27b1e1d990e4217fee1aca535dcbef84
 Deleted: sha256:e176caa4478638987d7f11453198d26f0c976c9c5f4b02a2ed450f5531c503a1
 Error response from daemon: No such image: 8bc5e004acb8:latest
 # 删除成功
 [root@VM-0-5-centos ~]# docker images
 REPOSITORY      TAG       IMAGE ID       CREATED         SIZE
 ubuntu          latest    ba6acccedd29   18 months ago   72.8MB
 # 使用pull命令下载我们的镜像
 [root@VM-0-5-centos ~]# docker pull registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu:1.3
 1.3: Pulling from wuluwulu_ah/myubuntu
 7b1a6ab2e44d: Already exists 
 abbc22b898f9: Pull complete 
 Digest: sha256:95fb29ab9097488857cd3a4ac4685303bb302d60c46d1ebc7597166bc98afa8b
 Status: Downloaded newer image for registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu:1.3
 registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu:1.3
 
 [root@VM-0-5-centos ~]# docker images
 REPOSITORY                                               TAG       IMAGE ID       CREATED         SIZE
 registry.cn-hangzhou.aliyuncs.com/wuluwulu_ah/myubuntu   1.3       8bc5e004acb8   13 hours ago    183MB
 ubuntu                                                   latest    ba6acccedd29   18 months ago   72.8MB
 # 启动镜像
 [root@VM-0-5-centos ~]# docker run -it 8bc5e004acb8 bash
 root@85548c6fe843:/# ls
 a.txt  bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
 root@85548c6fe843:/# vim a.txt 
 root@85548c6fe843:/# cat a.txt 
 this is docker
 
 awesome
 root@85548c6fe843:/# [root@VM-0-5-centos ~]# 
 
 ```

### Docker私有库



## 容器数据卷

> 开篇提醒：
>
> Docker挂载主机目录访问如果出现cannot open directory: Permission denied
>
> 解决办法：在挂载目录后多加一个`--privileged`参数即可
>
> 可以扩大容器的权限解决挂载目录没有权限的问题，即使用该参数容器内部的root用户才拥有root权限，否则容器`内部`的root只是`外部`的一个普通用户权限

### 是什么？

卷就是目录或文件，存在于一个或多个容器中，有docker挂载到容器，但不属于联合文件系统，因此能够绕过Union File System提供一些用户持久存储或数据共享的特性：

> 卷的设计目的就是`数据的持久化`，完全独立于容器的生产周期，因此Docker不会在容器删除时删除其挂载的数据卷

### 能干嘛？

将运用于运行的环境打包镜像，run后形成容器实例运行，但是我们对数据的要求希望是`持久化的`

> Docker容器产生的数据，如果不备份，那么当容器实例删除后，容器内的数据自然也就没有了。
>
> 为了能保存sj在docker中我们使用卷：
>
> 特点：
>
> - 数据卷可以在`容器之间`共享或重用数据
> - 数据卷中的更改可以直接实时生效！
> - 数据卷中的更改不会包含在镜像的更新中
> - 数据卷的生命周期一直持续到没有容器使用它为止

### 宿主机和容器之间映射添加容器卷

命令：

`docker run -d -v /宿主机绝对路径目录:/容器内目录 --privileged=true 镜像ID`

演示：

```sh
[root@VM-0-5-centos ~]# docker images
REPOSITORY                                               TAG       IMAGE ID       CREATED         SIZE
ubuntu                                                   latest    ba6acccedd29   18 months ago   72.8MB
# 运行ubuntu镜像并设置容器卷目录映射
[root@VM-0-5-centos ~]# docker run -it -v /tmp/host_data:/tmp/docker_data --privileged=true --name=u1 ba6acccedd29

root@9705cb76c40e:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@9705cb76c40e:/# cd tmp/
root@9705cb76c40e:/tmp# ls
docker_data
root@9705cb76c40e:/tmp# cd docker_data/
root@9705cb76c40e:/tmp/docker_data# ls
root@9705cb76c40e:/tmp/docker_data# echo "hello" >> dockerin.txt
root@9705cb76c40e:/tmp/docker_data# ls
dockerin.txt
root@9705cb76c40e:/tmp/docker_data# cat dockerin.txt 
hello

# 回到宿主机
root@9705cb76c40e:/tmp/docker_data# [root@VM-0-5-centos ~]# 
[root@VM-0-5-centos ~]# cd /tmp/host_data/
[root@VM-0-5-centos host_data]# ls
dockerin.txt
[root@VM-0-5-centos host_data]# cat dockerin.txt 
hello
[root@VM-0-5-centos host_data]# echo "awesome" >> dockerin.txt 
[root@VM-0-5-centos host_data]# cat dockerin.txt 
hello
awesome
[root@VM-0-5-centos host_data]# docker ps -a
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS         PORTS                                                  NAMES
9705cb76c40e   ba6acccedd29         "bash"                   2 minutes ago   Up 2 minutes                                                          u1
[root@VM-0-5-centos host_data]# docker exec -it 9705cb76c40e bash
root@9705cb76c40e:/# cd tmp/
root@9705cb76c40e:/tmp# cd docker_data/
root@9705cb76c40e:/tmp/docker_data# ls
dockerin.txt
root@9705cb76c40e:/tmp/docker_data# cat dockerin.txt 
hello
awesome
root@9705cb76c40e:/tmp/docker_data# exit
exit

```

我们可以使用`docker inspect 容器ID`查看详细信息中的Mounts挂载信息

```json
[
    {
        "Id": "9705cb76c40e4a5f79ec8305cd7cc61575130b13ec16356c3b05eb95056d1ff0",
        "Created": "2023-04-27T11:55:01.575632782Z",
      
      ...
      
        "Mounts": [
            {
                "Type": "bind",
                "Source": "/tmp/host_data",
                "Destination": "/tmp/docker_data",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
      
      ...
      
    }
]
```

### 容器和宿主机之间数据共享

1. docker修改，主机同步获得
2. 主机修改，docker同步获得
3. docker容器stop，主机修改，docker容器重启仍然会同步



### 容器卷ro和rw读写规则

上面的演示我们没有指定读写规则，则使用默认的读写规则：rw

也就是我们执行的命令相当于：docker run -it -v /tmp/host_data:/tmp/docker_data`:rw` --privilege=true --name=u1 镜像ID

- rw：容器内部是可读可写的

- ro：容器内部是只读的

  > 容器内部修改的时候会出现Read-only file System 只读提示



### 容器卷的继承

> 容器2继承容器1的卷规则
>
> `docker run -it --volumes-from 父类 --privilege=true --name u2 ubuntu`
>
> 注意：容器2`不会`因为容器1停止了就不同步宿主机数据了



## Docker软件安装

### 总体步骤

1. 搜索镜像
2. 拉取镜像
3. 查看镜像
4. 启动镜像(服务端口映射)
5. 停止镜像
6. 移除镜像

### 安装Tomcat

1. 搜索镜像

   ```sh
   docker search tomcat
   ```

2. 拉取镜像

   ```sh
   docker pull tomcat
   ```

3. 查看镜像

   ```sh
   docker images tomcat
   ```

4. 启动镜像

   ```sh
   docker run -d -p 8080:8080 --name t1 tomcat
   ```

5. 访问8080端口

   ![image-20230427204922799](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304272049964.png)

   

> 由于安装的是最新版的tomcat，内部的目录发生了变化，我们需要使用bash进入tomcat容器对应的系统内部把webapps这个空的文件夹删除掉，然后把webapps.dist修改为webapps再访问8080端口即可出现tom猫

> 推荐安装tomcat8版本就足够了
>
> 这次我们直接使用run命令，本地没有镜像会自动执行pull命令拉取远程仓库
>
> `docker run -d -p 8080:8080 --name tomcat8 billygoo/tomcat8-jdk8`
>
> 这次我们再打开浏览器直接访问8080端口：
>
> ![image-20230427205908638](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202304272059783.png)
>
> 



### 安装MySQL

1. 使用MySQL镜像

   ```sh
   docker run -p 3306:3306 -d -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7
   ```

2. 查看容器

   ```sh
   docker ps
   ```

3. 进入容器

   ```sh
   docker exec -it 容器ID bash
   ```

4. 连接容器中的MySQL

   ```sh
   mysql -uroot -p
   ```

> 我们需要解决两个问题：
>
> - 中文乱码
> - 数据备份(数据卷)

1. 启动mysql，并挂载容器数据卷

```sh
docker run -d -p 3306:3306 --privileged=true -v /root/mysql/log:/var/log/mysql -v /root/mysql/data:/var/lib/mysql -v /root/mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 --name mysql mysql:5.7
```

2. 在本机的`/root/mysql/conf`中新建`my.cnf`

   ```sh
   [client]
   default_character_set=utf8
   [mysqld]
   collation_server = utf8_general_ci
   character_set_server = utf8
   ```

3. 重启MySQL容器

   ```sh
   docker restart mysql
   ```

4. 进入容器

   ```sh
   docker exec -it mysql bash
   ```

5. 连接MySQL

   ```sh
   mysql -uroot -p
   ```

6. 检查字符集是否被修改为utf8

   ```sh
   SHOW VARIABLES LIKE 'character%';
   ```

   <img src="https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305040849800.png" alt="image-20230504084900603" style="zoom:50%;" />

7. 建库建表，测试中文数据

8. 删除容器再重新来一次，数据还会存在吗？

### 安装Redis

```sh
docker pull redis:6.0.8
```

```sh
docker run -d -p 6379:6379 redis:6.0.8
```

```sh
docker exec -it redis容器ID bash
```

```sh
redis-cli
```

```sh
set k1 v1
```

```sh
get k1
```

> 以上是入门级的命令；下面我们自定义配置文件并使用数据卷映射数据

```sh
docker rm -f redis容器ID
```

创建默认配置文件

```sh
mkdir redis
```

```sh
vim redis.conf
```

把下面的默认配置文件复制到该文件

https://redis.io/docs/management/config-file/

需要修改的地方：

- 开启redis密码验证

  ```sh
  requirepass 123
  ```

- 允许redis外地连接 必须

  注释掉 `# bind 127.0.0.1`

- daemonize no

  将daemonize yes注释起来或者daemonize no设置，因为改配置和docker run中-d参数冲突，会导致容器一直启动失败

启动redis

```sh
docker run -p 6377:6379 --name my_redis --privileged=true -v /root/redis/redis.conf:/etc/redis/redis.conf -v /root/redis/data:/data -d redis:6.0.8 redis-server /etc/redis/redis.conf
```

```sh
docker exec -it redis容器ID bash
```

### 安装Nginx

略



## Redis高级篇

### 安装MySQL主从复制

#### 主服务器3307

启动MySQL容器

```sh
docker run -p 3307:3306 --name mysql-master \
-v /root/mysql/mysql-master/log:/var/log/mysql \
-v /root/mysql/mysql-master/data:/var/lib/mysql \
-v /root/mysql/mysql-master/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7
```

在配置目录`/root/mysql/mysql-master/conf`下添加配置

```sh
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=101
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql
## 开启二进制日志功能
log-bin=mall-mysql-bin
## 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M
## 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed
## 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7
## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
```

重启MySQL

```sh
docker restart mysql-master
```

进入MySQL容器

```sh
docker exec -it mysql-master bash
```

进入MySQL

```sh
mysql -uroot -p
```

创建数据同步用户

```mysql
CREATE USER 'slave'@'%' IDENTIFIED BY '123456';
GRANT REPLICATION SLAVE,REPLICATION CLIENT ON *.* TO 'slave'@'%';
```

![image-20230505173322917](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305051733102.png)



#### 从服务器3308

```sh
docker run -p 3308:3306 --name mysql-slave \
-v /root/mysql/mysql-slave/log:/var/log/mysql \
-v /root/mysql/mysql-slave/data:/var/lib/mysql \
-v /root/mysql/mysql-slave/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7
```



```sh
docker ps
```

![image-20230505174341398](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305051743484.png)



进行配置

```sh
cd mysql/mysql-slave/conf/
vim my.cnf
```

```sh
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=102
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql
## 开启二进制日志功能，以备Slave作为其它数据库实例的Master时使用
log-bin=mall-mysql-slave1-bin
## 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M
## 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed
## 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7
## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
## relay_log配置中继日志
relay_log=mall-mysql-relay-bin
## log_slave_updates表示slave将复制事件写进自己的二进制日志
log_slave_updates=1
## slave设置为只读（具有super权限的用户除外）
read_only=1
```

重启从MySQL

```sh
docker restart mysql-slave
```



进入主MySQL查看主从同步状态

```sh
docker exec -it mysql-master bash

mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.36-log MySQL Community Server (GPL)

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show master status;
+-----------------------+----------+--------------+------------------+-------------------+
| File                  | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+-----------------------+----------+--------------+------------------+-------------------+
| mall-mysql-bin.000001 |      617 |              | mysql            |                   |
+-----------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)

mysql> 
```

![image-20230505175302827](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305051753915.png)



进入mysql-slave容器，配置主从复制

```sh
[root@VM-0-5-centos conf]# docker exec -it mysql-slave bash
root@abe2b935087d:/# mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.36-log MySQL Community Server (GPL)

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```

在从数据库中配置主从复制

```mysql
change master to master_host='宿主机ip', master_user='slave', master_password='123456', master_port=3307, master_log_file='mall-mysql-bin.000001', master_log_pos=617, master_connect_retry=30;
```

> · 主从复制命令参数说明
>
> master_host：主数据库的IP地址；
>
> master_port：主数据库的运行端口；
>
> master_user：在主数据库创建的用于同步数据的用户账号；
>
> master_password：在主数据库创建的用于同步数据的用户密码；
>
> master_log_file：指定从数据库要复制数据的日志文件，通过查看主数据的状态，获取File参数；
>
> master_log_pos：指定从数据库从哪个位置开始复制数据，通过查看主数据的状态，获取Position参数；
>
> master_connect_retry：连接失败重试的时间间隔，单位为秒。

![image-20230505180235258](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305051802358.png)



在从数据库中查看主从同步状态

```mysql
show slave status \G;
# \G 可以以key:value格式显示结果
```

![image-20230505180529882](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305051805979.png)



在从数据库中开启主从同步

```mysql
start slave;
```



查看从数据库状态

![image-20230505180800979](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305051808082.png)

> 注意如果你的Slave_IO_Running和我一样是Connecting说明正在连接中，大概率是云服务器的防火墙(安全组)没有放开，只需要把3307端口放开,再次`start slave`即可
>
> ![image-20230505181940900](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305051819002.png)
>
> ![image-20230505182001529](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305051820643.png)
>
> 

主从复制测试

- 主机新建库-使用库-新建表-插入数据
- 从机使用库-查看记录
- ok

### 安装Redis集群(大厂面试题-分布式存储案例)

· cluster(集群)模式-docker版 哈希槽分区进行亿级数据存储

· 面试题

· 1~2亿条数据需要缓存，请问如何设计这个存储案例

· 回答

· 单机单台100%不可能，肯定是分布式存储，用redis如何落地？

· 上述问题阿里P6~P7工程案例和场景设计类必考题目， 一般业界有3种解决方案

#### 哈希取余分区

![image-20230516181627976](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305161816075.png) 

| 2亿条记录就是2亿个k,v，我们单机不行必须要分布式多机，假设有3台机器构成一个集群，用户每次读写操作都是根据公式：hash(key) % N个机器台数，计算出哈希值，用来决定数据映射到哪一个节点上。                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 优点： 简单粗暴，直接有效，只需要预估好数据规划好节点，例如3台、8台、10台，就能保证一段时间的数据支撑。使用Hash算法让固定的一部分请求落到同一台服务器上，这样每台服务器固定处理一部分请求（并维护这些请求的信息），起到负载均衡+分而治之的作用。                                                                                                                                                               |
| 缺点：  原来规划好的节点，进行扩容或者缩容就比较麻烦了额，不管扩缩，每次数据变动导致节点有变动，映射关系需要重新进行计算，在服务器个数固定不变时没有问题，如果需要弹性扩容或故障停机的情况下，原来的取模公式就会发生变化：Hash(key)/3会变成Hash(key) /?。此时地址经过取余运算的结果将发生很大变化，根据公式获取的服务器也会变得不可控。某个redis机器宕机了，由于台数数量变化，会导致hash取余全部数据重新洗牌。 |

 

· 缺点那？？？

![image-20230516181647992](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305161816096.png) 

|                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 缺点：                                                                                                                                                                                                                                                                                                                                                                                                 |
| 原来规划好的节点，进行扩容或者缩容就比较麻烦了额，不管扩缩，每次数据变动导致节点有变动，映射关系需要重新进行计算，在服务器个数固定不变时没有问题，如果需要弹性扩容或故障停机的情况下，原来的取模公式就会发生变化：Hash(key)/3会变成Hash(key) /?。此时地址经过取余运算的结果将发生很大变化，根据公式获取的服务器也会变得不可控。某个redis机器宕机了，由于台数数量变化，会导致hash取余全部数据重新洗牌。 |



####  一致性哈希算法分区

· 是什么

一致性Hash算法背景

　　一致性哈希算法在1997年由麻省理工学院中提出的，设计目标是为了解决

分布式缓存数据变动和映射问题，某个机器宕机了，分母数量改变了，自然取余数不OK了。

· 能干嘛

· 提出一致性Hash解决方案。 目的是`当服务器个数发生变动时， 尽量减少影响客户端到服务器的映射关系`

**·** ***\*3大步骤\****

· 算法构建一致性哈希环

一致性哈希环

  一致性哈希算法必然有个hash函数并按照算法产生hash值，这个算法的所有可能哈希值会构成一个全量集，这个集合可以成为一个hash空间[0,2^32-1]，这个是一个线性空间，但是在算法中，我们通过适当的逻辑控制将它首尾相连(0 = 2^32),这样让它逻辑上形成了一个环形空间。

 

  它也是按照使用取模的方法，前面笔记介绍的节点取模法是对节点（服务器）的数量进行取模。而`一致性Hash算法是对2^32取模`，简单来说，一致性Hash算法将整个哈希值空间组织成一个虚拟的圆环，如假设某哈希函数H的值空间为0-2^32-1（即哈希值是一个32位无符号整形），整个哈希环如下图：整个空间按顺时针方向组织，圆环的正上方的点代表0，0点右侧的第一个点代表1，以此类推，2、3、4、……直到2^32-1，也就是说0点左侧的第一个点代表2^32-1， 0和2^32-1在零点中方向重合，我们把这个由2^32个点组成的圆环称为Hash环。



· 服务器IP节点映射

节点映射

  将集群中各个IP节点映射到环上的某一个位置。

  将各个服务器使用Hash进行一个哈希，具体可以选择服务器的IP或主机名作为关键字进行哈希，这样每台机器就能确定其在哈希环上的位置。假如4个节点NodeA、B、C、D，经过IP地址的哈希函数计算(hash(ip))，使用IP地址哈希后在环空间的位置如下： 

 

· key落到服务器的落键规则

当我们需要存储一个kv键值对时，首先计算key的hash值，hash(key)，将这个key使用相同的函数Hash计算出哈希值并确定此数据在环上的位置，***\*从此位置沿环顺时针\*******\*“\*******\*行走\*******\*”\****，`第一台遇到的服务器就是其应该定位到的服务器，并将该键值对存储在该节点上`。

如我们有Object A、Object B、Object C、Object D四个数据对象，经过哈希计算后，在环空间上的位置如下：根据一致性Hash算法，数据A会被定为到Node A上，B被定为到Node B上，C被定为到Node C上，D被定为到Node D上。

 

· 优点

· 一致性哈希算法的容错性

***\*容错性\****

假设Node C宕机，可以看到此时对象A、B、D不会受到影响，只有C对象被重定位到Node D。一般的，在一致性Hash算法中，如果一台服务器不可用，则受影响的数据仅仅是此服务器到其环空间中前一台服务器（即沿着逆时针方向行走遇到的第一台服务器）之间数据，其它不会受到影响。简单说，`就是C挂了，受到影响的只是B、C之间的数据，并且这些数据会转移到D进行存储`。

 

 

· 一致性哈希算法的***\*扩展性\****

 扩展性

数据量增加了，需要增加一台节点NodeX，X的位置在A和B之间，那收到影响的也就是A到X之间的数据，重新把A到X的数据录入到X上即可，

不会导致hash取余全部数据重新洗牌。



 

· 缺点

· 一致性哈希算法的数据倾斜问题

 

`Hash环的数据倾斜问题`

一致性Hash算法在服务***\*节点太少时\****，容易因为节点分布不均匀而造成***\*数据倾斜\****（被缓存的对象大部分集中缓存在某一台服务器上）问题，

例如系统中只有两台服务器：



· 小总结

为了在节点数目发生改变时尽可能少的迁移数据

 

将所有的存储节点排列在收尾相接的Hash环上，每个key在计算Hash后会顺时针找到临近的存储节点存放。

而当有节点加入或退出时仅影响该节点在Hash环上顺时针相邻的后续节点。 

 

优点

加入和删除节点只影响哈希环中顺时针方向的相邻的节点，对其他节点无影响。

 

缺点 

数据的分布和节点的位置有关，因为这些节点不是均匀的分布在哈希环上的，所以数据在进行存储时达不到均匀分布的效果。



#### 哈希槽分区

哈希槽分区

1 为什么出现

> 因为一致性哈希算法的数据倾斜问题

哈希槽实质就是一个数组，数组[0,2^14 -1]形成hash slot空间。

2 能干什么

解决均匀分配的问题，在数据和节点之间又加入了一层，把这层称为哈希槽（slot），用于管理数据和节点之间的关系，现在就相当于节点上放的是槽，槽里放的是数据。

![image-20230516181403257](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305161814348.png) 

槽解决的是粒度问题，相当于把粒度变大了，这样便于数据移动。

哈希解决的是映射问题，使用key的哈希值来计算所在的槽，便于数据分配。


3 多少个hash槽

一个集群只能有16384个槽，编号0-16383（0-2^14-1）。这些槽会分配给集群中的所有主节点，分配策略没有要求。可以指定哪些编号的槽分配给哪个主节点。集群会记录节点和槽的对应关系。解决了节点和槽的关系后，接下来就需要对key求哈希值，然后对16384取余，余数是几key就落入对应的槽里。slot = CRC16(key) % 16384。以槽为单位移动数据，因为槽的数目是固定的，处理起来比较容易，这样数据移动问题就解决了。


哈希槽计算

Redis 集群中内置了 16384 个哈希槽，redis 会`根据节点数量大致均等的将哈希槽映射到不同的节点`。当需要在 Redis 集群中放置一个 key-value时，redis 先对 key 使用 crc16 算法算出一个结果，然后把结果对 16384 求余数，这样每个 key 都会对应一个编号在 0-16383 之间的哈希槽，也就是映射到某个节点上。如下代码，key之A 、B在Node2， key之C落在Node3上


![image-20230516181346598](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305161813843.png) 

##### Redis Cluster是如何分片的？

> 类似的问题：
> 
>   - Redis Cluster中的数据是如何分布的？
>   - 如何确定给定key应该分布在哪个哈希槽中？
>

Redis Cluster采用的是**哈希槽分区**，每一个键值对都属于一个**hash slot**(哈希槽)

Redis Cluster 通常有16384个哈希槽，要计算指定的key应分布到哪个哈希槽中，我们只需要先对每一个key计算CRC-16校验码，然后再对这个校验码16384取模，得到的值就是key对应的哈希槽

> HASH_SLOT = CRC16(key) % NUMBER_OF_SLOTS
>

创建并初始化Redis Cluster的时候，redis会自动平均分配这16384个槽到各个master节点，不需要我们手动分配。如果想手动调整，redis cluster也提供了相关的命令`ADDSLOTS`、`ADDSLOTS RANGE`



##### 3主3从redis集群扩缩容配置案例架构说明

- 新建6个docker容器redis实例

  - ```sh
    docker run -d --name redis-node-1 --net host --privileged=true -v /data/redis/share/redis-node-1:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6381
    docker run -d --name redis-node-2 --net host --privileged=true -v /data/redis/share/redis-node-2:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6382
    docker run -d --name redis-node-3 --net host --privileged=true -v /data/redis/share/redis-node-3:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6383
    docker run -d --name redis-node-4 --net host --privileged=true -v /data/redis/share/redis-node-4:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6384
    docker run -d --name redis-node-5 --net host --privileged=true -v /data/redis/share/redis-node-5:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6385
    docker run -d --name redis-node-6 --net host --privileged=true -v /data/redis/share/redis-node-6:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6386
    ```

如果运行成功，效果如下

![img](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305062059861.png) 

>命令分步解释
>
>· docker run
>
>· 创建并运行docker容器实例
>
>· --name redis-node-6
>
>· 容器名字
>
>· --net host
>
>· 使用宿主机的IP和端口，默认
>
>· --privileged=true
>
>· 获取宿主机root用户权限
>
>· -v /data/redis/share/redis-node-6:/data
>
>· 容器卷，宿主机地址:docker内部地址
>
>· redis:6.0.8
>
>· redis镜像和版本号
>
>· --cluster-enabled yes
>
>· 开启redis集群
>
>· --appendonly yes
>
>· 开启持久化
>
>· --port 6386
>
>· redis端口号
>
>· 进入容器redis-node-1并为6台机器构建集群关系
>
>· 进入容器
>
>· docker exec -it redis-node-1 /bin/bash
>
>

- **构建主从关系**

> 注意，进入docker容器后才能执行一下命令，且注意自己的真实IP地址

```sh
redis-cli --cluster create 192.168.111.147:6381 192.168.111.147:6382 192.168.111.147:6383 192.168.111.147:6384 192.168.111.147:6385 192.168.111.147:6386 --cluster-replicas 1
```

> --cluster-replicas 1 表示为每个master创建一个slave节点
> 
> 注意这里的slave不对外提供读服务，主要用来保障master的高可用，当master出现故障的时候替代它。

 ![image-20230507145953605](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071459651.png) 

![image-20230507150113982](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071501076.png) 

![image-20230507150200245](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071502318.png)  

一切OK的话，3主3从搞定



链接进入6381作为切入点，查看集群状态和节点信息 

- `cluster info`

- `cluster nodes`

![image-20230507150801841](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071508934.png)

> 根据`cluster nodes`显示的信息
>
> 可以知道节点的主从关系：
>
> | master                                | slave             |
> | ------------------------------------- | ----------------- |
> | redis-node-1 6381 slots:[0-5460]      | redis-node-6 6386 |
> | redis-node-2 6382 slots:[5461-10922]  | redis-node-4 6384 |
> | redis-node-3 6383 slots:[10923-16383] | redis-node-5 6385 |
>
> 



##### 主从容错切换迁移案例

使用`redis-cli -p 6381`连接1号节点的redis，添加数据发现：

![image-20230507152858250](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071528373.png) 

> 由于k1和k4通过算法计算得到的slots大于了1号节点的[0-5460]范围，所以需要存到另外的slots槽中
>
> 所以我们连接redis的时候需要使用`集群环境连接`
>
> 

加入参数-c，优化路由

![image-20230507153601436](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071536539.png) 



· 查看集群信息


redis-cli --cluster check 192.168.111.147:6381

![image-20230507154132893](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071541994.png) 

###### 容错切换迁移

主6381和从机切换，先停止主机6381

6381主机停了，对应的真实从机上位

6381作为1号主机分配的从机以实际情况为准，具体是几号机器就是几号

再次查看集群信息

 

![image-20230507155005700](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071550796.png) 

6381宕机了，6386上位成为了新的master。

每次案例下面挂的从机以实际情况为准，具体是几号机器就是几号

先还原之前的3主3从

![image-20230507155500500](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071555611.png) 

  

还原最初状态

![image-20230507160144899](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071601995.png)

主从机器分配情况以实际情况为准



查看集群状态

`redis-cli --cluster check 自己IP:6381`

<img src="https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071616962.png" alt="image-20230507161630718" style="zoom:50%;" />



##### 主从扩容案例

· 新建6387、6388两个节点+新建后启动+查看是否8节点

| docker run -d --name redis-node-7 --net host --privileged=true -v /data/redis/share/redis-node-7:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6387 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| docker run -d --name redis-node-8 --net host --privileged=true -v /data/redis/share/redis-node-8:/data redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6388 |
| docker ps                                                                                                                                                             |

 

· 进入6387容器实例内部

· docker exec -it redis-node-7 /bin/bash

· 将新增的6387节点(空槽号)作为master节点加入原集群

将新增的6387作为master节点加入集群

redis-cli --cluster add-node 自己实际IP地址:6387 自己实际IP地址:6381

> redis-cli --cluster add-node 129.211.221.155:6387 129.211.221.155:6381

6387 就是将要作为master新增节点

6381 就是原来集群节点里面的领路人，相当于6387拜拜6381的码头从而找到组织加入集群

 

![image-20230507165940659](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071659889.png) 

 

· 检查集群情况第1次




redis-cli --cluster check 真实ip地址:6381

![image-20230507170337510](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071703640.png) 



重新分派槽号



> 重新分派槽号命令:
>
> redis-cli --cluster reshard IP地址:端口号
>
> redis-cli --cluster reshard 192.168.111.147:6381





![image-20230507171032442](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071710597.png)

![image-20230507171151065](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071711192.png) 

![image-20230507171440183](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071714313.png) 

```sh
Moving slot 5461 from 8e460b7735bcd677c23f847f1231f7e37b9999d6
Moving slot 5462 from 8e460b7735bcd677c23f847f1231f7e37b9999d6
# ...
Moving slot 6826 from 8e460b7735bcd677c23f847f1231f7e37b9999d6

Moving slot 0 from 86245a7dd6da92fe3bf6c16fa1ddd71f71b878e2
Moving slot 1 from 86245a7dd6da92fe3bf6c16fa1ddd71f71b878e2
# ...
Moving slot 1364 from 86245a7dd6da92fe3bf6c16fa1ddd71f71b878e2

Moving slot 10923 from 9ad4e87344d36842e19a970eb3290dc93b38210a
Moving slot 10924 from 9ad4e87344d36842e19a970eb3290dc93b38210a
# ...
Moving slot 12287 from 9ad4e87344d36842e19a970eb3290dc93b38210a

Do you want to proceed with the proposed reshard plan (yes/no)? yes
Moving slot 5461 from 129.211.221.155:6382 to 129.211.221.155:6387: 
Moving slot 5462 from 129.211.221.155:6382 to 129.211.221.155:6387: 
#...
Moving slot 12287 from 129.211.221.155:6383 to 129.211.221.155:6387: 
```





· 检查集群情况第2次




redis-cli --cluster check 真实ip地址:6381

![image-20230507172134668](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071721745.png)



槽号分派说明

> 为什么6387是3个新的区间，以前的还是连续？
>
> 重新分配成本太高，所以前3家各自匀出来一部分，从6381/6382/6383三个旧节点分别匀出1364个坑位给新节点6387

 

为主节点6387分配从节点6388

命令：

> redis-cli --cluster add-node ip:新slave端口 ip:新master端口 --cluster-slave --cluster-master-id 新主机节点ID 

> `redis-cli --cluster add-node 192.168.111.147:6388 192.168.111.147:6387 --cluster-slave --cluster-master-id e4781f644d4a4e4d4b4d107157b9ba8144631451-------这个是6387的编号，按照自己实际情况`

![image-20230507173641538](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071736635.png)



检查集群情况第3次


redis-cli --cluster check 192.168.111.147:6382

![image-20230507173418219](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071734439.png) 

 

##### 主从缩容案例

> 目的：6387和6388下线



分析：我们应该先删除6388，然后再删除6387



检查集群情况1获得6388的节点ID


redis-cli --cluster check ip:6388

<img src="https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071743169.png" alt="image-20230507174317012" style="zoom:50%;" />

`0181322b91a2212672fda1b81b3ab6344e1c2da1`

将6388删除 从集群中将4号从节点6388删除

命令：

> redis-cli --cluster del-node ip:从机端口 从机6388节点ID 

> redis-cli --cluster del-node ip:6388 0181322b91a2212672fda1b81b3ab6344e1c2da1


redis-cli --cluster check 192.168.111.147:6382

检查一下发现，6388被删除了，只剩下7台机器了。

![](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071751671.png)


将6387的槽号清空，重新分配，本例将清出来的槽号都给6381

> redis-cli --cluster reshard 129.211.221.155:6381

这里其实是操作的整个集群，而不是看到了后面是6381就以为是只操作6381

![](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071809300.png)

检查集群情况第二次

redis-cli --cluster check 192.168.111.147:6381 4096个槽位都指给6381，它变成了8192个槽位，相当于全部都给6381了，不然要输入3次，一锅端

![](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071811616.png)


将6387删除

命令：redis-cli --cluster del-node ip:端口 6387节点ID 

> redis-cli --cluster del-node 129.211.221.155:6387 420cafee6886a04ecf82f4dea6f8a8445ea3208e

![](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071815371.png)


检查集群情况第三次

![](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202305071815401.png)





