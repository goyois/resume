pipeline {
    agent none

        environment {
            AWS_S3_BUCKET = 'portfolio-489023881839-ap-northeast-2-an'
        }

    stages {
            stage('deploy to s3') {
                agent {
                    docker {
                        image 'amazon/aws-cli'
                        args "--entrypoint=''"
                    }
                }
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'my-aws', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'cloudfront', variable: 'CF_ID') // Secret text인 경우
                ]) {
                    sh '''
                        echo ">> S3 파일 동기화 중.."
                        aws s3 sync src/main/resources/static/ s3://${AWS_S3_BUCKET} --delete

                        echo ">> CloudFront 캐시 무효화 중.."
                        aws cloudfront create-invalidation --distribution-id ${CF_ID} --paths "/*"
                    '''
                }
            }
        }
    }
}