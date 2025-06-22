import { FC, memo, useEffect } from "react";

const yandexAdId = "R-A-15536913-1";

const YandexAd: FC = memo(() => {
    useEffect(() => {
        window.yaContextCb = window.yaContextCb || [];
        window.yaContextCb.push(() => {
            window.Ya.Context.AdvManager.render({
                blockId: yandexAdId,
                renderTo: `yandex_rtb_${yandexAdId}`,
            });
        });
    }, []);

    return <div className="taYandexAd" id={`yandex_rtb_${yandexAdId}`}></div>;
});

export { YandexAd };
