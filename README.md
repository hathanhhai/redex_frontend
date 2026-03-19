

Setup local

Just run cmd below:
**docker compose -f docker-compose.yml -p redex_frontend up --build -d --force-recreate**

_after run CMD waiting 1 minute for building_


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

With URL: **https://redex-fe.congcucuatoi.com**




<img width="1837" height="1003" alt="image" src="https://github.com/user-attachments/assets/06f73efb-27b5-4d87-bb25-e3806619f44c" />
