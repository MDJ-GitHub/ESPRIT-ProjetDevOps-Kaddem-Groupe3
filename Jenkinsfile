pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = 'dockerHubCredentials'
        PROJECT_BACK_NAME = 'kaddem-back'
        PROJECT_FRONT_NAME = 'kaddem-front'
        DOCKER_IMAGE_BACK = 'mdjdocker/kaddem-back'
        DOCKER_IMAGE_FRONT = 'mdjdocker/kaddem-front'
        GITHUB_REPO = 'https://github.com/MDJ-GitHub/ESPRIT-ProjetDevOps-Kaddem-Groupe3.git'
        JAVA_8_HOME = '/usr/lib/jvm/java-8-openjdk-amd64'
    }
    stages {
        stage('1/5 | Install Builders (Maven, NodeJS, and Java 1.8)') {
            steps {
                script {
                    if (sh(returnStatus: true, script: 'which mvn') != 0) {
                        echo 'Maven is not installed. Proceeding with installation.'
                        sh '''
                            sudo apt update
                            sudo apt install -y maven 
                        '''
                        echo 'Maven installed successfully.'
                    }
                    if (sh(returnStatus: true, script: 'which nodejs') != 0) {
                        echo 'NodeJS is not installed. Proceeding with installation.'
                        sh '''
                            sudo apt update
                            curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
                            sudo apt install -y nodejs
                            sudo npm install -g @angular/cli
                        '''
                        echo 'NodeJS installed successfully.'
                    }
                    if (!fileExists("${JAVA_8_HOME}")) {
                        echo 'Java 1.8 is not installed. Proceeding with installation.'
                        sh '''
                            sudo apt update
                            sudo apt install -y openjdk-8-jdk
                        '''
                        echo 'Java 1.8 installed successfully.'
                    }
                }
            }
        }
        stage('2/5 | Github Checkout') {
            steps {
                script {
                    git branch: 'MohamedDhiaJebali', url: GITHUB_REPO
                }
            }
        }
        stage('3/5 | Building Project') {
            steps {
                script {
                    echo 'Building the backend of the project (SpringBoot/Maven)'
                    env.JAVA_HOME = "${JAVA_8_HOME}"
                    env.PATH = "${JAVA_HOME}/bin:${env.PATH}"
                    sh 'java -version'
                    sh 'mvn clean package'
                    echo 'Building the frontend of the project (Angular/NodeJS)'
                    dir('front') {
                        sh 'sudo npm install'
                        sh 'ng build --configuration production'
                    }
                }
            }
        }
        stage('4/5 | Docker Containement') {
            steps {
                script {
                    echo 'Dockerizing the backend of the project (SpringBoot)'
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                        def version = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                        def dockerImage = docker.build("${DOCKER_IMAGE_BACK}:${version}")
                        dockerImage.tag('latest')
                        dockerImage.push("${version}")
                        dockerImage.push('latest')
                        docker.image("${DOCKER_IMAGE_BACK}:latest").pull()
                    }
                    echo 'Dockerizing the frontend of the project (Angular)'
                    dir('front') {
                        docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                            def version = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                            def dockerImage = docker.build("${DOCKER_IMAGE_FRONT}:${version}")
                            dockerImage.tag('latest')
                            dockerImage.push("${version}")
                            dockerImage.push('latest')
                            docker.image("${DOCKER_IMAGE_FRONT}:latest").pull()
                        }
                    }
                }
            }
        }
        stage('5/5 | Kubernetes Deployment') {
            steps {
                script {
                    def version = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    sh "sed -i 's/:latest/:${version}/g' Kubernetesfile.yaml"
                    sh 'sudo kubectl apply -f Kubernetesfile.yaml'
                }
            }
        }
    }
    post {
        success {
            echo 'ESPRIT DevOps Projet Kaddem Group3 pipeline completed successfully'
        }
        failure {
            echo 'ESPRIT DevOps Projet Kaddem Group3 pipeline failed.'
        }
    }
}
