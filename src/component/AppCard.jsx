import React from "react";

const AppCard = React.memo(({ politici }) => {
    console.log(politici.name, Date.now());
    
    return (
        <div className="card">
            <div className="card-body">
                <img src={politici.image} alt={politici.name} className="card-img-top"/>
                <h3 className="card-title">Nome: {politici.name}</h3>
                <h5 className="card-title">Posizione: {politici.position}</h5>
                <p className="card-text">{politici.biography}</p>
            </div>
        </div>
    );
});

export default AppCard;