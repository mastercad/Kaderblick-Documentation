FROM php:8.3-apache

ENV TZ=Europe/Berlin
ENV APP_ENV=prod

RUN apt-get update && apt-get install -yqq \
    git \
    unzip \
    libicu-dev \
    libonig-dev \
    libzip-dev \
    ca-certificates \
    openssl libssl-dev \
    && update-ca-certificates \
    && docker-php-ext-install intl zip opcache bcmath \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite

# Build-Kontext ist das Projekt-Root (nicht .docker/app/)
COPY .docker/app/vhost.conf /etc/apache2/sites-available/000-default.conf

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
    && echo "date.timezone=$TZ" > /usr/local/etc/php/conf.d/timezone.ini

WORKDIR /var/www/symfony

# Gesamten Quellcode in das Image kopieren (.dockerignore filtert unnötige Dateien)
COPY . .

# Composer-Dependencies installieren und Verzeichnisrechte setzen
RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && mkdir -p var/cache var/log \
    && chown -R www-data:www-data var \
    && chmod -R 775 var

EXPOSE 80

CMD apache2-foreground
