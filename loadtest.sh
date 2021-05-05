for ((i=1;i<=700;i++))
do
curl --request POST --url https://linkin-xi.vercel.app/api/login --header 'Content-Type: application/json' --data '{"email":"tylor@swift.com",	"password":"123"}'
done