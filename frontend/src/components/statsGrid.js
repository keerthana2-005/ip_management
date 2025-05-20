// components/profile/StatsGrid.jsx
import IPsRegistered from './IPsRegistered';
import IPsTransferred from './IPsTransferred';

const StatsGrid = ({ registeredIPs, transferredIPs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <IPsRegistered ips={registeredIPs} />
      <IPsTransferred ips={transferredIPs} />
    </div>
  );
};

export default StatsGrid;
