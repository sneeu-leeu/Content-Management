# Delivery

## Built With

- Ruby on Rails
- PostgreSQL
- React
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- [Ruby](https://www.ruby-lang.org/en/)
- [Rails](https://gorails.com/)

### local Set Up

#### Installation

- [Ruby/Rails](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-20-04)
- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)

#### Run Locally

- Clone or download this repo on your machine
  
- Enter project directory

### Install

```sh
bundle install
```

```sh
yarn install
```

### Database

```sh
# Create the database
rails db:create

## Apply migration
rails db:migrate

# seed the db
rails db:seed

# Load the schema
rails db:schema:load
```

### Run

```sh
bin/dev
```
