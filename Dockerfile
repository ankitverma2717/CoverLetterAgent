# Use a base image with Java 21 installed.
# The 'slim' variant is a smaller, more secure image.
FROM openjdk:21-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle wrapper files into the container.
# This allows the container to build the project without needing Gradle pre-installed.
COPY gradlew .
COPY gradle ./gradle

# Copy the build configuration file.
COPY build.gradle .
COPY settings.gradle .

# Copy the rest of the source code.
COPY src ./src

# Make the Gradle wrapper executable.
RUN chmod +x ./gradlew

# Build the application and create the executable JAR file.
# The '--no-daemon' flag is recommended for CI/CD environments like Render.
RUN ./gradlew bootJar --no-daemon

# Expose the port the application will run on. Render provides a PORT environment variable.
# Spring Boot will automatically listen on this port if we set it.
EXPOSE 10000

# The command to run when the container starts.
# We find the JAR file in the build directory and execute it.
CMD ["java", "-jar", "build/libs/CoverLetterAgent-0.0.1-SNAPSHOT.jar"]
