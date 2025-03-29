import React, { useMemo, useCallback } from "react";
import "./Calculator.css";

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const calculatePrimes = (limit) => {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
};

const PrimeCalculator = ({ limit }) => {
  const primeNumbers = useMemo(() => calculatePrimes(limit), [limit]);

  const renderPrime = useCallback((num) => {
    return (
      <span key={num} className="prime-number">
        {num}
      </span>
    );
  }, []);

  return (
    <div className="prime-container">
      <h3>Prime Numbers up to {limit}:</h3>
      <div className="prime-list">{primeNumbers.map(renderPrime)}</div>
    </div>
  );
};

export default React.memo(PrimeCalculator);
