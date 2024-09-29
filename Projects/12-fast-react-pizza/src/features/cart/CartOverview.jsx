function CartOverview() {
  return (
    <div className="px-4 py-4 sm:px-6 text-sm md:text-base bg-stone-800 uppercase text-stone-200 flex items-center justify-between border-b-8 border-yellow-400">
      <p className="font-semibold text-stone-300 space-x-4">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <a href="/cart">Open cart &rarr;</a>
    </div>
  );
}

export default CartOverview;
