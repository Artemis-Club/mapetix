# Endpoints

### GET - /plans

Devuelve todos los planes de un usuario, decodificando el JWT. Dentro de cada plan, también el evento.

```json
[
    {
        "id": 1, //seq o uuid
        "createdAt": "2024-04-22T21:46:38.536882+00:00",
        "description": "Una bonita tarde",
        "startAt": "2024-04-22T21:46:38.536882+00:00", //timestamps, unix o json: 2024-04-22T21:46:38.536882+00:00
        "endAt": "2024-04-22T21:46:38.536882+00:00",  // incluye fecha y hora
        "totalPrice": 300,
        "userId": "ba384581-429c-4cde-9a4f-7bf468efbb00",  //seq o uuid
        "rating": 4.2
        // implementar un campo que sea la media de las valoraciones de los eventos
    },
    {...},
    {...}
]
```

### GET - /plan/:id

`/plan/?userLocation=20.38913,-0.3000`

Devuelve un plan de un usuario

```
userLocation: (lat, long)
    Para calcular la distancia de un usuario a la ubicación del evento. (API google maps)
    Mirar campos "distance", "timeTaken"
```

```json
{
  "id": 1, //seq o uuid
  "createdAt": "2024-04-22T21:46:38.536882+00:00",
  "description": "Una bonita tarde",
  "startAt": "2024-04-22T21:46:38.536882+00:00", //timestamps, unix o json: 2024-04-22T21:46:38.536882+00:00
  "endAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
  "totalPrice": 300,
  "userId": "ba384581-429c-4cde-9a4f-7bf468efbb00", //seq o uuid
  "events": [
    {
      "id": 3, //seq o uuid, ref al plano
      "price": 200,
      "status": null,
      "latitude": 39.471373,
      "longitude": -0.386638,
      "name": "Comida guay 🥘",
      "description": "Una comida etc xd",
      "startAt": "2024-04-22T21:46:38.536882+00:00", //timestamps, unix o json: 2024-04-22T21:46:38.536882+00:00
      "endAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
      "createdBy": 5, // user_id
      "createdAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
      "updatedAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
      "score": 4.2, // media de ratings, 0-5
      "categories": ["food", "outdoors"],
      "distance": 39231, //meters, based on Google Maps API
      "timeTaken": 39231, //meters, based on Google Maps API
      "gallery": [
        "https://img.image.com/1",
        "https://img.image.com/2",
        "https://img.image.com/3"
      ]
    }
    // ..
  ]
}
```

### GET - /events

`/events/?userLocation=20.38913,-0.3000&date=18391830298&category=concert,food,...`

Devuelve todos los eventos para un usuario.

**Query params**

```
    userLocation: (lat, long)
        Para calcular la distancia de un usuario a la ubicación del evento. (API google maps)
    date (timestamp unix o JSON date):
        Filtro de fecha para el evento. Pillar solo el dia de la fecha. (El la pantalla explorar el usuario podrá ver los eventos de mañana por ejemplo)
    category: para filtrar por categoria
```

```json
[
    {
        "id": 3, //seq o uuid, ref al plano
        "price": 200,
        "status": null,
        "latitude": 39.471373,
        "longitude": -0.386638,
        "name": "Comida guay 🥘",
        "description": "Una comida etc xd",
        "startAt": "2024-04-22T21:46:38.536882+00:00", //timestamps, unix o json: 2024-04-22T21:46:38.536882+00:00
        "endAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
        "createdBy": 5, // user_id
        "createdAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
        "updatedAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
        "score": 4.2, // media de ratings, 0-5
        "categories": ["food", "outdoors"],
        "gallery": [
            "https://img.image.com/1",
            "https://img.image.com/2",
            "https://img.image.com/3"
        ]
    },
    {...},
    {...},
    ...
]

```

### POST - /plan

Crea un plan para el usuario. Recupera el usuario a partir de JWT

Body:

```json
{
    "categories":[....],
    "date": "2024-04-22T21:46:38.536882+00:00", //pillar dia
    "userLocation": [20.39203, -0.312323], //lat, long. Posicion del usuario
    "radius": 3812, //in meters
    "budget": 200 //in euros
}
```

```json
[
  {
    "id": 1, //seq o uuid
    "createdAt": "2024-04-22T21:46:38.536882+00:00",
    "description": "{}", //Ver la posibilidad de un nombre autogenerado, basado en el dia (Ej. Tarde del Miercoles), y / o la categoria predominante de los eventos.
    "startAt": "2024-04-22T21:46:38.536882+00:00", //timestamps, unix o json: 2024-04-22T21:46:38.536882+00:00
    "endAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
    "totalPrice": 300,
    "userId": "ba384581-429c-4cde-9a4f-7bf468efbb00", //seq o uuid
    "events": [
      {
        "id": 3, //seq o uuid, ref al plano
        "price": 200,
        "status": null,
        "latitude": 39.471373,
        "longitude": -0.386638,
        "name": "Comida guay 🥘",
        "description": "Una comida etc xd",
        "startAt": "2024-04-22T21:46:38.536882+00:00", //timestamps, unix o json: 2024-04-22T21:46:38.536882+00:00
        "endAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
        "createdBy": 5, // user_id
        "createdAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
        "updatedAt": "2024-04-22T21:46:38.536882+00:00", // incluye fecha y hora
        "score": 4.2, // media de ratings, 0-5
        "categories": ["food", "outdoors"],
        "gallery": [
          "https://img.image.com/1",
          "https://img.image.com/2",
          "https://img.image.com/3"
        ]
      }
      // ..
    ]
  }
]
```

### PUT - /plan/:id

Modificar el plan. Acepta el mismo objeto de plan, con el array de eventos, y devuelve el plan actualizado

### DELETE - /plan/:id

Desactiva un plan (soft delete?)
