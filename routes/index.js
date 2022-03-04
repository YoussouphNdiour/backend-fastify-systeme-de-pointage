let news = require('../controller/news');
//var cors = require('fastify-cors')



//test ping
async function routes (fastify, options) {
    //fastify.register(cors)
    fastify.get('/', function (request, reply) {
        reply.send({message: 'ping success', code: 200})
    })

//////////////////////////////////////COMPANY////////////////////////////////


//Création Registration_company
const Registration_companyBodyJsonSchema = {
  type: 'object',
  required: ['Fname','idCompany'],
  properties: {
    name: { type: 'string' },
    telephone: { type: 'string' },
    date_creation: { type: 'string' },
    location: { type: 'string' },
    ninea: { type: 'string' },
    adress: { type: 'string' },
  },
  }

  const schemaRegistration_company = {
  body: Registration_companyBodyJsonSchema,
  }
  fastify.post('/Registration_company' ,{ schemaRegistration_company }, async function (request, reply) {
    console.log(request.body);
      var res = await news.Registration_company(request.body);
      return res.length > 0 ? reply.status(200).send(res) : null;
    })


////liste des entreprises
fastify.get('/GetCompany' , news.GetCompany)




//Création d'un compte Registration_worker GetCompany
const Registration_accountBodyJsonSchema = {
  type: 'object',
  required: ['Fname','idCompany'],
  properties: {
    idWorker: { type: 'string' },
    idCompany: { type: 'string' },
    date: { type: 'string' },
    idWorker: { type: 'string' }
  },
  }

  const schemaRegistration_account = {
  body: Registration_accountBodyJsonSchema,
  }
  fastify.post('/Registration_account' ,{ schemaRegistration_account }, async function (request, reply) {
      var res = await news.Registration_account(request.body);
      return res.length > 0 ? reply.status(200).send(res) : null;
    })





//Insertion d'employé Registration_company
const Registration_workerBodyJsonSchema = {
  type: 'object',
  required: ['Fname','Lname','Adress','birth','password'],
  properties: {
    Fname: { type: 'string' },
    Lname: { type: 'string' },
    Adress: { type: 'string' },
    CNI: { type: 'string' },
    idFactory: { type: 'string' },

  },
}

const schemaRegistration_worker = {
  body: Registration_workerBodyJsonSchema,
}
//requête Post
fastify.post('/Registration_worker' ,{ schemaRegistration_worker}, async function (request, reply) {
    var res = await news.Registration_worker(request.body);
    return res != null ? reply.status(200).send({"message":"inscription réussie"}) : null;
})


//Enregistrement d'un pointgae
const registrationTimeCardBodyJsonSchema = {
type: 'object',
required: ['Fname','idCompany'],
properties: {
  idWorker: { type: 'string' },
  scan_type: { type: 'boolean' },
  date: { type: '	timestamp' },
},
}

const schemaregistrationTimeCard = {
body: registrationTimeCardBodyJsonSchema,
}
fastify.post('/registrationTimeCard' ,{ schemaregistrationTimeCard }, async function (request, reply) {
    var res = await news.registrationTimeCard(request.body);
    return res != null ? reply.status(200).send({"message":"pointage réussie"}) : null;
})


//Connexion pour employé
const connexionBodyJsonSchema = {
  type: 'object',
  required: ['email','password'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },

  },
}

const schemaConnexion = {
  body: connexionBodyJsonSchema,
}
  fastify.post('/Connexion_account' ,{ schemaConnexion }, async function (request, reply) {
      var res = await news.Connexion_account(request.body);
      return res.length > 0 ? reply.status(200).send(res) : null;
  })


//Récupération des 10 derniers employés enregistrés
const Get_final_clocking_hoursBodyJsonSchema = {
  type: 'object',
  required: ['idWorker'],
  properties: {
    idWorker: { type: 'int' }

  },
}

const schemaGet_final_clocking_hours = {
  body: Get_final_clocking_hoursBodyJsonSchema,
}
  fastify.post('/Get_final_clocking_hours' ,{ schemaGet_final_clocking_hours }, async function (request, reply) {
    var res = await news.Get_final_clocking_hours(request.body);
    console.log("length",res.length);
    return res.data.length > 0 ? reply.status(200).send(res) : null;
  })
}

module.exports = routes;
