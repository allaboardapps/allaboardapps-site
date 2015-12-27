#!/usr/bin/env bash
DEFAULT="default"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=allaboardapps-site-staging
DIR=./dist
DISTRIBUTION_ID=E2KTK9BDAJSU3C
aws s3 sync $DIR s3://$BUCKET/ --delete
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths /index.html

