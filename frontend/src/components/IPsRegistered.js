// components/profile/IPsRegistered.jsx
import ProfileCard from './ProfileCard';

const IPsRegistered = ({ ips }) => {
  return (
    <ProfileCard title="Registered IPs" description="Your registered intellectual properties">
      <ul className="list-disc ml-6 space-y-1">
        {ips.map((ip, index) => (
          <li key={index}>{ip}</li>
        ))}
      </ul>
    </ProfileCard>
  );
};

export default IPsRegistered;
