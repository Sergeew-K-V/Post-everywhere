# Post Everywhere

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js 20+ (for local development)

## 🐳 Running with Docker

### Production Mode

```bash
# Build and start the production container
docker compose up

# Or run in detached mode
docker compose up -d

# Access the application at http://localhost:3000
```

### Development Mode (with Hot Reloading)

```bash
# Start development container with hot reloading
docker compose --profile dev up app-dev

# Or run in detached mode
docker compose --profile dev up -d app-dev

# Access the application at http://localhost:3001
```

### Docker Commands Reference

#### Build Images

```bash
# Build production image
docker build -t post-everywhere .

# Build development image
docker build -f Dockerfile.dev -t post-everywhere-dev .
```

#### Run Containers

```bash
# Run production container
docker run -p 3000:3000 post-everywhere

# Run development container with volume mounting
docker run -p 3001:3000 -v $(pwd):/app post-everywhere-dev
```

#### Manage Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# View logs
docker compose logs -f app

# View logs for development service
docker compose --profile dev logs -f app-dev

# Rebuild and restart
docker compose up --build
```

#### Health Check

The application includes a health check endpoint at `/api/health`:

```bash
# Check health status
curl http://localhost:3000/api/health
```

## 🛠️ Local Development (without Docker)

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 📁 Project Structure

```
post-everywhere/
├── src/
│   └── app/
│       ├── components/     # React components
│       ├── api/           # API routes
│       ├── globals.css    # Global styles
│       ├── layout.tsx     # Root layout
│       └── page.tsx       # Home page
├── public/                # Static assets
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── docker-compose.yml    # Docker Compose configuration
└── .dockerignore         # Docker build exclusions
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

### Docker Environment

The Docker setup includes these environment variables:

- `NODE_ENV`: Set to `production` for production builds
- `NEXT_TELEMETRY_DISABLED`: Disables Next.js telemetry
- `PORT`: Application port (default: 3000)
- `HOSTNAME`: Host binding (default: 0.0.0.0)

## 🏗️ Build Process

### Production Build

1. **Dependencies Stage**: Installs production dependencies
2. **Builder Stage**: Builds the Next.js application
3. **Runner Stage**: Creates optimized production image

### Development Build

- Single-stage build with all dependencies
- Volume mounting for hot reloading
- Turbopack for faster builds

## 📊 Monitoring

### Health Checks

- Production service includes health checks
- Endpoint: `GET /api/health`
- Checks every 30 seconds

### Logs

```bash
# View application logs
docker compose logs -f app

# View specific service logs
docker compose logs -f app-dev
```

## 🚀 Deployment

### Production Deployment

```bash
# Build and deploy
docker compose up -d

# Scale if needed
docker compose up -d --scale app=3
```

### Environment-Specific Deployments

```bash
# Development
docker compose --profile dev up -d app-dev

# Production
docker compose up -d app
```

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000

# Stop conflicting services
docker compose down
```

#### Build Failures

```bash
# Clean build
docker compose down
docker system prune -f
docker compose up --build
```

#### Permission Issues

```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Debug Commands

```bash
# Enter running container
docker compose exec app sh

# View container resources
docker stats

# Inspect container
docker inspect post-everywhere-app-1
```

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Docker Documentation](https://docs.docker.com/) - learn about Docker.
- [Docker Compose Documentation](https://docs.docker.com/compose/) - learn about Docker Compose.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
