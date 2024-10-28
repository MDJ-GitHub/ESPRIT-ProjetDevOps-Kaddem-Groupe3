FROM openjdk:17
WORKDIR /app
COPY "target/kaddem-0.0.1-SNAPSHOT.jar" "kaddem-0.0.1-SNAPSHOT.jar"
EXPOSE 8089
CMD ["java", "-jar", "kaddem-0.0.1-SNAPSHOT.jar"]
