import type { TextField } from '../stores/builder.store';
import {
    Bars3BottomLeftIcon,
    Bars3CenterLeftIcon,
    ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';

type Props = {
    fields: TextField[];
    selectedId: string;
    selectedIds: string[];
    updatePosition: (id: string, x: number, y: number) => void;
};
export const alignLeft = (
    fields: TextField[],
    selectedIds: string[],
    updatePosition: (id: string, x: number, y: number) => void
) => {
    const selected = fields.filter(f => selectedIds.includes(f.id));
    if (selected.length < 2) return;

    const minX = Math.min(...selected.map(f => f.x));
    selected.forEach(f => updatePosition(f.id, minX, f.y));
};
export const alignCenter = (
    fields: TextField[],
    selectedIds: string[],
    updatePosition: (id: string, x: number, y: number) => void
) => {
    const selected = fields.filter(f => selectedIds.includes(f.id));
    if (selected.length < 2) return;

    const minX = Math.min(...selected.map(f => f.x));
    const maxX = Math.max(...selected.map(f => f.x + f.width));
    const center = (minX + maxX) / 2;

    selected.forEach(f =>
        updatePosition(f.id, center - f.width / 2, f.y)
    );
};
export const distributeHorizontal = (
    fields: TextField[],
    selectedIds: string[],
    updatePosition: (id: string, x: number, y: number) => void
) => {
    const selected = fields
        .filter(f => selectedIds.includes(f.id))
        .sort((a, b) => a.x - b.x);

    if (selected.length < 3) return;

    const first = selected[0];
    const last = selected[selected.length - 1];

    const totalWidth = selected.reduce((s, f) => s + f.width, 0);
    const space =
        (last.x - first.x - totalWidth + first.width) /
        (selected.length - 1);

    let cursor = first.x;

    selected.forEach((f, i) => {
        if (i === 0) return;
        cursor += selected[i - 1].width + space;
        updatePosition(f.id, cursor, f.y);
    });
};

export const AlignGroup = (
    { fields, selectedId, selectedIds, updatePosition }: Props) => {
    return (
        <div className="flex gap-2 mt-4">
            <small className="text-gray-500 flex items-center">Align:</small>
            {/* Align Left */}
            <button
                onClick={() => alignLeft(fields, selectedIds, updatePosition)}
                className="p-2 bg-gray-200 rounded-lg hover:bg-indigo-100"
                title="Align Left"
            >
                <Bars3BottomLeftIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Align Center */}
            <button
                onClick={() => alignCenter(fields, selectedIds, updatePosition)}
                className="p-2 bg-gray-200 rounded-lg hover:bg-indigo-100"
                title="Align Center"
            >
                <Bars3CenterLeftIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Distribute Horizontal */}
            <button
                onClick={() => distributeHorizontal(fields, selectedIds, updatePosition)}
                className="p-2 bg-gray-200 rounded-lg hover:bg-indigo-100"
                title="Distribute Horizontal"
            >
                <ArrowsRightLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
        </div>
    );
};