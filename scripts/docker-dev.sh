#!/bin/bash
# Docker Compose management script for Ordo development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to start services
start_services() {
    print_info "Starting Ordo development services..."
    docker-compose up -d
    
    print_info "Waiting for services to be healthy..."
    sleep 5
    
    # Check service health
    if docker-compose ps | grep -q "healthy"; then
        print_info "Services started successfully!"
        docker-compose ps
    else
        print_warning "Services started but health checks may still be running."
        print_info "Run 'docker-compose ps' to check status."
    fi
}

# Function to stop services
stop_services() {
    print_info "Stopping Ordo development services..."
    docker-compose down
    print_info "Services stopped."
}

# Function to restart services
restart_services() {
    print_info "Restarting Ordo development services..."
    docker-compose restart
    print_info "Services restarted."
}

# Function to view logs
view_logs() {
    if [ -z "$1" ]; then
        print_info "Showing logs for all services (Ctrl+C to exit)..."
        docker-compose logs -f
    else
        print_info "Showing logs for $1 (Ctrl+C to exit)..."
        docker-compose logs -f "$1"
    fi
}

# Function to show status
show_status() {
    print_info "Service status:"
    docker-compose ps
    echo ""
    print_info "Resource usage:"
    docker-compose stats --no-stream
}

# Function to reset (remove volumes)
reset_services() {
    print_warning "This will stop services and DELETE ALL DATA!"
    read -p "Are you sure? (yes/no): " confirm
    if [ "$confirm" = "yes" ]; then
        print_info "Stopping services and removing volumes..."
        docker-compose down -v
        print_info "All data removed. Run 'start' to initialize fresh services."
    else
        print_info "Reset cancelled."
    fi
}

# Function to access PostgreSQL
access_postgres() {
    print_info "Connecting to PostgreSQL..."
    docker-compose exec postgres psql -U ordo -d ordo_db
}

# Function to access Redis
access_redis() {
    print_info "Connecting to Redis..."
    docker-compose exec redis redis-cli
}

# Function to show help
show_help() {
    cat << EOF
Ordo Docker Development Helper

Usage: $0 [command]

Commands:
    start       Start all services (PostgreSQL, Redis)
    stop        Stop all services (keeps data)
    restart     Restart all services
    status      Show service status and resource usage
    logs        Show logs for all services
    logs <svc>  Show logs for specific service (postgres, redis)
    reset       Stop services and remove all data (WARNING: destructive!)
    psql        Connect to PostgreSQL database
    redis       Connect to Redis CLI
    help        Show this help message

Examples:
    $0 start              # Start all services
    $0 logs postgres      # View PostgreSQL logs
    $0 psql               # Connect to database
    $0 reset              # Reset everything (deletes data!)

EOF
}

# Main script logic
check_docker

case "${1:-help}" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    status)
        show_status
        ;;
    logs)
        view_logs "$2"
        ;;
    reset)
        reset_services
        ;;
    psql)
        access_postgres
        ;;
    redis)
        access_redis
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
