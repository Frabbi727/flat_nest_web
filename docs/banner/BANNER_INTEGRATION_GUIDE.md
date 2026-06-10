# Banner Integration Guide (Mobile & Web)

This guide explains how to fetch, display, and handle the dismissal (hiding) of promotional banners in the FlatNest mobile and web applications.

---

## 1. API Endpoint

**Endpoint:** `GET /api/v1/banners/active`  
**Authentication:** None (Public)

### Sample Response
```json
{
    "success": true,
    "data": {
        "id": 5,
        "title": "Summer Special Offer",
        "description": "Get 20% off on all luxury apartments this July!",
        "is_active": true,
        "images": [
            {
                "id": 10,
                "banner_id": 5,
                "image_url": "https://api.flatnest.com/storage/banners/64a1b2c3d4e5f.webp",
                "target_url": "https://flatnest.com/promotions/summer-sale",
                "order": 1,
                "is_active": true
            },
            {
                "id": 11,
                "banner_id": 5,
                "image_url": "https://api.flatnest.com/storage/banners/64a1b2c3d4e6g.webp",
                "target_url": null,
                "order": 2,
                "is_active": true
            }
        ]
    },
    "message": null,
    "errors": null
}
```

---

## 2. Frontend Implementation Logic

To ensure a great user experience, follow this logical flow when the app starts:

### Step 1: Fetch Data
Call the `GET /api/v1/banners/active` endpoint.

### Step 2: Check Dismissal State (The "Hide" Logic)
Before showing the banner, check your device's local storage (e.g., `SharedPreferences` on Android, `UserDefaults` on iOS, or `localStorage` on Web).

1.  **Retrieve** the value of a key named `last_dismissed_banner_id`.
2.  **Compare** the `id` from the API response with the `last_dismissed_banner_id` from local storage.
    *   **If they match:** Do NOT show the banner. The user has already clicked "X" on this specific campaign.
    *   **If they do NOT match:** Show the banner. (This handles the case where the admin launches a NEW banner with a new ID).

### Step 3: Handle the "X" (Close) Button
When the user clicks the "X" button on the banner:
1.  **Hide** the banner UI immediately.
2.  **Save** the current banner's `id` into local storage under the key `last_dismissed_banner_id`.

---

## 3. Code Examples

### Mobile (Pseudo-code / Dart / Kotlin)
```dart
// 1. Fetch from API
var response = await api.getActiveBanner();
int apiBannerId = response.data.id;

// 2. Check local storage
int dismissedId = await storage.read('last_dismissed_banner_id');

if (apiBannerId != dismissedId) {
    showBannerUI(response.data);
}

// 3. When 'X' is clicked
onClose() {
    storage.write('last_dismissed_banner_id', apiBannerId);
    hideBannerUI();
}
```

### Web (JavaScript)
```javascript
// 1. Fetch
const response = await fetch('/api/v1/banners/active');
const { data } = await response.json();

// 2. Check
const dismissedId = localStorage.getItem('last_dismissed_banner_id');

if (data && data.id.toString() !== dismissedId) {
    renderBanner(data);
}

// 3. Close
function handleClose(id) {
    localStorage.setItem('last_dismissed_banner_id', id);
    document.getElementById('banner-container').style.display = 'none';
}
```

---

## 4. Key Benefits of this Approach
*   **Guest Support:** Works perfectly for users who haven't logged in yet.
*   **Seamless Login:** If a guest hides the banner and then logs in, the banner *stays hidden* because local storage is tied to the device.
*   **No Server Load:** No extra API calls are needed to "remember" the hide state.
*   **Admin Control:** When the Admin wants everyone to see a new message, they simply create a new Banner in the admin panel. The new ID will bypass the old local storage setting.

---

## 5. Image Carousel Requirements
*   **Max Images:** 5
*   **Dimensions:** Recommended 16:9 aspect ratio.
*   **Compression:** The backend already ensures all images are **WebP** and **< 200KB** for fast loading.


Here are the field types and validation rules for all the Banner-related APIs I've implemented:

  1. Banner Campaign (Main Record)

  ┌─────────────┬─────────┬──────────┬─────────────────────────────────────────────────────────────────┐
  │ Field       │ Type    │ Required │ Description                                                     │
  ├─────────────┼─────────┼──────────┼─────────────────────────────────────────────────────────────────┤
  │ title       │ String  │ Yes      │ Max 255 characters. The name of the campaign.                   │
  │ description │ String  │ No       │ Marketing text/details about the banner.                        │
  │ is_active   │ Boolean │ No       │ Set to true to show on app. (Only one can be active at a time). │
  └─────────────┴─────────┴──────────┴─────────────────────────────────────────────────────────────────┘

  Endpoints:
   * POST /api/v1/admin/banners (Create)
   * PATCH /api/v1/admin/banners/{id} (Update)

  ---

  2. Banner Images (Carousel Items)

  ┌────────────┬─────────┬──────────┬───────────────────────────────────────────────────────────────────────────────────────────┐
  │ Field      │ Type    │ Required │ Description                                                                               │
  ├────────────┼─────────┼──────────┼───────────────────────────────────────────────────────────────────────────────────────────┤
  │ image      │ File    │ Yes      │ Must be an image file (png, jpg, webp). Max 10MB raw. Backend compresses this to < 200KB. │
  │ target_url │ URL     │ No       │ A full link (e.g. https://...) that opens when the image is clicked.                      │
  │ order      │ Integer │ No       │ Used for sorting in the carousel (e.g. 0, 1, 2).                                          │
  │ is_active  │ Boolean │ No       │ Used to hide a specific image without deleting it.                                        │
  └────────────┴─────────┴──────────┴───────────────────────────────────────────────────────────────────────────────────────────┘

  Endpoints:
   * POST /api/v1/admin/banners/{id}/images (Upload)
   * PATCH /api/v1/admin/banners/images/{imageId} (Edit details)

  ---

  3. Public API Response (What the App receives)

  The GET /api/v1/banners/active endpoint returns an object with these types:

   * id: Integer
   * title: String
   * description: String (Nullable)
   * is_active: Boolean
   * images: Array of:
       * id: Integer
       * image_url: String (Full absolute URL to the image)
  Note on Boolean fields:
  When using Postman or FormData, remember that true/false might need to be sent as 1 or 0 depending on how your frontend library handles boolean
  serialization. The backend accepts both true/false and 1/0.