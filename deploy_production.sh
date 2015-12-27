#!/usr/bin/env bash
DEFAULT="default"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=allaboardapps-site-production
DIR=./dist
DISTRIBUTION_ID=E2KTK9BDAJSU3C
INVALIDATIONS=invalidations.json
aws s3 sync $DIR s3://$BUCKET/ --delete
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION --invalidation-batch file://$INVALIDATIONS

