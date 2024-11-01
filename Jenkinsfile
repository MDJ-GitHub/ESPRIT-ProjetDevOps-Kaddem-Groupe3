// DevOpsProjectPipeline : Kaddem

pipeline {
    agent any
    
    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    environment {
        GITHUB_REPO = 'https://github.com/MDJ-GitHub/5ArcTIC4-G3-Kaddem.git'
        SONARQUBE_SERVER = 'sonarqube'  // Ensure this matches your Jenkins configuration
        SONAR_TOKEN = credentials('sonarqubesecret')  // Replace with the exact ID of your credential
        NEXUS_CREDENTIALS = credentials('nexus_credentials')

    }

    stages {
        stage('GitHub Checkout') {
            steps {
                script {
                    git branch: 'MariemBENJABALLAH-5arctic4-G3', url: GITHUB_REPO
                }
            }
        }

        stage('Clean and Compile') {
            steps {
                sh 'mvn clean compile -DskipTests'
            }
        }
      
      stage('TEST (jaccoco reposrt)') {
            steps {
                echo 'Generating JaCoCo report'
                // Exécuter Maven pour générer le rapport JaCoCo
                sh 'mvn jacoco:report'
            }
        }
      stage('SonarQube Analysis') {
                  steps {
                      withSonarQubeEnv(SONARQUBE_SERVER) {  // Ensure this matches your Jenkins' SonarQube configuration
                          sh """
                              mvn sonar:sonar \
                              -Dsonar.projectKey=5ArcTIC4-G3-Kaddem-MariemBENJABALLAH-5arctic4-G3 \
                              -Dsonar.host.url=http://192.168.33.10:9000 \
 			      -Dsonar.java.binaries=target/classes \
                              -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml \
                              -Dsonar.login=${SONAR_TOKEN}
                          """
                      }
                  }
              }
      
        stage('Deploy to Nexus') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'nexus_credentials', usernameVariable: 'NEXUS_USERNAME', passwordVariable: 'NEXUS_PASSWORD')]) {
                    sh """
                        mvn deploy -DskipTests=true \
                        -Dusername=${NEXUS_USERNAME} \
                        -Dpassword=${NEXUS_PASSWORD}
                    """
                }
            }
        }
       

        stage('Build Docker Image BACKEND') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t  mariembenjaballah/mariembenjaballah-5arctic4-g3-kaddem-back:latest ."
                }
            }
        }

        stage('Push Docker Image BACKEND') {
            steps {
                script {
                    // Log in to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'Dockercredentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin'
                        // Push the Docker image to Docker Hub
                        sh "docker push mariembenjaballah/mariembenjaballah-5arctic4-g3-kaddem-back:latest"
                    }
                }
            }
        }

        stage('Deploy Docker Compose') {
            steps {
                script {
                    // Use Docker Compose to deploy the application
                    sh 'docker compose up -d'
                }
            }
        }
    }

  post {
    success {
        script {
            slackSend(
                channel: '#jenkinsnotif', 
                message: "Le build a réussi : ${env.JOB_NAME} #${env.BUILD_NUMBER} "
            )
        }
    }
    failure {
        script {
            slackSend(
                channel: '#jenkinsnotif', 
                message: "Le build a échoué : ${env.JOB_NAME} #${env.BUILD_NUMBER}."
            )
        }
    }
}
