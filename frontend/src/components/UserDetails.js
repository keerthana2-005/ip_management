import React, { useState, useEffect, useCallback } from 'react';
import { Wallet, Users, CheckCircle } from 'lucide-react';

const UserDetails = ({ initialUsername = "kee" }) => {
    const [user, setUser] = useState({
        name: "",
        username: initialUsername,
        isConnected: false,
        address: null,
        bio: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const storeUserData = useCallback(async (username, address) => {
        try {
            const response = await fetch('/api/store-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, metaadress: address }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to store user data:', errorData);
                setErrorMessage('Failed to save profile. Please try again.');
                return;
            }

            const responseData = await response.json();
            console.log('User data stored successfully:', responseData);

            if (responseData.message === "Metamask address already associated with this user.") {
                setUser(prevUser => ({ ...prevUser, address: responseData.metaadress, isConnected: true }));
            }

        } catch (error) {
            console.error('Error storing user data:', error);
            setErrorMessage('An unexpected error occurred while saving.');
        }
    }, []);

    const handleConnectWallet = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const address = accounts[0];
                if (address) {
                    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                    const generatedUsername = storedUser.username || `user_${address.slice(0, 8)}`;

                    await storeUserData(generatedUsername, address);

                    const updatedUser = {
                        username: generatedUsername,
                        isConnected: true,
                        address: address,
                        bio: storedUser?.bio || "Welcome to your blockchain profile"
                    };
                    setUser(updatedUser);
                    localStorage.setItem("walletAddress", address);
                    localStorage.setItem("user", JSON.stringify(updatedUser));

                } else {
                    setErrorMessage("No accounts found in Metamask.");
                }
            } else {
                setErrorMessage("MetaMask is not installed. Please install it to connect.");
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            if (error.code === 4001) {
                setErrorMessage("User rejected the connection request.");
            } else {
                setErrorMessage("An error occurred while connecting. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [storeUserData]);

    useEffect(() => {
        const fetchInitialConnection = async () => {
            if (window.ethereum) {
                window.ethereum.on('accountsChanged', (accounts) => {
                    if (accounts.length > 0) {
                        const newAddress = accounts[0];
                        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                        const updatedUser = { ...storedUser, address: newAddress, isConnected: true };
                        setUser(updatedUser);
                        localStorage.setItem("walletAddress", newAddress);
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                    } else {
                        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                        const updatedUser = { ...storedUser, address: null, isConnected: false };
                        setUser(updatedUser);
                        localStorage.removeItem("walletAddress");
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                    }
                });
            }
        };

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                setUser(userObj);
            } catch (e) {
                console.error("Error parsing stored user:", e);
                localStorage.removeItem('user');
            }
        } else {
            setUser(prev => ({...prev, username: initialUsername}));
        }

        fetchInitialConnection();

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, [initialUsername]);

    return (
        <div style={styles.container}>
            <div style={styles.userSection}>
                <div style={styles.userAvatar}>
                    <Users style={styles.userIcon} size={48} />
                </div>
                <div style={styles.userInfo}>
                    <h1 style={styles.userName}>
                        {user?.username || "Guest"}
                    </h1>
                    <p style={styles.userBio}>
                        {user?.bio || "Welcome to your blockchain profile"}
                    </p>

                    {user.isConnected && user.address && (
                        <div style={styles.addressDisplay}>
                            <span style={styles.walletLabel}>Wallet:</span>
                            <span style={styles.walletAddress}>{user.address}</span>
                            <CheckCircle style={styles.checkCircle} />
                        </div>
                    )}
                </div>
            </div>

            {!user.isConnected && (
                <button
                    onClick={handleConnectWallet}
                    disabled={isLoading}
                    style={styles.connectButton}
                >
                    <Wallet style={styles.buttonIcon} />
                    {isLoading ? "Connecting..." : "Connect Metamask"}
                </button>
            )}

            {errorMessage && (
                <p style={styles.errorMessage}>{errorMessage}</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 3rem',
        backgroundColor: '#000',
        borderRadius: '1.25rem',
        boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.4)',
        maxWidth: '1000px',
        transition: 'all 0.3s ease',
        border: '1px solid #374151',
        boxSizing: 'border-box',
        height: 'fit-content',
        position: 'absolute',
        top: '100px', // **ADJUST THIS VALUE TO MOVE IT UP/DOWN**
        left: '1.4cm',
        right: 'auto',
    },
    userSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        width: '100%',
        textAlign: 'center',
        boxSizing: 'border-box',
    },
    userAvatar: {
        width: '5.5rem',
        height: '5.5rem',
        borderRadius: '9999px',
        backgroundColor: '#242424',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
        border: '3px solid #4a5568',
        transition: 'all 0.2s ease',
    },
    userIcon: {
        color: '#fff',
        width: '2.75rem',
        height: '2.75rem',
        filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4))'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        width: '100%',
        boxSizing: 'border-box',
    },
    userName: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '0.1rem',
        textShadow: '2px 3px 5px rgba(0, 0, 0, 0.8)',
        letterSpacing: '-0.02em',
        lineHeight: '1.2'
    },
    userBio: {
        fontSize: '0.9rem',
        color: '#d1d5db',
        opacity: 0.9,
        marginBottom: '0.8rem',
        lineHeight: '1.4',
    },
    addressDisplay: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.3rem 0.7rem',
        borderRadius: '0.75rem',
        width: 'fit-content',
        backgroundColor: '#374151',
        border: '1px solid #4a5568',
        marginTop: '0.3rem',
    },
    walletAddress: {
        fontSize: '0.8rem',
        color: '#fff',
        wordBreak: 'break-all',
        opacity: 0.8,
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        padding: '0.2rem 0.4rem',
        borderRadius: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid #4a5568',
    },
    walletLabel: {
        fontSize: '0.8rem',
        color: '#9ca3af',
        marginRight: '0.2rem',
        fontWeight: 'medium'
    },
    checkCircle: {
        color: '#fff',
        width: '0.9rem',
        height: '0.9rem',
        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))'
    },
    connectButton: {
        backgroundColor: '#000',
        color: 'white',
        padding: '0.6rem 1.2rem',
        borderRadius: '0.375rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.2s ease-in-out',
        fontWeight: '600',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        border: '1px solid #374151',
        cursor: 'pointer',
    },
    buttonIcon: {
        width: '0.9rem',
        height: '0.9rem',
        color: '#fff',
    },
    errorMessage: {
        color: '#ff4d4f',
        marginTop: '0.8rem',
        fontSize: '0.85rem',
        textAlign: 'center',
    }
};

export default UserDetails;