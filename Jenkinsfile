pipeline {
    agent any
    tools {
        maven 'M2_HOME'
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
                sh 'mvn install -DskipTests'
            }
        }

        stage('MVN DEPLOY') {
            steps {
                sh 'mvn deploy -DskipTests'
            }
        }
    }
}
