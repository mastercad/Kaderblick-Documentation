FROM php:8.3-apache

ENV TZ=Europe/Berlin

RUN apt-get update && apt-get install -yqq \
    git \
    unzip \
    libicu-dev \
    libonig-dev \
    libzip-dev \
    libpq-dev \
    ca-certificates \
    openssl libssl-dev \
    && update-ca-certificates \
    && docker-php-ext-install intl pdo pdo_pgsql zip opcache bcmath

RUN a2enmod rewrite

# Eigene VHost-Konfiguration mit AllowOverride + FallbackResource
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

RUN echo "openssl.cafile=/etc/ssl/certs/ca-certificates.crt" > /usr/local/etc/php/conf.d/99-ca-certificates.ini

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN echo "date.timezone=$TZ" > /usr/local/etc/php/conf.d/timezone.ini

WORKDIR /var/www/symfony

RUN mkdir -p config/secrets/prod \
    && mkdir -p config/jwt \
    && mkdir -p var/cache \
    && mkdir -p var/log \
    && chmod -R 777 config/secrets config/jwt var

RUN mkdir -p var/log \
    && chown -R www-data:www-data var/log \
    && chmod -R 775 var/log

RUN chown -R www-data:www-data /var/www/symfony/var

EXPOSE 80

CMD apache2-foreground