const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Redis = require("redis");
const app = express();
const port = 3000;

const redisClient = Redis.createClient();
// const client = Redis.createClient({url:""}); for production

const DEFAULT_EXPIRATION = 3600;

(async () => {
  await redisClient.connect();
})();

redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("error", (err) =>
  console.log("Redis Client Connection Error", err)
);

app.get("/", (req, res) => res.send("Hello World!"));

const fetchData = async (key) => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/${key}`
    );
    return data;
  } catch {
    return (data = "No data available");
  }
};

const cacheData = async (req, res, next) => {
  const key = req.params.key;
  const keydata = await redisClient.get(key);
  if (keydata) {
    return res.json({ data: JSON.parse(keydata), fromCache: true });
  } else {
    next();
  }
};

const getData = async (req, res) => {
  key = req.params.key;
  const keydata = await fetchData(key);
  if (!keydata) {
    return res.status(404).json({
      message: `No data found for ${key}`,
    });
  }
  redisClient.set(key, JSON.stringify(keydata), {
    EX: DEFAULT_EXPIRATION,
    NX: true,
  });
  res.json({ fromCache: false, data: keydata });
};

app.get("/:key", cacheData, getData);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
