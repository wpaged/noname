echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_ENV" == "production" ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  # skip build
  exit 0;
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi