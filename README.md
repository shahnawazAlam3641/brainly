# Brainly

![Demo Video](brainly-frontend/src/assets/brainly-preview2.mp4)

[Live Project Link](https://brainly-typescript.vercel.app/)

Brainly is a "second brain" web application designed to help you store, organize, and access important content such as YouTube videos, tweets, documents, and links. Share notes with friends via unique links and manage your resources efficiently in one place.

## Features

- **Content Categorization**: Organize content as YouTube videos, tweets, documents, or generic links.
- **Tagging**: Add tags to notes
- **Content Previews**: View embedded YouTube videos and Twitter posts directly within the app.
- **Sharing**: Share notes with others using unique, sharable links.
- **Responsive Design**: Fully responsive for use on desktops, tablets, and mobile devices.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for modeling)
- **Icons**: Custom SVGs for enhanced visual experience

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shahnawazAlam3641/brainly.git
   cd brainly
   ```

2. Navigate to the frontend:
   ```bash
   cd brainly-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory of the frontend with the following variables:
   ```env
   REACT_APP_BASE_URL=http://your-backend-api-url
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Set up the backend:
   Navigate to the backend folder:
   ```bash
   cd ../backend
   ```

7. Install backend dependencies:
   ```bash
   npm install
   ```

8. Set up backend environment variables:
   Create a `.env` file in the backend root with necessary configurations:
   ```env
    JWT_SECRET=
    MONGODB_URL=
    REACT_APP_BASE_URL=
   ```

9. Start the backend server:
   ```bash
   npm run start
   ```

10. Access the app at `http://localhost:5173`.

## Project Structure

### Root Directory
```
brainly/
├── brainly-frontend/     # Frontend source code
│   ├── public/           # Static assets
│   ├── src/              # Frontend source code
│   │   ├── assets/       # Images and static assets
│   │   ├── components/   # React components
│   │   ├── reducer/      # Redux reducers
│   │   ├── slices/       # Redux slices
│   │   ├── svgs/         # Custom SVG icons
│   │   ├── utils/        # Utility functions
│   │   ├── App.css       # App-specific styles
│   │   ├── App.tsx       # Main app component
│   │   ├── index.css     # Global styles
│   │   ├── main.tsx      # React entry point
│   │   └── vite-env.d.ts # TypeScript environment config
│   └── frontend config files (e.g., package.json, tsconfig.json)
└── backend/              # Backend source code
    ├── src/              # Backend source
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── middlewares/  # Express middlewares
    │   ├── models/       # MongoDB models
    │   ├── index.ts      # Entry point
    │   ├── interface.ts  # TypeScript interfaces
    │   └── types.d.ts    # Type definitions
    └── backend config files (e.g., package.json, tsconfig.json)
```

## Known Issues

- Twitter embed may require manual reload for certain links.
- Environment variable setup must be precise for seamless deployment.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

