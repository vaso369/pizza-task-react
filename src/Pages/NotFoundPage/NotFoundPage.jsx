import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div style={{width:'100%', height: '90%'}} className="d-flex justify-content-center align-items-center">
        404 - <Link to="/" className="btn bg-dark text-white">Go home</Link>
    </div>
);

export default NotFoundPage;
