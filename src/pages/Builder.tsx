import { useAuthStore } from '../stores/auth.store';
import { useNavigate } from 'react-router-dom';


import { useBuilderStore } from '../stores/builder.store';
import { useEffect, useRef, useState } from 'react';
import { FloatingToolbar } from '../components/FloatingToolbar';
import { AlignGroup } from '../components/AlignGroup';
import { AddElement } from '../components/AddElement';

export function BuilderPage() {
    const navigate = useNavigate();
    const logout = useAuthStore((s) => s.logout);
    const addText = useBuilderStore((s) => s.addText);
    const addImage = useBuilderStore((s) => s.addImage);
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const updateText = useBuilderStore((s) => s.updateText);
    const [editingId, setEditingId] = useState<string | null>(null);

    const fields = useBuilderStore((s) => s.fields);
    const updatePosition = useBuilderStore((s) => s.updatePosition);

    const pdfRef = useRef<HTMLDivElement>(null);
    const [dragId, setDragId] = useState<string | null>(null);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const updateStyle = useBuilderStore((s) => s.updateStyle);

    const updateWidth = useBuilderStore((s) => s.updateWidth);
    const [resizingId, setResizingId] = useState<string | null>(null);

    const removeFields = useBuilderStore((s) => s.removeFields);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (editingId) return;
            if (
                (e.key === 'Delete' || e.key === 'Backspace') &&
                selectedIds.length > 0
            ) {
                e.preventDefault();
                removeFields(selectedIds);
                setSelectedIds([]);
                setSelectedId(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIds, editingId]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">
                    PDF Template Builder
                </h1>

                <button
                    onClick={handleLogout}
                    className="text-sm text-red-500 hover:underline"
                >
                    Logout
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-3 gap-6">

                    {/* Left panel */}
                    <div className="col-span-1 bg-white rounded-xl shadow p-4">
                        <AddElement addText={addText} addImage={addImage} />
                        <AlignGroup fields={fields} selectedId={selectedId ?? ''} selectedIds={selectedIds} updatePosition={updatePosition} />
                    </div>

                    {/* Preview */}
                    <div className="col-span-2 bg-white rounded-xl shadow p-6 flex justify-center">
                        <div
                            ref={pdfRef}
                            className="relative w-[595px] h-[842px] border bg-white"
                            onMouseMove={(e) => {
                                if (!pdfRef.current) return;

                                const rect = pdfRef.current.getBoundingClientRect();
                                const x = e.clientX - rect.left;

                                if (resizingId) {
                                    const field = fields.find((f) => f.id === resizingId);
                                    if (!field) return;

                                    const newWidth = Math.max(40, x - field.x);
                                    updateWidth(resizingId, newWidth);
                                    return;
                                }

                                if (dragId) {
                                    const y = e.clientY - rect.top;
                                    updatePosition(dragId, x, y);
                                }
                            }}
                            onMouseDown={(e) => {
                                if (e.target !== e.currentTarget) return;

                                setSelectedId(null);
                                setSelectedIds([]);
                                setEditingId(null);
                            }}
                            onMouseUp={() => {
                                setDragId(null);
                                setResizingId(null);
                            }}
                            onMouseLeave={() => {
                                setDragId(null);
                                setResizingId(null);
                            }}
                        >

                            {fields.map((f) => {
                                const isSelected = selectedIds.includes(f.id) || selectedId === f.id;
                                return (
                                    <div
                                        key={f.id}
                                        className="absolute"
                                        style={{ left: f.x, top: f.y }}
                                    >
                                        {/* Toolbar */}
                                        {/* Floating Toolbar */}
                                        {selectedId === f.id && !editingId && (
                                            <FloatingToolbar
                                                field={f}
                                                onBold={() =>
                                                    updateStyle(f.id, {
                                                        fontWeight:
                                                            f.fontWeight === 'bold' ? 'normal' : 'bold',
                                                    })
                                                }
                                                onFontSize={(size) =>
                                                    updateStyle(f.id, {
                                                        fontSize: Math.max(8, size),
                                                    })
                                                }
                                                onAlign={(align) =>
                                                    updateStyle(f.id, { textAlign: align })
                                                }
                                            />
                                        )}

                                        {/* Resize handle */}
                                        {selectedId === f.id && !editingId && (
                                            <div
                                                onMouseDown={(e) => {
                                                    e.stopPropagation();
                                                    setResizingId(f.id);
                                                }}
                                                className="
                                            absolute -bottom-1 -right-1
                                            w-3 h-3
                                            bg-indigo-600
                                            cursor-se-resize
                                            rounded-sm
                                        "
                                            />
                                        )}

                                        {/* Text box */}
                                        <div
                                            onMouseDown={(e) => {
                                                e.stopPropagation();
                                                if (editingId) return;

                                                setDragId(f.id);

                                                if (e.shiftKey) {
                                                    setSelectedIds(prev =>
                                                        prev.includes(f.id)
                                                            ? prev.filter(id => id !== f.id)
                                                            : [...prev, f.id]
                                                    );
                                                } else {
                                                    setSelectedIds([f.id]);
                                                }

                                                setSelectedId(f.id); // ไว้ใช้กับ toolbar single
                                            }}
                                            onDoubleClick={(e) => {
                                                e.stopPropagation();
                                                setEditingId(f.id);
                                                setSelectedId(f.id);
                                            }}
                                            className={`px-2 py-1 text-sm cursor-move
                                         ${editingId === f.id
                                                    ? 'ring-2 ring-indigo-500 bg-white'
                                                    : isSelected
                                                        ? 'border border-indigo-500 bg-indigo-50'
                                                        : 'border border-dashed border-indigo-300 bg-indigo-50'
                                                }`}
                                            style={{
                                                width: f.width,
                                                fontSize: f.fontSize,
                                                fontWeight: f.fontWeight,
                                                textAlign: f.textAlign,
                                                fontFamily:
                                                    f.fontFamily === 'sans'
                                                        ? 'sans-serif'
                                                        : f.fontFamily === 'serif'
                                                            ? 'serif'
                                                            : 'monospace',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {editingId === f.id ? (
                                                <input
                                                    autoFocus
                                                    className="
                        w-full min-w-[80px]
                        bg-white text-gray-800
                        border border-indigo-400
                        rounded px-2 py-1
                        outline-none
                        focus:ring-2 focus:ring-indigo-500
                    "
                                                    value={f.text}
                                                    onChange={(e) => updateText(f.id, e.target.value)}
                                                    onBlur={() => setEditingId(null)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') setEditingId(null);
                                                        if (e.key === 'Escape') setEditingId(null);
                                                    }}
                                                />
                                            ) : (
                                                f.text
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                    {/* preview end */}

                </div>
            </div>
        </div>
    );
}