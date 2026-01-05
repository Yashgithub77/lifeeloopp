#  LifeLoop

**Your AI-Powered Life Planning Companion**

LifeLoop is an intelligent life planning application that combines goal tracking, fitness monitoring, calendar management, and wellness tools into one seamless experience. Built with Next.js 16 and powered by Google's Gemini AI.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🎯 **Smart Goal Management**
- Create and track goals across multiple categories (Career, Fitness, Personal, etc.)
- AI-powered task generation and scheduling
- Automatic progress tracking with visual indicators
- Daily task management with intelligent replanning

### 🏃 **Google Fit Integration**
- Real-time fitness data synchronization
- Step tracking, calories, and active minutes
- Heart rate monitoring
- Beautiful progress visualization with customizable goals

### 📅 **Google Calendar Sync**
- Two-way calendar synchronization
- Automatic conflict detection
- Smart scheduling that works around your meetings
- Push tasks to Google Calendar with one click

### 🤖 **AI Assistant**
- Powered by Google Gemini AI
- Context-aware suggestions and motivation
- Intelligent insights about your goals and progress
- Personalized recommendations

### 🧘 **Wellness Tools**
- **Pomodoro Timer**: Focus sessions with ambient backgrounds
- **Breathing Exercises**: Guided relaxation with visual cues
- Fullscreen modes for immersive experiences
- Customizable timers and routines

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud Project with OAuth 2.0 credentials
- PostgreSQL database (optional, for user persistence)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lifeloop.git
   cd lifeloop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database (optional)
   DATABASE_URL="your-postgresql-url"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # NextAuth
   AUTH_SECRET="your-random-secret-key"

   # Gemini AI
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Run database migrations** (if using Prisma)
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 🔧 Configuration

### Google Cloud Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing

2. **Enable Required APIs**
   - Google Calendar API
   - Google Fitness API
   - Google+ API (for OAuth)

3. **Configure OAuth Consent Screen**
   - Add application name and logo
   - Add authorized domains
   - Add required scopes:
     - `openid`
     - `email`
     - `profile`
     - `https://www.googleapis.com/auth/calendar.events`
     - `https://www.googleapis.com/auth/fitness.activity.read`
     - `https://www.googleapis.com/auth/fitness.body.read`
     - `https://www.googleapis.com/auth/fitness.heart_rate.read`
     - `https://www.googleapis.com/auth/fitness.sleep.read`

4. **Create OAuth 2.0 Credentials**
   - Create credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

5. **Get Gemini API Key**
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Create an API key

---

## 📂 Project Structure

```
lifeloop/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── ai-chat/      # Gemini AI chat
│   │   │   ├── auth/         # NextAuth routes
│   │   │   ├── calendar/     # Google Calendar sync
│   │   │   ├── fitness/      # Google Fit integration
│   │   │   └── tasks/        # Task management
│   │   ├── dashboard/        # Main dashboard page
│   │   ├── login/            # Animated login page
│   │   ├── setup/            # Initial setup flow
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── BreathingExercise.tsx
│   │   ├── CalendarSync.tsx
│   │   ├── FitnessTracker.tsx
│   │   ├── PomodoroTimer.tsx
│   │   └── ...
│   ├── data/                 # Data management
│   ├── hooks/                # Custom React hooks
│   ├── types.ts              # TypeScript types
│   └── auth.ts               # NextAuth configuration
├── prisma/                   # Database schema
├── public/                   # Static assets
└── package.json
```

---

## 🎯 Usage

### First Time Setup

1. **Sign in with Google** - Authenticate and grant permissions
2. **Set Your Goals** - Define what you want to achieve
3. **Connect Services**:
   - Sync with Google Calendar
   - Enable Google Fit tracking
4. **Start Tracking** - The AI will generate tasks and help you stay on track

### Daily Workflow

1. **Check Dashboard** - See today's tasks and fitness progress
2. **Use AI Assistant** - Get personalized insights and motivation
3. **Focus Sessions** - Use Pomodoro timer for deep work
4. **Sync Fitness** - Track your physical activity automatically
5. **Review & Adjust** - AI helps replan if you fall behind

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL + Prisma ORM
- **AI**: Google Gemini AI
- **APIs**: 
  - Google Calendar API
  - Google Fitness API
- **Deployment**: Vercel-ready

---

## 📊 Features in Detail

### Goal Categories
- 🎓 **Career** - Professional development
- 💪 **Fitness** - Health and wellness
- 🧠 **Learning** - Education and skills
- 👤 **Personal** - Life goals
- 💰 **Financial** - Money management
- 🎨 **Creative** - Artistic pursuits

### Task Management
- Auto-generated tasks from goals
- Smart scheduling based on calendar
- Conflict detection
- Progress tracking
- AI-powered replanning

### Wellness Features
- **Pomodoro Timer**: 25/5 min work/break cycles
- **Breathing Exercises**: Box breathing, 4-7-8 technique
- **Fullscreen Modes**: Distraction-free focus
- **Ambient Backgrounds**: Calming visuals

---

## 🔐 Security

- Environment variables for sensitive data
- OAuth 2.0 authentication
- Secure session management
- API rate limiting
- Input validation and sanitization

---

## 🐛 Troubleshooting

### Authentication Issues
- Ensure `AUTH_SECRET` is set in `.env`
- Check Google OAuth credentials are correct
- Verify redirect URIs match

### Google Fit Not Syncing
- Re-authenticate to grant Fitness permissions
- Check scopes in Google Cloud Console
- Ensure Google Fit app has data

### Database Errors
- Run `npx prisma generate` 
- Check `DATABASE_URL` is correct
- Run `npx prisma db push` to sync schema

---

## 📝 Documentation

- [Google Fit Setup Guide](./GOOGLE_FIT_SETUP.md)
- [Auth Fix Instructions](./AUTH_FIX_INSTRUCTIONS.md)
- [Fixes Summary](./FIXES_SUMMARY.md)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Google Gemini AI for intelligent insights
- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling
- NextAuth.js for authentication

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for productivity and wellness**
