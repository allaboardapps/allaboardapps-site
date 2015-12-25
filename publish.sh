#!/usr/bin/env bash
DEFAULT="companyprofile"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=allaboardapps-site-staging
DIR=deploy/
aws s3 sync $DIR s3://$BUCKET/ --profile "$PROFILE"
