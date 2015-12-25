#!/usr/bin/env bash
DEFAULT="allaboardapps"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=allaboardapps-site-production
DIR=dist/
aws s3 sync $DIR s3://$BUCKET/ --profile "$PROFILE"
