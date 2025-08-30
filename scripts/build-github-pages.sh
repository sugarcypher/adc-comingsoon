#!/bin/bash

echo "🚀 Building Allure du Chic for GitHub Pages deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if needed
echo "📦 Installing dependencies..."
bun install

# Build the web version
echo "🌐 Building web version..."
bunx expo export --platform web

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Files are ready in the 'dist' directory."
echo "�� Ready for GitHub Pages deployment!"
