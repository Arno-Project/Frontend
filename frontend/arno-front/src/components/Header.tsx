import { Button, Badge } from '@mantine/core';
import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="content-desktop">
                <div>
                    <Badge size="lg" radius={10} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>A simple Mantine template</Badge>
                </div>
                <div>
                    <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={() => redirectToLink('https://mantine.dev/')}>Check out Mantine</Button>
                </div>
            </div>
        </header>
    );
};

export default Header;

const redirectToLink = (link: string): void => {
    window.open(link, '_blank');
};