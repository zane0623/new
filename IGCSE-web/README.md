# IGCSE Exam Preparation Platform

A modern web application designed to help IGCSE students prepare for their exams with realistic practice tests, personalized analytics, and comprehensive progress tracking.

## Features

- **User Authentication**: Secure login for students, parents, and school administrators
- **Exam Simulation**: Timed practice tests that mimic real IGCSE exam conditions
- **Performance Analytics**: Detailed insights into student performance and areas for improvement
- **Progress Tracking**: Visual representation of student progress over time
- **Multi-role Access**: Tailored experiences for students, parents, and administrators

## Tech Stack

- **Frontend**: React with Chakra UI for modern, responsive interface
- **Routing**: React Router v6 for seamless navigation
- **State Management**: Context API with React Hooks
- **Authentication**: JWT-based authentication
- **Styling**: Emotion + Chakra UI for component-based styling
- **Icons**: React Icons
- **Charts**: Recharts for performance visualization
- **Build Tool**: Vite for fast development and optimized production builds

## Getting Started

### Prerequisites

- Node.js (v14.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/igcse-exam-prep.git
   cd igcse-exam-prep
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Accounts

For testing purposes, you can use the following demo accounts:

- **Student**: 
  - Email: student@example.com
  - Password: password

- **Parent**: 
  - Email: parent@example.com
  - Password: password

- **Admin**: 
  - Email: admin@example.com
  - Password: password

## Project Structure

```
igcse-web/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/           # Authentication-related components
│   │   ├── layout/         # Layout components (Header, Footer, etc.)
│   │   └── ...
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin-specific pages
│   │   ├── auth/           # Authentication pages
│   │   ├── parent/         # Parent-specific pages
│   │   └── student/        # Student-specific pages
│   ├── services/           # API and utility services
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

This will generate a `dist` folder containing optimized production files.

## Future Enhancements

- Mobile app for iOS and Android
- Integration with school information systems
- AI-powered personalized learning paths
- Virtual proctoring for secure remote exams
- Social learning features for peer collaboration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- IGCSE curriculum specialists for subject matter expertise
- Educators and students who provided feedback during development
- The open-source community for the amazing tools and libraries used in this project 