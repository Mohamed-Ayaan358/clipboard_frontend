import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function Loader() {
    return (
        <div class="spinner-grow" style={{ color: "#e42346", width: "3rem", height: "3rem" }} role="status">
            <span class="sr-only"></span>
        </div>
    );
}

function Loading() {
    return (
        <>
            <div style={{ textAlign: "center", padding: "20% 0" }}>
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
            </div>
        </>
    );
}

export default Loading;
