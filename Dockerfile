
FROM openjdk:11-jdk-slim

EXPOSE 8089

WORKDIR /app

COPY target/Kaddem-9.jar app.jar


ENTRYPOINT ["java", "-jar", "app.jar"]
