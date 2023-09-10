## Online Shop

This is an implementation of an online shopping site.
It is built with a React frontend, Express backend & Mongo for the database.

This program uses:

- React
- Express
- Stripe API
- Axios
- Bootstrap
- Material UI
- Docker & Docker Compose

---

### Prerequisites

- In order to run this application you need to install [Docker](https://docs.docker.com/engine/install/).

- If running locally for development you need to install [Node](https://nodejs.org/en/download).

---

### Stripe

To setup Stripe,

1. Go to [Stripe](stripe.com).
2. Create an account.
3. Look for the developers box & copy down the SK.
4. To register an item, & get the ID before you put data into Mongo, go to the stripe products page & find add item.
5. For each item give it a name & price. Make it a one time payment.
6. Click save product for each item & you will be able to copy the id. Save each of these ids for use later.

---

### Run With Docker
Once Docker is setup you must pull the images from Docker Hub.

```
$ docker pull clh7090/online-shop-react-frontend:latest
$ docker pull clh7090/online-shop-express-backend:latest
```

Next, once you have all of your stripe product ids, you must configure the environment variables for docker compose & add data to Mongo.

- Navigate to the docker-compose.yaml file & setup all of these values.

- The most important one that will not come preset is the STRIPE_SK which you can get by following the directions for Stripe above.

- Once all of the env variables are setup you can begin the program with:

```
$ docker compose up
```

- The last step is that you must add data to the Mongo database for it to show up on the application.

- You can do this by interacting with the Docker container & looking for the Mongo container.

- You must use Mongosh in the terminal to interact with the database.

- Try the following commands:

```
$ mongosh
> db use online-shop
  db.items.insertMany(
    [
      {
        id: "price_1N....",
        name: "Coca-Cola - 12pk/12 fl oz Cans",
        price: 7.89,
        imageLink: "https://waterbutlers.com/cdn/shop/products/Screen-Shot-2019-10-24-at-9.19.20-PM_600x.png?v=1583645693"
      }, ...
    ]
  )
```

It is **important** to **NOTE:** the ids stored in the Mongo db
are from stripe.

- The default url is currently http://localhost:3000 for accessing the application.

---

### Run locally

Once you have all of the ids, you must install all of the Node dependencies & environment variables & add data to Mongo.

- Navigate to the react-frontend folder and execute:

```
$ npm i
```

- Next, Repeat that step inside of the express-backend folder.

- inside both the react-frontend and express-backend folder, edit the .env files

- The most important one that will not come preset is the STRIPE_SK which you can get by following the directions for Stripe above.

- Lastly you must give data to the Mongo database. This can be done in the terminal, or with a program like mongo compass or atlas. Data must be in the following form inside of a database called "online-shop" in the "items" collection:

```
{
  id: "price_1N....",
  name: "Coca-Cola - 12pk/12 fl oz Cans",
  price: 7.89,
  imageLink: "https://waterbutlers.com/cdn/shop/products/Screen-Shot-2019-10-24-at-9.19.20-PM_600x.png?v=1583645693"
}
```

It is **important** to **NOTE:** the ids stored in the Mongo db
are from stripe.

- The default url is currently http://localhost:3000 for accessing the application.
