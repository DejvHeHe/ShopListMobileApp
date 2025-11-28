export const ShopListsMock=[
  {
    "_id": 1,
    "name": "Lidl",
    "isArchived": false,
    "ownerId": "user1",
    "items": [
      { "_id": "1", "name": "Houska", "count": 6, "state": "unchecked" },
      { "_id": "2", "name": "Máslo", "count": 1, "state": "checked" },
      { "_id": "3", "name": "Mléko", "count": 2, "state": "unchecked" }
    ]
  },
  {
    "_id": 2,
    "name": "Tesco",
    "isArchived": true,
    "ownerId": "user1",
    "items": [
      { "_id": "1", "name": "Banány", "count": 4, "state": "checked" },
      { "_id": "2", "name": "Jablka", "count": 6, "state": "unchecked" },
      { "_id": "3", "name": "Voda", "count": 3, "state": "unchecked" }
    ]
  },
  {
    "_id": 3,
    "name": "Kaufland",
    "isArchived": true,
    "ownerId": "user2",
    "items": [
      { "_id": "1", "name": "Pepsi", "count": 2, "state": "checked" },
      { "_id": "2", "name": "Chléb", "count": 1, "state": "checked" }
    ]
  },
  {
    "_id": 4,
    "name": "Albert",
    "isArchived": false,
    "ownerId": "user2",
    "items": [
      { "_id": "1", "name": "Těstoviny", "count": 3, "state": "unchecked" },
      { "_id": "2", "name": "Kečup", "count": 1, "state": "checked" },
      { "_id": "3", "name": "Sýr", "count": 1, "state": "unchecked" },
      { "_id": "4", "name": "Čokoláda", "count": 2, "state": "checked" }
    ]
  }
]
