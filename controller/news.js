const { isNull } = require('util');
//Importation des modéles
const newsModel = require('../models/newsModel')

// Controlleur de l'enregistrement d'un pointage
  async function registrationTimeCard (request) {
    var idWorker  = request.IdWorker;
    var idCompany = request.idCompany;
    var date      = request.date;
    var queryParams = { idWorker: idWorker, idCompany: idCompany, date: date }
    const newsData = await newsModel.registrationTimeCard(queryParams);
    return newsData
  }

//Controlleur de Connexion employé
  async function connexion_worker (request) {
    var Fname      = request.Fname;
    var password   = request.password;
    var queryParams = { Fname: Fname, password: password }
    const newsData = await newsModel.connexion_worker(queryParams);
    return newsData
  }

//Controleur de l'inscription d'un employé
 async function Registration_worker (request) {
    var Fname    = request.Fname;
    var Lname    = request.Lname;
    var Adress   = request.Adress;
    var birth    = request.birth;
    var password = request.password;

    var queryParams = { Fname: Fname, Lname: Lname, Adress: Adress, birth: birth, password : password }
    const newsData = await newsModel.Registration_worker(queryParams);
    return newsData
  }

//Récupération des 10 derniers employe2s enregistrés
  async function Get_final_clocking_hours (request, reply) {
    var limit   = 5;
    var offset  = 0;
    var page    = 1;

    if (typeof request.query.limit !== "undefined") {
      if (parseInt(request.query.limit) > 0) {
        limit = parseInt(request.query.limit);
      }
    }

    if (typeof request.query.page !== "undefined") {
      if (parseInt(request.query.page) > 0) {
        page = parseInt(request.query.page);
        offset = (page-1)*limit
      }
    }

    var queryParams = { offset: offset, limit: limit }
    const newsData = await newsModel.Get_final_clocking_hours(queryParams);

    var response = {page: page, per_page: limit, data:newsData[0]}
    return reply.status(200).send(response);
  }

module.exports = {
   Get_final_clocking_hours,
   Registration_worker,
   connexion_worker,
   registrationTimeCard
};
