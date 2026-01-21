# 🚦 API Rate Limiting & Monitoring System (MERN)

A **production-ready API rate limiting and monitoring platform** built using **Node.js, Express, Redis, MongoDB, and React**. This project simulates a **mini API Gateway** similar to what companies like **Stripe, Cloudflare, and AWS API Gateway** use.

---

## ✨ Key Features

### 🔐 Authentication & Security

* API Key–based authentication
* Secure API key rotation with audit logs
* Admin-only protected routes
* Environment-based secrets management (`.env`)

### 🚥 Advanced Rate Limiting

* Per-user rate limits
* Plan-based limits (FREE / PRO)
* Per-endpoint rate limiting
* Redis-backed counters for high performance

### 📊 Usage Monitoring & Analytics

* API usage logging (MongoDB)
* Aggregated usage by plan
* Timeline-based request analytics
* Admin dashboard with charts (Chart.js)

### ⚡ Performance Optimizations

* Redis response caching
* Cache invalidation on API key rotation
* Optimized MongoDB aggregation pipelines

---

## 🧠 System Architecture

```
Client (Postman / Frontend)
        ↓
API Gateway (Express.js)
        ↓
 ┌───────────────┐
 │ Auth Middleware│  → API Key Validation
 └───────────────┘
        ↓
 ┌────────────────────┐
 │ Rate Limiter (Redis)│
 └────────────────────┘
        ↓
 ┌────────────────────┐
 │ Usage Logger (Mongo)│
 └────────────────────┘
        ↓
 Business Logic / API
        ↓
Admin Dashboard (React + Charts)
```

---

## 🧱 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Redis
* JWT
* bcrypt

### Frontend

* React (Vite)
* Chart.js
* Axios

### Dev & Tools

* Docker (Redis)
* Git & GitHub
* Postman

---

## 📂 Project Structure

```
api-rate-limiter/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── server.js
│
├── admin-dashboard/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   └── main.jsx
│
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/api-rate-limiter.git
cd api-rate-limiter
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=your_secret
ADMIN_API_KEY=your_admin_key
```

### 3️⃣ Start Redis (Docker)

```bash
docker run -d -p 6379:6379 redis
```

### 4️⃣ Frontend Setup

```bash
cd admin-dashboard
npm install
npm run dev
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000
VITE_ADMIN_KEY=your_admin_key
```

---

## 🔍 API Endpoints

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| POST   | /api/auth/register        | Register user               |
| GET    | /api/test                 | Test API with rate limiting |
| POST   | /api/apikey/rotate        | Rotate API key              |
| GET    | /api/admin/usage          | Usage by plan               |
| GET    | /api/admin/usage/timeline | Requests timeline           |

---

## 📈 Admin Dashboard

* Total API requests
* Requests per plan (FREE / PRO)
* Timeline-based request visualization
* Real-time data fetched from backend APIs

---

## 🧪 Testing

* Tested with Postman
* Manual rate-limit stress testing
* Redis cache hit/miss verification

---

## 📌 Resume Highlights

* Designed and built a scalable API rate limiting system handling **100+ req/min per user**
* Reduced API response time using Redis caching
* Implemented admin analytics dashboard with real-time charts
* Followed industry-grade security and architecture practices

---

## 📜 License

MIT License

---

## 🙌 Author

**Tannu Shri**
Computer Science & Engineering (Data Science)

---

⭐ If you found this project useful, consider giving it a star!
