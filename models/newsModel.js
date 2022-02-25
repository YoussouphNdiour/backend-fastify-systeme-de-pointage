const mysqlPromise = require('../config/database');

const newsModel = {

  //les 5 employés enregistrés
  Get_final_clocking_hours: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM TimeCard ORDER BY idTimeCard DESC LIMIT ?, ?`, [params.offset, params.limit]);
      console.log(res);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
   },


   //insertion d'un enregistrement de pointage
   registrationTimeCard: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];
    console.log("entrée");
    try {
      res = await connection.execute(`INSERT INTO TimeCard(idWorker, idcompany, date) VALUES(?,?,?)`, [params.idWorker, params.idCompany,params.date]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
   },



   //insertion d'un employé
   Registration_worker: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];
    console.log("entrée");
    try {
      res = await connection.execute(`INSERT INTO workers(Fname, Lname, Adress, birth, password) VALUES(?,?,?,?,?)`, [params.Fname, params.Lname,params.Adress,params.birth, params.password]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
   },


   //connexion d'un employé
   connexion_worker: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM workers WHERE Fname= ? and password =  ?`, [params.Fname, params.password]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
   },
}

module.exports = newsModel;
