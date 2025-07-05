'use client';
import { useState } from 'react';
import axios from 'axios';

export const Ex = () => {
  const [data, setData] = useState('');

  async function getdata() {
    try {
      const res = await axios.get('https://api.github.com/repos/DiceDB/dice/pulls/1771');
      setData(res.data.head.repo.language);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }

  return (
    <div className="p-4">
      <button onClick={getdata} className="rounded bg-blue-600 px-4 py-2 text-white">
        Get Data
      </button>

      {data && <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{data}</pre>}
    </div>
  );
};
