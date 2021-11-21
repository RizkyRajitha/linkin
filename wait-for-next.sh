#!/bin/bash

npm run dev  &
APP_PID=$!

echo $APP_PID

echo "next lunching 3000..."

while ! nc -z localhost 3000; do   
  sleep 0.1
done

echo "run pupperteer"
node browser.js

RESULT=$?
if [ $RESULT -eq 0 ]; then
  echo pupperteer success
else
  echo pupperteer failed
fi

kill $APP_PID

ls


