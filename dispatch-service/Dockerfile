# Use an OpenJDK base image for Java 21
FROM amazoncorretto:21.0.4-alpine3.18

# Set the working directory
WORKDIR /app

# Copy the build files
COPY build/libs/dispatch-service-*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]