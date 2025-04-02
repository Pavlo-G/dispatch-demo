# Use an OpenJDK base image for Java 21
FROM amazoncorretto:21.0.4-alpine3.18

# Set the working directory
WORKDIR /app

# Copy the build files
COPY build/libs/tech-service-*.jar app.jar
# Copy the application-kube.yaml file to the container
COPY deployment/application-kube.yaml /app/application-kube.yaml
# Expose the port the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.config.location=file:/app/application-kube.yaml"]

