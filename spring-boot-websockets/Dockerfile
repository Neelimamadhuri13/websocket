FROM openjdk:11
ADD ./target/spring-boot-websockets-0.0.1-SNAPSHOT.jar /event/src/app.jar
EXPOSE 8088
WORKDIR event/src
ENTRYPOINT ["java","-jar","app.jar"]
