import { useEffect } from "react";

const YandexAd = () => {
    useEffect(() => {
        // Ensure the global callback array exists
        window.yaContextCb = window.yaContextCb || [];

        // Push the render logic to the callback array
        window.yaContextCb.push(() => {
            window.Ya.Context.AdvManager.render({
                blockId: "R-A-15348165-1",
                renderTo: "yandex_rtb_R-A-15348165-1",
            });
        });
    }, []);

    return <div id="yandex_rtb_R-A-15348165-1"></div>;
};

export default YandexAd;
