const mysql = require('mysql')
// var Config = require('./config').mysql
const Config = require('../config/config').mysql

class Db {
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor() {
    this.dbClient = ''
    this.connect()
  }

  connect() {
    let __that = this
    return new Promise((resolve, reject) => {
      if (!__that.dbClient) {
        try {
          var pool = mysql.createPool(Config)
          __that.dbClient = pool
          resolve(__that.dbClient)
        } catch (error) {
          reject(error)
        }
      } else {
        resolve(__that.dbClient)
      }
    })
  }

  list(sql, data) {
    return new Promise((resolve, reject) => {
      this.connect().then(function (pool) {
        pool.query(sql, data, function (err, results, fields) {
          if (err) {
            reject(err)
          } else {
            // console.log('\n\n\n\n\n\################')
            // console.log(results)
            // console.log('\n\n\n\n\n\################')
            resolve(results)
          }
        })
      })
    })
  }

  findOne(sql, data) {
    return new Promise((resolve, reject) => {
      this.connect().then(function (pool) {
        pool.query(sql, data, function (err, results, fields) {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        })
      })
    })
  }

  count(sql, data) {
    return new Promise((resolve, reject) => {
      this.connect().then(function (pool) {
        pool.query(sql, data, function (err, results, fields) {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        })
      })
    })
  }
}

module.exports = Db.getInstance()