import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockupTemplate } from '../stores/mockupdate';

type Field = {
    id: string;
    type: 'text' | 'image';
    x: number;
    y: number;
    width?: number;
    height?: number;
    text?: string;
    src?: string;
    fontSize?: number;
    fontWeight?: string;
    textAlign?: any;
    fontFamily?: string;
    binding?: string;
};

export function TemplateViewer() {
    const { id } = useParams(); // template id
    const [fields, setFields] = useState<Field[]>([]);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            try {
                // 🔹 1. โหลด template layout
                // const templateRes = await fetch(`/api/templates/${id}`);
                // const templateJson = await templateRes.json();

                const templateJson = mockupTemplate;

                // 🔹 2. โหลดข้อมูลจริงจาก DB
                // const dataRes = await fetch(`/api/documents/${id}`);
                // const dataJson = await dataRes.json();

                const dataJson = {
                    company: {
                        name: 'ABC Company Co.,Ltd.',
                        address: '123 ABC Road, ABC City, ABC Country',
                        phone: '1234567890',
                        tax_id: '1234567890',
                        email: 'abc@company.com',
                        note: 'ABC Company Note',
                    },
                    customer: {
                        name: 'John Doe',
                        address: '123 John Road, John City, John Country',
                        phone: '1234567890',
                        tax_id: '1234567890',
                        email: 'john@doe.com',
                        note: 'John Doe Note',
                    },
                    order: {
                        no: 'INV-2026-001',
                    },
                    date: new Date().toLocaleDateString(),
                };

                setFields(templateJson.fields as unknown as Field[]);
                setData(dataJson);
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, [id]);

    // 🔹 Helper แปลง binding → value จริง
    const getValueFromBinding = (binding?: string) => {
        if (!binding || !data) return '';

        return binding.split('.').reduce((acc: any, key: string) => {
            return acc?.[key];
        }, data);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-10">
            <div className="relative w-[595px] h-[842px] bg-white shadow">

                {fields.map((f) => (
                    <div
                        key={f.id}
                        className="absolute"
                        style={{ left: f.x, top: f.y }}
                    >
                        {f.type === 'image' ? (
                            <img
                                src={f.src}
                                alt=""
                                style={{
                                    width: f.width,
                                    height: f.height,
                                    objectFit: 'contain',
                                }}
                            />
                        ) : (
                            <div
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
                                {f.binding
                                    ? getValueFromBinding(f.binding)
                                    : f.text}
                            </div>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
}