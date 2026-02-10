// addElement.tsx
type Props = {
    addText: () => void;
    addImage: () => void;
};
export const AddElement = (
    { addText, addImage }: Props) => {
    return (
        <div>
            <h2 className="font-semibold mb-4">Fields</h2>

            <button
                onClick={addText}
                className="w-full mb-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                + Add Text
            </button>

            <button 
            onClick={addImage}
            className="w-full px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                + Add Image
            </button>
        </div>
    );
};