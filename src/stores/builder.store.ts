import { create } from 'zustand';

export type TextField = {
    id: string;
    type: FieldType;
    x: number;
    y: number;
    // text
    text: string;

    // image
    src?: string;

    fontSize: number;
    fontWeight: 'normal' | 'bold';
    fontFamily: 'sans' | 'serif' | 'mono';
    width: number;
    textAlign: 'left' | 'center' | 'right';
    
    binding?: string; // เช่น "customer.name" หรือ "invoice.date"
};

export type FieldType = 'text' | 'image';

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
    addDynamicField: (config: { type: FieldType; text: string; binding?: string }) => void;
    setFields: (fields: any[]) => void;
};

export const useBuilderStore = create<BuilderState>((set) => ({
    fields: [],
    setFields: (fields) => set({ fields }),
    addDynamicField: (config) =>
        set((state) => ({
          fields: [
            ...state.fields,
            {
              id: crypto.randomUUID(),
              type: config.type,
              text: config.text,
              binding: config.binding,
              x: 50,
              y: 50,
              width: 150,
              fontSize: 14,
              fontWeight: 'normal',
              textAlign: 'left',
              fontFamily: 'sans',
            },
          ],
        })),
    addImage: (src?: string) =>
        set((state) => ({
            fields: [
                ...state.fields,
                {
                    id: crypto.randomUUID(),
                    type: 'image',
                    x: 100,
                    y: 100,
                    width: 150,
                    text: 'Image',
                    fontSize: 14,
                    fontWeight: 'normal',
                    fontFamily: 'sans',
                    textAlign: 'left',
                    src:
                        src ||
                        'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-white-spot-float-image_1256405.jpg', // default image
                },
            ],
        })),
    addText: () =>
        set((state) => ({
            fields: [
                ...state.fields,
                {
                    id: crypto.randomUUID(),
                    type: 'text',
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