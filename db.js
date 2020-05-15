'use strict';

require('dotenv').config();
const {Pool}=require('pg');

const isProduction = process.env.IS_PRODUCTION.toLowerCase()==='true';
console.log(process.env.IS_PRODUCTION);
console.log("Is this the production environment? ${isProduction?'yes':'no'}");
