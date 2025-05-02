interface Window {
    yaContextCb: Array<() => void>;
    Ya: {
        Context: {
            AdvManager: {
                render: (config: unknown) => void;
            };
        };
    };
}
