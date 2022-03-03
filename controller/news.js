const { isNull } = require('util');
//Importation des modéles
const newsModel = require('../models/newsModel')


// Controlleur Registration_company (name, ninea, date_creation, telephone, location, adress 
async function Registration_company (request) {
  var name  = request.name;
  var telephone = request.telephone;
  var date_creation      = request.date_creation;
  var location      = request.location;
  var ninea      = request.ninea;
  var adress      = request.adress;
  var queryParams = { name: name, telephone: telephone, date_creation: date_creation, location: location, ninea: ninea, adress: adress }
  const newsData = await newsModel.Registration_company(queryParams);
  return newsData
}

// Controlleur GetCompany
async function GetCompany (request, reply) {
  const newsData = await newsModel.GetCompany();
  console.log(newsData[0]);
    return reply.status(200).send(newsData[0]);
}

// Controlleur account 
async function Registration_account (request) {
  var email  = request.email;
  var password = request.password;
  var type      = request.type;
  var idWorker      = request.idWorker;
  var queryParams = { email: email, password: password, type: type, idWorker: idWorker };
  const newsData = await newsModel.Registration_account(queryParams);
  return newsData
}


// Controlleur de l'enregistrement d'un pointage
  async function registrationTimeCard (request) {
    var idWorker  = request.idWorker;
    var scan_type = request.scan_type;
    var date      = request.date;
    var queryParams = { idWorker: idWorker, scan_type: scan_type, date: date }
    const newsData = await newsModel.registrationTimeCard(queryParams);
    return newsData
  }

//Controlleur de Connexion employé
  async function Connexion_account (request) {
    var email      = request.email;
    var password   = request.password;
    var queryParams = { email: email, password: password }
    const newsData = await newsModel.Connexion_account(queryParams);
    return newsData
  }

//Controleur de l'inscription d'un employé
 async function Registration_worker (request) {
    var Fname    = request.Fname;
    var Lname    = request.Lname;
    var Adress   = request.Adress;
    var idFactory    = request.idFactory;
    var CNI = request.CNI;
    console.log(request);

    var queryParams = { Fname: Fname, Lname: Lname, Adress: Adress, idFactory: idFactory, CNI : CNI }
    const newsData = await newsModel.Registration_worker(queryParams);
    return newsData
  }

//Récupération des 10 derniers employe2s enregistrés
  async function Get_final_clocking_hours (request, reply) {
    var limit   = 5;
    var offset  = 0;
    var page    = 1;
    var idWorker = request.idWorker;

    // if (typeof request.query.limit !== "undefined") {
    //   if (parseInt(request.query.limit) > 0) {
    //     limit = parseInt(request.query.limit);
    //   }
    // }

    // if (typeof request.query.page !== "undefined") {
    //   if (parseInt(request.query.page) > 0) {
    //     page = parseInt(request.query.page);
    //     offset = (page-1)*limit
    //   }
    // }

    var queryParams = { offset: offset, limit: limit, idWorker: idWorker }
    const newsData = await newsModel.Get_final_clocking_hours(queryParams);
    console.log(newsData[0]);
    var response = {page: page, per_page: limit, data:newsData[0]}
    return response;
  }

module.exports = {
   Get_final_clocking_hours,
   Registration_worker,
   Connexion_account,
   registrationTimeCard,
   Registration_account,Registration_worker,Registration_company,GetCompany

};
