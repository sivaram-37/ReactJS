export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <span>
          <em>Start adding some items to your packing list 🚀</em>
        </span>
      </footer>
    );

  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPackedItems / numItems) * 100);

  return (
    <footer className="stats">
      <span>
        <em>
          {percentage === 100
            ? `You got everything! Ready to travel ✈️ `
            : `👜 You have ${numItems} items on your list, and you already packed
          ${numPackedItems} (${percentage}%)`}
        </em>
      </span>
    </footer>
  );
}
