# Business Calendar

This repository contains a business calendar application.

## Prerequisites

Before you begin, ensure you have the following installed:

- Git
- Docker

## Quick Start

To get started with the Business Calendar application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/puneet-lab/business-calendar.git
   ```

2. Navigate to the project directory:

   ```bash
   cd business-calendar
   ```

3. To build the Docker images, start the application, run tests, or stop the application, use the following Makefile commands:

   ```bash
   # Build Docker images
   make setup

   # Start the application
   make run

   # Run tests
   make test

   # Stop the application and clean up
   make stop
   ```
