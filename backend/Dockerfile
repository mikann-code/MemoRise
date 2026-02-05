FROM ruby:3.2

# MySQL 用に必要最低限だけ
RUN apt-get update -qq && \
    apt-get install -y build-essential default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV RAILS_ENV=production
ENV BUNDLE_WITHOUT="development test"
ENV BUNDLE_PATH=/bundle

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
