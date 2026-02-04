FROM ruby:3.2

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs default-mysql-client

WORKDIR /app

ENV RAILS_ENV=production

COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test

COPY . .

EXPOSE 3001

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
