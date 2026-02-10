import type { TextField } from '../stores/builder.store';

type Props = {
    field: TextField;
    onBold: () => void;
    onFontSize: (size: number) => void;
    onAlign: (align: 'left' | 'center' | 'right') => void;
};

export function FloatingToolbar({ field, onBold, onFontSize, onAlign }: Props) {
    return (
        <div
            onMouseDown={(e) => e.stopPropagation()}
            className="
                absolute -top-10 left-0
                flex items-center gap-1
                bg-white border shadow-lg
                rounded-lg px-2 py-1
                text-sm z-50
            "
        >
            <button
                onClick={onBold}
                className={`px-2 py-1 rounded ${field.fontWeight === 'bold'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100'
                    }`}
            >
                B
            </button>

            <button
                onClick={() => onFontSize(field.fontSize - 1)}
                className="px-2 hover:bg-gray-100 rounded"
            >
                −
            </button>

            <span className="w-6 text-center">{field.fontSize}</span>

            <button
                onClick={() => onFontSize(field.fontSize + 1)}
                className="px-2 hover:bg-gray-100 rounded"
            >
                +
            </button>

            <div className="w-px h-5 bg-gray-300 mx-1" />

            {/* Align left */}
            <button
                onClick={() => onAlign('left')}
                className={`px-2 py-1 rounded
        ${field.textAlign === 'left'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
            >
                ⬅
            </button>

            {/* Align center */}
            <button
                onClick={() => onAlign('center')}
                className={`px-2 py-1 rounded
        ${field.textAlign === 'center'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
            >
                ⬌
            </button>

            {/* Align right */}
            <button
                onClick={() => onAlign('right')}
                className={`px-2 py-1 rounded
        ${field.textAlign === 'right'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
            >
                ➡
            </button>
        </div>
    );
}