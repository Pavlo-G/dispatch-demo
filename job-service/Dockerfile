# Use an OpenJDK base image for Java 21
FROM amazoncorretto:21-alpine

# Set the working directory
WORKDIR /app

# Copy the build files
COPY build/libs/job-service-*.jar app.jar
# Expose the port the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
