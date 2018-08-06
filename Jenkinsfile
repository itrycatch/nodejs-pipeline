pipeline {
    agent any
    stages {
        stage('Install Node Modules') {
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
