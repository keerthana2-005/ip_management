// components/profile/IPsTransferred.jsx
import ProfileCard from './ProfileCard';

const IPsTransferred = ({ ips }) => {
  return (
    <ProfileCard title="Transferred IPs" description="IP ownerships you've transferred">
      <ul className="list-disc ml-6 space-y-1">
        {ips.map((ip, index) => (
          <li key={index}>{ip}</li>
        ))}
      </ul>
    </ProfileCard>
  );
};

export default IPsTransferred;
