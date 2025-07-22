import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const userId = 806916617; // Replace with dynamic user ID logic if needed

const MILESTONES = [
  { name: 'Sun', cost: 1 },
  { name: 'Jupiter', cost: 4 },
  { name: 'Saturn', cost: 8 },
  { name: 'Uranus', cost: 17 },
  { name: 'Neptune', cost: 29 },
  { name: 'Pluto', cost: 29 },
  { name: 'Haumea', cost: 35 },
  { name: 'Makemake', cost: 38 }
];

function App() {
  const [balance, setBalance] = useState(0);
  const [cooldownMinutes, setCooldownMinutes] = useState(0);
  const [milestoneReached, setMilestoneReached] = useState('None yet');
  const [erisBalance, setErisBalance] = useState(0); // Placeholder for now

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceRes = await axios.get(`http://localhost:3000/balance/${userId}`);
        const balance = balanceRes.data.balance;
        setBalance(balance);

        const cooldownRes = await axios.get(`http://localhost:3000/cooldown/${userId}`);
        const lastSpin = cooldownRes.data.lastSpin || 0;
        const now = Date.now();
        const minutesLeft = 60 - Math.floor((now - lastSpin) / 1000 / 60);
        setCooldownMinutes(minutesLeft > 0 ? minutesLeft : 0);

        let latestMilestone = 'None yet';
        for (const m of MILESTONES) {
          if (balance >= m.cost) latestMilestone = m.name;
        }
        setMilestoneReached(latestMilestone);
      } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
      }
    };

    fetchData();
  }, []);

  // Prevent ESLint error: use setErisBalance until real ERIS logic added
  useEffect(() => {
    setErisBalance(0);
  }, []);

  return (
    <div className="App">
      <h1>🌌 Celestial Dice Dashboard</h1>

      <p><strong>🪙 Your gravicap balance:</strong> {balance}</p>
      <p><strong>⏳ Cooldown:</strong> Next dice available in {cooldownMinutes} minutes</p>
      <p><strong>📡 Milestone reached:</strong> {milestoneReached !== 'None yet' ? `${milestoneReached}!` : milestoneReached}</p>

      <h2>🪐 Milestones</h2>
      <ul>
        {MILESTONES.map((m) => (
          <li key={m.name}>
            {m.name} - {m.cost} gravicaps {balance >= m.cost ? '✅' : '❌'}
          </li>
        ))}
      </ul>

      <p>🌟 After reaching Makemake, you’ll be eligible to mint real ERIS tokens directly to your MetaMask wallet. No team allocations. This is a truly decentralized token — the entire supply is minted only by users who reach the Makemake milestone.</p>

      <p><strong>💎 Your ERIS token balance:</strong> {erisBalance} ERIS</p>
    </div>
  );
}

export default A
