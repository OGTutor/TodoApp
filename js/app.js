const main = (document => {
	function createElement(tag, props, ...children) {
		const element = document.createElement(tag);

		Object.keys(props).forEach(key => (element[key] = props[key]));

		if (children.length > 0) {
			children.forEach(child => {
				if (typeof child === 'string') {
					child = document.createTextNode(child);
				}
				element.appendChild(child);
			});
		}
		return element;
	}

	function createTodoItem(title) {
		const checkBox = createElement('input', {
			type: 'checkbox',
			className: 'checkbox',
		});

		const label = createElement(
			'label',
			{
				className: 'title',
			},
			title
		);

		const editInput = createElement('input', {
			type: 'text',
			className: 'textfield',
		});

		const editButton = createElement(
			'button',
			{
				className: 'edit',
			},
			'Edit'
		);

		const deleteButton = createElement(
			'button',
			{
				className: 'delete',
			},
			'Delete'
		);

		const listItem = createElement(
			'li',
			{
				className: 'todo-item',
			},
			checkBox,
			label,
			editInput,
			editButton,
			deleteButton
		);

		bindEvents(listItem);

		return listItem;
	}

	function bindEvents(todoItem) {
		const checkBox = todoItem.querySelector('.checkbox');
		const editButton = todoItem.querySelector('button.edit');
		const deleteButton = todoItem.querySelector('button.delete');

		checkBox.addEventListener('change', toggleTodoItem);
		editButton.addEventListener('click', editTodoItem);
		deleteButton.addEventListener('click', deleteTodoItem);
	}

	function addTodoItem(event) {
		event.preventDefault();

		if (addInput.value === '') {
			return alert('You must enter a task name!');
		}

		const todoItem = createTodoItem(addInput.value);
		todoList.appendChild(todoItem);
		addInput.value = '';
	}

	function toggleTodoItem() {
		const listItem = this.parentNode;
		listItem.classList.toggle('completed');
	}

	function editTodoItem() {
		const listItem = this.parentNode;
		const title = listItem.querySelector('.title');
		const editInput = listItem.querySelector('.textfield');
		const isEditing = listItem.classList.contains('editing');

		if (isEditing) {
			title.innerText = editInput.value;
			this.innerText = 'Edit';
		} else {
			editInput.value = title.innerText;
			this.innerText = 'Save';
		}

		listItem.classList.toggle('editing');
	}

	function deleteTodoItem() {
		const listItem = this.parentNode;
		todoList.removeChild(listItem);
	}

	function load() {
		const data = JSON.parse(localStorage.getItem('todos'));
		return data;
	}

	function save(data) {
		const string = JSON.stringify(data);
		localStorage.setItem('todos', string);
	}

	const todoForm = document.getElementById('todo-form');
	const addInput = document.getElementById('add-input');
	const todoList = document.getElementById('todo-list');
	const todoItems = document.querySelectorAll('.todo-item');
	const data = [
		{ id: 0, title: '', completed: false },
		{ id: 1, title: '', completed: false },
		{ id: 2, title: '', completed: false },
	];

	function main() {
		todoForm.addEventListener('submit', addTodoItem);
		todoItems.forEach(item => bindEvents(item));
	}

	todoForm.addEventListener('submit', addTodoItem);

	return main;
})(document);

main();
