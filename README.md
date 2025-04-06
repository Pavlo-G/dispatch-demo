# Dispatch Demo Project

## Recommended Setup (Windows)

For Windows users, it's recommended to use the [Chocolatey](https://chocolatey.org/) package manager to simplify the installation of prerequisites like Java and kubectl. If you don't have Chocolatey installed, you can install it by following the [instructions](https://chocolatey.org/install) on their website.

## Prerequisites

1.  **Java 21 installed:** Ensure the `JAVA_HOME` environment variable is set correctly.
    ```powershell
    choco install openjdk --version=21
    ```
2.  **Docker Desktop installed:** Add your Docker Hub account.
3.  **Kubernetes enabled in Docker Desktop:** Go to `Settings -> Kubernetes -> Enable Kubernetes`.
4.  **Kubernetes cli tools installed:**
    * install kubectl and helm
        ```powershell
        choco install kubernetes-cli kubernetes-helm
        ```
    *   Verify the `docker-desktop` node is running:
        ```powershell
        kubectl get nodes
        ```
    *   Ensure kubectl uses the correct context:
        ```powershell
        kubectl config use-context docker-desktop
        ```
5.  **Apply Ingress Controller:** Run the following command to apply the Nginx ingress controller configuration for Kubernetes:
    ```powershell
    helm upgrade --install ingress-nginx ingress-nginx \
    --repo https://kubernetes.github.io/ingress-nginx \
    --namespace ingress-nginx --create-namespace
    ```

## Installation

1.  **Clone the project:**
    ```powershell
    git clone https://github.com/Pavlo-G/dispatch-demo.git
    ```
2.  **Build each service:** The project contains three services: `dispatch-service`, `job-service`, and `tech-service`. To perform a fresh build you can use the `buildAll` or `buildAllFresh` gradle tasks from the project root:
    ```powershell
    ./gradlew buildAll
    ```
    *(Note: Use `gradlew.bat` on Windows if `./gradlew` doesn't work)*

3.  **Build Docker images:** The images for all projects can be built using the gradle task `buildAllDocker`
    ```powershell
    ./gradlew buildAllDocker
    ```

4.  **Verify Docker images:** Ensure all three service images (`dispatch-service:latest`, `job-service:latest`, `tech-service:latest`) are present in your Docker Desktop Images collection.

5.  **Deploy services to Kubernetes:** Each service has a `deployment` folder containing Kubernetes configuration files. Navigate into each service's `deployment` folder and apply the configurations manually:
    ```powershell
    # Example for dispatch-service (repeat for job-service and tech-service)
    cd dispatch-service/deployment
    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml
    kubectl apply -f ingress.yaml
    ```
    or use the gradle task `deployAll`:
    ```powershell
    ./gradlew deployAll
    ```

    *   **Check deployment status:** Verify that all Kubernetes objects were created successfully:
        ```powershell
        kubectl get deployments
        kubectl get services
        kubectl get ingresses
        ```

6.  **Test the services:** Check if the services are responding correctly by sending GET requests:
    *   Technicians: `http://demo.localhost/tech-service/technicians`
    *   Jobs: `http://demo.localhost/job-service/jobs`

    You should receive an initial list of technicians or jobs, which are injected into an H2 in-memory database during service startup.
7. Swagger ui available at:
    *   Dispatch-service: `http://demo.localhost/dispatch-service/swagger-ui/index.html`
    *   Job-service: `http://demo.localhost/job-service/swagger-ui/index.html`
    *   Tech-service: `http://demo.localhost/tech-service/swagger-ui/index.html`