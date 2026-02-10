import { create } from 'zustand';

export type TextField = {
    id: string;
    x: number;
    y: number;
    // text
    text: string;

    // number
    value?: number;

    fontSize: number;
    fontWeight: 'normal' | 'bold';
    fontFamily: 'sans' | 'serif' | 'mono';
    width: number;
    textAlign: 'left' | 'center' | 'right';
};

type BuilderState = {
    fields: TextField[];
    addText: () => void;
    updateText: (id: string, text: string) => void;
    updatePosition: (id: string, x: number, y: number) => void;
    updateStyle: (
        id: string,
        style: Partial<Pick<TextField, 'fontSize' | 'fontWeight' | 'fontFamily'>>
    ) => void;
    removeFields: (ids: string[]) => void;
    updateWidth: (id: string, width: number) => void;
};

export const useBuilderStore = create<BuilderState>((set) => ({
    fields: [],
    addNumber: () =>
        set((state) => ({
            fields: [
                ...state.fields,
                {
                    id: crypto.randomUUID(),
                    type: 'number',
                    x: 100,
                    y: 100,
                    width: 120,
                    text: '0',       // ใช้แสดงผล
                    value: 0,        // ใช้ logic
                    fontSize: 14,
                    fontWeight: 'normal',
                    textAlign: 'right',
                    fontFamily: 'sans',
                },
            ],
        })),
    addText: () =>
        set((state) => ({
            fields: [
                ...state.fields,
                {
                    id: crypto.randomUUID(),
                    x: 50,
                    y: 50,
                    text: 'Text',
                    fontSize: 14,
                    fontWeight: 'normal',
                    fontFamily: 'sans',
                    width: 120,
                    textAlign: 'left',
                },
            ],
        })),

    updatePosition: (id, x, y) =>
        set((state) => ({
            fields: state.fields.map((f) =>
                f.id === id ? { ...f, x, y } : f
            ),
        })),

    updateStyle: (id, style) =>
        set((state) => ({
            fields: state.fields.map((f) =>
                f.id === id ? { ...f, ...style } : f
            ),
        })),

    updateText: (id, text) =>
        set((state) => ({
            fields: state.fields.map((f) =>
                f.id === id ? { ...f, text } : f
            ),
        })),
    updateWidth: (id, width) =>
        set((state) => ({
            fields: state.fields.map((f) =>
                f.id === id ? { ...f, width } : f
            ),
        })),
    removeFields: (ids) =>
        set((state) => ({
            fields: state.fields.filter((f) => !ids.includes(f.id)),
        })),
}));