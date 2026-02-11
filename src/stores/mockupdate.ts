export const mockupTemplate =
{
  "fields": [
    {
      "id": "d8bdb409-a9cd-4d43-89c5-376755622c88",
      "type": "image",
      "x": 23.50390625,
      "y": 24.021484375,
      "width": 80,
      "text": "Image",
      "fontSize": 14,
      "fontWeight": "normal",
      "fontFamily": "sans",
      "textAlign": "left",
      "src": "blob:http://localhost:5173/caeda168-2646-4dd6-bc5b-3e245cc89627"
    },
    {
      "id": "doc_title",
      "type": "text",
      "x": 0,
      "y": 120,
      "text": "ใบเสร็จรับเงิน",
      "fontSize": 22,
      "fontWeight": "bold",
      "width": 595,
      "textAlign": "center"
    },
    {
      "id": "order_no",
      "type": "text",
      "x": 400,
      "y": 40,
      "binding": "order.no",
      "fontSize": 14,
      "width": 150,
      "textAlign": "right"
    },
    {
      "id": "order_date",
      "type": "text",
      "x": 400,
      "y": 65,
      "binding": "order.date",
      "fontSize": 14,
      "width": 150,
      "textAlign": "right"
    },
    {
      "id": "company_label",
      "type": "text",
      "x": 40,
      "y": 170,
      "text": "ผู้ขาย",
      "fontSize": 14,
      "fontWeight": "bold"
    },
    {
      "id": "company_name",
      "type": "text",
      "x": 40,
      "y": 195,
      "binding": "company.name",
      "fontSize": 14,
      "width": 250
    },
    {
      "id": "company_address",
      "type": "text",
      "x": 40,
      "y": 220,
      "binding": "company.address",
      "width": 250
    },
    {
      "id": "company_tax",
      "type": "text",
      "x": 40,
      "y": 270,
      "binding": "company.tax_id"
    },
    {
      "id": "customer_label",
      "type": "text",
      "x": 330,
      "y": 170,
      "text": "ลูกค้า",
      "fontSize": 14,
      "fontWeight": "bold"
    },
    {
      "id": "customer_name",
      "type": "text",
      "x": 330,
      "y": 195,
      "binding": "customer.name",
      "width": 220
    },
    {
      "id": "customer_address",
      "type": "text",
      "x": 330,
      "y": 220,
      "binding": "customer.address",
      "width": 220
    },
    {
      "id": "order_table",
      "type": "table",
      "x": 40,
      "y": 300,
      "width": 515,
      "binding": "order.items",
      "columns": [
        {
          "header": "ลำดับ",
          "key": "index",
          "width": 50
        },
        {
          "header": "รายการ",
          "key": "name",
          "width": 220
        },
        {
          "header": "จำนวน",
          "key": "qty",
          "width": 70
        },
        {
          "header": "ราคา",
          "key": "price",
          "width": 80
        },
        {
          "header": "รวม",
          "key": "total",
          "width": 95
        }
      ]
    },
    {
      "id": "subtotal",
      "type": "text",
      "x": 380,
      "y": 650,
      "binding": "order.subtotal",
      "textAlign": "right"
    },
    {
      "id": "vat",
      "type": "text",
      "x": 380,
      "y": 675,
      "binding": "order.vat",
      "textAlign": "right"
    },
    {
      "id": "grand_total",
      "type": "text",
      "x": 380,
      "y": 705,
      "binding": "order.total",
      "fontSize": 16,
      "fontWeight": "bold",
      "textAlign": "right"
    },
    {
      "id": "payment_list",
      "type": "payment",
      "x": 40,
      "y": 730,
      "binding": "order.payments"
    }
  ],
  "createdAt": "2026-02-11T12:01:56.104Z"
}