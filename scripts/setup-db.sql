-- environment: development
-- create the user
create user root with password 'password';
-- create the database
create database node_rest_api;
-- grant acess to the user
grant all privileges on database node_rest_api to root;