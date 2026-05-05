# Ollama Local - AI Chat Assistant

<img width="1918" height="1040" alt="image" src="https://github.com/user-attachments/assets/aaea36d7-5823-4538-bc52-19624e7abbf9" />


A full-stack AI chat application with a modern React frontend and Express.js backend, supporting both **Ollama** (local LLM) and **Google Gemini** API integrations.

![AI Chat Assistant](https://img.shields.io/badge/AI-Chat%20Assistant-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)

## ✨ Features

- 🤖 **Dual AI Support** - Connect to local Ollama models or Google Gemini API
- 💬 **Real-time Chat** - Smooth, responsive chat interface with streaming support
- 🎨 **Modern UI** - Beautiful glass-morphism design with smooth animations
- ⚙️ **Customizable Settings** - Adjust AI personality, response format, and code block preferences
- 📝 **Markdown Support** - Rich text rendering with syntax highlighting for code blocks
- 🔒 **User Authentication** - Secure user management with JWT tokens
- 💾 **Chat History** - Persistent conversation storage with MongoDB
- 🌙 **Dark Theme** - Easy on the eyes with a modern dark aesthetic

## 🏗️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Markdown** with syntax highlighting

### Backend

- **Express.js** with ES Modules
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Axios** for HTTP requests
- **Marksmith.js** for Markdown to HTML conversion

## 📁 Project Structure

```
Ollama-local/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app configuration
│   │   ├── server.js           # Server entry point
│   │   ├── constants.js        # Application constants
│   │   ├── controllers/        # Route controllers
│   │   │   ├── chat.controller.js
│   │   │   ├── ollamaController.js
│   │   │   └── user.controller.js
│   │   ├── db/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── models/
│   │   │   └── user.model.js   # User schema
│   │   ├── routes/
│   │   │   ├── chat.routes.js
│   │   │   ├── ollamaRoutes.js
│   │   │   └── user.routes.js
│   │   ├── services/
│   │   │   ├── chat.services.js
│   │   │   └── ollamaService.js
│   │   └── utils/              # Utility functions
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.tsx             # Root component
    │   ├── main.tsx            # Entry point
    │   ├── components/
    │   │   ├── chat/           # Chat UI components
    │   │   │   ├── ChatContainer.tsx
    │   │   │   ├── ChatInput.tsx
    │   │   │   ├── EmptyState.tsx
    │   │   │   ├── LoadingMessage.tsx
    │   │   │   ├── MessageBubble.tsx
    │   │   │   └── MessageList.tsx
    │   │   ├── common/         # Reusable components
    │   │   │   ├── Avatar.tsx
    │   │   │   ├── ErrorBoundary.tsx
    │   │   │   └── Markdown.tsx
    │   │   └── settings/
    │   │       └── SettingsDialog.tsx
    │   ├── hooks/              # Custom React hooks
    │   │   ├── useChat.ts
    │   │   ├── useLocalStorage.ts
    │   │   ├── useSettings.ts
    │   │   └── promptEngineering.ts
    │   ├── styles/
    │   │   ├── animations.css
    │   │   └── theme.css
    │   ├── types/
    │   │   └── index.ts        # TypeScript interfaces
    │   └── utils/
    │       ├── api.ts
    │       ├── errorMessages.ts
    │       └── promptEngineering.ts
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.ts
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Ollama** (optional, for local LLM support)
- **Google Gemini API Key** (optional, for Gemini support)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/adhikareeprayush/Ollama-local.git
   cd Ollama-local
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=3000
CORS_ORIGIN=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb://localhost:27017

# Ollama (for local LLM)
OLLAMA_HOST=http://localhost:11434

# JWT Secret
JWT_SECRET=your-jwt-secret-key
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Google Gemini API (optional)
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### Running the Application

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

2. **Start the backend server**

   ```bash
   cd backend
   npm start
   ```

   The backend will run on `http://localhost:3000`

3. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Using with Ollama (Local LLM)

1. **Install Ollama** from [ollama.ai](https://ollama.ai)

2. **Pull a model** (e.g., DeepSeek-R1)

   ```bash
   ollama pull deepseek-r1
   ```

3. **Start Ollama server**
   ```bash
   ollama serve
   ```

## 🔌 API Endpoints

### Chat

- `POST /api/v1/chat/generate` - Generate AI response

### Users

- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/profile` - Get user profile

## ⚙️ Customization Options

The settings dialog allows you to customize:

| Setting             | Options                                         |
| ------------------- | ----------------------------------------------- |
| **AI Personality**  | Default, Professional, Friendly, Concise        |
| **Response Format** | Default, Bullet Points, Paragraph, Step-by-Step |
| **Code Blocks**     | Syntax highlighting, Line numbers               |

## 🛠️ Available Scripts

### Backend

```bash
npm start      # Start the server with nodemon
```

### Frontend

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
npm run preview # Preview production build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Prayush Adhikari**

- GitHub: [@adhikareeprayush](https://github.com/adhikareeprayush)

---

<p align="center">
  Made with ❤️ using React, Express, and AI
</p>
