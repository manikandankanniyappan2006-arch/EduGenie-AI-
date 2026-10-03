import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>EduGenie AI</h1>
                {/* Add navigation links here */}
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} EduGenie AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;