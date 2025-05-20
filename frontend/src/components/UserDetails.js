import React, { useState, useEffect, useCallback } from 'react';
import { Wallet, Users, CheckCircle } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const UserDetails = () => {
    const [user, setUser] = useState({
        name: "",
        username: "",
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
                return; // Important: Exit the function on error
            }

            const responseData = await response.json(); // Parse the JSON response
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
                    //  Get username.
                    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                    const generatedUsername = storedUser.username || `user_${address.slice(0, 8)}`;

                    // Store the username and address in the database
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
                setErrorMessage("Metamask is not installed. Please install it to connect.");
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

        // Check for stored user on component mount.  This is important
        // for persistence across page reloads.
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                setUser(userObj);
            } catch (e) {
                console.error("Error parsing stored user:", e);
                localStorage.removeItem('user'); // Clear corrupted data.
            }
        }

        fetchInitialConnection();

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    // Function to handle login and set user data
    const handleLogin = useCallback((loginData) => {
        setUser({
            email: loginData.email,
            username: loginData.username,
            address: loginData.metaadress || null, // Use the metaadress from login
            isConnected: !!loginData.metaadress,
            bio: "Welcome to your blockchain profile", // Or fetch from backend
        });
        // Persist user data across reloads
        localStorage.setItem('user', JSON.stringify({
            email: loginData.email,
            username: loginData.username,
            address: loginData.metaadress,
            isConnected: !!loginData.metaadress
        }));

    }, []);

    useEffect(() => {
        // Simulate a successful login:
        const simulatedLoginData = {
            email: "test@example.com",
            username: "testuser",
            metaadress: "0x1234567890abcdef",  //  Simulated
        };

       // handleLogin(simulatedLoginData); //  Call  when your *actual* login occurs.
    }, [handleLogin]);


    return (
        <div style={{ ...styles.container, width: '100%' }}>
            <div style={styles.userSection}>
                <div style={styles.userAvatar}>
                    <Users style={{ ...styles.userIcon, color: '#fff' }} size={48} />
                </div>
                <div style={styles.userInfo}>
                    <h1 style={{ ...styles.userName, color: '#fff' }}>
                        {user?.username || "Guest"}
                    </h1>
                    <p style={{ ...styles.userBio, color: '#d1d5db' }}>
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
                    className={cn(
                        "w-auto",
                        "bg-gradient-to-r from-black to-black",
                        "text-white",
                        "px-4 py-2",
                        "rounded-md",
                        "shadow-lg",
                        "transition-all duration-200",
                        "font-semibold text-sm",
                        "hover:from-gray-800 hover:to-gray-800",
                        "hover:scale-103",
                        "hover:shadow-xl",
                        "active:scale-98",
                        "active:shadow-sm",
                        "flex items-center justify-center gap-2 border border-gray-700"
                    )}
                >
                    <Wallet className="w-4 h-4 text-white" />
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
        padding: '2.5rem',
        backgroundColor: '#000',
        borderRadius: '1.25rem',
        boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.4)',
        width: '100%',
        margin: '0 auto',
        transition: 'all 0.3s ease',
        border: '1px solid #374151',
        boxSizing: 'border-box'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        marginBottom: '2.5rem',
        width: '100%',
        textAlign: 'left',
        flexDirection: 'column',
        boxSizing: 'border-box',
    },
    userAvatar: {
        width: '7rem',
        height: '7rem',
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
        width: '3.5rem',
        height: '3.5rem',
        filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4))'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.75rem',
        width: '100%',
        boxSizing: 'border-box',
    },
    userName: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '0.5rem',
        textShadow: '2px 3px 5px rgba(0, 0, 0, 0.8)',
        letterSpacing: '-0.02em'
    },
    userBio: {
        fontSize: '1.1rem',
        color: '#d1d5db',
        opacity: 0.9,
        marginBottom: '1.25rem',
        lineHeight: '1.7',
    },
    addressDisplay: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem',
        borderRadius: '0.75rem',
        width: 'fit-content',
        backgroundColor: '#374151',
        border: '1px solid #4a5568',
    },
    walletAddress: {
        fontSize: '0.95rem',
        color: '#fff',
        wordBreak: 'break-all',
        opacity: 0.8,
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        padding: '0.375rem',
        borderRadius: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid #4a5568',
    },
    walletLabel: {
        fontSize: '0.95rem',
        color: '#9ca3af',
        marginRight: '0.375rem',
        fontWeight: 'medium'
    },
    checkCircle: {
        color: '#fff',
        width: '1.25rem',
        height: '1.25rem',
        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))'
    },
    errorMessage: {
        color: '#ff4d4f',
        marginTop: '1rem',
        fontSize: '0.9rem',
    }
};

export default UserDetails;
