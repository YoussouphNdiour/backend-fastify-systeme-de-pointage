let news = require('../controller/news');


//test ping
async function routes (fastify, options) {
    fastify.get('/', function (request, reply) {
        reply.send({message: 'ping success', code: 200})
    })

//Insertion d'employé
const insertionBodyJsonSchema = {
  type: 'object',
  required: ['Fname','Lname','Adress','birth','password'],
  properties: {
    Fname: { type: 'string' },
    Lname: { type: 'string' },
    Adress: { type: 'string' },
    birth: { type: 'string' },

  },
}

const schemaInsertion = {
  body: insertionBodyJsonSchema,
}
//requête Post
fastify.post('/registration_worker' ,{ schemaInsertion }, async function (request, reply) {
    var res = await news.Inser_worker(request.body);
    return res != null ? reply.status(200).send({"message":"inscription réussie"}) : null;
})


//Enregistrement d'un pointgae
const registrationTimeCardBodyJsonSchema = {
type: 'object',
required: ['Fname','idCompany'],
properties: {
  idWorker: { type: 'string' },
  idCompany: { type: 'string' },
  date: { type: 'string' },
},
}

const schemaregistrationTimeCard = {
body: registrationTimeCardBodyJsonSchema,
}
fastify.post('/registrationTimeCard' ,{ schemaregistrationTimeCard }, async function (request, reply) {
  console.log(request.body);
    var res = await news.registrationTimeCard(request.body);
    console.log("res INDEX",res.length);
    return res != null ? reply.status(200).send({"message":"pointage réussie"}) : null;
})


//Connexion pour employé
const connexionBodyJsonSchema = {
  type: 'object',
  required: ['Fname','password'],
  properties: {
    Fname: { type: 'string' },
    password: { type: 'string' },

  },
}

const schemaConnexion = {
  body: connexionBodyJsonSchema,
}
  fastify.post('/connexion_worker' ,{ schemaConnexion }, async function (request, reply) {
      var res = await news.connexion_worker(request.body);
      console.log("res",res);
      return res.length > 0 ? reply.status(200).send({"message":"connexion réussie"}) : null;
  })


//Récupération des 10 derniers employés enregistrés
    fastify.get('/Get_final_clocking_hours', news.Get_final_clocking_hours);

}

module.exports = routes;
