import React, { useRef, useState, useEffect } from "react";

function Clock(props) {
    const [timeString, setTimeString] = useState(null);
    const intervalRef = useRef(null);
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const now = new Date();
            const hours = `0${now.getHours()}`.slice(-2);
            const minutes = `0${now.getMinutes()}`.slice(-2);
            const seconds = `0${now.getSeconds()}`.slice(-2);
            const currentTimeString = `${hours}:${minutes}:${seconds}`;
            setTimeString(currentTimeString);
        }, 1000);
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);
    return (
        <div style={{
            fontSize: '48px', 
            textAlign: 'center',
            marginTop: '32px',
            marginLeft: '600px',
            border: 'solid blue',
            maxWidth: '25%',
            justifyContent: 'center'
        }}>{timeString}</div>
    );
}

export default Clock;