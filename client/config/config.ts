import os from 'os';

function getLocalIP() {
  const netInterface = os.networkInterfaces();
  const IP = Object.values(netInterface).flat(1)[1]?.address as string;
  return IP;
}

export const localIP = getLocalIP();
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
