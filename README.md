# README

**This repository contains code for a Node.js application that fetches data from an external API, caches it using Redis, and serves the cached data to clients.**

**Prerequisites**

- Node.js
- Redis

**Installation**

1. Clone the repository

```bash
git clone https://github.com/username/repository.git
```

2. Install dependencies

```javascript
npm install
```

**Usage**

1. Start the server

```javascript
npm start
```

2. Access the application by navigating to http://localhost:3000/{key} in your browser or using a REST client. Replace **{key}** with one of the following values:

- posts
- comments
- albums
- photos
- todos
  For example, http://localhost:3000/posts.

**API Endpoints**
The following table describes the available API endpoints.

| Endpoint | Method | Description                                                                                                                                                                                                                            |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /        | GET    | Returns "Hello World!"                                                                                                                                                                                                                 |
| /{key}   | GET    | Returns data from the external API for the specified key. If the data is available in the Redis cache, it will be served from the cache. Otherwise, the data will be fetched from the API and stored in the cache before being served. |

**Dependencies**

- express: Web framework for Node.js
- axios: Promise-based HTTP client for Node.js
- cors: Middleware for handling Cross-Origin Resource Sharing (CORS)
- redis: Node.js Redis client

**Notes**

- The default expiration time for cached data is 3600 seconds (1 hour).
- The Redis cache is configured to use the default localhost:6379 connection settings. For production, you may want to use a different Redis instance or connection settings.
