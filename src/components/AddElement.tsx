import { mockupTemplate } from "../stores/mockupdate";

// addElement.tsx
type Props = {
    addText: () => void;
    addImage: (src?: string) => void;
    addDynamicField: (config: {
        type: 'text' | 'image';
        text: string;
        binding?: string;
    }) => void;
    loadTemplate: (fields: any[]) => void;
};

const fields = [
    {
        name: 'Company Name',
        group: 'company',
        text: '๐ ชื่อผู้ขาย',
        type: 'text',
        binding: 'company.name',
    },
    {
        name: 'Company Address',
        group: 'company',
        text: '๐ ที่อยู่ผู้ขาย',
        type: 'text',
        binding: 'company.address',
    },
    {
        name: 'Company Phone',
        group: 'company',
        text: '๐ เบอร์โทรผู้ขาย',
        type: 'text',
        binding: 'company.phone',
    },
    {
        name: 'Company Tax ID',
        group: 'company',
        text: '๐ รหัสผู้เสียภาษีผู้ขาย',
        type: 'text',
        binding: 'company.tax_id',
    },
    {
        name: 'Company Email',
        group: 'company',
        text: '๐ อีเมลผู้ขาย',
        type: 'text',
        binding: 'company.email',
    },
    {
        name: 'Company Note',
        group: 'company',
        text: '๐ หมายเหตุผู้ขาย',
        type: 'text',
        binding: 'company.note',
    },
    {
        name: 'Customer Name',
        group: 'customer',
        text: '๐ ชื่อลูกค้า',
        type: 'text',
        binding: 'customer.name',
    },
    {
        name: 'Customer Address',
        group: 'customer',
        text: '๐ ที่อยู่ลูกค้า',
        type: 'text',
        binding: 'customer.address',
    }, {
        name: 'Customer Phone',
        group: 'customer',
        text: '๐ เบอร์โทรลูกค้า',
        type: 'text',
        binding: 'customer.phone',
    },
    {
        name: 'Customer Tax ID',
        group: 'customer',
        text: '๐ รหัสผู้เสียภาษีลูกค้า',
        type: 'text',
        binding: 'customer.tax_id',
    },
    {
        name: 'Customer Email',
        group: 'customer',
        text: '๐ อีเมลลูกค้า',
        type: 'text',
        binding: 'customer.email',
    },
    {
        name: 'Customer Note',
        group: 'customer',
        text: '๐ หมายเหตุลูกค้า',
        type: 'text',
        binding: 'customer.note',
    },
    {
        name: 'Date',
        group: 'date',
        text: '๐ วันที่ปัจจุบัน',
        type: 'text',
        binding: 'date',
    },
    {
        name: 'No.Order',
        group: 'order',
        text: '๐ หมายเลขคำสั่งซื้อ',
        type: 'text',
        binding: 'order.no',
    },
    {
        name: 'Order Date',
        group: 'order',
        type: 'group',
        text: '๐ วันที่ครบกำหนด',
        fields: [
            {
                name: 'Order Date',
                group: 'order',
                text: '๐ วันที่ออก',
                type: 'text',
                binding: 'order.date',
            },
            {
                name: 'Order Credit',
                group: 'order',
                text: '๐ เครดิต',
                type: 'text',
                binding: 'order.credit',
            },
            {
                name: 'Order Due Date',
                group: 'order',
                text: '๐ วันที่ครบกำหนด',
                type: 'text',
                binding: 'order.due_date',
            },
        ],
    },
    {
        name: 'Order Table',
        group: 'order',
        text: '๐ ตารางรายการสินค้า',
        type: 'table', // table with header and rows and footer vat 
        binding: 'order.table',
    },
    {
        name: 'Order Payment',
        group: 'order',
        text: '๐ รายการชำระเงิน',
        type: 'payment', // list payment send from DB
        binding: 'order.payment',
    },
    {
        name: 'Order Note',
        group: 'order',
        type: 'text',
        text: '๐ หมายเหตุ',
        binding: 'order.note',
    }
];

const templatePDF1 = mockupTemplate.fields;

// fields if it type text than sent input for text value
export const AddElement = (
    { addText, addImage, addDynamicField, loadTemplate }: Props) => {
    return (
        <div>
            <h2 className="font-semibold mb-4">Fields</h2>

            <button
                onClick={addText}
                className="w-full mb-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                + Add Text
            </button>


            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="upload-image"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const url = URL.createObjectURL(file);
                    addImage(url);
                }}
            />
            <label
                htmlFor="upload-image"
                className="w-full px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer block text-center"
            >
                + Add Image
            </label>

            <br />

            {fields.map((field) => (
                <button
                    key={field.name}
                    onClick={() =>
                        addDynamicField({
                            type: field.type as any,
                            text: field.text,
                            binding: field.binding,
                        })
                    }
                    className="w-full mb-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-indigo-600 hover:text-white text-left"
                >
                    {field.text}
                </button>


            ))}

<button
                onClick={() => loadTemplate(templatePDF1)}
                className="w-full mb-2 px-3 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 text-white text-left"
            >
                Load Template 1
            </button>
            
        </div>
    );
};