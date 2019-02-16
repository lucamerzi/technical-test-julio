# Technical test

# My notes: How to start the app

1 - Place ```us-census.db``` SQLite file into ```db/``` folder. It was gitignored due to its size exceeding git allowed storage.<br />
2 - In the root directory, run ```npm run dev``` to start backend.<br />
3 - In the client/ directory, run ```npm run dev``` to start backend.<br />
4 - Hire me ! 😇<br />

# Requirements

You will an extract of US census in us-census.db.gz
This file is a SQLite base that contains a table "census_learn_sql” with demographic data.


Goal of this exercice is to create a small web application that visualizes database data.


Application should allow to select a column (amongst demographic data), then display, for each different value in this column, number of lines with this value, and "age" value average.
Values must be sorted by decreasing order. One can display only 100 first values.


Page could look like:
|              -------------
|    variable | education v |
|              -------------
|    ---------------------------------------------
|    | value               | count | average age |
|    | less than 1st grade | 1234  | 45,5        |
|    |  PhD                | 123   | 34,4        |
|    ---------------------------------------------
|

For simplicity sake, all columns (except "age") are considered as "string".

Application must be a SPA (Single-Page Application), i.e. user must be able to change variable without reloading page.

Extras
* if more than 100 different values, one can indicate number of non-displayed values.
* indicate number of non-displayed lines (i.e. lines corresponding to non-displayed values)
* extensibility: allow a simple way to change database and variables


Select tech stack that are adapted for exercice (backend and frontend).


Share code on GitHub ou Bitbucket.
Note: on Bitbucket, private repositories are free.
Otherwise by email


Ideally, share application URL.
