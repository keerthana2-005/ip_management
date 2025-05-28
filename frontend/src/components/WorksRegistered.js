// WorksRegistered.js
import React from 'react';
import { BookOpen, User, Tag, Wallet } from 'lucide-react'; // Importing icons

// Dummy data for demonstration purposes
const dummyWorks = [
    {
        id: 1,
        title: "Digital Portrait Series: Echoes",
        username: "artistic_soul",
        domain: "Arts",
        metaAddress: "0xAbc123...Def456"
    },
    {
        id: 2,
        title: "Melody of the Cosmos",
        username: "music_maestro",
        domain: "Music",
        metaAddress: "0x789Ghi...Jkl012"
    },
    {
        id: 3,
        title: "Blockchain Art Explained",
        username: "crypto_writer",
        domain: "Education",
        metaAddress: "0xMno345...Pqr678"
    },
    {
        id: 4,
        title: "Sci-Fi Short: The Last Star",
        username: "storyteller_x",
        domain: "Literature",
        metaAddress: "0xStu901...Vwx234"
    },
];

const WorksRegistered = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.header}>
                <BookOpen size={24} style={styles.headerIcon} />
                Registered Works
            </h2>
            <div style={styles.worksList}>
                {dummyWorks.length > 0 ? (
                    dummyWorks.map(work => (
                        <div key={work.id} style={styles.workItem}>
                            <h3 style={styles.workTitle}>{work.title}</h3>
                            <p style={styles.workDetail}>
                                <User size={14} style={styles.detailIcon} />
                                <span style={styles.detailLabel}>User:</span> {work.username}
                            </p>
                            <p style={styles.workDetail}>
                                <Tag size={14} style={styles.detailIcon} />
                                <span style={styles.detailLabel}>Domain:</span> {work.domain}
                            </p>
                            <p style={styles.workDetail}>
                                <Wallet size={14} style={styles.detailIcon} />
                                <span style={styles.detailLabel}>Address:</span> {work.metaAddress}
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
        // ADJUST THIS: Use specific padding for top and bottom, or make it uniform
        paddingTop: '1.5rem', // Match or slightly adjust to UserDetails' top padding
        paddingBottom: '1.5rem',
        paddingLeft: '2rem', // Fixed typo here
        paddingRight: '2rem',
        backgroundColor: '#000',
        borderRadius: '1.25rem',
        boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.4)',
        border: '1px solid #374151',
        boxSizing: 'border-box',
        height: 'fit-content', // Allows its height to be determined by its content
        width: '900px', // Your desired increased width
        transition: 'all 0.3s ease',
        flexShrink: 0,
        marginLeft:'30rem',
        marginTop:'-8.7rem'
    },
    header: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#fff',
        marginTop: '0', // Ensure no extra top margin on the header itself
        marginBottom: '1.5rem', // This creates space below the header
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
    },
    headerIcon: {
        color: '#fff',
    },
    worksList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxHeight: '400px', // Adjust as needed to control internal scrolling
        overflowY: 'auto',
        paddingRight: '10px',
        // Ensure no top padding/margin here that would push content down
        marginTop: '0', // Ensure no extra top margin
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: '#2c2c2c',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#555',
            borderRadius: '10px',
            border: '2px solid #2c2c2c',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#777',
        },
    },
    workItem: {
        backgroundColor: '#1a1a1a',
        borderRadius: '0.75rem',
        padding: '1rem 1.2rem',
        border: '1px solid #374151',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
        }
    },
    workTitle: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '0.6rem',
        borderBottom: '1px solid #374151',
        paddingBottom: '0.5rem',
        lineHeight: '1.3',
    },
    workDetail: {
        fontSize: '0.85rem',
        color: '#d1d5db',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        marginBottom: '0.3rem',
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