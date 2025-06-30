import React, { useEffect, useState } from 'react';
import { JsonRpcProvider, Contract } from 'ethers';
import { BookOpen, User, Tag, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/qsA0uUqVTfJNXlFLQ87mEkPdbD187nUt");

const contractAddress = "0xc045aC1922c33F57d99ecF84ED4133baE66b73c8";
const contractABI = [
  {
    "inputs": [],
    "name": "getAllWorks",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "metadataCID", "type": "string" },
          { "internalType": "address", "name": "uploader", "type": "address" },
          { "internalType": "string", "name": "username", "type": "string" }
        ],
        "internalType": "struct WorkRegistry.Work[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const WorksRegistered = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorks = async () => {
    try {
      const contract = new Contract(contractAddress, contractABI, provider);
      const data = await contract.getAllWorks();
      setWorks(data);
    } catch (err) {
      console.error("Error fetching works:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        <BookOpen size={24} style={styles.headerIcon} />
        <Link to="/home" style={{ color: '#fff', textDecoration: 'none' }}>
          Registered Works
        </Link>
      </h2>
      <div style={styles.worksList}>
        {loading ? (
          <p style={styles.noWorksMessage}>Loading...</p>
        ) : works.length > 0 ? (
          works.map((work, index) => (
            <div key={index} style={styles.workItem}>
              <h3 style={styles.workTitle}>Metadata CID: {work.metadataCID}</h3>
              <p style={styles.workDetail}>
                <User size={14} style={styles.detailIcon} />
                <span style={styles.detailLabel}>User:</span> {work.username}
              </p>
              <p style={styles.workDetail}>
                <Wallet size={14} style={styles.detailIcon} />
                <span style={styles.detailLabel}>Address:</span> {work.uploader}
              </p>
              <p style={styles.workDetail}>
                <Tag size={14} style={styles.detailIcon} />
                <span style={styles.detailLabel}>CID Link:</span>{" "}
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${work.metadataCID}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#60A5FA", wordBreak: "break-word" }}
                >
                  View Metadata
                </a>
              </p>
            </div>
          ))
        ) : (
          <p style={styles.noWorksMessage}>No works registered yet.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '1.3rem',
    paddingBottom: '1.5rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    backgroundColor: '#000',
    borderRadius: '1.25rem',
    boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.4)',
    border: '1px solid #374151',
    boxSizing: 'border-box',
    height: 'fit-content',
    width: '900px',
    transition: 'all 0.3s ease',
    flexShrink: 0,
    marginLeft: '30rem',
    marginTop: '-8.7rem'
  },
  header: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '0',
    marginBottom: '1.5rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
  },
  headerIcon: {
    color: '#fff',
  },
  worksList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '10px',
    marginTop: '0',
  },
  workItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: '0.75rem',
    padding: '1rem 1.2rem',
    border: '1px solid #374151',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
    maxWidth: '100%',
  },
  workTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '0.6rem',
    borderBottom: '1px solid #374151',
    paddingBottom: '0.5rem',
    lineHeight: '1.3',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
  workDetail: {
    fontSize: '0.85rem',
    color: '#d1d5db',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginBottom: '0.3rem',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
    flexWrap: 'wrap',
  },
  detailIcon: {
    color: '#9ca3af',
  },
  detailLabel: {
    fontWeight: '500',
    color: '#9ca3af',
  },
  noWorksMessage: {
    color: '#d1d5db',
    textAlign: 'center',
    fontSize: '1rem',
    gridColumn: '1 / -1',
  }
};

export default WorksRegistered;
