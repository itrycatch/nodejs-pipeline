pipeline {
    agent any
    stages {
        stage('Prepare') {
            steps {
                gitHubPRStatus githubPRMessage('${GITHUB_PR_COND_REF} run started')
            }
        }
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
