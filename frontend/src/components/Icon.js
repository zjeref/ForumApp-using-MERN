import { useEffect, useRef } from "react";
import Lottie from 'lottie-web';
const animationData = require('../assets/forum-icon.json');

const Loading = () => {
    const roContainer = useRef(null);

    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: roContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });

        return () => {
            anim.destroy();
        };
    }, []);
    return (
        <div className="wfull block h-full" ref={roContainer} key="icon-animation">
        </div>
    )
}

export default Loading