interface YM {
    (id: number, event: string, options?: Record<string, unknown>): void;
    a?: unknown[];
    l?: number;
}

interface Window {
    yaContextCb: Array<() => void>;
    ym: YM;
    Ya: {
        Context: {
            AdvManager: {
                render: (config: unknown) => void;
            };
        };
    };
}
