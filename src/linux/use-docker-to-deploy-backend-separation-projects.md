---
title: 使用docker部署前后端分离项目
---




## 使用docker compose部署后端：

springboot项目依赖`MySQL`和`Redis`

1. 为了数据库中的表可以在新的环境中**不用手动创建**，我们需要引入flyway工具，帮我们做组件库的迁移操作

   运行Spring Boot应用程序：启动Spring Boot应用程序时，Flyway将自动检测并应用迁移脚本。它会连接到Docker Compose中的MySQL服务，将数据库结构更新到最新状态。

   1. 添加依赖

      ```xml
      <!--数据库迁移工具-->
              <dependency>
                  <groupId>org.flywaydb</groupId>
                  <artifactId>flyway-core</artifactId>
              </dependency>
      ```

   2. 配置application.yml

      ```yml
      spring:
      	flyway:
          url: ${spring.datasource.url}
          user: ${spring.datasource.username}
          password: ${spring.datasource.password}
          locations: classpath:db/migration
          baseline-on-migrate: true
          # 尝试10次连接，防止docker compose启动springboot项目的时候mysql还没有启动完毕
          connect-retries: 10
          # 每次重试之间的间隔为10秒
          connect-retries-interval: 10s
      ```

   3. 在类路径下的`db/migration`文件夹下编写`V1__Create_table.sql`文件，在项目运行初始化的时候会自动执行该sql文件具体路径：`src/main/resources/db/migration/V1__Create_table.sql`

      ```sql
      -- V1__Create_table.sql
      
      CREATE TABLE IF NOT EXISTS table1 (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS table2 (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(100) NOT NULL
      );
      -- 可以编写对个创建表的语句
      ```

      > 每个迁移脚本都会被视为一个独立的迁移单元，并按照它们的版本号顺序执行。



2. 编写完后执行`mvn package`把项目打包，把打包完毕的jar包**上传到服务器**app文件夹下的target文件夹下

3. 在app文件夹下编写Dockerfile构建服务镜像

```dockerfile
FROM maven:3.8.2-jdk-8

# copy local code to the container image.
WORKDIR /app
#COPY pom.xml .
#COPY src ./src
COPY target/bonfire-backend-0.0.1.jar  ./target/bonfire-backend-0.0.1.jar
# Builder a release artifact.
#RUN mvn package -DskipTests

# Run the web service on container startup.
CMD ["java","-jar","/app/target/bonfire-backend-0.0.1.jar","--spring.profiles.active=prod"]


```

> 构建springboot的镜像，执行`docker build -t bonfire:4.0 .`命令

4. 编写docker-compose.yml

```yml
version: "3"

services:
  bonfire_server:
    image: bonfire:4.0
    container_name: bonfire_server
    restart: on-failure:3
    depends_on:
      - bonfire_mysql
      - bonfire_redis
    networks:
      bonfire_network:
    volumes:
      - ./images/:/app/images/
    ports:
      - "8088:8088"
    environment:
      - SERVER_PORT=8088
      - SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver
      - SPRING_DATASOURCE_URL=jdbc:mysql://bonfire_mysql:3306/star_project?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
      - SPRING_DATASOURCE_USERNAME=root
      #     mysql password
      - SPRING_DATASOURCE_PASSWORD=password
      - SPRING_REDIS_PORT=6379
      - SPRING_REDIS_DATABASE=0
      - SPRING_REDIS_HOST=bonfire_redis
      #     redis password
      - SPRING_REDIS_PASSWORD=password

  bonfire_mysql:
    image: mysql:8.0.28
    container_name: bonfire_mysql
    restart: on-failure:3
    networks:
      bonfire_network:
    command: --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ./mysql:/var/lib/mysql
      - ./mysqlBackup:/data/mysqlBackup
    ports:
      - "3306:3306"
    environment:
      #      mysql password 和上面的一致
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=star_project

  bonfire_redis:
    image: redis
    container_name: bonfire_redis
    restart: on-failure:3
    networks:
      bonfire_network:
    volumes:
      - ./redis/data:/data
      - ./redis/logs:/logs
    #    redis password 和上面一致
    command: redis-server --requirepass password
    ports:
      - "6379:6379"
networks:
  bonfire_network:
```

> 可以根据需要进行对应的修改。
>
> 注意springboot的application.yml的配置mysql和redis的ip地址需要写对应的服务容器的名称，因为可以上面编写的都在同一docker网络下，可以通过容器名称相互连接。不配置也没关系，在`environment`中配置会覆盖掉application.yml中的配置，因为优先级的原因。所以`environment`中如果配置一定要配置正确！

5. 执行`docker compose up -d`后台启动服务

   ![image-20230711155110179](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202307111551517.png)



## 在docker上使用Nginx部署前端

把前端项目打包后的dist目录下的所有文件上传到服务器的指定目录下，这里我指定：`/root/bonfire-app/html`,编写一个nginx.conf的Nginx的配置文件，可参考如下配置：

```nginx

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    client_max_body_size 50m;
    include       mime.types;
    default_type  application/json;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
  
    server {
        listen       80;
        server_name  hb.wuluwulu.cn;

        location / {
						# 加载前端的打包文件
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
				location /api {  
            default_type  application/json;
            keepalive_timeout   30s;  
            keepalive_requests  1000;  
            #支持keep-alive  
            proxy_http_version 1.1;  
      			# 包含 /api
            #rewrite /api(/.*) $1 break;  
            proxy_pass_request_headers on;
            #more_clear_input_headers Accept-Encoding;  
            proxy_next_upstream error timeout;  
            #proxy_pass http://127.0.0.1:8088;
            proxy_pass http://backend;
        }
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
		upstream backend {
        # 指定后端springboot服务对应的ip和端口号    
        server 118.195.244.168:8088 max_fails=5 fail_timeout=10s weight=1;
        # 如果部署了多个该服务，可以接着写，nginx会实现负载均衡 weight可以配置权重
        #server 127.0.0.1:8082 max_fails=5 fail_timeout=10s weight=1;
    }  

}


```

执行如下命令启动nginx

```sh
docker run --name bonfire-nginx -v /root/bonfire-app/html:/usr/share/nginx/html:ro -v /root/bonfire-app/nginx.conf:/etc/nginx/nginx.conf:ro -d -p 80:80 nginx
```

> 猜想：使用docker compose同时编排后端和前端，就不需要执行上面的命令单独启动nginx容器了。



> 最后的最后：如果都已经配置完毕，浏览器不能访问出现一直转圈的情况，重启服务器，重新启动服务

## 服务器的历史命令

最后附上实操的历史命令，真的是经过一系列的**踩坑**总结出的。

掌握的：

> 1. 数据库的迁移：flyway
> 2. docker compose的使用
> 3. docker上使用nginx部署前端的配资
> 4. Dockerfile的编写构建springboot服务镜像

历史命令：

```sh
1  2023-07-11 14:54:16  
    2  2023-07-10 12:49:52 ls
    3  2023-07-10 12:49:55 ls -a
    4  2023-07-10 12:49:57 top
    5  2023-07-10 12:50:05 yarn
    6  2023-07-10 12:50:08 yun
    7  2023-07-10 12:50:10 yum
    8  2023-07-10 12:50:46 yum install docker
    9  2023-07-10 12:52:08 docker
   10  2023-07-10 12:52:14 docker images
   11  2023-07-10 12:52:53 docker -v
   12  2023-07-10 12:53:09 docker --version
   13  2023-07-10 12:53:16 docker-compose -v
   14  2023-07-10 12:53:43 yum install redis
   15  2023-07-10 12:54:15 redis
   16  2023-07-10 12:54:20 redis-server
   17  2023-07-10 12:54:38 systemctl status redis
   18  2023-07-10 12:54:47 systemctl start redis
   19  2023-07-10 12:54:49 systemctl status redis
   20  2023-07-10 12:54:56 redis-cli
   21  2023-07-10 12:55:19 top
   22  2023-07-10 13:00:26 docker run --name bonfire-mysql -p 3306:3306 -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.28 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
   23  2023-07-10 13:01:23 ls
   24  2023-07-10 13:01:27 docker ps
   25  2023-07-10 13:01:31 docker ps -a
   26  2023-07-10 13:01:48 mkdir -r /my/own/datadir
   27  2023-07-10 13:01:53 mkdir -R /my/own/datadir
   28  2023-07-10 13:02:00 cd ..
   29  2023-07-10 13:02:00 ls
   30  2023-07-10 13:02:08 mkdir my
   31  2023-07-10 13:02:09 ls
   32  2023-07-10 13:02:11 cd my
   33  2023-07-10 13:02:17 mkdir own
   34  2023-07-10 13:02:19 cd own/
   35  2023-07-10 13:02:27 mkdir datadir
   36  2023-07-10 13:02:28 ls
   37  2023-07-10 13:02:37 docker run --name bonfire-mysql -p 3306:3306 -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.28 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
   38  2023-07-10 13:02:43 ls
   39  2023-07-10 13:02:45 cd datadir/
   40  2023-07-10 13:02:46 ls
   41  2023-07-10 13:02:51 cd 
   42  2023-07-10 13:02:56 docker ps -a
   43  2023-07-10 13:10:19 ls
   44  2023-07-10 13:10:33 ps -ef | group redis
   45  2023-07-10 13:10:41 ps -ef
   46  2023-07-10 13:15:58 ls
   47  2023-07-10 13:16:15 mkdir bonfire-app
   48  2023-07-10 13:16:17 cd bonfire-app/
   49  2023-07-10 13:16:25 vim Dockerfile
   50  2023-07-10 13:16:40 ls
   51  2023-07-10 13:21:24 ls
   52  2023-07-10 13:21:26 ll
   53  2023-07-10 13:21:33 ls -lh
   54  2023-07-10 13:21:39 cd target/
   55  2023-07-10 13:21:42 ll -h
   56  2023-07-10 13:21:47 cd ..
   57  2023-07-10 13:21:48 ls
   58  2023-07-10 13:22:08 docker build --help
   59  2023-07-10 13:22:29 docker build -t bonfire:1.0 .
   60  2023-07-10 13:23:27 docker images
   61  2023-07-10 13:23:55 docker run -d -p 8088:8088 2d002dbd5b5c
   62  2023-07-10 13:23:58 docker ps
   63  2023-07-10 13:24:04 docker ps
   64  2023-07-10 13:24:05 docker ps
   65  2023-07-10 13:24:07 docker ps
   66  2023-07-10 13:24:14 docker logs 00e808f448eb
   67  2023-07-10 13:24:24 docker ps
   68  2023-07-10 13:26:27 yum info redis
   69  2023-07-10 13:26:49 ls
   70  2023-07-10 13:26:50 cd
   71  2023-07-10 13:26:51 ls
   72  2023-07-10 13:26:53 cd ..
   73  2023-07-10 13:26:53 ls
   74  2023-07-10 13:26:55 cd etc/
   75  2023-07-10 13:26:56 ls
   76  2023-07-10 13:27:01 cd redis
   77  2023-07-10 13:27:15 vim redis.conf 
   78  2023-07-10 13:28:46 systemctl restart redis
   79  2023-07-10 13:28:54 systemctl status redis
   80  2023-07-10 13:28:59 redis-cli
   81  2023-07-10 13:32:40 ls
   82  2023-07-10 13:32:50 systemctl stop redis
   83  2023-07-10 13:32:56 systemctl status redis
   84  2023-07-10 13:33:13 redis-server redis.conf 
   85  2023-07-10 13:33:57 systemctl status redis
   86  2023-07-10 13:35:56 vim redis.conf 
   87  2023-07-10 13:36:44 vim redis.conf 
   88  2023-07-10 13:37:27 redis-server redis.conf 
   89  2023-07-10 13:37:37 systemctl status redis
   90  2023-07-10 13:37:49 redis-cli
   91  2023-07-10 13:39:34 ls
   92  2023-07-10 13:39:36 cd
   93  2023-07-10 13:39:36 ls
   94  2023-07-10 13:39:38 cd bonfire-app/
   95  2023-07-10 13:39:39 ls
   96  2023-07-10 13:39:55 docker build -t bonfire:1.1 .
   97  2023-07-10 13:40:02 docker images
   98  2023-07-10 13:40:12 docker rmi -f 2d002dbd5b5c
   99  2023-07-10 13:40:20 docker images
  100  2023-07-10 13:40:22 docker ps
  101  2023-07-10 13:40:38 docker run -d -p 8088:8088 688bae0a8257
  102  2023-07-10 13:40:43 docker ps
  103  2023-07-10 13:41:01 docker logs -f 46b501866f0f
  104  2023-07-10 13:43:39 systemctl --help
  105  2023-07-10 13:44:11 systemctl services --help
  106  2023-07-10 13:44:19 systemctl services 
  107  2023-07-10 13:44:25 systemctl list
  108  2023-07-10 13:44:40 systemctl status iptables
  109  2023-07-10 13:44:49 systemctl status firewarn
  110  2023-07-10 13:44:51 systemctl status firewarm
  111  2023-07-10 13:45:27 systemctl status firewalld
  112  2023-07-10 13:45:57 redis-cli
  113  2023-07-10 13:46:14 cd
  114  2023-07-10 13:46:15 cd /
  115  2023-07-10 13:46:16 ls
  116  2023-07-10 13:46:17 cd etc/
  117  2023-07-10 13:46:18 ls
  118  2023-07-10 13:46:23 vim redis.conf 
  119  2023-07-10 13:47:35 docker run -d -p 8088:8088 --network host 688bae0a8257
  120  2023-07-10 13:47:43 docker ps
  121  2023-07-10 13:48:01 docker ps -a
  122  2023-07-10 13:48:16 docker ps
  123  2023-07-10 13:48:33 docker logs 46b501866f0f
  124  2023-07-10 13:48:39 docker ps -a
  125  2023-07-10 13:48:54 docker rm -f 46b501866f0f 638346b1cb4e
  126  2023-07-10 13:49:04 docker ps
  127  2023-07-10 13:50:19 rpm -q podman
  128  2023-07-10 13:50:25 dnf remove podman
  129  2023-07-10 13:50:46 docker ps
  130  2023-07-10 13:51:35 yum remove docker                   docker-client                   docker-client-latest                   docker-common                   docker-latest                   docker-latest-logrotate                   docker-logrotate                   docker-engine
  131  2023-07-10 13:52:01 yum install -y yum-utils   device-mapper-persistent-data \
  132  2023-07-10 13:55:16 sudo yum install -y yum-utils
  133  2023-07-10 13:55:27 sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  134  2023-07-10 13:55:40 sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  135  2023-07-10 13:58:11 yum-config-manager     --add-repo     https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  136  2023-07-10 13:58:18 sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  137  2023-07-10 13:59:12 docker -v
  138  2023-07-10 14:05:01 docker
  139  2023-07-10 14:05:05 docker images
  140  2023-07-10 14:05:14 systemctl start docker
  141  2023-07-10 14:05:20 systemctl status docker
  142  2023-07-10 14:05:36 docker images
  143  2023-07-10 14:05:45 cd
  144  2023-07-10 14:05:47 ls
  145  2023-07-10 14:05:50 cd ..
  146  2023-07-10 14:05:51 ls
  147  2023-07-10 14:05:58 cd my/
  148  2023-07-10 14:05:59 ls
  149  2023-07-10 14:06:01 cd w
  150  2023-07-10 14:06:04 cd own/
  151  2023-07-10 14:06:05 ls
  152  2023-07-10 14:06:07 cd datadir/
  153  2023-07-10 14:06:07 ls
  154  2023-07-10 14:06:09 cd
  155  2023-07-10 14:06:52 history | grep docker
  156  2023-07-10 14:07:13 docker run --name bonfire-mysql -p 3306:3306 -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.28 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
  157  2023-07-10 14:08:17 ps -ef | grep 3306
  158  2023-07-10 14:08:22 ps -ef | grep mysql
  159  2023-07-10 14:08:33 docker ps
  160  2023-07-10 14:08:44 kill -9 14117
  161  2023-07-10 14:08:47 ps -ef | grep mysql
  162  2023-07-10 14:08:57 docker run --name bonfire-mysql -p 3306:3306 -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.28 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
  163  2023-07-10 14:09:03 docker ps -a
  164  2023-07-10 14:09:11 docker rm -f 942ca52b8eb6
  165  2023-07-10 14:09:13 docker run --name bonfire-mysql -p 3306:3306 -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.28 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
  166  2023-07-10 14:09:18 docker ps
  167  2023-07-10 14:10:02 ls
  168  2023-07-10 14:10:04 docker ps
  169  2023-07-10 14:10:14 docker exec -it ff4885cd81eb bash
  170  2023-07-10 14:11:20 redis-cli
  171  2023-07-10 14:11:47 redis-service --help
  172  2023-07-10 14:11:55 redis-server --help
  173  2023-07-10 14:12:34 redis-server /etc/redis.conf 
  174  2023-07-10 14:12:40 redis-cli
  175  2023-07-10 14:13:12 vim /etc/redis.conf 
  176  2023-07-10 14:13:58 redis-server /etc/redis.conf 
  177  2023-07-10 14:15:52 ps aux|grep redis
  178  2023-07-10 14:16:07 kill -9 23205
  179  2023-07-10 14:16:14 vim /etc/redis.conf 
  180  2023-07-10 14:16:33 redis-cli
  181  2023-07-10 14:17:06 redis-server /etc/redis.conf 
  182  2023-07-10 14:17:12 redis-cli
  183  2023-07-10 14:17:44 ls
  184  2023-07-10 14:17:46 cd bonfire-app/
  185  2023-07-10 14:17:47 ls
  186  2023-07-10 14:18:03 docker build -t bonfire:1.0 .
  187  2023-07-10 14:19:18 docker images
  188  2023-07-10 14:19:40 docker run -d -p 8088:8088 77a993af29ad
  189  2023-07-10 14:19:42 docker ps
  190  2023-07-10 14:19:55 docker logs -f 6cd7733b5732
  191  2023-07-10 14:20:29 docker ps
  192  2023-07-10 14:25:09 docker run --name bonfire-nginx -v /root/bonfire-app/html:/usr/share/nginx/html:ro -v /root/bonfire-app/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx
  193  2023-07-10 14:25:33 ls
  194  2023-07-10 14:26:56 lscf nginx.conf/
  195  2023-07-10 14:27:01 cd nginx.conf/
  196  2023-07-10 14:27:02 ls
  197  2023-07-10 14:27:04 cd ..
  198  2023-07-10 14:27:07 ls
  199  2023-07-10 14:27:12 rm -rf nginx.conf/
  200  2023-07-10 14:27:18 touch nginx.conf
  201  2023-07-10 14:27:19 ls
  202  2023-07-10 14:27:24 docker run --name bonfire-nginx -v /root/bonfire-app/html:/usr/share/nginx/html:ro -v /root/bonfire-app/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx
  203  2023-07-10 14:27:38 docker ps -a
  204  2023-07-10 14:27:48 docker rm -f 2652d0dcc163
  205  2023-07-10 14:27:51 docker run --name bonfire-nginx -v /root/bonfire-app/html:/usr/share/nginx/html:ro -v /root/bonfire-app/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx
  206  2023-07-10 14:27:53 docker ps
  207  2023-07-10 14:27:59 docker ps -a
  208  2023-07-10 14:28:08 docker logs 8fc0a4b3b3a8
  209  2023-07-10 14:28:24 ls
  210  2023-07-10 14:28:29 docker ps -a
  211  2023-07-10 14:28:50 ls
  212  2023-07-10 14:28:54 vim nginx.conf 
  213  2023-07-10 14:31:29 docker rm -f 8fc0a4b3b3a8
  214  2023-07-10 14:31:35 docker run --name bonfire-nginx -v /root/bonfire-app/html:/usr/share/nginx/html:ro -v /root/bonfire-app/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx
  215  2023-07-10 14:31:38 docker ps
  216  2023-07-10 14:31:40 docker ps
  217  2023-07-10 14:31:41 docker ps
  218  2023-07-10 14:31:43 docker ps
  219  2023-07-10 14:31:44 docker ps
  220  2023-07-10 14:31:46 docker ps
  221  2023-07-10 14:31:53 docker logs 9f13b2a470dc
  222  2023-07-10 14:32:07 ls
  223  2023-07-10 14:32:10 docker ps
  224  2023-07-10 14:32:19 docker exec -it 9f13b2a470dc bash
  225  2023-07-10 14:35:23 ls
  226  2023-07-10 14:35:27 docker ps
  227  2023-07-10 14:36:34 docker rm -f 9f13b2a470dc
  228  2023-07-10 14:36:50 docker run --name bonfire-nginx -v /root/bonfire-app/html:/usr/share/nginx/html:ro -v /root/bonfire-app/nginx.conf:/etc/nginx/nginx.conf:ro -d -p 80:80 nginx
  229  2023-07-10 14:36:53 docker ps
  230  2023-07-10 14:37:42 ls
  231  2023-07-10 14:37:48 vim nginx.conf 
  232  2023-07-10 14:38:51 docker ps
  233  2023-07-10 14:39:01 docker logs 6cd7733b5732
  234  2023-07-10 14:39:13 docker ps
  235  2023-07-10 14:39:22 docker restart ad294e28d290
  236  2023-07-10 14:39:54 vim nginx.conf 
  237  2023-07-10 14:40:39 docker restart ad294e28d290
  238  2023-07-10 14:42:05 docker logs 6cd7733b5732
  239  2023-07-10 14:44:19 docker logs 6cd7733b5732
  240  2023-07-10 14:44:59 docker ps
  241  2023-07-10 14:45:47 ls
  242  2023-07-10 14:45:50 cd /
  243  2023-07-10 14:45:51 ls
  244  2023-07-10 14:45:53 cd my
  245  2023-07-10 14:45:54 ls
  246  2023-07-10 14:45:55 cd own/
  247  2023-07-10 14:45:56 ls
  248  2023-07-10 14:45:59 cd datadir/
  249  2023-07-10 14:46:00 ls
  250  2023-07-10 14:46:06 cd mysql
  251  2023-07-10 14:46:07 ls
  252  2023-07-10 14:46:09 cd ..
  253  2023-07-10 14:46:25 cat auto.cnf 
  254  2023-07-10 14:49:30 docker ps
  255  2023-07-10 14:51:13 docker inject ff4885cd81eb
  256  2023-07-10 14:51:23 docker --help
  257  2023-07-10 14:51:37 docker inspact ff4885cd81eb
  258  2023-07-10 14:51:45 docker inspect ff4885cd81eb
  259  2023-07-10 14:52:49 history | grep docker run 
  260  2023-07-10 14:53:04 history | grep 'docker run'
  261  2023-07-10 14:54:11 docker ps
  262  2023-07-10 14:54:19 docker rm -f ff4885cd81eb
  263  2023-07-10 14:54:54 docker run --name bonfire-mysql -p 3306:3306 -v /my/own/datadir:/var/lib/mysql -v /my/custom:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.28 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
  264  2023-07-10 14:55:00 docker ps
  265  2023-07-10 14:55:04 ;s
  266  2023-07-10 14:55:07 ls
  267  2023-07-10 14:55:08 cd .
  268  2023-07-10 14:55:10 cd ..
  269  2023-07-10 14:55:10 ls
  270  2023-07-10 14:55:13 cd ..
  271  2023-07-10 14:55:13 ls
  272  2023-07-10 14:55:16 cd custom/
  273  2023-07-10 14:55:16 ls
  274  2023-07-10 14:56:21 vim my.cnf
  275  2023-07-10 14:57:17 docker ps
  276  2023-07-10 14:57:26 docker restart d02e998ad8f9
  277  2023-07-10 14:58:50 docker logs 6cd7733b5732
  278  2023-07-10 15:01:25 mysql
  279  2023-07-10 15:01:41 docker ps
  280  2023-07-10 15:09:07 ls
  281  2023-07-10 15:09:12 vim my.cnf 
  282  2023-07-10 15:09:23 rm -f my.cnf 
  283  2023-07-10 15:09:24 ls
  284  2023-07-10 15:09:26 cd ..
  285  2023-07-10 15:09:27 ls
  286  2023-07-10 15:09:29 cd
  287  2023-07-10 15:10:41 ls
  288  2023-07-10 15:10:47 docker ps
  289  2023-07-10 15:10:55 docker stop d02e998ad8f9
  290  2023-07-10 15:11:11 docker rm -f 6cd7733b5732
  291  2023-07-10 15:11:13 ls
  292  2023-07-10 15:11:42 docker images
  293  2023-07-10 15:11:45 cd bonfire-app/
  294  2023-07-10 15:11:46 ls
  295  2023-07-10 15:11:56 docker build -t bonfire:2.0 .
  296  2023-07-10 15:12:04 docker images
  297  2023-07-10 15:12:32 docker run --name bonfire_server -p 8088:8088 -d 4c8b535e3b85
  298  2023-07-10 15:12:37 docker ps
  299  2023-07-10 15:12:45 docker logs ec626f3344d3
  300  2023-07-10 15:12:51 docker logs -f ec626f3344d3
  301  2023-07-10 20:08:41 ls
  302  2023-07-10 20:08:56 docker build -t bonfire:2.2 .
  303  2023-07-10 20:09:03 docker ps -a
  304  2023-07-10 20:09:25 docker rm -f ec626f3344d3
  305  2023-07-10 20:09:29 docker images
  306  2023-07-10 20:10:36 docker run -d -p 8088:8088 --name bonfire_server -v /root/bonfire-app/images:/app/images/ bd6398b9717d
  307  2023-07-10 20:10:38 ls
  308  2023-07-10 20:10:41 cd images/
  309  2023-07-10 20:10:42 ls
  310  2023-07-10 20:10:51 docker ps
  311  2023-07-10 20:10:56 docker ps -a
  312  2023-07-10 20:11:08 docker logs 70c1e15bc759
  313  2023-07-10 20:11:56 redis-cli
  314  2023-07-10 20:15:32 docker ps -a
  315  2023-07-10 20:15:41 docker rm -f 70c1e15bc759
  316  2023-07-10 20:15:45 docker images
  317  2023-07-10 20:15:58 docker rmi bd6398b9717d 4c8b535e3b85 77a993af29ad
  318  2023-07-10 20:16:01 ls
  319  2023-07-10 20:16:03 cd ..
  320  2023-07-10 20:16:04 ls
  321  2023-07-10 20:16:41 docker build -t bonfire:3.0 .
  322  2023-07-10 20:16:48 docker images
  323  2023-07-10 20:17:06 docker run -d -p 8088:8088 --name bonfire_server -v /root/bonfire-app/images:/app/images/ a6342b4a171c
  324  2023-07-10 20:17:10 docker ps -a
  325  2023-07-10 20:17:15 docker ps -a
  326  2023-07-10 20:17:25 docker logs -f ad7c841ad50e
  327  2023-07-10 20:21:37 ls
  328  2023-07-10 20:21:40 cd images/
  329  2023-07-10 20:21:41 ls
  330  2023-07-10 20:21:43 cd ..
  331  2023-07-10 20:21:44 ls
  332  2023-07-10 20:21:53 cd ..
  333  2023-07-10 20:21:54 ls
  334  2023-07-11 11:20:45 ls
  335  2023-07-11 11:30:20 ls
  336  2023-07-11 11:30:24 cd /
  337  2023-07-11 11:30:25 ls
  338  2023-07-11 11:30:26 cd etc/
  339  2023-07-11 11:30:27 ls
  340  2023-07-11 11:30:34 vim redis.conf 
  341  2023-07-11 11:31:39 docker ps
  342  2023-07-11 11:31:50 docker inspect --help
  343  2023-07-11 11:32:01 docker inspect ad7c841ad50e
  344  2023-07-11 11:32:22 ls
  345  2023-07-11 11:32:30 systemctl status redis
  346  2023-07-11 11:33:41 ls
  347  2023-07-11 11:33:56 cd systemd/
  348  2023-07-11 11:33:56 ls
  349  2023-07-11 11:34:03 cd system
  350  2023-07-11 11:34:04 ls
  351  2023-07-11 11:34:21 cat redis.service
  352  2023-07-11 11:34:31 cd redis.service.d/
  353  2023-07-11 11:34:32 ls
  354  2023-07-11 11:34:36 cat limit.conf 
  355  2023-07-11 11:34:44 cd ..
  356  2023-07-11 11:34:46 ls
  357  2023-07-11 11:37:04 ps -ef | grep redis-server
  358  2023-07-11 11:37:13 kill 36319
  359  2023-07-11 11:37:19 ps -ef | grep redis-server
  360  2023-07-11 11:37:27 docker ps
  361  2023-07-11 11:37:38 systemctl start redis
  362  2023-07-11 11:37:45 systemctl status redis
  363  2023-07-11 11:38:09 systemctl start redis
  364  2023-07-11 11:38:11 systemctl status redis
  365  2023-07-11 11:38:50 cd ..
  366  2023-07-11 11:38:51 cd ..
  367  2023-07-11 11:38:52 ls
  368  2023-07-11 11:38:57 vim redis.conf 
  369  2023-07-11 11:39:12 systemctl start redis
  370  2023-07-11 11:39:16 systemctl status redis
  371  2023-07-11 11:42:38 docker ps
  372  2023-07-11 11:42:45 docker logs ad7c841ad50e
  373  2023-07-11 11:43:17 docker ps
  374  2023-07-11 11:44:12 docker logs ad7c841ad50e
  375  2023-07-11 11:46:57 systemctl status redis
  376  2023-07-11 11:47:11 vim redis.conf 
  377  2023-07-11 11:47:35 systemctl restart redis
  378  2023-07-11 11:47:38 systemctl status redis
  379  2023-07-11 11:47:45 systemctl status redis
  380  2023-07-11 11:48:25 vim redis.conf 
  381  2023-07-11 11:54:41 systemctl stop redis
  382  2023-07-11 11:54:52 systemctl status redis
  383  2023-07-11 11:54:57 docker ps
  384  2023-07-11 11:55:04 docker stop ad7c841ad50e
  385  2023-07-11 12:01:08 ls
  386  2023-07-11 12:01:20 docker images
  387  2023-07-11 12:01:39 cd
  388  2023-07-11 12:01:40 ls
  389  2023-07-11 12:01:43 docker images
  390  2023-07-11 12:01:56 ls
  391  2023-07-11 12:01:58 cd bonfire-app/
  392  2023-07-11 12:01:59 ls
  393  2023-07-11 12:02:12 vim docker-compose.yml
  394  2023-07-11 12:13:33 ls
  395  2023-07-11 12:13:36 docker ps
  396  2023-07-11 12:13:38 docker ps -a
  397  2023-07-11 12:13:52 docker rm ad7c841ad50e d02e998ad8f9
  398  2023-07-11 12:13:53 ls
  399  2023-07-11 12:14:01 docker ps -a
  400  2023-07-11 12:14:29 ps -ef | grep mysql
  401  2023-07-11 12:14:34 ps -ef | grep 3306
  402  2023-07-11 12:14:38 ps -ef | grep redis
  403  2023-07-11 12:14:40 ls
  404  2023-07-11 12:15:05 dockerls
  405  2023-07-11 12:15:09 vim docker-compose.yml 
  406  2023-07-11 12:15:54 docker-compose -v
  407  2023-07-11 12:15:57 ls
  408  2023-07-11 12:16:09 docker-compose up -d
  409  2023-07-11 12:16:16 docker -v
  410  2023-07-11 12:17:44 docker-compose --version
  411  2023-07-11 12:18:56 sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  412  2023-07-11 12:19:38 ls
  413  2023-07-11 12:19:56 ls /usr/local/bin/
  414  2023-07-11 12:20:16 rm -f /usr/local/bin//docker-compose 
  415  2023-07-11 12:20:19 ls /usr/local/bin/
  416  2023-07-11 12:21:05 sudo curl -L https://download.fastgit.org/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
  417  2023-07-11 12:21:32 sudo curl -L https://download.fastgit.org/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
  418  2023-07-11 12:22:27 sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
  419  2023-07-11 12:22:46 sudo chmod +x /usr/local/bin/docker-compose
  420  2023-07-11 12:23:06 docker-compose -v
  421  2023-07-11 12:23:42 rm -f /usr/local/bin//docker-compose 
  422  2023-07-11 12:23:47 ls /usr/local/bin/
  423  2023-07-11 12:23:56 docker-compose -v
  424  2023-07-11 12:24:56 yum update
  425  2023-07-11 13:44:31 docker images
  426  2023-07-11 13:46:08 ls
  427  2023-07-11 13:46:10 ls
  428  2023-07-11 13:46:19 ls -a
  429  2023-07-11 13:46:42 ls
  430  2023-07-11 13:46:59 docker build -t bonfire:4.0 .
  431  2023-07-11 13:47:03 ls
  432  2023-07-11 13:47:07 docker images
  433  2023-07-11 13:47:15 vim docker-compose.yml 
  434  2023-07-11 13:48:40 docker-compose -v
  435  2023-07-11 13:48:55 yum install docker-compose-plugin
  436  2023-07-11 13:49:20 docker compose version
  437  2023-07-11 13:49:28 ls
  438  2023-07-11 13:50:44 docker compose up -d
  439  2023-07-11 13:51:03 docker ps
  440  2023-07-11 13:51:12 docker ps
  441  2023-07-11 13:51:22 docker logs 48ef03bb2ecf
  442  2023-07-11 13:51:50 docker ps
  443  2023-07-11 13:52:02 docker exec -it dbaec7422f0c bash
  444  2023-07-11 13:53:30 ls
  445  2023-07-11 13:53:33 docker ps
  446  2023-07-11 13:53:42 top
  447  2023-07-11 13:53:48 docker ps
  448  2023-07-11 13:53:58 docker logs 3da25c0a0b2a
  449  2023-07-11 13:54:15 docker logs 48ef03bb2ecf
  450  2023-07-11 13:57:39 docker ps
  451  2023-07-11 13:57:42 ls
  452  2023-07-11 13:57:54 cd images/
  453  2023-07-11 13:57:54 ls
  454  2023-07-11 13:57:56 cd ..
  455  2023-07-11 13:57:57 ls
  456  2023-07-11 13:59:01 docker logs ad294e28d290
  457  2023-07-11 14:00:19 docker logs ad294e28d290
  458  2023-07-11 14:02:19 docker ps
  459  2023-07-11 14:02:27 ls
  460  2023-07-11 14:02:29 cd html/
  461  2023-07-11 14:02:30 ls
  462  2023-07-11 14:02:31 cd ..
  463  2023-07-11 14:02:32 ls
  464  2023-07-11 14:02:37 vim nginx.conf 
  465  2023-07-11 14:06:19 docker ps
  466  2023-07-11 14:06:22 ls
  467  2023-07-11 14:06:50 cd mysql
  468  2023-07-11 14:06:51 ls
  469  2023-07-11 14:06:56 cd star_project/
  470  2023-07-11 14:06:56 ls
  471  2023-07-11 14:07:02 cd ..
  472  2023-07-11 14:07:04 cd ..
  473  2023-07-11 14:07:04 ls
  474  2023-07-11 14:07:12 docker compose ps
  475  2023-07-11 14:07:23 docker compose --help
  476  2023-07-11 14:07:58 docker compose top
  477  2023-07-11 14:17:05 docker ps
  478  2023-07-11 14:17:22 docker restart ad294e28d290
  479  2023-07-11 14:17:40 docker ps
  480  2023-07-11 14:17:54 docker images
  481  2023-07-11 14:18:43 docker rmi a6342b4a171c
  482  2023-07-11 14:18:47 docker images
  483  2023-07-11 14:18:56 docker ps
  484  2023-07-11 14:19:53 top
  485  2023-07-11 14:20:56 docker network ps
  486  2023-07-11 14:21:00 docker network ls
  487  2023-07-11 14:21:19 docker network inspect 2526c192ec6e
  488  2023-07-11 14:27:35 ls
  489  2023-07-11 14:27:39 docker ps
  490  2023-07-11 14:27:45 docker logs ad294e28d290
  491  2023-07-11 14:30:09 ls
  492  2023-07-11 14:30:24 ls
  493  2023-07-11 14:30:26 docker ps
  494  2023-07-11 14:43:21 docker logs ad294e28d290
  495  2023-07-11 14:44:10 systemctl status firewall
  496  2023-07-11 14:44:26 systemctl status firewalld
  497  2023-07-11 14:45:28 ls
  498  2023-07-11 14:45:31 docker ps
  499  2023-07-11 14:45:43 docker exec -it ad294e28d290 bash
  500  2023-07-11 14:54:27 docker ps
  501  2023-07-11 14:54:35 systemctl start docker
  502  2023-07-11 14:54:43 systemctl status docker
  503  2023-07-11 14:54:51 docker ps
  504  2023-07-11 14:54:55 docker ps -a
  505  2023-07-11 14:55:05 docker start ad294e28d290
  506  2023-07-11 14:55:24 cd bonfire-app/
  507  2023-07-11 14:55:24 ls
  508  2023-07-11 14:55:30 docker compose up -d
  509  2023-07-11 14:58:33 docker compose logs
  510  2023-07-11 15:10:45 history
```

