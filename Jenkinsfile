pipeline {
    agent any
    stages {
        stage('Build node_modules') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run UTs') { 
            steps {
                sh 'npm test'
            }
        }
    }
}
