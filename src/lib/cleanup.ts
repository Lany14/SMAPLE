// export async function initializeCleanup() {
//   const cleanup = async () => {
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
//         (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

//       const response = await fetch(`${baseUrl}/api/cron/cleanup`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         console.error('Cleanup failed:', await response.text());
//         return;
//       }

//       const data = await response.json();
//       console.log('Cleanup completed:', data);
//     } catch (error) {
//       console.error('Cleanup error:', error);
//     }
//   };

//   // Run cleanup with delay and error handling
//   setTimeout(() => {
//     cleanup().catch(console.error);
//   }, 5000);

//   // Schedule subsequent cleanups
//   setInterval(() => {
//     cleanup().catch(console.error);
//   }, 24 * 60 * 60 * 1000);
// }
