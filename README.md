

Setup local

Just run cmd below:
docker compose -f docker-compose.yml -p redex_frontend up --build -d --force-recreate 


it will run port: loclhost:2046
 + I used material UI
 + Redux devtoolkit
 + Call API to Laravel
Page
    Home
        List productg
    History
        List order 
    Product
        Add, Delete, Edit, View Item

    
---
Deployment
 - Currently, it using jenkins when you push everything on branch main it will be auto trigger in jenkins
    + Create pipeline on jenkins
    + pull SCM from GIT
    + Build docker

With URL: https://redex-fe.congcucuatoi.com





