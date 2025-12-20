# 🏃 Google Fit Integration Guide for LifeLoop

## ✅ What's Been Done

I've successfully set up the Google Fit integration for your LifeLoop app! Here's what's now ready:

### 1. **OAuth Scopes Added** ✓
Updated `src/auth.ts` to request these Google Fit permissions:
- ✅ `fitness.activity.read` - Steps and activity data
- ✅ `fitness.body.read` - Body measurements
- ✅ `fitness.heart_rate.read` - Heart rate data
- ✅ `fitness.sleep.read` - Sleep tracking

### 2. **API Route Created** ✓
New endpoint: `/api/fitness/sync`
- Fetches real-time data from Google Fit
- Processes steps, calories, active minutes, and heart rate
- Returns 7-day history + today's data

### 3. **UI Component Updated** ✓
`FitnessTracker` component now has:
- 🔄 Sync button to manually refresh Google Fit data
- Loading states during sync
- Error handling for failed syncs

---

## 📋 Next Steps - What YOU Need to Do

### Step 1: Update Google Cloud Console

1. **Go to**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

2. **Select your project** (the one with your OAuth credentials)

3. **Navigate to**: APIs & Services → OAuth consent screen

4. **Add Scopes**:
   - Click "Edit App"
   - Go to "Scopes" section
   - Click "Add or Remove Scopes"
   - Search and add these scopes:
     ```
     https://www.googleapis.com/auth/fitness.activity.read
     https://www.googleapis.com/auth/fitness.body.read
     https://www.googleapis.com/auth/fitness.heart_rate.read
     https://www.googleapis.com/auth/fitness.sleep.read
     ```
   - Click "Save and Continue"

5. **Save Changes**

### Step 2: Sign Out and Re-Authenticate

Since we added new scopes, users need to re-authenticate:

1. In your app, **sign out** of your account
2. **Sign in again** with Google
3. You'll see a new consent screen asking for Fitness permissions
4. **Accept** the permissions

---

## 🧪 How to Test

### Test 1: Manual Sync

1. Navigate to your dashboard
2. Look for the **FitnessTracker** component
3. Click the **"🔄 Sync"** button
4. Watch the loading animation
5. Your real Google Fit data should appear!

### Test 2: Check the Data

The component will show:
- **Steps**: Your actual step count from Google Fit
- **Distance**: Calculated from steps
- **Calories**: Calories burned
- **Active Minutes**: Time spent in activities

### Test 3: Test the API Directly

Open in browser (while logged in):
```
http://localhost:3000/api/fitness/sync
```

You should see JSON response with your fitness data.

---

## 🔧 How It Works

```
User Dashboard
     ↓
Clicks "Sync" Button
     ↓
Calls /api/fitness/sync
     ↓
Uses OAuth Access Token
     ↓
Fetches from Google Fit API
     ↓
Processes Data (steps, calories, etc.)
     ↓
Returns to UI
     ↓
FitnessTracker displays real data!
```

---

## 📊 Data You'll Get

### Today's Data:
```json
{
  "steps": 8432,
  "stepsGoal": 10000,
  "calories": 287,
  "activeMinutes": 45,
  "heartRate": 72,
  "distanceKm": 6.4
}
```

### 7-Day History:
Array of daily data for trend visualization

---

## 🚨 Troubleshooting

### Error: "Not authenticated"
**Solution**: Sign in with your Google account

### Error: "Insufficient permissions"
**Solution**: 
1. Sign out
2. Clear browser cookies
3. Sign in again and accept all permissions

### Error: "Please reconnect your Google account"
**Solution**: 
1. Go to [Google Account Permissions](https://myaccount.google.com/permissions)
2. Remove LifeLoop
3. Sign in again to your app

### No data showing (all zeros)
**Possible causes**:
1. No Google Fit data on your account - Install Google Fit app and track some activity
2. Privacy settings - Check Google Fit app permissions
3. Data source not connected - Open Google Fit and ensure data sources are connected

---

## 🎯 Integration Points

### Where to Add Sync Functionality

In your **dashboard** or any component using FitnessTracker:

```tsx
const handleSyncGoogleFit = async () => {
  try {
    const response = await fetch('/api/fitness/sync');
    const data = await response.json();
    
    if (data.success) {
      // Update your fitness state with data.today
      setFitnessData(data.today);
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
};

<FitnessTracker 
  data={fitnessData} 
  onSyncGoogleFit={handleSyncGoogleFit}
/>
```

---

## 📱 Mobile App Note

If you want to track fitness data:
1. Install **Google Fit** app on your phone
2. Let it track your steps/activities
3. Sync will pull data from there!

---

## ✨ What's Next?

Future enhancements you could add:
- [ ] Auto-sync every 5 minutes
- [ ] Weekly/monthly fitness reports
- [ ] Goal achievements and badges
- [ ] Integration with other fitness apps (Strava, Fitbit, etc.)
- [ ] Workout recommendations based on activity levels

---

## 🎉 You're All Set!

Once you:
1. ✅ Add scopes in Google Cloud Console
2. ✅ Re-authenticate in your app
3. ✅ Have some fitness data in Google Fit

Your LifeLoop app will show **real, live fitness data** from Google Fit! 🚀

Need help? Check the console logs for detailed error messages.
