function App() {
  const [balance, setBalance] = useState(0);
  const [cooldownMinutes, setCooldownMinutes] = useState(0);
  const [milestoneReached, setMilestoneReached] = useState('None yet');
  const [erisBalance, setErisBalance] = useState(0); // Placeholder for now

  useEffect(() => {
    const fetchData = async () => {
      // your existing fetch code
    };
    fetchData();
  }, []);

  // This is mandatory to use the setter and fix the ESLint error
  useEffect(() => {
    setErisBalance(0);
  }, []);

  return (
    // your JSX here
  );
}
