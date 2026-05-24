// admin-data.jsx — sample data for FlatNest admin (Dhaka market)

const ADM_AREAS = ['Banani', 'Gulshan', 'Dhanmondi', 'Mohakhali DOHS', 'Bashundhara R/A', 'Mirpur 10', 'Uttara', 'Mohammadpur', 'Middle Badda', 'Noakhali', 'Chhatarpaia'];

const ADM_LISTINGS = [
  { id: 'L-1029', title: 'Sunlit 2BR in Banani', owner: 'Tahmid R.', area: 'Banani', type: 'Family Flat', price: 28000, beds: 2, status: 'Active', views: 142, photo: '#FFD9A8', created: '2 days ago' },
  { id: 'L-1028', title: 'দুষ্টু পোলাপাইনদের আড্ডা খানা', owner: 'SAIF', area: 'Chhatarpaia', type: 'Bachelor Room', price: 30000, beds: 2, status: 'Rejected', views: 0, photo: '#C4B5A0', created: '2 days ago', reason: 'Title violates community guidelines' },
  { id: 'L-1027', title: 'Banani Heights Family Flat', owner: 'Anik Roy', area: 'Banani', type: 'Family Flat', price: 23000, beds: 3, status: 'Pending', views: 0, photo: '#B8D4C8', created: '3 days ago' },
  { id: 'L-1026', title: 'Ulon Bachelor Mess', owner: 'Anik Roy', area: 'Middle Badda', type: 'Bachelor Room', price: 13000, beds: 2, status: 'Active', views: 88, photo: '#A8C4D6', created: '4 days ago' },
  { id: 'L-1025', title: 'Dolonchapa Couple Flat', owner: 'Mahmuda Dolon', area: 'Bashundhara R/A', type: 'Couple Flat', price: 40000, beds: 4, status: 'Active', views: 211, photo: '#D4C3B7', created: '5 days ago' },
  { id: 'L-1024', title: 'Sublet near Middle Badda', owner: 'Muhtasim Mahmud', area: 'Middle Badda', type: 'Sublet Room', price: 25000, beds: 2, status: 'Active', views: 67, photo: '#C9D8B7', created: '5 days ago' },
  { id: 'L-1023', title: 'Antor Billah in Maijdee', owner: 'Antor Islam', area: 'Noakhali', type: 'Family Flat', price: 12000, beds: 3, status: 'Active', views: 41, photo: '#E8C9A0', created: '6 days ago' },
  { id: 'L-1022', title: 'লিটনের ফ্ল্যাট না, ভালো ফ্ল্যাট', owner: 'Muhtasim Mahmud', area: 'Middle Badda', type: 'Couple Flat', price: 20000, beds: 2, status: 'Pending', views: 0, photo: '#B4C8D8', created: '1 week ago' },
  { id: 'L-1021', title: 'Single room for bachelor', owner: 'Muhtasim Mahmud', area: 'Middle Badda', type: 'Bachelor Room', price: 5000, beds: 2, status: 'Active', views: 23, photo: '#D8C0A8', created: '1 week ago' },
  { id: 'L-1020', title: 'Test One 🥲', owner: 'Md. Fazle Rabbi', area: 'Bashundhara R/A', type: 'Bachelor Room', price: 35000, beds: 2, status: 'Active', views: 102, photo: '#A0BCD0', created: '1 week ago' },
  { id: 'L-1019', title: 'Quiet Family Flat in Dhanmondi 27', owner: 'Rafiq Ahmed', area: 'Dhanmondi', type: 'Family Flat', price: 42000, beds: 3, status: 'Pending', views: 0, photo: '#B8D4C8', created: '1 week ago' },
];

const ADM_USERS = [
  { id: 'U-15', name: 'SAIF', email: 'rayhan.saifsiddique@gmail.com', phone: '—', role: 'owner', verified: true, listings: 1, lastActive: '2h ago', joined: 'May 2025' },
  { id: 'U-14', name: 'Anik Roy', email: 'rudroaiubcse@gmail.com', phone: '01515 670 516', role: 'renter', verified: true, listings: 0, lastActive: '4h ago', joined: 'Apr 2025' },
  { id: 'U-13', name: 'Saif Siddique Rayhan', email: 'saif.rafi07@gmail.com', phone: '—', role: 'renter', verified: true, listings: 0, lastActive: '1d ago', joined: 'Apr 2025' },
  { id: 'U-12', name: 'Anik Roy', email: 'rudroaiub@gmail.com', phone: '01515 670 517', role: 'owner', verified: true, listings: 2, lastActive: '1d ago', joined: 'Mar 2025' },
  { id: 'U-11', name: 'Tamanna Dolon', email: 'mtdolon@gmail.com', phone: '01845 550 068', role: 'renter', verified: true, listings: 0, lastActive: '2d ago', joined: 'Mar 2025' },
  { id: 'U-10', name: 'Mahmuda Dolon', email: 'doloncoc@gmail.com', phone: '01845 550 067', role: 'owner', verified: true, listings: 1, lastActive: '3d ago', joined: 'Mar 2025' },
  { id: 'U-09', name: 'Muhtasim Mahmud', email: 'muhtasim.mahmud788@gmail.com', phone: '—', role: 'renter', verified: false, listings: 0, lastActive: '5d ago', joined: 'Feb 2025' },
  { id: 'U-08', name: 'Antor Islam', email: 'mdrubitulislam@gmail.com', phone: '01876 664 076', role: 'owner', verified: true, listings: 1, lastActive: '6d ago', joined: 'Feb 2025' },
  { id: 'U-07', name: 'Muhtasim Mahmud', email: 'muhtasim.mzs16@gmail.com', phone: '—', role: 'owner', verified: false, listings: 3, lastActive: '1w ago', joined: 'Feb 2025' },
  { id: 'U-06', name: 'abrar sazzad', email: 'abrar.qeg@gmail.com', phone: '—', role: 'renter', verified: true, listings: 0, lastActive: '1w ago', joined: 'Jan 2025' },
  { id: 'U-05', name: 'Tahmid R.', email: 'tahmid.r@gmail.com', phone: '01711 234 567', role: 'owner', verified: true, listings: 4, lastActive: '2w ago', joined: 'Jan 2025' },
  { id: 'U-04', name: 'Rafiq Ahmed', email: 'rafiq.a@gmail.com', phone: '01911 234 567', role: 'owner', verified: true, listings: 2, lastActive: '2w ago', joined: 'Dec 2024' },
];

const ADM_ACTIVITY = [
  { id: 'a1', kind: 'listing.new', actor: 'Tahmid R.', target: 'Sunlit 2BR in Banani', time: '12 min ago' },
  { id: 'a2', kind: 'listing.reject', actor: 'You', target: 'দুষ্টু পোলাপাইনদের আড্ডা খানা', time: '1h ago' },
  { id: 'a3', kind: 'user.verify', actor: 'Anik Roy', target: 'NID verified', time: '2h ago' },
  { id: 'a4', kind: 'listing.approve', actor: 'You', target: 'Ulon Bachelor Mess', time: '4h ago' },
  { id: 'a5', kind: 'listing.flag', actor: 'Renter report', target: 'Test One 🥲 — fake photos', time: '6h ago' },
  { id: 'a6', kind: 'user.new', actor: 'abrar sazzad', target: 'signed up as renter', time: '8h ago' },
  { id: 'a7', kind: 'chat.report', actor: 'Renter report', target: 'Owner asked for advance via bKash', time: '1d ago' },
  { id: 'a8', kind: 'listing.new', actor: 'Rafiq Ahmed', target: 'Quiet Family Flat in Dhanmondi 27', time: '1d ago' },
];

// 14-day rolling counts (newest last)
const ADM_TREND_LISTINGS = [2, 3, 1, 4, 2, 3, 5, 4, 2, 6, 5, 7, 4, 5];
const ADM_TREND_USERS    = [1, 2, 2, 1, 3, 2, 4, 3, 2, 3, 4, 3, 5, 4];
const ADM_TREND_CHATS    = [0, 1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7];
const ADM_TREND_REVENUE  = [12, 8, 14, 10, 16, 12, 18, 14, 20, 16, 22, 18, 24, 20]; // in thousands BDT (commission)

// Listings by area for the dashboard chart
const ADM_AREA_BREAKDOWN = [
  { area: 'Middle Badda',     count: 4 },
  { area: 'Bashundhara R/A',  count: 2 },
  { area: 'Banani',           count: 2 },
  { area: 'Dhanmondi',        count: 1 },
  { area: 'Noakhali',         count: 1 },
  { area: 'Chhatarpaia',      count: 1 },
];

// Listings by type
const ADM_TYPE_BREAKDOWN = [
  { type: 'Bachelor Room', count: 4, color: '#46A7AE' },
  { type: 'Family Flat',   count: 4, color: '#FF8585' },
  { type: 'Couple Flat',   count: 2, color: '#F2C14E' },
  { type: 'Sublet Room',   count: 1, color: '#8B7CF6' },
];

const ADM_REPORTS = [
  { id: 'R-23', listing: 'Test One 🥲', reporter: 'rayhan.saifsiddique@gmail.com', reason: 'Photos appear fake / stock images', time: '6h ago', severity: 'medium' },
  { id: 'R-22', listing: 'লিটনের ফ্ল্যাট না, ভালো ফ্ল্যাট', reporter: 'abrar.qeg@gmail.com', reason: 'Owner asked for advance over bKash before showing', time: '1d ago', severity: 'high' },
  { id: 'R-21', listing: 'Single room for bachelor', reporter: 'mtdolon@gmail.com', reason: 'Price ৳5,000 looks like a typo', time: '2d ago', severity: 'low' },
];

Object.assign(window, {
  ADM_AREAS, ADM_LISTINGS, ADM_USERS, ADM_ACTIVITY,
  ADM_TREND_LISTINGS, ADM_TREND_USERS, ADM_TREND_CHATS, ADM_TREND_REVENUE,
  ADM_AREA_BREAKDOWN, ADM_TYPE_BREAKDOWN, ADM_REPORTS,
});
