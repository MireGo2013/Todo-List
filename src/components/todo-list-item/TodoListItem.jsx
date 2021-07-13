import React, { Component } from 'react';

import './todo-list-item.css';

const TodoListItem = (props) => {

	const { label, onDeleted, done, important, onToggleDone, onToggleImportant } = props
	const doneClass = done ? ` done` : ''
	const importantClass = important ? ` important` : ''
	const classListItem = 'todo-list-item' + doneClass + importantClass

	return (
		<span className={classListItem}>
			<span
				onClick={onToggleDone}
				className="todo-list-item-label"
			>
				{label}
			</span>

			<button
				onClick={onToggleImportant}
				type="button"
				className="btn btn-outline-success btn-sm float-right">
				<i className="fa fa-exclamation" />
			</button>

			<button
				onClick={onDeleted}
				type="button"
				className="btn btn-outline-danger btn-sm float-right">
				<i className="fa fa-trash-o" />
			</button>
		</span >
	);

}


export default TodoListItem







