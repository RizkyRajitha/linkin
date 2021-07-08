#!/bin/sh

if [ $1 -eq 1 ] ; then
    echo 'Railway env detected'
    echo 'migrating...'
    npm run prismamigrateprod
    echo 'Seeding...'
    npm run seed
    exit 0
    else
    echo "skip migration"
    exit 0
fi
