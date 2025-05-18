import { FC, memo, useEffect } from "react";

const YandexAd: FC = memo(() => {
    useEffect(() => {
        window.yaContextCb = window.yaContextCb || [];
        window.yaContextCb.push(() => {
            window.Ya.Context.AdvManager.render({
                blockId: "R-A-15536913-1",
                renderTo: "yandex_rtb_R-A-15536913-1",
            });
        });
    }, []);

    return <div className="taYandexAd" id="yandex_rtb_R-A-15536913-1"></div>;
});

export { YandexAd };
