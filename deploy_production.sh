#!/usr/bin/env bash
DEFAULT="default"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=allaboardapps-site-staging
DIR=./dist
aws s3 sync $DIR s3://$BUCKET/ --delete
