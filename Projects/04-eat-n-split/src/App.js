import { useState } from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}

export default function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleShowAddFriend() {
		setShowAddFriend((show) => !show);
	}

	function handleAddFriend(newFriend) {
		setFriends((friends) => [...friends, newFriend]);
		setShowAddFriend(false);
	}

	function handleSelection(friend) {
		setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	}

	function handleSplitBill(value) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend
			)
		);
		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					selectedFriend={selectedFriend}
					onSelection={handleSelection}
				/>

				{showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
					key={selectedFriend.id}
				/>
			)}
		</div>
	);
}

function FriendsList({ friends, selectedFriend, onSelection }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					friend={friend}
					key={friend.id}
					selectedFriend={selectedFriend}
					onSelection={onSelection}
				/>
			))}
		</ul>
	);
}

function Friend({ friend, selectedFriend, onSelection }) {
	const isSelected = selectedFriend?.id === friend.id;

	return (
		<li className={isSelected ? "selected" : ""}>
			<img src={friend.image} alt={friend.name} />

			<h3>{friend.name}</h3>

			{friend.balance < 0 && (
				<p className="red">
					You own {friend.name} ${Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owns you ${Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name} are even</p>}
			<Button onClick={() => onSelection(friend)}>
				{isSelected ? "Close" : "Select"}
			</Button>
		</li>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	function handleSubmit(e) {
		e.preventDefault();

		const id = crypto.randomUUID();
		const newFriend = {
			id,
			name,
			image: `${image}?u=${id}`,
			balance: 0,
		};

		onAddFriend(newFriend);
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>Friend Name</label>
			<input type="text" value={name} onChange={(e) => setName(e.target.value)} />

			<label>Image URL</label>
			<input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, setBill] = useState("");
	const [paidByUser, setPaidByUser] = useState("");
	const paidByFriend = bill ? bill - paidByUser : "";
	const [whoPaidBill, setWhoPaidBill] = useState("user");

	function handleSubmit(e) {
		e.preventDefault();

		if (!bill || !paidByUser) return;

		const value = whoPaidBill === "user" ? paidByFriend : -paidByUser;
		onSplitBill(value);
	}

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split Bill with {selectedFriend.name}</h2>

			<label>💰 Bill Value</label>
			<input type="text" value={bill} onChange={(e) => setBill(+e.target.value)} />

			<label>🕴️Your Expense</label>
			<input
				type="text"
				value={paidByUser}
				onChange={(e) =>
					setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
				}
			/>

			<label>👨‍🤝‍👩 {selectedFriend.name}'s Expense</label>
			<input type="text" disabled value={paidByFriend} />

			<label>Who is paying the bill?</label>
			<select value={whoPaidBill} onChange={(e) => setWhoPaidBill(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">{selectedFriend.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
