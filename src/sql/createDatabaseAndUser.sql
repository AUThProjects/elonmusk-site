CREATE DATABASE elonmusk_db;
CREATE USER elonmusk_user;
alter user "elonmusk_user" with password 'elonmusk';
GRANT ALL PRIVILEGES ON DATABASE elonmusk_db TO elonmusk_user;
