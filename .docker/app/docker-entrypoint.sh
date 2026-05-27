#!/bin/sh
set -e

php bin/console cache:clear --env=prod --no-debug

exec apache2-foreground
