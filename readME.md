# 🏨 AI Hotel Recommendation System (Self-Learning)

A **production-grade hotel search and recommendation engine** built with **Node.js, MySQL, OpenAI embeddings, and Qdrant**.

This system goes beyond traditional filtering. It **understands natural language**, **learns from user behaviour**, and **automatically optimises its ranking strategy over time** to maximise bookings.

---

## 🎯 What This System Does

### From this:

> “Filter hotels by price and city”

### To this:

> **“Recommend the hotels a user is most likely to book — and improve automatically with every interaction.”**

---

## 🧠 Core Capabilities

### ✅ Semantic Search

* Understands **layman language** (e.g. *“cheap and comfortable hotel”*)
* Uses **vector embeddings** instead of keyword matching

### ✅ Hybrid Ranking

* Combines:

    * semantic relevance
    * price sensitivity
    * star rating
    * geo-distance
* Business-aware and tunable

### ✅ Hard Filters

* City
* Price range
* Minimum rating
* Enforced **before ranking** (correctness guaranteed)

### ✅ Explainable Results

* Top results include **“Why this hotel?”** explanations
* GPT used sparingly (top 5 only)

### ✅ Personalisation (No User Input Required)

* Learns preferences from:

    * impressions
    * clicks
    * bookings
* Builds a **user taste vector**
* Two users searching the same query can get different results

### ✅ A/B Tested Ranking Strategies

* Multiple ranking configurations run in parallel
* Performance measured via real bookings

### ✅ Self-Optimising (Auto-Tuning)

* Periodically adjusts ranking weights
* Optimises for **conversion rate**
* Requires **no manual tuning**

---

## 🏗 Architecture Overview

```
User Query
   ↓
OpenAI Embedding
   ↓
Qdrant Vector Search (with payload filters)
   ↓
Hybrid Ranking (semantic + business logic)
   ↓
Availability Check
   ↓
Final Ranked Results
```

Learning Loop:

```
Impressions / Clicks / Bookings
   ↓
User Events
   ↓
User Preference Vector
   ↓
Personalised Search
   ↓
A/B Metrics
   ↓
Auto-Tuned Ranking Weights
```

---

## 🧱 Tech Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| API       | Node.js (Express, ES Modules) |
| Database  | MySQL                         |
| Vector DB | Qdrant                        |
| AI        | OpenAI Embeddings             |
| Search    | Semantic + Hybrid Ranking     |
| Learning  | Implicit Feedback             |
| Infra     | Docker-ready, Cron-friendly   |

---

## 📁 Project Structure

```
src/
├── controllers/        # HTTP request handling
├── services/           # Search, ranking, AI, learning logic
├── repositories/       # Database access (MySQL)
├── scripts/            # One-off jobs (indexing, auto-tune)
├── utils/              # Helpers (geo, JSON, intent)
├── config/             # DB, Qdrant, OpenAI config
├── db/
│   ├── migrations/     # SQL migrations
│   └── init.js         # DB bootstrap
└── server.js
```

---

## 🚀 Getting Started

### 1️⃣ Environment Variables

Create `.env` in project root:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hotel_recommendation_db

OPENAI_API_KEY=your_openai_key

QDRANT_URL=https://your-cluster-url
QDRANT_API_KEY=your_qdrant_key
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Initialise Database & Start Server

```bash
node src/server.js
```

This will:

* create DB (if missing)
* create tables
* seed sample data
* start API

---

## 🧠 Vector Setup (One-Time)

### Create Qdrant Collection

```bash
node src/scripts/createQdrantCollection.js
```

### Create Payload Indexes

```bash
node src/scripts/createQdrantIndexes.js
```

### Index Hotels into Qdrant

```bash
node src/scripts/indexHotels.js
```

---

## 🔍 API Endpoints

### 🔹 Search Hotels

```http
POST /api/search
```

```json
{
  "query": "cheap and comfortable hotel",
  "city": "Paris",
  "min_price": 60,
  "max_price": 120,
  "min_rating": 3.5,
  "check_in": "2025-06-01",
  "check_out": "2025-06-05",
  "guests": 2,
  "page": 1,
  "page_size": 10
}
```

Headers (optional):

```http
x-user-id: user_123
x-ab-group: B
```

---

### 🔹 Get Hotel Details (click tracking)

```http
GET /api/hotels/:id
```

---

### 🔹 Create Booking (conversion tracking)

```http
POST /api/bookings
```

---

### 🔹 Get Cities

```http
GET /api/cities
```

---

## 🧪 Learning & Auto-Tuning

### User Events Tracked

* `impression` – hotel shown
* `click` – hotel opened
* `booking` – confirmed booking (strong signal)

### Auto-Tune Ranking Weights

```bash
node src/scripts/autoTune.js
```

* Safe by default
* Runs only when enough data exists
* Designed for daily cron execution

---

## 📈 What “Success” Looks Like

After launch:

* Rankings improve **without code changes**
* Different users see different results
* A/B tests converge on higher-conversion strategies
* Engineers stop tuning search manually

---

## 🔐 Privacy & Safety

* No PII stored for learning
* User identity can be anonymous
* GPT usage is controlled and limited
* Auto-tuning is conservative by design

---

## 🏁 End Goal (Achieved)

> **A self-learning hotel recommendation engine that continuously improves booking conversion by understanding users better with every interaction.**

---

## 🔮 Possible Extensions (Optional)

* Admin analytics dashboard
* Geo-radius search (“within 2km”)
* Multi-armed bandit optimisation
* Real-time re-indexing on availability changes

---

## 📜 License

MIT (or your preferred license)

---

If you want, I can also provide:

* a **system architecture diagram**
* an **admin analytics endpoint**
* a **deployment checklist (Docker / VPS / Cloud)**

Just tell me.
