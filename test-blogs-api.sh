#!/bin/bash

echo "Testing Admin Blogs API..."
echo ""

# Get a valid token first by logging in
echo "1. Testing login endpoint..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "✗ Failed to get token. Login response:"
  echo $LOGIN_RESPONSE
  exit 1
fi

echo "✓ Got token: ${TOKEN:0:20}..."
echo ""

# Test the admin blogs endpoint
echo "2. Testing /api/blogs/admin endpoint..."
ADMIN_RESPONSE=$(curl -s -X GET http://localhost:3001/api/blogs/admin \
  -H "Authorization: Bearer $TOKEN")

echo "Response:"
echo $ADMIN_RESPONSE | head -c 500
echo ""
echo ""

# Test the public blogs endpoint
echo "3. Testing /api/blogs endpoint (public)..."
PUBLIC_RESPONSE=$(curl -s -X GET http://localhost:3001/api/blogs)

echo "Response:"
echo $PUBLIC_RESPONSE | head -c 500
echo ""

echo "✓ Done!"
