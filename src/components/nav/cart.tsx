export default function Cart({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-amber-100 p-4 w-64" aria-label="Shopping cart contents">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">Your Cart</p>
        <button
          aria-label="Close cart"
          onClick={onClose}
          className="text-xl font-bold hover:text-red-500"
        >
          &times;
        </button>
      </div>
      {/* 여기에 실제 장바구니 항목들 */}
    </div>
  );
}
