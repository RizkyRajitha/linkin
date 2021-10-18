for ((i=1;i<=700;i++))
do
curl --request POST --url http://34.201.6.138/api/user/login --header 'Content-Type: application/json' --data '{"username":"admin",	"password":"linkin123"}'
done