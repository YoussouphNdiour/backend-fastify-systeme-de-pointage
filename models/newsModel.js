const mysqlPromise = require('../config/database');

const newsModel = {

  //les 5 employés enregistrés
  Get_final_clocking_hours: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM timeCard WHERE idWorker = ? ORDER BY idTimeCard DESC LIMIT ?, ? `, [ params.idWorker, params.offset, params.limit]);
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
    console.log(params);
    try {
      res = await connection.execute(`INSERT INTO TimeCard(idWorker, scan_type, date) VALUES(?,?,?)`, [params.idWorker, params.scan_type,params.date]);
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
    try {
      res = await connection.execute(`INSERT INTO workers(Fname, Lname, Adress, idFactory, CNI) VALUES(?,?,?,?,?)`, [params.Fname, params.Lname,params.Adress,params.idFactory, params.CNI]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
   },

///////////////////////////////////////////////////ACCOUNT/////////////////////////////
//création d'un compte
Registration_account: async function(params) {
const connection = await mysqlPromise.DATABASE.getConnection();
var res = [{}];
console.log(params);
try {
  res = await connection.execute(`INSERT INTO userAuth(email, password, type, idWorker) VALUES(?,?,?,?)`, [params.email, params.password,params.type, params.idWorker]);
  connection.release();
}
catch (err) {
  console.error(err)
  connection.release();
  return false
}
return res.length > 0 ? res : null;
},

//connexion d'un compte
Connexion_account: async function(params) {
  const connection = await mysqlPromise.DATABASE.getConnection();
  var res = [{}];
  console.log("entrée");
  try {
    res = await connection.execute(`SELECT * FROM userAuth WHERE email = ? and password = ?`, [params.email, params.password]);
    connection.release();
  }
  catch (err) {
    console.error(err)
    connection.release();
    return false
  }
  return res.length > 0 ? res : null;
  },




////////////////////////FACTORY//////////////////////////
//création d'une entreprise
Registration_company: async function(params) {
  const connection = await mysqlPromise.DATABASE.getConnection();
  var res = [{}];
  try {
    res = await connection.execute(`INSERT INTO Company(name, ninea, date_creation, telephone, location, adress) VALUES(?,?,?,?,?,?)`, [params.name, params.ninea,params.date_creation, params.telephone, params.location, params.adress]);
    connection.release();
  }
  catch (err) {
    console.error(err)
    connection.release();
    return false
  }
  return res.length > 0 ? res : null;
  },

//liste des entreprises
GetCompany: async function(params) {
  const connection = await mysqlPromise.DATABASE.getConnection();
  var res = [{}];

  try {
    res = await connection.execute(`SELECT * FROM Company;`);
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
