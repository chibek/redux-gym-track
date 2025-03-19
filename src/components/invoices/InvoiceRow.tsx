export default function InvoiceRow() {
  return (
    <div className="flex justify-between bg-white w-full rounded-sm p-2">
      <time>2022-01-01</time>
      <span className="bg-gray-200">status</span>
      <span>#ContractId</span>
      <span>Price$</span>
      <button>+</button>
    </div>
  );
}
