export function timeAgo(publishedAt) {
  const publishedDate = new Date(publishedAt);

  // Adjust for Indian Standard Time (IST)
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  };

  // Get the current time in the specified IST timezone
  const now = new Date();
  const nowInIST = new Date(now.toLocaleString('en-US', options));

  const diffInSecs = Math.floor((nowInIST - publishedDate) / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays >= 1) {
    return 'A few days ago';
  } else if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMins >= 1) {
    return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
  } else if (diffInSecs >= 1) {
    return `${diffInSecs} second${diffInSecs > 1 ? 's' : ''} ago`;
  }

  return 'Just now';
}
