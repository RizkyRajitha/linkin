#!/bin/bash

# run next server
npm run dev  &
APP_PID=$!

echo $APP_PID

echo "next lunching 3000..."

# wait till the server starts
while ! nc -z localhost 3000; do   
  sleep 0.1
done

echo "run pupperteer browser testing..."
node scripts/browser-test.js

# exit if pupperteer script failed
RESULT=$?
if [ $RESULT -eq 0 ]; then
  echo pupperteer success
else
  echo pupperteer failed
fi

# end server process
# kill $APP_PID



