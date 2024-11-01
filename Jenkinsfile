pipeline {
    agent any
    tools {
        maven 'M2_HOME'
        jdk 'JAVA_HOME'
    }

    stages {
        stage('GIT') {
            steps {
                git branch: 'AymenChebli-5Arctic4-G3',
                url: 'https://github.com/MDJ-GitHub/5ArcTIC4-G3-Kaddem.git'
            }
        }

        stage('CLEAN AND COMPILE STAGE') {
            steps {
                sh 'mvn clean compile -DskipTests';
            }
        }


        stage('MVN SONARQUBE') {
            steps {
                sh 'mvn sonar:sonar -Dsonar.login=sqa_69398ed610b6c6ed9df81e50d9c82630c276520d'
            }
        }


        stage('MVN BUILD') {
            steps {
                // Build locally
                sh 'mvn install -DskipTests'
            }
        }

        stage('MVN DEPLOY') {
            steps {
                // Deploy to Nexus
                sh 'mvn deploy -DskipTests'
            }
        }

        stage('DOCKER BUILD') {
            steps {
                // Build a Docker Image
                sh 'docker build -t  chebliaymen/AymenCHEBLI-5Arctic4-G3-kaddem:latest .'
            }
        }

        stage('DOCKER DEPLOY') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials-id', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    // Log in to Docker Hub
                    sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"

                    // Push the Docker image to Docker Hub
                    sh 'docker push chebliaymen/AymenCHEBLI-5Arctic4-G3-kaddem:latest'
                }
            }
        }

        stage('DOCKER COMPOSE') {
            steps {
                script {
                    sh 'docker-compose up -d'
                    }
                }
        }
    }
}
