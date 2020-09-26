#上传docker配置
scp -r docker-compose.yml root@62.234.26.66:/home/compose

#上传ngin配置
scp -r ./nginx/nginx.conf root@62.234.26.66:/home/nginx