// pages/index.tsx
import Weather from './Waether';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <Weather />
    </div>
  );
};

export default Home;
