import { FC, memo, useEffect } from "react";

const yandexMetrikaId = "102915080";

const YandexMetrika: FC = memo(() => {
    useEffect(() => {
        const scriptId = "yandex-metrika-script";
        if (document.getElementById(scriptId)) return;

        // avoid duplication
        const script = document.createElement("script");
        script.id = scriptId;
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://mc.yandex.ru/metrika/tag.js";

        script.onload = () => {
            if (typeof window !== "undefined") {
                window.ym =
                    window.ym ||
                    function (...args: unknown[]) {
                        window.ym.a = window.ym.a || [];
                        window.ym.a.push(args);
                    };
                window.ym.l = new Date().getTime();
                window.ym(102915080, "init", {
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                });
            }
        };

        document.head.appendChild(script);
    }, []);

    return (
        <div>
            <img
                src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
            />
        </div>
    );
});

export { YandexMetrika };
