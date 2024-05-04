
# CodeForces REST API

This is a RESTful API built with Node.js that allows users to retrieve data of other CodeForces users using their handle.
The API uses web scraping techniques with Axios, JSDOM, and Express to fetch and parse the required information.

#### If you like it please star it 🥺

## API Reference
https://codeforces-api-zeta.vercel.app/
#### Get all items

```http
  GET /handle
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `handle` | `string` | **Required**. CodeForces handle of user|


## Authors

- [@RK-Karthik14](https://www.github.com/RK-Karthik14)


## Demo

 https://codeforces-api-zeta.vercel.app/rk_karthik


## Installation

```bash
  git clone https://github.com/RK-Karthik14/codeforces-api.git
```

Open the folder

```bash
  npm install
```

Start the server

```bash
  npm start
```


