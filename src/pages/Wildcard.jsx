import { useEffect, useState } from "react";

import Error from "../components/Error";
import config from "../config";

function Wildcard() {
    const [timer, setTimer] = useState(10);

    document.title = "404 - Page not found - " + config.SITENAME;

    useEffect(() => {
        if (timer > 0)
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        else {
            window.location.href = "/";
        }
    }, [timer]);

    return (
        <Error status="404" message="Page not found">
            Redirecting in {timer} seconds
        </Error>
    );
}

export default Wildcard;
