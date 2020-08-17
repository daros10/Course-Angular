import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';

// ****************** FIREBASE *****************
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://firestore-grafica-844a0.firebaseio.com',
});

//Referencia a la base de datos de Firestore
const db = admin.firestore();
// **********************************************

// Funcion de ejemplo
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.json({
    mensaje: 'Hola mundo desde funciones de firebase!!',
  });
});

// Este no usamos
export const getGOTY = functions.https.onRequest(async (request, response) => {
  //Obteniedo los params desde la url
  // const nombre = request.query.nombre || 'Sin nombre';

  //Referencia a la collecion goty
  const goty = db.collection('goty');
  const docSnapshot = await goty.get();
  const juegos = docSnapshot.docs.map((doc) => doc.data());
  response.json(juegos);
});

// *********************** EXPRESS DENTRO DE FIREBASE ************************************
// Se creo un server con node y express para conumir y actualizar la informacion
// con esto se puede hacer todo lo que se conoce de node con expres, cors, jwt, etc.
//la ventaja es que llamando a los endpoints creados con express se usa la data, metodos y
// características de FIRESTORE.

// Express server
const app = express();
app.use(cors({ origin: true }));

app.get('/goty', async (req, res) => {
  //Referencia a la collecion goty
  const goty = db.collection('goty');
  const docSnapshot = await goty.get();
  const juegos = docSnapshot.docs.map((doc) => doc.data());
  res.json(juegos);
});

app.post('/goty/:id', async (req, res) => {
  const id = req.params.id;
  const gameRef = db.collection('goty').doc(id);
  const gameSnap = await gameRef.get();

  if (!gameSnap.exists) {
    res.status(404).json({
      ok: false,
      mensaje: 'No existe un juego con el ID: ' + id,
    });
  } else {
    const antes = gameSnap.data() || { votos: 0 };
    await gameRef.update({
      votos: antes.votos + 1,
    });

    res.json({
      ok: true,
      mensaje: `Gracias por tu voto a ${antes.name}`,
    });
  }
});

export const api = functions.https.onRequest(app);
