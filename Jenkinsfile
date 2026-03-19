pipeline {
    agent any
   
   
    stages {
       
        stage('Clone Branch Main'){
            steps  {
              checkout scm
            }
        }
       
        stage('Docker Build and Deploy Production'){
            steps{
                //  sh 'docker rm -f redex_frontend &> /dev/null'
                 sh 'docker compose -f docker-compose.prod.yml -p redex_frontend up --build -d --force-recreate '
                //  sh 'docker exec  redex_backend_app sh -c "chmod 777 -R storage/ && chmod 777 -R public/"'
                //  sh 'docker rmi $(docker images --filter "dangling=true" -q --no-trunc)'
            }
        }

        stage('Port Information'){
            steps{
                 echo "Port Frontend: 2046"
            }
        }

        
    }
  
}
