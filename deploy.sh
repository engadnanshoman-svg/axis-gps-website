#!/bin/bash
set -e

echo "🚀 بدء نشر موقع اكسيس على الإنترنت"
echo "====================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}تثبيت Vercel CLI...${NC}"
    npm install -g vercel
fi

# Step 2: Login to Vercel
echo -e "${YELLOW}الخطوة 1: تسجيل الدخول إلى Vercel${NC}"
echo "سيتم فتح رابط في المتصفح - يرجى المصادقة هناك"
vercel login

# Step 3: Deploy
echo -e "${YELLOW}الخطوة 2: نشر الموقع${NC}"
vercel --prod

echo ""
echo -e "${GREEN}✅ تم النشر بنجاح!${NC}"
echo "الموقع متاح الآن على الإنترنت"
