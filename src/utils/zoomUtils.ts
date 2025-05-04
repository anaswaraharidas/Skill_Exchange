
// Predefined Zoom meeting links for quicker testing and demos
export const DEMO_ZOOM_LINKS = [
  "https://zoom.us/j/93765482106?pwd=eWVhcmFyZ3BBMXF0aXJsUDc4VnVsQT09",
  "https://zoom.us/j/91234567890?pwd=aBcDeFgHiJkLmNoPqRsTuV",
  "https://zoom.us/j/98765432101?pwd=zYxWvUtsRqPoNmLkJ",
  "https://zoom.us/j/94567123890?pwd=Q1d2Z3N4a5B6c7D8e9F0",
  "https://zoom.us/j/99876543210?pwd=G1h2I3j4K5l6M7n8O9p0"
];

/**
 * Validates if a string matches the format of a Zoom meeting URL
 * @param link - The URL to validate
 * @returns boolean indicating if the link matches Zoom meeting format
 */
export const validateZoomLink = (link: string): boolean => {
  // This regex validates standard Zoom meeting URLs
  const zoomRegex = /^https:\/\/([\w.-]+\.)?zoom\.us\/j\/\d+(\?pwd=[\w]+)?$/;
  return zoomRegex.test(link);
};

/**
 * Generates a URL that looks like a Zoom meeting link
 * Note: In development mode, returns a demo link which is not an actual meeting
 * @returns A string formatted like a Zoom meeting URL
 */
export const generateZoomMeetingUrl = () => {
  // Use a randomly selected demo link for immediate testing
  if (import.meta.env.DEV) {
    return DEMO_ZOOM_LINKS[Math.floor(Math.random() * DEMO_ZOOM_LINKS.length)];
  }
  
  // Generate random meeting ID (10-11 digits)
  const meetingId = Math.floor(10000000000 + Math.random() * 90000000000);
  
  // Generate random password (6-10 alphanumeric characters)
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 6 + Math.floor(Math.random() * 5); i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return `https://zoom.us/j/${meetingId}?pwd=${password}`;
};
