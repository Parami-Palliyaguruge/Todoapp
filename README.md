# Todo Application

A full-stack Todo application built with React and .NET Core, following Clean Architecture principles.

## Project Structure

```
TodoApp/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   └── tests/
│   
├── backend/           # .NET Core backend application
│   ├── TodoApp.API/           # API Layer
│   ├── TodoApp.Core/         # Domain Layer
│   ├── TodoApp.Infrastructure/# Infrastructure Layer
│   └── TodoApp.Tests/        # Test Projects
```

## Features

- User authentication using Auth0
- Todo management (Create, Read, Update, Delete)
- Task filtering (All, Active, Completed)
- Dashboard with task summaries
- Responsive design using Tailwind CSS

## Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- Jest & React Testing Library

### Backend
- .NET Core Web API
- Entity Framework Core
- Clean Architecture
- xUnit for testing
- JWT Authentication
- SQL Server

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- .NET Core SDK 7.0 or later
- SQL Server

### Frontend Setup
1. Navigate to the frontend directory
```bash
cd frontend
npm install
npm start
```

### Backend Setup
1. Navigate to the backend directory
```bash
cd backend
dotnet restore
dotnet run --project TodoApp.API
```

## Testing
- Frontend: `npm test`
- Backend: `dotnet test`
