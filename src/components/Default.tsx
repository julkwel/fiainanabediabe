import React from 'react';
import './fiainana.css';

interface ContainerProps {
    name: string;
}

const Default: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <p>FIAINANA BE DIA BE</p>
        </div>
    );
};

export default Default;
