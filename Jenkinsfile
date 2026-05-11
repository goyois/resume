pipeline {
    agent none

        environment {
            AWS_S3_BUCKET = 'portfolio-489023881839-ap-northeast-2-an'
        }

    stages {
            stage ('check'){

                agent any
                steps {
                    echo 'GitHub 에서 SSR Server 소스를 가져옵니다.'
                    git branch: 'main', url: 'https://github.com/goyois/resume.git'
                }
            }


            stage('deploy to s3') {
                agent {
                    docker {
                        image 'amazon/aws-cli'
                        reuseNode true
                        args "--entrypoint=''"
                    }
                }

                steps {
                    withCredentials([usernamePassword(credentialsId: 'my-aws', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                        sh '''
                            echo "aws-cli version:"
                            aws --version
                            echo "파일 s3 동기화.."
                            aws s3 sync . s3://$AWS_S3_BUCKET --exclude '*' --include 'index.html' --delete
                        '''
                }
            }
        }
    }
}