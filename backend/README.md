# Chatbot Backend API

A Django REST Framework backend for a chatbot application with cookie-based authentication and Gemini AI integration.

## Features

- Custom User Model with email-based authentication
- Cookie-based authentication (Session Authentication)
- Django REST Framework with Model Serializers
- Class-based APIView endpoints
- Gemini AI integration for chatbot functionality
- CORS support for cross-origin requests
- Chat message history storage

## Technology Stack

- Django 4.2.7
- Django REST Framework 3.14.0
- Google Generative AI (Gemini)
- django-cors-headers for CORS support

## Setup Instructions

### Prerequisites

- Python 3.8+
- pip
- Gemini API Key

### Installation

1. **Clone the repository and navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended)**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file in the project root**
   ```env
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/`

## API Endpoints

### Base URL
```
http://localhost:8000
```

### Authentication Endpoints

#### 1. Register User

**Endpoint:** `POST /api/auth/register/`

**Description:** Register a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "securepassword123",
  "password_confirm": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "john_doe",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Sample Test Data:**
```json
{
  "email": "test@example.com",
  "username": "testuser",
  "password": "testpass123",
  "password_confirm": "testpass123"
}
```

---

#### 2. Login User

**Endpoint:** `POST /api/auth/login/`

**Description:** Login user and set session cookie

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "john_doe",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Note:** The response includes a `Set-Cookie` header that sets the session cookie. Make sure your client includes `credentials: 'include'` in fetch requests.

**Sample Test Data:**
```json
{
  "email": "test@example.com",
  "password": "testpass123"
}
```

---

#### 3. Logout User

**Endpoint:** `POST /api/auth/logout/`

**Description:** Logout user and clear session cookie

**Headers:**
- `Cookie: sessionid=<session_id>` (automatically sent by browser)

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

#### 4. Get User Profile

**Endpoint:** `GET /api/auth/profile/`

**Description:** Get current authenticated user's profile

**Headers:**
- `Cookie: sessionid=<session_id>` (automatically sent by browser)

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "john_doe",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### Chatbot Endpoints

#### 5. Send Chat Message

**Endpoint:** `POST /api/chatbot/chat/`

**Description:** Send a message to the chatbot and get AI response

**Headers:**
- `Cookie: sessionid=<session_id>` (automatically sent by browser)
- `CookieX-CSRFToken: token`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "message": "Hello, how are you?",
  "response": "Hello! I'm doing well, thank you for asking. How can I assist you today?",
  "created_at": "2024-01-15T10:35:00Z"
}
```

**Sample Test Data:**
```json
{
  "message": "What is Python?"
}
```

```json
{
  "message": "Explain machine learning in simple terms"
}
```

```json
{
  "message": "Write a function to calculate fibonacci numbers"
}
```

---

#### 6. Get Chat History

**Endpoint:** `GET /api/chatbot/history/`

**Description:** Get all chat messages for the authenticated user

**Headers:**
- `Cookie: sessionid=<session_id>` (automatically sent by browser)

**Response (200 OK):**
```json
[
  {
    "id": 3,
    "message": "What is Python?",
    "response": "Python is a high-level programming language...",
    "created_at": "2024-01-15T10:40:00Z"
  },
  {
    "id": 2,
    "message": "Hello, how are you?",
    "response": "Hello! I'm doing well, thank you for asking...",
    "created_at": "2024-01-15T10:35:00Z"
  },
  {
    "id": 1,
    "message": "Hi there",
    "response": "Hi! How can I help you today?",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

---

## Authentication Flow

1. **Register** a new user using `/api/auth/register/`
2. **Login** with credentials using `/api/auth/login/` (session cookie is automatically set)
3. Subsequent requests will automatically include the session cookie
4. Use `/api/auth/logout/` to end the session

## Testing the API

### Using cURL

#### Register User
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpass123",
    "password_confirm": "testpass123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

#### Send Chat Message (after login)
```bash
curl -X POST http://localhost:8000/api/chatbot/chat/ \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "message": "Hello, what is Python?"
  }'
```

#### Get Chat History
```bash
curl -X GET http://localhost:8000/api/chatbot/history/ \
  -b cookies.txt
```

#### Get User Profile
```bash
curl -X GET http://localhost:8000/api/auth/profile/ \
  -b cookies.txt
```

#### Logout
```bash
curl -X POST http://localhost:8000/api/auth/logout/ \
  -b cookies.txt
```

### Using JavaScript (Fetch API)

```javascript
// Base URL
const API_BASE = 'http://localhost:8000/api';

// Register
async function register() {
  const response = await fetch(`${API_BASE}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({
      email: 'test@example.com',
      username: 'testuser',
      password: 'testpass123',
      password_confirm: 'testpass123'
    })
  });
  const data = await response.json();
  console.log(data);
}

// Login
async function login() {
  const response = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'testpass123'
    })
  });
  const data = await response.json();
  console.log(data);
}

// Send Chat Message
async function sendMessage() {
  const response = await fetch(`${API_BASE}/chatbot/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({
      message: 'Hello, what is Python?'
    })
  });
  const data = await response.json();
  console.log(data);
}

// Get Chat History
async function getHistory() {
  const response = await fetch(`${API_BASE}/chatbot/history/`, {
    method: 'GET',
    credentials: 'include', // Important for cookies
  });
  const data = await response.json();
  console.log(data);
}

// Get Profile
async function getProfile() {
  const response = await fetch(`${API_BASE}/auth/profile/`, {
    method: 'GET',
    credentials: 'include', // Important for cookies
  });
  const data = await response.json();
  console.log(data);
}

// Logout
async function logout() {
  const response = await fetch(`${API_BASE}/auth/logout/`, {
    method: 'POST',
    credentials: 'include', // Important for cookies
  });
  const data = await response.json();
  console.log(data);
}
```

### Using Python (requests library)

```python
import requests

BASE_URL = "http://localhost:8000/api"

# Create a session to handle cookies
session = requests.Session()

# Register
register_data = {
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpass123",
    "password_confirm": "testpass123"
}
response = session.post(f"{BASE_URL}/auth/register/", json=register_data)
print(response.json())

# Login
login_data = {
    "email": "test@example.com",
    "password": "testpass123"
}
response = session.post(f"{BASE_URL}/auth/login/", json=login_data)
print(response.json())

# Send Chat Message
chat_data = {
    "message": "Hello, what is Python?"
}
response = session.post(f"{BASE_URL}/chatbot/chat/", json=chat_data)
print(response.json())

# Get Chat History
response = session.get(f"{BASE_URL}/chatbot/history/")
print(response.json())

# Get Profile
response = session.get(f"{BASE_URL}/auth/profile/")
print(response.json())

# Logout
response = session.post(f"{BASE_URL}/auth/logout/")
print(response.json())
```

## Sample Test Data

### User Registration Test Cases

1. **Valid Registration**
   ```json
   {
     "email": "alice@example.com",
     "username": "alice123",
     "password": "password123",
     "password_confirm": "password123"
   }
   ```

2. **Invalid - Password Mismatch**
   ```json
   {
     "email": "bob@example.com",
     "username": "bob123",
     "password": "password123",
     "password_confirm": "differentpassword"
   }
   ```

### Chat Message Test Cases

1. **General Question**
   ```json
   {
     "message": "What is the weather like today?"
   }
   ```

2. **Technical Question**
   ```json
   {
     "message": "Explain REST API principles"
   }
   ```

3. **Code Request**
   ```json
   {
     "message": "Write a Python function to reverse a string"
   }
   ```

4. **Conversational**
   ```json
   {
     "message": "Tell me a joke"
   }
   ```

## Error Responses

### 400 Bad Request
```json
{
  "email": ["This field is required."],
  "password": ["This field is required."]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 500 Internal Server Error
```json
{
  "error": "Error getting response from Gemini AI: <error message>"
}
```

## Important Notes

1. **Cookie-Based Authentication**: Make sure to include `credentials: 'include'` in JavaScript fetch requests or use a session object in Python requests.

2. **CORS Configuration**: The backend is configured to allow all origins in development. Update `CSRF_TRUSTED_ORIGINS` in production.

3. **Gemini API Key**: Ensure your `.env` file contains a valid `GEMINI_API_KEY` for the chatbot to work.

4. **CSRF Token**: For cookie-based authentication with CORS, the CSRF token is automatically handled. Make sure your frontend sends cookies with requests.

## Project Structure

```
backend/
├── accounts/
│   ├── models.py          # Custom User model
│   ├── serializers.py     # User, Register, Login serializers
│   ├── views.py           # Authentication APIViews
│   └── urls.py            # Auth routes
├── chatbot/
│   ├── models.py          # ChatMessage model
│   ├── serializers.py     # ChatMessage serializers
│   ├── views.py           # Chatbot APIViews
│   ├── services.py        # Gemini AI integration
│   └── urls.py            # Chatbot routes
├── chatbot_project/
│   ├── settings.py        # Django settings
│   └── urls.py            # Main URL configuration
├── manage.py
├── requirements.txt
└── README.md
```

## License

This project is for educational purposes.
