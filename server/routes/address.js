const router = require(`express`).Router()
const addressModel = require(`../models/Address`)
const jwt = require('jsonwebtoken')
const fs= require('fs')
const JWT_PRIVATE_KEY=fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME,'utf8')

