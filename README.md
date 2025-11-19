# DevTinder Frontend 💻❤️

A modern, responsive dating platform specifically designed for developers to connect, network, and find their perfect coding companion. Built with React, Redux, and Tailwind CSS.

![DevTinder](https://img.shields.io/badge/DevTinder-Frontend-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css)
![AWS](https://img.shields.io/badge/AWS-Deployed-orange?style=for-the-badge&logo=amazon-aws)
![Nginx](https://img.shields.io/badge/Nginx-Web%20Server-009639?style=for-the-badge&logo=nginx)

## 🔧 Backend Source Code 
**Accessible at: https://github.com/2004lokeshvenom/DevTinder**


## 🌐 Live Demo

🚀 **Deployed on AWS with Nginx**

The application is live and accessible at: https://dev-tinder.space

## ✨ Features

- 🔐 **User Authentication** - Secure login and signup with session management
- 👤 **User Profiles** - Create and edit detailed profiles with photos, bio, and preferences
- 🔍 **Smart Feed** - Discover potential matches based on your preferences
- 💌 **Connection Requests** - Send and receive connection requests
- 💬 **Real-time Chat** - Live messaging with Socket.IO integration
- 👥 **Connections Management** - View and manage your connections
- 💎 **Premium Plans** - Silver and Gold subscription plans with Razorpay integration
- 📱 **Responsive Design** - Fully responsive UI that works on all devices
- 🎨 **Modern UI** - Beautiful interface built with DaisyUI and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM 7.9.4
- **Styling**: Tailwind CSS 4.1.16 + DaisyUI 5.3.10
- **HTTP Client**: Axios 1.13.1
- **Real-time Communication**: Socket.IO Client 4.8.1
- **Payment Integration**: Razorpay
- **Web Server**: Nginx
- **Hosting**: AWS (EC2/Elastic Beanstalk)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A backend API server running (DevTinder Backend)

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/2004lokeshvenom/DevTinder-FE.git
   cd DevTinder-FE
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure the API endpoint**

   The API endpoint is automatically configured in `src/Utils/constants.js`:

   - **Development**: `http://localhost:7676`
   - **Production**: `/api` (relative path)

   If you need to change the backend URL, edit `src/Utils/constants.js`:

   ```javascript
   const BASE_URL = location.hostname === 'localhost' ? 'http://localhost:7676' : '/api'
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## 📁 Project Structure

```
DevTinder-FE/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Body.jsx       # Main layout wrapper
│   │   ├── Home.jsx       # User feed/home page
│   │   ├── LoginPage.jsx  # Login component
│   │   ├── Signup.jsx     # Registration component
│   │   ├── Profile.jsx    # Profile wrapper
│   │   ├── EditProfile.jsx # Profile editing
│   │   ├── UserCard.jsx  # User card component
│   │   ├── NavBar.jsx    # Navigation bar
│   │   ├── Footer.jsx    # Footer component
│   │   ├── Connections.jsx # Connections list
│   │   ├── Requests.jsx  # Connection requests
│   │   ├── Chat.jsx      # Real-time chat
│   │   └── Payments.jsx  # Premium plans
│   ├── Utils/             # Utility files
│   │   ├── AppStore.js   # Redux store configuration
│   │   ├── UserSlice.js  # User state management
│   │   ├── UserFeed.js   # Feed state management
│   │   ├── connectionSlice.js # Connections state
│   │   ├── requests.js   # Requests state management
│   │   ├── socket.js     # Socket.IO configuration
│   │   └── constants.js  # API base URL
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css        # Global styles
├── dist/                  # Production build (generated)
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🔧 Configuration

### API Configuration

The project uses a simple hostname-based configuration in `src/Utils/constants.js`:

- **Development**: `http://localhost:7676`
- **Production**: `/api` (proxied through Nginx to backend)

For production deployment:

- API requests to `/api` are proxied through Nginx to your backend server
- Socket.IO connections use `/api/socket.io` path
- CORS must be properly configured on your backend
- Cookies are enabled for session management (`withCredentials: true`)

### Socket.IO Configuration

Socket.IO is configured in `src/Utils/socket.js`:

- **Development**: Connects directly to `http://localhost:7676`
- **Production**: Connects to `/api/socket.io` (proxied through Nginx)

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder contains the production-ready files.

### AWS Deployment with Nginx

This project is deployed on **AWS EC2** using **Nginx** as the web server.

**Quick Setup:**

1. Build the project: `npm run build`
2. Upload `dist` folder contents to `/var/www/devtinder` on your EC2 instance
3. Configure Nginx to:
   - Serve static files from `/var/www/devtinder`
   - Proxy `/api` requests to your backend (port 7676)
   - Handle React Router with `try_files $uri $uri/ /index.html;`
   - Proxy Socket.IO connections at `/api/socket.io`

**Key Nginx Configuration:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /api {
    proxy_pass http://localhost:7676;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
}
```

For detailed deployment instructions, refer to AWS and Nginx documentation.

## 🎯 Key Features Explained

### Authentication Flow

- Users can sign up with email, password, and profile details
- Session management using cookies
- Protected routes that redirect to login if not authenticated

### User Feed

- Displays potential matches one at a time
- Users can express interest or ignore profiles
- Feed updates dynamically after each action

### Connection Requests

- Send connection requests to users you're interested in
- Receive and review incoming requests
- Accept or reject requests

### Real-time Chat

- Socket.IO powered live messaging
- Chat with your connections
- Message history persistence

### Premium Plans

- Silver Plan (₹500): Limited features with blue tick badge
- Gold Plan (₹700): Unlimited features with golden tick badge
- Razorpay integration for secure payments

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Follow ESLint rules configured in `eslint.config.js`
- Use functional components with hooks
- Follow React best practices
- Maintain consistent code formatting

## 🐛 Known Issues

- Ensure backend server is running before starting the frontend
- Socket.IO connection requires backend Socket.IO server to be running
- Payment integration requires valid Razorpay keys

## 🔧 Troubleshooting

- **404 errors on refresh**: Ensure Nginx has `try_files $uri $uri/ /index.html;` for SPA routing
- **API not working**: Verify `/api` proxy configuration points to correct backend port
- **Socket.IO fails**: Check WebSocket upgrade headers are configured in Nginx
- **Backend connection**: Ensure backend is running and accessible from EC2 instance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Surisetti Lokesh Vanamayya**

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- Tailwind CSS and DaisyUI for the beautiful UI components
- Socket.IO for real-time communication
- Razorpay for payment integration

## 📞 Support

For support, email lokeshvanamayya@gmail.com or open an issue in the repository.

---

**Made with ❤️ for the Developer Community**
