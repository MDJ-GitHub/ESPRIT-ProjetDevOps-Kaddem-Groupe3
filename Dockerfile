FROM openjdk:17
EXPOSE 8089
WORKDIR /app
COPY "target/kaddem-0.0.1-SNAPSHOT.jar" "kaddem-0.0.1-SNAPSHOT.jar"
CMD ["java", "-jar", "kaddem-0.0.1-SNAPSHOT.jar"]