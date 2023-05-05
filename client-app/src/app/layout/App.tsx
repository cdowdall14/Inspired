import React from 'react';
import './styles.css';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';
import { Outlet, Route, useLocation } from 'react-router-dom';

function App() {
    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <Outlet />
            </Container>
        </>
    );
}

export default observer(App);
